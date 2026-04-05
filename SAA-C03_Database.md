# AWS SAA-C03 — Database Services Study Guide

---

## 🗄️ Database Services Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                   AWS Database Services Map                           │
│                                                                       │
│  Relational (SQL)                                                     │
│  ┌─────────────┐  ┌─────────────────────┐  ┌──────────────────────┐ │
│  │  Amazon RDS │  │   Amazon Aurora     │  │  Aurora Serverless   │ │
│  │  (MySQL,    │  │   (MySQL/PostgreSQL  │  │  (auto-scale,        │ │
│  │  PostgreSQL,│  │   compatible,        │  │   pay per use)       │ │
│  │  Oracle,    │  │   5x/3x faster)     │  │                      │ │
│  │  SQL Server,│  │                     │  │                      │ │
│  │  MariaDB)   │  │                     │  │                      │ │
│  └─────────────┘  └─────────────────────┘  └──────────────────────┘ │
│                                                                       │
│  NoSQL                                                                │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  DynamoDB   │  │ DocumentDB  │  │  Keyspaces   │  │  Neptune  │ │
│  │  (key-value │  │ (MongoDB-   │  │  (Cassandra- │  │  (Graph   │ │
│  │   + doc)    │  │  compatible)│  │   compatible)│  │   DB)     │ │
│  └─────────────┘  └─────────────┘  └──────────────┘  └───────────┘ │
│                                                                       │
│  Caching / In-Memory                                                  │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  Amazon ElastiCache (Redis / Memcached)                      │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                       │
│  Analytics / Data Warehouse                                           │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  Amazon Redshift  (see Analytics study guide for full detail) │    │
│  └──────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🌟 1. Amazon Aurora

### What It Is
A **MySQL and PostgreSQL-compatible relational database** built for the cloud — delivers up to **5x the throughput of MySQL** and **3x the throughput of PostgreSQL** at a fraction of the cost of commercial databases.

### Aurora Architecture (Unique Cloud-Native Design)
```
┌──────────────────────────────────────────────────────────────────────┐
│                    Amazon Aurora Architecture                         │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  DB Cluster                                                  │    │
│  │                                                              │    │
│  │  ┌──────────────────┐    ┌──────────────────────────────┐   │    │
│  │  │  Primary Instance │    │   Aurora Replica(s)          │   │    │
│  │  │  (Read + Write)   │    │   (Read Only — up to 15)     │   │    │
│  │  │                  │    │                              │   │    │
│  │  │  Writer Endpoint │    │   Reader Endpoint            │   │    │
│  │  └────────┬─────────┘    └──────────────┬───────────────┘   │    │
│  │           │                             │                   │    │
│  │           └─────────────┬───────────────┘                   │    │
│  │                         │  Shared Distributed Storage       │    │
│  │  ┌──────────────────────▼──────────────────────────────┐   │    │
│  │  │  Aurora Storage Layer (auto-scales up to 128 TB)     │   │    │
│  │  │                                                      │   │    │
│  │  │  AZ-a       AZ-b       AZ-c                         │   │    │
│  │  │  [Copy 1]   [Copy 2]   [Copy 3]                     │   │    │
│  │  │  [Copy 4]   [Copy 5]   [Copy 6]                     │   │    │
│  │  │                                                      │   │    │
│  │  │  6 copies across 3 AZs — tolerates:                 │   │    │
│  │  │  • 2 copies lost: still write                        │   │    │
│  │  │  • 3 copies lost: still read                         │   │    │
│  │  └──────────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────┘
```

### Aurora Storage
| Feature | Detail |
|---|---|
| **Auto-scaling** | Starts at 10 GB, grows automatically up to **128 TB** |
| **6 copies across 3 AZs** | 2 copies per AZ; built-in redundancy |
| **Write quorum** | Needs 4/6 copies to write |
| **Read quorum** | Needs 3/6 copies to read |
| **Self-healing** | Scans and repairs data blocks automatically |
| **No storage management** | No need to provision storage in advance |

### Aurora Endpoints
| Endpoint | Routes To | Use For |
|---|---|---|
| **Cluster (Writer)** | Primary instance only | All writes; reads for fresh data |
| **Reader** | All read replicas (load balanced) | Read-heavy workloads |
| **Custom** | Subset of instances you define | Specific analytics or reporting replica |
| **Instance** | Specific individual instance | Direct connection for troubleshooting |

### Aurora Replicas
| Type | Max | Lag | Cross-Region |
|---|---|---|---|
| **Aurora Replicas** | 15 | ~10ms | ❌ (use Global Database) |
| **MySQL Read Replicas** | 5 | seconds | ✅ |
| **PostgreSQL Read Replicas** | 5 | seconds | ✅ |

### Aurora Key Features
| Feature | Description |
|---|---|
| **Failover** | Automatic in < 30 seconds; replica promoted to primary |
| **Backtrack** | Rewind database to a previous point in time (without restore) — MySQL only |
| **Aurora Global Database** | 1 primary region + up to 5 secondary regions; < 1s replication lag |
| **Multi-Master** | All nodes can write (active-active); MySQL only |
| **Aurora Machine Learning** | SQL queries call SageMaker or Comprehend directly |
| **Aurora Parallel Query** | Pushes query processing to storage layer for faster analytics |
| **RDS Proxy Integration** | Connection pooling for Lambda and serverless apps |

