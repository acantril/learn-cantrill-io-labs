import os
import json
import uuid
import boto3

from PIL import Image

# pixels=(X,Y) e.g. (48,48)
pixels=os.environ['pixelsize']
# bucketname for pixelated images
dest_bucket=os.environ['dest_bucket']

s3_client = boto3.client('s3')

def lambda_handler(event, context):
	print(event)
	
	# get bucket and object key from event object
	source_bucket = event['Records'][0]['s3']['bucket']['name']
	key = event['Records'][0]['s3']['object']['key']
	
	# Generate a temp name, and set location for our original image
	object_key = str(uuid.uuid4()) + '-' + key
	img_download_path = '/tmp/{}'.format(object_key)
	
	# Download the source image from S3 to temp location within execution environment
	with open(img_download_path,'wb') as img_file:
		s3_client.download_fileobj(source_bucket, key, img_file)
		
	# Biggify the pixels and store a temp pixelated version
	pixelate(img_download_path, '/tmp/pixelated-{}'.format(object_key) )
	
	# uploading the pixelated version to destination bucket
	upload_key = 'pixelated-{}'.format(object_key)
	s3_client.upload_file('/tmp/pixelated-{}'.format(object_key), dest_bucket,upload_key)
	
def pixelate(image_path, pixelated_img_path):
	img = Image.open(image_path)
	temp_img = img.resize(pixels, Image.BILINEAR)
	new_img = temp_img.resize(img.size, Image.NEAREST)
	new_img.save(pixelated_img_path)
	
	
	