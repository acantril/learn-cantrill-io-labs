import pymysql
import boto3

# Connect to the AWS SSM Parameter store
ssm = boto3.client('ssm', region_name='us-east-1')

# Get the database parameters from the Parameter store
host = ssm.get_parameters(Names=['/appointment-app/prod/db-url'])['Parameters'][0]['Value']
user = ssm.get_parameters(Names=['/appointment-app/prod/db-user'])['Parameters'][0]['Value']
password = ssm.get_parameters(Names=['/appointment-app/prod/db-password'], WithDecryption=True)['Parameters'][0]['Value']

# Connect to the database using the parameters
conn = pymysql.connect(
    host=host,
    user=user,
    password=password
)

if conn.open:
    print("Connected to MySQL database")

else:
    print("Unable to connect to the database. Review the parameters from the Parameter store")


cursor = conn.cursor()
cursor.execute("CREATE DATABASE pets")


print("Database created successfully")

cursor.execute("USE pets")
table = """
CREATE TABLE appointments (
id INT AUTO_INCREMENT PRIMARY KEY,
date DATE NOT NULL,
time TIME NOT NULL,
pet_name VARCHAR(255) NOT NULL,
pet_type VARCHAR(255) NOT NULL
);
"""
cursor.execute(table)

print("Table created successfully")

conn.close()
