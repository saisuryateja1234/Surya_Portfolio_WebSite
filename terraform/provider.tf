provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "AWS DevOps Portfolio"
      Environment = "Production"
      ManagedBy   = "Terraform"
      Owner       = "Surya"
    }
  }
}