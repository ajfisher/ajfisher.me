# Builds the dns routes for route 53 in the root account

# Google site verification record
resource "aws_route53_record" "verify" {
  # need to use the root account due to the top level domain
  provider = aws
  zone_id  = var.zone_id
  type     = "TXT"
  records  = ["google-site-verification=yNFb9g6i-b7KdRw4QjuwYPoInuB-jvI7n1z7TMUM338"]
  name     = "ajfisher.me"
  ttl      = 900
}

