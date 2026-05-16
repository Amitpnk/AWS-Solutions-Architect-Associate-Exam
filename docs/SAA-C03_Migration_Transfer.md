# AWS SAA-C03 — Migration & Transfer Services Study Guide

---

## 🚚 Migration & Transfer Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                  AWS Migration & Transfer Services                    │
│                                                                       │
│  Server / Application Migration                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  AWS Application Migration Service (MGN)                      │   │
│  │  Lift-and-shift servers from on-prem/cloud to AWS EC2         │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  Database Migration                                                   │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  AWS Database Migration Service (DMS)                         │   │
│  │  Migrate databases with minimal downtime                      │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  File / Object / Storage Transfer                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  AWS DataSync                                                 │   │
│  │  Online transfer of file/object data at scale                 │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  AWS Transfer Family                                          │   │
│  │  Managed SFTP / FTPS / FTP / AS2 transfers into S3 / EFS     │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  Physical Data Transfer (Large Scale)                                 │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  AWS Snow Family (Snowcone, Snowball, Snowmobile)             │   │
│  │  Ship physical storage devices for offline data transfer      │   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ 1. AWS Application Migration Service (MGN)

### What It Is
The **primary service for lift-and-shift (rehost) migration** of physical, virtual, or cloud-based servers to AWS — continuously replicates source servers to AWS and enables cutover with minimal downtime.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│               AWS Application Migration Service (MGN)                │
│                                                                       │
│  Source Environment                        AWS Cloud                 │
│  (On-premises / VMware / Azure / GCP)                                │
│                                                                       │
│  ┌──────────────────────┐                 ┌──────────────────────┐  │
│  │  Source Server       │                 │  Staging Area (VPC)  │  │
│  │                      │                 │                      │  │
│  │  ┌────────────────┐  │    Continuous   │  ┌────────────────┐  │  │
│  │  │  AWS Replication│──│──replication──▶│  │  Replication   │  │  │
│  │  │  Agent         │  │  (TCP 1500)     │  │  Servers       │  │  │
│  │  └────────────────┘  │                 │  │  (low cost)    │  │  │
│  │                      │                 │  └────────────────┘  │  │
│  │  OS: Windows/Linux   │                 └──────────────────────┘  │
│  │  Any workload        │                          │                │
│  └──────────────────────┘                          │  Test/Cutover  │
│                                                     ▼               │
│                                          ┌──────────────────────┐   │
│                                          │  Target EC2 Instance  │   │
│                                          │  (launched from       │   │
│                                          │   replicated image)   │   │
│                                          │                       │   │
│                                          │  Full-size production │   │
│                                          │  instance type        │   │
│                                          └──────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

### Migration Process
| Step | Description |
|---|---|
| **1. Install agent** | Install AWS Replication Agent on source server |
| **2. Continuous replication** | Block-level replication to staging area (low-cost) |
| **3. Test launch** | Launch test EC2 instance; validate app without affecting source |
| **4. Cutover** | Launch final EC2 instance; redirect traffic; decommission source |

### Key Features
| Feature | Description |
|---|---|
| **Continuous block-level replication** | Near-zero RPO — always in sync with source |
| **Non-disruptive** | Source server keeps running during replication |
| **Staging area** | Low-cost replication servers (not production size) until cutover |
| **Automated conversion** | Converts bootloader, drivers for AWS |
| **Test launches** | Test migrated server before committing to cutover |
| **Supports any OS** | Windows, Linux — any application |
| **Multi-cloud** | Migrate from on-prem, VMware, Azure, GCP, or other clouds |

### MGN vs AWS SMS (Server Migration Service)
- **MGN** = current recommended service (replaced SMS)
- **SMS** = legacy; being deprecated; used snapshot-based replication
- **MGN** = continuous block-level replication; faster, lower downtime

### Exam Key Points ✅
- **MGN = lift-and-shift** (rehost) migration strategy — move as-is to EC2
- **Continuous replication** = RPO is minutes or less
- **Install agent on source** → replication happens automatically in background
- **Test before cutover** — non-destructive; source server still running
- **Low-cost staging area** during replication; full instance type only during testing/cutover
- **Use when**: "lift and shift" any server to AWS with minimal downtime, migrating from VMware/Hyper-V, Azure, GCP to AWS

---

## 🔄 2. AWS DataSync

