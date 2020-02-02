# policy for the bucket
data "template_file" "bucket_policy" {
  template = <<EOF
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
EOF
}

data "template_file" "public_bucket_policy" {
  template = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicRead",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::aj-web-ajfisher-me-${var.env}/*"
  }]
}
EOF
}


# Location for the frontend code to reside
resource "aws_s3_bucket" "website_code" {
  bucket  = "aj-web-ajfisher-me-${var.env}"
  acl     = "private"
#  acl     = "public-read"

  logging {
    target_bucket = "${aws_s3_bucket.website_logs.id}"
    target_prefix = "aj-web-logs-${var.env}/"
  }

  website {
    index_document = "index.html"
    error_document = "404.html"
  }

  cors_rule {
    allowed_origins = ["https://www.ajfisher.me"]
    allowed_headers = ["Authorization", "Content-Length"]
    allowed_methods = ["GET", "HEAD"]
  }

  tags {
    src       = "terraform"
    component = "code"
  }
  policy = "${data.template_file.bucket_policy.rendered}"
}
