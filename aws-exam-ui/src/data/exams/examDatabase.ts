import type { ExamDefinition } from './types';

export const examDatabase: ExamDefinition = {
    "id": "exam_database_saa_c03",
    "title": "SAA-C03 Practice Set on Databases",
    "description": "Scenario-driven questions covering Amazon RDS, Aurora, Aurora Serverless, DynamoDB, ElastiCache, DocumentDB, Keyspaces, Neptune, and Redshift for the SAA-C03 exam.",
    "durationSeconds": 4800,
    "questions": [
        {
            "id": "q1",
            "type": "single",
            "prompt": "A company needs a relational database that automatically fails over to a standby instance in another Availability Zone with minimal downtime and no manual intervention. Which RDS feature should they enable?",
            "options": [
                "RDS Read Replica in a different AZ",
                "RDS Multi-AZ deployment",
                "RDS automated backups with point-in-time recovery",
                "RDS Performance Insights"
            ],
            "correctOptionIndex": 1,
            "explanation": "RDS Multi-AZ creates a synchronous standby replica in a different AZ. In case of primary failure, RDS automatically fails over to the standby — typically within 1–2 minutes — with no manual intervention. Read Replicas use asynchronous replication and are intended for read scaling, not failover."
        },
        {
            "id": "q2",
            "type": "single",
            "prompt": "Read queries on a production RDS MySQL database are causing performance degradation for write operations. The company wants to offload read traffic to a dedicated endpoint without modifying the primary instance. What is the MOST appropriate solution?",
            "options": [
                "Enable RDS Multi-AZ and direct reads to the standby",
                "Create an RDS Read Replica and point read traffic to its endpoint",
                "Increase the RDS instance class",
                "Enable RDS automated backups"
            ],
            "correctOptionIndex": 1,
            "explanation": "RDS Read Replicas use asynchronous replication to create readable copies of the primary database. Applications direct read traffic to the replica's endpoint, reducing load on the primary. Multi-AZ standby instances do not serve read traffic — they exist solely for failover."
        },
        {
            "id": "q3",
            "type": "multiple",
            "prompt": "A DBA is configuring RDS encryption for a new database. Which of the following statements about RDS encryption at rest are CORRECT? (Choose two.)",
            "options": [
                "Encryption can be enabled on an existing unencrypted RDS instance without creating a new instance",
                "RDS encryption uses AWS KMS customer-managed or AWS-managed keys",
                "Read Replicas of an encrypted RDS instance must also be encrypted",
                "Automated backups of encrypted RDS instances are stored unencrypted"
            ],
            "correctOptionIndexes": [1, 2],
            "explanation": "RDS encryption uses AWS KMS keys, and all Read Replicas of an encrypted instance must be encrypted. You cannot enable encryption on an existing unencrypted instance in place — the workaround is to take a snapshot, copy it with encryption enabled, then restore. Automated backups and snapshots of encrypted instances are also encrypted."
        },
        {
            "id": "q4",
            "type": "single",
            "prompt": "An organization wants to encrypt an existing unencrypted RDS PostgreSQL database. Which process achieves this with the least amount of downtime?",
            "options": [
                "Modify the RDS instance settings to enable encryption in the AWS Console",
                "Enable encryption via AWS CLI on the running instance",
                "Take a snapshot of the instance, copy the snapshot with encryption enabled, then restore from the encrypted snapshot",
                "Create a new KMS key and attach it to the existing RDS instance"
            ],
            "correctOptionIndex": 2,
            "explanation": "There is no in-place option to encrypt an existing unencrypted RDS instance. The standard procedure is: create a snapshot → copy the snapshot with encryption enabled (specifying a KMS key) → restore a new DB instance from the encrypted snapshot → redirect traffic. The original unencrypted instance can then be decommissioned."
        },
        {
            "id": "q5",
            "type": "single",
            "prompt": "A serverless application using AWS Lambda opens thousands of short-lived connections to an RDS database, causing connection exhaustion errors. What is the MOST appropriate solution to resolve this without changing the application code significantly?",
            "options": [
                "Increase the max_connections parameter on the RDS instance",
                "Create an RDS Read Replica to distribute connections",
                "Use Amazon RDS Proxy to pool and manage database connections",
                "Enable Multi-AZ to distribute connection load across instances"
            ],
            "correctOptionIndex": 2,
            "explanation": "RDS Proxy sits between the application and the RDS instance, pooling and multiplexing database connections. Lambda functions connect to the proxy, which reuses a smaller number of persistent database connections. This dramatically reduces the connection count seen by RDS and eliminates connection exhaustion, with no changes to application SQL logic."
        },
        {
            "id": "q6",
            "type": "multiple",
            "prompt": "A solutions architect is reviewing RDS Multi-AZ characteristics. Which of the following statements about Multi-AZ are CORRECT? (Choose two.)",
            "options": [
                "The Multi-AZ standby instance can serve read traffic to reduce primary load",
                "Replication from primary to standby is synchronous",
                "Failover to the standby is automatic and updates the DNS endpoint",
                "Multi-AZ is only available for MySQL and PostgreSQL engines"
            ],
            "correctOptionIndexes": [1, 2],
            "explanation": "Multi-AZ replication is synchronous — every write to the primary is committed to the standby before acknowledgment. Failover is automatic: RDS flips the CNAME to point to the standby, so applications reconnect without endpoint changes. The standby does NOT serve read traffic in standard Multi-AZ (it exists solely for failover). Multi-AZ is available for all RDS engines."
        },
        {
            "id": "q7",
            "type": "single",
            "prompt": "A company needs to restore an RDS database to the exact state it was in at 3:47 AM yesterday after an accidental bulk delete. Which feature enables this?",
            "options": [
                "Restoring from the most recent automated daily snapshot",
                "RDS point-in-time recovery using automated backups and transaction logs",
                "Restoring from an RDS Read Replica",
                "Using RDS Multi-AZ failover to revert to standby state"
            ],
            "correctOptionIndex": 1,
            "explanation": "RDS automated backups combined with transaction logs enable point-in-time recovery to any second within the retention period (up to 35 days). RDS restores the latest snapshot before the target time, then replays transaction logs forward to the exact timestamp. Daily snapshots alone only allow restoration to the snapshot time, not to an arbitrary second."
        },
        {
            "id": "q8",
            "type": "single",
            "prompt": "An application's RDS storage is growing faster than anticipated. The team wants storage to expand automatically without downtime when it approaches capacity. Which RDS feature should they enable?",
            "options": [
                "Multi-AZ with storage mirroring",
                "RDS Storage Auto Scaling",
                "Scheduled maintenance window resizing",
                "RDS Read Replica with additional storage"
            ],
            "correctOptionIndex": 1,
            "explanation": "RDS Storage Auto Scaling monitors free storage and automatically scales up the storage when it falls below a threshold, without any downtime or performance impact. You set a maximum storage limit and RDS handles the scaling. This avoids manual intervention and potential application outages from running out of space."
        },
        {
            "id": "q9",
            "type": "single",
            "prompt": "A company needs a MySQL-compatible database with up to 5x the throughput of standard MySQL, automatic storage growth up to 128 TB, and storage replicated six ways across three Availability Zones. Which AWS service meets these requirements?",
            "options": [
                "Amazon RDS MySQL Multi-AZ",
                "Amazon Aurora MySQL",
                "Amazon DynamoDB",
                "Amazon Redshift"
            ],
            "correctOptionIndex": 1,
            "explanation": "Amazon Aurora MySQL delivers up to 5x the throughput of standard MySQL, with a distributed, fault-tolerant storage layer that replicates data 6 ways across 3 AZs and automatically grows in 10 GB increments up to 128 TB. RDS MySQL Multi-AZ provides failover but does not offer Aurora's performance or storage architecture."
        },
        {
            "id": "q10",
            "type": "single",
            "prompt": "An Aurora cluster with one primary and three Aurora Replicas experiences a primary instance failure. What happens automatically?",
            "options": [
                "All three Replicas begin accepting writes simultaneously",
                "Aurora promotes one Aurora Replica to be the new primary with minimal downtime",
                "The cluster becomes read-only until a new primary is manually launched",
                "Aurora creates a new primary instance from the latest automated backup"
            ],
            "correctOptionIndex": 1,
            "explanation": "Aurora automatically promotes the highest-priority (or lowest-priority number) Aurora Replica to be the new primary. Failover typically completes in under 30 seconds. The promoted Replica becomes read-write, and the remaining Replicas continue serving read traffic from the new primary."
        },
        {
            "id": "q11",
            "type": "multiple",
            "prompt": "Which of the following correctly describe Amazon Aurora's storage architecture? (Choose two.)",
            "options": [
                "Aurora storage is automatically replicated 6 times across 3 Availability Zones",
                "Aurora storage is tied to a single EC2 instance and must be manually backed up",
                "Aurora storage grows automatically in 10 GB increments up to 128 TB",
                "Aurora requires manual provisioning of storage like standard RDS"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Aurora uses a shared distributed storage volume that automatically replicates data 6 ways across 3 AZs, providing high durability (tolerates loss of 2 copies). Storage grows automatically in 10 GB increments up to 128 TB — there is no need to provision storage capacity in advance. This is fundamentally different from RDS, where you pre-provision storage."
        },
        {
            "id": "q12",
            "type": "single",
            "prompt": "An accidental UPDATE statement corrupted data in an Aurora database 20 minutes ago. The team wants to undo the change by rewinding the database to its state before the bad query, without restoring from a backup. Which Aurora feature enables this?",
            "options": [
                "Aurora point-in-time recovery",
                "Aurora Backtrack",
                "Aurora database cloning",
                "Aurora global database failover"
            ],
            "correctOptionIndex": 1,
            "explanation": "Aurora Backtrack rewinds an Aurora DB cluster in place to a specified point in time without restoring from a backup. It is significantly faster than point-in-time recovery and does not require creating a new DB cluster. Backtrack must be enabled when the cluster is created and is currently available for Aurora MySQL. Point-in-time recovery creates a new cluster, which takes longer."
        },
        {
            "id": "q13",
            "type": "single",
            "prompt": "A team wants to create a test Aurora cluster that mirrors their 5 TB production database without waiting for a full copy and without incurring double the storage cost. Which Aurora feature achieves this?",
            "options": [
                "Create an Aurora Read Replica and promote it",
                "Restore from the latest Aurora automated snapshot",
                "Use Aurora database cloning",
                "Enable Aurora Serverless on a copy of the production cluster"
            ],
            "correctOptionIndex": 2,
            "explanation": "Aurora database cloning uses a copy-on-write protocol to create a clone that shares the same underlying storage pages as the original. Only pages that are modified after cloning are copied, so the clone is created almost instantly regardless of database size and consumes minimal additional storage initially. It is far faster and cheaper than restoring a snapshot."
        },
        {
            "id": "q14",
            "type": "single",
            "prompt": "A company operates a globally distributed application and needs an Aurora database that provides low-latency reads in multiple AWS regions with a recovery point objective (RPO) of less than 1 second and a recovery time objective (RTO) of less than 1 minute. Which Aurora feature should they use?",
            "options": [
                "Aurora Multi-AZ with cross-region Read Replicas",
                "Aurora Global Database",
                "Aurora Serverless with multi-region deployment",
                "Aurora with AWS Database Migration Service"
            ],
            "correctOptionIndex": 1,
            "explanation": "Aurora Global Database spans multiple AWS regions, with one primary region handling writes and up to 5 secondary regions serving low-latency reads. Replication uses a dedicated storage-level replication layer with typical lag under 1 second. In a disaster scenario, a secondary region can be promoted to primary in under 1 minute, achieving RPO < 1 second and RTO < 1 minute."
        },
        {
            "id": "q15",
            "type": "single",
            "prompt": "A startup runs a small internal tool whose database is idle for most of the day but must be available instantly when accessed. They want to minimize database costs. Which Aurora option is MOST cost-effective?",
            "options": [
                "Aurora with the db.t3.micro instance class",
                "Aurora Serverless v2 with a minimum capacity of 0.5 ACUs",
                "RDS MySQL with automated start/stop scheduling",
                "Aurora with Reserved Instance pricing"
            ],
            "correctOptionIndex": 1,
            "explanation": "Aurora Serverless v2 scales capacity in fine-grained increments, including to a near-zero minimum (0.5 ACUs), reducing cost during idle periods while remaining instantly available. It scales back up immediately when demand spikes. This avoids paying for a provisioned instance running at low utilization. Aurora Serverless v2 keeps the cluster active (no cold start delay unlike v1 pause mode)."
        },
        {
            "id": "q16",
            "type": "multiple",
            "prompt": "A company is evaluating Amazon Aurora Serverless v2 for their SaaS platform where each customer tenant has unpredictable, variable workloads. Which of the following are valid characteristics of Aurora Serverless v2? (Choose two.)",
            "options": [
                "Scales compute capacity in fine-grained increments (0.5 ACU steps) within seconds",
                "Requires a minimum of 10 ACUs to maintain high availability",
                "Can be used as an Aurora Read Replica alongside provisioned instances in the same cluster",
                "Does not support Multi-AZ or automatic failover"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Aurora Serverless v2 scales in 0.5 ACU steps within seconds based on actual load, making it ideal for variable workloads. Crucially, Serverless v2 instances can coexist with provisioned instances in the same Aurora cluster and can serve as Read Replicas. Aurora Serverless v2 fully supports Multi-AZ and automatic failover, unlike Serverless v1."
        },
        {
            "id": "q17",
            "type": "single",
            "prompt": "A DynamoDB table experiences hot partition issues because the majority of requests target items where the partition key is the current date. What is the BEST solution to distribute the load more evenly?",
            "options": [
                "Switch from provisioned to on-demand capacity mode",
                "Add a random numeric suffix (1–10) to the partition key to create write sharding",
                "Enable DynamoDB Streams to distribute writes asynchronously",
                "Increase the provisioned write capacity units to the maximum"
            ],
            "correctOptionIndex": 1,
            "explanation": "Write sharding — appending a random suffix to the partition key — distributes writes across multiple partitions. For example, instead of partition key '2024-01-15', you store '2024-01-15_1' through '2024-01-15_10', spreading load across 10 partitions. On-demand mode handles traffic spikes automatically but still routes all requests for the same partition key to the same partition, so it does not solve hot partition issues."
        },
        {
            "id": "q18",
            "type": "single",
            "prompt": "An application reads from DynamoDB and requires response times in the microsecond range (sub-millisecond) for frequently accessed data. What should be added to achieve this without changing the application's data model?",
            "options": [
                "Enable DynamoDB Streams and cache results in S3",
                "DynamoDB Accelerator (DAX) as an in-memory cache",
                "ElastiCache Redis in front of DynamoDB",
                "Increase DynamoDB read capacity units to the maximum"
            ],
            "correctOptionIndex": 1,
            "explanation": "DAX is a fully managed, in-memory cache for DynamoDB that delivers microsecond read performance. It is API-compatible with DynamoDB, so applications require minimal code changes (just point to the DAX cluster endpoint instead of DynamoDB). ElastiCache requires custom caching logic. Increasing RCUs does not reduce latency below DynamoDB's inherent millisecond range."
        },
        {
            "id": "q19",
            "type": "multiple",
            "prompt": "A global e-commerce company needs their DynamoDB order table to be active-active across us-east-1 and eu-west-1. Which of the following are requirements or characteristics of DynamoDB Global Tables? (Choose two.)",
            "options": [
                "DynamoDB Streams must be enabled on the table",
                "All replica tables must use the same primary key schema across regions",
                "Global Tables only support eventually consistent reads in all replicas",
                "Conflict resolution requires a custom Lambda function"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "DynamoDB Global Tables require Streams to be enabled (they use Streams to replicate changes between regions). All replica tables must share the same partition and sort key schema. Global Tables support eventually consistent reads, but also support strongly consistent reads within the local region. Conflict resolution uses a last-writer-wins strategy automatically — no custom Lambda is needed."
        },
        {
            "id": "q20",
            "type": "single",
            "prompt": "A web application stores user sessions as DynamoDB items. Sessions that have not been accessed in 24 hours should be automatically removed to control table size and cost. Which feature achieves this with no application code?",
            "options": [
                "DynamoDB Streams with a Lambda function that deletes old items",
                "DynamoDB Time to Live (TTL)",
                "Scheduled EventBridge rule that runs a DynamoDB scan and batch delete",
                "DynamoDB conditional writes with expiration logic"
            ],
            "correctOptionIndex": 1,
            "explanation": "DynamoDB TTL lets you define a per-item timestamp attribute. When the current time surpasses that timestamp, DynamoDB automatically deletes the item within 48 hours, at no extra cost. It is the simplest and most cost-effective approach for session expiration. Lambda-based solutions add complexity and cost; TTL requires no additional code."
        },
        {
            "id": "q21",
            "type": "single",
            "prompt": "A company launches a new application and cannot accurately predict database traffic. They need DynamoDB to automatically handle any read/write traffic level without managing capacity. Which capacity mode should they select?",
            "options": [
                "Provisioned mode with Auto Scaling enabled",
                "On-demand mode",
                "Provisioned mode with reserved capacity",
                "Provisioned mode with the maximum supported throughput"
            ],
            "correctOptionIndex": 1,
            "explanation": "DynamoDB on-demand mode automatically accommodates workloads as they ramp up or down, with no capacity planning required. You pay per request rather than for provisioned throughput. It is ideal for unpredictable or highly variable workloads. Provisioned with Auto Scaling reacts to sustained traffic changes but has a slower scaling response and cannot accommodate sudden spikes as effectively."
        },
        {
            "id": "q22",
            "type": "single",
            "prompt": "A Lambda function must be triggered in near real-time whenever an item in a DynamoDB table is created, updated, or deleted to sync changes to a downstream system. Which feature enables this?",
            "options": [
                "DynamoDB TTL with Lambda integration",
                "DynamoDB Streams",
                "DynamoDB Global Tables",
                "DynamoDB Accelerator (DAX)"
            ],
            "correctOptionIndex": 1,
            "explanation": "DynamoDB Streams captures a time-ordered sequence of item-level changes in a table. Each change record (INSERT, MODIFY, REMOVE) is available in the stream for up to 24 hours. Lambda can be configured as a stream processor, triggering on each batch of records. This is the standard pattern for event-driven architectures built on DynamoDB."
        },
        {
            "id": "q23",
            "type": "single",
            "prompt": "An application performs a DynamoDB GetItem with the default read consistency. A write that occurred 50ms ago is not reflected in the response. Why does this happen, and how can it be fixed?",
            "options": [
                "DynamoDB caches all reads for 60 seconds; enable DAX bypass to fix it",
                "Default reads are eventually consistent; use strongly consistent reads to always reflect the latest write",
                "The item was not replicated to the local partition yet; increase read capacity units",
                "DynamoDB requires a GSI to perform consistent reads on non-key attributes"
            ],
            "correctOptionIndex": 1,
            "explanation": "DynamoDB defaults to eventually consistent reads, which may not reflect very recent writes as data propagates across storage nodes. By setting ConsistentRead=true, the read is directed to the leader storage node and returns the most up-to-date data. Strongly consistent reads consume 2x the Read Capacity Units compared to eventually consistent reads."
        },
        {
            "id": "q24",
            "type": "multiple",
            "prompt": "A solutions architect is designing a DynamoDB data model for a high-traffic application. Which of the following are DynamoDB best practices? (Choose two.)",
            "options": [
                "Choose a high-cardinality attribute as the partition key to distribute data evenly",
                "Use one DynamoDB table per entity type to keep the data model normalized",
                "Design access patterns upfront and model the table to support them with a single-table design",
                "Always use the item ID as both the partition key and sort key for all entity types"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "A high-cardinality partition key (e.g., UUID, user ID) distributes items evenly across partitions, preventing hot spots. Single-table design — placing multiple entity types in one table and modeling relationships with composite sort keys and GSIs — is the recommended pattern for DynamoDB because it minimizes round trips and supports complex access patterns efficiently."
        },
        {
            "id": "q25",
            "type": "single",
            "prompt": "A company needs an in-memory cache that supports pub/sub messaging, Lua scripting, sorted sets for leaderboards, and automatic failover with Multi-AZ replication. Which ElastiCache engine meets all these requirements?",
            "options": [
                "ElastiCache for Memcached",
                "ElastiCache for Redis",
                "Amazon DynamoDB DAX",
                "Amazon MemoryDB for Redis"
            ],
            "correctOptionIndex": 1,
            "explanation": "ElastiCache for Redis supports rich data structures (sorted sets, hashes, lists, bitmaps), pub/sub messaging, Lua scripting, persistence, and Multi-AZ automatic failover. Memcached is a simpler key-value cache with no persistence, replication, or complex data structures. DAX is purpose-built only for DynamoDB."
        },
        {
            "id": "q26",
            "type": "single",
            "prompt": "An application uses ElastiCache for Memcached. The team now needs to add session persistence, encryption in transit and at rest, and automatic failover. What is the BEST course of action?",
            "options": [
                "Enable Multi-AZ on the existing Memcached cluster",
                "Add more Memcached nodes and enable replication groups",
                "Migrate to ElastiCache for Redis",
                "Enable Memcached backup and restore"
            ],
            "correctOptionIndex": 2,
            "explanation": "Memcached does not support replication, failover, persistence, or encryption. These are features native to ElastiCache for Redis. The only way to get these capabilities in ElastiCache is to migrate to a Redis cluster. Memcached is designed for simple, horizontally scalable caching without durability requirements."
        },
        {
            "id": "q27",
            "type": "multiple",
            "prompt": "A team is using ElastiCache for Redis and wants to understand its capabilities. Which of the following are correct about ElastiCache for Redis? (Choose two.)",
            "options": [
                "Redis supports Multi-AZ with automatic failover using a primary and replica nodes",
                "Redis Cluster mode disabled limits data to a single shard with up to 5 read replicas",
                "Redis does not support any form of data persistence",
                "Redis Cluster mode only supports a maximum of 3 shards"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "ElastiCache Redis supports Multi-AZ with automatic failover. In non-cluster mode (cluster mode disabled), the data lives on a single shard with a primary node and up to 5 read replicas, providing read scaling and failover. Redis supports persistence via RDB snapshots and AOF (append-only file). Redis Cluster mode supports up to 500 nodes across up to 500 shards."
        },
        {
            "id": "q28",
            "type": "single",
            "prompt": "A high-traffic web application fetches product catalog data from RDS on every request. The catalog changes rarely (once per hour). What caching strategy minimizes RDS load while ensuring the cache is eventually consistent?",
            "options": [
                "Write-through: update cache and database simultaneously on every write",
                "Lazy loading (cache-aside): fetch from RDS on cache miss, cache the result, serve from cache on hit",
                "Write-around: write directly to RDS and bypass the cache entirely",
                "Read-through: have the cache layer query RDS automatically on every request"
            ],
            "correctOptionIndex": 1,
            "explanation": "Lazy loading (cache-aside) only populates the cache when data is actually requested and not found (cache miss). Subsequent reads for the same data are served from the cache, dramatically reducing RDS queries. It is ideal for read-heavy, infrequently changing data. Write-through keeps the cache always up to date but may cache data that is never read."
        },
        {
            "id": "q29",
            "type": "single",
            "prompt": "A gaming company needs a real-time leaderboard that ranks millions of players by score, supports instant rank lookups, and updates scores with sub-millisecond latency. Which AWS service and data structure is BEST suited for this?",
            "options": [
                "Amazon RDS MySQL with an indexed score column",
                "Amazon DynamoDB with a GSI on the score attribute",
                "Amazon ElastiCache for Redis using Sorted Sets (ZADD/ZRANK)",
                "Amazon Redshift with a ranked analytical query"
            ],
            "correctOptionIndex": 2,
            "explanation": "Redis Sorted Sets (ZSET) are purpose-built for leaderboards. ZADD adds/updates a member with a score in O(log N) time, ZRANK returns a member's rank, and ZRANGE returns top-N players — all at sub-millisecond latency. ElastiCache for Redis is the canonical AWS service for real-time leaderboards."
        },
        {
            "id": "q30",
            "type": "single",
            "prompt": "A company has an existing application built on MongoDB 4.0 and wants to migrate to a fully managed AWS service with MongoDB API compatibility, automated backups, and up to 15 read replicas. Which service should they choose?",
            "options": [
                "Amazon RDS MySQL",
                "Amazon DynamoDB",
                "Amazon DocumentDB (with MongoDB compatibility)",
                "Amazon Aurora PostgreSQL"
            ],
            "correctOptionIndex": 2,
            "explanation": "Amazon DocumentDB is a fully managed document database with MongoDB compatibility. It supports the MongoDB 4.0 API, allows existing MongoDB drivers and tools to connect, provides automated backups, point-in-time recovery, and up to 15 read replicas. It separates compute and storage like Aurora, providing a scalable, managed alternative for MongoDB workloads."
        },
        {
            "id": "q31",
            "type": "single",
            "prompt": "A content management platform stores articles, metadata, and nested comments as flexible, schema-less records that vary in structure. Which database type is MOST appropriate?",
            "options": [
                "Amazon RDS PostgreSQL for its JSONB column support",
                "Amazon DocumentDB for native JSON document storage",
                "Amazon Redshift for its columnar storage",
                "Amazon Keyspaces for its wide-column model"
            ],
            "correctOptionIndex": 1,
            "explanation": "Amazon DocumentDB is designed for JSON document workloads where records have flexible, nested, and variable schemas. It natively stores, indexes, and queries JSON documents, making it ideal for content management, catalogs, and user profiles. While RDS PostgreSQL supports JSONB, DocumentDB is the fully managed, purpose-built document database on AWS."
        },
        {
            "id": "q32",
            "type": "single",
            "prompt": "A startup has an existing Apache Cassandra cluster running on-premises and wants to migrate to AWS. They need a fully managed service that is compatible with Cassandra Query Language (CQL) so the application requires minimal code changes. Which service should they use?",
            "options": [
                "Amazon DynamoDB",
                "Amazon DocumentDB",
                "Amazon Keyspaces (for Apache Cassandra)",
                "Amazon Neptune"
            ],
            "correctOptionIndex": 2,
            "explanation": "Amazon Keyspaces is a scalable, serverless, and highly available managed database service that is compatible with Apache Cassandra. Applications can use their existing CQL drivers and Cassandra tooling to connect to Keyspaces with minimal changes. DynamoDB is a different NoSQL model (key-value/document) and is not Cassandra-compatible."
        },
        {
            "id": "q33",
            "type": "single",
            "prompt": "Which of the following BEST describes Amazon Keyspaces (for Apache Cassandra)?",
            "options": [
                "A fully managed graph database compatible with Gremlin and SPARQL",
                "A serverless, scalable, highly available wide-column database compatible with Apache Cassandra CQL",
                "A managed in-memory key-value cache for Cassandra workloads",
                "A relational database with Cassandra-compatible SQL dialect"
            ],
            "correctOptionIndex": 1,
            "explanation": "Amazon Keyspaces is a serverless, fully managed database service that provides Apache Cassandra compatibility using CQL (Cassandra Query Language). It automatically scales tables up or down with virtually unlimited throughput and storage. You pay per actual read/write and storage used, with no servers to manage — ideal for Cassandra migrations to AWS."
        },
        {
            "id": "q34",
            "type": "single",
            "prompt": "A social media company is building a feature to recommend friends-of-friends and detect communities within their user network. Queries must traverse multiple levels of relationships efficiently. Which AWS database service is BEST suited for this?",
            "options": [
                "Amazon RDS with recursive SQL CTEs",
                "Amazon DynamoDB with adjacency list pattern",
                "Amazon Neptune",
                "Amazon Redshift with graph extensions"
            ],
            "correctOptionIndex": 2,
            "explanation": "Amazon Neptune is a fully managed graph database optimized for storing and querying highly connected data. Graph traversal queries (e.g., friends-of-friends, shortest paths, community detection) that would require many expensive joins in a relational database are native operations in Neptune. Neptune supports Property Graph (via Gremlin and openCypher) and RDF (via SPARQL)."
        },
        {
            "id": "q35",
            "type": "single",
            "prompt": "A fraud detection system needs to identify suspicious transaction patterns by analyzing relationships between accounts, devices, and transactions in real time. Which database model and AWS service is MOST appropriate?",
            "options": [
                "Relational model using Amazon Aurora",
                "Document model using Amazon DocumentDB",
                "Graph model using Amazon Neptune",
                "Wide-column model using Amazon Keyspaces"
            ],
            "correctOptionIndex": 2,
            "explanation": "Fraud detection relies on finding unusual patterns in relationships — e.g., multiple accounts sharing a device, or circular money transfers. Graph databases excel at traversing these entity relationships efficiently. Amazon Neptune stores entities as nodes and relationships as edges, making it ideal for fraud detection, identity graphs, and network analysis."
        },
        {
            "id": "q36",
            "type": "multiple",
            "prompt": "A company is evaluating Amazon Neptune for a knowledge graph application. Which of the following are valid characteristics of Amazon Neptune? (Choose two.)",
            "options": [
                "Neptune supports both Property Graph (Gremlin, openCypher) and RDF graph models (SPARQL)",
                "Neptune uses a relational storage engine optimized for graph queries",
                "Neptune stores up to 15 read replicas across up to 3 Availability Zones",
                "Neptune only supports the Gremlin traversal language"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Neptune supports two graph models: Property Graph (queried with Gremlin or openCypher) and RDF (queried with SPARQL). Neptune replicates data across 3 AZs with up to 15 read replicas, similar to Aurora's storage architecture. Neptune uses a purpose-built graph-optimized storage engine, not a traditional relational engine."
        },
        {
            "id": "q37",
            "type": "single",
            "prompt": "A business intelligence team needs to run complex aggregation queries across 10 years of sales data (50 TB) with joins across multiple fact and dimension tables. Query performance and cost efficiency at petabyte scale are the primary requirements. Which AWS service is MOST appropriate?",
            "options": [
                "Amazon RDS PostgreSQL with read replicas",
                "Amazon Aurora PostgreSQL",
                "Amazon DynamoDB with parallel scans",
                "Amazon Redshift"
            ],
            "correctOptionIndex": 3,
            "explanation": "Amazon Redshift is a petabyte-scale cloud data warehouse optimized for OLAP (Online Analytical Processing) — complex aggregations, multi-table joins, and BI queries over large datasets. It uses columnar storage, massively parallel processing (MPP), and compression to deliver fast analytical query performance. RDS and Aurora are OLTP databases, not designed for petabyte-scale analytics."
        },
        {
            "id": "q38",
            "type": "single",
            "prompt": "A data analytics team wants to run SQL queries directly against Parquet files stored in Amazon S3 without loading the data into Redshift tables. Which Redshift feature enables this?",
            "options": [
                "Redshift Concurrency Scaling",
                "Redshift Enhanced VPC Routing",
                "Redshift Spectrum",
                "Redshift AQUA (Advanced Query Accelerator)"
            ],
            "correctOptionIndex": 2,
            "explanation": "Redshift Spectrum extends Redshift SQL queries to data stored in S3 without requiring the data to be loaded into Redshift. You define external tables that reference S3 data, and Spectrum pushes query processing to thousands of Spectrum nodes close to the data. This is ideal for querying cold/archival data in S3 or running federated queries across S3 and Redshift tables."
        },
        {
            "id": "q39",
            "type": "multiple",
            "prompt": "A company wants to optimize query performance on their Amazon Redshift cluster. Which of the following are valid performance optimization techniques? (Choose two.)",
            "options": [
                "Define appropriate distribution keys to minimize data movement across nodes during joins",
                "Enable Multi-AZ Read Replicas to offload analytical queries",
                "Define sort keys so Redshift can skip scanning irrelevant blocks (zone maps)",
                "Normalize the data model into Third Normal Form (3NF) to minimize storage"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Distribution keys determine how data is distributed across compute nodes — choosing a key used in frequent joins minimizes network data movement (the most expensive operation in MPP). Sort keys allow Redshift to skip irrelevant disk blocks using zone maps, reducing I/O. Redshift uses columnar storage and compression for efficiency, and denormalized/star schema models typically perform better than normalized 3NF models in a data warehouse."
        },
        {
            "id": "q40",
            "type": "single",
            "prompt": "A Redshift cluster experiences slow query performance during business hours when hundreds of concurrent users run BI queries simultaneously. What is the MOST appropriate Redshift feature to address this?",
            "options": [
                "Redshift Spectrum for offloading queries to S3",
                "Redshift Concurrency Scaling",
                "Adding more Redshift nodes to the cluster",
                "Enabling Enhanced VPC Routing"
            ],
            "correctOptionIndex": 1,
            "explanation": "Redshift Concurrency Scaling automatically adds transient cluster capacity when the main cluster's query queue fills up. Additional clusters handle the overflow queries, providing consistently fast performance for virtually unlimited concurrent users. You pay per second of usage. This is more cost-effective than permanently adding nodes that are idle most of the time."
        },
        {
            "id": "q41",
            "type": "single",
            "prompt": "A company needs to copy their Redshift cluster snapshots to a different AWS region for disaster recovery purposes. Which Redshift feature enables this?",
            "options": [
                "Redshift Global Database",
                "Cross-region snapshot copy configuration",
                "Redshift Spectrum cross-region queries",
                "Redshift Enhanced VPC Routing with cross-region peering"
            ],
            "correctOptionIndex": 1,
            "explanation": "Redshift supports automated cross-region snapshot copying. You configure a snapshot copy grant in the destination region (for encryption with a KMS key) and enable cross-region copy on the source cluster. Redshift then automatically copies both automated and manual snapshots to the destination region, enabling disaster recovery and regional migration."
        },
        {
            "id": "q42",
            "type": "multiple",
            "prompt": "A solutions architect is explaining Amazon Redshift to a team migrating from on-premises Oracle. Which of the following statements about Redshift are CORRECT? (Choose two.)",
            "options": [
                "Redshift uses columnar storage, which is optimized for analytical queries that aggregate specific columns",
                "Redshift is best suited for high-volume transactional (OLTP) workloads with many small reads and writes",
                "Redshift uses massively parallel processing (MPP) to distribute and parallelize query execution",
                "Redshift automatically indexes all columns for fast point lookups by primary key"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Redshift uses columnar storage (reads only the columns needed by a query, enabling high compression and fast aggregations) and MPP (queries are distributed across compute nodes and slices for parallel execution). Redshift is an OLAP system, not OLTP — it is optimized for complex analytical queries, not high-throughput small transactional reads and writes. Redshift uses sort keys and zone maps, not traditional row-level indexes."
        },
        {
            "id": "q43",
            "type": "single",
            "prompt": "A company is building a new application and must choose between Amazon RDS and Amazon DynamoDB. The application has a complex relational data model with many foreign key relationships and requires multi-table JOIN queries. Which service is MOST appropriate?",
            "options": [
                "Amazon DynamoDB — it scales better and supports all query patterns",
                "Amazon RDS — it supports SQL, complex joins, and relational integrity",
                "Amazon Redshift — it handles relational data most efficiently",
                "Amazon DocumentDB — it handles complex relationships natively"
            ],
            "correctOptionIndex": 1,
            "explanation": "When a data model is inherently relational with complex JOIN requirements and foreign key constraints, Amazon RDS is the correct choice. DynamoDB is a NoSQL service that does not support server-side JOINs or foreign keys — complex relational access patterns require denormalization or multiple round trips, which increases complexity. Use RDS for relational workloads, DynamoDB for simple, high-scale key-value or document workloads."
        },
        {
            "id": "q44",
            "type": "single",
            "prompt": "An IoT platform ingests 500,000 sensor readings per second from devices worldwide. Each reading is a small record with a device ID, timestamp, and metric value. Which database service handles this write throughput with the LEAST operational overhead?",
            "options": [
                "Amazon RDS MySQL with Provisioned IOPS",
                "Amazon Aurora PostgreSQL with Read Replicas",
                "Amazon DynamoDB in on-demand mode",
                "Amazon Redshift with Concurrency Scaling"
            ],
            "correctOptionIndex": 2,
            "explanation": "DynamoDB on-demand mode can handle millions of writes per second by automatically partitioning data across many storage nodes. It requires no capacity planning and scales seamlessly with demand. RDS and Aurora are OLTP databases constrained by single-instance write limits (typically tens of thousands of IOPS). Redshift is an OLAP warehouse, not designed for high-throughput individual record writes."
        },
        {
            "id": "q45",
            "type": "single",
            "prompt": "A company runs weekly analytics reports on their Aurora PostgreSQL production database, which causes query latency to spike for application users during the report execution. What is the MOST cost-effective solution to isolate analytics from production traffic?",
            "options": [
                "Upgrade the Aurora instance to a larger compute class",
                "Create an Aurora Read Replica and run analytics reports against it",
                "Enable Aurora Serverless for the production cluster",
                "Migrate analytics queries to Amazon RDS"
            ],
            "correctOptionIndex": 1,
            "explanation": "An Aurora Read Replica provides a separate endpoint and compute instance for read-only workloads. Directing analytics reports to the Read Replica isolates their resource consumption from the primary, preventing query latency spikes for application users. Aurora Replicas share the same underlying storage as the primary, so the replica is immediately consistent and costs less than running a separate database cluster."
        },
        {
            "id": "q46",
            "type": "single",
            "prompt": "A company needs to implement database caching such that every write to their RDS database is simultaneously written to ElastiCache, ensuring the cache is always up to date. Which caching pattern achieves this?",
            "options": [
                "Lazy loading (cache-aside)",
                "Write-through",
                "Read-through",
                "Cache eviction with TTL"
            ],
            "correctOptionIndex": 1,
            "explanation": "Write-through updates both the cache and the database simultaneously on every write operation. This ensures the cache is never stale — every read from the cache returns current data. The downside is slightly higher write latency (two writes per operation) and potential cache bloat (caching data that may never be read). It is the best pattern when cache freshness is critical."
        },
        {
            "id": "q47",
            "type": "single",
            "prompt": "A company has an RDS PostgreSQL database in us-east-1. EU-based users experience high read latency because all queries are served from the US region. What is the MOST appropriate solution to reduce read latency for EU users without changing the application's write behavior?",
            "options": [
                "Enable RDS Multi-AZ in eu-west-1",
                "Create a cross-region RDS Read Replica in eu-west-1 and direct EU read traffic to it",
                "Use Amazon Route 53 latency routing to redirect EU reads to a cached CloudFront distribution",
                "Deploy RDS Proxy in eu-west-1 to reduce connection overhead"
            ],
            "correctOptionIndex": 1,
            "explanation": "Cross-region RDS Read Replicas replicate data asynchronously from the primary to another region. EU users can read from the eu-west-1 replica endpoint with significantly lower latency. Writes still go to the primary in us-east-1. Multi-AZ is for failover within a region, not for cross-region reads. RDS Proxy reduces connection overhead but does not serve reads from a different region."
        },
        {
            "id": "q48",
            "type": "multiple",
            "prompt": "A team is choosing between Amazon RDS Multi-AZ and Aurora for a high-availability production workload. Which of the following are advantages of Aurora over standard RDS Multi-AZ? (Choose two.)",
            "options": [
                "Aurora supports up to 15 read replicas, each of which can be used for automatic failover",
                "RDS Multi-AZ supports more database engines than Aurora",
                "Aurora's storage is replicated 6 times across 3 AZs, tolerating loss of 2 copies without data loss",
                "Aurora Multi-AZ standby instances serve both read and write traffic"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Aurora supports up to 15 Read Replicas (vs 5 for RDS), all of which are failover targets prioritized by tier. Aurora's storage is replicated 6 ways across 3 AZs, tolerating loss of 2 storage copies without downtime (4 out of 6 copies needed for writes). Standard RDS Multi-AZ only maintains 1 standby replica (which cannot serve reads), whereas Aurora Replicas actively serve reads and are failover targets."
        },
        {
            "id": "q49",
            "type": "single",
            "prompt": "A healthcare company stores patient records in Amazon DynamoDB and requires that all data is encrypted at rest and in transit. They also need the ability to audit all API calls to the DynamoDB table. Which AWS services should be used together to meet these requirements?",
            "options": [
                "Enable DynamoDB encryption with AWS KMS, enable HTTPS endpoints, and use AWS CloudTrail",
                "Store data in an encrypted S3 bucket and query with Athena instead",
                "Enable DynamoDB Streams and export to an encrypted S3 bucket",
                "Use DAX with encryption and CloudWatch alarms for monitoring"
            ],
            "correctOptionIndex": 0,
            "explanation": "DynamoDB encrypts data at rest by default using AWS KMS (you can use an AWS-owned key, AWS-managed key, or CMK). All DynamoDB communications use HTTPS (TLS) for encryption in transit. AWS CloudTrail automatically logs all DynamoDB API calls (GetItem, PutItem, DeleteItem, etc.) for auditing. This combination satisfies encryption and audit requirements without architectural changes."
        },
        {
            "id": "q50",
            "type": "multiple",
            "prompt": "A solutions architect needs to select the right AWS database service for different workloads. Which of the following pairings correctly match the workload to the MOST appropriate service? (Choose two.)",
            "options": [
                "Graph relationship traversal (social network friends-of-friends) → Amazon Neptune",
                "Petabyte-scale OLAP data warehouse with complex SQL analytics → Amazon DynamoDB",
                "Serverless Apache Cassandra-compatible wide-column storage → Amazon Keyspaces",
                "High-frequency OLTP relational workload with complex joins → Amazon Redshift"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Neptune is the purpose-built graph database for relationship traversal (choice A is correct). Keyspaces provides serverless, managed Apache Cassandra-compatible wide-column storage (choice C is correct). DynamoDB is a NoSQL key-value/document store — not an OLAP data warehouse (Redshift is correct for OLAP). Redshift is an analytical data warehouse, not suited for high-frequency OLTP with complex joins (RDS/Aurora is correct for that)."
        }
    ]
};
