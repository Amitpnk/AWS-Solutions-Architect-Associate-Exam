# SAA-C03 EC2 Exam Questions & Answers

## Table of Contents
1. [EC2 Basics & Instance Types](#ec2-basics--instance-types)
2. [Security Groups & Networking](#security-groups--networking)
3. [EC2 Purchasing Options](#ec2-purchasing-options)
4. [IP Addressing & ENI](#ip-addressing--eni)
5. [EBS & Storage](#ebs--storage)
6. [AMI & Instance Store](#ami--instance-store)
7. [EFS & File Systems](#efs--file-systems)
8. [Advanced Scenarios](#advanced-scenarios)

---

## EC2 BASICS & INSTANCE TYPES

### Question 1: EC2 Instance Types
**Difficulty:** Easy

A company needs to run a high-performance data processing application that requires significant computational power and is optimized for CPU-intensive workloads. Which EC2 instance type family should they choose?

**A)** M5 (General Purpose)  
**B)** C5 (Compute Optimized)  
**C)** R5 (Memory Optimized)  
**D)** I3 (Storage Optimized)

**Answer:** **B) C5 (Compute Optimized)**

**Explanation:**
- **C5 instances** are optimized for high-performance web applications, batch processing, media transcoding, and CPU-intensive analytics
- M5 is general purpose (balanced compute, memory, networking)
- R5 is memory optimized (for in-memory databases)
- I3 is storage optimized (for NoSQL, data warehousing)

---

### Question 2: EC2 User Data
**Difficulty:** Medium

You are launching an EC2 instance that needs to automatically install a web server and create a custom configuration file during startup. Which of the following statements about EC2 User Data is CORRECT?

**A)** User Data scripts run with root privileges and execute every time the instance starts  
**B)** User Data scripts run as the ec2-user and execute only on the first boot  
**C)** User Data scripts run with root privileges and execute only on the first boot  
**D)** User Data scripts cannot access IAM role permissions

**Answer:** **C) User Data scripts run with root privileges and execute only on the first boot**

**Explanation:**
- User Data is a script that runs automatically when an EC2 instance starts
- It runs with **root/administrator privileges**
- It executes **only on the first boot** (not every time the instance starts)
- User Data can invoke IAM role permissions through the instance metadata
- Common use cases: installing software, configuring services, downloading files

---

### Question 3: Comparing Instance Types
**Difficulty:** Medium

Your company runs a web application with unpredictable traffic patterns. During peak hours, you need instances optimized for balanced performance, but during off-peak hours, you want to minimize costs. Which instance type family is most suitable for this scenario?

**A)** C5 (Compute Optimized)  
**B)** M5 (General Purpose)  
**C)** R5 (Memory Optimized)  
**D)** T3 (Burstable)

**Answer:** **D) T3 (Burstable)**

**Explanation:**
- **T3 instances** provide a baseline level of CPU performance and can burst above the baseline when needed
- They accumulate CPU credits during idle periods and use them during peak periods
- Cost-effective for workloads with varying traffic patterns
- M5 is also general purpose but doesn't have burstable capability
- C5 would be overpowered for variable workloads

---

## SECURITY GROUPS & NETWORKING

### Question 4: Security Groups Basics
**Difficulty:** Easy

You have an EC2 instance running a web server on port 443. You need to allow HTTPS traffic from anywhere on the internet. Which security group rule should you create?

**A)** Inbound rule: Protocol TCP, Port 443, Source 0.0.0.0/0  
**B)** Outbound rule: Protocol TCP, Port 443, Destination 0.0.0.0/0  
**C)** Inbound rule: Protocol UDP, Port 443, Source 0.0.0.0/0  
**D)** Inbound rule: Protocol TCP, Port 80, Source 0.0.0.0/0

**Answer:** **A) Inbound rule: Protocol TCP, Port 443, Source 0.0.0.0/0**

**Explanation:**
- HTTPS uses **TCP protocol on port 443**
- You need an **inbound rule** to allow incoming traffic from the internet
- **0.0.0.0/0** means from any IP address (anywhere on the internet)
- Option B is outbound (for traffic leaving the instance)
- Option C uses UDP (HTTPS uses TCP)
- Option D is HTTP (port 80), not HTTPS

---

### Question 5: Security Groups - Multiple Layers
**Difficulty:** Medium

