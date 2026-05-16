import type { ExamDefinition } from './types';

export const examAppIntegration: ExamDefinition = {
    "id": "exam_app_integration_saa_c03",
    "title": "SAA-C03 Practice Set on Application Integration",
    "description": "Scenario-driven questions covering Amazon SQS, SNS, EventBridge, MQ, AppFlow, AppSync, and Step Functions for the SAA-C03 exam.",
    "durationSeconds": 4800,
    "questions": [
        {
            "id": "q1",
            "type": "single",
            "prompt": "A company processes financial transactions and requires that messages are processed exactly once and in the exact order they are sent. Which Amazon SQS queue type should be used?",
            "options": [
                "Standard queue with message deduplication enabled",
                "FIFO queue with content-based deduplication",
                "Standard queue with visibility timeout set to 0",
                "FIFO queue with long polling disabled"
            ],
            "correctOptionIndex": 1,
            "explanation": "SQS FIFO queues guarantee exactly-once processing and strict ordering. Content-based deduplication uses a SHA-256 hash of the message body to automatically deduplicate messages. Standard queues offer at-least-once delivery and best-effort ordering, which does not satisfy the requirement."
        },
        {
            "id": "q2",
            "type": "single",
            "prompt": "An application reads messages from an SQS queue but occasionally fails to process them. Failed messages must not block other messages and should be retried later. What is the MOST appropriate solution?",
            "options": [
                "Increase the visibility timeout to 24 hours",
                "Configure a Dead Letter Queue (DLQ) with a maxReceiveCount of 3",
                "Enable long polling with a wait time of 20 seconds",
                "Set the message retention period to the maximum value"
            ],
            "correctOptionIndex": 1,
            "explanation": "A Dead Letter Queue captures messages that fail processing after a defined number of attempts (maxReceiveCount). This prevents poison-pill messages from blocking the queue while preserving them for inspection and retry. Increasing visibility timeout delays but does not isolate failures."
        },
        {
            "id": "q3",
            "type": "single",
            "prompt": "A Lambda function is triggered by an SQS queue. During peak load, Lambda concurrency limits are hit and messages are not processed fast enough. Which SQS feature helps prevent Lambda from being overwhelmed?",
            "options": [
                "Message visibility timeout",
                "Dead Letter Queue",
                "Reserved concurrency on the Lambda function",
                "SQS batch size configuration on the event source mapping"
            ],
            "correctOptionIndex": 3,
            "explanation": "The batch size on the SQS-Lambda event source mapping controls how many messages Lambda receives per invocation. Reducing batch size or using reserved concurrency limits on Lambda prevents over-scaling. However, the event source mapping batch size directly controls throughput at the SQS trigger level and is the first control to tune."
        },
        {
            "id": "q4",
            "type": "single",
            "prompt": "An SQS consumer takes 45 seconds to process each message. The default visibility timeout is 30 seconds. What will happen?",
            "options": [
                "The message will be deleted after 30 seconds automatically",
                "The message will become visible to other consumers before processing completes, causing duplicate processing",
                "SQS will extend the visibility timeout automatically",
                "The consumer will receive an error and must restart"
            ],
            "correctOptionIndex": 1,
            "explanation": "If processing takes longer than the visibility timeout, SQS makes the message visible again to other consumers, resulting in duplicate processing. The consumer must either extend the visibility timeout using ChangeMessageVisibility before it expires or the visibility timeout must be set higher than the maximum processing time."
        },
        {
            "id": "q5",
            "type": "single",
            "prompt": "A development team wants to reduce the cost of SQS polling when the queue is frequently empty. Which feature achieves this?",
            "options": [
                "Short polling with a 1-second interval",
                "Long polling with a WaitTimeSeconds of up to 20",
                "Increasing the message retention period",
                "Using a FIFO queue instead of a Standard queue"
            ],
            "correctOptionIndex": 1,
            "explanation": "Long polling (WaitTimeSeconds 1-20) keeps the connection open until a message arrives or the wait time expires. This reduces empty responses and API calls, lowering costs. Short polling returns immediately even when the queue is empty, generating more API calls."
        },
        {
            "id": "q6",
            "type": "multiple",
            "prompt": "A solutions architect needs to decouple a monolithic application using SQS. Which of the following are valid SQS queue characteristics to consider? (Choose two.)",
            "options": [
                "Standard queues support unlimited throughput and at-least-once delivery",
                "FIFO queues support up to 3,000 messages per second with batching",
                "SQS messages can be up to 256 GB in size using S3",
                "Standard queues guarantee message ordering within a message group"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Standard queues have nearly unlimited throughput but offer at-least-once (not exactly-once) delivery. FIFO queues support up to 3,000 messages/second with batching (300 without). SQS messages are capped at 256 KB (not GB) directly, though the Extended Client Library with S3 can handle larger payloads. Standard queues do not guarantee ordering — only FIFO queues with message group IDs do."
        },
        {
            "id": "q7",
            "type": "single",
            "prompt": "A company uses SQS to buffer writes to a database. During a database outage, the SQS queue fills up. What is the maximum duration SQS can retain messages?",
            "options": [
                "1 day",
                "4 days (default)",
                "14 days",
                "30 days"
            ],
            "correctOptionIndex": 2,
            "explanation": "SQS can retain messages for a minimum of 1 minute and a maximum of 14 days. The default retention period is 4 days. Messages not consumed within the retention period are automatically deleted."
        },
        {
            "id": "q8",
            "type": "single",
            "prompt": "An architect needs to fan out a single order event to multiple downstream services: inventory, billing, and shipping. Each service must receive every event. What is the MOST appropriate architecture?",
            "options": [
                "One SQS queue shared by all three services",
                "SNS topic with three SQS queue subscriptions, one per service",
                "Three separate EventBridge rules sending to a shared SQS queue",
                "SQS FIFO queue with three consumer groups"
            ],
            "correctOptionIndex": 1,
            "explanation": "The SNS fan-out pattern publishes a single message to an SNS topic that delivers copies to multiple SQS queues. Each service reads from its own queue independently. A shared queue means only one consumer receives each message. SQS has no native consumer group concept like Kafka."
        },
        {
            "id": "q9",
            "type": "single",
            "prompt": "A company sends mobile push notifications to millions of users across iOS and Android. The notification payload differs per platform. Which SNS feature handles this?",
            "options": [
                "SNS message filtering with subscription filter policies",
                "SNS message structure with platform-specific JSON using the Publish API",
                "SNS FIFO topics with message deduplication",
                "SNS dead-letter queues per platform endpoint"
            ],
            "correctOptionIndex": 1,
            "explanation": "SNS supports a structured message format where you provide a JSON object with different payload strings per protocol (e.g., APNS for iOS, GCM/FCM for Android). SNS automatically routes the correct payload to each platform endpoint. Message filtering controls which subscribers receive messages, not payload customization."
        },
        {
            "id": "q10",
            "type": "single",
            "prompt": "An e-commerce platform publishes order events to an SNS topic. The fraud detection service should only receive events where order value exceeds $1,000. What should be configured?",
            "options": [
                "SNS topic policy restricting publish access",
                "A subscription filter policy on the fraud detection SQS subscription",
                "A separate SNS topic for high-value orders",
                "CloudWatch Events rule to filter messages before SNS"
            ],
            "correctOptionIndex": 1,
            "explanation": "SNS subscription filter policies allow each subscriber to receive only the subset of messages matching attribute conditions. The publisher adds a message attribute (e.g., orderValue: 1500) and the fraud detection subscriber applies a filter policy matching orderValue >= 1000. This avoids duplicating topics or adding preprocessing steps."
        },
        {
            "id": "q11",
            "type": "multiple",
            "prompt": "A company needs to send alerts to operations teams via email, invoke a Lambda function for auto-remediation, and push to an SQS queue for audit logging — all from a single event. Which SNS capabilities enable this? (Choose two.)",
            "options": [
                "SNS supports multiple subscription protocols including Email, Lambda, SQS, and HTTP/HTTPS",
                "SNS FIFO topics support Email protocol subscriptions",
                "A single SNS publish delivers to all active subscriptions simultaneously",
                "SNS requires separate topics for each destination protocol"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "SNS natively supports Email, Lambda, SQS, HTTP/HTTPS, and SMS as subscription endpoints. A single Publish call delivers the message to all active subscriptions concurrently. SNS FIFO topics do not support Email subscriptions — only SQS FIFO queues and Lambda. A single topic handles all three destinations without duplication."
        },
        {
            "id": "q12",
            "type": "single",
            "prompt": "A company requires that notification messages are delivered in strict order and without duplicates to downstream financial audit systems. Which SNS configuration is appropriate?",
            "options": [
                "Standard SNS topic with SQS Standard queue subscription",
                "SNS FIFO topic with SQS FIFO queue subscription",
                "Standard SNS topic with Lambda subscription and deduplication logic",
                "SNS FIFO topic with SQS Standard queue subscription"
            ],
            "correctOptionIndex": 1,
            "explanation": "SNS FIFO topics preserve message order and support exactly-once delivery when paired with SQS FIFO queues. Standard SNS topics deliver messages in best-effort order. An SNS FIFO topic cannot fan out to SQS Standard queues — it can only deliver to SQS FIFO queues."
        },
        {
            "id": "q13",
            "type": "single",
            "prompt": "An application uses SNS to send SMS messages to customers. Some customers are not receiving messages due to carrier filtering. Which SNS feature provides visibility into delivery failures?",
            "options": [
                "SNS topic access policy logs",
                "SNS delivery status logging to CloudWatch Logs",
                "AWS CloudTrail SNS API logs",
                "SQS Dead Letter Queue attached to the SNS topic"
            ],
            "correctOptionIndex": 1,
            "explanation": "SNS delivery status logging sends delivery status records (success or failure with reason codes) to CloudWatch Logs for supported protocols including SMS, Lambda, SQS, HTTP, and application endpoints. CloudTrail records API calls, not message delivery outcomes."
        },
        {
            "id": "q14",
            "type": "single",
            "prompt": "A company has migrated from a traditional enterprise application using JMS and AMQP protocols. They want to use a managed AWS messaging service without refactoring the client code. Which service should be used?",
            "options": [
                "Amazon SQS with AMQP adapter",
                "Amazon SNS with JMS integration",
                "Amazon MQ",
                "Amazon Kinesis Data Streams"
            ],
            "correctOptionIndex": 2,
            "explanation": "Amazon MQ is a managed message broker service for Apache ActiveMQ and RabbitMQ that supports industry-standard messaging protocols including JMS, AMQP, MQTT, OpenWire, and STOMP. It allows lift-and-shift migration of on-premises messaging without code changes. SQS and SNS use proprietary AWS APIs."
        },
        {
            "id": "q15",
            "type": "single",
            "prompt": "A company runs an Amazon MQ broker and needs high availability for the messaging layer. The broker must survive an Availability Zone failure. What should the architect configure?",
            "options": [
                "Deploy a single broker instance in the largest AZ",
                "Enable automatic minor version upgrades",
                "Deploy an active/standby broker pair across two AZs",
                "Use Amazon MQ with an SQS queue as a backup"
            ],
            "correctOptionIndex": 2,
            "explanation": "Amazon MQ for ActiveMQ supports an active/standby deployment across two Availability Zones. If the active broker fails, the standby broker takes over automatically. Amazon MQ for RabbitMQ supports cluster deployments across three AZs. A single broker instance provides no AZ-level redundancy."
        },
        {
            "id": "q16",
            "type": "multiple",
            "prompt": "An architect is deciding between Amazon MQ and Amazon SQS for a new application. Which scenarios favor choosing Amazon MQ over SQS? (Choose two.)",
            "options": [
                "The application is a new cloud-native microservice with no existing messaging code",
                "The application is being migrated from on-premises and uses AMQP or STOMP protocols",
                "The workload requires unlimited horizontal scaling of the message broker",
                "The application requires message queuing with features like topics, queues, and durable subscriptions using standard protocols"
            ],
            "correctOptionIndexes": [1, 3],
            "explanation": "Amazon MQ is best for migrating existing applications that rely on standard protocols (AMQP, STOMP, MQTT, OpenWire, JMS) and need features like topics and durable subscriptions without code refactoring. SQS is better for new cloud-native applications requiring massive scale. SQS scales virtually without limits, whereas MQ broker capacity is bounded by the instance size."
        },
        {
            "id": "q17",
            "type": "single",
            "prompt": "A company wants to route events from multiple AWS services and SaaS applications to different targets based on event content, with the ability to archive and replay events. Which service provides this capability?",
            "options": [
                "Amazon SNS with subscription filter policies",
                "Amazon SQS with message filtering",
                "Amazon EventBridge",
                "AWS Step Functions"
            ],
            "correctOptionIndex": 2,
            "explanation": "Amazon EventBridge provides a serverless event bus that routes events from AWS services, custom applications, and SaaS partners to targets like Lambda, SQS, SNS, and more based on event pattern rules. EventBridge also supports event archiving and replay, which SNS and SQS do not offer natively."
        },
        {
            "id": "q18",
            "type": "single",
            "prompt": "A company uses EventBridge to react to EC2 instance state changes. The team wants the rule to match only when an EC2 instance in the us-east-1 region transitions to the 'stopped' state. What should the event pattern include?",
            "options": [
                "source: aws.ec2 with detail-type: EC2 Instance State-change Notification and detail.state: stopped",
                "source: aws.cloudwatch with detail.state: stopped and region: us-east-1",
                "source: aws.ec2 with detail.status: stopped filtered by region in the rule target",
                "source: ec2 with event-type: instance-stop and region: us-east-1"
            ],
            "correctOptionIndex": 0,
            "explanation": "EventBridge event patterns for EC2 state changes use source: 'aws.ec2', detail-type: 'EC2 Instance State-change Notification', and detail.state matching the desired state (e.g., 'stopped'). The region of the event bus handles regional filtering. The field is detail.state, not detail.status."
        },
        {
            "id": "q19",
            "type": "single",
            "prompt": "A company has a multi-account AWS setup and wants to centralize security events from all accounts into a single security account using EventBridge. What is the recommended approach?",
            "options": [
                "Configure CloudTrail in each account to send logs to a central S3 bucket and trigger EventBridge from S3",
                "Create an EventBridge event bus in the security account and add resource-based policies to allow other accounts to send events to it",
                "Use AWS Config aggregator to forward events to EventBridge in the security account",
                "Deploy a Lambda function in each account that forwards events to EventBridge in the security account"
            ],
            "correctOptionIndex": 1,
            "explanation": "EventBridge supports cross-account event routing. A central custom event bus in the security account can accept events from other accounts by granting permissions via resource-based policy. Source accounts create EventBridge rules that forward matched events to the central bus. This is the AWS-recommended pattern for centralizing events across an organization."
        },
        {
            "id": "q20",
            "type": "multiple",
            "prompt": "A team wants to schedule a Lambda function to run every weekday at 9 AM UTC and also trigger it when an S3 object is created in a specific bucket. Which EventBridge features should be used? (Choose two.)",
            "options": [
                "EventBridge Scheduler with a cron expression to invoke Lambda on weekdays",
                "EventBridge Pipes to connect S3 directly to Lambda",
                "EventBridge rule with event pattern matching S3 object creation events via CloudTrail",
                "EventBridge rule with a cron schedule expression for Lambda invocation"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "EventBridge Scheduler is a standalone scheduler for cron and rate-based invocations of targets. For S3 object-created events, EventBridge rules match events from CloudTrail (which records S3 API calls) or directly from EventBridge S3 event notifications. EventBridge Pipes connects event sources to targets with filtering and enrichment but does not support S3 directly as a source."
        },
        {
            "id": "q21",
            "type": "single",
            "prompt": "An event-driven application uses EventBridge. During a downstream outage, events are being dropped. How can the team ensure events are not lost?",
            "options": [
                "Increase the EventBridge rule timeout setting",
                "Enable EventBridge event archive on the event bus and configure retry policies with a Dead Letter Queue on the rule target",
                "Switch from EventBridge to Amazon SNS which retries indefinitely",
                "Use Amazon Kinesis as the EventBridge target for buffering"
            ],
            "correctOptionIndex": 1,
            "explanation": "EventBridge supports retry policies (up to 185 retries over 24 hours) on event delivery to targets. A Dead Letter Queue (SQS) captures events that exhaust retries, preventing data loss. Event archives allow replaying missed events after the outage is resolved. SNS does not retry indefinitely for all endpoints."
        },
        {
            "id": "q22",
            "type": "single",
            "prompt": "A company needs to orchestrate a multi-step workflow: validate an order, charge a credit card, and dispatch the shipment. If the charge fails, the order validation must be reversed. Which service is BEST suited for this?",
            "options": [
                "Amazon SQS with Lambda consumer functions",
                "Amazon SNS fan-out to multiple Lambda functions",
                "AWS Step Functions with a Standard Workflow and saga pattern",
                "Amazon EventBridge with chained rules"
            ],
            "correctOptionIndex": 2,
            "explanation": "AWS Step Functions Standard Workflows are designed for long-running, auditable business processes with built-in error handling, retries, and compensation logic (saga pattern). Step Functions maintains state between steps and provides a visual workflow. SQS and SNS are messaging primitives without workflow state management. EventBridge chaining lacks compensating transaction support."
        },
        {
            "id": "q23",
            "type": "single",
            "prompt": "A data pipeline runs thousands of short-duration tasks per day that must complete within 5 minutes each. The team needs a low-latency, high-throughput orchestration solution at minimal cost. Which Step Functions workflow type is appropriate?",
            "options": [
                "Standard Workflow — it supports unlimited duration",
                "Express Workflow (Asynchronous) — designed for high-volume, short-duration workloads",
                "Standard Workflow with Lambda integration in optimized mode",
                "Express Workflow (Synchronous) — returns results inline for real-time pipelines"
            ],
            "correctOptionIndex": 1,
            "explanation": "Step Functions Express Workflows are designed for high-volume, short-duration workflows (up to 5 minutes). They support over 100,000 executions per second at lower cost than Standard Workflows. Standard Workflows support executions up to 1 year but at higher per-state-transition cost. Synchronous Express Workflows are for real-time request/response patterns."
        },
        {
            "id": "q24",
            "type": "multiple",
            "prompt": "A team is comparing Step Functions Standard Workflows and Express Workflows. Which characteristics apply to Standard Workflows? (Choose two.)",
            "options": [
                "Execution duration up to 1 year",
                "At-most-once workflow execution semantics",
                "Exactly-once execution for each state",
                "Priced per execution plus duration, cheaper for high-volume short tasks"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Standard Workflows support executions lasting up to 1 year, making them suitable for long-running processes. They guarantee exactly-once execution for each state transition, making them ideal for critical business workflows. Express Workflows support at-least-once execution and are priced by number of executions plus duration — cheaper for high-volume, short-duration tasks."
        },
        {
            "id": "q25",
            "type": "single",
            "prompt": "An AWS Step Functions workflow calls an external payment API that occasionally returns transient HTTP 500 errors. What is the BEST way to handle these failures within Step Functions?",
            "options": [
                "Use a Wait state before every API call",
                "Configure a Retry policy with exponential backoff on the Task state",
                "Add a parallel branch that duplicates the API call",
                "Use a Choice state to check the HTTP status code after each call"
            ],
            "correctOptionIndex": 1,
            "explanation": "Step Functions Task states support Retry configurations with MaxAttempts, IntervalSeconds, BackoffRate, and ErrorEquals. Exponential backoff reduces the load on the downstream API during recovery. Wait states introduce fixed delays regardless of error conditions. A Choice state can branch on output but cannot retry the same state automatically."
        },
        {
            "id": "q26",
            "type": "single",
            "prompt": "A Step Functions workflow needs to run multiple independent data enrichment tasks simultaneously and wait for all of them to complete before proceeding. Which state type achieves this?",
            "options": [
                "Choice state with multiple branches",
                "Parallel state with each enrichment task as a branch",
                "Map state iterating over enrichment inputs",
                "Task state invoking a Lambda that calls all enrichment services"
            ],
            "correctOptionIndex": 1,
            "explanation": "The Parallel state executes multiple independent branches concurrently and waits for all branches to complete before transitioning to the next state. A Map state iterates over a list applying the same workflow to each item — it is used for dynamic parallelism over a collection, not a fixed set of independent tasks."
        },
        {
            "id": "q27",
            "type": "single",
            "prompt": "A Step Functions workflow invokes a Lambda function that takes up to 15 minutes. The workflow must wait for the Lambda to complete before continuing. Which integration pattern should be used?",
            "options": [
                "Request-Response — Step Functions fires and moves to the next state immediately",
                "Sync integration — Step Functions calls Lambda and waits for the function to return",
                "Callback integration (.waitForTaskToken) — Lambda sends a callback when done",
                "Activity integration — a worker polls for the task and sends a heartbeat"
            ],
            "correctOptionIndex": 1,
            "explanation": "The optimized SDK integration for Lambda (resource ending in :invoke.waitForTaskToken or the Lambda optimized integration) uses synchronous execution — Step Functions waits for Lambda to return. Lambda has a 15-minute maximum execution timeout, and sync integration is the simplest way to wait for completion. Callback (.waitForTaskToken) is used when the work occurs outside the Lambda invocation lifecycle."
        },
        {
            "id": "q28",
            "type": "multiple",
            "prompt": "A company is building a mobile application that requires real-time data synchronization across all connected devices and offline data access that syncs automatically when connectivity is restored. Which AWS AppSync features address these requirements? (Choose two.)",
            "options": [
                "AppSync GraphQL subscriptions for real-time data push to connected clients",
                "AppSync DataStore for offline data access and automatic conflict resolution on reconnect",
                "AppSync VTL resolvers for server-side data transformation",
                "AppSync API caching for reduced latency on repeated queries"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "AppSync GraphQL subscriptions push real-time updates to all connected clients when data changes, enabling live synchronization. AppSync DataStore provides a client-side data store with automatic synchronization to the backend when connectivity is restored, including offline access and conflict resolution. VTL resolvers and API caching are server-side performance features, not related to real-time sync or offline access."
        },
        {
            "id": "q29",
            "type": "single",
            "prompt": "A company builds a GraphQL API using AWS AppSync. The API must query DynamoDB for user profiles and call a REST endpoint for account balance. How should this be configured?",
            "options": [
                "Create a single AppSync resolver that invokes a Lambda function to query both sources",
                "Configure two AppSync resolvers with different data sources: one DynamoDB resolver and one HTTP resolver",
                "Use AppSync pipeline resolvers with two functions: one for DynamoDB and one for the HTTP endpoint",
                "Both B and C are valid approaches"
            ],
            "correctOptionIndex": 3,
            "explanation": "AppSync supports multiple resolver strategies. A single resolver per GraphQL field can point to a specific data source (DynamoDB, HTTP, Lambda, etc.). Pipeline resolvers allow a single field to chain multiple resolver functions in sequence, each calling a different data source. Both patterns are valid — pipeline resolvers are preferred when results from one source are needed to call the next."
        },
        {
            "id": "q30",
            "type": "single",
            "prompt": "An architect needs to choose between Amazon API Gateway and AWS AppSync for a new backend. The frontend is a React application that needs to subscribe to live auction bid updates without polling. Which service is better suited?",
            "options": [
                "Amazon API Gateway with WebSocket APIs",
                "AWS AppSync with GraphQL subscriptions",
                "Amazon API Gateway REST API with SQS long polling",
                "AWS AppSync with REST data sources"
            ],
            "correctOptionIndex": 1,
            "explanation": "AWS AppSync natively supports GraphQL subscriptions, which push real-time updates to clients over WebSockets when underlying data changes (e.g., via mutations). AppSync manages the subscription connections and fan-out automatically. API Gateway WebSocket APIs require custom integration logic to manage connections and broadcast updates, adding operational complexity."
        },
        {
            "id": "q31",
            "type": "single",
            "prompt": "A company wants to use AWS AppSync to expose data from multiple sources in a single GraphQL API. Which data sources does AppSync natively support?",
            "options": [
                "DynamoDB, Aurora Serverless, Lambda, HTTP endpoints, OpenSearch",
                "DynamoDB, S3, Aurora, Lambda, SQS, SNS",
                "DynamoDB, RDS (any instance type), Lambda, HTTP endpoints",
                "DynamoDB, ElastiCache, Lambda, HTTP endpoints, OpenSearch"
            ],
            "correctOptionIndex": 0,
            "explanation": "AWS AppSync natively supports DynamoDB, Aurora Serverless (via Data API), Lambda, HTTP data sources, and Amazon OpenSearch Service. Standard RDS instances (non-serverless) require a Lambda intermediary. S3 is not a native AppSync data source. ElastiCache is also not natively supported."
        },
        {
            "id": "q32",
            "type": "multiple",
            "prompt": "A company needs to transfer Salesforce lead data daily into Amazon S3 and Amazon Redshift for analytics. The data must be encrypted and filtered to include only leads from specific regions before landing. Which Amazon AppFlow features support this? (Choose two.)",
            "options": [
                "AppFlow flow with Salesforce as the source and S3 and Redshift as destinations in a single flow run",
                "AppFlow field mapping with filter conditions to select specific regional leads",
                "AppFlow integration with AWS Glue for transformation before loading to Redshift",
                "AppFlow data transformation with field masking and encryption using AWS KMS"
            ],
            "correctOptionIndexes": [1, 3],
            "explanation": "Amazon AppFlow supports filter conditions during data transfer to include only records matching criteria (e.g., region = 'EMEA'). AppFlow also supports data masking, validation, and encryption using AWS KMS keys at the field level. A single AppFlow flow has one destination — to write to both S3 and Redshift you create two separate flows. AppFlow does not natively call AWS Glue for transformation."
        },
        {
            "id": "q33",
            "type": "single",
            "prompt": "A company wants to transfer data from Salesforce to Amazon S3 without building and maintaining custom integration code. The transfer should trigger automatically when new records are created in Salesforce. Which service is MOST appropriate?",
            "options": [
                "AWS Glue with a Salesforce connector",
                "Amazon AppFlow with an event-triggered flow",
                "AWS Lambda with Salesforce SDK polling every minute",
                "Amazon EventBridge with a Salesforce SaaS partner event source"
            ],
            "correctOptionIndex": 1,
            "explanation": "Amazon AppFlow is a fully managed integration service for transferring data between SaaS applications (Salesforce, ServiceNow, Zendesk, etc.) and AWS services. It supports event-triggered flows that run automatically when records are created or updated in the source, requiring no custom code. EventBridge Salesforce integration sends events but does not transfer record payloads to S3."
        },
        {
            "id": "q34",
            "type": "single",
            "prompt": "A company uses Amazon AppFlow to transfer customer records from a SaaS CRM to Amazon S3 nightly. Sensitive PII fields like SSNs must not appear in the S3 output. Which AppFlow feature handles this?",
            "options": [
                "AppFlow destination connector field exclusion",
                "AppFlow field-level data masking",
                "Amazon Macie post-processing of S3 files",
                "An AWS Lambda transformation step after the AppFlow run"
            ],
            "correctOptionIndex": 1,
            "explanation": "Amazon AppFlow supports field-level data masking as part of the flow configuration, replacing sensitive values with masked output before writing to the destination. This ensures PII never lands in S3. Macie detects PII after the fact but does not mask it. Lambda transformations would require additional orchestration outside AppFlow."
        },
        {
            "id": "q35",
            "type": "single",
            "prompt": "A company needs to decouple a web application from a video transcoding backend. Transcoding jobs can take 30 minutes and the number of pending jobs fluctuates widely. Which architecture is MOST appropriate?",
            "options": [
                "Web app writes job requests to an SNS topic; transcoding servers subscribe to SNS",
                "Web app writes job requests to an SQS Standard queue; an Auto Scaling group of EC2 workers polls the queue",
                "Web app triggers a Step Functions workflow that runs transcoding inline",
                "Web app writes job requests to an EventBridge custom bus; transcoding workers subscribe"
            ],
            "correctOptionIndex": 1,
            "explanation": "SQS Standard queue decouples the web app from the transcoding workers. An Auto Scaling group scales the number of workers based on the queue depth (ApproximateNumberOfMessages metric), handling variable job loads. Workers poll SQS, process jobs, and delete messages on success. SNS pushes immediately and is not well-suited for workloads requiring workers to pull at their own pace."
        },
        {
            "id": "q36",
            "type": "single",
            "prompt": "A company has an SNS topic delivering to an SQS queue. The operations team discovers that some notifications are being lost when the SQS queue reaches its capacity limit. What is the BEST solution?",
            "options": [
                "Increase the SNS topic's message retention period",
                "Enable SQS extended client library to store large messages in S3",
                "Configure an SNS subscription with a Dead Letter Queue for delivery failures",
                "Reduce the SQS message size to increase queue capacity"
            ],
            "correctOptionIndex": 2,
            "explanation": "When SNS fails to deliver to a subscribed SQS queue (e.g., queue full or permissions issue), it can be configured to send failed deliveries to a Dead Letter Queue (another SQS queue). This prevents message loss. SNS does not have a message retention period — messages are published and immediately delivered or dropped. Reducing message size does not increase the number of messages the queue can hold."
        },
        {
            "id": "q37",
            "type": "multiple",
            "prompt": "A company processes IoT sensor data using AWS IoT Core and needs to store raw events in S3, update a DynamoDB table in real-time, and trigger alerts via SNS for anomalies. Which approach distributes events to all three destinations? (Choose two.)",
            "options": [
                "AWS IoT Core rule with three separate actions: S3, DynamoDB, and SNS",
                "AWS IoT Core publishing to an EventBridge event bus with rules routing to S3, DynamoDB, and SNS",
                "AWS IoT Core publishing to an SNS topic with subscriptions to S3, DynamoDB, and Lambda",
                "AWS IoT Core rule invoking a Lambda function that writes to all three destinations"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "AWS IoT Core rules support multiple actions per rule, enabling parallel delivery to S3, DynamoDB, and SNS in a single rule. Alternatively, a Lambda action can perform all three writes. SNS does not support S3 and DynamoDB as native subscription endpoints. EventBridge does not natively write to DynamoDB without a Lambda intermediary."
        },
        {
            "id": "q38",
            "type": "single",
            "prompt": "A company runs a Step Functions workflow that processes loan applications. The workflow must wait for a human underwriter to approve or reject an application before proceeding. The approval can take several days. Which Step Functions pattern handles this?",
            "options": [
                "Express Workflow with a Wait state configured for 7 days",
                "Standard Workflow with a Task state using .waitForTaskToken, pausing until the underwriter sends a callback",
                "Standard Workflow with a Parallel state waiting for an external human approval trigger",
                "Express Workflow with a Heartbeat timeout of 7 days"
            ],
            "correctOptionIndex": 1,
            "explanation": "The .waitForTaskToken integration pattern pauses a Step Functions Task state indefinitely (up to 1 year for Standard Workflows) until an external system calls SendTaskSuccess or SendTaskFailure with the task token. This is the canonical pattern for human-in-the-loop workflows. Express Workflows support a maximum of 5 minutes, making them unsuitable for multi-day approvals."
        },
        {
            "id": "q39",
            "type": "single",
            "prompt": "An architecture team needs to choose between Amazon EventBridge and Amazon SNS for routing application events. Which characteristic is UNIQUE to EventBridge and not available in SNS?",
            "options": [
                "Fan-out delivery to multiple targets",
                "Message filtering based on event content",
                "Event archiving and replay",
                "Integration with AWS Lambda as a target"
            ],
            "correctOptionIndex": 2,
            "explanation": "EventBridge uniquely supports event archiving (storing all or filtered events on a bus) and event replay (re-processing archived events through current rules), which is critical for debugging and recovery. Both SNS and EventBridge support fan-out, content-based filtering, and Lambda integration. SNS does not offer archiving or replay."
        },
        {
            "id": "q40",
            "type": "single",
            "prompt": "A company has an existing on-premises application using RabbitMQ. They want to migrate to AWS with minimal code changes. Which AWS service and broker engine should they choose?",
            "options": [
                "Amazon MQ for Apache ActiveMQ",
                "Amazon MQ for RabbitMQ",
                "Amazon SQS with AMQP proxy",
                "Amazon Kinesis Data Streams with RabbitMQ connector"
            ],
            "correctOptionIndex": 1,
            "explanation": "Amazon MQ for RabbitMQ is a managed RabbitMQ broker that supports AMQP 0-9-1 protocol, the same protocol used by on-premises RabbitMQ. This enables a lift-and-shift migration with no client code changes. Amazon MQ for ActiveMQ supports AMQP 1.0 and JMS, which are different protocols from RabbitMQ's AMQP 0-9-1."
        },
        {
            "id": "q41",
            "type": "multiple",
            "prompt": "A solutions architect is designing an event-driven system. Which of the following are valid targets that Amazon EventBridge rules can deliver events to? (Choose two.)",
            "options": [
                "AWS Lambda functions",
                "Amazon Kinesis Data Streams",
                "Amazon RDS database tables directly",
                "AWS Step Functions state machines"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Amazon EventBridge supports many targets including Lambda, Kinesis Data Streams, SQS, SNS, Step Functions, API Gateway, ECS tasks, and more. EventBridge cannot write directly to RDS tables — a Lambda intermediary would be required. Step Functions and Lambda are both supported targets."
        },
        {
            "id": "q42",
            "type": "single",
            "prompt": "A company uses SQS to process image uploads. During office hours, thousands of images are queued. The company wants to automatically scale EC2 workers to match the queue depth. Which metric should trigger the Auto Scaling policy?",
            "options": [
                "SQS NumberOfMessagesSent",
                "SQS ApproximateNumberOfMessagesVisible",
                "SQS NumberOfMessagesDeleted",
                "EC2 CPUUtilization"
            ],
            "correctOptionIndex": 1,
            "explanation": "ApproximateNumberOfMessagesVisible represents the number of messages available in the queue for retrieval — the backlog. Scaling EC2 workers based on this metric ensures capacity grows as work accumulates and shrinks as the queue drains. NumberOfMessagesSent tracks the rate of new messages. CPUUtilization reacts to load rather than queue depth, causing lag."
        },
        {
            "id": "q43",
            "type": "single",
            "prompt": "An application using Amazon SQS FIFO needs to send messages from multiple producers about different customer orders while ensuring messages for each order are processed in order without affecting other orders. Which feature ensures this?",
            "options": [
                "Message deduplication ID",
                "Message group ID",
                "Sequence number",
                "Visibility timeout per producer"
            ],
            "correctOptionIndex": 1,
            "explanation": "The MessageGroupId in SQS FIFO queues partitions messages into logical groups. Messages within the same group are processed in strict order. Different groups can be processed in parallel without affecting each other's ordering. The deduplication ID prevents duplicate messages. Sequence numbers are assigned by SQS for ordering within a group."
        },
        {
            "id": "q44",
            "type": "single",
            "prompt": "A company wants to implement a priority queue where high-priority jobs are always processed before low-priority jobs. The system uses Amazon SQS. What is the RECOMMENDED approach?",
            "options": [
                "Set a lower visibility timeout for high-priority messages",
                "Use message attributes to tag priority and have consumers sort by attribute",
                "Create separate SQS queues for high and low priority; consumers poll the high-priority queue first",
                "Use SQS FIFO with sequence numbers to assign priority"
            ],
            "correctOptionIndex": 2,
            "explanation": "SQS does not natively support message priority. The recommended pattern is to use multiple queues — one per priority level. Consumers poll the high-priority queue first and only process from the low-priority queue when the high-priority queue is empty. Message attribute tagging requires consumer-side sorting, which introduces complexity and does not prevent low-priority messages from being received first."
        },
        {
            "id": "q45",
            "type": "multiple",
            "prompt": "A company wants to use AWS Step Functions to process a list of 10,000 records from S3, applying the same transformation to each record in parallel. Which Step Functions features are involved? (Choose two.)",
            "options": [
                "Map state with inline or distributed mode to iterate over the record list",
                "Parallel state with 10,000 branches, one per record",
                "Distributed Map mode to process S3 objects at massive scale with child workflow executions",
                "Express Workflow to keep per-item execution cost low"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "The Map state iterates over a list and applies the same workflow to each element. For large-scale S3 processing, Distributed Map mode launches child workflow executions for each item, supporting millions of items. A Parallel state has a fixed number of branches defined at design time — it does not iterate over dynamic data. Express Workflows are suitable for short-duration, high-volume child executions within Distributed Map."
        },
        {
            "id": "q46",
            "type": "single",
            "prompt": "A company uses AWS AppSync for its GraphQL API. The team wants to reduce backend load by caching resolver responses for frequently queried, rarely changed data. Which AppSync feature handles this?",
            "options": [
                "AppSync DataStore offline cache",
                "AppSync server-side caching with an ElastiCache-backed cache",
                "CloudFront distribution in front of the AppSync API",
                "DynamoDB DAX cache for DynamoDB resolvers"
            ],
            "correctOptionIndex": 1,
            "explanation": "AWS AppSync supports server-side caching powered by Amazon ElastiCache. When enabled, AppSync caches resolver responses at the API or resolver level for a configurable TTL. This reduces calls to backend data sources. AppSync DataStore is a client-side offline storage solution. CloudFront can cache HTTP responses but cannot cache individual GraphQL resolver responses intelligently. DAX caches DynamoDB reads but not the AppSync resolver layer."
        },
        {
            "id": "q47",
            "type": "single",
            "prompt": "A company needs to transfer data from Google Analytics to Amazon S3 weekly. No custom code or ETL infrastructure should be required. Which service is MOST appropriate?",
            "options": [
                "AWS Glue with a custom Google Analytics source",
                "AWS Lambda with Google Analytics API calls on a schedule",
                "Amazon AppFlow with Google Analytics as the source connector",
                "Amazon EventBridge with a Google Analytics SaaS event source"
            ],
            "correctOptionIndex": 2,
            "explanation": "Amazon AppFlow provides pre-built connectors for SaaS applications including Google Analytics, Salesforce, Slack, Zendesk, and more. Data can be transferred to S3 on a scheduled basis without custom code. AWS Glue and Lambda require writing custom code to call the Google Analytics API. EventBridge Google Analytics integration does not transfer bulk analytics data to S3."
        },
        {
            "id": "q48",
            "type": "single",
            "prompt": "An application uses SNS to send messages to SQS. A security audit requires that messages in transit between SNS and SQS must be encrypted. What should be configured?",
            "options": [
                "Enable SNS server-side encryption on the topic",
                "Enable SQS server-side encryption on the queue using KMS",
                "Configure HTTPS subscription endpoints between SNS and SQS",
                "SNS-to-SQS delivery is always encrypted; no additional configuration is needed"
            ],
            "correctOptionIndex": 1,
            "explanation": "SQS Server-Side Encryption (SSE) using AWS KMS encrypts messages at rest in the queue, including those delivered from SNS. SNS SSE encrypts messages stored temporarily in SNS before delivery. For end-to-end encryption in the SNS-SQS pattern, enabling SSE on the SQS queue ensures messages are encrypted in the queue. SNS-to-SQS transport uses TLS by default, but enabling SQS SSE covers at-rest encryption."
        },
        {
            "id": "q49",
            "type": "multiple",
            "prompt": "A company wants to build a serverless order processing system. When an order is placed, the system must update inventory, send a confirmation email, and log the event to a data warehouse — all reliably and with retry on failure. Which architecture patterns are appropriate? (Choose two.)",
            "options": [
                "EventBridge with rules routing order events to Lambda (inventory), SNS (email), and Kinesis Firehose (data warehouse) with retry policies",
                "SQS fan-out via SNS topic with three subscribed queues, each with a Lambda consumer and DLQ for retry",
                "A single Lambda function performing all three operations synchronously, invoked directly from the order API",
                "Step Functions Standard Workflow orchestrating inventory update, SNS email publish, and Firehose logging with retries per step"
            ],
            "correctOptionIndexes": [1, 3],
            "explanation": "SNS fan-out to three SQS queues with Lambda consumers and DLQs provides reliable, parallel, independently retried processing for each downstream system. Step Functions orchestrates the workflow with per-step retry policies, ensuring each operation (inventory, email, logging) is retried independently on failure. A single synchronous Lambda is fragile — one failure rolls back all operations and provides no partial retry. EventBridge can route to multiple targets but targets share retry behavior at the rule level, not per-target independently."
        },
        {
            "id": "q50",
            "type": "single",
            "prompt": "An architect needs to trigger an AWS Step Functions execution whenever an object is uploaded to a specific S3 bucket. What is the RECOMMENDED approach?",
            "options": [
                "Configure S3 event notification to invoke a Lambda function that starts the Step Functions execution",
                "Configure S3 event notification directly targeting the Step Functions state machine",
                "Use an EventBridge rule matching S3 object-created events and set Step Functions as the target",
                "Both A and C are valid and recommended approaches"
            ],
            "correctOptionIndex": 3,
            "explanation": "Both approaches are valid. EventBridge can match S3 event notifications (via EventBridge-enabled S3 event notifications) and trigger Step Functions directly as a target, which is the fully serverless, no-Lambda approach. Alternatively, S3 can notify Lambda, which calls StartExecution on the state machine. EventBridge is the simpler and preferred approach when no additional preprocessing is needed before starting the execution."
        }
    ]
};