### Aurora Global Database
```
┌──────────────────────────────────────────────────────────────────────┐
│                    Aurora Global Database                             │
│                                                                       │
│  Primary Region (us-east-1)         Secondary Region (eu-west-1)    │
│  ┌────────────────────────────┐     ┌────────────────────────────┐  │
│  │  Primary Cluster           │     │  Secondary Cluster         │  │
│  │  (Read + Write)            │────▶│  (Read Only)               │  │
│  │                            │     │                            │  │
│  │  Writer + up to 15 Readers │     │  Up to 16 Readers          │  │
│  └────────────────────────────┘     └────────────────────────────┘  │
│                                                                       │
│  Replication: < 1 second lag  (storage-level, not binlog)           │
│  RPO: ~1 second    RTO: < 1 minute (promote secondary on failure)   │
│  Use: DR, low-latency global reads, business continuity             │
└──────────────────────────────────────────────────────────────────────┘
```

### Exam Key Points ✅
- **6 copies of data across 3 AZs** — not 3 copies; this is Aurora's key differentiator
- **Storage auto-scales** up to 128 TB — no manual provisioning
- **Up to 15 Aurora Replicas** with < 10ms replication lag vs primary
- **Reader Endpoint** load-balances across all read replicas
- **Failover < 30 seconds** — promotes a replica; DNS updates automatically
- **Backtrack** = rewind DB in-place (no restore from snapshot) — MySQL Aurora only
- **Global Database** = cross-region with < 1s lag; RPO ~1s, RTO < 1min
- **Aurora costs more per instance** than RDS but less infrastructure overhead
- **Aurora vs RDS**: Aurora = cloud-native, higher performance, automatic storage; RDS = traditional engine management model
- **Use when**: production relational workloads needing high availability, performance, and scalability

---

## ⚡ 2. Amazon Aurora Serverless

### What It Is
An **on-demand, auto-scaling configuration** for Aurora — automatically starts up, shuts down, and scales capacity up or down based on your application's needs.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                    Aurora Serverless Architecture                     │
│                                                                       │
│  Applications                                                         │
│       │                                                               │
│       ▼  SQL connection                                               │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Router Fleet (connection proxy layer)                        │   │
│  │  • Maintains connections during scaling                       │   │
│  │  • Routes to available capacity unit                          │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                      │                                                │
│                      ▼  Warm pool of capacity                         │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Aurora Capacity Units (ACUs)                                 │   │
│  │  Scale from min ACU → max ACU automatically                   │   │
│  │                                                               │   │
│  │  0 ACU (paused) ←→ 0.5 to 256 ACUs (v2)                     │   │
│  │                                                               │   │
│  │  Scales in < 1 second (v2) — no connection drops             │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                      │                                                │
│  Shared Aurora Storage Layer (same as provisioned Aurora)            │
└──────────────────────────────────────────────────────────────────────┘
```

### Aurora Serverless v1 vs v2
| Feature | v1 | v2 (Current) |
|---|---|---|
| **Scaling speed** | Minutes | < 1 second |
| **Scale-to-zero** | ✅ (pause after inactivity) | ❌ (min 0.5 ACU) |
| **Min ACU** | 0 (pause) | 0.5 |
| **Max ACU** | 256 | 256 |
| **Multi-AZ** | ❌ | ✅ |
| **Aurora Replicas** | ❌ | ✅ (up to 15) |
| **Global Database** | ❌ | ✅ |
| **Supported engines** | MySQL 5.6/5.7, PostgreSQL 10 | MySQL 8.0, PostgreSQL 13/14/15 |
| **Pricing** | Per ACU-second | Per ACU-second |

### Use Cases for Serverless
| Use Case | Why Serverless |
|---|---|
| **Development/test** | Pause when idle → $0 when not used |
| **Variable workloads** | Traffic spikes unpredictably |
| **Infrequently used apps** | Sleep most of the day |
| **Multi-tenant SaaS** | Per-tenant DB scaling |
| **New apps (unknown load)** | Start small, scale automatically |

### Exam Key Points ✅
- **v2 is the current standard** — near-instant scaling, Multi-AZ, replicas supported
- **v1 can pause to zero** (scale-to-zero) — v2 minimum is 0.5 ACU
- **Pricing per ACU-second** — pay only for actual usage (+ storage)
- **Same Aurora storage** as provisioned — same durability, backups, security
- **Access via RDS Proxy** or **Data API** (HTTP endpoint for stateless apps — v1 only)
- **Lambda + Aurora Serverless v1** commonly uses **Data API** (no persistent connection needed)
- **Use when**: intermittent, variable, or unpredictable workloads; dev/test environments

---

## 📄 3. Amazon DocumentDB

### What It Is
A **fully managed, MongoDB-compatible document database** — stores, queries, and indexes JSON data. AWS's proprietary implementation designed for scale and availability.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                      Amazon DocumentDB                                │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  DocumentDB Cluster                                          │    │
│  │                                                              │    │
│  │  ┌──────────────────┐  ┌──────────────────────────────────┐ │    │
│  │  │  Primary Instance │  │  Replica Instance(s) (up to 15) │ │    │
│  │  │  (Read + Write)   │  │  (Read Only)                    │ │    │
│  │  └──────────────────┘  └──────────────────────────────────┘ │    │
│  │                                                              │    │
│  │  Storage: Auto-scales 10 GB → 64 TB                         │    │
│  │  6 copies across 3 AZs (same model as Aurora)               │    │
│  │  Failover < 30 seconds                                       │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                       │
│  MongoDB Compatibility: MongoDB 3.6, 4.0, 5.0 API                   │
│  Use existing MongoDB drivers, tools, and code                       │
└──────────────────────────────────────────────────────────────────────┘
```