You have an EC2 instance (Instance A) in a security group that allows all outbound traffic. You need Instance A to send requests to another EC2 instance (Instance B) on port 3306 (MySQL). What inbound rule must be configured on Instance B's security group?

**A)** Allow inbound from Instance A's security group on port 3306  
**B)** Allow outbound to Instance A's security group on port 3306  
**C)** Allow inbound from Instance A's private IP on port 3306  
**D)** Allow inbound from 0.0.0.0/0 on port 3306

**Answer:** **A) Allow inbound from Instance A's security group on port 3306**

**Explanation:**
- Instance B needs an **inbound rule** to receive the connection
- The source can be **another security group** (Instance A's SG) - this is a best practice
- Using a security group as a source is more flexible than hardcoding IPs
- If Instance A is replaced, the new instance in the same SG will automatically have access
- Using 0.0.0.0/0 would expose the database to the entire internet (security risk)

---

### Question 6: SSH Access Troubleshooting
**Difficulty:** Medium

A developer is unable to SSH into an EC2 instance using the key pair. The error message is "Connection timed out." Which of the following is the MOST likely cause?

**A)** The EC2 instance is using the wrong AMI  
**B)** The security group doesn't allow inbound traffic on port 22 (SSH)  
**C)** The private key file has incorrect permissions (not 400)  
**D)** The instance doesn't have an Elastic IP address assigned

**Answer:** **B) The security group doesn't allow inbound traffic on port 22 (SSH)**

**Explanation:**
- "Connection timed out" indicates the network request cannot reach the instance
- This happens when the **security group blocks inbound SSH traffic on port 22**
- The inbound rule needed: Protocol TCP, Port 22, Source your-ip/32 or 0.0.0.0/0
- Option C would cause a "Permission denied" error, not a timeout
- Option D is not necessary for SSH to work (public IP is fine)
- Option A wouldn't affect SSH connectivity

---

## EC2 PURCHASING OPTIONS

### Question 7: Spot Instances
**Difficulty:** Medium

Your company runs a non-critical batch processing job that can be interrupted. You want to minimize costs. Which EC2 purchasing option is most suitable?

**A)** On-Demand Instances  
**B)** Reserved Instances  
**C)** Spot Instances  
**D)** Dedicated Hosts

**Answer:** **C) Spot Instances**

**Explanation:**
- **Spot Instances** offer up to 90% discount compared to On-Demand pricing
- Spot Instances can be interrupted by AWS with a 2-minute warning
- Ideal for fault-tolerant, non-time-critical workloads (batch processing, data analysis, CI/CD)
- On-Demand is reliable but expensive for this use case
- Reserved Instances are for long-term commitments
- Dedicated Hosts are for compliance or licensing requirements (not cost-effective)

**Best Practices for Spot:**
- Use Spot Fleet or Auto Scaling for automatic instance replacement
- Implement graceful shutdown handling
- Use CloudWatch to monitor Spot Instance interruptions

---

### Question 8: Spot Instances vs Reserved Instances
**Difficulty:** Medium

Your organization runs a critical production application that must run 24/7 with 99.99% uptime, but it also has peak hours where you need additional capacity. What is the best cost-optimized purchasing strategy?

**A)** All On-Demand Instances  
**B)** Reserved Instances for baseline + On-Demand for peak  
**C)** All Spot Instances  
**D)** Reserved Instances for baseline + Spot Instances for peak

**Answer:** **D) Reserved Instances for baseline + Spot Instances for peak**

**Explanation:**
- **Reserved Instances (1-year or 3-year)** for baseline capacity: reliable, ~40% discount
- **Spot Instances** for peak capacity: up to 90% discount, acceptable interruption risk
- This combination balances cost and reliability
- Option A is too expensive for long-running workloads
- Option C is unreliable for critical production (high interruption risk)
- Option B doesn't utilize the cost savings of Spot Instances

---

### Question 9: Instance Purchasing Options Comparison
**Difficulty:** Medium

Which of the following EC2 purchasing options provides the LOWEST hourly cost for running a workload that requires 24/7 availability for 3 years?

**A)** On-Demand Instances  
**B)** 3-Year Reserved Instances with All Upfront payment  
**C)** 1-Year Reserved Instances with Partial Upfront payment  
**D)** Spot Instances

**Answer:** **B) 3-Year Reserved Instances with All Upfront payment**

