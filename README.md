# AWS Certified Solutions Architect Associate SAA-C03 Reference Guide

This repository contains a **comprehensive reference guide and quick study notes** for the **AWS Certified Solutions Architect – Associate SAA-C03** certification exam.

The goal of this repository is to provide a **concise, structured, and practical reference** for developers, architects, and cloud engineers preparing for the exam.

It includes key AWS services, architecture patterns, security concepts, and best practices aligned with the **AWS Well-Architected Framework**.

## Table of Contents

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

## Overview

The **AWS Certified Solutions Architect – Associate** certification validates your ability to design distributed systems and scalable architectures on AWS. ([AWS Documentation][2])

This certification focuses on designing solutions that are:

* Secure
* Highly available
* Fault tolerant
* Scalable
* Cost optimized

Solutions architects must evaluate trade-offs and choose the most appropriate AWS services for different use cases. ([CloudFluently][3])

## Exam Overview

| Attribute              | Details                                          |
| ---------------------- | ------------------------------------------------ |
| Exam Name              | AWS Certified Solutions Architect – Associate    |
| Exam Code              | SAA-C03                                          |
| Duration               | 130 minutes                                      |
| Questions              | ~65 (50 scored, 15 unscored)                     |
| Passing Score          | 720 / 1,000 (Scaled score)                       |
| Format                 | Multiple Choice & Multiple Response              |
| Recommended Experience | 1+ year hands-on AWS experience                  |
| Cost                   | $150 USD                                         |
| Delivery               | Testing center or Online proctored (Pearson VUE) |

The exam primarily tests **real-world architectural design scenarios** rather than theoretical knowledge. ([aabiance.com][4])


## Exam Domains

The exam is divided into four major domains:

![alt text](img/image.png)

These domains represent the core competencies required for designing solutions on AWS. ([AWS Documentation][5])

## Core AWS Services (In-scope AWS services and features)

### Analytics

* Amazon Athena
* AWS Data Exchange
* Amazon Data Firehose
* Amazon EMR
* AWS Glue
* Amazon Kinesis
* AWS Lake Formation
* Amazon Managed Streaming for Apache Kafka (Amazon MSK)
* Amazon OpenSearch Service
* Amazon QuickSuite
* Amazon Redshift

### Application Integration

* Amazon AppFlow
* AWS AppSync
* Amazon EventBridge
* Amazon MQ
* Amazon SNS
* Amazon SQS
* AWS Step Functions

### AWS Cost Management

