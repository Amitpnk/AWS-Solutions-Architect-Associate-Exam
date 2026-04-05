# AWS SAA-C03 — Security, Identity & Compliance Study Guide

---

## 📋 1. AWS Artifact

### What It Is
A **self-service portal** for on-demand access to AWS **compliance reports** and **security agreements** — no contacting AWS support needed.

### Two Main Features
| Feature | Description |
|---|---|
| **Artifact Reports** | Download AWS compliance docs: SOC 1/2/3, PCI DSS, ISO 27001, FedRAMP, HIPAA |
| **Artifact Agreements** | Review, accept, and manage agreements (BAA for HIPAA, NDA) |

### Exam Key Points ✅
- **Free** service — no cost to access compliance documents
- Agreements can be accepted at **organization level** (via AWS Organizations)
- **BAA (Business Associate Agreement)** for HIPAA compliance is signed here
- Used to demonstrate **AWS's compliance posture** to auditors/customers
- **Does NOT** provide your own compliance posture — that's **AWS Audit Manager**

---

## 🔎 2. AWS Audit Manager

### What It Is
**Continuously collects evidence** from AWS services to simplify audit preparation and map AWS usage to compliance frameworks.

### Key Concepts
| Concept | Description |
|---|---|
| **Framework** | Compliance standard (PCI DSS, HIPAA, SOC 2, CIS, GDPR) |
| **Control** | Specific requirement within a framework |
| **Assessment** | Ongoing audit of your AWS environment per framework |
| **Evidence** | Auto-collected proof (Config snapshots, CloudTrail logs, Security Hub findings) |

### Exam Key Points ✅
- **Automated evidence collection** — no manual screenshots
- Generates **audit-ready reports** for assessors
- **Custom frameworks** — build your own control sets
- Integrates with **Security Hub, Config, CloudTrail, AWS API calls**
- **Artifact = AWS's own compliance docs; Audit Manager = YOUR compliance evidence**

---

## 🔐 3. AWS Certificate Manager (ACM)

