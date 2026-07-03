output "bucket_name" {
  value = aws_s3_bucket.portfolio.bucket
}

output "website_endpoint" {
  value = aws_s3_bucket_website_configuration.portfolio.website_endpoint
}