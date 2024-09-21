provider "aws" {
  region  = "ap-southeast-2"
}

# this is used for dealing with ACM
provider "aws" {
  alias   = "useast"
  region  = "us-east-1"
}

resource "aws_s3_bucket" "ajsite-terraform-state" {
  bucket = "ajfisher-site-terraform-state"

  #  versioning {
  #    enabled = true
  #  }

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Name = "Terraform S3 remote state store"
  }

  #  server_side_encryption_configuration {
  #    rule {
  #      apply_server_side_encryption_by_default {
  #        sse_algorithm = "AES256"
  #      }
  #    }
  #  }
}
resource "aws_s3_bucket_versioning" "ajfisher-terraform-state-versioning" {
  bucket = "ajfisher-site-terraform-state"

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "ajfisher-terraform-state-encryption" {
  bucket = "ajfisher-site-terraform-state"

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "AES256"
    }
  }
}

terraform {
  backend "s3" {
    region = "ap-southeast-2"
    bucket = "ajfisher-site-terraform-state"
    key    = "aj_site"
  }
  #  backend "local" {
  #    path = "./terraform.tfstate"
  #  }
}

