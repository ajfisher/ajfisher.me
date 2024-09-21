# Location for the frontend code to reside
resource "aws_s3_bucket" "website_code" {
  bucket = "aj-web-ajfisher-me-${var.env}"

  tags = {
    src       = "terraform"
    component = "code"
  }
}

resource "aws_s3_bucket_policy" "website_code" {
  bucket = aws_s3_bucket.website_code.id

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "OnlyCloudfrontReadAccess",
    "Effect": "Allow",
    "Principal": {
      "AWS": "${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"
    },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::aj-web-ajfisher-me-${var.env}/*"
  }]
}
POLICY
}

resource "aws_s3_bucket_logging" "website_code" {
  bucket = aws_s3_bucket.website_code.id

  target_bucket = aws_s3_bucket.website_logs.id
  target_prefix = "aj-web-logs-${var.env}/"
}

resource "aws_s3_bucket_website_configuration" "website_code" {
  bucket = aws_s3_bucket.website_code.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_cors_configuration" "website_code" {
  bucket = aws_s3_bucket.website_code.id

  cors_rule {
    allowed_origins = ["https://ajfisher.me"]
    allowed_headers = ["Authorization", "Content-Length"]
    allowed_methods = ["GET", "HEAD"]
  }
}

resource "aws_s3_bucket_ownership_controls" "website_code" {
  bucket = aws_s3_bucket.website_code.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "website_code" {
  depends_on = [aws_s3_bucket_ownership_controls.website_code]

  bucket = aws_s3_bucket.website_code.id
  acl = "private"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "website_code" {
  bucket = aws_s3_bucket.website_code.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "AES256"
    }
  }
}
