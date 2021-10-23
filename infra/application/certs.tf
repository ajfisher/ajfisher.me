# Add the certificates for the custom domain
resource "aws_acm_certificate" "app_cert" {
  domain_name       = "www.ajfisher.me"
  validation_method = "DNS"
  provider          = aws.useast

  lifecycle {
    create_before_destroy = true
  }
}

# sets up the dns entry to be used for verification
resource "aws_route53_record" "app_cert_validation" {
  provider = aws
  for_each = {
    for dvo in aws_acm_certificate.app_cert.domain_validation_options : dvo.domain_name => {
      name = dvo.resource_record_name
      type = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }

  name    = each.value.name
  type    = each.value.type
  zone_id = var.zone_id
  records = [each.value.record]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "app_cert" {
  provider                = aws.useast
  certificate_arn         = aws_acm_certificate.app_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.app_cert_validation: record.fqdn]
}

# add the apex domain cert now
resource "aws_acm_certificate" "apex_cert" {
  domain_name       = "ajfisher.me"
  validation_method = "DNS"
  provider          = aws.useast

  lifecycle {
    create_before_destroy = true
  }
}

# sets up the dns entry to be used for verification
resource "aws_route53_record" "apex_cert_validation" {
  provider = aws
  for_each = {
    for dvo in aws_acm_certificate.apex_cert.domain_validation_options : dvo.domain_name => {
      name = dvo.resource_record_name
      type = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }

  name    = each.value.name
  type    = each.value.type
  zone_id = var.zone_id
  records = [each.value.record]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "apex_cert" {
  provider                = aws.useast
  certificate_arn         = aws_acm_certificate.apex_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.apex_cert_validation : record.fqdn]
}

