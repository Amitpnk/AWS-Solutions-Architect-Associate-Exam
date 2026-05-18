import type { ExamDefinition } from './types';

export const examCostManagement: ExamDefinition = {
    "id": "exam_cost_management_saa_c03",
    "title": "SAA-C03 Practice Set on Cost Management",
    "description": "Scenario-based questions covering AWS Budgets, AWS Cost and Usage Report, AWS Cost Explorer, and Savings Plans",
    "durationSeconds": 1800,
    "questions": [
        {
            "id": "q1",
            "type": "single",
            "prompt": "A company wants to receive an email alert when its forecasted monthly AWS spend is projected to exceed $50,000. The alert must trigger before the threshold is actually reached. Which service and budget type should be used?",
            "options": [
                "AWS Cost Explorer with a cost anomaly detection monitor",
                "AWS Budgets with a Cost budget using a Forecasted threshold",
                "AWS Budgets with a Cost budget using an Actual threshold",
                "Amazon CloudWatch billing alarm with a forecasted metric"
            ],
            "correctOptionIndex": 1,
            "explanation": "AWS Budgets supports two threshold types: Actual (triggers when real spend crosses the threshold) and Forecasted (triggers when projected spend is on track to exceed the threshold before the period ends). Only the Forecasted threshold alerts you before the overage occurs. CloudWatch billing alarms only support actual spend. Cost Explorer anomaly detection is for unexpected spikes, not forward-looking budget enforcement."
        },
        {
            "id": "q2",
            "type": "single",
            "prompt": "A FinOps team wants to automatically stop all non-production EC2 instances in a development account the moment actual monthly spend reaches 80% of a $20,000 budget — without any manual intervention. Which capability fulfills this?",
            "options": [
                "AWS Cost Explorer Rightsizing Recommendations with an SNS notification",
                "AWS Budgets with a Budget Action that applies an IAM policy to deny EC2 actions",
                "An AWS Lambda function triggered by a CloudWatch billing alarm",
                "AWS Budgets with a Budget Action that runs an AWS Systems Manager Automation document"
            ],
            "correctOptionIndex": 3,
            "explanation": "AWS Budgets Actions supports three automated response types when a budget threshold is breached: (1) apply an IAM policy to restrict permissions, (2) apply a Service Control Policy (SCP) to an OU, or (3) run an AWS Systems Manager (SSM) Automation runbook. Running an SSM Automation document that stops EC2 instances is the correct fit for automated instance shutdown. Applying an IAM policy would deny future actions but would not stop running instances."
        },
        {
            "id": "q3",
            "type": "multiple",
            "prompt": "A company wants to implement budget governance across its AWS Organization. Which TWO types of budgets can be created with AWS Budgets? (Choose 2)",
            "options": [
                "Cost budget — tracks actual or forecasted spend in dollars",
                "Usage budget — tracks consumption of specific service usage metrics (e.g., EC2 instance-hours)",
                "Performance budget — tracks application response time against cost",
                "Network budget — tracks data transfer costs separately from compute costs"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "AWS Budgets supports five budget types: Cost, Usage, Savings Plans utilization, Savings Plans coverage, RI utilization, and RI coverage. Cost budgets track spend in dollars; Usage budgets track service-specific consumption metrics such as EC2 running hours or S3 GB stored. 'Performance budget' and 'Network budget' are not AWS Budgets budget types."
        },
        {
            "id": "q4",
            "type": "single",
            "prompt": "A finance team needs to analyze AWS spending at the individual resource level, broken down by custom cost allocation tags, with hourly granularity. They plan to load this data into Amazon Redshift for custom BI reporting. Which AWS feature provides the most granular billing dataset for this use case?",
            "options": [
                "AWS Cost Explorer with hourly granularity enabled",
                "AWS Budgets cost report exported to S3",
                "AWS Cost and Usage Report (CUR) delivered to an S3 bucket",
                "AWS Trusted Advisor cost optimization checks exported via API"
            ],
            "correctOptionIndex": 2,
            "explanation": "The AWS Cost and Usage Report (CUR) is the most comprehensive and granular billing dataset AWS offers. It can be delivered to S3 hourly, daily, or monthly, and includes resource-level line items, all cost allocation tags, Reserved Instance and Savings Plans amortization, and blended/unblended costs. Cost Explorer provides visualizations and API access but cannot be directly loaded into Redshift. CUR files in S3 can be queried with Amazon Athena or loaded into Redshift for custom BI workloads."
        },
        {
            "id": "q5",
            "type": "single",
            "prompt": "A company delivers its AWS Cost and Usage Report to an S3 bucket. Their data analytics team wants to query the CUR data using standard SQL without loading it into a database. What is the MOST operationally efficient approach?",
            "options": [
                "Use AWS Glue to crawl the S3 bucket and create a table, then query with Amazon Athena",
                "Load the CUR CSV files into an RDS MySQL instance and run SQL queries",
                "Use Amazon EMR with Spark SQL to process the CUR Parquet files",
                "Enable Cost Explorer API and query cost data directly using SQL"
            ],
            "correctOptionIndex": 0,
            "explanation": "The recommended serverless approach for querying CUR data is: configure CUR to deliver Parquet-format files to S3, use AWS Glue Data Catalog (or the built-in CUR Athena integration) to create a table schema, then query with Amazon Athena using standard SQL. This is fully serverless with no infrastructure to manage. Loading into RDS adds overhead; EMR adds complexity; Cost Explorer does not expose a SQL interface."
        },
        {
            "id": "q6",
            "type": "multiple",
            "prompt": "A solutions architect is describing AWS Cost and Usage Report (CUR) to a stakeholder. Which TWO statements about CUR are accurate? (Choose 2)",
            "options": [
                "CUR is delivered to an Amazon S3 bucket that you specify",
                "CUR data is available in real time as costs are incurred, with no delay",
                "CUR can include amortized costs for Reserved Instances and Savings Plans",
                "CUR automatically integrates with AWS Budgets to enforce cost limits"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "CUR is delivered to an S3 bucket (your choice of bucket and prefix) on an hourly, daily, or monthly schedule. CUR supports amortized cost views for Reserved Instances and Savings Plans, distributing upfront fees across the reservation period. CUR is not real-time — it reflects finalized usage data with a processing delay. CUR does not enforce budget limits; that is the role of AWS Budgets."
        },
        {
            "id": "q7",
            "type": "single",
            "prompt": "A solutions architect wants to view a breakdown of EC2 spend grouped by instance family over the past 6 months and generate a 12-month cost forecast for capacity planning. Which AWS service supports both of these requirements natively?",
            "options": [
                "AWS Cost and Usage Report with Amazon QuickSight",
                "AWS Trusted Advisor",
                "AWS Cost Explorer",
                "AWS Budgets with usage reports"
            ],
            "correctOptionIndex": 2,
            "explanation": "AWS Cost Explorer provides an interactive visualization tool for analyzing historical AWS costs (up to 13 months of history) with filtering and grouping by service, region, instance type, tags, and more. It also provides built-in cost forecasting for up to 12 months based on historical usage. Trusted Advisor gives optimization recommendations but no historical trend analysis. CUR with QuickSight can achieve this but requires additional setup and is not 'native' Cost Explorer functionality."
        },
        {
            "id": "q8",
            "type": "single",
            "prompt": "A company's cloud team wants to identify EC2 instances that are consistently underutilized and receive specific recommendations to downsize them to a smaller or less expensive instance type, without writing any custom scripts. Which AWS feature provides this directly?",
            "options": [
                "AWS Cost Explorer Rightsizing Recommendations",
                "Amazon CloudWatch with custom metrics alarms",
                "AWS Compute Optimizer with Cost Explorer integration",
                "AWS Trusted Advisor Low Utilization Amazon EC2 Instances check"
            ],
            "correctOptionIndex": 0,
            "explanation": "AWS Cost Explorer's Rightsizing Recommendations analyzes CloudWatch utilization metrics for EC2 instances over the past 14 days and provides specific recommendations to downsize or terminate underutilized instances along with estimated monthly savings. AWS Compute Optimizer also gives instance recommendations but focuses on performance optimization rather than direct cost savings display. Trusted Advisor's Low Utilization check identifies instances but does not provide specific rightsizing target recommendations."
        },
        {
            "id": "q9",
            "type": "multiple",
            "prompt": "A FinOps engineer is explaining AWS Cost Explorer capabilities to a new team member. Which TWO features are available natively within Cost Explorer? (Choose 2)",
            "options": [
                "Reservation (RI) purchase recommendations based on historical usage",
                "Automated enforcement of cost limits by stopping AWS services",
                "Cost forecasting for up to 12 months into the future",
                "Real-time per-API-call cost tracking"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Cost Explorer provides RI purchase recommendations that analyze your historical On-Demand usage and suggest optimal RI purchases with estimated savings. It also provides cost forecasting for up to 12 months based on historical patterns. Cost Explorer does not enforce limits or stop services (that is AWS Budgets Actions), and it does not provide real-time per-API-call cost tracking."
        },
        {
            "id": "q10",
            "type": "single",
            "prompt": "A company runs thousands of EC2 instances across multiple regions, instance families, and operating systems. Their usage fluctuates and they frequently change instance types. They want to commit to a consistent compute spend to receive significant discounts while retaining maximum flexibility. Which Savings Plan type is MOST appropriate?",
            "options": [
                "EC2 Instance Savings Plans in each region",
                "Compute Savings Plans",
                "Reserved Instances with Convertible type",
                "Scheduled Reserved Instances"
            ],
            "correctOptionIndex": 1,
            "explanation": "Compute Savings Plans provide the most flexibility — they apply to EC2 usage regardless of instance family, size, OS, tenancy, or region, and also cover AWS Lambda and AWS Fargate. The trade-off is a slightly lower discount (up to ~66%) compared to EC2 Instance Savings Plans. EC2 Instance Savings Plans lock you to a specific instance family in a specific region, offering deeper discounts (up to ~72%) but no cross-region or cross-family flexibility. Convertible RIs offer flexibility but require conversion steps and are not as seamless."
        },
        {
            "id": "q11",
            "type": "single",
            "prompt": "A company runs a serverless architecture entirely on AWS Lambda and AWS Fargate. They want to reduce their compute costs by committing to a consistent spend level. Which Savings Plan type applies to their workload?",
            "options": [
                "EC2 Instance Savings Plans",
                "Compute Savings Plans",
                "SageMaker Savings Plans",
                "Lambda Savings Plans (Lambda-specific plan)"
            ],
            "correctOptionIndex": 1,
            "explanation": "Compute Savings Plans apply to EC2, AWS Lambda, and AWS Fargate. Since this company uses only Lambda and Fargate, Compute Savings Plans are the correct fit. EC2 Instance Savings Plans apply only to EC2 and do not cover Lambda or Fargate. SageMaker Savings Plans apply specifically to SageMaker ML compute. There is no Lambda-only Savings Plan type."
        },
        {
            "id": "q12",
            "type": "single",
            "prompt": "A company exclusively runs m5.xlarge Linux instances in us-east-1 and has highly predictable, steady-state usage. They want the deepest possible discount on EC2 with a 1-year commitment. Which purchasing option provides the highest savings for this exact use case?",
            "options": [
                "Compute Savings Plans with 1-year, All Upfront payment",
                "EC2 Instance Savings Plans for m5 in us-east-1, 1-year, All Upfront",
                "Standard Reserved Instances for m5.xlarge in us-east-1, 1-year, All Upfront",
                "Dedicated Hosts with On-Demand pricing"
            ],
            "correctOptionIndex": 2,
            "explanation": "Standard Reserved Instances for a specific instance type in a specific region with All Upfront payment provide the deepest discount — up to 72% vs On-Demand for this exact configuration. EC2 Instance Savings Plans for the m5 family in us-east-1 provide similar savings (up to ~72%) with more flexibility (any m5 size), but Standard RIs for the exact instance type still match or slightly exceed them. Compute Savings Plans provide the most flexibility but a slightly lower maximum discount (~66%). Dedicated Hosts are for licensing and compliance, not cost optimization."
        },
        {
            "id": "q13",
            "type": "multiple",
            "prompt": "A cloud architect is comparing Savings Plans options. Which TWO statements about Savings Plans are correct? (Choose 2)",
            "options": [
                "Compute Savings Plans apply to EC2, Lambda, and Fargate regardless of region or instance family",
                "Savings Plans commitments can be set for 6-month, 1-year, or 3-year terms",
                "EC2 Instance Savings Plans provide a deeper discount than Compute Savings Plans but are locked to a specific instance family in a specific region",
                "Savings Plans with No Upfront payment are not available — all plans require at least partial upfront payment"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Compute Savings Plans apply broadly to EC2 (any family, size, region, OS, tenancy), Lambda, and Fargate — offering maximum flexibility with a slightly lower discount. EC2 Instance Savings Plans lock to a specific instance family in a specific region (e.g., m5 in us-east-1) and offer deeper discounts (up to ~72%). Savings Plans are only available in 1-year or 3-year terms (not 6-month). No Upfront is a valid payment option for Savings Plans — it requires no payment today but charges a reduced hourly rate throughout the term."
        },
        {
            "id": "q14",
            "type": "single",
            "prompt": "A company's Savings Plans utilization has dropped to 60% because several teams reduced their EC2 usage after a workload migration. The finance team wants to be automatically alerted if Savings Plans utilization falls below 80% in the future. Which service and budget type should be configured?",
            "options": [
                "AWS Cost Explorer anomaly detection with an SNS alert",
                "AWS Budgets with a Savings Plans Utilization budget",
                "AWS Budgets with a Cost budget and a custom filter for Savings Plans",
                "Amazon CloudWatch with a custom billing metric for Savings Plans"
            ],
            "correctOptionIndex": 1,
            "explanation": "AWS Budgets supports a Savings Plans Utilization budget type that alerts when your Savings Plans commitment utilization falls below a threshold you define (e.g., 80%). This is purpose-built for this scenario. Cost Explorer anomaly detection focuses on cost spikes, not utilization of commitments. CloudWatch does not have a native Savings Plans utilization metric. A generic cost budget cannot directly filter for commitment utilization percentage."
        },
        {
            "id": "q15",
            "type": "single",
            "prompt": "A startup is reviewing its AWS spend at the end of its first year. The engineering team wants to identify which EC2 On-Demand usage patterns would benefit most from a 1-year or 3-year Savings Plans commitment, and see the estimated savings for each option. Where can they find these recommendations natively without any additional tooling?",
            "options": [
                "AWS Trusted Advisor — Reserved Instance recommendations panel",
                "AWS Cost and Usage Report filtered by purchase option",
                "AWS Cost Explorer — Savings Plans recommendations",
                "AWS Budgets — Savings Plans coverage report"
            ],
            "correctOptionIndex": 2,
            "explanation": "AWS Cost Explorer provides native Savings Plans recommendations that analyze your On-Demand usage over a lookback period (7, 30, or 60 days) and recommend the optimal hourly commitment amount for Compute or EC2 Instance Savings Plans, along with estimated savings for 1-year and 3-year terms with All Upfront, Partial Upfront, or No Upfront payment options. Trusted Advisor provides RI recommendations but not Savings Plans. CUR raw data does not generate recommendations. Budgets coverage reports track existing coverage, not generate new purchase recommendations."
        },
        {
            "id": "q16",
            "type": "multiple",
            "prompt": "A large enterprise wants to govern AWS costs across 50 accounts in an AWS Organization. They need: (1) granular resource-level billing data for their data warehouse team, and (2) automated alerts with enforcement when any linked account's monthly spend exceeds its allocated budget. Which TWO services should be used together to satisfy both requirements? (Choose 2)",
            "options": [
                "AWS Cost and Usage Report (CUR) — for granular resource-level billing data",
                "AWS Trusted Advisor — for automated budget enforcement across accounts",
                "AWS Budgets — for per-account budget alerts and automated enforcement actions",
                "AWS Cost Explorer — for resource-level granular billing data"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "CUR is the right choice for granular resource-level billing data — it provides the most detailed dataset including tags, resource IDs, and usage types, deliverable to S3 for downstream processing. AWS Budgets with Budget Actions provides per-account budget tracking and automated enforcement (apply IAM policies, SCPs, or run SSM automations). Trusted Advisor provides optimization recommendations but cannot enforce spending limits. Cost Explorer provides visualizations and some granularity but is not the source for loading raw billing data into a data warehouse."
        },
        {
            "id": "q17",
            "type": "single",
            "prompt": "A solutions architect notices that a company is paying On-Demand rates for EC2 even though 70% of their compute capacity has been consistent for 18 months. Cost Explorer Savings Plans recommendations show potential savings of 45%. The company wants the lowest-effort way to start saving without any instance type changes. What is the recommended action?",
            "options": [
                "Purchase Standard Reserved Instances for every current EC2 instance type and region",
                "Purchase Compute Savings Plans based on Cost Explorer recommendations for the consistent baseline usage",
                "Migrate all EC2 instances to Spot Instances",
                "Enable EC2 Auto Scaling to reduce unused capacity"
            ],
            "correctOptionIndex": 1,
            "explanation": "Purchasing Compute Savings Plans based on the Cost Explorer recommendations is the lowest-effort action — it requires no instance changes, no migration, and no operational overhead. You commit to an hourly dollar amount and savings are applied automatically across EC2, Lambda, and Fargate regardless of instance type or region. Purchasing Standard RIs for every instance type is operationally complex and inflexible. Spot Instances introduce interruption risk and require application changes. Auto Scaling reduces unused capacity but does not discount the instances you are running."
        }
    ]
};
