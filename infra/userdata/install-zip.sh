#!/bin/bash

echo "***********VPC_ID***********"
echo $VPC_ID
echo "***********VPC_ID***********"

echo "This is the VPC ID - $VPC_ID" > text.txt
sudo apt-get install zip
zip -v
sudo apt install zip
zip -v
zip text.zip text.txt
aws --region eu-central-1 s3 cp text.zip s3://chatapp-testing-app/develop/
rm -rf text.txt
rm -rf text.zip
