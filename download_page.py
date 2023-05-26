import os
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# Base URL of the website
base_url = "https://www.naturli-foods.dk/produkter/"
# Directory to save images
image_dir = './public/assets'

# Ensure directory exists
os.makedirs(image_dir, exist_ok=True)

print("Fetching webpage...")
response = requests.get(base_url)
response.encoding = 'utf-8'

# HTML content
html = response.text
# Parse HTML
soup = BeautifulSoup(html, 'html.parser')

# List to store JSON objects
products = []

# Find all product cards
for product in soup.find_all(class_='product small'):
    # Get title
    title = " ".join(product.find(class_='product-title').text.split())
    print(f"Found product: {title}")
    # Get image src
    img_src = product.find('img').get('data-src')
    print(f"Found image source: {img_src}")
    # Join base_url with image src to get full URL
    img_url = urljoin(base_url, img_src)
    print(f"Constructed image URL: {img_url}")
    # Download image
    print(f"Downloading image...")
    img_data = requests.get(img_url).content
    # Generate image name
    base_name, ext = os.path.splitext(img_src.split('/')[-1].split('?')[0])
    img_name = os.path.join(image_dir, base_name + ext)
    print(f"Saving image as: {img_name}")
    # Write image to file
    with open(img_name, 'wb') as f:
        f.write(img_data)
    print(f"Image saved.")
    # Create JSON object
    product = {
        'title': title,
        'image': img_name,
        'description': title + " er vegansk.",
        'proof_text': "Alt fra naturlig er vegansk.",
        'proof_image': '',
        "category": [
                ""
        ],
        "locations": [
            "",
        ]
    }
    # Add JSON object to list
    products.append(product)

# Print JSON objects
print("Final product list:")
print(json.dumps(products, ensure_ascii=False, indent=4))
