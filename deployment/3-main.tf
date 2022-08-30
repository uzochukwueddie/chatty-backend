terraform {
  backend "s3" {
    bucket  = "chatty-app-terraform-state"
    key     = "staging/chatapp.tfstate"
    region  = "eu-central-1"
    encrypt = true
  }
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"

  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    ManagedBy   = "Terraform"
    Owner       = "Uzochukwu Eddie Odozi"
  }
}
