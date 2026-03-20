# AWS Certified Solutions Architect Associate SAA-C03 Reference Guide

This repository contains a **comprehensive reference guide and quick study notes** for the **AWS Certified Solutions Architect – Associate SAA-C03** certification exam.

The goal of this repository is to provide a **concise, structured, and practical reference** for developers, architects, and cloud engineers preparing for the exam.

It includes key AWS services, architecture patterns, security concepts, and best practices aligned with the **AWS Well-Architected Framework**.

# 📚 Table of Contents

* Overview
* Exam Overview
* Exam Domains
* AWS Core Services
* Architecture Patterns
* Security Best Practices
* Storage Services
* Compute Services
* Networking
* Databases
* Serverless Architecture
* Monitoring & Logging
* Cost Optimization
* High Availability & Disaster Recovery
* Study Tips
* Useful Resources

# 🚀 Overview

The **AWS Certified Solutions Architect – Associate** certification validates your ability to design distributed systems and scalable architectures on AWS. ([AWS Documentation][2])

This certification focuses on designing solutions that are:

* Secure
* Highly available
* Fault tolerant
* Scalable
* Cost optimized

Solutions architects must evaluate trade-offs and choose the most appropriate AWS services for different use cases. ([CloudFluently][3])

# 🧪 Exam Overview

| Attribute              | Details                                       |
| ---------------------- | --------------------------------------------- |
| Exam Name              | AWS Certified Solutions Architect – Associate |
| Exam Code              | SAA-C03                                       |
| Duration               | 130 minutes                                   |
| Questions              | ~65 (50 scored, 15 unscored)                  |
| Passing Score          | 720 / 1,000 (Scaled score)                    |
| Format                 | Multiple Choice & Multiple Response           |
| Recommended Experience | 1+ year hands-on AWS experience               |

The exam primarily tests **real-world architectural design scenarios** rather than theoretical knowledge. ([aabiance.com][4])


# 📊 Exam Domains

The exam is divided into four major domains:

### 1️⃣ Design Secure Architectures (30%)

Topics include:

* IAM policies and roles
* Encryption (KMS)
* Security groups & NACLs
* Secure access to AWS services

### 2️⃣ Design Resilient Architectures (26%)

Topics include:

* High availability architectures
* Auto Scaling
* Elastic Load Balancing
* Disaster recovery strategies

### 3️⃣ Design High-Performing Architectures (24%)

Topics include:

* EC2 performance optimization
* Storage performance (S3, EBS, EFS)
* Caching (CloudFront, ElastiCache)

### 4️⃣ Design Cost-Optimized Architectures (20%)

Topics include:

* Cost-effective storage
* Compute pricing models
* Architecture cost optimization

These domains represent the core competencies required for designing solutions on AWS. ([AWS Documentation][5])

# ☁️ Core AWS Services

## Compute

* EC2
* Lambda
* ECS / EKS
* Elastic Beanstalk

## Storage

* S3
* EBS
* EFS
* Glacier

## Databases

* RDS
* DynamoDB
* Aurora
* Redshift

## Networking

* VPC
* Route 53
* API Gateway
* Direct Connect

## Application Integration

* SQS
* SNS
* EventBridge
* Step Functions

# 🏗 Architecture Patterns

Common architectures tested in the exam:

* Multi-tier architecture
* Serverless architecture
* Microservices architecture
* Event-driven architecture
* Hybrid architecture

Example architecture:

```
Client → CloudFront → ALB → EC2 Auto Scaling → RDS
```

# 🔐 Security Best Practices

* Use **IAM roles instead of credentials**
* Enable **MFA**
* Encrypt data **at rest and in transit**
* Use **VPC security groups and NACLs**
* Follow the **Principle of Least Privilege**

# 📦 Storage Services

| Service | Use Case              |
| ------- | --------------------- |
| S3      | Object storage        |
| EBS     | Block storage for EC2 |
| EFS     | Shared file system    |
| Glacier | Archival storage      |