### What It Is
An **online data transfer service** that automates and accelerates moving large amounts of **file and object data** between on-premises storage, edge locations, and AWS storage services.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                         AWS DataSync                                  │
│                                                                       │
│  Source Locations                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │
│  │  NFS     │  │  SMB     │  │  HDFS    │  │  Object Storage  │    │
│  │  (Linux) │  │(Windows) │  │(Hadoop)  │  │(S3-compatible,   │    │
│  │          │  │          │  │          │  │ Azure Blob, GCS) │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────────┬─────────┘    │
│       └─────────────┴─────────────┴─────────────────┘               │
│                             │                                         │
│                    DataSync Agent (VM on-premises)                    │
│                             │  HTTPS (encrypted in transit)           │
│                             ▼                                         │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  DataSync Service (AWS-managed)                               │   │
│  │  • Scheduling (hourly, daily, weekly, custom)                 │   │
│  │  • Bandwidth throttling                                        │   │
│  │  • Data integrity verification (checksums)                    │   │
│  │  • File metadata and permissions preserved                    │   │
│  │  • Encryption in transit (TLS) + at rest                     │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                             │                                         │
│  Destination Locations (AWS)                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │
│  │ Amazon   │  │ Amazon   │  │ Amazon   │  │  FSx (Windows,   │    │
│  │   S3     │  │   EFS    │  │   FSx    │  │  Lustre, ONTAP,  │    │
│  │          │  │          │  │          │  │  OpenZFS)        │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘    │
└──────────────────────────────────────────────────────────────────────┘
```

### Key Features
| Feature | Description |
|---|---|
| **Up to 10x faster** | Uses parallelism and network optimization vs standard tools (rsync) |
| **Automated scheduling** | Hourly, daily, weekly, or cron-based sync |
| **Bandwidth throttling** | Limit impact on production network during business hours |
| **Data integrity** | Checksum verification — ensures data arrives uncorrupted |
| **Metadata preservation** | Preserves file permissions, timestamps, ACLs |
| **Incremental transfers** | After first full copy, only changed data transferred |
| **Agent-based** | Deploy DataSync Agent (VM or Docker) on-premises |
| **Agent-less** | For transfers between AWS services (S3 ↔ EFS, cross-region S3) |

### DataSync Transfer Directions
```
  On-Premises NFS/SMB/HDFS  ──▶  S3, EFS, FSx (migration to AWS)
  AWS Storage (S3, EFS)      ──▶  On-Premises NFS/SMB (data distribution)
  S3 ↔ S3                        (cross-region or cross-account sync)
  EFS ↔ EFS                       (cross-region replication)
  Other clouds (Azure, GCS)  ──▶  AWS S3 (cloud-to-cloud migration)
```

### DataSync vs Storage Gateway vs S3 Transfer Acceleration
```
┌──────────────────────────────────────────────────────────────────────┐
│         DataSync vs Storage Gateway vs S3 Transfer Acceleration      │
│                                                                       │
│  Service             │  Use Case                    │  Pattern       │
│  ────────────────────┼──────────────────────────────┼─────────────  │
│  DataSync            │  Migrate / sync file data     │  Scheduled    │
│                      │  one-time or recurring        │  transfers    │
│  Storage Gateway     │  Ongoing hybrid access        │  Always-on    │
│                      │  to on-prem files via S3/EFS  │  integration  │
│  S3 Transfer Accel.  │  Fast S3 uploads from         │  Upload       │
│                      │  global locations via CF edge │  acceleration │
└──────────────────────────────────────────────────────────────────────┘
```

### Exam Key Points ✅
- **DataSync = move large amounts of data online** — faster than standard copy tools
- **Agent required** for on-premises sources; **no agent** for AWS-to-AWS transfers
- **Scheduling + incremental** — not just one-time; can keep in sync over time
- **Preserves metadata** — file permissions, timestamps, ACLs transferred too
- **DataSync vs Snowball**: DataSync = online transfer (sufficient bandwidth); Snowball = offline (limited/no bandwidth or massive scale)
- **DataSync vs Storage Gateway**: DataSync = migration/scheduled sync; Storage Gateway = ongoing hybrid access
- **Use when**: migrating NFS/SMB shares to S3/EFS, syncing on-premises data to AWS, cross-region S3/EFS replication, cloud-to-cloud migration

---

## 🗃️ 3. AWS Database Migration Service (DMS)

### What It Is
A **managed service to migrate databases** to AWS quickly and securely — the source database remains fully operational during migration, minimizing downtime.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                  AWS Database Migration Service                       │
│                                                                       │
│  Source DB                                                            │
│  (on-prem, EC2, RDS,                                                 │
│   another cloud)                                                      │
│  ┌───────────────┐                                                   │
│  │  Oracle       │                                                   │
│  │  SQL Server   │                                                   │
│  │  MySQL        │  CDC (Change Data Capture)                        │
│  │  PostgreSQL   │◀─────────────────────────────────────────────┐   │
│  │  MongoDB      │──▶ Ongoing replication                       │   │
│  │  SAP ASE      │                                               │   │
│  └───────┬───────┘                                               │   │
│          │  Initial full load                                    │   │
│          ▼                                                        │   │
│  ┌──────────────────────────────────────────────────────────┐   │   │
│  │  DMS Replication Instance (EC2-backed)                   │   │   │
│  │  • Reads from source                                      │   │   │
│  │  • Transforms data (optional Schema Conversion Tool)      │   │   │
│  │  • Writes to target                                        │   │   │
│  └──────────────────────┬───────────────────────────────────┘   │   │
│                          │                                        │   │
│                          ▼  Full load + CDC                       │   │
│  Target DB                                                        │   │
│  ┌───────────────┐                                               │   │
│  │  Amazon RDS   │◀──────────────────────────────────────────────┘   │
│  │  Aurora       │                                                   │
│  │  DynamoDB     │                                                   │
│  │  Redshift     │                                                   │
│  │  S3           │                                                   │
│  │  OpenSearch   │                                                   │
│  │  DocumentDB   │                                                   │
│  └───────────────┘                                                   │
└──────────────────────────────────────────────────────────────────────┘
```

