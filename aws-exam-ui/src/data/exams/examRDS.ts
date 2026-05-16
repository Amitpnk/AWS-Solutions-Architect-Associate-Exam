import type { ExamDefinition } from './types';

export const examRDS: ExamDefinition = {
    "id": "exam_rds_aurora_elasticache_saa_c03",
    "title": "SAA-C03 Practice Set on RDS, Aurora, and ElastiCache",
    "description": "Comprehensive exam questions covering Amazon RDS, Aurora, ElastiCache, read replicas, multi-AZ, backups, security, RDS Proxy, and caching strategies",
    "durationSeconds": 7800,
    "questions": [
        {
            "id": "q1",
            "type": "multiple",
            "prompt": "A company needs a relational database with automatic replication for disaster recovery and high availability. Which RDS configurations should be implemented? (Choose two.)",
            "options": [
                "Multi-AZ deployment for automatic failover with synchronous replication",
                "Read Replicas in different AZs for handling read scaling and disaster recovery",
                "Single-AZ RDS with manual snapshots for backup",
                "RDS Custom for specialized database requirements"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Multi-AZ provides automatic failover with synchronous replication (HA). Read Replicas offer asynchronous replication for read scaling and can serve as DR targets. Single-AZ with manual snapshots lacks HA. RDS Custom is for specialized cases, not standard HA."
        },
        {
            "id": "q2",
            "type": "single",
            "prompt": "What is the primary difference between RDS Multi-AZ and RDS Read Replicas?",
            "options": [
                "Multi-AZ is for read scaling while Read Replicas are for high availability",
                "Multi-AZ is for high availability with automatic failover; Read Replicas are for read scaling with manual promotion",
                "Multi-AZ supports all database engines while Read Replicas only support MySQL",
                "Read Replicas require manual setup while Multi-AZ is automatic"
            ],
            "correctOptionIndex": 1,
            "explanation": "Multi-AZ: synchronous replication, automatic failover, single DNS endpoint, no read scaling. Read Replicas: asynchronous replication, no automatic failover, separate endpoints, read scaling possible, can be promoted to standalone."
        },
        {
            "id": "q3",
            "type": "multiple",
            "prompt": "A database application experiences sudden read-heavy traffic during certain hours. Which solutions can handle this? (Choose two.)",
            "options": [
                "Create RDS Read Replicas to distribute read traffic",
                "Increase instance size for vertical scaling",
                "Use Amazon Aurora with auto-scaling read replicas",
                "Implement ElastiCache in front of RDS for caching"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "Read Replicas and ElastiCache both handle read scaling. Vertical scaling increases capacity but isn't as dynamic. Aurora has auto-scaling but replicas still need to handle connection distribution. ElastiCache provides caching layer for faster reads."
        },
        {
            "id": "q4",
            "type": "single",
            "prompt": "You have an RDS MySQL database with 5 read replicas. The primary database is paused for maintenance. What happens to the read replicas?",
            "options": [
                "Read replicas continue operating and serving read traffic independently",
                "Read replicas are automatically paused with the primary",
                "Read replicas stop replicating but continue serving cached data",
                "Read replicas are promoted to primary"
            ],
            "correctOptionIndex": 0,
            "explanation": "Read Replicas are independent copies with separate endpoints. Pausing the primary doesn't affect replica operation. Replicas use asynchronous replication, so they continue serving reads independently."
        },
        {
            "id": "q5",
            "type": "multiple",
            "prompt": "A company is designing a disaster recovery solution for its RDS database with RPO of 1 hour and RTO of 15 minutes. Which strategies meet these requirements? (Choose two.)",
            "options": [
                "Multi-AZ RDS deployment for automatic failover within minutes",
                "RDS Read Replica in different region for DR with manual promotion",
                "Automated daily snapshots for backup",
                "RDS Backup window configured with point-in-time recovery"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Multi-AZ achieves RTO of minutes with automatic failover. Cross-region read replica can be promoted for DR. Automated backups support point-in-time recovery (within backup window). Daily snapshots don't meet 1-hour RPO."
        },
        {
            "id": "q6",
            "type": "single",
            "prompt": "You need to create an RDS read replica in a different region from the primary database. What is the expected replication lag?",
            "options": [
                "Synchronous (immediate)",
                "Typically less than 1 second",
                "Typically 1-10 seconds (asynchronous)",
                "Could be several minutes depending on network"
            ],
            "correctOptionIndex": 2,
            "explanation": "Cross-region read replicas use asynchronous replication with typical lag of 1-10 seconds. This is acceptable for most read scaling scenarios. Synchronous replication would be Multi-AZ (same region). Network distance affects lag but typically stays under 10 seconds."
        },
        {
            "id": "q7",
            "type": "multiple",
            "prompt": "An e-commerce company wants to implement caching for frequently accessed product information. Which caching solutions are suitable? (Choose two.)",
            "options": [
                "Amazon ElastiCache with Redis for session storage and product caching",
                "RDS Read Replicas for caching database queries",
                "ElastiCache with Memcached for simple key-value caching",
                "Amazon DynamoDB for caching transactional data"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "ElastiCache (Redis/Memcached) is designed for caching. Redis supports complex data structures and persistence; Memcached is simpler. Read Replicas aren't caching (they're full database copies). DynamoDB is a database, not a cache."
        },
        {
            "id": "q8",
            "type": "single",
            "prompt": "You need to cache session data with automatic expiration and support for complex data structures. Which ElastiCache engine is most appropriate?",
            "options": [
                "Memcached for simplicity and speed",
                "Redis for data structures and expiration support",
                "DynamoDB for session management",
                "RDS for persistent session storage"
            ],
            "correctOptionIndex": 1,
            "explanation": "Redis supports complex data structures (lists, sets, hashes), TTL/expiration (automatic key deletion), persistence, and replication. Memcached is simpler (string key-value only). DynamoDB and RDS are databases, not caching engines."
        },
        {
            "id": "q9",
            "type": "multiple",
            "prompt": "Amazon Aurora is being considered for a critical application. Which advantages does Aurora provide over standard RDS? (Choose two.)",
            "options": [
                "Better read performance with auto-scaling read replicas (Aurora Replicas)",
                "Faster replication with storage-level replication",
                "5x better performance than MySQL RDS",
                "Automatic backup with point-in-time recovery up to 35 days"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Aurora has auto-scaling read replicas and 5x better MySQL performance. Storage-level replication is a feature but not the main advantage. All RDS versions support point-in-time recovery (not Aurora-specific)."
        },
        {
            "id": "q10",
            "type": "single",
            "prompt": "An Aurora database cluster has 1 primary instance and 4 Aurora Replicas. If the primary fails, which replica becomes the new primary?",
            "options": [
                "AWS automatically selects the replica with lowest latency",
                "The oldest Aurora Replica is promoted",
                "The replica with the lowest replication lag is promoted",
                "Manual intervention is required to promote a replica"
            ],
            "correctOptionIndex": 2,
            "explanation": "Aurora automatically promotes the replica with the lowest replication lag to become the primary. This minimizes data loss. AWS handles failover automatically (unlike standard RDS read replicas which need manual promotion)."
        },
        {
            "id": "q11",
            "type": "multiple",
            "prompt": "A company needs to migrate from standard RDS MySQL to Aurora MySQL. Which migration considerations are important? (Choose two.)",
            "options": [
                "Aurora is compatible with MySQL protocol but uses different storage architecture",
                "Application connection strings require changes to point to Aurora endpoint",
                "All data must be manually transferred using AWS DMS",
                "Aurora uses the same backup format as RDS, making migration straightforward"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Aurora is MySQL-compatible at protocol level but has different architecture. Connection strings may need updates (cluster endpoint). AWS DMS can help but migration tools exist. Backup formats differ; direct restore isn't possible."
        },
        {
            "id": "q12",
            "type": "single",
            "prompt": "You have an RDS database with automated backups enabled with a 7-day retention period. You need to restore a database from 10 days ago. What options are available?",
            "options": [
                "You cannot restore from 10 days ago (outside retention period)",
                "Create a manual snapshot and restore from it",
                "Use point-in-time recovery within the 7-day window",
                "Restore from the automated backup and extend retention"
            ],
            "correctOptionIndex": 0,
            "explanation": "Automated backups are retained for the configured period (7 days). A restore request from 10 days ago is outside this window and cannot be restored. Manual snapshots can be retained longer, but 10-day data is already lost."
        },
        {
            "id": "q13",
            "type": "multiple",
            "prompt": "An RDS database needs enhanced security with encryption, access control, and auditing. Which security measures should be implemented? (Choose two.)",
            "options": [
                "Enable encryption at rest using AWS KMS",
                "Use RDS security groups to control network access",
                "Store database credentials in environment variables",
                "Enable encryption in transit using SSL/TLS connections"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "Encryption at rest (KMS) and in transit (SSL/TLS) are encryption best practices. Security groups control network access but aren't directly 'RDS security'. Storing credentials in environment variables is a security anti-pattern; use IAM database authentication instead."
        },
        {
            "id": "q14",
            "type": "single",
            "prompt": "You need to connect to an RDS database using IAM database authentication instead of storing passwords. Which RDS engine supports this?",
            "options": [
                "Only MySQL",
                "Only PostgreSQL",
                "MySQL and PostgreSQL",
                "All RDS engines"
            ],
            "correctOptionIndex": 2,
            "explanation": "IAM database authentication is supported for MySQL and PostgreSQL. It generates temporary credentials, eliminating password storage. Other engines (Oracle, SQL Server) use traditional authentication methods."
        },
        {
            "id": "q15",
            "type": "multiple",
            "prompt": "An application experiences database connection pooling issues with large numbers of concurrent connections. Which solutions can address this? (Choose two.)",
            "options": [
                "Use RDS Proxy to manage connection pooling between application and database",
                "Increase the database instance size to handle more connections",
                "Implement ElastiCache to reduce database queries and connection load",
                "Create multiple read replicas to distribute connection load"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "RDS Proxy manages connection pooling efficiently. ElastiCache reduces queries (lower connection needs). Larger instances help but don't solve pooling issues. Read replicas distribute reads but each needs separate connections."
        },
        {
            "id": "q16",
            "type": "single",
            "prompt": "RDS Proxy is deployed in front of an RDS database. What is the primary benefit?",
            "options": [
                "Improves database query performance by 5x",
                "Manages database connection pooling to improve efficiency",
                "Provides automatic backup and recovery",
                "Replicates data across regions"
            ],
            "correctOptionIndex": 1,
            "explanation": "RDS Proxy's main benefit is connection pooling—it reduces the number of database connections by reusing them, improving resource efficiency and supporting more concurrent application connections."
        },
        {
            "id": "q17",
            "type": "multiple",
            "prompt": "A company is choosing between RDS Custom and standard RDS. When is RDS Custom appropriate? (Choose two.)",
            "options": [
                "When needing Oracle or Microsoft SQL Server with full database control",
                "When requiring customization beyond RDS-managed limitations",
                "For standard MySQL/PostgreSQL applications",
                "When needing to install custom extensions or patches"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "RDS Custom is for Oracle/SQL Server with need for OS-level access. Standard RDS works for MySQL/PostgreSQL. Custom is needed for custom extensions and patches. Standard RDS handles most use cases with less operational overhead."
        },
        {
            "id": "q18",
            "type": "single",
            "prompt": "An RDS database backup is encrypted with AWS KMS. You want to restore the database to a different AWS account. What is required?",
            "options": [
                "The backup can be restored directly to the other account",
                "KMS key policy must allow cross-account access before restoration",
                "A new snapshot must be created in the target account",
                "The database must be decrypted first, then restored"
            ],
            "correctOptionIndex": 1,
            "explanation": "Cross-account RDS backup restoration with KMS encryption requires the KMS key policy to allow the target account access. The source account must explicitly grant permissions in the key policy."
        },
        {
            "id": "q19",
            "type": "multiple",
            "prompt": "An Aurora cluster needs to handle read-heavy workloads across multiple regions. Which configurations are recommended? (Choose two.)",
            "options": [
                "Create Aurora Global Database for read-only replicas in other regions",
                "Deploy Aurora multi-region failover with automatic promotion",
                "Use Aurora cross-region read replicas that can be promoted",
                "Implement ElastiCache in each region for query caching"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "Aurora Global Database provides read-only replicas across regions. ElastiCache reduces query load locally. Cross-region failover is automatic for Global Database (not manual promotion). Standard Aurora replicas don't span regions."
        },
        {
            "id": "q20",
            "type": "single",
            "prompt": "An Aurora database cluster has been configured with automated backups. What is the maximum point-in-time recovery window?",
            "options": [
                "7 days",
                "14 days",
                "35 days",
                "Indefinite with manual snapshots"
            ],
            "correctOptionIndex": 2,
            "explanation": "Aurora (like RDS) has a default 35-day point-in-time recovery window, longer than standard RDS (default 7 days). This can be increased to 35 days. Manual snapshots are retained indefinitely."
        },
        {
            "id": "q21",
            "type": "multiple",
            "prompt": "ElastiCache is being implemented for session storage in a web application. Which considerations are important? (Choose two.)",
            "options": [
                "Sessions stored in ElastiCache should be considered volatile and not mission-critical",
                "ElastiCache should never be used for session storage (use database instead)",
                "Enable replication and automatic failover for session availability",
                "Configure appropriate TTL values for session expiration"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "ElastiCache is excellent for sessions but data isn't persistent (unlike databases). TTL is essential for automatic session cleanup. Replication adds HA. ElastiCache is actually ideal for session storage."
        },
        {
            "id": "q22",
            "type": "single",
            "prompt": "You need to cache database query results for 5 minutes. The cache must support automatic expiration. Which ElastiCache engine is appropriate?",
            "options": [
                "Memcached (doesn't support expiration)",
                "Redis with TTL/expiration support",
                "Either Memcached or Redis (both support TTL)",
                "DynamoDB with Time-to-Live"
            ],
            "correctOptionIndex": 1,
            "explanation": "Redis supports TTL (Time-to-Live) with automatic key expiration. Memcached doesn't support TTL natively. DynamoDB is a database, not a cache. Redis is the right choice for expiring cache entries."
        },
        {
            "id": "q23",
            "type": "multiple",
            "prompt": "A critical application requires database high availability with minimal failover time. Which configurations provide this? (Choose two.)",
            "options": [
                "RDS Multi-AZ for automatic synchronous replication and sub-minute failover",
                "Aurora for native high availability with automatic failover",
                "RDS Read Replicas across AZs with manual promotion",
                "Regular snapshots with automated restoration on failure"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Multi-AZ and Aurora both provide automatic failover (seconds to minutes). Read Replicas require manual promotion (minutes to hours). Snapshots require manual restoration (longer than automatic failover)."
        },
        {
            "id": "q24",
            "type": "single",
            "prompt": "An RDS database experiences high CPU utilization from query load. What immediate action can help reduce database load?",
            "options": [
                "Create new RDS instances",
                "Implement ElastiCache to cache frequently accessed data",
                "Increase backup frequency",
                "Enable query logging"
            ],
            "correctOptionIndex": 1,
            "explanation": "ElastiCache reduces database query load by caching results. New instances don't help without load distribution. Backup frequency and logging don't reduce query load."
        },
        {
            "id": "q25",
            "type": "multiple",
            "prompt": "An organization is implementing monitoring and alerting for RDS databases. Which metrics should be monitored? (Choose two.)",
            "options": [
                "CPU utilization to detect resource contention",
                "Database connections to identify connection pool issues",
                "Read Replica lag to ensure replication health",
                "S3 bucket size for backup storage"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "CPU and connection metrics are critical for performance. Read Replica lag is important. S3 bucket size isn't an RDS metric (backups are managed by RDS)."
        },
        {
            "id": "q26",
            "type": "single",
            "prompt": "You create an RDS read replica in a different AWS region. What are the costs associated with this?",
            "options": [
                "No additional costs (replica inherits primary costs)",
                "Standard RDS pricing for replica instance + data transfer costs",
                "Only data transfer costs (replica instance is free)",
                "Shared pricing between primary and replica"
            ],
            "correctOptionIndex": 1,
            "explanation": "Read replicas are charged as separate instances at full RDS pricing. Cross-region data transfer incurs inter-region data transfer charges. This is important for cost planning."
        },
        {
            "id": "q27",
            "type": "multiple",
            "prompt": "An Aurora cluster needs to support a mix of OLTP and OLAP workloads. Which solutions are appropriate? (Choose two.)",
            "options": [
                "Use separate Aurora instances (one for OLTP, one for OLAP)",
                "Deploy Aurora read replicas with different settings for OLAP queries",
                "Use Aurora with read-only replicas to offload analytics queries",
                "Implement separate data warehouse (e.g., Redshift) for analytics"
            ],
            "correctOptionIndexes": [2, 3],
            "explanation": "Aurora read replicas can handle OLAP queries separately. Redshift is purpose-built for analytics and best practice for large-scale OLAP. Separate instances aren't necessary (replicas are cheaper). Different instance settings don't affect query type handling."
        },
        {
            "id": "q28",
            "type": "single",
            "prompt": "An RDS database has a 1-hour automated backup window and backups are retained for 7 days. When can you restore the database using point-in-time recovery?",
            "options": [
                "Only during the 1-hour backup window",
                "Any time within the last 7 days (not just the backup window)",
                "Only to the specific times when backups occurred",
                "Any time within the last 24 hours only"
            ],
            "correctOptionIndex": 1,
            "explanation": "Point-in-time recovery uses backup logs and transaction logs to restore to any second within the retention period (7 days), not just backup window times. The backup window is just when automated backups are created."
        },
        {
            "id": "q29",
            "type": "multiple",
            "prompt": "ElastiCache is being implemented to reduce database load for an e-commerce platform. Which caching strategies are most effective? (Choose two.)",
            "options": [
                "Cache all database queries without exception",
                "Cache product catalog and pricing data that changes infrequently",
                "Cache user session data with appropriate TTL",
                "Cache real-time inventory levels (frequently changing data)"
            ],
            "correctOptionIndexes": [1, 2],
            "explanation": "Cache stable data (product catalog, prices). Session data is ideal for caching with TTL. Don't cache everything (invalidation overhead). Real-time inventory changes too frequently for effective caching."
        },
        {
            "id": "q30",
            "type": "single",
            "prompt": "You need to set up an RDS database with encryption at rest. When should the encryption be enabled?",
            "options": [
                "At database creation time",
                "After creation by modifying the database",
                "Only after taking a backup",
                "Encryption is automatic and cannot be disabled"
            ],
            "correctOptionIndex": 0,
            "explanation": "Encryption at rest must be enabled at RDS instance creation time. It cannot be added or modified after creation—a new encrypted instance would need to be created and data migrated."
        },
        {
            "id": "q31",
            "type": "multiple",
            "prompt": "A company is migrating from RDS MySQL to Aurora MySQL using AWS DMS (Database Migration Service). Which considerations are important? (Choose two.)",
            "options": [
                "DMS requires downtime for the migration",
                "DMS can perform continuous replication until final cutover",
                "Aurora is fully backward-compatible with MySQL applications",
                "Connection endpoints change, requiring application updates"
            ],
            "correctOptionIndexes": [1, 3],
            "explanation": "DMS supports continuous replication with zero-downtime migration. Aurora is MySQL-compatible at protocol level. Endpoints differ (RDS: instance.xxx.rds.amazonaws.com vs Aurora: cluster.xxx.rds.amazonaws.com), requiring app string updates."
        },
        {
            "id": "q32",
            "type": "single",
            "prompt": "An Aurora Global Database is configured with the primary in us-east-1 and read-only secondary in eu-west-1. In which regions can write operations occur?",
            "options": [
                "Both us-east-1 and eu-west-1",
                "Only us-east-1 (primary region)",
                "Only eu-west-1 (secondary region)",
                "Both regions in read-only mode"
            ],
            "correctOptionIndex": 1,
            "explanation": "Aurora Global Database has one primary region (writable) and secondary regions (read-only). All writes must go to the primary. Secondaries can be promoted to primary for DR (but not both simultaneously)."
        },
        {
            "id": "q33",
            "type": "multiple",
            "prompt": "RDS Proxy is used to manage connections for a high-traffic application. Which benefits does it provide? (Choose two.)",
            "options": [
                "Reduces idle database connections through connection pooling",
                "Improves application query response time by 5x",
                "Enables failover to read replicas automatically",
                "Supports IAM authentication between application and proxy"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "RDS Proxy pools connections and supports IAM authentication. It doesn't improve query response times (database performance unchanged). Automatic failover requires separate RDS Multi-AZ/Aurora HA setup."
        },
        {
            "id": "q34",
            "type": "single",
            "prompt": "You have RDS with read replicas in multiple AZs. During the primary failure, your application continues reading from the replicas. What happens after AWS completes the failover?",
            "options": [
                "One read replica is promoted to primary; others remain as replicas",
                "All read replicas are promoted to primary",
                "The original primary is restored and made primary again",
                "Manual intervention is required to designate a new primary"
            ],
            "correctOptionIndex": 0,
            "explanation": "RDS doesn't auto-promote replicas on primary failure (unlike Aurora). You must manually promote one replica. Failover is automatic only in Multi-AZ (which uses standby, not read replicas)."
        },
        {
            "id": "q35",
            "type": "multiple",
            "prompt": "An application needs caching for both sessions and application state with different requirements. Which approach is most appropriate? (Choose two.)",
            "options": [
                "Use Redis for both sessions and application state (supports complex structures)",
                "Use Memcached for sessions only (faster for simple key-value)",
                "Use RDS for application state (persistent)",
                "Use separate ElastiCache clusters optimized for each use case"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "Redis handles both sessions and complex state well. Separate clusters allow independent scaling and configuration. Memcached is option for sessions but single instance can handle both. RDS is for persistence, not caching."
        },
        {
            "id": "q36",
            "type": "single",
            "prompt": "An RDS database backup is 500 GB. You want to restore it to a different region. How is the backup transferred?",
            "options": [
                "You must manually download the backup and upload to the target region",
                "AWS automatically transfers the snapshot across regions",
                "The backup cannot be transferred (must be recreated in new region)",
                "You must use AWS DataSync to transfer the backup"
            ],
            "correctOptionIndex": 1,
            "explanation": "RDS snapshots can be copied across regions automatically through the AWS Console/API. AWS handles the transfer transparently. You don't manually download/upload or need DataSync."
        },
        {
            "id": "q37",
            "type": "multiple",
            "prompt": "A financial application requires compliance with PCI-DSS for database security. Which RDS configurations meet this requirement? (Choose two.)",
            "options": [
                "Enable encryption at rest using AWS KMS",
                "Enable SSL/TLS encryption in transit for all connections",
                "Use RDS in private subnets with no public access",
                "Enable all database logging and query monitoring"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Encryption at rest and in transit are PCI-DSS requirements. Private subnet access is security best practice. Logging/monitoring are recommended but specific PCI-DSS requirements vary."
        },
        {
            "id": "q38",
            "type": "single",
            "prompt": "You create an Aurora read replica in the same region as the primary. What is the replication method?",
            "options": [
                "Asynchronous replication through transaction logs",
                "Synchronous replication (writes wait for replica confirmation)",
                "Storage-level replication within the cluster",
                "No replication (read replica is a separate database)"
            ],
            "correctOptionIndex": 2,
            "explanation": "Aurora read replicas (called Aurora Replicas) use storage-level replication—all instances in the cluster share the same storage. This provides ultra-fast, near-synchronous replication within the cluster."
        },
        {
            "id": "q39",
            "type": "multiple",
            "prompt": "An organization wants to implement disaster recovery for Aurora with minimal data loss. Which strategies are recommended? (Choose two.)",
            "options": [
                "Use Aurora Global Database with cross-region read replicas",
                "Create regular automated backups with 35-day retention",
                "Deploy Aurora Multi-AZ with automatic failover",
                "Manually promote cross-region replicas weekly"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Global Database and Multi-AZ provide automatic failover with minimal data loss. Automated backups enable recovery but require manual promotion. Manual weekly promotion is not modern DR best practice."
        },
        {
            "id": "q40",
            "type": "single",
            "prompt": "You need to connect multiple applications to an RDS database with strict connection limits. What is the best solution?",
            "options": [
                "Increase RDS instance size to handle more connections",
                "Deploy RDS Proxy to multiplex connections",
                "Create separate RDS instances for each application",
                "Configure application connection timeouts"
            ],
            "correctOptionIndex": 1,
            "explanation": "RDS Proxy is purpose-built for connection pooling, allowing many application connections to share fewer database connections. Larger instances help but don't solve pooling inefficiency. Separate instances increase costs and complexity."
        }
    ]
};
