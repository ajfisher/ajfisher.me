
terraform {
  required_version = ">= 0.12"
}

provider "aws" {
  alias   = "useast"
  region  = "us-east-1"
}
