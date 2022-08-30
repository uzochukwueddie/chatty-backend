#!/bin/bash

DIT="/home/ec2-user/chatty-backend"
if [ -d "$DIR" ]; then
  cd /home/ec2-user
  sudo rm -rf chatty-backend
else
  echo "Directory does not exist"
fi
