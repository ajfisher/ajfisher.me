#s3cmd --dry-run -r --guess-mime-type --acl-public --exclude-from=utils/exclusions.txt --progress sync ./build/ s3://ajfisher.me/
#nvm use 5.3.0
echo "Resizing images"
node images.js
echo "Building site files"
node index.js production
echo "Upload to S3"
s3cmd -r --acl-public --guess-mime-type --exclude-from=utils/exclusions.txt --progress sync ./build/ s3://ajfisher.me/
echo "Site updates complete"
