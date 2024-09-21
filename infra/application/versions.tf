
terraform {
  required_version = ">= 1.0.9"
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