### DocumentDB vs MongoDB (Self-Managed)
| Aspect | DocumentDB | Self-Managed MongoDB |
|---|---|---|
| **Management** | Fully managed | You manage |
| **HA** | Built-in (6 copies, 3 AZs) | Manual replica sets |
| **Storage** | Auto-scales to 64 TB | Manual provisioning |
| **Backups** | Automated + PITR | Manual |
| **Compatibility** | MongoDB API compatible | Native MongoDB |
| **Advanced features** | Limited (no MongoDB Atlas features) | Full MongoDB features |

### Key Features
| Feature | Description |
|---|---|
| **MongoDB-compatible** | Use MongoDB drivers, Compass, mongosh |
| **JSON documents** | Store flexible, schema-less documents |
| **Indexing** | Secondary indexes, TTL indexes, partial indexes |
| **ACID transactions** | Multi-document transactions |
| **Change Streams** | Real-time change notification (like DynamoDB Streams) |
| **VPC-only** | No public endpoint — deployed in VPC |

### Exam Key Points ✅
- **DocumentDB = MongoDB-compatible** on AWS — use when migrating MongoDB workloads
- Same storage architecture as Aurora — **6 copies across 3 AZs**, auto-scales to 64 TB
- **NOT 100% MongoDB compatible** — some MongoDB features not supported (check compatibility matrix)
- DocumentDB is **NOT serverless** (Aurora Serverless is) — provision instance types
- **Change Streams** = capture and react to data changes (like DynamoDB Streams)
- **Use when**: "lift and shift" MongoDB apps, JSON document storage at scale, content management, catalogues

---

## ⚡ 4. Amazon DynamoDB

### What It Is
A **fully managed, serverless, key-value and document NoSQL database** — delivers single-digit millisecond performance at any scale with built-in security, backup, and replication.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                        Amazon DynamoDB                                │
│                                                                       │
│  Table: Orders                                                        │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Partition Key    Sort Key    Attribute A    Attribute B      │   │
│  │  (user_id)        (order_id)  (amount)       (status)        │   │
│  │  ───────────────────────────────────────────────────────     │   │
│  │  user_001         ord_1001    $50.00          PLACED          │   │
│  │  user_001         ord_1002    $120.00         SHIPPED         │   │
│  │  user_002         ord_2001    $30.00          DELIVERED       │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  Distributed across partitions (hashed by partition key)             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                          │
│  │Partition1│  │Partition2│  │Partition3│  ... auto-managed         │
│  │user_001  │  │user_002  │  │user_003  │                          │
│  └──────────┘  └──────────┘  └──────────┘                          │
└──────────────────────────────────────────────────────────────────────┘
```

### Data Model
| Concept | Description |
|---|---|
| **Table** | Collection of items |
| **Item** | A single row (up to 400 KB) |
| **Attribute** | A field/column |
| **Partition Key (PK)** | Required; distributes data across partitions |
| **Sort Key (SK)** | Optional; enables range queries within a partition |
| **LSI** | Local Secondary Index — alternate sort key; same partition key; must be created at table creation |
| **GSI** | Global Secondary Index — alternate PK+SK; can be added any time; own RCU/WCU |

### Read/Write Capacity Modes
| Mode | Description | Best For |
|---|---|---|
| **Provisioned** | Set RCU and WCU manually; can use Auto Scaling | Predictable traffic |
| **On-Demand** | Pay per request; no capacity planning | Unpredictable or spiky traffic |

#### Read Capacity Units (RCU)
- 1 RCU = **1 strongly consistent read** of up to 4 KB/s
- 1 RCU = **2 eventually consistent reads** of up to 4 KB/s
- 1 RCU = **1 transactional read** of up to 4 KB/s (costs 2 RCU)

#### Write Capacity Units (WCU)
- 1 WCU = **1 write** of up to 1 KB/s
- 1 WCU = **1 transactional write** of up to 1 KB/s (costs 2 WCU)

### DynamoDB Key Features

#### DynamoDB Streams
```
┌──────────────────────────────────────────────────────────────────────┐
│                      DynamoDB Streams                                 │
│                                                                       │
│  Table change (INSERT / MODIFY / REMOVE)                             │
│       │                                                               │
│       ▼                                                               │
│  DynamoDB Streams (ordered log of changes per shard)                 │
│       │  (24-hour retention)                                          │
│       │                                                               │
│       ├──▶  Lambda (event source mapping — real-time processing)     │
│       ├──▶  Kinesis Data Streams (via Kinesis Data Streams for DDB)  │
│       └──▶  DynamoDB Global Tables (cross-region replication)        │
│                                                                       │
│  Stream record contains: Keys, NewImage, OldImage, or both           │
└──────────────────────────────────────────────────────────────────────┘
```

#### DynamoDB Global Tables
- **Multi-region, multi-active** replication (all replicas can read AND write)
- **Requires DynamoDB Streams enabled**
- Conflict resolution: **last writer wins**
- **RPO < 1 second**, sub-second replication
- Use for: DR, low-latency global access, active-active multi-region

#### DynamoDB Accelerator (DAX)
```
  Application ──▶  DAX Cluster  ──▶  DynamoDB Table
                  (In-memory)
                  (microsecond latency for reads)
                  (item cache + query cache)
                  (no application code change for reads)
