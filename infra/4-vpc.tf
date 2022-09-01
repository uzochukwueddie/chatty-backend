resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr_block
  enable_dns_hostnames = true

  provisioner "local-exec" {
    command = file("./userdata/install-zip.sh")

    environment = {
      VPC_ID = self.id
    }
  }

  tags = merge(
    local.common_tags,
    tomap({ "Name" = "${local.prefix}" })
  )
}