**Explanation:**
- **Longer commitment = Greater discount**: 3-year > 1-year > On-Demand
- **Payment options affect discount**: All Upfront > Partial Upfront > No Upfront
- 3-year All Upfront: ~60-70% discount
- 3-year Partial Upfront: ~55-65% discount
- 1-year All Upfront: ~40% discount
- On-Demand: 100% full price
- Spot Instances aren't suitable for 24/7 critical workloads (interruption risk)

---

## IP ADDRESSING & ENI

### Question 10: Elastic IP
**Difficulty:** Easy

You need to associate a static public IP address with an EC2 instance that you plan to replace in the future. Which AWS resource should you use?

**A)** Public IP Address  
**B)** Elastic IP Address  
**C)** Private IP Address  
**D)** Network Interface

**Answer:** **B) Elastic IP Address**

**Explanation:**
- **Elastic IP (EIP)** is a static public IP address that persists when you stop/start instances
- Public IP changes when you stop and start an instance
- EIP can be associated with any instance, making it ideal for replacement scenarios
- Private IP is internal to the VPC (not for internet communication)
- EIP is charged when not associated with a running instance (cost optimization tip)

---

### Question 11: Private vs Public IP
**Difficulty:** Medium

An EC2 instance has both a private IP (10.0.1.5) and a public IP (54.123.45.67). From where can this instance be accessed?

**A)** Private IP can be accessed from the internet; public IP only from within the VPC  
**B)** Public IP can be accessed from the internet; private IP only from within the VPC  
**C)** Both can be accessed from anywhere  
**D)** Neither can be accessed from outside the VPC

**Answer:** **B) Public IP can be accessed from the internet; private IP only from within the VPC**

**Explanation:**
- **Public IP (or Elastic IP)**: Accessible from the internet (routing through Internet Gateway)
- **Private IP**: Only accessible from within the VPC or connected networks (VPN, Direct Connect)
- Private IP is assigned from the subnet's CIDR range
- If there's no Internet Gateway or route, the public IP is also not reachable

---

### Question 12: Elastic Network Interface (ENI)
**Difficulty:** Medium

You have a compliance requirement that each EC2 instance must have multiple network interfaces with different MAC addresses. How can you meet this requirement?

**A)** Assign multiple Elastic IP addresses to a single ENI  
**B)** Attach multiple ENIs to a single EC2 instance  
**C)** Use a Network Load Balancer  
**D)** Assign multiple private IPs to the instance

**Answer:** **B) Attach multiple ENIs to a single EC2 instance**

**Explanation:**
- **ENI (Elastic Network Interface)** is a virtual network card with:
  - Unique MAC address
  - Primary private IP
  - One or more secondary private IPs
  - Elastic IP addresses
  - Security groups
- Each ENI can be attached to one instance at a time
- Each ENI has a unique MAC address (satisfying compliance requirement)
- Maximum ENIs per instance depends on instance type (e.g., 2 for t2.micro, 12 for m5.large)

**Use Cases:**
- Multi-homed instances (multiple networks)
- License-based software using MAC addresses
- Failover scenarios

---

### Question 13: ENI Attachment
**Difficulty:** Medium

You have a network interface from a failed EC2 instance that you want to attach to a healthy instance. Which of the following must be true for this operation to succeed?

**A)** Both instances must be in the same VPC and the same Availability Zone  
**B)** Both instances must be in the same region and the same subnet  
**C)** Both instances must be in the same VPC and the same subnet  
**D)** Both instances must be in the same subnet and have the same security group

**Answer:** **C) Both instances must be in the same VPC and the same subnet**

**Explanation:**
- ENI can only be attached to instances in the **same VPC**
- More specifically, the ENI and instance must be in the **same subnet**
- Being in the same AZ is not a requirement (subnets map to AZs, but if in same subnet, it's automatic)
- Security groups don't need to match
- This is useful for failover scenarios with static IP requirements

---

## EBS & STORAGE

### Question 14: EBS Volume Types
**Difficulty:** Medium

You are designing storage for a database that requires 16,000 IOPS with low latency. Which EBS volume type should you choose?

**A)** gp3 (General Purpose)  
**B)** io2 (Provisioned IOPS SSD)  
**C)** st1 (Throughput Optimized HDD)  
**D)** sc1 (Cold HDD)

