# set up the cloudfront distribution to access the S3 bucket.
resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "cloudfront origin access identity"
}

resource "aws_cloudfront_cache_policy" "web_app_cache_policy" {
  name    = "ajfisher-web-app-cache-policy"
  comment = "Forward Accept and Prefer headers so Markdown and HTML variants stay isolated"

  # AWS requires caching be enabled (non-zero default/max TTL) to forward custom headers
  # even though Lambda@Edge/origin response headers govern cache duration.
  # Keep the window to 1s so CloudFront revalidates almost immediately.
  min_ttl     = 0
  default_ttl = 1
  max_ttl     = 1

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }

    headers_config {
      header_behavior = "whitelist"
      headers {
        items = ["Accept", "Prefer"]
      }
    }

    query_strings_config {
      query_string_behavior = "none"
    }

    enable_accept_encoding_brotli = true
    enable_accept_encoding_gzip   = true
  }
}

resource "aws_cloudfront_distribution" "web_app" {
  enabled             = true
  is_ipv6_enabled     = true
  price_class         = "PriceClass_All"
  http_version        = "http2and3"
  wait_for_deployment = false

  aliases = ["ajfisher.me"]

  origin {
    origin_id   = "origin-web-app-${aws_s3_bucket.website_code.id}"
    domain_name = aws_s3_bucket.website_code.bucket_regional_domain_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  default_root_object = "index.html"

  custom_error_response {
    error_code         = "403"
    response_page_path = "/404.html"
    response_code      = "404"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "origin-web-app-${aws_s3_bucket.website_code.id}"
    cache_policy_id  = aws_cloudfront_cache_policy.web_app_cache_policy.id

    // don't allow any cache set in cf - it should all come from response
    // headers of origin - this is from lambda as well
    # min_ttl          = "0"
    # default_ttl      = "30"                //3600
    # max_ttl          = "30"               //86400

    // This redirects any HTTP request to HTTPS. Security first!
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    # redirect the request if needed
    lambda_function_association {
      event_type = "origin-request"
      lambda_arn = aws_lambda_function.redirect_lambda.qualified_arn
    }

    # add the correct header
    lambda_function_association {
      event_type = "origin-response"
      lambda_arn = aws_lambda_function.header_lambda.qualified_arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.apex_cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  depends_on = [aws_acm_certificate_validation.apex_cert]
}

resource "aws_route53_record" "web_apex" {
  # need to use the root account due to the top level domain
  provider = aws
  zone_id  = var.zone_id
  name     = "ajfisher.me"
  type     = "A"
  alias {
    name                   = aws_cloudfront_distribution.web_app.domain_name
    zone_id                = aws_cloudfront_distribution.web_app.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_cloudfront_distribution" "redirect_distribution" {
  enabled         = true
  is_ipv6_enabled = true

  aliases             = ["www.ajfisher.me"]
  price_class         = "PriceClass_All"
  http_version        = "http2and3"
  wait_for_deployment = false

  origin {
    domain_name = aws_s3_bucket_website_configuration.redirect_to_apex.website_endpoint
    origin_id   = "origin-redirect-app-${aws_s3_bucket.redirect_to_apex.id}"

    // The redirect origin must be http even if it's on S3 for redirects to work properly
    // so the website_endpoint is used and http-only as S3 doesn't support https for this
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "origin-redirect-app-${aws_s3_bucket.redirect_to_apex.id}"

    forwarded_values {
      cookies {
        forward = "none"
      }
      query_string = false
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    max_ttl                = 31536000
    default_ttl            = 86400
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.app_cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  depends_on = [aws_acm_certificate_validation.app_cert]
}

resource "aws_route53_record" "web_redirect" {
  # need to use the root account due to the top level domain
  provider = aws
  zone_id  = var.zone_id
  name     = "www"
  type     = "A"
  alias {
    name                   = aws_cloudfront_distribution.redirect_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.redirect_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