```
| Feature | DynamoDB Direct | With DAX |
|---|---|---|
| **Read latency** | Single-digit ms | Microseconds |
| **Write latency** | Single-digit ms | Same (writes go to DDB) |
| **Cache type** | None | Item cache + Query cache |
| **Consistency** | Strong or eventual | Eventually consistent only |
| **Cost** | Per RCU/WCU | DAX nodes + DDB |

#### TTL (Time to Live)
- Automatically **delete expired items** based on a timestamp attribute
- Free — no WCU consumed for TTL deletions
- Useful for: session data, temporary tokens, event logs

#### DynamoDB Transactions
- **TransactWriteItems** / **TransactGetItems** — all-or-nothing operations
- Across multiple items and tables in the same region
- Costs 2× RCU/WCU (transactional reads and writes)

#### Point-In-Time Recovery (PITR)
- Continuous backups; restore to any second in the last **35 days**
- **No performance impact** on table operations

### DynamoDB Design Patterns

#### Single Table Design
- Store multiple entity types in one table using PK/SK patterns
- Example: `PK = USER#123`, `SK = PROFILE` or `SK = ORDER#456`
- Enables efficient access patterns without JOINs

#### Access Patterns
| Operation | API | Cost |
|---|---|---|
| **Get by PK** | `GetItem` | 1 read |
| **Get by PK + SK** | `GetItem` | 1 read |
| **Query by PK** | `Query` | Reads only matching partition |
| **Query by PK + SK range** | `Query` with KeyConditionExpression | Efficient |
| **Full table scan** | `Scan` | Reads ALL items — expensive |
| **Query GSI** | `Query` on GSI | Uses GSI's RCU |

### Exam Key Points ✅
- **Serverless** — no infrastructure to manage; auto-scales; infinite scalability
- **Item max 400 KB** — store larger payloads in S3 and store S3 reference in DDB
- **LSI** = alternate sort key; same PK; created at table creation; can do strongly consistent reads
- **GSI** = completely different PK/SK; added anytime; only eventually consistent reads; own capacity
- **On-Demand mode** = pay per request; no throttling; 2.5x more expensive than provisioned at steady load
- **DynamoDB Streams + Lambda** = the standard event-driven pattern (similar to Kinesis)
- **Global Tables** = multi-active, multi-region; requires Streams; last writer wins on conflict
- **DAX** = read cache (microseconds); NOT for strongly consistent reads; NOT for writes caching
- **Scan is expensive** — avoid; always design access patterns to use Query
- **Hot partition problem** = all reads/writes to same partition key → use high-cardinality PK
- **Use when**: serverless applications, gaming leaderboards, session management, IoT telemetry, shopping carts

---

## 🚀 5. Amazon ElastiCache

### What It Is
A **fully managed in-memory caching service** supporting **Redis** and **Memcached** — improve application performance by retrieving data from fast in-memory caches instead of slower databases.

### Redis vs Memcached
```
┌──────────────────────────────────────────────────────────────────────┐
│                    ElastiCache: Redis vs Memcached                    │
│                                                                       │
│  Feature              │  Redis                  │  Memcached         │
│  ─────────────────────┼─────────────────────────┼─────────────────  │
│  Data structures      │  Rich (String, Hash,    │  Simple (String)  │
│                       │   List, Set, Sorted Set) │                   │
│  Persistence          │  ✅ (AOF, RDB snapshots) │  ❌               │
│  Replication          │  ✅ (primary + replicas) │  ❌               │
│  Multi-AZ / Failover  │  ✅ (auto-failover)     │  ❌               │
│  Pub/Sub messaging    │  ✅                      │  ❌               │
│  Lua scripting        │  ✅                      │  ❌               │
│  Sorted Sets          │  ✅ (leaderboards)       │  ❌               │
│  Backup / Restore     │  ✅                      │  ❌               │
│  Encryption at rest   │  ✅                      │  ❌               │
│  TLS in transit       │  ✅                      │  ✅               │
│  Multi-threading      │  ❌ (single-threaded)    │  ✅ (multi-thread)│
│  Horizontal scale     │  Cluster mode            │  Add nodes        │
│  HIPAA eligible       │  ✅                      │  ❌               │
│  Use when             │  Complex data, HA,       │  Simple caching,  │
│                       │   persistence needed     │  horizontal scale │
└──────────────────────────────────────────────────────────────────────┘
```

