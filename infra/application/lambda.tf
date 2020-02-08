resource "aws_iam_role" "lambda_execution_role" {
  name = "ajfisher_site_lambda_execution_role"
  description = "Allow lambdas to be able to affect Cloudfront requests and responses"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": ["lambda.amazonaws.com", "edgelambda.amazonaws.com"]
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_policy" "lambda_logging_policy" {
  name = "ajfisher_site_lambda_policy"
  path = "/"
  description = "Policy, primarily for logging"

  policy= <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:*"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role = "${aws_iam_role.lambda_execution_role.name}"
  policy_arn = "${aws_iam_policy.lambda_logging_policy.arn}"
}

data "archive_file" "cloudfront_lambda_functions" {
  type = "zip"
  output_path = "/tmp/cloudfront_lambda_functions.zip"
  source_dir = "../../app/handlers"
}

resource "aws_lambda_function" "redirect_lambda" {
  provider = "aws.useast"
  filename = "${data.archive_file.cloudfront_lambda_functions.output_path}"
  function_name = "test_ajsite_index_redirect_${var.env}"
  role = "${aws_iam_role.lambda_execution_role.arn}"
  handler = "gatsby_index_redirect.handler"
  publish = true

  source_code_hash = "${data.archive_file.cloudfront_lambda_functions.output_base64sha256}"

  runtime = "nodejs10.x"
}