### Migration Types
| Type | Description | Downtime |
|---|---|---|
| **Full Load** | Migrate existing data only; stop source after migration | Brief cutover |
| **Full Load + CDC** | Migrate existing data + capture ongoing changes | Minimal (minutes) |
| **CDC Only** | Only capture ongoing changes (pre-load done separately) | None |

**CDC (Change Data Capture)** — continuously reads transaction logs from source; applies changes to target in near real-time to keep them in sync during migration.

### Homogeneous vs Heterogeneous Migration
```
┌──────────────────────────────────────────────────────────────────────┐
│               Homogeneous vs Heterogeneous Migration                  │
│                                                                       │
│  Homogeneous (same engine)               Heterogeneous (different)   │
│  ─────────────────────────────           ─────────────────────────  │
│  MySQL → RDS MySQL                        Oracle → Aurora PostgreSQL │
│  PostgreSQL → Aurora PostgreSQL           SQL Server → MySQL         │
│  Oracle → RDS Oracle                      MongoDB → DynamoDB         │
│                                                                       │
│  Schema compatible → DMS directly        Schema conversion needed    │
│                                          Use: AWS Schema Conversion  │
│                                          Tool (SCT) first            │
└──────────────────────────────────────────────────────────────────────┘
```

### AWS Schema Conversion Tool (SCT)
- Converts database **schema** from one engine to another
- Converts: stored procedures, views, functions, indexes, triggers
- Identifies and reports code that cannot be auto-converted (needs manual fix)
- Run **before** DMS for heterogeneous migrations

### Supported Sources and Targets
| Direction | Examples |
|---|---|
| **Sources** | Oracle, SQL Server, MySQL, PostgreSQL, MariaDB, MongoDB, SAP, Azure SQL, RDS |
| **Targets** | RDS (all engines), Aurora, DynamoDB, Redshift, S3, OpenSearch, DocumentDB, Kinesis |

### DMS Multi-AZ
- Replication instance can be **Multi-AZ** for high availability
- Standby replication instance in different AZ — automatic failover

### DMS Continuous Replication
- Beyond migration: use DMS for **ongoing replication**
- Keep two databases in sync (reporting replica, cross-region, hybrid)

### Exam Key Points ✅
- **Source DB stays operational** during migration — minimal downtime with CDC
- **Full Load + CDC** = most common pattern for live database migration
- **SCT (Schema Conversion Tool)** = separate tool for heterogeneous migrations; converts schema before DMS migrates data
- **DMS replication instance** = EC2 instance in your VPC; choose appropriate size
- **DMS can replicate TO**: DynamoDB, Redshift, S3, OpenSearch — not just relational DBs
- **Homogeneous** (MySQL→MySQL) = DMS only; **Heterogeneous** (Oracle→Aurora) = SCT first, then DMS
- **Use when**: migrating databases to AWS with minimal downtime, ongoing cross-database replication, database engine changes (Oracle → PostgreSQL)