### Redis Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                   ElastiCache Redis Modes                             │
│                                                                       │
│  Cluster Mode DISABLED                 Cluster Mode ENABLED          │
│  ──────────────────────────            ────────────────────────────  │
│  ┌────────────────────────┐            ┌────────────────────────┐   │
│  │  Primary Node          │            │  Shard 1               │   │
│  │  + up to 5 Replicas    │            │  Primary + Replicas    │   │
│  │                        │            ├────────────────────────┤   │
│  │  Single shard          │            │  Shard 2               │   │
│  │  Max 6.5 TB storage    │            │  Primary + Replicas    │   │
│  │                        │            ├────────────────────────┤   │
│  │  Vertical scaling only │            │  Shard N (up to 500)   │   │
│  └────────────────────────┘            │  Primary + Replicas    │   │
│                                        └────────────────────────┘   │
│                                        Horizontal scaling            │
│                                        Up to 500 shards             │
│                                        > 100 TB possible            │
└──────────────────────────────────────────────────────────────────────┘
```

### Caching Strategies
| Strategy | How It Works | Use Case |
|---|---|---|
| **Lazy Loading (Cache-Aside)** | App checks cache → miss → load from DB → write to cache | General purpose; cache only what's requested |
| **Write-Through** | Write to cache AND DB simultaneously | Fresh data always in cache; more writes |
| **Write-Behind (Write-Back)** | Write to cache → async write to DB later | High write throughput; risk of data loss |
| **TTL-based expiry** | Set expiry time on cached items | Session management, rate limiting |

### Common Use Cases
| Use Case | Redis Data Structure |
|---|---|
| **Session store** | String (SETEX with TTL) |
| **Leaderboard / ranking** | Sorted Set (ZADD, ZRANGE) |
| **Rate limiting** | String with TTL + INCR |
| **Real-time analytics** | HyperLogLog |
| **Pub/Sub messaging** | Pub/Sub channels |
| **Cache DB queries** | String or Hash |
| **Distributed locks** | String with SETNX |

### ElastiCache + RDS Pattern
```
  Application
       │
       ├── Read ──▶ Check ElastiCache
       │               │
       │           Cache Hit ──▶ Return data (fast)
       │               │
       │           Cache Miss ──▶ Read from RDS
       │                              │
       │                         Write to ElastiCache
       │                              │
       │                         Return data
       │
       └── Write ──▶ Write to RDS ──▶ Invalidate or update cache
```

### Exam Key Points ✅
- **Redis = feature-rich**: persistence, replication, Multi-AZ, backups, sorted sets, pub/sub
- **Memcached = simple**: multi-threaded, horizontal scale, no persistence, no HA
- **Redis Cluster Mode** = horizontal sharding across up to 500 nodes
- **Redis Multi-AZ** = automatic failover to replica on primary failure
- **ElastiCache does NOT reduce write load on DB** — only reduces read load
- **Lazy loading** = stale data possible; **Write-through** = always fresh but writes cost more
- **Session caching** with ElastiCache = stateless application architecture (scale horizontally)
- **Redis Sorted Sets** = gaming leaderboards (most tested use case)
- **HIPAA compliance** with Redis (not Memcached)
- **Use when**: database read offloading, session management, real-time leaderboards, caching frequently accessed data

---

## 🔑 6. Amazon Keyspaces (for Apache Cassandra)

### What It Is
A **fully managed, serverless, Cassandra-compatible** database service — run Cassandra workloads on AWS without managing infrastructure.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                    Amazon Keyspaces                                   │
│                                                                       │
│  Cassandra Query Language (CQL) Compatible                           │
│       │  Use existing Cassandra drivers and tools                    │
│       ▼                                                               │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Keyspaces (like a Cassandra keyspace / database)             │   │
│  │  ┌────────────────────────────────────────────────────────┐  │   │
│  │  │  Table (wide-column format)                             │  │   │
│  │  │  Primary Key: Partition Key + Clustering Columns        │  │   │
│  │  └────────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  Serverless:  On-demand or provisioned capacity                      │
│  Replication: 3 copies across 3 AZs                                  │
│  Storage:     Auto-scales                                             │
│  Encryption:  At rest (KMS) + in transit (TLS)                      │
│  PITR:        35 days                                                 │
└──────────────────────────────────────────────────────────────────────┘
```

