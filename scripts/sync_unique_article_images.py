import csv
import json
import re
import os
import sys
from collections import defaultdict

def main():
    print("=== Step 1: Loading data/articles.json ===")
    with open("data/articles.json", "r", encoding="utf-8") as f:
        articles = json.load(f)

    total_articles = len(articles)
    print(f"Loaded {total_articles} articles from data/articles.json")

    first_50 = articles[:50]
    remaining = articles[50:]

    used_urls = set()
    used_ids = set()

    for a in first_50:
        u = a["imageUrl"]
        used_urls.add(u)
        m = re.search(r"photo-([a-zA-Z0-9_-]+)", u)
        if m:
            used_ids.add(m.group(1))

    print(f"Preserved {len(used_urls)} pre-deduped unique images from first 50 statically rendered articles.")

    print("\n=== Step 2: Loading data/keywords.tsv and data/photos.tsv ===")
    photo_keywords = defaultdict(set)
    with open("data/keywords.tsv", "r", encoding="utf-8", errors="ignore") as f:
        reader = csv.DictReader(f, delimiter="\t")
        for row in reader:
            kw = row.get("keyword")
            if kw:
                photo_keywords[row["photo_id"]].add(kw.lower())

    photos = []
    with open("data/photos.tsv", "r", encoding="utf-8", errors="ignore") as f:
        reader = csv.DictReader(f, delimiter="\t")
        for row in reader:
            pid = row["photo_id"]
            url = row["photo_image_url"]
            m = re.search(r"photo-([a-zA-Z0-9_-]+)", url)
            if (m and m.group(1) in used_ids) or url in used_urls:
                continue
            desc = (row.get("photo_description") or "").lower()
            ai_desc = (row.get("ai_description") or "").lower()
            kws = photo_keywords.get(pid, set())
            words = kws | set(desc.replace(",", " ").replace(".", " ").split()) | set(ai_desc.replace(",", " ").replace(".", " ").split())
            photos.append({
                "id": pid,
                "url": url,
                "words": words
            })

    print(f"Loaded {len(photos)} candidate photos available for remaining {len(remaining)} articles.")

    cat_profiles = {
        "writing": {
            "primary": ["typewriter", "writing", "write", "writer", "author", "typing", "manuscript", "notebook", "journal", "novel", "poetry", "poet", "pen", "pencil", "letter", "literature", "document", "library"],
            "secondary": ["paper", "book", "books", "reading", "read", "desk", "text", "notes", "story"]
        },
        "audio": {
            "primary": ["microphone", "mic", "headphones", "headset", "speaker", "speakers", "audio", "sound", "synthesizer", "dj", "mixer", "mixing", "console", "guitar", "piano", "drums", "acoustic", "studio", "podcast", "vinyl", "cassette", "earphones", "turntable", "subwoofer", "soundbar", "boombox", "amplifier"],
            "secondary": ["music", "musical", "singer", "singing", "instrument", "concert", "band", "musician", "tune", "song", "track", "orchestra", "festival", "melody", "beat", "voice", "vocal", "soundtrack", "stereo", "audiobook", "bass", "soundwave", "acoustics", "broadcast", "radio", "record", "dance", "dancing", "party", "club", "disco", "performance", "stage", "auditorium", "crowd", "cheering", "applause", "opera", "live", "rock", "jazz", "electronic", "harmony", "rhythm", "ear"]
        },
        "automation": {
            "primary": ["robot", "robotics", "robotic", "automate", "automation", "cyborg", "machine", "machinery", "industrial robot", "assembly line", "drone", "drones", "sensor", "sensors", "conveyor", "motor", "datacenter", "data center", "server rack", "microcontroller", "arduino", "raspberry", "chip", "semiconductor", "processor", "ai", "artificial intelligence"],
            "secondary": ["industrial", "industry", "factory", "manufacturing", "assembly", "gear", "gears", "mechanism", "mechanical", "server", "servers", "rack", "cable", "cables", "circuit", "circuits", "hardware", "electronics", "electronic", "laser", "wire", "wires", "science", "laboratory", "lab", "logistics", "warehouse", "workflow", "process", "pipeline", "autonomous", "futuristic", "future", "engineering", "tech", "technology", "smart", "network", "system", "engine", "equipment", "tool", "tools", "facility", "plant", "power", "grid"]
        },
        "code": {
            "primary": ["code", "coding", "programming", "programmer", "developer", "software", "terminal", "algorithm", "html", "javascript", "python", "css", "git", "linux", "syntax", "hacker", "hacking", "binary", "macbook", "laptop", "computer", "screen", "monitor", "display", "cyber", "internet", "web"],
            "secondary": ["data", "tech", "technology", "digital", "network", "system", "database", "analytics", "dashboard", "pc", "desktop", "wireframe", "cloud", "api", "framework", "workstation", "keyboard", "mouse", "electronics", "server", "device", "office", "working", "workspace", "work", "job", "business", "desk", "indoor", "indoors", "modern", "contemporary", "information", "connection", "study", "studying", "learn", "learning", "education", "student", "professional", "gadget", "phone", "table", "chair", "minimal", "dark", "night", "city", "neon", "abstract"]
        },
        "video": {
            "primary": ["camera", "video", "film", "filming", "cinema", "cinematography", "movie", "lens", "broadcast", "tripod", "recording", "screenplay", "director", "actor", "hollywood", "cinematic", "videography", "camcorder", "filmmaker"],
            "secondary": ["production", "actress", "stage", "studio", "tv", "television", "record", "clip", "media", "photographer", "photography", "canon", "nikon", "sony", "lighting", "motion", "action", "theater", "show", "premiere", "entertainment", "reels", "drone", "visual", "shot", "framing", "shutter", "projector", "screen", "viewfinder", "scenery", "scene", "set"]
        },
        "design": {
            "primary": ["design", "designer", "graphic", "illustration", "ui", "ux", "interface", "wireframe", "typography", "logo", "branding", "sketching", "palette", "drawing", "vector", "art", "artist"],
            "secondary": ["artistic", "creative", "creativity", "draw", "sketch", "painting", "paint", "canvas", "color", "colors", "colour", "pattern", "workspace", "desk", "layout", "font", "poster", "interior", "architecture", "aesthetic", "minimal", "minimalist", "craft", "crafting", "studio", "visual", "digital", "sculpture", "composition", "style", "modern", "abstract", "texture", "paper"]
        }
    }

    scores = defaultdict(dict)
    for p in photos:
        pid = p["id"]
        w = p["words"]
        for cat, rules in cat_profiles.items():
            s = sum(10 for word in rules["primary"] if word in w) + sum(1 for word in rules["secondary"] if word in w)
            if s > 0:
                scores[cat][pid] = s

    # Group remaining articles by category
    rem_by_cat = defaultdict(list)
    for a in remaining:
        rem_by_cat[a["category"]].append(a)

    print("\n=== Step 3: Assigning unique images per category ===")
    for cat in ["writing", "audio", "automation", "code", "video", "design"]:
        arts = rem_by_cat[cat]
        needed = len(arts)
        candidates = [(p, scores[cat].get(p["id"], 0)) for p in photos if p["id"] not in used_ids]
        candidates.sort(key=lambda x: x[1], reverse=True)

        selected = candidates[:needed]
        print(f"Category {cat:10}: needed {needed:5}, assigned {len(selected):5} (min relevance score: {selected[-1][1] if selected else -1})")

        for i, (p, score) in enumerate(selected):
            art = arts[i]
            used_ids.add(p["id"])
            base_url = p["url"]
            img_url = f"{base_url}?auto=format&fit=crop&w=1200&q=80"
            used_urls.add(img_url)
            art["imageUrl"] = img_url

    print(f"\nTotal unique imageUrl values across all 10,000 articles: {len(used_urls)}")
    assert len(used_urls) == total_articles, f"Mismatch: expected {total_articles}, got {len(used_urls)}"

    print("\n=== Step 4: Writing updated data/articles.json ===")
    # Reassemble complete articles list preserving original order
    updated_articles = first_50 + remaining
    with open("data/articles.json", "w", encoding="utf-8") as f:
        json.dump(updated_articles, f, indent=2, ensure_ascii=False)
    print("Successfully wrote updated data/articles.json!")

    # Write a mapping JSON file for fast database update
    # Map: slug -> imageUrl
    slug_to_image = {a["slug"]: a["imageUrl"] for a in updated_articles}
    with open("data/article_slug_images.json", "w", encoding="utf-8") as f:
        json.dump(slug_to_image, f)
    print(f"Exported {len(slug_to_image)} slug -> imageUrl mappings to data/article_slug_images.json")

if __name__ == "__main__":
    main()
