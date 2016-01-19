s3cmd --dry-run -r --guess-mime-type --acl-public --exclude-from=utils/exclusions.txt --progress sync ./build/ s3://ajfisher.me/
s3cmd -r --acl-public --guess-mime-type --exclude-from=utils/exclusions.txt --progress sync ./build/ s3://ajfisher.me/