---

## 📦 4. AWS Snow Family

### What It Is
A collection of **physical edge computing and data transfer devices** that AWS ships to your location — for **offline data migration** when network transfer is impractical, or for **edge computing** in disconnected environments.

### Snow Family Members
```
┌──────────────────────────────────────────────────────────────────────┐
│                       AWS Snow Family                                 │
│                                                                       │
│  ┌──────────────────────┐                                            │
│  │  AWS Snowcone        │  Smallest; rugged; portable               │
│  │                      │  Storage: 8 TB HDD or 14 TB SSD           │
│  │  [Small device]      │  Weight: 4.5 lbs                          │
│  │                      │  vCPU: 2 | RAM: 4 GB                      │
│  │                      │  DataSync agent pre-installed             │
│  │                      │  Use: IoT, edge, small data transfers     │
│  └──────────────────────┘                                            │
│                                                                       │
│  ┌──────────────────────┐                                            │
│  │  AWS Snowball Edge   │  Suitcase-sized; most common              │
│  │                      │                                            │
│  │  Storage Optimized:  │  80 TB usable HDD + 1 TB SSD             │
│  │  [Larger device]     │  40 vCPU | 80 GB RAM                      │
│  │                      │                                            │
│  │  Compute Optimized:  │  28 TB NVMe SSD + 42 TB HDD              │
│  │                      │  52 vCPU | 208 GB RAM + optional GPU      │
│  │                      │  Use: large migrations, edge computing    │
│  └──────────────────────┘                                            │
│                                                                       │
│  ┌──────────────────────┐                                            │
│  │  AWS Snowmobile      │  45-foot shipping container               │
│  │                      │  Storage: up to 100 PB                    │
│  │  [Semi-truck]        │  Physically secure, tamper-proof          │
│  │                      │  Use: exabyte-scale data center migration │
│  └──────────────────────┘                                            │
└──────────────────────────────────────────────────────────────────────┘
```

### Snow Family Comparison
| Feature | Snowcone | Snowball Edge Storage | Snowball Edge Compute | Snowmobile |
|---|---|---|---|---|
| **Storage** | 8 TB HDD / 14 TB SSD | 80 TB | 28 TB NVMe + 42 TB | 100 PB |
| **Compute** | 2 vCPU / 4 GB RAM | 40 vCPU / 80 GB | 52 vCPU / 208 GB + GPU | None |
| **Size** | Tiny (portable) | Suitcase | Suitcase | Shipping container |
| **Network** | Wi-Fi + wired | 10/25/100 GbE | 10/25/100 GbE | Dedicated fiber |
| **Edge compute** | Basic (EC2 AMIs) | Yes | Yes (GPU available) | No |
| **Use case** | Small, remote sites | Large data migration | ML/analytics at edge | Datacenter migration |

### Data Transfer Process
```
  1. Request device from AWS console
          │
  2. AWS ships device to your location (7-10 days)
          │
  3. Connect device to local network
          │
  4. Transfer data to device (encrypted locally with AES-256)
          │
  5. Ship device back to AWS
          │
  6. AWS uploads data to S3 (within 7 days of arrival)
          │
  7. AWS wipes device (NIST 800-88 standard)
```

### Edge Computing on Snow Devices
- Run **EC2 instances** locally on Snowball/Snowcone
- Run **Lambda** functions at the edge (Snowball)
- Use **AWS IoT Greengrass** for IoT workloads (Snowcone)
- Process data locally before sending to AWS (pre-processing, filtering)

### OpsHub
- GUI application for managing Snow devices locally
- Manage file transfer, instances, jobs without CLI

### When to Use Snow vs DataSync
```
┌──────────────────────────────────────────────────────────────────────┐
│                Snow Family vs DataSync Decision                       │
│                                                                       │
│  Use DataSync (online) when:                                          │
│  • You have adequate bandwidth (≥100 Mbps reliable)                  │
│  • Data < a few TB and time allows                                    │
│  • Need ongoing/incremental sync                                      │
│                                                                       │
│  Use Snow Family (offline) when:                                      │
│  • Limited or expensive bandwidth                                     │
│  • Data > ~10 TB (transfer would take weeks online)                  │
│  • Disconnected or remote location                                    │
│  • Security requirements (no internet transfer)                      │
│                                                                       │
│  Rule of thumb:                                                       │
│  "If online transfer takes > 1 week → consider Snowball"             │
│                                                                       │
│  10 TB over 1 Gbps = ~22 min  ──▶ DataSync                          │
│  10 TB over 10 Mbps = ~9 days ──▶ Snowball                          │
└──────────────────────────────────────────────────────────────────────┘
```

