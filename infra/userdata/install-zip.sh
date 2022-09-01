#!/bin/bash

echo "***********VPC_ID***********"
echo $VPC_ID
echo "***********VPC_ID***********"

echo "This is the VPC ID - $VPC_ID" > text.txt
apt-get install -y sudo
ls -al /bin/sh && sudo rm /bin/sh && sudo ln -s /bin/bash /bin/sh && ls -al /bin/sh
sudo apt-get install zip
zip -v
zip text.zip text.txt
aws --region eu-central-1 s3 cp text.zip s3://chatapp-testing-app/develop/
rm -rf text.txt
rm -rf text.zip
