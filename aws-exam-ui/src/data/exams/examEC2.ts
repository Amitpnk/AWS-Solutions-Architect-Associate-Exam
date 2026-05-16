import type { ExamDefinition } from './types';

export const examEC2: ExamDefinition = {
    "id": "exam_ec2_saa_c03",
    "title": "SAA-C03 Practice Set on EC2",
    "description": "Comprehensive EC2 exam questions covering EC2 basics, security groups, purchasing options, networking, EBS, storage, and advanced scenarios",
    "durationSeconds": 4800,
    "questions": [
        {
            "id": "q1",
            "type": "multiple",
            "prompt": "A company needs to run a high-performance computing cluster with ultra-low latency communication between instances and wants to deploy a distributed database system. Which of the following should be implemented? (Choose two.)",
            "options": [
                "Use Cluster Placement Group to place instances in the same AZ with 10 Gbps network performance",
                "Use Spread Placement Group to distribute instances across different hardware",
                "Use io2 EBS volumes for database storage with multi-attach for shared access",
                "Use Amazon EFS for shared file storage accessible from multiple AZs"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Cluster Placement Groups provide ultra-low latency communication (10 Gbps) needed for HPC. io2 EBS volumes with multi-attach support high-performance database clustering in the same AZ. Spread Placement Group reduces latency benefits, and EFS works across AZs but may not provide required IOPS for database workloads."
        },
        {
            "id": "q2",
            "type": "single",
            "prompt": "You are launching an EC2 instance that needs to automatically install a web server and create a custom configuration file during startup. Which of the following statements about EC2 User Data is CORRECT?",
            "options": [
                "User Data scripts run as the ec2-user and execute only on the first boot",
                "User Data scripts run with root privileges and execute only on the first boot",
                "User Data scripts run with root privileges and execute every time the instance starts",
                "User Data scripts cannot access IAM role permissions"
            ],
            "correctOptionIndex": 1,
            "explanation": "User Data scripts execute with root/administrator privileges only on the first boot of an instance. They do not run on subsequent starts unless the instance is terminated and relaunched. User Data can invoke IAM role permissions through the instance metadata service."
        },
        {
            "id": "q3",
            "type": "multiple",
            "prompt": "A development team needs to optimize costs for their testing environment while maintaining flexibility to scale when needed. Which of the following strategies should be implemented? (Choose two.)",
            "options": [
                "Use Reserved Instances with 3-year All Upfront payment for predictable baseline load",
                "Use Spot Instances for non-critical workloads with fault tolerance",
                "Use On-Demand Instances for all production testing",
                "Use Compute Savings Plans for flexible hourly cost reduction"
            ],
            "correctOptionIndexes": [1, 3],
            "explanation": "Spot Instances provide up to 90% discount for non-critical testing workloads that can handle interruptions. Compute Savings Plans offer flexible hourly discounts across instance families. Reserved Instances and On-Demand are less cost-effective for development/testing environments."
        },
        {
            "id": "q4",
            "type": "single",
            "prompt": "An EC2 instance is unable to connect to another instance on port 3306 (MySQL) in a different security group. Which security group configuration is required to allow this traffic?",
            "options": [
                "Allow outbound traffic from the source instance's security group on port 3306",
                "Allow inbound traffic from the source instance's security group on port 3306",
                "Allow inbound traffic from 0.0.0.0/0 on port 3306",
                "Allow inbound traffic from the source instance's private IP on port 3306"
            ],
            "correctOptionIndex": 1,
            "explanation": "The destination instance (MySQL server) requires an inbound rule allowing traffic from the source instance's security group on port 3306. Using a security group as the source is more flexible and maintainable than hardcoding IP addresses. Using 0.0.0.0/0 would expose the database to the internet unnecessarily."
        },
        {
            "id": "q5",
            "type": "multiple",
            "prompt": "A company experiences SSH connection timeouts when trying to access an EC2 instance. The instance has a public IP and the developer has the correct private key. Which of the following are likely causes? (Choose two.)",
            "options": [
                "The security group doesn't allow inbound traffic on port 22 (SSH)",
                "The private key file has incorrect permissions (not 400 or 600)",
                "The EC2 instance is using the wrong AMI",
                "The Network ACL blocks inbound traffic on port 22"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "Connection timeout indicates network-level blocking: security group rules or Network ACLs blocking port 22. Private key permission errors would cause 'Permission denied' messages, not timeouts. AMI type doesn't affect SSH connectivity."
        },
        {
            "id": "q6",
            "type": "single",
            "prompt": "You need to store static website assets globally with fast delivery to users worldwide. The assets must be served directly from EC2 instances in different regions. What is the most appropriate architecture?",
            "options": [
                "Deploy EC2 instances in each region with EBS volumes storing assets",
                "Use Route 53 with geolocation routing to direct traffic to regional EC2 instances",
                "Store assets in Amazon S3 with CloudFront distribution and reference from EC2 instances",
                "Deploy a single t2.micro instance with Instance Store for global access"
            ],
            "correctOptionIndex": 2,
            "explanation": "While S3 and CloudFront are optimal, this question focuses on EC2. Route 53 geolocation routing directs traffic to EC2 instances by region, providing fast local access. EBS volumes are regional, and Instance Store doesn't provide persistence for global distribution."
        },
        {
            "id": "q7",
            "type": "multiple",
            "prompt": "Your organization requires instances optimized for different workload characteristics. Which instance types should be selected for the following scenarios? (Choose two.)",
            "options": [
                "Use C5 instances for high-performance data processing with CPU-intensive workloads",
                "Use R5 instances for web applications with balanced compute and networking",
                "Use T3 instances for variable workload applications with burstable CPU",
                "Use I3 instances for real-time analytics on large datasets"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "C5 instances are compute-optimized for CPU-intensive tasks. T3 instances provide burstable performance for variable workloads at lower cost. R5 is memory-optimized (not general purpose), and I3 is storage-optimized (not for analytics on datasets)."
        },
        {
            "id": "q8",
            "type": "single",
            "prompt": "You need to associate a static public IP address with an EC2 instance that will be replaced in the future. What AWS resource provides this capability?",
            "options": [
                "Public IP Address (automatically assigned)",
                "Elastic IP Address (statically allocated)",
                "Private IP Address (internal to VPC)",
                "Network Interface (manages IPs)"
            ],
            "correctOptionIndex": 1,
            "explanation": "Elastic IP (EIP) is a static public IP that persists across instance replacements and can be reassociated. Public IPs change when instances stop/start. Private IPs are internal only. Network Interfaces don't directly provide this capability."
        },
        {
            "id": "q9",
            "type": "multiple",
            "prompt": "A database team needs to meet IOPS and throughput requirements for a production database. Which EBS volume types should they evaluate? (Choose two.)",
            "options": [
                "io2 volumes for consistent high IOPS (up to 64,000) with low latency",
                "gp3 volumes for general purpose workloads up to 16,000 IOPS",
                "st1 volumes for high throughput optimization with up to 500 IOPS",
                "sc1 volumes for cost-effective archival storage"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "io2 provides highest IOPS for database workloads, gp3 offers balanced performance for general use. st1 is throughput-optimized (not IOPS), and sc1 is for cold storage archives. Database workloads require io2 or gp3."
        },
        {
            "id": "q10",
            "type": "single",
            "prompt": "You have an unencrypted EBS volume attached to a running EC2 instance. You need to encrypt this volume. What is the correct procedure?",
            "options": [
                "Enable encryption on the volume directly using the modify command",
                "Detach the volume and use the encrypt option to encrypt it in place",
                "Create a snapshot of the volume, restore it as encrypted, and attach the new volume",
                "Use AWS DataSync to migrate data to an encrypted volume"
            ],
            "correctOptionIndex": 2,
            "explanation": "EBS encryption cannot be enabled on existing volumes. The correct process: create snapshot → restore snapshot as new encrypted volume → detach original → attach new encrypted volume. Direct encryption or DataSync are not viable options for this scenario."
        },
        {
            "id": "q11",
            "type": "multiple",
            "prompt": "A company needs shared file storage accessible by multiple EC2 instances across different Availability Zones with automatic scaling. Which solutions meet these requirements? (Choose two.)",
            "options": [
                "Use Amazon EFS (Elastic File System) with NFS protocol",
                "Use EBS volumes with multi-attach capability across AZs",
                "Use EBS snapshots replicated across regions",
                "Use Amazon S3 with EC2 mounting through FUSE"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "EFS supports multi-AZ access, automatic scaling, and NFS protocol. S3 can be mounted on EC2 using FUSE tools like s3fs. EBS multi-attach is limited to same AZ only. EBS snapshots don't provide shared storage access."
        },
        {
            "id": "q12",
            "type": "single",
            "prompt": "You have multiple applications requiring access to a shared EFS file system with different permissions and root directories. What is the best approach?",
            "options": [
                "Create multiple IAM policies for each application user",
                "Use EFS Access Points to enforce user identity and root directories per application",
                "Create separate EFS volumes for each application",
                "Use security groups to segregate application access"
            ],
            "correctOptionIndex": 1,
            "explanation": "EFS Access Points provide simplified access management with enforced user identity (UID/GID), root directory isolation, and POSIX permissions per application. This is more scalable than multiple IAM policies, separate EFS volumes, or security groups."
        },
        {
            "id": "q13",
            "type": "multiple",
            "prompt": "A company is designing storage for instances and needs to choose between persistent and ephemeral options. Which statements about storage options are correct? (Choose two.)",
            "options": [
                "Instance Store provides ephemeral storage that is lost when the instance stops",
                "EBS volumes persist when instances stop and restart",
                "Instance Store is cost-effective because it's included in instance pricing",
                "Instance Store data persists when instances are rebooted"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Instance Store is ephemeral—lost on stop/terminate but persists on reboot. EBS persists across stop/start cycles. Instance Store is included in pricing. Only statements about Instance Store ephemeral nature and EBS persistence are correct."
        },
        {
            "id": "q14",
            "type": "single",
            "prompt": "You have configured an EC2 instance with specific software and settings needed to support multiple identical deployments. What is the correct approach to replicate this configuration?",
            "options": [
                "Copy the public IP address and share it with other teams",
                "Use EC2 User Data to replicate settings on each new instance",
                "Create an AMI (Amazon Machine Image) from the instance and launch new instances from it",
                "Attach the root volume to multiple instances simultaneously"
            ],
            "correctOptionIndex": 2,
            "explanation": "AMI creation captures the complete instance configuration (root volume snapshot, block device mappings, settings) for consistent replication. Sharing IP addresses, User Data, or volume attachment don't provide the same consistency and management capabilities."
        },
        {
            "id": "q15",
            "type": "multiple",
            "prompt": "A company is launching a production application with 24/7 uptime requirements and predictable baseline load plus variable peak traffic. Which purchasing strategy should they implement? (Choose two.)",
            "options": [
                "Use Reserved Instances (1-year or 3-year) for baseline capacity",
                "Use On-Demand Instances for peak traffic",
                "Use Spot Instances for all capacity to minimize costs",
                "Use Spot Fleet with fallback to On-Demand for peak capacity"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "Reserved Instances provide reliable, discounted baseline capacity. Spot Fleet with On-Demand fallback manages peak load cost-effectively. Pure Spot isn't suitable for critical production due to interruption risk. On-Demand alone for peak is expensive."
        },
        {
            "id": "q16",
            "type": "single",
            "prompt": "Which EC2 purchasing option provides the LOWEST hourly cost for a 3-year workload with consistent 24/7 capacity requirements?",
            "options": [
                "On-Demand Instances",
                "1-Year Reserved Instances with Partial Upfront payment",
                "3-Year Reserved Instances with All Upfront payment",
                "Spot Instances with diversified instance types"
            ],
            "correctOptionIndex": 2,
            "explanation": "3-Year Reserved Instances with All Upfront payment provide approximately 60-70% discount compared to On-Demand. Longer commitment and full upfront payment maximize savings. Spot instances aren't suitable for guaranteed 24/7 critical workloads."
        },
        {
            "id": "q17",
            "type": "multiple",
            "prompt": "An EC2 instance needs to securely access AWS services (S3, DynamoDB, CloudWatch). Which approaches are best practices? (Choose two.)",
            "options": [
                "Create EC2 Instance Role with IAM policy and attach instance profile",
                "Embed AWS Access Keys in EC2 User Data or environment variables",
                "Use IAM user credentials stored in AWS Secrets Manager on the instance",
                "Configure credentials through EC2 metadata service via instance role"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "Instance roles with IAM policies are the best practice—credentials are automatically managed and rotated by AWS. Metadata service provides automatic credential delivery. Embedding keys in User Data or storing in Secrets Manager are less secure and add operational overhead."
        },
        {
            "id": "q18",
            "type": "single",
            "prompt": "You attempt to launch an EC2 instance and receive 'InsufficientInstanceCapacity' error. Which action would most likely resolve this issue?",
            "options": [
                "Change the instance type to a larger size",
                "Retry the launch after waiting a few minutes",
                "Reduce the number of EBS volumes attached",
                "All of the above are valid approaches"
            ],
            "correctOptionIndex": 3,
            "explanation": "InsufficientInstanceCapacity can be resolved by: retrying later (temporary capacity shortage), using a different instance type (may have available capacity), or changing regions/AZs. All three are valid troubleshooting approaches."
        },
        {
            "id": "q19",
            "type": "multiple",
            "prompt": "A company is designing a disaster recovery solution for EC2-based applications. Which EBS backup strategies are appropriate? (Choose two.)",
            "options": [
                "Create an initial full EBS snapshot and then incremental snapshots for changes",
                "Copy snapshots to another region for cross-region disaster recovery",
                "Create a new full snapshot every hour to ensure point-in-time recovery",
                "Use AWS Backup service with scheduled automated snapshots"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Incremental snapshots are cost-effective and provide point-in-time recovery. Cross-region snapshot copies enable disaster recovery. Hourly full snapshots are inefficient and expensive. AWS Backup is good but the question asks about specific EBS snapshot practices."
        },
        {
            "id": "q20",
            "type": "single",
            "prompt": "Which EBS volume configuration is required for a database that demands consistent high IOPS, multi-attach capability, and cluster failover support?",
            "options": [
                "gp3 volume with multi-attach enabled across multiple AZs",
                "io1 volume with multi-attach enabled in the same AZ",
                "io2 volume with multi-attach enabled in the same AZ",
                "st1 volume with single attachment for maximum throughput"
            ],
            "correctOptionIndex": 2,
            "explanation": "io2 volumes support up to 64,000 IOPS and multi-attach to 16 instances in the same AZ. io1 is legacy (being replaced by io2). gp3 doesn't support multi-attach. st1 isn't suitable for IOPS-intensive workloads. Same AZ requirement is critical for multi-attach."
        },
        {
            "id": "q21",
            "type": "multiple",
            "prompt": "For an EC2 cluster deployment with strict performance and availability requirements, which configurations should be implemented? (Choose two.)",
            "options": [
                "Use Cluster Placement Group for ultra-low latency (10 Gbps) within the same AZ",
                "Use Partition Placement Group for distributed workloads with replication",
                "Use io2 EBS volumes with multi-attach for shared database storage",
                "Use Spread Placement Group to minimize correlated failures"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Cluster Placement Groups provide ultra-low latency necessary for HPC and database clusters. io2 multi-attach enables shared database storage. Partition Placement Group is for distributed systems like Kafka/HDFS. Spread Placement Group sacrifices latency for availability."
        },
        {
            "id": "q22",
            "type": "single",
            "prompt": "A developer has a long-running initialization process on an EC2 instance that takes 2 hours to complete. To save costs, they want to pause this instance and resume later without losing the initialization state. Which feature should they use?",
            "options": [
                "EBS snapshots to backup state periodically",
                "EC2 hibernation to preserve RAM state on EBS",
                "Auto Scaling scheduled actions to stop and start instances",
                "CloudWatch alarms to trigger instance suspension"
            ],
            "correctOptionIndex": 1,
            "explanation": "EC2 Hibernation persists RAM contents to the EBS root volume, allowing instances to resume from the exact state. EBS snapshots don't preserve application state. Auto Scaling and CloudWatch can trigger stops but don't preserve state. Hibernation is purpose-built for this use case."
        },
        {
            "id": "q23",
            "type": "multiple",
            "prompt": "When comparing storage options for different EC2 workloads, which statements are accurate? (Choose two.)",
            "options": [
                "EBS volumes provide persistent block storage with snapshot capability across AZs",
                "Instance Store provides better durability guarantees than EBS volumes",
                "Amazon EFS provides shared NFS access across multiple AZs simultaneously",
                "Instance Store data is lost only on instance termination, not on reboot"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "EBS snapshots enable cross-region/AZ replication. EFS provides multi-AZ NFS access. Instance Store durability is lower than EBS (lost on stop/terminate). Instance Store data persists on reboot but not on stop/terminate."
        },
        {
            "id": "q24",
            "type": "single",
            "prompt": "An EC2 instance needs to communicate securely with resources in another VPC. Network ACLs are set to allow traffic, but the connection still fails. What is the most likely cause?",
            "options": [
                "The security group on the destination instance doesn't allow the traffic",
                "The Network ACL on the source instance blocks outbound traffic",
                "The instance doesn't have a route to the destination VPC",
                "The destination instance has hibernation enabled"
            ],
            "correctOptionIndex": 0,
            "explanation": "Security groups are the primary filtering mechanism for instance-to-instance communication. Network ACLs are permissive in this scenario. Without a route, the connection wouldn't attempt at all. Hibernation doesn't affect connectivity. Security group rules on the destination are the likely culprit."
        },
        {
            "id": "q25",
            "type": "multiple",
            "prompt": "A company has allocated 10 Elastic IPs but only 5 are associated with running instances. Which billing and optimization strategies are correct? (Choose two.)",
            "options": [
                "You are charged for the 5 unassociated Elastic IPs",
                "Release unused Elastic IPs to avoid charges",
                "Associated Elastic IPs are always charged regardless of instance state",
                "Elastic IPs associated with stopped instances incur charges"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "Unassociated Elastic IPs are charged (significant hourly rate). Elastic IPs associated with stopped instances are also charged. Best practice: release unused EIPs and reassociate before stopping instances. Only EIPs associated with running instances are free."
        },
        {
            "id": "q26",
            "type": "single",
            "prompt": "You need to attach a network interface from a failed EC2 instance to a healthy instance for failover. Which requirement must be met?",
            "options": [
                "Both instances must be in the same region",
                "Both instances must be in the same Availability Zone",
                "Both instances must be in the same VPC and subnet",
                "Both instances must have the same security group"
            ],
            "correctOptionIndex": 2,
            "explanation": "ENIs can only be attached to instances in the same VPC and subnet. Since subnets map to AZs, same-subnet implies same-AZ. Region is broader; security group doesn't need to match. The VPC and subnet requirement is fundamental for ENI attachment."
        },
        {
            "id": "q27",
            "type": "multiple",
            "prompt": "A security audit reveals that EC2 instances need enhanced monitoring for compliance. Which monitoring and logging solutions should be implemented? (Choose two.)",
            "options": [
                "CloudWatch Detailed Monitoring for enhanced metrics at 1-minute intervals",
                "VPC Flow Logs to capture network traffic information",
                "EC2 Instance Connect for direct terminal access logging",
                "AWS Systems Manager Session Manager for audit trail logging"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "CloudWatch Detailed Monitoring provides granular metrics. VPC Flow Logs capture network-level data for compliance. Instance Connect and Session Manager are access tools but not primary monitoring solutions. For compliance auditing, monitoring and logging are essential."
        },
        {
            "id": "q28",
            "type": "single",
            "prompt": "You have a security group rule that explicitly denies TCP port 443 from 10.0.0.0/8, but another rule allows TCP port 443 from 0.0.0.0/0. What happens to traffic from 10.0.0.1 on port 443?",
            "options": [
                "Traffic is denied (deny rules take precedence)",
                "Traffic is allowed (allow rules take precedence)",
                "Traffic is blocked (deny rules are evaluated first)",
                "Traffic is allowed (deny rules don't exist in security groups)"
            ],
            "correctOptionIndex": 3,
            "explanation": "Security groups don't support explicit deny rules—they are whitelist-based (allow-only). All traffic is implicitly denied unless explicitly allowed. The mentioned 'deny' rule would not function. For explicit deny, use Network ACLs. Traffic would be allowed by the 0.0.0.0/0 rule."
        },
        {
            "id": "q29",
            "type": "multiple",
            "prompt": "When designing a resilient EC2 deployment across multiple Availability Zones, which strategies should be employed? (Choose two.)",
            "options": [
                "Use Auto Scaling Groups spanning multiple AZs with a desired capacity of 3+",
                "Use Cluster Placement Groups to ensure instances stay in the same AZ",
                "Use Network Load Balancer with health checks to distribute traffic",
                "Use Spread Placement Group with maximum of 7 instances per AZ"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Auto Scaling Groups across multiple AZs provide automatic failover and instance replacement. NLB with health checks distributes traffic and detects failures. Cluster Placement Groups constrain to single AZ (reduces availability). Spread Placement Group limits scale."
        },
        {
            "id": "q30",
            "type": "single",
            "prompt": "A newly created AWS account launches its first EC2 instance. In which network environment will it be placed by default?",
            "options": [
                "EC2-Classic (legacy shared environment)",
                "Default VPC (Virtual Private Cloud)",
                "Custom VPC (must be created first)",
                "No network (standalone instance)"
            ],
            "correctOptionIndex": 1,
            "explanation": "All new AWS accounts default to VPC (Virtual Private Cloud) with a default VPC pre-created. EC2-Classic is legacy and no longer available for new accounts. A custom VPC is optional. Every instance requires a VPC and subnet."
        },
        {
            "id": "q31",
            "type": "multiple",
            "prompt": "A company requires EC2 instances for variable workloads with burstable performance and cost optimization. Which instance type characteristics should be selected? (Choose two.)",
            "options": [
                "T3/T3a instances with accumulating CPU credits during idle periods",
                "Use 'Unlimited' mode to allow sustained high performance beyond baseline",
                "M5 instances for consistent general-purpose performance",
                "Monitor CPU credit balance to understand burst capacity availability"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "T3/T3a are burstable instances accumulating credits during idle periods for future burst usage. Monitoring credit balance is essential for capacity planning. Unlimited mode allows better performance but at higher cost. M5 is consistent, not burstable—doesn't match variable workload requirement."
        },
        {
            "id": "q32",
            "type": "single",
            "prompt": "Which EFS performance mode should be selected for a highly parallelized big data workload requiring high levels of aggregate throughput with acceptable latency trade-offs?",
            "options": [
                "General Purpose mode (default, lowest latency)",
                "Max IO mode (higher aggregate throughput)",
                "Provisioned Throughput mode (fixed performance)",
                "Bursting Throughput mode (variable performance)"
            ],
            "correctOptionIndex": 1,
            "explanation": "Max IO performance mode is optimized for highly parallelized workloads requiring high aggregate throughput, accepting slightly higher latencies. General Purpose is for most workloads with lower latency. Throughput modes (Provisioned/Bursting) are separate from performance modes."
        },
        {
            "id": "q33",
            "type": "multiple",
            "prompt": "A production application requires highly available EC2 instances with automatic recovery from failures. Which AWS services and configurations should be implemented? (Choose two.)",
            "options": [
                "EC2 Auto Recovery to restart failed instances automatically",
                "CloudWatch alarms triggering EC2 Instance Recovery actions",
                "Auto Scaling Groups with minimum 1 instance for automatic replacement",
                "EBS Snapshots for automatic recovery on instance failure"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "EC2 Instance Recovery restarts failed instances on the same hardware. CloudWatch alarms can trigger recovery actions. Auto Scaling with minimum 1 replaces instances in different hardware (better for AZ failures). EBS snapshots enable manual recovery, not automatic."
        },
        {
            "id": "q34",
            "type": "single",
            "prompt": "You need to create a custom Linux AMI for organization-wide deployments. Which approach ensures the AMI remains up-to-date and follows security best practices?",
            "options": [
                "Manually configure an instance, create an AMI once, and use it for all deployments",
                "Use EC2 Image Builder to automate AMI creation with automated testing and patching",
                "Create an AMI with hardcoded IAM credentials for convenience",
                "Use the most recent Amazon Linux AMI without customization"
            ],
            "correctOptionIndex": 1,
            "explanation": "EC2 Image Builder automates AMI creation with version control, testing, and compliance scanning. Manual creation is error-prone and outdated quickly. Hardcoding credentials is a security risk. Unmodified AMIs don't meet custom requirements."
        },
        {
            "id": "q35",
            "type": "multiple",
            "prompt": "When managing costs for variable EC2 workloads across different instance families, which strategies reduce expenses? (Choose two.)",
            "options": [
                "Use Compute Savings Plans for flexible discounts across instance families and regions",
                "Use Convertible Reserved Instances to switch instance families within commitment",
                "Use Scheduled Actions to stop all instances during off-peak hours",
                "Use Spot Instances with Spot Fleet for automatic fallback to On-Demand"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Compute Savings Plans offer flexibility across instance types/families (~20-25% discount). Convertible RIs allow changing instance families (25-35% discount). Scheduled Actions waste capacity. Spot Fleet provides cost savings with availability fallback."
        },
        {
            "id": "q36",
            "type": "single",
            "prompt": "An EC2 instance requires multiple network interfaces with different MAC addresses for licensing compliance. How many network interfaces can a typical m5.large instance support?",
            "options": [
                "1 (primary only)",
                "4 (primary plus 3 secondary)",
                "8 (primary plus 7 secondary)",
                "12 (primary plus 11 secondary)"
            ],
            "correctOptionIndex": 3,
            "explanation": "m5.large instances support 12 Elastic Network Interfaces total. Each ENI has a unique MAC address, meeting licensing compliance requirements. ENI count varies by instance type; larger instances support more ENIs."
        },
        {
            "id": "q37",
            "type": "multiple",
            "prompt": "A disaster recovery plan requires RTO (Recovery Time Objective) of 5 minutes and RPO (Recovery Point Objective) of 1 hour. Which backup and recovery strategies meet these requirements? (Choose two.)",
            "options": [
                "Use EBS Snapshots every 1 hour with EC2 Instance Recovery for automatic restart",
                "Use AWS Backup with hourly snapshots and AMI backup for quick launch",
                "Use EC2 Hibernation with EBS snapshots captured hourly",
                "Keep warm standby instances in different AZ with synchronized data"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "Hourly EBS snapshots meet RPO of 1 hour; Instance Recovery achieves RTO of 5 minutes. Warm standby instances with data replication provide fastest recovery (RTO minutes, RPO seconds). AWS Backup and Hibernation don't meet the tight RTO/RPO requirements."
        },
        {
            "id": "q38",
            "type": "single",
            "prompt": "You need to migrate an EC2 instance from us-east-1 to eu-west-1 region while preserving configurations, data, and security settings. What is the recommended approach?",
            "options": [
                "Manually recreate the instance in the new region using documentation",
                "Use AWS Database Migration Service (DMS) for instance migration",
                "Create an AMI from the source instance and copy it to the target region",
                "Use AWS Snowball to transfer instance data to the new region"
            ],
            "correctOptionIndex": 2,
            "explanation": "Creating an AMI and copying it to the target region preserves all configurations, block device mappings, and settings. DMS is for databases. Manual recreation is error-prone. Snowball is for large-scale data transfer, not instance migration."
        },
        {
            "id": "q39",
            "type": "multiple",
            "prompt": "A financial institution requires audit trails for all EC2 access and modifications. Which logging and monitoring solutions should be enabled? (Choose two.)",
            "options": [
                "AWS CloudTrail to log all EC2 API calls and modifications",
                "VPC Flow Logs to capture network traffic for each instance",
                "CloudWatch Logs for application-level logging within instances",
                "SSH session recording to capture terminal commands"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "CloudTrail logs all API actions (start, stop, terminate, modify). VPC Flow Logs capture network-level data. CloudWatch Logs are for application data. SSH session recording isn't built-in (requires additional tools like Session Manager)."
        },
        {
            "id": "q40",
            "type": "single",
            "prompt": "You need to allocate 1000 IOPS for an EBS volume. Which volume type provides this IOPS at the lowest cost?",
            "options": [
                "io2 volume (64,000 IOPS maximum)",
                "io1 volume (64,000 IOPS maximum)",
                "gp3 volume (16,000 IOPS maximum)",
                "st1 volume (500 IOPS maximum)"
            ],
            "correctOptionIndex": 2,
            "explanation": "gp3 provides up to 16,000 IOPS at lower cost than io1/io2. Since 1000 IOPS < 16,000, gp3 is both capable and cost-effective. io1/io2 are more expensive for lower IOPS requirements. st1 doesn't provide sufficient IOPS."
        }
    ]
};
