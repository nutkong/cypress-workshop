variable "aws_access_id" {
  type = "string"
}

variable "aws_secret_key" {
  type = "string"
}

locals {
  server_amount      = 4
  vpc_cidr_block     = "10.0.0.0/16"
  web_server_inbound = 80
  db_server_inbound  = 3306
}

provider "aws" {
  region     = "ap-southeast-1"
  access_key = "${var.aws_access_id}"
  secret_key = "${var.aws_secret_key}"
}

data "aws_ami" "centos" {
  most_recent = true

  filter {
    name   = "image-id"
    values = ["ami-0b4dd9d65556cac22"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "is-public"
    values = ["true"]
  }

  owners = ["679593333241"]
}

resource "aws_vpc" "workshop_vpc" {
  cidr_block = "${local.vpc_cidr_block}"

  tags = {
    Name = "WORKSHOP_IGW"
  }
}

resource "aws_internet_gateway" "default_igw" {
  vpc_id = "${aws_vpc.workshop_vpc.id}"

  tags = {
    Name = "DEFAULT_WORKSHOP_IGW"
  }
}

resource "aws_subnet" "workshop_public_subnet" {
  vpc_id     = "${aws_vpc.workshop_vpc.id}"
  cidr_block = "10.0.1.0/24"

  tags = {
    Name = "WORKSHOP_PUBLIC_SUBNET"
  }
}


resource "aws_security_group" "web_server_sec" {
  name = "web_server_sec"

  ingress {
    from_port   = "${local.web_server_inbound}"
    to_port     = "${local.web_server_inbound}"
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "db_server_sec" {
  name = "web_server_sec"

  ingress {
    from_port   = "${local.db_server_inbound}"
    to_port     = "${local.db_server_inbound}"
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web_server" {
  count                  = "${local.server_amount}"
  ami                    = "${data.aws_ami.centos.id}"
  instance_type          = "t2.large"
  subnet_id              = "${aws_subnet.workshop_public_subnet.id}"
  vpc_security_group_ids = ["${aws_security_group.web_server_sec.id}"]

  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo yum install epel-release
              EOF

  tags = {
    Name = "G${count.index + 1}_CYPRESS_WEB_SERVER"
  }
}

resource "aws_instance" "db_server" {
  count                  = "${local.server_amount}"
  ami                    = "${data.aws_ami.centos.id}"
  instance_type          = "t2.large"
  subnet_id              = "${aws_subnet.workshop_public_subnet.id}"
  vpc_security_group_ids = ["${aws_security_group.db_server_sec.id}"]

  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo yum install epel-release
              EOF

  tags = {
    Name = "G${count.index + 1}_CYPRESS_DATABASE_SERVER"
  }
}