* [AWS Budgets](#aws-budgets)
* AWS Cost and Usage Report
* AWS Cost Explorer
* Savings Plans

### Compute

* AWS Batch
* Amazon EC2
* Amazon EC2 Auto Scaling
* AWS Elastic Beanstalk
* AWS Outposts
* AWS Serverless Application Repository
* VMware Cloud on AWS
* AWS Wavelength

### Containers

* Amazon ECR
* Amazon ECS
* Amazon ECS Anywhere
* Amazon EKS
* Amazon EKS Anywhere
* Amazon EKS Distro

### Database

* Amazon Aurora
* Amazon Aurora Serverless
* Amazon DocumentDB
* Amazon DynamoDB
* Amazon ElastiCache
* Amazon Keyspaces
* Amazon Neptune
* Amazon RDS
* Amazon Redshift

### Developer Tools

AWS X-Ray

### Front-End Web and Mobile

* AWS Amplify
* Amazon API Gateway
* AWS Device Farm

### Machine Learning

* Amazon Comprehend
* Amazon Kendra
* Amazon Lex
* Amazon Polly
* Amazon Rekognition
* Amazon SageMaker AI
* Amazon Textract
* Amazon Transcribe
* Amazon Translate

### Management and Governance

*  AWS Auto Scaling
*  [AWS CLI](#aws-cli)
*  AWS CloudFormation
*  AWS CloudTrail
*  Amazon CloudWatch
*  AWS Compute Optimizer
*  AWS Config
*  AWS Control Tower
*  AWS Health Dashboard
*  AWS License Manager
*  Amazon Managed Grafana
*  Amazon Managed Service for Prometheus
*  AWS Management Console
*  AWS Organizations
*  AWS Service Catalog
*  AWS Systems Manager
*  AWS Trusted Advisor
*  AWS Well-Architected Tool

### Media Services

* Amazon Elastic Transcoder
* Amazon Kinesis Video Streams

### Migration and Transfer

* AWS Application Migration Service
* AWS DataSync
* AWS DMS
* AWS Snow Family
* AWS Transfer Family

### Networking and Content Delivery

* AWS Client VPN
* Amazon CloudFront
* AWS Direct Connect
* Elastic Load Balancing (ELB)
* AWS Global Accelerator
* AWS PrivateLink
* Amazon Route 53
* AWS Site-to-Site VPN
* AWS Transit Gateway
* Amazon VPC

### Security, Identity, and Compliance

* AWS Artifact
* AWS Audit Manager
* AWS Certificate Manager (ACM)
* AWS CloudHSM
* Amazon Cognito
* Amazon Detective
* AWS Directory Service
* AWS Firewall Manager
* Amazon GuardDuty
* AWS IAM Identity Center
* Amazon Inspector
* AWS KMS
* Amazon Macie
* AWS Network Firewall
* AWS Resource Access Manager (AWS RAM)
* AWS Secrets Manager
* AWS Security Hub
* AWS Shield
* AWS WAF
* [IAM](#IAM)

### Serverless

* AWS AppSync
* AWS Fargate
* AWS Lambda

### Storage

* AWS Backup
* Amazon EBS
* Amazon EFS
* Amazon FSx (for all types)
* Amazon S3
* Amazon S3 Glacier
* AWS Storage Gateway

<details>
  <summary>Out-of-scope AWS services and features</summary>
  
### Application Integration
* Amazon Managed Workflows for Apache Airflow (Amazon MWAA)
### AR and VR
* Amazon Sumerian
### Blockchain
* Amazon Managed Blockchain
### Compute
* Amazon Lightsail
### Database
* Amazon RDS on VMware
### Developer Tools
* AWS CDK
* AWS CloudShell
* AWS CodeArtifact
* AWS CodeBuild
* AWS CodeCommit
* AWS CodeDeploy
* Amazon Corretto
* AWS Fault Injection Simulator (AWS FIS)
* AWS Tools and SDKs
### Front-End Web and Mobile
* Amazon Location Service
### Game Tech
* Amazon GameLift
### Internet of Things
* All services
### Machine Learning
* Apache MXNet on AWS
* Amazon Augmented AI (Amazon A2I)
* AWS DeepComposer
* AWS Deep Learning AMIs (DLAMI)
* AWS Deep Learning Containers
* Amazon DevOps Guru
* Amazon Elastic Inference
* Amazon HealthLake
* AWS Inferentia
* Amazon Personalize
* PyTorch on AWS
* Amazon SageMaker Canvas
* Amazon SageMaker Ground Truth
* TensorFlow on AWS
### Management and Governance
* AWS Console Mobile Application
* AWS Distro for OpenTelemetry
### Media Services
* AWS Elemental Appliances and Software
* AWS Elemental MediaConnect
* AWS Elemental MediaConvert
* AWS Elemental MediaLive
* AWS Elemental MediaPackage
* AWS Elemental MediaTailor
* Amazon Interactive Video Service (Amazon IVS)
### Migration and Transfer
* Migration Evaluator
### Networking and Content Delivery
* AWS Cloud Map
### Quantum Technologies
* Amazon Braket
### Satellite
* AWS Ground Station

</details>



### IAM

xxx

### AWS CLI

xxx

### AWS Budgets

---

### Storage Services

#### AWS Backup

##### What It Is
A **fully managed, centralized backup service** that automates and consolidates backup tasks across AWS services and on-premises resources.

<img src="img/AWS-backup.png" alt="AWS-backup" width="100" height="100">

##### Key Concepts
| Feature | Detail |
|---|---|
| **Backup Plan** | Policy defining backup frequency, retention, and lifecycle |
| **Backup Vault** | Encrypted storage container for backups |
| **Recovery Point** | Snapshot/backup of a resource at a point in time |
| **Backup Rule** | Defines schedule, window, retention, and lifecycle within a plan |

##### Supported Services
- Amazon EBS, EC2, RDS, DynamoDB, EFS, FSx, Storage Gateway, S3, DocumentDB, Neptune

##### Exam Key Points
- Supports **cross-region** and **cross-account** backup copies
- Integrates with **AWS Organizations** for centralized backup governance
- **Backup Vault Lock** — WORM (Write Once Read Many) policy; even root cannot delete
- Supports **tag-based** backup policies
- **Compliance**: HIPAA, PCI DSS, ISO — audit manager integration


#### Amazon EBS (Elastic Block Store)

##### What It Is
**Block-level storage** volumes attached to EC2 instances. Like a hard drive in the cloud.

<img src="img/AWS-ebs.png" alt="AWS-ebs" width="100" height="100">


##### Volume Types

| EBS Volume Types | gp3 (SSD) | gp2 (SSD) | io2 / io1 (SSD) | st1 / sc1 (HDD) |
|---|---|---|---|---|
| Category | General Purpose | General Purpose | Provisioned IOPS | Throughput / Cold |
| Performance | 3000 IOPS baseline | 3 IOPS/GB (burst 3000) | Up to 64,000 IOPS | st1: 500 MB/s |
| Throughput | Max 1000 MB/s | Max 250 MB/s | Max 1000 MB/s | sc1: 250 MB/s |
| Notes | Up to 16,000 IOPS | | | Not bootable |



| Type | Use Case | Max IOPS | Max Throughput |
|---|---|---|---|
| **gp3** | General workloads (default choice) | 16,000 | 1,000 MB/s |
| **gp2** | Legacy general purpose | 16,000 | 250 MB/s |
| **io2 Block Express** | Critical databases (Oracle, SAP) | 256,000 | 4,000 MB/s |
| **io1** | I/O intensive databases | 64,000 | 1,000 MB/s |
| **st1** | Big data, data warehouses, log processing | 500 | 500 MB/s |
| **sc1** | Cold data, infrequent access | 250 | 250 MB/s |

##### Architecture
```
         ┌─────────────────────────────────────────┐
         │              AWS Region                  │
         │   ┌──────────────────────────────────┐   │
         │   │    Availability Zone (AZ-1a)     │   │
         │   │                                  │   │
         │   │  ┌──────────┐   ┌─────────────┐  │   │
         │   │  │  EC2     │──▶│  EBS Volume │  │   │
         │   │  │ Instance │   │  (gp3/io2)  │  │   │
         │   │  └──────────┘   └──────┬──────┘  │   │
         │   │                        │ Snapshot  │   │
         │   └────────────────────────┼──────────┘   │
         │                            ▼              │
         │              ┌────────────────────────┐   │
         │              │   Amazon S3 (Snapshot  │   │
         │              │     Storage)           │   │
         │              └────────────────────────┘   │
         └─────────────────────────────────────────┘
```

##### Exam Key Points
- **AZ-locked** — a volume exists in one AZ; to move, take snapshot → create in new AZ
- **Snapshots** are incremental, stored in S3, can be shared across accounts/regions
- **Multi-Attach**: io1/io2 only — attach to up to 16 Nitro instances in same AZ (cluster applications)
- **Encryption**: Uses AWS KMS; snapshots of encrypted volumes are encrypted automatically
- **EBS-optimized instances** provide dedicated bandwidth for EBS
- **gp3 vs gp2**: gp3 is cheaper and lets you independently scale IOPS and throughput — **prefer gp3**
- Root EBS volume is deleted on termination by default (configurable)
- Data volumes are NOT deleted by default on termination


#### Amazon EFS (Elastic File System)

##### What It Is
**Managed NFS (Network File System)** that can be mounted by multiple EC2 instances simultaneously. Fully elastic — grows/shrinks automatically.

<img src="img/AWS-efs.png" alt="AWS-efs" width="100" height="100">

##### Architecture
```
         ┌────────────────────────────────────────────────────┐
         │                   AWS Region                        │
         │                                                     │
         │  ┌──────────────┐         ┌──────────────┐         │
         │  │    AZ-1a     │         │    AZ-1b     │         │
         │  │ ┌──────────┐ │         │ ┌──────────┐ │         │
         │  │ │ EC2  EC2 │ │         │ │ EC2  EC2 │ │         │
         │  │ └────┬─────┘ │         │ └────┬─────┘ │         │
         │  │      │Mount   │         │      │Mount  │         │
         │  │ ┌────▼─────┐ │         │ ┌────▼─────┐ │         │
         │  │ │ EFS Mount│ │         │ │ EFS Mount│ │         │
         │  │ │  Target  │ │         │ │  Target  │ │         │
         │  └─┴────┬─────┴─┘         └─┴────┬─────┴─┘         │
         │         └──────────┬─────────────┘                  │
         │                    ▼                                 │
         │           ┌─────────────────┐                       │
         │           │   Amazon EFS    │                       │
         │           │ (Shared Storage)│                       │
         │           └─────────────────┘                       │
         └────────────────────────────────────────────────────┘
```

##### Storage Classes
| Class | Use Case | Cost |
|---|---|---|
| **EFS Standard** | Frequently accessed data | Highest |
| **EFS Standard-IA** | Infrequently accessed | ~92% less than Standard |
| **EFS One Zone** | Single AZ, frequently accessed | ~47% less than Standard |
| **EFS One Zone-IA** | Single AZ, infrequent | Lowest |

##### Performance Modes
| Mode | When to Use |
|---|---|
| **General Purpose** (default) | Latency-sensitive (web serving, CMS) |
| **Max I/O** | Highly parallel big data, media processing |

##### Throughput Modes
| Mode | Details |
|---|---|
| **Elastic** (recommended) | Auto-scales throughput up/down |
| **Bursting** | Scales with file system size |
| **Provisioned** | Fixed throughput regardless of size |

##### Exam Key Points
- **Multi-AZ**, shared access — thousands of concurrent NFS clients
- Works with **Linux only** (NFS protocol) — NOT Windows
- **POSIX-compliant** file system with standard file permissions
- **Lifecycle Management**: Auto-moves files to IA classes after N days
- Supports **EFS Access Points** for application-specific entry points with enforced user identity
- Can mount on **on-premises** via Direct Connect or VPN
- **EFS vs EBS**: EFS = shared NFS across AZs; EBS = single instance block storage in one AZ

#### Amazon FSx (All Types)

##### What It Is
Fully managed **third-party file systems** on AWS. Choose based on OS/workload requirements.

![AWS-fsx](img/AWS-fsx.png)

##### FSx Comparison Table

| Feature | FSx for Windows | FSx for Lustre | FSx for NetApp ONTAP | FSx for OpenZFS |
|---|---|---|---|---|
| **Protocol** | SMB | POSIX/Lustre | NFS, SMB, iSCSI | NFS |
| **OS** | Windows | Linux | Both | Linux/Windows |
| **Use Case** | Windows apps, AD integration | HPC, ML, big data | Enterprise storage | ZFS workloads |
| **AD Integration** | ✅ Native | ❌ | ✅ | ❌ |
| **S3 Integration** | ❌ | ✅ (data repo) | ✅ | ❌ |
| **Multi-AZ** | ✅ | ❌ | ✅ | ❌ |
| **Snapshots** | ✅ (VSS) | ❌ | ✅ | ✅ |
| **Deduplication** | ✅ | ❌ | ✅ | ✅ |
| **Storage Tiers** | ❌ | ❌ | ✅ (SSD+HDD) | ❌ |

##### FSx for Windows File Server
- SMB protocol — native **Windows** file shares
- **Active Directory** integration (Microsoft AD or AWS Managed AD)
- Supports **DFS** (Distributed File System) namespaces
- Multi-AZ for high availability
- **Use when**: migrating Windows file servers, SharePoint, SQL Server

##### FSx for Lustre
- High-performance file system — millions of IOPS, sub-ms latency
- **S3 integration** — reads data from S3, writes back results
- Deployment: **Scratch** (temporary, no replication) or **Persistent** (replicated)
- **Use when**: ML training, genomics, financial modeling, HPC

##### FSx for NetApp ONTAP
- NFS, SMB, iSCSI support — most flexible
- **Automatic data tiering** (SSD → S3)
- **SnapMirror** for replication between FSx ONTAP file systems
- **Use when**: lifting and shifting NetApp environments to AWS

##### FSx for OpenZFS
- NFS-based, ZFS features (snapshots, clones, compression)
- **Use when**: migrating ZFS/NFS Linux workloads to AWS

##### Exam Key Points
- FSx for **Windows** → SMB + Active Directory (**most tested combo**)
- FSx for **Lustre** → HPC / ML + S3 data repository
- FSx for **ONTAP** → enterprise multi-protocol needs
- FSx volumes can be accessed **on-premises** via Direct Connect/VPN
- Lustre **Scratch** = no replication, cheaper; **Persistent** = replicated, durable


#### Amazon S3 (Simple Storage Service)

##### What It Is
**Object storage** — store and retrieve any amount of data, any time, from anywhere. Industry-standard for most storage use cases.

![alt text](image-1.png)

##### Storage Classes

```
┌────────────────────────────────────────────────────────────────────────┐
│                     S3 Storage Class Decision Tree                      │
│                                                                          │
│  Frequently accessed?                                                    │
│  ┌─── YES ──▶  S3 Standard (default)                                   │
│  │                                                                       │
│  └─── NO ──▶  How often accessed?                                       │
│                    │                                                     │
│                    ├── Unknown/changing ──▶ S3 Intelligent-Tiering      │
│                    │                                                     │
│                    ├── Infrequent (once/month) ──▶ S3 Standard-IA       │
│                    │                            or S3 One Zone-IA       │
│                    │                                                     │
│                    └── Archive?                                          │
│                              │                                           │
│                              ├── Milliseconds retrieval ──▶ S3 Glacier  │
│                              │                              Instant      │
│                              ├── Minutes retrieval   ──▶ S3 Glacier     │
│                              │                              Flexible     │
│                              └── Hours retrieval     ──▶ S3 Glacier     │
│                                                            Deep Archive │
└────────────────────────────────────────────────────────────────────────┘
```

| Storage Class | Availability | Min Storage | Retrieval | Use Case |
|---|---|---|---|---|
| **S3 Standard** | 99.99% | None | Instant | Frequently accessed data |
| **S3 Intelligent-Tiering** | 99.9% | None | Instant/Arch | Unknown access patterns |
| **S3 Standard-IA** | 99.9% | 30 days | Instant | Infrequent, rapid access |
| **S3 One Zone-IA** | 99.5% | 30 days | Instant | Infrequent, non-critical |
| **S3 Glacier Instant** | 99.9% | 90 days | Milliseconds | Archive with instant needs |
| **S3 Glacier Flexible** | 99.99% | 90 days | 1–12 hours | Archive |
| **S3 Glacier Deep Archive** | 99.99% | 180 days | 12–48 hours | Long-term compliance archive |

##### Key S3 Features

###### Versioning & MFA Delete
- **Versioning**: Keeps all versions of an object; protects against accidental delete
- **MFA Delete**: Requires MFA to permanently delete a version or suspend versioning

###### S3 Replication
| Type | Details |
|---|---|
| **CRR** (Cross-Region Replication) | Different region; compliance, latency |
| **SRR** (Same-Region Replication) | Same region; log aggregation, test accounts |

- Requires versioning on source AND destination
- Only new objects are replicated by default (use S3 Batch Replication for existing)
- Delete markers are NOT replicated by default

###### S3 Lifecycle Policies
- Transition objects between storage classes automatically
- Expire (delete) objects after N days

###### S3 Security
| Feature | Description |
|---|---|
| **Bucket Policies** | JSON resource-based policies; control who can access |
| **ACLs** | Legacy; Object-level access (prefer bucket policies) |
| **Block Public Access** | Account or bucket level setting to prevent public exposure |
| **Presigned URLs** | Temporary URL for private object access |
| **S3 Object Lock** | WORM model (Governance / Compliance mode) |

###### S3 Performance
- Prefix-based scaling: **3,500 PUT/COPY/POST/DELETE** and **5,500 GET/HEAD** per second per prefix
- **S3 Transfer Acceleration** — uses CloudFront edge locations for faster uploads
- **Multipart Upload** — recommended for objects > 100MB, required > 5GB

###### S3 Event Notifications
- Trigger Lambda, SQS, SNS on object events (PUT, DELETE, etc.)
- Or use **Amazon EventBridge** for more advanced routing

##### Exam Key Points ✅
- S3 is **region-scoped** but bucket names are **globally unique**
- Objects up to **5TB**, single PUT up to **5GB**
- **S3 Select** — retrieve subset of data using SQL queries
- **Requester Pays** — requester pays data transfer costs
- **Cross-account access** — use bucket policies or IAM roles
- **Server-Side Encryption (SSE)**: SSE-S3 (AWS managed), SSE-KMS (KMS key), SSE-C (customer key)
- **Static website hosting** with S3 + CloudFront is a classic architecture
- **One Zone-IA** — data is in 1 AZ; if AZ is destroyed, data is lost


#### Amazon S3 Glacier

##### What It Is
Low-cost **archival storage** for data that is rarely accessed. Part of the S3 storage class family.

##### Tiers
| Tier | Retrieval Time | Min Storage Duration | Best For |
|---|---|---|---|
| **Glacier Instant Retrieval** | Milliseconds | 90 days | Medical images, news media |
| **Glacier Flexible Retrieval** | 1-5 min (Expedited) / 3-5 hrs (Standard) / 5-12 hrs (Bulk) | 90 days | Backup/DR archives |
| **Glacier Deep Archive** | 12 hours (Standard) / 48 hours (Bulk) | 180 days | Compliance, 7+ year retention |

##### Vault Lock
- Enforce compliance controls using a **Vault Lock policy**
- Once locked, policy is **immutable** — cannot be changed or deleted
- Use for regulatory requirements (SEC 17a-4, HIPAA, etc.)

##### Exam Key Points
- **Expedited retrievals** for Flexible can be provisioned with **Provisioned Capacity Units** for guaranteed availability
- Glacier is accessed via **S3 Lifecycle rules** (most common) or directly via API
- Data in Glacier is encrypted by default
- **Vault** is a Glacier concept; **Bucket** is S3 — distinction matters in older exam questions

#### AWS Storage Gateway

##### What It Is
**Hybrid cloud storage** service — bridges on-premises environments to AWS storage. Three gateway types for different use cases.

##### Gateway Types

```
┌──────────────────────────────────────────────────────────────────────┐
│                    AWS Storage Gateway Types                          │
│                                                                       │
│  On-Premises                           AWS Cloud                     │
│  ──────────                            ─────────                     │
│                                                                       │
│  ┌──────────────────┐                 ┌─────────────────────┐        │
│  │  S3 File Gateway │── HTTPS/TLS ──▶│  Amazon S3          │        │
│  │  (NFS/SMB)       │                 │  (Standard, IA, etc)│        │
│  └──────────────────┘                 └─────────────────────┘        │
│                                                                       │
│  ┌──────────────────┐                 ┌─────────────────────┐        │
│  │  FSx File Gateway│── HTTPS/TLS ──▶│  Amazon FSx for     │        │
│  │  (SMB)           │                 │  Windows            │        │
│  └──────────────────┘                 └─────────────────────┘        │
│                                                                       │
│  ┌──────────────────┐   Local cache   ┌─────────────────────┐        │
│  │  Volume Gateway  │── iSCSI ──────▶│  Amazon S3 + EBS    │        │
│  │  (Stored/Cached) │                 │  Snapshots          │        │
│  └──────────────────┘                 └─────────────────────┘        │
│                                                                       │
│  ┌──────────────────┐                 ┌─────────────────────┐        │
│  │  Tape Gateway    │── VTL ────────▶│  S3 + S3 Glacier    │        │
│  │  (iSCSI VTL)     │                 │  (Virtual Tapes)    │        │
│  └──────────────────┘                 └─────────────────────┘        │
└──────────────────────────────────────────────────────────────────────┘
```

##### Gateway Type Details

###### S3 File Gateway
- NFS / SMB access to S3 objects
- Local cache for frequently accessed data
- Files stored as **native S3 objects** — accessible via S3 API and S3 Lifecycle
- **AD integration** for SMB access
- **Use when**: replacing on-premises file servers with S3 backend

###### FSx File Gateway
- Local cache of **FSx for Windows** file shares
- SMB + Active Directory
- **Use when**: low-latency access to FSx from on-premises

###### Volume Gateway
| Mode | Data Stored | Backup |
|---|---|---|
| **Cached Volume** | Primary in S3, cache on-prem | EBS Snapshots |
| **Stored Volume** | Primary on-prem, async backup to S3 | EBS Snapshots |

- Accessed via **iSCSI block protocol**
- **Cached**: low-latency access to frequently used; minimal local storage needed
- **Stored**: full dataset on-prem; disaster recovery to AWS

###### Tape Gateway
- Emulates a physical **tape library** (VTL — Virtual Tape Library)
- Works with existing backup software (Veeam, Veritas, etc.)
- Virtual tapes stored in **S3**; archived tapes move to **S3 Glacier**
- **Use when**: replacing physical tape infrastructure

##### Exam Key Points 
- Storage Gateway runs as a **VM on-premises** or as a **hardware appliance**
- **S3 File Gateway** → NFS/SMB to S3 (most tested)
- **Volume Gateway Cached** → S3 as primary, local cache (minimize local storage)
- **Volume Gateway Stored** → on-prem as primary, S3 backup (full data on-prem)
- **Tape Gateway** → replaces physical tape libraries
- All gateways use **HTTPS** to transfer data to AWS
- Local cache reduces latency for frequently accessed data

---

#### Quick Comparison: When to Use What

| Scenario | Service |
|---|---|
| Single EC2 needs fast block storage | **Amazon EBS** (gp3) |
| Multiple EC2s share a file system (Linux) | **Amazon EFS** |
| Multiple EC2s share a file system (Windows) | **FSx for Windows** |
| HPC / ML workloads needing fast parallel file system | **FSx for Lustre** |
| Centralized object storage, web hosting, data lakes | **Amazon S3** |
| Archive rarely accessed data for compliance | **S3 Glacier Deep Archive** |
| Hybrid: on-prem to cloud file shares | **Storage Gateway (S3 File Gateway)** |
| Hybrid: replace physical tape backups | **Storage Gateway (Tape Gateway)** |
| Hybrid: on-prem block storage backed by S3 | **Storage Gateway (Volume Gateway)** |
| Centralized backup policy across AWS accounts | **AWS Backup** |


#### Common Exam Traps - Storage Services

1. **EBS Multi-Attach** only for io1/io2, same AZ, Linux cluster — not a shared file system
2. **EFS is Linux-only** (NFS) — if Windows is mentioned, use FSx for Windows
3. **S3 Standard-IA and One Zone-IA** have a **minimum 30-day** charge; don't use for short-lived objects
4. **S3 Glacier Deep Archive** has 180-day minimum; do not confuse with Glacier Flexible (90-day)
5. **SRR/CRR** requires versioning on **both** source and destination buckets
6. **Presigned URLs** use the credentials of the person who created them — not the bucket policy
7. **Volume Gateway Stored** = full data on-prem (NOT primarily in S3)
8. **Volume Gateway Cached** = primary data in S3 (NOT primarily on-prem)
9. **S3 Intelligent-Tiering** has no retrieval fees, but has a small **monitoring fee per object**
10. **FSx for Lustre Scratch** — no replication; data loss if file server fails; temporary workloads only

---


## Useful Resources

* Official AWS documentation
* AWS Skill Builder training
* AWS Well-Architected Framework
* Practice exams and hands-on labs

## Contributing

Contributions are welcome!

You can help by:

* Adding study notes
* Improving explanations
* Adding diagrams
* Fixing mistakes

Create a pull request to contribute.


## Support

If you find this repository useful, consider giving it a **star ⭐**.
 
## Key Preparation Resources

* **[Official Exam Guide (PDF)](https://docs.aws.amazon.com/pdfs/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.pdf):** The definitive source for all task statements and in-scope services.
* **[AWS Skill Builder](https://skillbuilder.aws/learning-plan/UYRXS2DF85/exam-prep-plan-aws-certified-solutions-architect--associate-saac03--english/):** Offers a 4-step exam prep plan including official practice questions.
* **[AWS Certification Page](https://aws.amazon.com/certification/certified-solutions-architect-associate/):** General overview and registration details.

[2]: https://docs.aws.amazon.com/aws-certification/latest/examguides/aws-certification-exam-guides.html "AWS Certification Exam Guides"
[3]: https://cloudfluently.com/blog/aws-certified-solutions-architect-associate-exam-guide-2026 "AWS Certified Solutions Architect Associate Exam Guide ..."
[4]: https://aabiance.com/aws-solution-architect-aws-saa-c03-syllabus-study-guide/ "AWS Solution Architect (AWS SAA-C03) Syllabus & Study ..."
[5]: https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html "AWS Certified Solutions Architect - Associate (SAA-C03)"

Sthithapragna - Practice exam - 63
https://www.youtube.com/watch?v=PhdDjKXl_Y4&t=3183s
Paid - patreon.com/collection/1283618

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

