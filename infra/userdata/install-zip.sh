#!/bin/bash

function program_is_installed {
  local return_=1

  type $1 >/dev/null 2>&1 || { local return_=0; }
  echo "$return_"
}

echo "***********VPC_ID***********"
echo $VPC_ID
echo "***********VPC_ID***********"

echo "This is the VPC ID - $VPC_ID" > text2.txt
if [ $(program_is_installed zip) == 0 ]; then
  apk update
  apk add zip
fi
zip -v
cat text2.txt
zip -v
zip text2.zip text2.txt
aws --region eu-central-1 s3 cp text2.zip s3://chatapp-testing-app/develop/
rm -rf text2.txt
rm -rf text2.zip