### What It Is
Provision, manage, and deploy **SSL/TLS certificates** for AWS services and internal resources — handles renewals automatically.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                    ACM Certificate Flow                               │
│                                                                       │
│  Request Certificate                                                  │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Domain Validation (DV)  ──  DNS record or Email validation  │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                         │                                             │
│                         ▼  Certificate Issued                         │
│                                                                       │
│  ┌──────────┐   ┌──────────────┐   ┌──────────┐   ┌─────────────┐  │
│  │   ALB    │   │ CloudFront   │   │  API GW  │   │  Elastic    │  │
│  │          │   │              │   │          │   │  Beanstalk  │  │
│  └──────────┘   └──────────────┘   └──────────┘   └─────────────┘  │
│                                                                       │
│  ❌ Cannot use ACM cert directly on EC2 (not exportable)             │
└──────────────────────────────────────────────────────────────────────┘
```

### Certificate Types
| Type | Description |
|---|---|
| **Public Certificates** | Free, issued by Amazon CA, auto-renew, domain-validated |
| **Private Certificates** | Via ACM Private CA — internal PKI, chargeable |
| **Imported Certificates** | Bring your own cert; ACM does NOT auto-renew these |

### Exam Key Points ✅
- ACM certificates are **free for public certs** — you pay for resources using them
- **Auto-renews** before expiry (AWS-issued certs only)
- Works with: **ALB, NLB, CloudFront, API Gateway, Elastic Beanstalk, AppSync**
- **Cannot be used on EC2 directly** — certificates are not exportable
- For **CloudFront**, the certificate **must be in us-east-1** (N. Virginia) regardless of distribution region
- **Wildcard certs** supported: `*.example.com`
- **SAN (Subject Alternative Names)** — one cert for multiple domains

---

## 🔒 4. AWS CloudHSM

### What It Is
A **dedicated Hardware Security Module (HSM)** in the AWS cloud — single-tenant, FIPS 140-2 Level 3 validated hardware for cryptographic key storage.

### CloudHSM vs KMS
```
┌──────────────────────────────────────────────────────────────────────┐
│              CloudHSM vs AWS KMS Comparison                          │
│                                                                       │
│  Feature          │  AWS KMS              │  CloudHSM               │
│  ─────────────────┼───────────────────────┼─────────────────────── │
│  Tenancy          │  Multi-tenant         │  Single-tenant (dedicated)│
│  FIPS 140-2       │  Level 2              │  Level 3 (higher)       │
│  Key Control      │  AWS manages HSM      │  YOU manage keys fully  │
│  Integration      │  Native AWS services  │  Manual (PKCS#11, JCE)  │
│  Cost             │  Low (per-call)       │  High (dedicated HW)    │
│  Compliance       │  Most workloads       │  Strict regulatory reqs │
│  AWS Access       │  AWS can access keys  │  AWS has NO access      │
└──────────────────────────────────────────────────────────────────────┘
```

### Exam Key Points ✅
- **FIPS 140-2 Level 3** — required for regulatory compliance (government, finance)
- **AWS has zero access** to your keys — true isolation
- Runs in **your VPC** (cluster of HSMs across AZs for HA)
- CloudHSM can act as **Custom Key Store** for KMS — best of both worlds
- **Use when**: strict compliance, bring-your-own-key (BYOK), SSL offloading, Oracle TDE
- More expensive and operationally complex than KMS

---

## 👤 5. Amazon Cognito

### What It Is
Provides **user identity and authentication** for web and mobile applications — sign-up, sign-in, and access control.

### Two Core Components

```
┌──────────────────────────────────────────────────────────────────────┐
│                        Amazon Cognito                                 │
│                                                                       │
│  ┌─────────────────────────────────┐  ┌───────────────────────────┐ │
│  │        User Pools               │  │      Identity Pools       │ │
│  │   (Authentication — WHO)        │  │  (Authorization — WHAT)   │ │
│  │                                 │  │                           │ │
│  │  • User directory               │  │  • Exchange tokens for    │ │
│  │  • Sign up / Sign in            │  │    AWS credentials        │ │
│  │  • MFA, password policy         │  │  • Federated identities   │ │
│  │  • Social IdP federation        │  │  • Guest / unauthenticated│ │
│  │    (Google, FB, Apple)          │  │    access                 │ │
│  │  • SAML / OIDC providers        │  │  • Temp IAM credentials   │ │
│  │  • Returns JWT tokens           │  │    via STS                │ │
│  │    (ID, Access, Refresh)        │  │                           │ │
│  └─────────────────────────────────┘  └───────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

### Combined Flow
```
  Mobile App
      │
      ▼
  User Pool ──── Authenticate ────▶ JWT Token
      │
      ▼
  Identity Pool ── Exchange JWT ──▶ Temp AWS Credentials (STS)
      │
      ▼
  AWS Services (S3, DynamoDB, Lambda…)
```

### Exam Key Points ✅
- **User Pool** = authentication (who are you?) → returns **JWT tokens**
- **Identity Pool** = authorization (what can you access?) → returns **AWS credentials via STS**
- **Federated Identity**: Google, Facebook, Apple, SAML, OIDC → all flow through Cognito
- **Cognito Sync** — synchronize user data across devices (deprecated in favor of AppSync)
- **Adaptive Authentication** — detects anomalies, triggers MFA dynamically
- **Hosted UI** — pre-built sign-in/sign-up pages
- **Use when**: building mobile/web apps that need user authentication + AWS resource access

---

## 🔭 6. Amazon Detective

### What It Is
**Automatically collects and analyzes** security data to help investigate security incidents and identify the root cause — without manual data wrangling.

### Data Sources
- **VPC Flow Logs, CloudTrail, GuardDuty findings, EKS audit logs**
- Builds a **graph model** of relationships between entities (IPs, accounts, roles)

### Exam Key Points ✅
- **Detective = investigate AFTER** a finding (root cause analysis)
- **GuardDuty = detect threats** (generates findings) → Detective = dig deeper into GuardDuty findings
- Uses **ML, statistical analysis, and graph theory** — not manual queries
- **Must be enabled** — not on by default; multi-account via Organizations
- **Use when**: "GuardDuty flagged something — why did it happen, what was accessed?"

---

## 🗂️ 7. AWS Directory Service

### What It Is
Managed **Microsoft Active Directory** (and compatible) services in the AWS cloud — integrate AWS resources with existing AD infrastructure.

### Options Comparison
```
┌──────────────────────────────────────────────────────────────────────┐
│                  AWS Directory Service Options                        │
│                                                                       │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────────┐ │
│  │  AWS Managed     │ │  AD Connector    │ │  Simple AD           │ │
│  │  Microsoft AD    │ │                  │ │                      │ │
│  │  ──────────────  │ │  ─────────────   │ │  ──────────────────  │ │
│  │  Full MS AD      │ │  Proxy to        │ │  Samba 4-based       │ │
│  │  in AWS cloud    │ │  on-prem AD      │ │  Standalone LDAP     │ │
│  │                  │ │                  │ │                      │ │
│  │  Trust with      │ │  No caching —    │ │  No trust, no MFA    │ │
│  │  on-prem AD      │ │  on-prem must    │ │  Small orgs only     │ │
│  │                  │ │  be reachable    │ │                      │ │
│  │  MFA support     │ │  MFA support     │ │  < 5,000 users       │ │
│  │  Best for cloud  │ │  Best for        │ │  Basic AD features   │ │
│  │  + on-prem       │ │  on-prem primary │ │                      │ │
│  └──────────────────┘ └──────────────────┘ └──────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

### Use Cases
| Scenario | Solution |
|---|---|
| AWS resources need AD, primary AD is on-prem | **AD Connector** |
| Full AD in AWS, optional trust with on-prem | **AWS Managed Microsoft AD** |
| Small org, basic LDAP needs | **Simple AD** |
| EC2 Windows instances need domain join | **AWS Managed Microsoft AD** or **AD Connector** |
| WorkSpaces, WorkDocs, RDS AD auth | **AWS Managed Microsoft AD** |

### Exam Key Points ✅
- **AD Connector** requires **on-premises AD to be reachable** (Direct Connect or VPN)
- **AWS Managed Microsoft AD** supports **MFA**, trusts, schema extensions
- **Simple AD** does NOT support MFA or trust relationships
- All options deploy into **your VPC** (multi-AZ for HA)
- Works with **IAM Identity Center** for SSO using AD credentials

---

## 🧱 8. AWS Firewall Manager

### What It Is
**Centrally configure and manage firewall rules** across all accounts and resources in an AWS Organization — WAF, Shield Advanced, Security Groups, Network Firewall, Route 53 Resolver DNS Firewall.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                      AWS Firewall Manager                             │
│                                                                       │
│  Management Account (Admin)                                           │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  Firewall Manager Policy                                     │    │
│  │  (WAF rules, Shield Advanced, SG, Network Firewall rules)   │    │
│  └──────────────────────────┬──────────────────────────────────┘    │
│                              │  Auto-applies to all accounts in Org   │
│              ┌───────────────┼───────────────┐                       │
│              ▼               ▼               ▼                       │
│          Account A       Account B       Account C                   │
│          (ALBs, CFs)    (ALBs, CFs)    (New account                 │
│                                         auto-enrolled)               │
└──────────────────────────────────────────────────────────────────────┘
```

### Exam Key Points ✅
- Requires **AWS Organizations** with All Features enabled
- Requires **Firewall Manager Administrator account** designation
- Automatically applies policies to **new accounts/resources** as they are created
- Manages: **WAF, Shield Advanced, VPC Security Groups, Network Firewall, Route 53 DNS Firewall**
- **Use when**: enforcing consistent security policies across many accounts
- **Remediation**: auto-remediate non-compliant resources (e.g., add WAF to all ALBs)

---

## 🛡️ 9. Amazon GuardDuty

### What It Is
An **intelligent threat detection** service that continuously monitors AWS accounts for malicious activity and unauthorized behavior using ML and threat intelligence.

### Data Sources (Automatic)
```
┌──────────────────────────────────────────────────────────────────────┐
│                      Amazon GuardDuty                                 │
│                                                                       │
│  Input Sources                        Findings                        │
│  ┌────────────────────────┐           ┌───────────────────────────┐  │
│  │ CloudTrail Events      │           │ Severity: Low/Med/High    │  │
│  │ VPC Flow Logs          │──────────▶│                           │  │
│  │ DNS Logs               │    ML +   │ Types:                    │  │
│  │ EKS Audit Logs         │  Threat   │ • Recon (port scanning)   │  │
│  │ RDS Login Events       │   Intel   │ • UnauthorizedAccess      │  │
│  │ S3 Data Events         │           │ • Backdoor                │  │
│  │ EBS Malware Scanning   │           │ • CryptoCurrency mining   │  │
│  │ Lambda Network Logs    │           │ • Exfiltration            │  │
│  └────────────────────────┘           └───────────────────────────┘  │
│                                                │                       │
│                                 ┌──────────────▼────────────────┐    │
│                                 │  EventBridge → SNS/Lambda     │    │
│                                 │  Security Hub (aggregation)   │    │
│                                 └───────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────┘
```

### Exam Key Points ✅
- **No agents, no infrastructure** — fully managed, enable with one click
- **30-day free trial** per account
- **Multi-account**: Designate GuardDuty administrator account via Organizations
- **Disabling GuardDuty** stops all monitoring — findings are lost
- GuardDuty **Malware Protection** — scans EBS volumes on suspicious EC2/containers
- **GuardDuty → EventBridge → Lambda** — automate remediation (e.g., isolate EC2)
- Does NOT need VPC Flow Logs / CloudTrail enabled separately — GuardDuty accesses them independently
- **Use when**: detecting compromised credentials, crypto mining, data exfiltration attempts

---

## 🔑 10. AWS IAM Identity Center (SSO)

### What It Is
**Centralized single sign-on (SSO)** for all AWS accounts and business applications — one login to access everything.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                    IAM Identity Center                                │
│                                                                       │
│  Identity Sources                                                     │
│  ┌─────────────┐  ┌─────────────────┐  ┌──────────────────────┐    │
│  │  Built-in   │  │  Active Directory│  │  External IdP        │    │
│  │  Directory  │  │  (AWS Managed   │  │  (Okta, Azure AD,    │    │
│  │             │  │   or on-prem)   │  │   OneLogin, SAML2.0) │    │
│  └──────┬──────┘  └────────┬────────┘  └──────────┬───────────┘    │
│         └─────────────────┬┘                       │                 │
│                            ▼                        │                 │
│               ┌────────────────────────────────────┘                 │
│               ▼                                                       │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  Permission Sets  ──▶  Assigned to Users/Groups per Account   │  │
│  └────────────────────────────────────────────────────────────────┘  │
│               │                                                       │
│    ┌──────────┼──────────┐                                           │
│    ▼          ▼          ▼                                           │
│  Account A  Account B  Account C  + SaaS Apps (Salesforce, Slack)   │
└──────────────────────────────────────────────────────────────────────┘
```

### Key Concepts
| Concept | Description |
|---|---|
| **Permission Set** | Collection of IAM policies assigned to a user/group per account |
| **Assignment** | Link a user/group → permission set → AWS account |
| **Identity Source** | Where users come from (built-in, AD, external IdP) |
| **AWS Access Portal** | Web URL users log into to access assigned accounts/apps |

### Exam Key Points ✅
- **Replaces** creating individual IAM users in every account
- Integrates with **AWS Organizations** — manage access across all accounts centrally
- **SCIM** protocol for automatic user/group sync from external IdP
- **Temporary credentials** — no long-lived IAM user keys
- **CLI access**: `aws sso login` generates short-lived credentials
- Supports **attribute-based access control (ABAC)** using user attributes
- **Use when**: multi-account AWS environments, federated identity, replacing per-account IAM users

---

## 🔍 11. Amazon Inspector

### What It Is
**Automated security vulnerability scanning** for EC2 instances, container images (ECR), and Lambda functions.

### What It Scans
| Target | What It Checks |
|---|---|
| **EC2 Instances** | OS vulnerabilities (CVEs), network reachability |
| **ECR Container Images** | Software vulnerabilities in images on push |
| **Lambda Functions** | Code dependencies for known vulnerabilities |

### Exam Key Points ✅
- **Continuous scanning** — not just one-time; re-scans when new CVEs are published
- Uses **SSM Agent** on EC2 for host-level scanning
- Generates a **risk score** prioritized by exploitability + environment exposure
- Sends findings to **Security Hub** and **EventBridge**
- **Inspector vs GuardDuty**: Inspector = vulnerability scanning (CVEs, misconfigs); GuardDuty = threat detection (active attacks)
- **Inspector vs Trusted Advisor**: Inspector = deep CVE scanning; Trusted Advisor = broad best-practice checks

---

## 🗝️ 12. AWS KMS (Key Management Service)

### What It Is
A **managed service to create and control encryption keys** used to encrypt data across AWS services.

### Key Types
```
┌──────────────────────────────────────────────────────────────────────┐
│                      KMS Key Types                                    │
│                                                                       │
│  ┌─────────────────────┐  ┌──────────────────────┐  ┌─────────────┐ │
│  │  AWS Managed Keys   │  │  Customer Managed     │  │  AWS Owned  │ │
│  │                     │  │  Keys (CMK)           │  │  Keys       │ │
│  │  aws/s3, aws/ebs… │  │                      │  │             │ │
│  │  Auto-created by    │  │  You create & manage  │  │  AWS uses   │ │
│  │  AWS services       │  │  rotation, policy,    │  │  internally │ │
│  │  Free               │  │  deletion             │  │  Free/      │ │
│  │  No direct access   │  │  $1/month per key     │  │  invisible  │ │
│  └─────────────────────┘  └──────────────────────┘  └─────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

### Symmetric vs Asymmetric Keys
| Type | Usage | Algorithm |
|---|---|---|
| **Symmetric (default)** | Encrypt/decrypt (same key) | AES-256 |
| **Asymmetric** | Public/private key pair; sign/verify or encrypt/decrypt | RSA, ECC |

### Key Rotation
| Key Type | Rotation |
|---|---|
| AWS Managed | Auto every year (cannot disable) |
| Customer Managed | Optional auto-rotation every year; manual on demand |
| Imported Key Material | Manual rotation only |

### Key Policies
- **Every KMS key has a key policy** — resource-based policy controlling access
- Root account always has access (unlike IAM which requires explicit grant)
- **`kms:ViaService`** condition — restrict key usage to specific AWS services

### Envelope Encryption
```
  Data ──▶ Encrypted by Data Key (DEK) ──▶ Ciphertext
  Data Key ──▶ Encrypted by KMS CMK  ──▶ Encrypted DEK
  
  (KMS never stores the data key — only the encrypted version)
```

### Multi-Region Keys
- **Primary key** in one region → **Replica keys** in other regions
- Same key material, different ARNs — encrypt in one region, decrypt in another
- **Use case**: global DynamoDB tables, Global Aurora, multi-region S3

### Exam Key Points ✅
- **KMS keys never leave KMS unencrypted** — all crypto operations happen inside KMS
- **4 KB limit** per KMS API call — use envelope encryption for larger data
- **Automatic key rotation** changes backing material but keeps same key ID/ARN
- **Key deletion**: 7–30 day waiting period (scheduled deletion, not immediate)
- **CloudTrail** logs all KMS key usage — full audit trail
- **Cross-account key sharing**: update key policy + IAM policy in target account
- `GenerateDataKey` → returns plaintext DEK + encrypted DEK (envelope encryption)

---

## 🔍 13. Amazon Macie

### What It Is
A **data security service** using ML to automatically **discover, classify, and protect sensitive data** in Amazon S3.

### What Macie Finds
- **PII**: Names, addresses, SSNs, passport numbers
- **Financial data**: Credit card numbers, bank account numbers
- **Credentials**: AWS secret keys, private keys
- **Healthcare data**: PHI, medical record numbers
- **Custom patterns**: Regex-defined sensitive data types

### Exam Key Points ✅
- Scans **S3 buckets** only — not EBS, RDS, or other storage
- **Automated sensitive data discovery** — continuous scanning
- **S3 bucket-level findings**: public buckets, unencrypted buckets, cross-account access
- Sends findings to **Security Hub** and **EventBridge**
- **Multi-account**: designate admin account via Organizations
- **Use when**: GDPR compliance, PCI DSS, HIPAA — prove sensitive data is protected

---

## 🧱 14. AWS Network Firewall

### What It Is
A **managed, stateful network firewall** for VPCs — deep packet inspection, intrusion detection/prevention (IDS/IPS), web filtering.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                      AWS Network Firewall                             │
│                                                                       │
│  Internet                                                             │
│      │                                                                │
│      ▼                                                                │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    VPC                                        │   │
│  │                                                               │   │
│  │  ┌──────────────────┐       ┌────────────────────────────┐  │   │
│  │  │  Firewall Subnet │       │  Application Subnet        │  │   │
│  │  │  (dedicated)     │──────▶│  (EC2, ECS, Lambda…)      │  │   │
│  │  │                  │       │                            │  │   │
│  │  │  Network Firewall│       │                            │  │   │
│  │  │  Endpoint        │       │                            │  │   │
│  │  └──────────────────┘       └────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

### Rule Types
| Rule Type | Description |
|---|---|
| **Stateless rules** | L3/L4 — IP, port, protocol (like ACL) |
| **Stateful rules** | L7 — tracks connection state, Suricata-compatible IPS rules |
| **Domain list rules** | Allow/block by domain name (e.g., block *.malicious.com) |

### Exam Key Points ✅
- Deployed in a **dedicated firewall subnet** in each AZ
- **Suricata-compatible** rules — open standard for IPS signatures
- Centrally manage rules via **Firewall Manager** across Organization accounts
- **Logs** to S3, CloudWatch Logs, Kinesis Firehose
- **WAF vs Network Firewall**: WAF = HTTP/S at L7 for web apps; Network Firewall = all protocols, VPC perimeter
- **Security Group vs Network Firewall**: SG = instance-level stateful; Network Firewall = VPC-level deep inspection

---

## 🤝 15. AWS Resource Access Manager (RAM)

### What It Is
**Share AWS resources** across accounts (within your Organization or with specific accounts) without duplicating them.

### Shareable Resources
- VPC Subnets, Transit Gateways, Route 53 Resolver Rules
- License Manager configurations
- EC2 Dedicated Hosts, Capacity Reservations
- CodeBuild Projects, Glue Tables, Managed Prefix Lists

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                       AWS RAM Sharing                                 │
│                                                                       │
│  Account A (Owner)            Account B (Consumer)                   │
│  ┌─────────────────────┐      ┌─────────────────────────────────┐   │
│  │  VPC Subnet         │      │  Can launch EC2 in Account A's  │   │
│  │  (10.0.1.0/24)      │─────▶│  shared subnet — resources      │   │
│  │                     │      │  stay in Account A's VPC        │   │
│  │  Transit Gateway    │      │                                  │   │
│  │                     │─────▶│  Attach Account B's VPC         │   │
│  └─────────────────────┘      └─────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

### Exam Key Points ✅
- **Shared subnets**: consumers launch resources into owner's VPC subnet — no VPC peering needed
- Within same **Organization**: sharing is automatic (no invitation needed)
- Outside Organization: target account must **accept** the resource share
- Resources remain in **owner's account** — consumer just gets access
- **RAM vs VPC Peering**: RAM shares specific resources; Peering connects entire VPCs
- **Use when**: shared services VPC, centralized networking, shared Transit Gateway

---

## 🔐 16. AWS Secrets Manager

### What It Is
**Securely store, rotate, and retrieve secrets** (database credentials, API keys, tokens) — with built-in automatic rotation.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                    AWS Secrets Manager                                │
│                                                                       │
│  Application                                                          │
│      │  GetSecretValue API call (no hardcoded creds)                 │
│      ▼                                                                │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Secrets Manager                                              │   │
│  │  ┌─────────────────────────────────────────────────────────┐ │   │
│  │  │  Secret: prod/db/password                                │ │   │
│  │  │  {"username": "admin", "password": "xyz123"}            │ │   │
│  │  └─────────────────────────────────────────────────────────┘ │   │
│  │                    │  Auto-rotate                             │   │
│  └────────────────────┼──────────────────────────────────────────┘   │
│                       ▼                                               │
│  ┌────────────────────────────┐                                      │
│  │  Lambda Rotation Function  │──▶ Update password in RDS/DB        │
│  └────────────────────────────┘                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Key Features
| Feature | Description |
|---|---|
| **Auto-Rotation** | Lambda function rotates on schedule (e.g., every 30 days) |
| **Native Integration** | RDS, Redshift, DocumentDB — built-in rotation support |
| **Encryption** | All secrets encrypted with KMS (customer-managed or AWS-managed) |
| **Cross-Account** | Share secrets across accounts via resource policies |
| **Versioning** | Multiple versions (AWSCURRENT, AWSPENDING, AWSPREVIOUS) |

### Secrets Manager vs SSM Parameter Store
| Feature | Secrets Manager | SSM Parameter Store |
|---|---|---|
| **Auto-Rotation** | ✅ Built-in (Lambda) | ❌ Manual |
| **Cost** | $0.40/secret/month | Free (Standard tier) |
| **Secret Size** | Up to 64KB | 4KB (Standard), 8KB (Advanced) |
| **Native RDS rotation** | ✅ | ❌ |
| **Cross-account** | ✅ | ✅ (with sharing) |
| **Primary Use** | Sensitive secrets + rotation | Config values + basic secrets |

### Exam Key Points ✅
- **Auto-rotation uses a Lambda function** — you can bring custom rotation logic
- **Never hardcode credentials** — always use Secrets Manager or Parameter Store
- Secrets are **encrypted at rest** (KMS) and **in transit** (TLS)
- **Multi-region replication** — replicate secrets to other regions for DR
- **Use when**: database passwords, API keys, OAuth tokens — anything that needs rotation

---

## 🏢 17. AWS Security Hub

### What It Is
A **centralized security posture management** service that aggregates, organizes, and prioritizes security findings from multiple AWS services and third-party tools.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                      AWS Security Hub                                 │
│                                                                       │
│  Finding Sources                                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │GuardDuty │ │Inspector │ │  Macie   │ │ Firewall │ │3rd Party │  │
│  │          │ │          │ │          │ │ Manager  │ │(Splunk,  │  │
│  │          │ │          │ │          │ │          │ │ Palo…)   │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘  │
│       └────────────┴────────────┴────────────┴─────────────┘        │
│                                 │                                     │
│                    ┌────────────▼─────────────┐                      │
│                    │     Security Hub          │                      │
│                    │                           │                      │
│                    │  • Compliance Standards   │                      │
│                    │    (CIS, PCI DSS, NIST)   │                      │
│                    │  • Security Score         │                      │
│                    │  • Findings Dashboard     │                      │
│                    └─────────────┬─────────────┘                     │
│                                  │                                    │
│                    ┌─────────────▼─────────────┐                     │
│                    │  EventBridge → Automated   │                     │
│                    │  Remediation (Lambda/SSM)  │                     │
│                    └───────────────────────────┘                     │
└──────────────────────────────────────────────────────────────────────┘
```

### Exam Key Points ✅
- Uses **AWS Security Finding Format (ASFF)** — standardized finding format
- **Multi-account**: designate administrator account via Organizations
- Runs **automated compliance checks** against CIS AWS Foundations, PCI DSS, AWS FSBP
- **Must enable** — not on by default; 30-day free trial
- **Security Hub = aggregator**; it doesn't generate findings itself (except compliance checks)
- **Integrates with**: GuardDuty, Inspector, Macie, Firewall Manager, IAM Access Analyzer, Systems Manager

---

## 🛡️ 18. AWS Shield

### What It Is
**DDoS protection** for AWS workloads — two tiers with different capabilities and response levels.

### Shield Standard vs Advanced
```
┌──────────────────────────────────────────────────────────────────────┐
│                AWS Shield: Standard vs Advanced                       │
│                                                                       │
│  Feature                  │ Standard          │ Advanced             │
│  ─────────────────────────┼───────────────────┼──────────────────── │
│  Cost                     │ FREE (automatic)  │ $3,000/month + usage │
│  Protection Layer         │ L3/L4             │ L3/L4/L7             │
│  DDoS Attack Visibility   │ ❌                │ ✅ (near real-time)  │
│  DRT Access               │ ❌                │ ✅ 24/7 DDoS experts │
│  Cost Protection          │ ❌                │ ✅ (billing credits) │
│  Advanced Attack Mitigation│ ❌               │ ✅                   │
│  Protected Resources      │ All AWS resources │ Route53, CF, ELB,   │
│                           │                   │ EC2, Global Accel.  │
│  WAF Integration          │ ❌                │ ✅ (free WAF rules)  │
│  Health-based detection   │ ❌                │ ✅ Route53 checks    │
└──────────────────────────────────────────────────────────────────────┘
```

### Exam Key Points ✅
- **Shield Standard** is **always on, free, automatic** — no configuration
- **Shield Advanced**: subscribe at organization level; protects **all accounts**
- **DRT (DDoS Response Team)** — AWS experts assist during attacks (Advanced only)
- **Cost protection**: AWS credits for scaling costs due to DDoS attacks (Advanced only)
- Shield Advanced works best **combined with WAF and CloudFront**
- **Use Shield Advanced when**: you run business-critical, public-facing applications

---

## 🔥 19. AWS WAF (Web Application Firewall)

### What It Is
A **web application firewall** that monitors and controls HTTP/S requests to your web applications — filters malicious traffic at L7.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                          AWS WAF                                      │
│                                                                       │
│  Internet Traffic                                                     │
│       │                                                               │
│       ▼                                                               │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  WAF Web ACL                                                  │   │
│  │                                                               │   │
│  │  Rules (evaluated in priority order):                        │   │
│  │  1. IP Set Match  ──▶ Block known bad IPs                    │   │
│  │  2. Rate Limit    ──▶ Block if > 2000 req/5min from one IP   │   │
│  │  3. AWS Managed Rules (OWASP Top 10, bot protection)         │   │
│  │  4. Geo Match     ──▶ Block traffic from specific countries  │   │
│  │  5. SQL Injection / XSS Match                                │   │
│  │  Default Action:  ALLOW / BLOCK                              │   │
│  └──────────────────────────┬───────────────────────────────────┘   │
│                              │                                        │
│         ┌────────────────────┼──────────────────┐                    │
│         ▼                    ▼                   ▼                    │
│     CloudFront             ALB             API Gateway               │
│     (Global)            (Regional)          (Regional)               │
└──────────────────────────────────────────────────────────────────────┘
```

### Key Components
| Component | Description |
|---|---|
| **Web ACL** | Container for rules; attached to a resource |
| **Rule** | Condition + action (Allow, Block, Count, CAPTCHA) |
| **Rule Group** | Reusable collection of rules |
| **IP Set** | List of IP/CIDR ranges to match |
| **Regex Pattern Set** | Regex patterns for string matching |
| **Managed Rule Groups** | Pre-built rules by AWS or Marketplace vendors |

### AWS Managed Rule Groups (Common)
- `AWSManagedRulesCommonRuleSet` — OWASP Top 10 protection
- `AWSManagedRulesSQLiRuleSet` — SQL injection
- `AWSManagedRulesBotControlRuleSet` — bot management
- `AWSManagedRulesAmazonIpReputationList` — known malicious IPs

### Exam Key Points ✅
- WAF can be attached to: **CloudFront, ALB, API Gateway, AppSync, Cognito User Pools**
- **WAF is regional** except when used with **CloudFront** (global)
- **Rate-based rules** — automatically block IPs exceeding request threshold
- **CAPTCHA action** — present CAPTCHA challenge instead of hard block
- **WAF Logs** → S3, CloudWatch Logs, Kinesis Firehose
- **WAF ≠ NACLs/SGs** — WAF is L7 (application layer); NACLs/SGs are L3/L4
- **WAF + Shield Advanced** = comprehensive DDoS + application layer protection

---

## 🔑 20. AWS IAM (Identity and Access Management)

### What It Is
The **foundation of AWS security** — controls who can do what in your AWS account through users, groups, roles, and policies.

### Core Components
```
┌──────────────────────────────────────────────────────────────────────┐
│                    IAM Core Components                                │
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────┐ │
│  │   Users      │  │   Groups     │  │   Roles      │  │Policies │ │
│  │              │  │              │  │              │  │         │ │
│  │  Long-term   │  │  Collection  │  │  Temporary   │  │ JSON    │ │
│  │  credentials │  │  of users    │  │  credentials │  │ docs    │ │
│  │  (human/app) │  │  (no creds)  │  │  for any     │  │ that    │ │
│  │              │  │              │  │  principal   │  │ define  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  │ perms   │ │
│                                                          └─────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

### IAM Policy Structure
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",          ← Allow or Deny
      "Principal": "*",           ← Who (for resource policies)
      "Action": "s3:GetObject",   ← What action
      "Resource": "arn:aws:s3:::my-bucket/*",  ← On which resource
      "Condition": {              ← Optional conditions
        "StringEquals": {
          "aws:RequestedRegion": "us-east-1"
        }
      }
    }
  ]
}
```

### Policy Types
| Type | Attached To | Description |
|---|---|---|
| **AWS Managed** | Users/Groups/Roles | Pre-built by AWS (e.g., AdministratorAccess) |
| **Customer Managed** | Users/Groups/Roles | Custom policies you create |
| **Inline** | Single entity | Embedded directly; deleted with entity |
| **Resource-based** | Resources (S3, KMS) | Specify who can access the resource |
| **Permission Boundary** | User/Role | Max permissions a user/role can have |
| **SCP** | OU/Account | Max permissions for all in OU/account |
| **Session Policy** | AssumeRole API | Limit permissions of a role session |

### Permission Evaluation Logic
```
┌──────────────────────────────────────────────────────────────────────┐
│                   IAM Policy Evaluation Order                         │
│                                                                       │
│  1. Explicit DENY anywhere?  ──▶  YES → DENY (final)                │
│                                                                       │
│  2. SCP Allows?  ──▶  NO → DENY                                     │
│                                                                       │
│  3. Resource Policy Allows?  ──▶  YES (same account) → ALLOW        │
│                                                                       │
│  4. Permission Boundary Allows?  ──▶  NO → DENY                     │
│                                                                       │
│  5. Identity Policy Allows?  ──▶  YES → ALLOW                       │
│                                                                       │
│  6. Default → DENY                                                    │
└──────────────────────────────────────────────────────────────────────┘
```

### IAM Roles — Key Scenarios
| Scenario | Solution |
|---|---|
| EC2 needs to access S3 | EC2 **Instance Profile** (IAM Role) |
| Lambda needs DynamoDB access | **Execution Role** attached to Lambda |
| Cross-account access | **Role in target account** + trust policy |
| Federated identity (SAML/OIDC) | **Role with trust policy** for IdP |
| CodePipeline deploys CloudFormation | **Service Role** for CloudFormation |

### IAM Best Practices
- ✅ Enable **MFA** on root and all IAM users
- ✅ Use **roles** instead of long-term access keys
- ✅ Apply **least privilege** — start with minimum and expand
- ✅ Use **Permission Boundaries** to delegate administration safely
- ✅ **Rotate access keys** regularly; delete unused keys
- ✅ Never use **root account** for daily tasks
- ✅ Use **IAM Access Analyzer** to identify external access

### IAM Access Analyzer
- Identifies resources shared with **external entities** (outside your zone of trust)
- Zone of trust = account or Organization
- Generates **findings** for S3 buckets, IAM roles, KMS keys, Lambda, SQS, Secrets Manager
- **Policy validation** — checks policies for errors and best practices
- **Policy generation** — generates least-privilege policy from CloudTrail activity

### Exam Key Points ✅
- **Root account**: has email/password, cannot be restricted by SCP, should be locked away
- **IAM is global** — users, groups, roles are not region-specific
- **Inline policies** are not reusable; prefer managed policies
- **Permission Boundary ≠ SCP**: Boundary limits a single user/role; SCP limits entire account/OU
- **AssumeRole** requires explicit trust policy on the target role
- **`sts:AssumeRoleWithWebIdentity`** — for OIDC (Cognito, Google, GitHub Actions)
- **`sts:AssumeRoleWithSAML`** — for SAML 2.0 federation
- **IAM conditions**: `aws:RequestedRegion`, `aws:PrincipalOrgID`, `aws:MultiFactorAuthPresent`, `aws:SourceIp`
- **PassRole** (`iam:PassRole`) — required to assign a role to a service (e.g., Lambda, EC2)

---

## 🔄 Quick Comparison: When to Use What

| Need | Service |
|---|---|
| Download AWS compliance reports (SOC, PCI) | **AWS Artifact** |
| Collect compliance evidence for auditors | **AWS Audit Manager** |
| Provision/manage SSL/TLS certificates | **ACM** |
| FIPS 140-2 Level 3 dedicated key storage | **CloudHSM** |
| User sign-up/sign-in for apps | **Amazon Cognito** |
| Investigate root cause of security incidents | **Amazon Detective** |
| Managed Active Directory in AWS | **AWS Directory Service** |
| Centrally enforce WAF/SG rules across org | **AWS Firewall Manager** |
| Detect threats from CloudTrail/VPC Flow Logs | **Amazon GuardDuty** |
| SSO across multiple AWS accounts | **IAM Identity Center** |
| Scan EC2/ECR/Lambda for CVEs | **Amazon Inspector** |
| Manage and control encryption keys | **AWS KMS** |
| Discover sensitive data (PII) in S3 | **Amazon Macie** |
| VPC-level deep packet inspection / IPS | **AWS Network Firewall** |
| Share VPC subnets/TGW across accounts | **AWS RAM** |
| Store and auto-rotate database passwords | **AWS Secrets Manager** |
| Aggregate security findings centrally | **AWS Security Hub** |
| DDoS protection | **AWS Shield** |
| Block web attacks (SQLi, XSS, bots) | **AWS WAF** |
| Identity, access, and permissions management | **IAM** |

---

## 🚨 Common Exam Traps

1. **ACM certificates cannot be exported to EC2** — use ACM with ALB/CloudFront; for EC2 self-managed or import
2. **ACM cert for CloudFront must be in us-east-1** — regardless of CloudFront distribution location
3. **KMS 4KB limit** — use envelope encryption (`GenerateDataKey`) for larger data
4. **KMS key deletion has a 7–30 day waiting period** — cannot be immediate
5. **GuardDuty ≠ Inspector** — GuardDuty = active threat detection; Inspector = vulnerability scanning
6. **GuardDuty does NOT need you to enable VPC Flow Logs/CloudTrail** — it accesses them independently
7. **Cognito User Pool = authentication (JWT)** ; **Identity Pool = AWS credentials (STS)**
8. **Shield Standard is always on and free** — no action needed; Advanced costs $3,000/month
9. **WAF is regional** (ALB, API GW) **except with CloudFront** (where it's global)
10. **SCP explicit DENY always wins** over IAM Allow — understand the policy evaluation order
11. **Secrets Manager auto-rotates; SSM Parameter Store does NOT** natively rotate
12. **RAM shared subnets** — consumer resources appear in owner's VPC; no VPC peering needed
13. **AD Connector requires on-prem AD to be reachable** (DX or VPN) — it is just a proxy
14. **AWS Artifact = AWS's compliance docs; Audit Manager = YOUR compliance evidence**
15. **IAM is global** — users, roles, policies apply to all regions; only regional when resource-specific
16. **`iam:PassRole` permission** is required to assign a role to an AWS service — commonly forgotten
17. **Inspector requires SSM Agent on EC2** for host-level vulnerability scanning
18. **Network Firewall must be in a dedicated subnet** — one per AZ; route table changes required
19. **Security Hub aggregates** — it doesn't generate findings itself (except compliance checks)
20. **Permission Boundary** sets max permissions for a user/role but does NOT grant permissions alone

---

*Last updated for AWS SAA-C03 exam preparation*