# ⚡ Serverless Architecture

Key services:

* AWS Lambda
* API Gateway
* DynamoDB
* EventBridge
* Step Functions

Example:

```
Client → API Gateway → Lambda → DynamoDB
```

# 📈 Monitoring & Logging

Important monitoring tools:

* CloudWatch
* CloudTrail
* AWS Config
* X-Ray

These services help with **observability, troubleshooting, and auditing**.

# 💰 Cost Optimization

Strategies:

* Use **Reserved Instances or Savings Plans**
* Use **S3 lifecycle policies**
* Use **Spot Instances**
* Right-size EC2 instances
* Use serverless services when possible

# 🌍 High Availability & Disaster Recovery

Common DR strategies:

| Strategy                   | RTO      | Cost      |
| -------------------------- | -------- | --------- |
| Backup & Restore           | High     | Low       |
| Pilot Light                | Medium   | Medium    |
| Warm Standby               | Low      | High      |
| Multi-Region Active-Active | Very Low | Very High |

# 📖 Study Tips

1. Understand **architecture patterns** rather than memorizing services.
2. Focus on **security and networking concepts**.
3. Practice with **scenario-based questions**.
4. Build **hands-on labs** in AWS.
5. Review **AWS Well-Architected Framework pillars**.


# 🔗 Useful Resources

Official AWS documentation
AWS Skill Builder training
AWS Well-Architected Framework
Practice exams and hands-on labs


# 🤝 Contributing

Contributions are welcome!

You can help by:

* Adding study notes
* Improving explanations
* Adding diagrams
* Fixing mistakes

Create a pull request to contribute.


# ⭐ Support

If you find this repository useful, consider giving it a **star ⭐**.
 
# Key Preparation Resources

* **[Official Exam Guide (PDF)](https://docs.aws.amazon.com/pdfs/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.pdf):** The definitive source for all task statements and in-scope services.
* **[AWS Skill Builder](https://skillbuilder.aws/learning-plan/UYRXS2DF85/exam-prep-plan-aws-certified-solutions-architect--associate-saac03--english/):** Offers a 4-step exam prep plan including official practice questions.
* **[AWS Certification Page](https://aws.amazon.com/certification/certified-solutions-architect-associate/):** General overview and registration details.

[2]: https://docs.aws.amazon.com/aws-certification/latest/examguides/aws-certification-exam-guides.html "AWS Certification Exam Guides"
[3]: https://cloudfluently.com/blog/aws-certified-solutions-architect-associate-exam-guide-2026 "AWS Certified Solutions Architect Associate Exam Guide ..."
[4]: https://aabiance.com/aws-solution-architect-aws-saa-c03-syllabus-study-guide/ "AWS Solution Architect (AWS SAA-C03) Syllabus & Study ..."
[5]: https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html "AWS Certified Solutions Architect - Associate (SAA-C03)"

Sthithapragna - Practice exam - 63
https://www.youtube.com/watch?v=PhdDjKXl_Y4&t=3183s

Practice exam (very good) - Playlist - CertPro Deep dive - 500 Question
https://www.youtube.com/watch?v=OGy8zXqkHfo&list=PLB574eEmT4ocaZvy0MHVykInztB7nsB8e&index=1

Practice exam (last) - Playlist - IT India - 240 Question
https://www.youtube.com/watch?v=C7zZb98q56w&list=PL2SluYPF9ZQVrOupgNv8jIB-ZblznwxHX

Tecg with Shapingpixel - 795
https://www.youtube.com/watch?v=Wr_V8vOcH2Y

Very good 
https://www.youtube.com/watch?v=e4CY7NZDhDw&list=PL7Jj8Ba9Yr6AEe1lS3zTf2jrd1bJ7nycj
http://cloudexpert-solutions.s3-website-us-east-1.amazonaws.com/index.html

Low perference
https://www.youtube.com/watch?v=jMP0z7vxGOg&list=PLyABYqulvUwaow4m_e2AJYlOjmWTOIjcM