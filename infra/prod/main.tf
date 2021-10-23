variable "region" {
  default = "ap-southeast-2"
}

module "prod" {
  source = "../application"

  providers = {
    aws   = aws
    aws.useast = aws.useast
  }

  region        = "ap-southeast-2"
  env           = "prod"
  domain_prefix = "www"
  zone_id       = "Z29IXIO5VKLPN4"
}

