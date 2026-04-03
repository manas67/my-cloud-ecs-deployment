# -----------------------------------------------------------
# cloudwatch.tf
# CloudWatch Monitoring — added for portfolio enhancement
# Author: Manish Kumar
# -----------------------------------------------------------

variable "environment" {
  description = "Deployment environment (e.g. stage or prod)"
  type        = string
  default     = "prod"
}
# Log group for ECS container logs
resource "aws_cloudwatch_log_group" "app_logs" {
  name              = "/ecs/my-cloud-app"
  retention_in_days = 7

  tags = {
    Project     = "my-cloud-ecs-deployment"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# Optional: CloudWatch Alarm for high CPU usage on ECS service
resource "aws_cloudwatch_metric_alarm" "ecs_cpu_high" {
  alarm_name          = "my-cloud-app-cpu-high-${var.environment}"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = 60
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "Alert when ECS CPU usage exceeds 80%"

  dimensions = {
    ClusterName = "my-cloud-app-cluster-${var.environment}"
    ServiceName = "my-cloud-app-service-${var.environment}"
  }

  tags = {
    Project     = "my-cloud-ecs-deployment"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}
