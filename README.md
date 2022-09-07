[![CircleCI](https://dl.circleci.com/status-badge/img/gh/uzochukwueddie/chatty-backend/tree/develop.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/uzochukwueddie/chatty-backend/tree/develop)
[![codecov](https://codecov.io/gh/uzochukwueddie/chatty-backend/branch/develop/graph/badge.svg?token=VR3XBTQMCV)](https://codecov.io/gh/uzochukwueddie/chatty-backend)

# Chatty App Backend

|||||
|:-:|:-:|:-:|:-:|
|![First Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662482458/github_readme_images/aws_bxdmec.png)|![Second Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662482319/github_readme_images/Terraform_PrimaryLogo_Color_RGB_gcbknj.png)|![Third Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662482279/github_readme_images/nodejs-logo_hqxxed.svg)|![Fourth Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662482298/github_readme_images/ts-logo-512_jt9rmi.png)

|||||
|:-:|:-:|:-:|:-:|
|![First Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662482275/github_readme_images/redis-icon_xzk6f2.png)|![Second Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662482528/github_readme_images/Logo_RGB_Forest-Green_qjxd7x.png)|![Third Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662482577/github_readme_images/pm2_owgicz.png)|![Fourth Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662482745/github_readme_images/socketio_lcyu8y.jpg)

|||||
|:-:|:-:|:-:|:-:|
|![First Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662482903/github_readme_images/Expressjs_sza4ue.png)|![Second Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662483106/github_readme_images/bull_y4erki.png)|![Third Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662482947/github_readme_images/sendgrid_d1v6dc.jpg)|![Fourth Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662483059/github_readme_images/nodemailer_rfpntx.png)

||
|:-:|
![First Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662483242/github_readme_images/cloudinary_logo_blue_0720_2x_n8k46z.png)

Chatty App backend server is an interesting real-time social network application. It is developed using [node.js](https://nodejs.org/en/), [typescript](https://www.typescriptlang.org/), [redis](https://redis.io/download/) and [mongodb](https://www.mongodb.com/docs/manual/administration/install-community/).

You can find the repo for the frontend built with react [here](https://github.com/uzochukwueddie/chatty).

## Features
1. Signup and signin authentication
2. Forgot password and reset password
3. Change password when logged in
4. Create, read, update and delete posts
5. Post reactions
6. Comments
7. Followers, following, block and unblock
8. Private chat messaging with text, images, gifs, and reactions
9. Image upload
10. In-app notification and email notification

## Main tools
- Node.js
- Typescript
- MongoDB
- Mongoose
- Redis
- Express
- Bull
- PM2
- AWS
- Terraform
- Nodemailer
- Sendgrid mail
- Cloudinary
- Jest
- Lodash
- Socket.io

## Requirements

- Node 16.x or higher
- Redis ([https://redis.io/download/](https://redis.io/download/))
- MongoDB ([https://www.mongodb.com/docs/manual/administration/install-community/](https://www.mongodb.com/docs/manual/administration/install-community/))
- Typescript
- API key, secret and cloud name from cloudinary [https://cloudinary.com/](https://cloudinary.com/)
- Local email sender and password [https://ethereal.email/](https://ethereal.email/)

You'll need to copy the contents of `.env.development.example`, add to `.env` file and update with the necessary information.

## Local Installation

- There are three different branches develop, staging and main. The develop branch is the default branch.

```bash
git clone -b develop https://github.com/uzochukwueddie/chatty-backend.git
cd chatty-backend
npm install
```
- To start the server after installation, run
```bash
npm run dev
```
- Inside the `setupServer.ts` file, comment the line `sameSite: 'none'`.
- You'll need to uncomment that line again before you deploy to AWS.

Make sure mongodb and redis are both running on your local machine.

## Unit tests

- You can run the command `npm run test` to execute the unit tests added to the features controllers.

## API Endpoints
- The actual endpoints for the application can be found inside the folder named `endpoints` [https://github.com/uzochukwueddie/chatty-backend/tree/develop/endpoints](https://github.com/uzochukwueddie/chatty-backend/tree/develop/endpoints). 
- The endpoint files all have a `.http` extension. 
- To use this files to make api calls, install the extension called [rest client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) on vscode.
- Update the endpoints http files before using.
- The files inside the endpoints folder contains APIs for
  - Authentication
  - Chat
  - Comments
  - Followers, following, block and unblock
  - Health
  - Images
  - Notification
  - Posts
  - Reactions
  - User

## View Data
- You can view the contents of your redis cache by using a tool called [redis-commander](https://www.npmjs.com/package/redis-commander).
- Download mongodb compass to view data. [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass).

# AWS Setup
- You can create an account on AWS if you don't have one already.
- Download and install aws cli.
- On AWS, create an IAM user. You'll get a key and secret.
- Use aws configure command to add your iam secret and key to your local machine.
- To deploy the backend server on AWS, it is required you have a domain to use.
- With that domain, manually create a route53 hosted zone on AWS.
![](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662494233/github_readme_images/Screenshot_2022-09-06_at_9.55.11_PM_vzovub.png)
- Copy the hosted zone NS properties and add to the nameservers section of your domain on the dashboard of your domain name provider. e.g: godaddy, namecheap etc.
![](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662494239/github_readme_images/Screenshot_2022-09-06_at_9.56.03_PM_ppb7ll.png)
- For example, on namecheap.com
![](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662494440/github_readme_images/Screenshot_2022-09-06_at_10.00.21_PM_fd32tx.png)

## AWS Resources Used
- VPC
- Subnets
- Internet gateways
- Route tables
- Elastic ips
- Nat gateways
- Security groups
- ALB target groups
- Route53
- AWS Certificate Manager
- Application load balancers
- IAM roles
- Elasticache
- EC2 launch config
- EC2 instances
- Autoscaling group
- S3
- Code deploy
- Cloudwatch

![alt](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662499152/github_readme_images/Screenshot_2022-09-06_at_11.18.49_PM_iqxk9u.png)

## AWS Infrastructure Setup with Terraform
- Make sure to uncomment this line `sameSite: 'none'` inside `setupServer.ts` file.
- Install [terraform](https://www.terraform.io/downloads)
- Terraform stores state about your managed infrastructure and configuration. This state is used by Terraform to map real world resources to your configuration, keep track of metadata, and to improve performance for large infrastructures.
- This state is stored by default in a local file named "terraform.tfstate", but it can also be stored remotely, which works better in a team environment.
- Update the `variables.tf` file with the correct data. Update the properties with comments.
- To store your terraform remote state on AWS, first create a unique S3 bucket with a sub-folder name called `develop`.
- Add that S3 bucket name to `main.tf` file. Also add your region to the file.
- Create a keyPair on AWS. Keep the key safe on your local machine and add the name of the keyPair to `ec2_launch_config.tf` and `bastion_hosts.tf` files.
- Before running the terraform apply command to your resources, you need to
  - create a new s3 bucket to store env files
  - inside the created s3 bucket, add a sub-folder called backend and inside the backend folder another sub-folder called develop. Bucket path should be something like `<your-s3-bucket>/backend/develop`
  - in your project, create a `.env.develop` file. Add the contents of `.env` to the new file.
  - the contents of `.env.develop` needs to be properties that will be used when deployed
    - `DATABASE_URL` should be an actual mongodb url. You can create an account on [mongodb atlas](https://www.mongodb.com/atlas/database) and create a new database.
    - `NODE_ENV` can be set to production
    - `CLIENT_URL` can be set to the frontend application local url or actual domain
    - `API_URL` should be `https://api.dev.<your-backend-domain>` that you specified inside your terraform `variables.tf` file.
    - `SENDGRID_API_KEY` and `SENDGRID_SENDER` should be created from sendgrid dashboard. Create an account.
  - after updating the `.env.develop` file, you can zip it and upload it to the new s3 bucket you created to store env files. Upload using aws cli
    - `zip env-file.zip .env.develop`. The file must be called `env-file.zip`.
    - `aws --region <your-region> s3 cp env-file.zip s3://<your-s3-bucket>/backend/develop/`
- Go into the `user-data.sh` and `update-env-file.sh` files and update.
- Once the `env-file.zip` has been added to your s3 bucket, you can execute inside the `deployment` folder, the commands:
  - `terraform init`
  - `terraform validate`
  - `terraform fmt`
  - `terraform plan`
  - `terraform apply -auto-approve`
- It will take sometime to create the resources. If everything works well, you should be able to access the backend dev api endpoints.
- To destroy all created resources, run
  - `terraform destroy`

## Setup CI/CD Pipeline with CircleCI

- Create an account on circleci.
- Signup or login with the github or bitbucket account where you stored your code.
- Setup your project.
- Add the environment variables you see on the screenshot to circleci.
![](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662497302/github_readme_images/Screenshot_2022-09-06_at_10.44.30_PM_ur89p3.png)
- For `CODECOV_TOKEN`, visit [CodeCov](https://about.codecov.io/) and signup or login with the same account where you have your project stored.
  - Once you login and setup your project, you will receive a token. Add that token to circleci.
- For `CODE_DEPLOY_UPDATE`, the default value is false. That is the first time you are setting up your pipeline and infrastructure. Once everything is setup and running, if you need to update your backend code, then you can change the property to true.
- `SLACK_ACCESS_TOKEN` and `SLACK_DEFAULT_CHANNEL` can be obtained by following this [documentation](https://github.com/CircleCI-Public/slack-orb/wiki/Setup).

### Before Starting a Build
- Inside the `circleci.yml` file, you need to make some updates.
- There are some properties named `<variable-prefix>` that you need to replace with the `prefix` value from your terraform `variables.tf`. Search the config.yml file and replace `<variable-prefix>`.

## You can find the frontend code [here](https://github.com/uzochukwueddie/chatty)