**Answer:** **B) io2 (Provisioned IOPS SSD)**

**Explanation:**
- **io2 (Provisioned IOPS)**: Up to 64,000 IOPS (best for high-IOPS workloads)
- **gp3**: Up to 16,000 IOPS (good for general workloads, improved from gp2)
- **st1**: Optimized for throughput, not IOPS (big data, logs)
- **sc1**: Lowest cost HDD option (archival data)

**Volume Type Comparison:**
| Type | IOPS | Use Case |
|------|------|----------|
| io2 | Up to 64,000 | Databases, high-performance apps |
| io1 | Up to 64,000 | Legacy, being replaced by io2 |
| gp3 | Up to 16,000 | General purpose, web apps, development |
| gp2 | Up to 16,000 | Previous generation gp3 |
| st1 | Up to 500 | Big data, data warehouse, logs |
| sc1 | Up to 250 | Cold data, archives |

---

### Question 15: EBS Encryption
**Difficulty:** Medium

You have an unencrypted EBS volume attached to a running EC2 instance. You need to encrypt this volume. What is the correct approach?

**A)** Enable encryption on the volume directly  
**B)** Create a snapshot, restore it with encryption enabled, then attach the new volume  
**C)** Detach the volume, encrypt it, and reattach  
**D)** Modify the volume to enable encryption in-place

**Answer:** **B) Create a snapshot, restore it with encryption enabled, then attach the new volume**

**Explanation:**
- **EBS encryption cannot be enabled on an existing volume**
- Process:
  1. Create a snapshot of the unencrypted volume
  2. Create a new volume from the snapshot with "Encrypt" option enabled
  3. Detach the original volume
  4. Attach the new encrypted volume to the instance
  5. Update the application to use the new volume
- Encryption occurs between host and storage; minimal performance impact
- Root volume can also be encrypted during this process
- Encryption is specific to regions; cross-region requires snapshot copy with encryption

---

### Question 16: EBS Multi-Attach
**Difficulty:** Medium

You want to attach a single EBS volume to multiple EC2 instances simultaneously. What conditions must be met?

**A)** Any EBS volume type can be attached to multiple instances in different AZs  
**B)** Only io1/io2 volumes can be attached to up to 16 instances in the same AZ  
**C)** Any EBS volume can be attached to 2 instances  
**D)** Only gp3 volumes support multi-attach

**Answer:** **B) Only io1/io2 volumes can be attached to up to 16 instances in the same AZ**

**Explanation:**
- **EBS Multi-Attach** is supported only on:
  - **io1 and io2 volumes** (high-performance SSD)
  - Maximum **16 EC2 instances**
  - All instances must be in the **same Availability Zone**
  - All instances must use a file system that supports concurrent access (e.g., GFS2, Oracle RAC)
- Use Case: Database clustering, application redundancy
- By default, an EBS volume can only attach to one instance
- Warning: Multi-attach doesn't guarantee data consistency; file system must handle it

---

### Question 17: EBS Snapshots
**Difficulty:** Medium

You want to create a backup of an EBS volume for disaster recovery purposes. What is the best approach to minimize storage costs while maintaining quick recovery capability?

**A)** Create a full snapshot every hour  
**B)** Create an initial full snapshot and then incremental snapshots  
**C)** Copy the volume to an S3 bucket daily  
**D)** Use AWS Backup service with default settings

**Answer:** **B) Create an initial full snapshot and then incremental snapshots**

**Explanation:**
- **First snapshot**: Full copy of volume data (longest time)
- **Subsequent snapshots**: Only changed blocks since last snapshot (incremental)
- Incremental snapshots are:
  - **Faster** to create
  - **Cheaper** (store only changed blocks)
  - Still provide full recovery capability (AWS handles reconstruction)
- Benefits:
  - Point-in-time recovery
  - Cross-region DR (copy snapshots to another region)
  - Can launch AMIs from snapshots
- **Snapshot storage cost**: You pay for the total snapshots stored (changed blocks only)

---

### Question 18: EBS vs Instance Store
**Difficulty:** Medium

You need temporary storage for intermediate data that can be recreated if the instance fails. Which storage option is most cost-effective?

**A)** EBS Volume  
**B)** EBS Snapshot  
**C)** Instance Store  
**D)** Amazon S3

**Answer:** **C) Instance Store**

