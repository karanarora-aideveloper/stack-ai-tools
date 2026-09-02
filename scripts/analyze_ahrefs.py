import csv

file_path = "/Users/karanarora/mystartups/ai_tools/futurepedia.io-content-gap-subdomains-us_2026-09-02_21-06-29.csv"

def to_int(val):
    try:
        return int(val.replace(",", "").strip())
    except:
        return 0

def to_float(val):
    try:
        return float(val.replace(",", "").replace("$", "").strip())
    except:
        return 0.0

items = []
with open(file_path, "r", encoding="utf-16-le") as f:
    reader = csv.reader(f, delimiter="\t")
    header = next(reader)
    for r in reader:
        if not r or len(r) < 40:
            continue
        kw = r[0].strip('" ')
        entity = r[1].strip('" ')
        intents = r[2].strip('" ')
        vol = to_int(r[4].strip('" '))
        kd = to_int(r[5].strip('" '))
        cpc = to_float(r[6].strip('" '))
        
        taft_url = r[16].strip('" ')
        taft_pos = to_int(r[17].strip('" '))
        taft_traffic = to_int(r[18].strip('" '))
        
        toolify_url = r[25].strip('" ')
        toolify_pos = to_int(r[26].strip('" '))
        toolify_traffic = to_int(r[27].strip('" '))
        
        topai_url = r[34].strip('" ')
        topai_pos = to_int(r[35].strip('" '))
        topai_traffic = to_int(r[36].strip('" '))
        
        tot_comp_traffic = taft_traffic + toolify_traffic + topai_traffic
        
        items.append({
            "kw": kw,
            "entity": entity,
            "intents": intents,
            "vol": vol,
            "kd": kd,
            "cpc": cpc,
            "comp_traffic": tot_comp_traffic,
            "taft_url": taft_url,
            "taft_pos": taft_pos,
            "taft_traffic": taft_traffic,
            "toolify_url": toolify_url,
            "toolify_traffic": toolify_traffic
        })

print(f"Loaded {len(items)} items successfully.")

# 1. Top by Competitor Traffic
print("\n=== TOP 25 BY COMPETITOR ORGANIC TRAFFIC ===")
by_traffic = sorted(items, key=lambda x: x["comp_traffic"], reverse=True)[:25]
for idx, x in enumerate(by_traffic):
    print(f"{idx+1}. [{x['kw']}] - Traffic: {x['comp_traffic']:,} (Vol: {x['vol']:,}, KD: {x['kd']}, CPC: ${x['cpc']:.2f}) -> {x['taft_url']}")

# 2. Top High-Volume Low-KD (Vol >= 5000, KD <= 15)
print("\n=== TOP 25 HIGH VOLUME, LOW KD (Vol >= 5,000, KD <= 15) ===")
low_kd = sorted([x for x in items if x["vol"] >= 5000 and x["kd"] <= 15], key=lambda x: x["vol"], reverse=True)[:25]
for idx, x in enumerate(low_kd):
    print(f"{idx+1}. [{x['kw']}] - Vol: {x['vol']:,} | KD: {x['kd']} | CPC: ${x['cpc']:.2f} | Comp Traffic: {x['comp_traffic']:,}")

# 3. Top High CPC (CPC >= $3.00, Vol >= 1,000)
print("\n=== TOP 20 HIGH-CPC COMMERCIAL KEYWORDS (CPC >= $3.00, Vol >= 1,000) ===")
high_cpc = sorted([x for x in items if x["vol"] >= 1000 and x["cpc"] >= 3.0], key=lambda x: x["cpc"], reverse=True)[:20]
for idx, x in enumerate(high_cpc):
    print(f"{idx+1}. [{x['kw']}] - CPC: ${x['cpc']:.2f} | Vol: {x['vol']:,} | KD: {x['kd']} | Comp Traffic: {x['comp_traffic']:,}")

# 4. Competitor URL pattern analysis
print("\n=== COMPETITOR URL STRUCTURE PATTERNS ===")
from urllib.parse import urlparse
taft_patterns = {}
for x in items:
    url = x["taft_url"]
    if "theresanaiforthat.com" in url:
        path = urlparse(url).path
        prefix = path.split("/")[1] if len(path.split("/")) > 1 else ""
        taft_patterns[prefix] = taft_patterns.get(prefix, 0) + 1

for p, count in sorted(taft_patterns.items(), key=lambda x: x[1], reverse=True)[:10]:
    print(f"- theresanaiforthat.com/{p}/: {count} ranking keywords")
