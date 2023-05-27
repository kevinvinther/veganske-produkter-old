
import os
import subprocess
from PIL import Image

def compress_image(path, max_filesize=5*1024, step=10):
    # Check if file is an image
    if path.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')): 
        # Create a new filename for the JPEG version if not already jpg or jpeg
        if not path.lower().endswith(('.jpg', '.jpeg')):
            jpeg_filename = os.path.splitext(path)[0] + '.jpg'
        
            # Convert the image to JPEG and replace transparency with white
            subprocess.run(['convert', path, '-background', 'white', '-flatten', jpeg_filename])
        
            print(f'Converted {path} to JPEG format: {jpeg_filename}')
        else:
            jpeg_filename = path
        
        filesize = os.path.getsize(jpeg_filename)
        
        # Check if filesize exceeds max_filesize
        if filesize > max_filesize:
            quality = 90  # Initial compression quality
            compressed_filename = os.path.splitext(jpeg_filename)[0] + '_compressed' + '.jpg'

            while filesize > max_filesize and quality > 0:
                # Use ImageMagick's convert function to compress the image and resize
                # Stores it in a new file
                subprocess.run(['convert', jpeg_filename, '-quality', str(quality), '-resize', '50x50', compressed_filename])
                filesize = os.path.getsize(compressed_filename)
                quality -= step  # Reduce the quality for the next iteration if needed
            
            print(f'Compressed file {jpeg_filename} to {compressed_filename} with quality {quality + step}')
        else:
            print(f'File {jpeg_filename} is already below the target size.')
    else:
        print(f'File {path} is not an image file.')

def compress_images_in_dir(directory, max_filesize=5*1024):
    # Iterate over all files in the directory
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        
        # If the current file is a directory, recurse into this directory
        if os.path.isdir(file_path):
            print(f'Entering directory {file_path}')
            compress_images_in_dir(file_path, max_filesize)
        else:
            compress_image(file_path, max_filesize)

compress_images_in_dir('./public/assets/')  # replace with your directory path