**Explanation:**
- **Instance Store** (Ephemeral Storage):
  - **No additional cost** (included with instance)
  - Very high performance (NVMe SSD or HDD)
  - Lost when instance is stopped, terminated, or fails
  - Cannot be detached or reattached
  - Good for: caches, temporary files, swap space

- **Comparison**:
  - EBS: Persistent, paid separately
  - Instance Store: Ephemeral, no extra cost
  - S3: Object storage, higher latency

- **Limitations**:
  - Not all instance types support instance store
  - Data loss on instance failure (acceptable for this scenario)
  - Cannot be backed up directly (snapshot capability varies)

---

## AMI & INSTANCE STORE

### Question 19: AMI Creation
**Difficulty:** Medium

You have configured an EC2 instance with specific software and settings. You need to use this configuration to launch multiple identical instances. What is the correct process?

**A)** Copy the public IP and share it with other users  
**B)** Create an AMI from the instance, then launch new instances from the AMI  
**C)** Attach the root volume to multiple instances  
**D)** Use EC2 User Data to replicate settings on each instance

**Answer:** **B) Create an AMI from the instance, then launch new instances from the AMI**

**Explanation:**
- **AMI (Amazon Machine Image)**: Template containing:
  - Root volume snapshot
  - Block device mappings
  - Architecture (32-bit or 64-bit)
  - Virtualization type
  - Permissions
  - Kernel/Ramdisk IDs (for paravirtual)

- **Process**:
  1. Configure EC2 instance with desired software and settings
  2. Create Image → Select "Create image"
  3. AMI is created from EBS snapshots of all volumes
  4. Launch new instances from the AMI
  5. Each new instance is identical to the source

- **Benefits**:
  - Consistent deployments
  - Faster scaling (no need for User Data execution)
  - Can be shared across accounts/regions
  - Can be made public or kept private

---

### Question 20: Instance Store Characteristics
**Difficulty:** Easy

You are selecting an instance type for a high-performance analytics application that requires fast I/O. Which statement about Instance Store is CORRECT?

**A)** Instance Store volumes are persistent and survive instance termination  
**B)** Instance Store volumes are ephemeral and lost when the instance stops  
**C)** Instance Store volumes can be attached/detached like EBS  
**D)** Instance Store provides better durability than EBS

**Answer:** **B) Instance Store volumes are ephemeral and lost when the instance stops**

**Explanation:**
- **Instance Store** characteristics:
  - **Ephemeral** (temporary) storage
  - Physically attached to the host computer
  - Lost if instance is **stopped, terminated, or fails**
  - **Not lost** if instance is rebooted (data persists)
  - Cannot be detached or reattached
  - No additional cost (included with instance)
  - High performance (NVMe or HDD)

- **Good for**:
  - Temporary caches
  - Intermediate processing data
  - Distributed file systems (with redundancy)
  - Real-time analytics

- **Not suitable for**:
  - Persistent data
  - Databases (unless replicated)
  - Backups

---

## EFS & FILE SYSTEMS

### Question 21: EFS vs EBS
**Difficulty:** Medium

You need shared storage that can be accessed by multiple EC2 instances across different Availability Zones simultaneously. Which solution is most appropriate?

**A)** EBS Volume  
**B)** EBS Multi-Attach  
**C)** Amazon EFS  
**D)** S3 with EC2 mounting

**Answer:** **C) Amazon EFS**

**Explanation:**
- **Amazon EFS (Elastic File System)**:
  - NFS protocol-based file system
  - Accessible from **multiple EC2 instances simultaneously**
  - Works across **different Availability Zones**
  - Automatic scaling (grows/shrinks automatically)
  - Pay for storage used (not provisioned capacity)
  - Linux only (POSIX-compliant)

- **Comparison**:
  - **EBS**: Single instance, single AZ (with multi-attach limited to same AZ)
  - **EBS Multi-Attach**: Multiple instances, but same AZ only, io1/io2 only
  - **EFS**: Multiple instances, multiple AZs, better for NFS workloads
  - **S3**: Object storage, not a file system, higher latency

- **EFS Use Cases**:
  - Shared file storage for web applications
  - Data sharing across multiple instances
  - Container orchestration (ECS/EKS)
  - Machine learning training data

---

### Question 22: EFS Access Points
**Difficulty:** Medium

