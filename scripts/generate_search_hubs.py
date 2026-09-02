import json
import re

with open("/Users/karanarora/mystartups/ai_tools/scripts/top_search_queries.json") as f:
    queries = json.load(f)

# Filter out extreme explicit words to comply with Google search and ad policies
blacklist = ["porn", "nude", "slut", "cumshot", "tits", "smut", "sex", "erotic", "fap", "horny", "penis", "boobs", "nsfw", "lewd"]

clean_queries = []
for q in queries:
    text = q["query"].lower()
    if any(b in text for b in blacklist):
        continue
    clean_queries.append(q)

print(f"Clean high-volume queries count: {len(clean_queries)}")

# Write to TypeScript file src/data/search-hubs.ts
ts_content = """export interface SearchHub {
  slug: string;
  query: string;
  volume: number;
  cpc: number;
  categoryHint?: string;
}

export const TOP_SEARCH_HUBS: SearchHub[] = [
"""

for q in clean_queries[:120]:
    slug_str = json.dumps(q["slug"])
    query_str = json.dumps(q["query"])
    ts_content += f"""  {{
    slug: {slug_str},
    query: {query_str},
    volume: {q["volume"]},
    cpc: {q["cpc"]}
  }},
"""

ts_content += """];

export function getSearchHubBySlug(slug: string): SearchHub | undefined {
  const norm = slug.toLowerCase().trim();
  return TOP_SEARCH_HUBS.find(h => h.slug === norm);
}

export function getAllSearchHubs(): SearchHub[] {
  return TOP_SEARCH_HUBS;
}
"""

with open("/Users/karanarora/mystartups/ai_tools/src/data/search-hubs.ts", "w") as f:
    f.write(ts_content)

print("Generated src/data/search-hubs.ts successfully!")