### Cassandra Data Model
| Concept | Description |
|---|---|
| **Wide-column** | Rows can have different columns; flexible schema |
| **Partition Key** | Distributes rows across nodes |
| **Clustering Columns** | Defines order within a partition |
| **CQL** | Cassandra Query Language — SQL-like syntax |

### Exam Key Points ✅
- **Keyspaces = Cassandra-compatible** — use when migrating Cassandra workloads to AWS
- **Serverless** — no cluster management; scales automatically
- **3 copies across 3 AZs** — high availability built-in
- **CQL compatible** — existing Cassandra drivers work without code changes
- **Use when**: migrating existing Cassandra apps, time-series data, IoT, large-scale high-throughput workloads

---

## 🕸️ 7. Amazon Neptune

### What It Is
A **fully managed graph database** — optimized for storing and querying highly connected data such as social networks, recommendation engines, fraud detection, and knowledge graphs.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                       Amazon Neptune                                  │
│                                                                       │
│  Graph Models                                                         │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐ │
│  │  Property Graph              │  │  RDF (Resource Description   │ │
│  │  (Nodes, Edges, Properties)  │  │   Framework)                 │ │
│  │  Query: Gremlin, openCypher  │  │  Query: SPARQL               │ │
│  │                              │  │                              │ │
│  │  Person──[KNOWS]──▶Person    │  │  Subject──Predicate──▶Object │ │
│  │  Person──[LIKES]──▶Movie     │  │  (semantic web, ontologies)  │ │
│  └──────────────────────────────┘  └──────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  Neptune Cluster                                             │    │
│  │  Primary Instance (R/W) + up to 15 Read Replicas            │    │
│  │  Storage: 6 copies across 3 AZs, auto-scales to 64 TB       │    │
│  │  Failover: < 30 seconds                                      │    │
│  └─────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────┘
```

### Graph Use Cases
| Use Case | Why Graph DB |
|---|---|
| **Social networks** | Friends-of-friends queries, connection analysis |
| **Recommendation engines** | "Customers who bought X also bought Y" |
| **Fraud detection** | Identify connected fraudulent accounts/transactions |
| **Knowledge graphs** | Entity relationships (Google Knowledge Graph model) |
| **Network topology** | IT infrastructure dependency mapping |
| **Drug interaction** | Healthcare relationships between drugs/conditions |

### Neptune Analytics
- **In-memory** graph analytics engine for fast analytical graph queries
- Works alongside Neptune Database
- Graph algorithms: PageRank, community detection, shortest path
- Import from S3 or directly from Neptune Database

### Neptune Streams
- Change-data-capture stream for Neptune
- Lambda can consume Neptune Streams for real-time event processing

### Exam Key Points ✅
- **Neptune = graph database** — queries relationships between entities efficiently
- Uses **Gremlin** (property graph traversal) or **SPARQL** (RDF) or **openCypher**
- Same storage model as Aurora — **6 copies across 3 AZs**, auto-scales to 64 TB
- **Up to 15 read replicas**, < 30s failover
- **Neptune Serverless** — auto-scales graph database capacity
- **Use when**: social graphs, fraud detection, recommendation engines, knowledge graphs, anything with complex relationships between entities

---

## 🗃️ 8. Amazon RDS (Relational Database Service)

### What It Is
A **managed relational database service** supporting multiple engines — AWS handles provisioning, patching, backups, and replication while you focus on your schema and queries.

### Supported Engines
| Engine | Version Support | Notes |
|---|---|---|
| **MySQL** | 5.7, 8.0 | Most popular |
| **PostgreSQL** | 12–16 | Open source, feature-rich |
| **MariaDB** | 10.x | MySQL fork; open source |
| **Oracle** | 12c, 19c, 21c | BYOL or license-included |
| **SQL Server** | 2017, 2019, 2022 | Windows auth, SSRS |
| **Db2** | 11.5 | IBM Db2 (newer addition) |

### RDS Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                        Amazon RDS                                     │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  RDS Multi-AZ (High Availability)                            │    │
│  │                                                              │    │
│  │  AZ-1a (Primary)          AZ-1b (Standby)                   │    │
│  │  ┌────────────────┐       ┌────────────────┐                │    │
│  │  │  Primary DB    │──────▶│  Standby DB    │                │    │
│  │  │  (R/W)         │ Sync  │  (No reads!)   │                │    │
│  │  │                │ repl  │                │                │    │
│  │  └────────────────┘       └────────────────┘                │    │
│  │           │                                                  │    │
│  │   DNS Endpoint (auto-switches on failover ~60-120 seconds)   │    │
│  │                                                              │    │
│  │  ┌───────────────────────────────────────────────────────┐  │    │
│  │  │  EBS Storage (gp2, gp3, io1, io2)                     │  │    │
│  │  │  Storage Auto Scaling (enabled → grows automatically)  │  │    │
│  │  └───────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────┘
```