You have multiple applications running on different EC2 instances that need to access a shared EFS file system with different permissions and root directories. What is the best approach?

**A)** Create multiple IAM policies for each application  
**B)** Create EFS Access Points for each application  
**C)** Create separate EFS volumes for each application  
**D)** Use security groups to control access

**Answer:** **B) Create EFS Access Points for each application**

**Explanation:**
- **EFS Access Points**:
  - Simplify NFS access for applications
  - Enforce a user identity (UID/GID)
  - Enforce a root directory per application
  - Enforce POSIX permissions
  - One access point per application

- **Benefits**:
  - Easier management (no need for complex IAM policies)
  - Better isolation between applications
  - Consistent permissions enforcement
  - Support for legacy applications

- **Configuration**:
  ```
  Access Point 1:
  - UID: 1000, GID: 1000
  - Root directory: /app1
  
  Access Point 2:
  - UID: 1001, GID: 1001
  - Root directory: /app2
  ```

---

### Question 23: EFS Performance
**Difficulty:** Medium

Your application requires EFS to handle 500 MB/s throughput consistently. Which EFS performance mode should you select?

**A)** General Purpose (default)  
**B)** Max IO  
**C)** Provisioned Throughput  
**D)** Bursting Throughput

**Answer:** **B) Max IO**

**Explanation:**
- **EFS Performance Modes**:

  **General Purpose (default)**:
  - Recommended for most workloads
  - Lower latency
  - Can burst to higher throughput
  - Good for web serving, content management, media processing

  **Max IO**:
  - For highly parallelized workloads
  - Higher levels of aggregate throughput
  - Slightly higher latencies
  - Good for big data, media processing, distributed processing

- **Throughput Mode**:
  
  **Bursting Throughput (default)**:
  - Throughput scales with storage size
  - Earn credits during low-traffic periods
  - Use credits during high-traffic periods
  
  **Provisioned Throughput**:
  - Provision specific throughput independently of storage
  - For workloads with consistent high throughput needs

- **For 500 MB/s consistent throughput**: Use Max IO + Provisioned Throughput

---

## ADVANCED SCENARIOS

### Question 24: EC2 Placement Groups - Cluster
**Difficulty:** Medium

You are deploying a high-performance computing (HPC) cluster that requires ultra-low latency communication between instances. Which EC2 Placement Group type should you use?

**A)** Spread Placement Group  
**B)** Cluster Placement Group  
**C)** Partition Placement Group  
**D)** Availability Zone Placement Group

**Answer:** **B) Cluster Placement Group**

**Explanation:**
- **Cluster Placement Group**:
  - Instances launched in **same AZ**
  - **10 Gbps network performance** between instances
  - **Ultra-low latency** communication
  - All instances should be same instance type for best performance
  - Use: HPC, clustering applications, big data analysis

- **Spread Placement Group**:
  - Instances distributed across **different hardware**
  - Different AZs can be used
  - Reduces risk of simultaneous failure
  - Use: Critical applications requiring high availability
  - Max 7 instances per placement group per AZ

- **Partition Placement Group**:
  - Instances distributed across partitions
  - Each partition on different rack
  - Good for distributed/replicated workloads
  - Use: HDFS, HBase, Cassandra, Kafka
  - Up to 7 partitions per placement group

---

### Question 25: EC2 Hibernation
**Difficulty:** Medium

You have a long-running data processing job on an EC2 instance that takes several hours to set up and initialize. To save costs, you want to pause this job without losing its state. Which EC2 feature should you use?

**A)** EBS snapshots  
**B)** EC2 Hibernation  
**C)** Auto Scaling with scheduled actions  
**D)** CloudWatch event-based suspension

**Answer:** **B) EC2 Hibernation**

**Explanation:**
- **EC2 Hibernation**:
  - Pause instance and preserve RAM state
  - **RAM contents written to EBS root volume**
  - Instance persists in hibernated state
  - Resume from exact same state in minutes
  - Faster than rebooting and re-initializing

- **Requirements**:
  - Instance must have EBS root volume
  - Root volume must have sufficient space (RAM size + OS overhead)
  - Instance must be configured with hibernation at launch
  - Supported instance families: M3+, R3+, T2 large/xlarge+
  - Limited to C5, D2, M5, R5, T3, and newer

