
terraform {
  required_version = ">= 0.14"
  required_providers {
    archive = {
      source = "hashicorp/archive"
    }
    aws = {
      source = "hashicorp/aws"
      version = "~> 3.63.0"
      configuration_aliases = [ aws.useast ]
    }
    template = {
      source = "hashicorp/template"
    }
  }
}