### RDS Multi-AZ vs Read Replicas
```
┌──────────────────────────────────────────────────────────────────────┐
│                  Multi-AZ vs Read Replicas                            │
│                                                                       │
│  Feature          │  Multi-AZ                │  Read Replicas        │
│  ─────────────────┼──────────────────────────┼───────────────────── │
│  Purpose          │  High Availability       │  Scalability / reads  │
│  Replication      │  Synchronous             │  Asynchronous         │
│  Standby readable │  ❌ (not for reads!)     │  ✅ (read-only)       │
│  Failover         │  Automatic (~60-120s)    │  Manual promotion     │
│  Cross-region     │  ❌ (same region)        │  ✅ (cross-region)    │
│  Lag              │  None (sync)             │  Seconds to minutes   │
│  Use for          │  DR, automatic failover  │  Offload reads, DR    │
│  Max count        │  1 standby               │  5 (15 for Aurora)    │
└──────────────────────────────────────────────────────────────────────┘
```

### RDS Read Replicas
- **Asynchronous replication** from primary
- Can be in **same region, cross-region, or cross-AZ**
- Up to **5 read replicas** per RDS instance
- Can be **promoted** to standalone DB (breaks replication)
- **Replication is free** within same region; charged cross-region

### RDS Backups
| Type | Description | Retention |
|---|---|---|
| **Automated** | Daily snapshot + transaction logs; PITR | 1–35 days |
| **Manual Snapshot** | User-initiated; stored until you delete | Indefinite |
| **Restore** | Creates new DB instance from backup | Always a new instance |

### RDS Storage
| Storage Type | IOPS | Use Case |
|---|---|---|
| **gp2** | 3 IOPS/GB, burst 3000 | General purpose (legacy) |
| **gp3** | 3000 IOPS baseline, up to 16,000 | Recommended default |
| **io1/io2** | Up to 64,000 IOPS | High-performance, OLTP |
| **Magnetic** | Low | Legacy; avoid |

**Storage Auto Scaling** — enable to automatically grow storage when < 10% free (no downtime).

### RDS Security
| Feature | Description |
|---|---|
| **Encryption at rest** | KMS (must enable at creation; cannot change later) |
| **Encryption in transit** | SSL/TLS |
| **VPC** | RDS deployed in VPC; use private subnets |
| **Security Groups** | Control inbound access to DB port |
| **IAM Database Authentication** | Use IAM token instead of password (MySQL, PostgreSQL) |
| **Secrets Manager** | Auto-rotate DB credentials |

### RDS Proxy
```
  Lambda / Apps
       │  Many short-lived connections
       ▼
  RDS Proxy (connection pooling)
       │  Maintained pool of persistent connections
       ▼
  RDS / Aurora
```

| Feature | Description |
|---|---|
| **Connection pooling** | Reduce DB connections from Lambda/containers |
| **Failover improvement** | Proxy preserves connections during Multi-AZ failover (66% reduction) |
| **IAM auth** | Enforce IAM authentication |
| **Secrets Manager** | Integrates for credential management |
| **VPC only** | Proxy endpoint is VPC-accessible only |

### RDS Custom
- Run Oracle or SQL Server with OS-level access
- SSH/RDP access to underlying EC2 instance
- Install custom software, agents, patches
- **Use when**: applications requiring OS-level access or custom configurations

### RDS vs Aurora — Key Differences
| Feature | RDS | Aurora |
|---|---|---|
| **Storage** | EBS-backed, manual/auto-scale | Distributed, auto to 128 TB |
| **Replicas** | 5 read replicas | 15 Aurora replicas, < 10ms lag |
| **Failover** | 60–120 seconds (Multi-AZ) | < 30 seconds |
| **Backtrack** | ❌ | ✅ (MySQL) |
| **Global DB** | ❌ | ✅ |
| **Serverless** | ❌ | ✅ (Aurora Serverless) |
| **Cost** | Lower instance cost | Higher but less storage overhead |
| **Multi-Master** | ❌ | ✅ (MySQL) |

### Exam Key Points ✅
- **Multi-AZ standby is NOT readable** — it's for failover only; use read replicas for reads
- **Multi-AZ failover** flips DNS to standby (~60–120 seconds); application reconnects
- **Read Replica promotion** = manual; breaks async replication; creates standalone DB
- **Encryption must be enabled at creation** — cannot encrypt an existing unencrypted DB (must snapshot → copy encrypted → restore)
- **IAM Database Authentication** — available for MySQL and PostgreSQL; token-based auth
- **RDS Proxy** = essential for Lambda workloads (prevents connection exhaustion)
- **Storage Auto Scaling** = grows automatically; never shrinks
- **PITR** = restore to any second in retention window (1–35 days); creates new instance
- **Read Replicas in another region** = cross-region DR + lower latency reads
- **Use when**: relational workloads, OLTP, existing SQL applications, Oracle/SQL Server migrations

---

## 🏢 9. Amazon Redshift

### What It Is
A **fully managed, petabyte-scale cloud data warehouse** — optimized for OLAP using columnar storage and massively parallel processing (MPP).

