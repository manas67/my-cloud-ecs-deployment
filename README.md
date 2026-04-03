# 🚀 Cloud ECS Deployment — AWS + Terraform + GitHub Actions

A production-style cloud infrastructure project that automatically provisions and deploys a containerised web application to **AWS ECS (Elastic Container Service)** using **Terraform**, **Terragrunt**, and **GitHub Actions CI/CD**.

Built as part of my Cloud Engineer portfolio to demonstrate infrastructure-as-code, containerisation, automated deployments, and cloud monitoring.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    GitHub Actions                    │
│         (CI/CD on push to main / dev branch)        │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│                    AWS Cloud (eu-west-1)             │
│                                                      │
│   ┌──────────────┐       ┌──────────────────────┐   │
│   │   AWS ECR    │──────▶│     AWS ECS Fargate   │   │
│   │ (Docker Hub) │       │  ┌────────┐ ┌──────┐  │   │
│   └──────────────┘       │  │ React  │ │  API │  │   │
│                           │  │  App   │ │(Flask│  │   │
│   ┌──────────────┐        │  └────────┘ └──────┘  │   │
│   │  Terraform / │       └──────────────────────┘   │
│   │  Terragrunt  │                                   │
│   │  (IaC)       │       ┌──────────────────────┐   │
│   └──────────────┘       │  CloudWatch Logs      │   │
│                           │  (Monitoring)         │   │
│                           └──────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Infrastructure as Code | Terraform + Terragrunt |
| CI/CD | GitHub Actions |
| Containerisation | Docker + Docker Compose |
| Container Registry | AWS ECR |
| Orchestration | AWS ECS (Fargate) |
| Load Balancing | AWS ELB (Application Load Balancer) |
| Monitoring & Logs | AWS CloudWatch |
| Backend API | Python (FastAPI) |
| Frontend | JavaScript (React) |
| AWS Region | eu-west-1 (Ireland) |

---

## 📁 Project Structure

```
my-cloud-ecs-deployment/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline
├── containers/
│   ├── api/                    # Python FastAPI backend
│   │   └── app/
│   │       └── main.py
│   └── frontend/               # React JS frontend
│       └── app/
│           └── src/
│               └── App.js
├── terraform/                  # Infrastructure as Code
│   ├── terragrunt.hcl
│   ├── main.tf
│   └── cloudwatch.tf           # CloudWatch monitoring (added)
├── docker-compose.yml          # Local development setup
├── Makefile                    # Helper commands
└── README.md
```

---

## 🔐 Required GitHub Secrets

Go to your repo → **Settings** → **Secrets and variables** → **Actions**, and add:

```
AWS_ACCESS_KEY_ID       # Your AWS IAM access key
AWS_SECRET_ACCESS_KEY   # Your AWS IAM secret key
AWS_REGION              # eu-west-1
```

---

## 🚀 Getting Started

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed
- [Terraform](https://developer.hashicorp.com/terraform/install) installed
- [Terragrunt](https://terragrunt.gruntwork.io/docs/getting-started/install/) installed
- AWS CLI configured (`aws configure`)

### Local Development

```bash
# Clone the repo
git clone https://github.com/YOUR-USERNAME/my-cloud-ecs-deployment.git
cd my-cloud-ecs-deployment

# Start locally with Docker Compose
docker-compose up
```

App will be available at `http://localhost:80`

### Deploy to AWS

```bash
# Initialise Terraform/Terragrunt
make init

# Push Docker images to AWS ECR
make push-images

# Apply infrastructure
make apply
```

---

## 🔄 CI/CD Workflow

Deployments are fully automated via GitHub Actions:

| Branch | Environment |
|--------|-------------|
| `dev`  | Stage       |
| `main` | Production  |

Every push to these branches triggers:
1. Build Docker images
2. Push to AWS ECR
3. Deploy updated containers to AWS ECS

---

## 📊 Monitoring

This project includes **AWS CloudWatch** integration:
- ECS container logs streamed to `/ecs/my-cloud-app`
- Log retention set to **7 days**
- Easily extendable with CloudWatch Alarms for CPU/memory thresholds

---

## 🧹 Teardown

To destroy all AWS infrastructure and avoid charges:

```bash
make destroy
```

---

## 📌 Key Concepts Demonstrated

- **Infrastructure as Code** — All AWS resources defined in Terraform/Terragrunt, version-controlled and repeatable
- **CI/CD Automation** — Zero-touch deployments triggered by Git push
- **Containerisation** — App packaged in Docker, stored in ECR, orchestrated by ECS Fargate
- **Multi-environment** — Separate stage and production environments
- **Cloud Monitoring** — CloudWatch logs for observability
- **Security** — AWS secrets managed via GitHub Actions Secrets, IAM least-privilege

---

## 👤 Author

Built by **Manish Kumar** as part of a Cloud Engineer portfolio.

- 🔗 LinkedIn: [linkedin.com/in/being-manish]