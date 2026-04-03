from fastapi import FastAPI
from datetime import datetime

# -----------------------------------------------------------
# Cloud ECS Deployment — Python API
# Author: Manish
# Description: Simple FastAPI backend deployed to AWS ECS
#              via Terraform + GitHub Actions CI/CD pipeline
# -----------------------------------------------------------

app = FastAPI(
    title="Cloud ECS API",
    description="REST API running on AWS ECS Fargate — part of Cloud Engineer portfolio",
    version="1.0.0"
)


@app.get("/api/health")
def health_check():
    """Health check endpoint — used by AWS ELB target group"""
    return {
        "status": "healthy",
        "service": "cloud-app-api",
        "timestamp": datetime.utcnow().isoformat(),
        "environment": "production"
    }


@app.get("/api/info")
def project_info():
    """Returns project and author information"""
    return {
        "project": "Cloud ECS Deployment",
        "description": "Containerised app deployed to AWS ECS using Terraform and GitHub Actions",
        "author": "[YOUR NAME]",
        "tech_stack": {
            "infrastructure": ["Terraform", "Terragrunt", "AWS ECS", "AWS ECR"],
            "ci_cd": "GitHub Actions",
            "monitoring": "AWS CloudWatch",
            "backend": "Python FastAPI",
            "frontend": "React"
        },
        "aws_region": "eu-west-1"
    }


@app.get("/api/tasks")
def get_tasks():
    """Sample endpoint — returns a list of cloud tasks (demo data)"""
    tasks = [
        {"id": 1, "title": "Provision ECS Cluster", "status": "done", "service": "AWS ECS"},
        {"id": 2, "title": "Set up CloudWatch Logging", "status": "done", "service": "AWS CloudWatch"},
        {"id": 3, "title": "Configure Load Balancer", "status": "done", "service": "AWS ELB"},
        {"id": 4, "title": "Push Docker Images to ECR", "status": "done", "service": "AWS ECR"},
        {"id": 5, "title": "Set up GitHub Actions CI/CD", "status": "done", "service": "GitHub Actions"},
    ]
    return {"tasks": tasks, "total": len(tasks)}