### Exam Key Points ✅
- **Snowcone** = smallest; fits in backpack; 8–14 TB; portable edge device
- **Snowball Edge** = suitcase-size; Storage (80 TB) or Compute (52 vCPU + GPU) variants
- **Snowmobile** = shipping container; 100 PB; for exabyte-scale datacenter migration
- **All data encrypted** with KMS before leaving your premises (AES-256)
- **Snowball does NOT support S3 Glacier directly** — data lands in S3 Standard; lifecycle policy moves it to Glacier
- **Edge computing** on Snow devices — run EC2 AMIs, Lambda, Greengrass locally
- **Use when**: large data transfers with limited connectivity, remote edge locations, datacenter evacuation, offshore/military environments

---

## 📁 5. AWS Transfer Family

### What It Is
A **fully managed service** for transferring files into and out of **Amazon S3 and Amazon EFS** using standard file transfer protocols — **SFTP, FTPS, FTP, and AS2** — without managing servers.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                      AWS Transfer Family                              │
│                                                                       │
│  External Partners / Clients                                         │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Trading partner, financial institution, healthcare provider  │   │
│  │  using SFTP / FTPS / FTP / AS2 client                        │   │
│  └──────────────────────────────┬───────────────────────────────┘   │
│                                 │  Standard file transfer protocol    │
│                                 ▼                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Transfer Family Server (managed endpoint)                    │   │
│  │                                                               │   │
│  │  Protocols:   SFTP (SSH)  |  FTPS (TLS)  |  FTP  |  AS2     │   │
│  │  Endpoint:    Public (internet-facing)                        │   │
│  │               VPC (private, internal)                         │   │
│  │               FIPS 140-2 (US gov compliance)                  │   │
│  │                                                               │   │
│  │  Auth:        Service-managed (SSH keys, passwords)           │   │
│  │               AWS Directory Service (AD)                      │   │
│  │               Custom Lambda (any IdP)                         │   │
│  └──────────────────────────────┬────────────────────────────────┘   │
│                                 │                                     │
│                   ┌─────────────┴────────────┐                       │
│                   ▼                          ▼                       │
│             Amazon S3                   Amazon EFS                   │
│             (object storage)            (file storage)               │
│                   │                                                   │
│         (S3 events → Lambda / SNS                                    │
│          for post-processing)                                        │
└──────────────────────────────────────────────────────────────────────┘
```

### Supported Protocols
| Protocol | Full Name | Use Case |
|---|---|---|
| **SFTP** | SSH File Transfer Protocol | Most common; secure file exchange with partners |
| **FTPS** | FTP over SSL/TLS | Legacy systems requiring FTP with encryption |
| **FTP** | File Transfer Protocol | Unencrypted; for internal VPC-only use |
| **AS2** | Applicability Statement 2 | B2B EDI (Electronic Data Interchange) — healthcare, finance, retail |

### Key Features
| Feature | Description |
|---|---|
| **No server management** | AWS manages the protocol server infrastructure |
| **Custom hostname** | Use your own domain (CNAME to Transfer endpoint) |
| **Elastic IPs** | Assign Elastic IPs for static IP addresses (VPC endpoint) |
| **Multi-AZ** | High availability built-in |
| **Storage** | Files land directly in S3 or EFS — no separate storage |
| **IAM roles** | Control which S3 prefix/EFS path each user can access |
| **CloudWatch** | Metrics and logging for all file transfer activity |
| **Managed workflows** | Post-processing: decrypt, tag, move files after upload |

### Authentication Options
| Method | Description |
|---|---|
| **Service-managed** | SSH public keys (SFTP) or passwords managed by Transfer |
| **AWS Directory Service** | AD-based auth — for enterprise user management |
| **Custom Lambda authorizer** | Integrate any identity provider (Okta, custom DB) |

### AS2 (Applicability Statement 2)
- Standard for **B2B EDI** file exchange
- Healthcare (X12 claims), finance, retail (EDI 850, 856, 810)
- Supports **encryption + digital signatures** of messages
- Replace costly VAN (Value-Added Network) with AWS-managed AS2

### Common Use Cases
| Use Case | Protocol |
|---|---|
| **Partner file exchange** | SFTP |
| **Legacy FTP migration** | SFTP or FTPS |
| **Healthcare EDI** | AS2 |
| **Retail supply chain** | AS2 |
| **Financial reporting** | SFTP or FTPS |
| **Internal file transfer** | FTP (VPC-only) |

### Exam Key Points ✅
- **Transfer Family = managed SFTP/FTPS/FTP/AS2 endpoints** backed by S3 or EFS
- **No infrastructure to manage** — AWS handles protocol server, scaling, HA
- Files go **directly to S3 or EFS** — accessible immediately after upload
- **AS2** = B2B EDI; used in healthcare and retail for structured document exchange
- **Custom hostname** — users connect to `sftp.yourcompany.com` not AWS domain
- **Managed workflows** — automate post-processing steps (decrypt, tag, route files)
- **Use when**: replacing legacy FTP servers, accepting files from trading partners, migrating MFT (Managed File Transfer) solutions to AWS

---

## 🔄 Quick Comparison: Migration & Transfer Services

```
┌──────────────────────────────────────────────────────────────────────┐
│              Migration & Transfer — Decision Framework                │
│                                                                       │
│  Scenario                                   Service                  │
│  ─────────────────────────────────────────  ──────────────────────  │
│  Lift-and-shift servers to EC2              MGN (App Migration Svc) │
│  Migrate databases with min. downtime       AWS DMS                  │
│  Convert DB schema (Oracle → PostgreSQL)    AWS SCT (then DMS)       │
│  Move file data online (NFS/SMB → S3/EFS)  AWS DataSync             │
│  Cross-region S3 replication               AWS DataSync             │
│  Offline transfer of TB-PB scale data      Snow Family               │
│  Small, remote, offline location           AWS Snowcone              │
│  Large data migration (TB scale)           AWS Snowball Edge         │
│  Entire datacenter migration (exabyte)      AWS Snowmobile           │
│  Managed SFTP/FTPS server → S3             AWS Transfer Family       │
│  B2B EDI file exchange                     Transfer Family (AS2)     │
│  Replace legacy FTP server                 Transfer Family           │
│  Hybrid file share (ongoing access)        Storage Gateway           │
└──────────────────────────────────────────────────────────────────────┘
```

### Migration Strategy Reference (6 Rs)
```
┌──────────────────────────────────────────────────────────────────────┐
│                     The 6 Rs of Migration                             │
│                                                                       │
│  Rehost       (Lift & Shift)   ──▶  AWS MGN                         │
│  Replatform   (Lift & Reshape) ──▶  Move to RDS, Elastic Beanstalk  │
│  Repurchase   (Drop & Shop)    ──▶  Move to SaaS (Salesforce, etc.) │
│  Refactor     (Re-architect)   ──▶  Redesign for cloud-native        │
│  Retire       (Decommission)   ──▶  Turn off unused systems          │
│  Retain       (Revisit later)  ──▶  Keep on-premises for now        │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🚨 Common Exam Traps

