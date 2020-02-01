# set up the cloudfront distribution to access the S3 bucket.
resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "cloudfront origin access identity"
}

resource "aws_cloudfront_distribution" "web_app" {
  enabled             = true
  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"
  http_version        = "http2"
  wait_for_deployment = false

  aliases = [ "www.ajfisher.me" ]

  origin {
    origin_id   = "origin-web-app-${aws_s3_bucket.website_code.id}"
    domain_name = "${aws_s3_bucket.website_code.bucket_regional_domain_name}"

    s3_origin_config {
      origin_access_identity = "${aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path}"
    }
  }

  default_root_object = "index.html"

  custom_error_response {
    error_code = "404"
    response_page_path = "/404.html"
    response_code = "404"
  }

  default_cache_behavior {
    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]
    target_origin_id = "origin-web-app-${aws_s3_bucket.website_code.id}"

    min_ttl          = "0"
    default_ttl      = "300"                                              //3600
    max_ttl          = "1200"                                             //86400

    // This redirects any HTTP request to HTTPS. Security first!
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn       = "${aws_acm_certificate.app_cert.arn}"
    ssl_support_method        = "sni-only"
    minimum_protocol_version  = "TLSv1.1_2016"
  }

  depends_on = [ "aws_acm_certificate_validation.app_cert" ]
}

resource "aws_route53_record" "web_app" {
  # need to use the root account due to the top level domain
  provider  = "aws"
  zone_id   = "${var.zone_id}"
  name      = "www.ajfisher.me"
  type      = "A"
  alias {
    name    = "${aws_cloudfront_distribution.web_app.domain_name}"
    zone_id = "${aws_cloudfront_distribution.web_app.hosted_zone_id}"
    evaluate_target_health = false
  }
}
