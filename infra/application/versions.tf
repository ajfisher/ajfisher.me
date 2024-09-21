
terraform {
  required_version = ">= 1.9.2"
  required_providers {
    archive = {
      source = "hashicorp/archive"
    }
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.0"
      configuration_aliases = [ aws.useast ]
    }
  }
}