- **Use Cases**:
  - Long-running applications with long initialization time
  - Database warm-up scenarios
  - Machine learning model training

---

### Question 26: EC2 Instance Roles
**Difficulty:** Medium

You need to grant EC2 instances permission to read objects from a specific S3 bucket. What is the correct approach?

**A)** Embed AWS credentials in the EC2 User Data script  
**B)** Use EC2 Instance Roles with an IAM policy  
**C)** Configure S3 bucket policy to allow EC2 security group  
**D)** Use Access Keys stored in AWS Secrets Manager

**Answer:** **B) Use EC2 Instance Roles with an IAM policy**

**Explanation:**
- **EC2 Instance Role** (Best Practice):
  - IAM role attached to EC2 instance
  - Instance can assume the role automatically
  - Credentials automatically rotated by AWS
  - No credentials stored on instance
  - Process:
    1. Create IAM role with S3 read policy
    2. Create instance profile linked to the role
    3. Attach instance profile to EC2 instance
    4. Instance can access S3 through metadata service

- **Why not other options**:
  - Option A: Hardcoding credentials is insecure (visible in User Data)
  - Option C: S3 bucket policy works with principals, not security groups
  - Option D: Requires additional setup; instance roles are built-in

- **Accessing credentials from instance**:
  ```bash
  # Credentials available in metadata service
  http://169.254.169.254/latest/meta-data/iam/security-credentials/role-name
  ```

---

### Question 27: EC2 Instance Launch Failure
**Difficulty:** Medium

You attempt to launch an EC2 instance with the following configuration:
- Instance Type: t2.micro
- Availability Zone: us-east-1a
- Subnet: subnet with CIDR 10.0.0.0/24

The launch fails with "InsufficientInstanceCapacity" error. What is the best resolution?

**A)** Choose a different instance type  
**B)** Try again later (AWS may recover capacity)  
**C)** Retry in a different Availability Zone  
**D)** All of the above could help

**Answer:** **D) All of the above could help**

**Explanation:**
- **InsufficientInstanceCapacity** occurs when AWS doesn't have available capacity in the specific AZ/instance type combination
- **Possible resolutions**:
  1. **Retry later**: Capacity may become available soon (temporary shortage)
  2. **Different AZ**: Try another AZ in the same region (capacity may vary)
  3. **Different instance type**: Demand for specific types may vary
  4. **Different region**: If available

- **Best practices**:
  - Use Auto Scaling to span multiple AZs (automatic failover)
  - Use placement groups cautiously (single AZ limitation)
  - Monitor capacity using CloudWatch

---

### Question 28: Security Group Rule Priority
**Difficulty:** Medium

You have the following security group rules on an instance's inbound rules:
1. Allow TCP port 443 from 0.0.0.0/0
2. Deny TCP port 443 from 10.0.0.0/8

Will traffic from 10.0.0.1 on port 443 be allowed or denied?

**A)** Allowed (allow rules evaluated first)  
**B)** Denied (deny rules evaluated first)  
**C)** Allowed (explicit allow for 0.0.0.0/0 is broader)  
**D)** Denied (more specific CIDR takes precedence)

**Answer:** **A) Allowed (allow rules evaluated first)**

**Explanation:**
- **Security Group Behavior**:
  - Security groups are **whitelist-based** (allow rules)
  - **Deny rules are NOT supported** in security groups
  - All traffic is implicitly denied unless explicitly allowed
  - The rule you mentioned as "Deny" would not be effective

- **Correct Behavior**:
  - Rule 1: Allow TCP 443 from 0.0.0.0/0 ✓ WORKS
  - Rule 2: Deny rules don't exist in security groups ✗ NOT APPLICABLE
  - Traffic from 10.0.0.1 on port 443 would be **ALLOWED** (matches rule 1)

- **For explicit deny**, use **Network ACLs**:
  - Network ACLs support both allow and deny rules
  - Evaluated in order (first match wins)
  - Applied at subnet level (not instance level)

---

### Question 29: Elastic IP Limits and Billing
**Difficulty:** Medium

Your company has 10 Elastic IPs allocated but only using 5 of them (associated with running instances). What is the billing implication?

**A)** You pay for all 10 Elastic IPs  
**B)** You pay only for the 5 in use  
**C)** You pay for the 5 unassociated Elastic IPs  
**D)** Elastic IPs have no cost if in the default VPC