> 📌 **See Analytics Study Guide** for full Redshift coverage including:
> - MPP architecture (Leader Node + Compute Nodes + Slices)
> - Node types (RA3, DC2)
> - Distribution styles (EVEN, KEY, ALL, AUTO)
> - COPY command (bulk loading)
> - Redshift Spectrum (query S3)
> - Redshift Serverless
> - Snapshots + cross-region backup
> - Concurrency Scaling
> - Data Sharing
> - Enhanced VPC Routing

### Redshift in Database Context
```
┌──────────────────────────────────────────────────────────────────────┐
│                Redshift vs Other Database Services                    │
│                                                                       │
│  Workload Type      │  Service                                       │
│  ───────────────────┼──────────────────────────────────────────────  │
│  OLAP (analytics)   │  Redshift (data warehouse)                    │
│  OLTP (transactions)│  RDS / Aurora                                  │
│  Key-value / docs   │  DynamoDB                                      │
│  Graph relationships│  Neptune                                       │
│  In-memory cache    │  ElastiCache                                   │
│  MongoDB workloads  │  DocumentDB                                    │
│  Cassandra workloads│  Keyspaces                                     │
└──────────────────────────────────────────────────────────────────────┘
```

### Exam Key Points ✅ (Database Context)
- **OLAP only** — not for OLTP row transactions; use RDS/Aurora for those
- **Columnar storage** — reads only columns needed; huge performance gain for analytics
- **COPY command** = always fastest bulk load method (from S3, DynamoDB, EMR)
- **Redshift Spectrum** = extend warehouse to query S3 data lake directly
- **Multi-AZ** supported for RA3 (dual-cluster deployment)

---

## 🔄 Quick Comparison: All Database Services

```
┌──────────────────────────────────────────────────────────────────────┐
│                  Database Selection Framework                         │
│                                                                       │
│  Scenario                               Service                      │
│  ─────────────────────────────────────  ──────────────────────────  │
│  Relational, OLTP, standard SQL         RDS (MySQL/PostgreSQL/etc.)  │
│  Relational, highest performance        Aurora                       │
│  Relational, variable/intermittent      Aurora Serverless v2         │
│  Relational, dev/test, pause when idle  Aurora Serverless v1         │
│  MongoDB workload migration             DocumentDB                   │
│  Cassandra workload migration           Keyspaces                    │
│  Key-value / document, serverless       DynamoDB                     │
│  DynamoDB reads need microseconds       DynamoDB + DAX               │
│  Graph relationships (social, fraud)    Neptune                      │
│  In-memory cache, session store         ElastiCache (Redis)          │
│  Simple caching, multi-threaded         ElastiCache (Memcached)      │
│  Leaderboard / ranking                  ElastiCache Redis Sorted Set │
│  Analytics / data warehouse (OLAP)      Redshift                     │
│  Ad-hoc SQL on S3 data lake             Athena                       │
│  Global distribution, multi-active      DynamoDB Global Tables       │
│  Cross-region with low latency          Aurora Global Database       │
│  Many connections from Lambda           RDS Proxy                    │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🚨 Common Exam Traps

1. **RDS Multi-AZ standby is NOT readable** — it exists only for automatic failover; read replicas are for read scaling
2. **Aurora has 6 copies across 3 AZs** — NOT 3 copies; 2 per AZ; write quorum = 4/6
3. **Aurora storage auto-scales** — no manual provisioning; grows to 128 TB automatically
4. **Cannot encrypt existing unencrypted RDS** — must snapshot → copy with encryption → restore
5. **DynamoDB LSI must be created at table creation** — cannot add later; GSI can be added anytime
6. **DynamoDB Scan is very expensive** — reads every item; always design for Query using PK/SK or GSI
7. **DAX is read-only cache** — writes still go directly to DynamoDB; DAX does NOT cache writes
8. **DAX only supports eventually consistent reads** — not for strongly consistent reads
9. **ElastiCache does NOT reduce write load** — only reads; writes always go to the database
10. **Redis Multi-AZ auto-failover** vs **Memcached = no failover** — Memcached has no replication or HA
11. **Aurora Serverless v2 minimum 0.5 ACU** — does NOT scale to zero; v1 can pause to zero
12. **RDS Read Replica promotion is manual** — not automatic failover; you must initiate promotion
13. **Cross-region read replicas incur data transfer cost** — replication within same region is free
14. **DynamoDB Global Tables requires Streams** — cannot enable Global Tables without Streams
15. **Neptune is not a general-purpose database** — purpose-built for graph queries; not for OLTP
16. **ElastiCache Redis Cluster Mode** = horizontal sharding (multiple shards); Cluster Mode Disabled = one shard with replicas
17. **RDS Proxy is VPC-only** — no public endpoint; all connections must come from within VPC
18. **Aurora Backtrack ≠ PITR** — Backtrack rewinds in-place (no new instance, MySQL only); PITR always restores to a new instance
19. **Keyspaces and DocumentDB are compatibility layers** — not 100% identical to Cassandra/MongoDB; some features unsupported
20. **DynamoDB On-Demand mode** = no throttling but costs ~2.5x more per request than well-tuned provisioned; not always cheaper

---

*Last updated for AWS SAA-C03 exam preparation*
