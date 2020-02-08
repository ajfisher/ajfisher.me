variable "region" {
  default = "ap-southeast-2"
}

module "prod" {
  source = "../application"

  region        = "ap-southeast-2"
  env           = "prod"
  domain_prefix = "www"
  zone_id       = "Z29IXIO5VKLPN4"
}