1. **MGN replaced SMS** — AWS Application Migration Service is the current recommended lift-and-shift tool; Server Migration Service (SMS) is legacy
2. **DMS source stays online** — the source database keeps running during migration; this is a key selling point
3. **SCT is separate from DMS** — Schema Conversion Tool converts the schema first; DMS migrates the data; don't confuse the two
4. **DataSync vs Storage Gateway** — DataSync = migrate/sync data; Storage Gateway = ongoing hybrid access (always-on); both can move data to S3 but serve different purposes
5. **Snowball data goes to S3 Standard first** — you cannot load directly to S3 Glacier from Snowball; use lifecycle policies to transition after import
6. **Snowball Edge has compute** — it's not just storage; can run EC2 AMIs and Lambda at the edge; Snowmobile is storage-only (no compute)
7. **Transfer Family ≠ DataSync** — Transfer Family = protocol server (SFTP endpoint for partners); DataSync = automated scheduled data sync/migration
8. **FTP in Transfer Family is unencrypted** — only use FTP for VPC-internal endpoints; SFTP and FTPS for internet-facing
9. **DataSync Agent** is needed for on-premises sources; no agent needed for AWS-to-AWS transfers
10. **DMS supports S3 and DynamoDB as targets** — not just relational databases; commonly tested with "migrate Oracle to DynamoDB"

---

*Last updated for AWS SAA-C03 exam preparation*
