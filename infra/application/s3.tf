
# logfiles for the front end application
resource "aws_s3_bucket" "website_logs" {
  bucket  = "aj-web-logs-${var.env}"
  acl     = "log-delivery-write"
  tags {
    src       = "terraform"
    component = "logs"
  }
}

# Deploy user which will be used to upload files to the bucket

resource "aws_iam_user" "deploy_user" {
  name = "aj_site_${var.env}_deploy_user"
}

resource "aws_iam_access_key" "deploy_user" {
  user = "${aws_iam_user.deploy_user.name}"
}

resource "aws_iam_user_policy" "deploy_data_rw_policy" {
  name = "deploy_data_rw_policy"
  user = "${aws_iam_user.deploy_user.name}"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
		{
			"Effect": "Allow",
			"Action": [
			"s3:Get*",
			"s3:List*"
			],
			"Resource": [
			"${aws_s3_bucket.website_code.arn}"
			]
		},
    {
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "${aws_s3_bucket.website_code.arn}/*"
      ]
    }
  ]
}
EOF
}