**Answer:** **C) You pay for the 5 unassociated Elastic IPs**

**Explanation:**
- **Elastic IP Billing** (as of November 2023 pricing change):
  - **Associated with running instance**: FREE
  - **Associated with stopped instance**: Charged
  - **Unassociated**: Charged (significant hourly rate)
  - **Not used**: Still charged

- **Cost Optimization**:
  - Release unused Elastic IPs
  - Reassociate Elastic IPs before stopping instances
  - Monitor Elastic IP usage in AWS Cost Explorer

- **Regional scope**:
  - Elastic IPs are region-specific
  - Cannot transfer between regions (must create new)
  - Account has limited number per region (default: 5, can request increase)

---

### Question 30: EC2-VPC vs EC2-Classic
**Difficulty:** Easy

A newly created AWS account launches EC2 instances. In which environment will they be placed by default?

**A)** EC2-Classic  
**B)** VPC (Virtual Private Cloud)  
**C)** Standalone (not in any network)  
**D)** Default region only

**Answer:** **B) VPC (Virtual Private Cloud)**

**Explanation:**
- **EC2-VPC** (modern, default):
  - All new AWS accounts use VPC by default
  - Provides network isolation and control
  - Supports security groups and network ACLs
  - Each instance gets private IP from VPC CIDR

- **EC2-Classic** (deprecated):
  - Legacy environment (no longer available for new accounts)
  - Shared public network
  - Less network control
  - Only available for accounts created before 2013

- **VPC Benefits**:
  - Isolation between customers
  - Subnets for network segmentation
  - Network ACLs for layer 4 filtering
  - Internet Gateways for internet access
  - VPN and Direct Connect options

---

## Answer Summary Table

| Q | Answer | Topic |
|---|--------|-------|
| 1 | B | Instance Types |
| 2 | C | EC2 User Data |
| 3 | D | Instance Types |
| 4 | A | Security Groups |
| 5 | A | Security Groups |
| 6 | B | SSH/Security |
| 7 | C | Purchasing Options |
| 8 | D | Purchasing Options |
| 9 | B | Pricing/Reserved Instances |
| 10 | B | Elastic IP |
| 11 | B | IP Addressing |
| 12 | B | ENI |
| 13 | C | ENI Attachment |
| 14 | B | EBS Volume Types |
| 15 | B | EBS Encryption |
| 16 | B | EBS Multi-Attach |
| 17 | B | EBS Snapshots |
| 18 | C | Instance Store |
| 19 | B | AMI Creation |
| 20 | B | Instance Store |
| 21 | C | EFS |
| 22 | B | EFS Access Points |
| 23 | B | EFS Performance |
| 24 | B | Placement Groups |
| 25 | B | Hibernation |
| 26 | B | Instance Roles |
| 27 | D | Launch Errors |
| 28 | A | Security Groups |
| 29 | C | Elastic IP Billing |
| 30 | B | VPC vs Classic |

---

## Key Concepts to Remember for SAA-C03

### EC2 Instance Types Quick Reference
- **T**: Burstable (t2, t3, t3a) - Variable workloads
- **M**: General Purpose (m5, m6, m7) - Balanced
- **C**: Compute Optimized (c5, c6, c7) - CPU-intensive
- **R**: Memory Optimized (r5, r6, r7) - In-memory databases
- **I**: Storage Optimized (i3, i4) - NoSQL databases
- **G**: GPU (g4, g5) - Graphics/ML
- **D**: Dense Storage (d2) - MapReduce, DFS

### EBS Volume Types Quick Reference
- **io2/io1**: High IOPS (64,000 IOPS max) - Databases
- **gp3**: General Purpose (16,000 IOPS) - Most workloads
- **gp2**: General Purpose Legacy (16,000 IOPS) - Previous generation
- **st1**: Throughput Optimized (500 IOPS) - Big data
- **sc1**: Cold HDD (250 IOPS) - Archives

### Networking Checklist
- [ ] Security group allows inbound on required port
- [ ] Network ACL allows traffic (usually unrestricted)
- [ ] Instance has route to destination
- [ ] For internet access: Internet Gateway attached to VPC + route in subnet
- [ ] For SSH: Port 22 open, public IP or VPN access

---

**Last Updated**: April 2026  
**SAA-C03 Exam Format**: Multiple choice, 130 minutes, 65 questions