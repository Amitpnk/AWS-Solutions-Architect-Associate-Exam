import type { ExamDefinition } from './types';

export const examStorage: ExamDefinition = {
    "id": "exam_storage_saa_c03",
    "title": "SAA-C03 Practice Set on Storage",
    "description": "Comprehensive storage exam covering AWS Backup, Amazon EBS, Amazon EFS, Amazon FSx, Amazon S3, Amazon S3 Glacier, and AWS Storage Gateway",
    "durationSeconds": 4800,
    "questions": [
        {
            "id": "q1",
            "type": "single",
            "prompt": "A company stores log files in Amazon S3. Logs are frequently accessed for the first 30 days, rarely accessed for the next 90 days, and must be retained for 7 years for compliance. Which S3 lifecycle configuration is MOST cost-effective?",
            "options": [
                "S3 Standard for 30 days → S3 Standard-IA for 90 days → S3 Glacier Flexible Retrieval for the remainder",
                "S3 Intelligent-Tiering for the entire lifecycle",
                "S3 Standard-IA from day 1 → S3 Glacier Deep Archive after 120 days",
                "S3 Standard for 30 days → S3 Glacier Flexible Retrieval immediately after"
            ],
            "correctOptionIndex": 0,
            "explanation": "This matches the access pattern: Standard for frequent access (30 days), Standard-IA for infrequent access (30–120 days), then Glacier Flexible Retrieval for the remaining years at minimum cost. Intelligent-Tiering adds monitoring fees and is better for unpredictable patterns, not a well-defined pattern like this."
        },
        {
            "id": "q2",
            "type": "single",
            "prompt": "A database application requires maximum IOPS with consistent sub-millisecond latency and must share a single volume between multiple EC2 instances in the same AZ. Which EBS volume type should be used?",
            "options": [
                "gp3",
                "st1 (Throughput Optimized HDD)",
                "io2 with Multi-Attach enabled",
                "io1 with striping across two volumes"
            ],
            "correctOptionIndex": 2,
            "explanation": "Multi-Attach is only supported on io1 and io2 Provisioned IOPS SSD volumes. It allows a single EBS volume to be attached to up to 16 Nitro-based EC2 instances within the same AZ simultaneously. io2 provides higher durability and IOPS ceiling than io1. gp3 and st1 do not support Multi-Attach."
        },
        {
            "id": "q3",
            "type": "single",
            "prompt": "A media company needs shared file storage accessible simultaneously from hundreds of Linux EC2 instances across multiple Availability Zones, and can tolerate slightly higher latency in exchange for maximum throughput. Which EFS configuration should be used?",
            "options": [
                "General Purpose performance mode with Bursting throughput",
                "Max I/O performance mode with Elastic throughput",
                "General Purpose performance mode with Provisioned throughput",
                "Max I/O performance mode with Provisioned throughput"
            ],
            "correctOptionIndex": 1,
            "explanation": "Max I/O performance mode is designed for massively parallel workloads with thousands of EC2 instances and provides higher aggregate throughput at the cost of slightly higher per-operation latency. Elastic throughput automatically scales to workload needs, making it ideal for spiky or unpredictable access patterns from hundreds of instances."
        },
        {
            "id": "q4",
            "type": "single",
            "prompt": "A financial services company must retrieve archived compliance documents stored in S3 Glacier Flexible Retrieval within 5 minutes for an urgent audit. Which retrieval option should be used?",
            "options": [
                "Bulk retrieval (5–12 hours)",
                "Standard retrieval (3–5 hours)",
                "Expedited retrieval (1–5 minutes)",
                "Instant retrieval (milliseconds) — requires S3 Glacier Instant Retrieval storage class"
            ],
            "correctOptionIndex": 2,
            "explanation": "Expedited retrieval in S3 Glacier Flexible Retrieval provides access to archives within 1–5 minutes. It is the fastest option for Glacier Flexible Retrieval but costs more per GB retrieved. Bulk is cheapest but takes 5–12 hours; Standard takes 3–5 hours. Instant retrieval millisecond access requires using the S3 Glacier Instant Retrieval storage class, not Flexible Retrieval."
        },
        {
            "id": "q5",
            "type": "single",
            "prompt": "A company wants to migrate tape-based backups to AWS while maintaining compatibility with existing backup software that uses the iSCSI virtual tape library (VTL) protocol. Which AWS Storage Gateway type should be used?",
            "options": [
                "File Gateway",
                "Volume Gateway in Cached mode",
                "Volume Gateway in Stored mode",
                "Tape Gateway"
            ],
            "correctOptionIndex": 3,
            "explanation": "Tape Gateway presents a virtual tape library (VTL) interface over iSCSI to on-premises backup applications. It is compatible with major backup software such as Veeam, Commvault, and NetBackup. Virtual tapes are stored in S3 and can be archived to S3 Glacier, replicating the physical tape workflow at lower cost."
        },
        {
            "id": "q6",
            "type": "single",
            "prompt": "A company wants to centrally manage and automate backups across EC2, RDS, DynamoDB, EFS, and EBS resources with cross-account and cross-region backup capabilities. Which AWS service provides this functionality natively?",
            "options": [
                "Amazon Data Lifecycle Manager (DLM)",
                "AWS Backup",
                "AWS Systems Manager",
                "AWS CloudFormation with custom backup scripts"
            ],
            "correctOptionIndex": 1,
            "explanation": "AWS Backup is a fully managed, centralized backup service that supports EC2, EBS, RDS, Aurora, DynamoDB, EFS, FSx, Storage Gateway, and more. It provides policy-based backup plans, cross-account and cross-region copy rules, backup vault lock, and AWS Backup Audit Manager for compliance reporting. DLM only manages EBS snapshots and AMIs."
        },
        {
            "id": "q7",
            "type": "multiple",
            "prompt": "A company needs to enable S3 Cross-Region Replication (CRR) to copy objects from a source bucket to a destination bucket in another region. Which requirements MUST be met? (Choose two.)",
            "options": [
                "Versioning must be enabled on both the source and destination buckets",
                "The source and destination buckets must belong to different AWS accounts",
                "The destination bucket must be in a different AWS region from the source",
                "S3 Transfer Acceleration must be enabled on the source bucket"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "S3 CRR requires: (1) versioning enabled on both source and destination buckets, and (2) the buckets must be in different AWS regions — this is what defines it as cross-region replication. The buckets can be in the same or different accounts. S3 Transfer Acceleration is a separate feature for faster uploads and is not a CRR requirement."
        },
        {
            "id": "q8",
            "type": "single",
            "prompt": "A company running Windows-based enterprise applications needs shared file storage that integrates with Active Directory for user authentication and supports the SMB protocol. Which Amazon FSx option should be selected?",
            "options": [
                "Amazon FSx for Lustre",
                "Amazon FSx for Windows File Server",
                "Amazon FSx for NetApp ONTAP",
                "Amazon EFS"
            ],
            "correctOptionIndex": 1,
            "explanation": "Amazon FSx for Windows File Server is a fully managed Windows-native file system built on Windows Server that supports SMB, NTFS, Active Directory integration, DFS namespaces, and Windows ACLs. It is purpose-built for Windows workloads. EFS uses NFS and supports only Linux. FSx for Lustre is for HPC workloads. FSx for NetApp ONTAP supports multi-protocol but is more appropriate for migrations from on-premises NetApp storage."
        },
        {
            "id": "q9",
            "type": "multiple",
            "prompt": "A company wants to understand EBS snapshot behavior to optimize their DR strategy. Which of the following statements about EBS snapshots are CORRECT? (Choose two.)",
            "options": [
                "EBS snapshots are incremental — only blocks changed since the last snapshot are stored",
                "EBS snapshots are stored in the same Availability Zone as the source volume",
                "EBS snapshots are stored in Amazon S3 and are regional resources",
                "Restoring an EBS volume from a snapshot makes all data immediately available at full performance"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "EBS snapshots are incremental backups — only changed blocks since the previous snapshot are saved, which reduces storage costs and snapshot time. Snapshots are stored as regional resources in Amazon S3 (managed by AWS, not visible in your S3 buckets) and are not AZ-specific, making them suitable for cross-AZ recovery. Restored volumes lazily load data in the background — data is available immediately but performance may be reduced until all blocks are downloaded (can be resolved by pre-warming)."
        },
        {
            "id": "q10",
            "type": "single",
            "prompt": "A regulatory requirement mandates that financial records stored in S3 cannot be modified or deleted for 7 years, even by users with full S3 administrative privileges. Which S3 feature ensures this level of protection?",
            "options": [
                "S3 Versioning with MFA Delete enabled",
                "S3 Object Lock in Compliance mode with a 7-year retention period",
                "S3 Bucket Policy with explicit Deny on DeleteObject",
                "S3 Object Lock in Governance mode with a 7-year retention period"
            ],
            "correctOptionIndex": 1,
            "explanation": "S3 Object Lock in Compliance mode prevents ANY user, including the AWS account root user, from deleting or modifying objects until the retention period expires. Governance mode allows users with special IAM permissions to override the lock. A bucket policy Deny can be reversed by an admin. MFA Delete adds protection but does not provide the same immutability guarantees as Object Lock Compliance mode."
        },
        {
            "id": "q11",
            "type": "single",
            "prompt": "A company has on-premises Linux and Windows servers that need to access Amazon S3 storage using standard NFS and SMB file protocols without modifying their existing applications. Which AWS Storage Gateway type should be used?",
            "options": [
                "Volume Gateway in Cached mode",
                "Tape Gateway",
                "File Gateway",
                "Volume Gateway in Stored mode"
            ],
            "correctOptionIndex": 2,
            "explanation": "File Gateway presents NFS (v3 and v4.1) and SMB interfaces that allow on-premises applications to access S3 as a standard file system. Files are stored as objects in S3 and frequently accessed data is cached locally on the gateway. It requires no application changes and transparently stores data in S3."
        },
        {
            "id": "q12",
            "type": "single",
            "prompt": "A company uses Amazon EFS for application data. Files older than 30 days are rarely accessed. How can the company reduce EFS storage costs while maintaining access to all files?",
            "options": [
                "Enable S3 Intelligent-Tiering and mount the bucket via File Gateway",
                "Configure EFS Lifecycle Management to transition infrequently accessed files to EFS Standard-IA",
                "Create a Lambda function to move old files to S3 Glacier after 30 days",
                "Enable EFS Provisioned Throughput to optimize cost per IOPS"
            ],
            "correctOptionIndex": 1,
            "explanation": "EFS Lifecycle Management automatically moves files to the EFS Standard-IA (Infrequent Access) storage class based on the last access time. Standard-IA costs significantly less than EFS Standard per GB stored. Files in IA are transparently accessible through the same mount point — no application changes are needed. The other options either don't apply to EFS or add unnecessary complexity."
        },
        {
            "id": "q13",
            "type": "single",
            "prompt": "A company uploads large video files to Amazon S3 from offices around the world. Users in Asia and Europe experience slow upload speeds to an S3 bucket in us-east-1. What is the MOST effective solution?",
            "options": [
                "Enable S3 Cross-Region Replication to bring buckets closer to users",
                "Use S3 Multipart Upload with parallel threads",
                "Enable S3 Transfer Acceleration using CloudFront edge locations",
                "Create S3 buckets in each region and manually sync them"
            ],
            "correctOptionIndex": 2,
            "explanation": "S3 Transfer Acceleration routes upload traffic through the nearest AWS CloudFront edge location and then over the optimized AWS global network backbone to the S3 bucket. This significantly reduces upload time for large files from geographically distant locations. Multipart upload improves upload reliability and speed but doesn't address network latency from distant regions. CRR helps with reads, not upload performance."
        },
        {
            "id": "q14",
            "type": "single",
            "prompt": "A genomics research company needs high-performance, parallel file storage for a compute cluster that processes large datasets currently stored in S3. The job runs for several hours and requires sub-millisecond latency. Which service is MOST appropriate?",
            "options": [
                "Amazon EFS with Max I/O performance mode",
                "Amazon FSx for Lustre linked to the S3 bucket",
                "Amazon FSx for Windows File Server",
                "Amazon EBS gp3 volumes attached to each compute node"
            ],
            "correctOptionIndex": 1,
            "explanation": "Amazon FSx for Lustre is a high-performance parallel file system designed for HPC, ML, and genomics workloads. It can be directly linked to an S3 bucket, automatically importing data for processing and exporting results back to S3. It provides sub-millisecond latency and hundreds of GB/s of throughput. EFS Max I/O has higher latency; EBS cannot be shared across multiple instances at high performance; FSx for Windows uses SMB and is not suited for Linux HPC."
        },
        {
            "id": "q15",
            "type": "single",
            "prompt": "A company wants to allow temporary, time-limited access to private S3 objects for external business partners without creating IAM users or making the bucket public. Which approach should be used?",
            "options": [
                "Temporarily change the object's ACL to public-read",
                "Create temporary IAM users with limited S3 permissions",
                "Generate pre-signed URLs with an expiration time",
                "Enable S3 static website hosting and share the object URL"
            ],
            "correctOptionIndex": 2,
            "explanation": "Pre-signed URLs grant time-limited access to a specific S3 object using the permissions of the IAM principal that generated the URL. They expire after a configurable duration and require no changes to bucket or object permissions. The URL can be shared with anyone (even unauthenticated users) and access automatically revokes at expiry. This is the standard mechanism for sharing private S3 objects securely without creating additional IAM identities."
        },
        {
            "id": "q16",
            "type": "multiple",
            "prompt": "A solutions architect is selecting EBS volume types for different workloads. Which of the following pairings are CORRECT? (Choose two.)",
            "options": [
                "gp3 provides up to 16,000 IOPS independent of volume size, at a lower baseline cost than gp2",
                "st1 (Throughput Optimized HDD) is ideal for transactional databases requiring low latency random I/O",
                "io2 Block Express provides up to 256,000 IOPS and 4,000 MB/s throughput per volume",
                "sc1 (Cold HDD) is recommended for boot volumes and frequently accessed workloads"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "gp3 decouples IOPS from storage capacity — you can provision up to 16,000 IOPS regardless of size and it is approximately 20% cheaper per GB than gp2. io2 Block Express supports up to 256,000 IOPS and 4,000 MB/s of throughput, the highest of any EBS volume type. st1 is optimized for sequential, throughput-intensive workloads (log processing, data warehouses) — NOT low-latency random I/O. sc1 is the lowest-cost option for cold data that is infrequently accessed and cannot be used as a boot volume."
        },
        {
            "id": "q17",
            "type": "multiple",
            "prompt": "A company is evaluating AWS Backup to meet compliance requirements. Which of the following capabilities does AWS Backup natively provide? (Choose two.)",
            "options": [
                "Centralized backup management across multiple AWS services and AWS accounts using Organizations",
                "Real-time synchronous database replication to a secondary region",
                "Policy-based backup scheduling with automated retention management",
                "Automatic application performance tuning during backup windows"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "AWS Backup provides centralized backup management across supported AWS services and can be used with AWS Organizations to manage backups across multiple accounts from a single pane of glass. It supports backup plans with scheduled backup rules and configurable retention periods. AWS Backup does not provide real-time replication (that is handled by services like RDS Multi-AZ or S3 CRR) or application performance tuning."
        },
        {
            "id": "q18",
            "type": "single",
            "prompt": "A company uploads 10 GB video files from on-premises servers to Amazon S3. Uploads sometimes fail due to network interruptions and must be resumable. Which S3 feature directly addresses this requirement?",
            "options": [
                "S3 Transfer Acceleration",
                "S3 Multipart Upload",
                "S3 Cross-Region Replication",
                "S3 Intelligent-Tiering"
            ],
            "correctOptionIndex": 1,
            "explanation": "S3 Multipart Upload splits large objects into parts that are uploaded independently and in parallel. If any part fails, only that part needs to be retransmitted — the upload can be resumed. AWS recommends using Multipart Upload for files larger than 100 MB and requires it for files over 5 GB. Transfer Acceleration optimizes speed over long distances but does not provide resumability on its own."
        },
        {
            "id": "q19",
            "type": "single",
            "prompt": "A company has an on-premises application that uses iSCSI block storage. They want to keep frequently accessed data on-premises for low latency while seamlessly extending storage capacity to AWS S3. Which AWS Storage Gateway configuration should be used?",
            "options": [
                "File Gateway",
                "Tape Gateway",
                "Volume Gateway in Stored mode",
                "Volume Gateway in Cached mode"
            ],
            "correctOptionIndex": 3,
            "explanation": "Volume Gateway in Cached mode stores the primary data in Amazon S3 while retaining a local cache of frequently accessed data on the gateway for low-latency access. This minimizes on-premises storage requirements while providing low-latency access to active data. Stored mode keeps the entire dataset on-premises and only asynchronously backs up to S3 — it doesn't extend capacity to AWS as primary storage."
        },
        {
            "id": "q20",
            "type": "single",
            "prompt": "A developer accidentally deleted an important object from a versioned S3 bucket. The object was not permanently deleted. How can the object be recovered?",
            "options": [
                "The object is permanently deleted and cannot be recovered without a backup",
                "Delete the delete marker to restore the most recent version of the object",
                "Restore the object from the S3 Recycle Bin within 30 days",
                "Contact AWS Support — only they can recover deleted versioned objects"
            ],
            "correctOptionIndex": 1,
            "explanation": "When versioning is enabled, deleting an object without specifying a version ID creates a delete marker, which makes the object appear deleted. The previous versions still exist. To recover the object, delete the delete marker — this makes the most recent non-deleted version the current version. S3 Recycle Bin is a separate optional feature. AWS Support cannot recover objects from versioned buckets if the versions themselves were deleted."
        },
        {
            "id": "q21",
            "type": "multiple",
            "prompt": "A solutions architect is comparing Amazon EFS and Amazon EBS. Which of the following are characteristics of Amazon EFS? (Choose two.)",
            "options": [
                "Can be mounted simultaneously on multiple EC2 instances across multiple Availability Zones",
                "Provides block-level storage optimized for relational databases",
                "Automatically scales capacity up and down as files are added or removed",
                "Only supports Windows-based EC2 instances via SMB"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Amazon EFS is a fully managed NFS file system that supports concurrent access from thousands of EC2 instances across multiple AZs within a region. EFS automatically grows and shrinks as files are written and deleted — there is no need to provision or manage capacity. EBS is a block storage device attached to a single EC2 instance (except io1/io2 Multi-Attach within the same AZ). EFS supports Linux via NFS; SMB is supported by FSx for Windows."
        },
        {
            "id": "q22",
            "type": "single",
            "prompt": "A company must ensure that archived compliance records in S3 Glacier Flexible Retrieval cannot be deleted for 10 years, even by vault administrators or the AWS account root user. Which feature enforces this requirement?",
            "options": [
                "S3 Glacier vault access policies",
                "S3 Glacier Vault Lock with a Compliance Vault Lock policy",
                "S3 Object Lock in Governance mode applied to Glacier objects",
                "AWS Backup retention settings with immutable vaults"
            ],
            "correctOptionIndex": 1,
            "explanation": "S3 Glacier Vault Lock allows you to deploy and enforce compliance controls such as WORM (Write Once, Read Many) using a vault lock policy. Once a Vault Lock policy is locked, it cannot be changed or deleted by anyone, including the root account. This provides time-based retention enforcement independent of IAM permissions, making it suitable for strict regulatory compliance."
        },
        {
            "id": "q23",
            "type": "single",
            "prompt": "A company wants to automatically trigger image processing using AWS Lambda whenever new images are uploaded to a specific S3 prefix. Which S3 feature enables this?",
            "options": [
                "S3 Lifecycle Policies",
                "S3 Replication Rules",
                "S3 Event Notifications",
                "S3 Object Inventory"
            ],
            "correctOptionIndex": 2,
            "explanation": "S3 Event Notifications can publish events (such as s3:ObjectCreated:*) to Lambda, SNS, SQS, or EventBridge when objects are created, deleted, or transitioned. You can filter by object key prefix and suffix, so only uploads to a specific prefix trigger the Lambda function. Lifecycle Policies manage storage class transitions and expiration; they do not invoke Lambda. Replication Rules copy objects to another bucket."
        },
        {
            "id": "q24",
            "type": "single",
            "prompt": "A company is migrating on-premises NetApp storage to AWS and needs to maintain compatibility with existing NFS, SMB, and iSCSI protocols simultaneously with multi-protocol access and data deduplication. Which Amazon FSx option should be selected?",
            "options": [
                "Amazon EFS",
                "Amazon FSx for Windows File Server",
                "Amazon FSx for NetApp ONTAP",
                "Amazon FSx for Lustre"
            ],
            "correctOptionIndex": 2,
            "explanation": "Amazon FSx for NetApp ONTAP is a fully managed shared storage service built on NetApp's ONTAP file system. It supports NFS, SMB, and iSCSI simultaneously (multi-protocol access) and provides ONTAP features like data deduplication, compression, thin provisioning, and SnapMirror replication — ideal for migrating on-premises NetApp workloads with no re-architecture."
        },
        {
            "id": "q25",
            "type": "multiple",
            "prompt": "A company wants to understand S3 storage class characteristics to optimize costs. Which of the following statements are CORRECT? (Choose two.)",
            "options": [
                "S3 Standard-IA charges a per-GB retrieval fee in addition to the lower storage cost",
                "S3 One Zone-IA stores data redundantly across multiple Availability Zones for higher durability",
                "S3 Intelligent-Tiering automatically moves objects between tiers based on access patterns with no retrieval fees",
                "S3 Glacier Deep Archive has a minimum storage duration of 30 days"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "S3 Standard-IA has a lower storage cost than Standard but charges a per-GB retrieval fee — making it cost-effective only for infrequently accessed data. S3 Intelligent-Tiering monitors access patterns and automatically moves objects between frequent, infrequent, archive, and deep archive tiers without retrieval fees (only a small monthly monitoring fee per object applies). S3 One Zone-IA stores data in a SINGLE AZ (not multiple), providing lower durability. Glacier Deep Archive has a minimum storage duration of 180 days, not 30 (Glacier Flexible Retrieval has 90 days)."
        },
        {
            "id": "q26",
            "type": "single",
            "prompt": "A company requires all EBS volumes to be encrypted. An existing unencrypted 2 TB EBS volume contains critical production data. What is the CORRECT approach to encrypt the data with minimal application downtime?",
            "options": [
                "Enable encryption directly on the existing unencrypted EBS volume in the AWS Console",
                "Create an encrypted snapshot of the volume, create a new encrypted EBS volume from the snapshot, then swap the volumes",
                "Detach the volume, encrypt it in place using the AWS KMS API, then reattach",
                "Use AWS DataSync to copy data from the unencrypted volume to a new encrypted EFS file system"
            ],
            "correctOptionIndex": 1,
            "explanation": "You cannot encrypt an existing unencrypted EBS volume directly — encryption can only be enabled at volume creation time. The standard approach is: (1) Create a snapshot of the unencrypted volume, (2) Copy the snapshot with encryption enabled (choosing a KMS key), (3) Create a new encrypted volume from the encrypted snapshot, (4) Stop the instance, detach the old volume, attach the new encrypted volume. This minimizes downtime and ensures data integrity."
        },
        {
            "id": "q27",
            "type": "multiple",
            "prompt": "A company is evaluating Volume Gateway options. Which statements CORRECTLY describe the difference between Stored mode and Cached mode? (Choose two.)",
            "options": [
                "In Stored mode, the entire dataset is stored on-premises with asynchronous backup snapshots to Amazon S3",
                "In Cached mode, primary data resides on-premises with only a subset cached in Amazon S3",
                "Cached mode requires less on-premises storage capacity than Stored mode because primary data lives in S3",
                "Stored mode requires more on-premises storage because the full dataset must reside locally"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Volume Gateway Stored mode keeps the complete dataset on-premises for low-latency access and asynchronously uploads point-in-time snapshots to Amazon S3 for backup and disaster recovery. Volume Gateway Cached mode stores the primary dataset in S3 and only retains frequently accessed data in a local cache — significantly reducing the on-premises storage footprint while providing low-latency access to hot data. Options B and D are incorrect or conflate the two modes."
        },
        {
            "id": "q28",
            "type": "single",
            "prompt": "A data analytics company stores large CSV files in S3 and wants to retrieve only specific columns and rows for analysis without downloading entire files, reducing both cost and processing time. Which S3 feature enables this?",
            "options": [
                "S3 Inventory",
                "S3 Storage Lens",
                "S3 Select",
                "S3 Batch Operations"
            ],
            "correctOptionIndex": 2,
            "explanation": "S3 Select allows applications to retrieve a subset of data from an S3 object using simple SQL expressions. Instead of retrieving the entire object, S3 performs the filtering server-side before returning results — reducing data transferred and improving performance. It supports CSV, JSON, and Parquet formats. S3 Inventory generates reports about S3 objects; Storage Lens provides usage analytics; Batch Operations performs bulk actions across many objects."
        },
        {
            "id": "q29",
            "type": "single",
            "prompt": "An application running on fewer than 20 Linux EC2 instances uses Amazon EFS for shared storage and requires the lowest possible per-operation latency. Which EFS performance mode should be selected?",
            "options": [
                "Max I/O performance mode",
                "General Purpose performance mode",
                "Provisioned Throughput mode",
                "Elastic Throughput mode"
            ],
            "correctOptionIndex": 1,
            "explanation": "General Purpose performance mode provides the lowest per-operation latency and is the default and recommended mode for most workloads, especially latency-sensitive applications. Max I/O is designed for massively parallel workloads (thousands of clients) and has slightly higher latency. Provisioned and Elastic Throughput are throughput modes, not performance modes — they control how throughput scales, not latency characteristics."
        },
        {
            "id": "q30",
            "type": "single",
            "prompt": "A company needs to grant a specific external AWS account read-only access to objects in their S3 bucket. What is the RECOMMENDED approach?",
            "options": [
                "Enable S3 ACLs and grant READ permission to the external account's canonical ID on each object",
                "Use a bucket policy to grant cross-account s3:GetObject permission to the external account",
                "Create an IAM role in the local account and share the access keys with the external team",
                "Enable S3 public access and filter by IP address in the bucket policy"
            ],
            "correctOptionIndex": 1,
            "explanation": "The recommended approach for cross-account S3 access is a bucket policy that grants the specific external account's principal (account ID or IAM role ARN) the necessary permissions such as s3:GetObject. This is more scalable, auditable, and maintainable than object-level ACLs. AWS recommends disabling ACLs for most modern use cases. Sharing access keys is insecure. Making the bucket public is overly permissive."
        },
        {
            "id": "q31",
            "type": "single",
            "prompt": "A company must replicate backup data to a secondary region to meet a regulatory disaster recovery requirement. Which AWS Backup feature enables cross-region backup copies?",
            "options": [
                "Backup Vault Lock",
                "Cross-Region Copy rules within a backup plan",
                "AWS Backup Gateway",
                "AWS Backup Audit Manager"
            ],
            "correctOptionIndex": 1,
            "explanation": "AWS Backup backup plans support Cross-Region Copy rules that automatically copy recovery points to a designated destination region after backup. This provides geographic redundancy for DR requirements. Backup Vault Lock prevents deletion of recovery points. AWS Backup Gateway extends backup capabilities to on-premises VMware environments. Audit Manager generates compliance reports but does not copy backups."
        },
        {
            "id": "q32",
            "type": "single",
            "prompt": "A company needs multiple EC2 instances in the same Availability Zone to simultaneously read and write to a single shared EBS volume for a clustered database application. Which configuration supports this?",
            "options": [
                "gp3 volume with Multi-Attach enabled",
                "io1 or io2 volume with Multi-Attach enabled",
                "st1 volume with Multi-Attach enabled",
                "Create individual gp3 volumes per instance and use DRBD to synchronize"
            ],
            "correctOptionIndex": 1,
            "explanation": "EBS Multi-Attach is exclusively supported on io1 and io2 Provisioned IOPS SSD volumes. It allows attaching a single volume to up to 16 AWS Nitro-based EC2 instances within the same AZ. The application must manage concurrent write access using a cluster-aware file system (e.g., GFS2 or OCFS2). gp3, st1, and sc1 volumes do not support Multi-Attach."
        },
        {
            "id": "q33",
            "type": "multiple",
            "prompt": "A company is configuring S3 lifecycle rules to manage storage costs. Which of the following are valid S3 lifecycle actions? (Choose two.)",
            "options": [
                "Transition objects from S3 Standard to S3 Standard-IA after 30 days",
                "Automatically increase S3 bucket storage capacity based on usage",
                "Expire (permanently delete) objects after a specified number of days",
                "Automatically replicate transitioned objects to an on-premises storage system"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "S3 Lifecycle rules support two types of actions: Transition actions (move objects to a cheaper storage class based on age or date) and Expiration actions (permanently delete objects or delete non-current versions after a specified period). S3 automatically scales capacity and does not require lifecycle rules for that purpose. On-premises replication is handled by Storage Gateway or DataSync, not S3 lifecycle rules."
        },
        {
            "id": "q34",
            "type": "single",
            "prompt": "A company wants to run a machine learning training job on EC2 that reads a 10 TB training dataset stored in S3. They need sub-millisecond file system latency during training. Which solution provides the best performance-to-cost ratio?",
            "options": [
                "Mount S3 directly on EC2 instances using s3fs-fuse",
                "Copy all data from S3 to EBS io2 volumes before training",
                "Use Amazon FSx for Lustre linked to the S3 bucket",
                "Use Amazon EFS with Provisioned Throughput mode"
            ],
            "correctOptionIndex": 2,
            "explanation": "Amazon FSx for Lustre integrates natively with S3 — it automatically imports objects from the linked S3 bucket into the file system on first access, and results can be exported back to S3. It delivers sub-millisecond latencies and hundreds of GB/s throughput, purpose-built for ML and HPC workloads. s3fs-fuse has high latency. EBS io2 cannot be shared across instances. EFS has higher latency than Lustre for compute-intensive parallel workloads."
        },
        {
            "id": "q35",
            "type": "single",
            "prompt": "A company wants to prevent accidental permanent deletion of versioned S3 objects. Even users with s3:DeleteObject and s3:DeleteObjectVersion permissions should not be able to permanently delete objects without an additional factor. Which feature provides this protection?",
            "options": [
                "S3 Object Lock in Governance mode",
                "Enable MFA Delete on the S3 bucket",
                "S3 bucket policy with an explicit Deny on s3:DeleteObjectVersion",
                "Enable S3 Versioning with lifecycle rules for non-current versions"
            ],
            "correctOptionIndex": 1,
            "explanation": "MFA Delete requires the user to provide a valid TOTP token from an MFA device in addition to their AWS credentials when permanently deleting a versioned object or disabling versioning. This prevents unauthorized or accidental permanent deletion even by users with full delete permissions. Only the bucket owner (root account) can enable MFA Delete, and it must be done via the CLI/API, not the console."
        },
        {
            "id": "q36",
            "type": "multiple",
            "prompt": "A company is deploying AWS Storage Gateway File Gateway to connect on-premises servers to Amazon S3. Which of the following are capabilities of File Gateway? (Choose two.)",
            "options": [
                "Presents NFS (v3 and v4.1) and SMB interfaces to on-premises applications backed by S3",
                "Caches frequently accessed file data locally on the gateway appliance for low-latency reads",
                "Provides iSCSI block storage volumes backed by Amazon S3",
                "Automatically archives files to S3 Glacier after a configured number of days"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "File Gateway presents standard NFS and SMB file interfaces to on-premises clients while storing the data as S3 objects. It maintains a local cache of recently read and written data to minimize latency for frequently accessed content. iSCSI block storage is provided by Volume Gateway, not File Gateway. Automatic archival to Glacier is managed through S3 Lifecycle rules configured on the target bucket, not the gateway itself."
        },
        {
            "id": "q37",
            "type": "single",
            "prompt": "An EC2 instance is used for a temporary data processing pipeline. Data does not need to persist after instance termination and the workload requires the absolute highest possible I/O performance. Which storage option is MOST appropriate?",
            "options": [
                "Amazon EBS gp3 volume with maximum IOPS provisioned",
                "Amazon EBS io2 Block Express volume",
                "Instance Store (ephemeral NVMe storage)",
                "Amazon EFS with Elastic throughput mode"
            ],
            "correctOptionIndex": 2,
            "explanation": "Instance Store provides the highest I/O performance because the NVMe SSD drives are physically attached to the host server with no network overhead. However, data is lost when the instance is stopped or terminated, making it ideal for temporary scratch data, caches, and buffers. For permanent data, EBS is required. EBS and EFS both traverse the network, adding latency compared to locally attached Instance Store."
        },
        {
            "id": "q38",
            "type": "single",
            "prompt": "A company stores user-generated content in S3 where access patterns per object are completely unpredictable and change over time. The team does not want to manually configure lifecycle rules. Which S3 storage class minimizes cost automatically?",
            "options": [
                "S3 Standard",
                "S3 Standard-IA",
                "S3 Intelligent-Tiering",
                "S3 One Zone-IA"
            ],
            "correctOptionIndex": 2,
            "explanation": "S3 Intelligent-Tiering automatically monitors object access patterns and moves objects between Frequent Access, Infrequent Access, Archive Instant Access, Archive, and Deep Archive tiers without retrieval fees. It is ideal when access patterns are unpredictable. Standard-IA is suitable when access is predictably infrequent; using it for unpredictable patterns may result in higher costs due to retrieval fees. Intelligent-Tiering has a small monitoring fee per object but eliminates manual lifecycle management."
        },
        {
            "id": "q39",
            "type": "multiple",
            "prompt": "A company has enabled S3 Same-Region Replication (SRR). Which of the following are valid use cases for SRR? (Choose two.)",
            "options": [
                "Aggregate log files from multiple source S3 buckets into a single destination bucket in the same region",
                "Replicate data across regions to reduce latency for global users",
                "Maintain a separate copy of production data in the same region with different access policies for compliance teams",
                "Reduce per-GB storage costs by replicating to a cheaper storage class automatically"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "SRR replicates objects between S3 buckets within the same AWS region. Common use cases include log aggregation (consolidating logs from multiple source buckets into one destination) and maintaining separate data copies with different access controls (e.g., a compliance read-only copy). Cross-region replication requires CRR, not SRR. SRR does not automatically change storage class of replicas to reduce costs, though you can configure the destination storage class."
        },
        {
            "id": "q40",
            "type": "single",
            "prompt": "A company needs to prevent backup recovery points in an AWS Backup vault from being deleted before their retention period expires, even by AWS administrators with full Backup permissions. Which feature provides this immutability?",
            "options": [
                "AWS Backup cross-account copy",
                "AWS Backup Vault Lock",
                "Resource-based backup vault access policies",
                "AWS Backup Audit Manager compliance frameworks"
            ],
            "correctOptionIndex": 1,
            "explanation": "AWS Backup Vault Lock enforces a WORM (Write Once, Read Many) model on a backup vault. Once Vault Lock is applied in Compliance mode, no one — including AWS Support and the root account — can delete recovery points before their retention period expires or change the vault lock policy. It supports a configurable lock period (cool-off window in Governance mode) before the lock becomes permanent."
        },
        {
            "id": "q41",
            "type": "single",
            "prompt": "A company has multiple applications sharing an EFS file system. Each application should see only its designated directory and be unable to access other applications' directories, with enforced POSIX ownership. Which EFS feature enforces this directory-level isolation?",
            "options": [
                "EFS security groups with per-application rules",
                "EFS Lifecycle Management policies",
                "EFS Access Points",
                "EFS encryption at rest with per-application KMS keys"
            ],
            "correctOptionIndex": 2,
            "explanation": "EFS Access Points are application-specific entry points into an EFS file system that enforce a specific root directory and POSIX user/group identity for all file system operations made through the access point. Each application is given its own Access Point that restricts its view to a designated directory and enforces ownership, providing strong isolation without requiring multiple EFS file systems."
        },
        {
            "id": "q42",
            "type": "single",
            "prompt": "A web application served via CloudFront makes JavaScript fetch() requests directly to private S3 objects from a different domain. Users are receiving CORS errors. What should be configured?",
            "options": [
                "Enable S3 Transfer Acceleration on the bucket",
                "Add CORS configuration rules to the S3 bucket allowing the application's origin",
                "Enable CloudFront signed cookies for the S3 requests",
                "Update the bucket policy to allow all origins with a wildcard"
            ],
            "correctOptionIndex": 1,
            "explanation": "When a browser makes a cross-origin request to S3, S3 returns CORS headers based on the bucket's CORS configuration. You must add a CORS rule to the S3 bucket specifying the allowed origin (the web app's domain), allowed HTTP methods, and any required headers. Without a CORS configuration, S3 does not include the Access-Control-Allow-Origin header and browsers block the response. Transfer Acceleration and signed cookies do not resolve CORS issues."
        },
        {
            "id": "q43",
            "type": "multiple",
            "prompt": "A company is architecting a big data analytics platform where Hadoop clusters need high sequential read throughput for processing large log files. Which storage options are MOST suitable? (Choose two.)",
            "options": [
                "Amazon EBS st1 (Throughput Optimized HDD) volumes for sequential throughput workloads",
                "Amazon EBS io2 volumes for each worker node to maximize IOPS",
                "Amazon S3 as HDFS-compatible storage using the S3A connector",
                "Amazon EBS sc1 (Cold HDD) volumes for active Hadoop processing"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "EBS st1 (Throughput Optimized HDD) is designed for large, sequential I/O workloads such as big data, log processing, and data warehouses — delivering up to 500 MB/s throughput at low cost per GB. Amazon S3 with the Hadoop S3A connector is widely used as a cost-effective, scalable HDFS replacement (common in EMR architectures). io2 is optimized for low-latency random I/O (databases), not sequential throughput. sc1 is for cold, infrequently accessed data and has lower throughput than st1."
        },
        {
            "id": "q44",
            "type": "single",
            "prompt": "A company retrieves compliance documents archived in S3 Glacier Flexible Retrieval approximately once a month for audits. Retrieval time of up to 12 hours is acceptable and minimizing cost is the priority. Which retrieval option should they use?",
            "options": [
                "Expedited retrieval (1–5 minutes) — highest cost",
                "Standard retrieval (3–5 hours)",
                "Bulk retrieval (5–12 hours) — lowest cost",
                "Instant retrieval requires migrating to Glacier Instant Retrieval storage class"
            ],
            "correctOptionIndex": 2,
            "explanation": "Bulk retrieval is the lowest-cost retrieval option for S3 Glacier Flexible Retrieval, typically completing within 5–12 hours. Since the company can tolerate up to 12 hours and wants to minimize cost, Bulk is the right choice. Standard retrieval (3–5 hours) costs more per GB retrieved. Expedited (1–5 minutes) is the most expensive. For millisecond access, objects must be stored in the S3 Glacier Instant Retrieval storage class, which costs more per GB stored."
        },
        {
            "id": "q45",
            "type": "multiple",
            "prompt": "A company is migrating Windows file shares to AWS. Which of the following are features of Amazon FSx for Windows File Server? (Choose two.)",
            "options": [
                "Native integration with Microsoft Active Directory for user authentication and access control",
                "Provides native NFS protocol support for Linux-based EC2 clients",
                "Supports Windows ACLs (Access Control Lists) and NTFS permissions",
                "Uses the Lustre parallel file system engine for high-performance computing"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Amazon FSx for Windows File Server is built on Windows Server and supports Microsoft Active Directory integration for user authentication using Kerberos/NTLM protocols. It fully supports Windows ACLs and NTFS permissions for fine-grained file and folder access control. FSx for Windows uses SMB protocol (not NFS — NFS is for EFS). Lustre is a separate FSx offering for HPC workloads (FSx for Lustre)."
        },
        {
            "id": "q46",
            "type": "single",
            "prompt": "A healthcare company must store patient records so they cannot be overwritten or deleted for exactly 6 years per HIPAA regulatory requirements. The policy must be enforced even against privileged IAM users. Which S3 configuration meets this requirement?",
            "options": [
                "S3 Versioning with MFA Delete and a bucket policy denying DeleteObjectVersion",
                "S3 Object Lock in Governance mode with a 6-year retention period",
                "S3 Object Lock in Compliance mode with a 6-year retention period",
                "S3 Intelligent-Tiering with a 6-year expiration lifecycle rule"
            ],
            "correctOptionIndex": 2,
            "explanation": "S3 Object Lock in Compliance mode is the strictest WORM enforcement available in S3. During the retention period, no user — including the root account — can overwrite or delete the object version. Governance mode allows users with the s3:BypassGovernanceRetention permission to override the lock. MFA Delete protects against accidental deletion but can be disabled. Intelligent-Tiering with expiration would delete objects, which is the opposite of the requirement."
        },
        {
            "id": "q47",
            "type": "multiple",
            "prompt": "A company wants to use AWS Backup to protect AWS resources. Which of the following services are natively supported by AWS Backup? (Choose two.)",
            "options": [
                "Amazon EC2 instances (including EBS volumes)",
                "Amazon CloudFront distributions",
                "Amazon DynamoDB tables",
                "AWS Lambda functions"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "AWS Backup natively supports Amazon EC2 (and attached EBS volumes), Amazon EBS, Amazon RDS (including Aurora), Amazon DynamoDB, Amazon EFS, Amazon FSx (for Windows and Lustre), AWS Storage Gateway, Amazon S3, and SAP HANA on EC2. CloudFront distributions are stateless edge configurations and don't have data to back up. Lambda functions contain code that is versioned in Lambda itself and are not a backup target."
        },
        {
            "id": "q48",
            "type": "single",
            "prompt": "A company has dozens of applications accessing a shared S3 bucket, each requiring different permission scopes. Managing a single bucket policy with dozens of conditions is becoming unmanageable. Which S3 feature simplifies per-application access management?",
            "options": [
                "S3 ACLs with per-object permissions for each application",
                "S3 Access Points — one per application with its own permission policy",
                "Separate S3 bucket policies applied per IAM role using policy conditions",
                "S3 Presigned URLs generated per application"
            ],
            "correctOptionIndex": 1,
            "explanation": "S3 Access Points are named network endpoints with their own access point policy, allowing you to create application-specific entry points into a shared S3 bucket. Each access point can have its own IAM-based policy, simplifying permissions management compared to a single complex bucket policy. Access points can also restrict access to specific VPCs. This scales cleanly as the number of applications grows."
        },
        {
            "id": "q49",
            "type": "single",
            "prompt": "A company currently uses gp2 EBS volumes and wants to reduce costs while improving IOPS performance. What is the primary advantage of migrating to gp3?",
            "options": [
                "gp3 automatically scales IOPS elastically based on workload without any provisioning",
                "gp3 allows provisioning up to 16,000 IOPS independently of volume size, at approximately 20% lower cost per GB than gp2",
                "gp3 supports EBS Multi-Attach for shared access, unlike gp2",
                "gp3 volumes have no throughput limit, unlike gp2 which caps at 250 MB/s"
            ],
            "correctOptionIndex": 1,
            "explanation": "gp3 decouples IOPS and throughput from storage size. You can independently provision up to 16,000 IOPS and 1,000 MB/s throughput regardless of volume size (gp2 IOPS scale with size at 3 IOPS/GB, capped at 16,000). gp3 is approximately 20% cheaper per GB than gp2. It does not support Multi-Attach (only io1/io2 do) and has a throughput ceiling of 1,000 MB/s. IOPS must still be explicitly provisioned — they don't auto-scale."
        },
        {
            "id": "q50",
            "type": "single",
            "prompt": "A company currently uses a physical tape library for weekly backups and wants to move to AWS while retaining their existing backup software (Veeam, Commvault, Veritas NetBackup) without reconfiguration. Which AWS service provides a virtual tape infrastructure compatible with these applications?",
            "options": [
                "AWS Backup with a tape-compatible vault",
                "AWS Storage Gateway Tape Gateway (VTL — Virtual Tape Library)",
                "Amazon S3 Glacier configured as a tape target",
                "Amazon EFS mounted as a network tape device"
            ],
            "correctOptionIndex": 1,
            "explanation": "AWS Storage Gateway Tape Gateway presents a virtual tape library (VTL) and virtual tape shelf (VTS) interface over iSCSI that is compatible with popular backup applications like Veeam, Commvault, Dell EMC NetWorker, and Veritas NetBackup. Virtual tapes are stored in S3 and can be archived to S3 Glacier, mimicking the physical tape workflow with no software reconfiguration required."
        },
        {
            "id": "q51",
            "type": "single",
            "prompt": "A company hosts a publicly available research dataset in S3 that is downloaded by thousands of researchers globally. The company wants to share the data freely but avoid paying the outbound S3 data transfer costs. Which S3 feature shifts the cost to requesters?",
            "options": [
                "S3 Transfer Acceleration",
                "Requester Pays",
                "S3 Public Access Block removal",
                "S3 Intelligent-Tiering with cost allocation tags"
            ],
            "correctOptionIndex": 1,
            "explanation": "When Requester Pays is enabled on an S3 bucket, the requester (downloader) pays for data transfer and request costs instead of the bucket owner. The bucket owner still pays for storage. Requesters must be authenticated AWS users — anonymous access is disabled when Requester Pays is active. This is commonly used for large public datasets (e.g., genomics, satellite imagery) where the data owner wants to share but not fund all transfer costs."
        },
        {
            "id": "q52",
            "type": "single",
            "prompt": "An application uses Amazon EFS for shared file storage and has highly unpredictable, bursty throughput requirements — sometimes needing very high throughput for short periods and minimal throughput at other times. Which EFS throughput mode is MOST cost-effective?",
            "options": [
                "Bursting Throughput mode",
                "Provisioned Throughput mode set to the peak expected throughput",
                "Elastic Throughput mode",
                "General Purpose mode inherently provides the needed throughput scaling"
            ],
            "correctOptionIndex": 2,
            "explanation": "EFS Elastic Throughput automatically scales throughput up and down based on actual workload demand with no capacity planning required. You pay only for the throughput you use, making it the most cost-effective choice for spiky or unpredictable workloads. Bursting Throughput is based on a credit system tied to stored data size, which may not provide enough burst capacity for all workloads. Provisioned Throughput charges for the provisioned amount regardless of actual usage, making it expensive for unpredictable patterns."
        },
        {
            "id": "q53",
            "type": "single",
            "prompt": "A developer uploads a new version of an object to Amazon S3 and immediately reads it but receives the old version. What does the developer need to know about S3 data consistency?",
            "options": [
                "S3 provides eventual consistency for all read-after-write operations globally",
                "S3 provides strong read-after-write consistency for all operations, including PUT overwrites and DELETEs",
                "S3 provides strong consistency only for new object PUTs but eventual consistency for overwrites and deletes",
                "S3 strong consistency is only guaranteed within 60 seconds of a write operation"
            ],
            "correctOptionIndex": 1,
            "explanation": "As of December 2020, Amazon S3 provides strong read-after-write consistency for all S3 GET, PUT, LIST, and DELETE operations — including overwrites and deletes. This means a successful write is immediately visible to all subsequent reads. The developer should not be experiencing stale reads from S3 itself; the issue may be in a caching layer (CloudFront, application cache) between the application and S3."
        },
        {
            "id": "q54",
            "type": "single",
            "prompt": "A company needs to apply S3 Object Lock retention periods to millions of existing objects that were uploaded before Object Lock was configured on the bucket. Manually updating each object is not feasible. Which tool efficiently performs this bulk operation?",
            "options": [
                "S3 Lifecycle Rules with a transition action",
                "AWS Lambda with S3 bucket notifications",
                "S3 Batch Operations with a PUT Object Legal Hold or PUT Object Retention job",
                "AWS Glue ETL job scanning the bucket"
            ],
            "correctOptionIndex": 2,
            "explanation": "S3 Batch Operations can perform bulk actions on millions of S3 objects at scale using a single API call or console action. Supported operations include copying objects, invoking Lambda, replacing tags, restoring from Glacier, and applying Object Lock retention settings (PUT Object Retention, PUT Object Legal Hold). This is the correct tool for applying retention settings to existing objects at scale. S3 Lifecycle Rules manage storage class transitions and expiration but cannot apply Object Lock settings."
        },
        {
            "id": "q55",
            "type": "multiple",
            "prompt": "A company wants to automate EBS snapshot management for disaster recovery across regions. Which of the following are correct approaches? (Choose two.)",
            "options": [
                "Use Amazon Data Lifecycle Manager (DLM) to automate snapshot creation and configure cross-region copy rules",
                "EBS snapshots automatically replicate across all AWS regions when created",
                "Share EBS snapshots with other AWS accounts to enable cross-account recovery",
                "EBS snapshots can only be used to restore volumes within the same Availability Zone"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Amazon Data Lifecycle Manager (DLM) automates the creation, retention, and deletion of EBS snapshots and AMIs, and supports cross-region copy rules for DR. EBS snapshots can be shared with specific AWS accounts or made public, enabling cross-account disaster recovery scenarios. EBS snapshots are regional resources and do NOT automatically replicate to other regions — cross-region copies must be explicitly configured. Snapshots can be used to create volumes in any AZ within the same region (or another region after copying), not just the source AZ."
        }
    ]
};
