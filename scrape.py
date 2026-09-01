import cloudscraper
from bs4 import BeautifulSoup
import json
import sys

def scrape_taaft():
    scraper = cloudscraper.create_scraper(browser={'browser': 'chrome', 'platform': 'windows', 'desktop': True})
    url = "https://theresanaiforthat.com/"
    
    try:
        response = scraper.get(url, timeout=15)
        response.raise_for_status()
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
        
    soup = BeautifulSoup(response.text, 'html.parser')
    tools = []
    
    # Try finding typical list items on TAAFT
    items = soup.find_all('li', class_='li')
    
    if not items:
        # Fallback if structure changed, try finding tool cards
        items = soup.find_all('div', class_='job_listing')
        
    for item in items:
        # Tool name is often in a div with class 'name'
        name_div = item.find('div', class_='name') or item.find('h3')
        if not name_div:
            continue
        name = name_div.get_text(strip=True)
        
        # Tool desc is often in a div with class 'desc' or 'tool_desc'
        desc_div = item.find('div', class_='desc') or item.find('div', class_='text')
        desc = desc_div.get_text(strip=True) if desc_div else ''
        
        # Link
        link_tag = item.find('a', href=True)
        link = link_tag['href'] if link_tag else '#'
        if link.startswith('/'):
            link = f"https://theresanaiforthat.com{link}"
            
        # Category/tags
        cat_tag = item.find('a', class_='category') or item.find('span', class_='tag')
        category = cat_tag.get_text(strip=True) if cat_tag else 'AI Tool'
        
        tools.append({
            "name": name,
            "description": desc,
            "link": link,
            "category": category
        })
        
    print(json.dumps({"success": True, "count": len(tools), "tools": tools}))

if __name__ == "__main__":
    scrape_taaft()
