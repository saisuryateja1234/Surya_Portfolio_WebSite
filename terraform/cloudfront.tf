resource "aws_cloudfront_distribution" "portfolio" {

  origin {
    domain_name = aws_s3_bucket_website_configuration.portfolio.website_endpoint
    origin_id   = "portfolio-s3"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"

      origin_ssl_protocols = ["TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Portfolio Website CloudFront Distribution"
  default_root_object = "index.html"

  default_cache_behavior {

    allowed_methods = ["GET", "HEAD"]

    cached_methods = ["GET", "HEAD"]

    target_origin_id = "portfolio-s3"

    viewer_protocol_policy = "redirect-to-https"

    compress = true

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {

    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  price_class = "PriceClass_100"

  tags = {
    Name = "portfolio-cloudfront"
  }
}