s3cmd --dry-run -r --acl-public --exclude-from=utils/exclusions.txt --progress sync ./build/ s3://ajfisher.me/
s3cmd -r --acl-public --exclude-from=utils/exclusions.txt --progress sync ./build/ s3://ajfisher.me/
