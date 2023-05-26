import os
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# Base URL of the website
base_url = "https://www.schulstad.dk/vores-brod/alle-brod/rugbrod/vegansk/"
# Directory to save images
image_dir = './public/assets'

# Ensure directory exists
os.makedirs(image_dir, exist_ok=True)

response = requests.get(base_url)
response.encoding = 'utf-8'

# HTML content
html = response.text
# Parse HTML
soup = BeautifulSoup(html, 'html.parser')

# List to store JSON objects
products = []

# Find all product cards
for card in soup.find_all(class_='card card-product'):
    # Get title
    title = card.find(class_='card-product-title').text
    # Get image src
    img_src = card.find('img')['src'] if card.find('img').get('src') else card.find('img')['srcset'].split(',')[0].split(' ')[0]
    # Join base_url with image src to get full URL
    img_url = urljoin(base_url, img_src)
    # Download image
    img_data = requests.get(img_url).content
    # Generate image name
    base_name, ext = os.path.splitext(img_src.split('/')[-1].split('?')[0])
    img_name = os.path.join(image_dir, base_name + ext)
    # Write image to file
    with open(img_name, 'wb') as f:
        f.write(img_data)
    # Create JSON object
    product = {
        'title': title,
        'image': img_name,
        'description': title + " er vegansk.",
        'proof_text': "https://www.schulstad.dk/vores-brod/alle-brod/rugbrod/vegansk/",
        'proof_image': '',
        "category": [
                "Brød"
        ],
        "locations": [
            "",
        ]
    }
    # Add JSON object to list
    products.append(product)

# Print JSON objects
print(json.dumps(products, ensure_ascii=False, indent=4))
