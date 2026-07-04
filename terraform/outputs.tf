output "bucket_name" {
  value = aws_s3_bucket.portfolio.bucket
}

output "website_endpoint" {
  value = aws_s3_bucket_website_configuration.portfolio.website_endpoint
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.portfolio.domain_name
}