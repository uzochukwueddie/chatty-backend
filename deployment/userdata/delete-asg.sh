#!/bin/bash

ASG=$(aws autoscaling describe-auto-scaling-groups --no-paginate --output text --query "AutoScalingGroups[? Tags[? (Key=='Type') && Value=='$ENV_TYPE']]".AutoScalingGroupName)
aws autoscaling delete-auto-scaling-group --auto-scaling-group-name $ASG --force-delete
