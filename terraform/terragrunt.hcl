# -----------------------------------------------------------
# terragrunt.hcl
# Root Terragrunt configuration
# Region changed to eu-west-1 (Ireland)
# -----------------------------------------------------------

locals {
  aws_region  = "eu-west-1"
  project     = "my-cloud-ecs-deployment"
}

remote_state {
  backend = "s3"
  config = {
    encrypt        = true
    bucket         = "${local.project}-terraform-state"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = local.aws_region
    dynamodb_table = "${local.project}-terraform-lock"
  }
}

inputs = {
  aws_region = local.aws_region
  project    = local.project
}

generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
provider "aws" {
  region = "${local.aws_region}"

  default_tags {
    tags = {
      Project   = "${local.project}"
      ManagedBy = "Terraform"
    }
  }
}
EOF
}
