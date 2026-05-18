export interface StudyResource {
  service: string;
  url: string;
}

export interface ResourceCategory {
  category: string;
  icon: string;
  resources: StudyResource[];
}

const BLOG_BASE = '';

export const resourceCategories: ResourceCategory[] = [
  {
    category: 'Analytics',
    icon: '📈',
    resources: [
      { service: 'Amazon Athena', url: `` },
      { service: 'AWS Data Exchange', url: `${BLOG_BASE}/aws-data-exchange` },
      { service: 'Amazon Data Firehose', url: `${BLOG_BASE}/amazon-data-firehose` },
      { service: 'Amazon EMR', url: `${BLOG_BASE}/amazon-emr` },
      { service: 'AWS Glue', url: `${BLOG_BASE}/aws-glue` },
      { service: 'Amazon Kinesis', url: `${BLOG_BASE}/amazon-kinesis` },
      { service: 'AWS Lake Formation', url: `${BLOG_BASE}/aws-lake-formation` },
      { service: 'Amazon MSK', url: `${BLOG_BASE}/amazon-msk` },
      { service: 'Amazon OpenSearch Service', url: `${BLOG_BASE}/amazon-opensearch` },
      { service: 'Amazon QuickSight', url: `${BLOG_BASE}/amazon-quicksight` },
      { service: 'Amazon Redshift', url: `${BLOG_BASE}/amazon-redshift` },
    ],
  },
  {
    category: 'Application Integration',
    icon: '🔗',
    resources: [
      { service: 'Amazon AppFlow', url: `https://medium.com/expertminds/application-integration-on-aws-19e24b1fc929` },
      { service: 'AWS AppSync', url: `https://medium.com/expertminds/application-integration-on-aws-19e24b1fc929` },
      { service: 'Amazon EventBridge', url: `https://medium.com/expertminds/application-integration-on-aws-19e24b1fc929` },
      { service: 'Amazon MQ', url: `https://medium.com/expertminds/application-integration-on-aws-19e24b1fc929` },
      { service: 'Amazon SNS', url: `https://medium.com/expertminds/application-integration-on-aws-19e24b1fc929` },
      { service: 'Amazon SQS', url: `https://medium.com/expertminds/application-integration-on-aws-19e24b1fc929` },
      { service: 'AWS Step Functions', url: `https://medium.com/expertminds/application-integration-on-aws-19e24b1fc929` },
    ],
  },
  {
    category: 'AWS Cost Management',
    icon: '💰',
    resources: [
      { service: 'AWS Budgets', url: `https://medium.com/expertminds/aws-cost-management-f34f2f17f5ee` },
      { service: 'AWS Cost and Usage Report', url: `https://medium.com/expertminds/aws-cost-management-f34f2f17f5ee` },
      { service: 'AWS Cost Explorer', url: `https://medium.com/expertminds/aws-cost-management-f34f2f17f5ee` },
      { service: 'Savings Plans', url: `https://medium.com/expertminds/aws-cost-management-f34f2f17f5ee` },
    ],
  },
  {
    category: 'Compute',
    icon: '⚙️',
    resources: [
      { service: 'AWS Batch', url: `https://medium.com/expertminds/exploring-aws-elastic-beanstalk-aws-batch-and-serverless-application-repository-f6e4e3cd1c28` },
      { service: 'Amazon EC2', url: `https://medium.com/expertminds/building-highly-available-and-scalable-applications-with-amazon-ec2-auto-scaling-205ea9630879` },
      { service: 'Amazon EC2 Auto Scaling', url: `https://medium.com/expertminds/building-highly-available-and-scalable-applications-with-amazon-ec2-auto-scaling-205ea9630879` },
      { service: 'AWS Elastic Beanstalk', url: `https://medium.com/expertminds/exploring-aws-elastic-beanstalk-aws-batch-and-serverless-application-repository-f6e4e3cd1c28` },
      { service: 'AWS Outposts', url: `https://medium.com/expertminds/aws-hybrid-edge-compute-services-outposts-vmware-cloud-and-wavelength-81b54a268220` },
      { service: 'AWS Serverless Application Repository', url: `https://medium.com/expertminds/exploring-aws-elastic-beanstalk-aws-batch-and-serverless-application-repository-f6e4e3cd1c28` },
      { service: 'VMware Cloud on AWS', url: `https://medium.com/expertminds/aws-hybrid-edge-compute-services-outposts-vmware-cloud-and-wavelength-81b54a268220` },
      { service: 'AWS Wavelength', url: `https://medium.com/expertminds/aws-hybrid-edge-compute-services-outposts-vmware-cloud-and-wavelength-81b54a268220` },
    ],
  },
  {
    category: 'Containers',
    icon: '🐳',
    resources: [
      { service: 'Amazon ECR', url: `https://medium.com/expertminds/aws-container-services-ecr-ecs-eks-and-beyond-0a75f02cb28a` },
      { service: 'Amazon ECS', url: `https://medium.com/expertminds/aws-container-services-ecr-ecs-eks-and-beyond-0a75f02cb28a` },
      { service: 'Amazon ECS Anywhere', url: `https://medium.com/expertminds/aws-container-services-ecr-ecs-eks-and-beyond-0a75f02cb28a` },
      { service: 'Amazon EKS', url: `https://medium.com/expertminds/aws-container-services-ecr-ecs-eks-and-beyond-0a75f02cb28a` },
      { service: 'Amazon EKS Anywhere', url: `https://medium.com/expertminds/aws-container-services-ecr-ecs-eks-and-beyond-0a75f02cb28a` },
      { service: 'Amazon EKS Distro', url: `https://medium.com/expertminds/aws-container-services-ecr-ecs-eks-and-beyond-0a75f02cb28a` },
    ],
  },
  {
    category: 'Database',
    icon: '🛢️',
    resources: [
      { service: 'Amazon Aurora', url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
      { service: 'Amazon Aurora Serverless',url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
      { service: 'Amazon DocumentDB', url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
      { service: 'Amazon DynamoDB', url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
      { service: 'Amazon ElastiCache', url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
      { service: 'Amazon Keyspaces', url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
      { service: 'Amazon Neptune', url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
      { service: 'Amazon RDS', url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
      { service: 'Amazon Redshift', url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
    ],
  },
  {
    category: 'Developer Tools',
    icon: '🛠️',
    resources: [
      { service: 'AWS X-Ray', url: `https://github.com/Amitpnk/AWS-Solutions-Architect-Associate-Exam/blob/main/README.md#aws-x-ray` },
    ],
  },
  {
    category: 'Front-End Web and Mobile',
    icon: '📱',
    resources: [
      { service: 'AWS Amplify', url: `${BLOG_BASE}/aws-amplify` },
      { service: 'Amazon API Gateway', url: `${BLOG_BASE}/amazon-api-gateway` },
      { service: 'AWS Device Farm', url: `${BLOG_BASE}/aws-device-farm` },
    ],
  },
  {
    category: 'Machine Learning',
    icon: '🤖',
    resources: [
      { service: 'Amazon Comprehend', url: `${BLOG_BASE}/amazon-comprehend` },
      { service: 'Amazon Kendra', url: `${BLOG_BASE}/amazon-kendra` },
      { service: 'Amazon Lex', url: `${BLOG_BASE}/amazon-lex` },
      { service: 'Amazon Polly', url: `${BLOG_BASE}/amazon-polly` },
      { service: 'Amazon Rekognition', url: `${BLOG_BASE}/amazon-rekognition` },
      { service: 'Amazon SageMaker AI', url: `${BLOG_BASE}/amazon-sagemaker` },
      { service: 'Amazon Textract', url: `${BLOG_BASE}/amazon-textract` },
      { service: 'Amazon Transcribe', url: `${BLOG_BASE}/amazon-transcribe` },
      { service: 'Amazon Translate', url: `${BLOG_BASE}/amazon-translate` },
    ],
  },
  {
    category: 'Management and Governance',
    icon: '🏛️',
    resources: [
      { service: 'AWS Auto Scaling', url: `${BLOG_BASE}/aws-auto-scaling` },
      { service: 'AWS CLI', url: `${BLOG_BASE}/aws-cli` },
      { service: 'AWS CloudFormation', url: `${BLOG_BASE}/aws-cloudformation` },
      { service: 'AWS CloudTrail', url: `${BLOG_BASE}/aws-cloudtrail` },
      { service: 'Amazon CloudWatch', url: `${BLOG_BASE}/amazon-cloudwatch` },
      { service: 'AWS Compute Optimizer', url: `${BLOG_BASE}/aws-compute-optimizer` },
      { service: 'AWS Config', url: `${BLOG_BASE}/aws-config` },
      { service: 'AWS Control Tower', url: `${BLOG_BASE}/aws-control-tower` },
      { service: 'AWS Health Dashboard', url: `${BLOG_BASE}/aws-health-dashboard` },
      { service: 'AWS License Manager', url: `${BLOG_BASE}/aws-license-manager` },
      { service: 'Amazon Managed Grafana', url: `${BLOG_BASE}/amazon-managed-grafana` },
      { service: 'Amazon Managed Service for Prometheus', url: `${BLOG_BASE}/amazon-managed-prometheus` },
      { service: 'AWS Management Console', url: `${BLOG_BASE}/aws-management-console` },
      { service: 'AWS Organizations', url: `${BLOG_BASE}/aws-organizations` },
      { service: 'AWS Service Catalog', url: `${BLOG_BASE}/aws-service-catalog` },
      { service: 'AWS Systems Manager', url: `${BLOG_BASE}/aws-systems-manager` },
      { service: 'AWS Trusted Advisor', url: `${BLOG_BASE}/aws-trusted-advisor` },
      { service: 'AWS Well-Architected Tool', url: `${BLOG_BASE}/aws-well-architected-tool` },
    ],
  },
  {
    category: 'Media Services',
    icon: '🎬',
    resources: [
      { service: 'Amazon Elastic Transcoder', url: `${BLOG_BASE}/amazon-elastic-transcoder` },
      { service: 'Amazon Kinesis Video Streams', url: `${BLOG_BASE}/kinesis-video-streams` },
    ],
  },
  {
    category: 'Migration and Transfer',
    icon: '🚚',
    resources: [
      { service: 'AWS Application Migration Service', url: `${BLOG_BASE}/aws-application-migration-service` },
      { service: 'AWS DataSync', url: `${BLOG_BASE}/aws-datasync` },
      { service: 'AWS DMS', url: `${BLOG_BASE}/aws-dms` },
      { service: 'AWS Snow Family', url: `${BLOG_BASE}/aws-snow-family` },
      { service: 'AWS Transfer Family', url: `${BLOG_BASE}/aws-transfer-family` },
    ],
  },
  {
    category: 'Networking and Content Delivery',
    icon: '🌐',
    resources: [
      { service: 'AWS Client VPN', url: `https://medium.com/expertminds/networking-content-delivery-on-aws-2060143a5887` },
      { service: 'Amazon CloudFront', url: `https://medium.com/expertminds/networking-content-delivery-on-aws-2060143a5887` },
      { service: 'AWS Direct Connect', url: `https://medium.com/expertminds/networking-content-delivery-on-aws-2060143a5887` },
      { service: 'Elastic Load Balancing', url: `https://medium.com/expertminds/networking-content-delivery-on-aws-2060143a5887` },
      { service: 'AWS Global Accelerator', url: `https://medium.com/expertminds/networking-content-delivery-on-aws-2060143a5887` },
      { service: 'AWS PrivateLink', url: `https://medium.com/expertminds/networking-content-delivery-on-aws-2060143a5887` },
      { service: 'Amazon Route 53', url: `https://medium.com/expertminds/networking-content-delivery-on-aws-2060143a5887` },
      { service: 'AWS Site-to-Site VPN', url: `https://medium.com/expertminds/networking-content-delivery-on-aws-2060143a5887` },
      { service: 'AWS Transit Gateway', url: `https://medium.com/expertminds/networking-content-delivery-on-aws-2060143a5887` },
      { service: 'Amazon VPC', url: `https://medium.com/expertminds/networking-content-delivery-on-aws-2060143a5887` },
    ],
  },
  {
    category: 'Security, Identity, and Compliance',
    icon: '🔒',
    resources: [
      { service: 'AWS Artifact', url: `https://medium.com/expertminds/aws-threat-detection-security-monitoring-services-explained-9b0b09789cfd` },
      { service: 'AWS Audit Manager', url: `https://medium.com/expertminds/aws-threat-detection-security-monitoring-services-explained-9b0b09789cfd` },
      { service: 'AWS Certificate Manager',  url: `https://medium.com/expertminds/data-protection-encryption-on-aws-explained-for-security-architects-d3ea417fda68` },
      { service: 'AWS CloudHSM',  url: `https://medium.com/expertminds/data-protection-encryption-on-aws-explained-for-security-architects-d3ea417fda68` },
      { service: 'Amazon Cognito', url: `https://medium.com/expertminds/mastering-identity-access-management-on-aws-for-security-certification-85c7e5452709` },
      { service: 'Amazon Detective', url: `https://medium.com/expertminds/aws-threat-detection-security-monitoring-services-explained-9b0b09789cfd` },
      { service: 'AWS Directory Service', url: `https://medium.com/expertminds/mastering-identity-access-management-on-aws-for-security-certification-85c7e5452709` },
      { service: 'AWS Firewall Manager', url: `https://medium.com/expertminds/aws-network-security-ddos-protection-explained-1030a339c363` },
      { service: 'Amazon GuardDuty', url: `https://medium.com/expertminds/aws-threat-detection-security-monitoring-services-explained-9b0b09789cfd` },
      { service: 'AWS IAM Identity Center', url: `https://medium.com/expertminds/mastering-identity-access-management-on-aws-for-security-certification-85c7e5452709` },
      { service: 'Amazon Inspector', url: `https://medium.com/expertminds/aws-threat-detection-security-monitoring-services-explained-9b0b09789cfd` },
      { service: 'AWS KMS', url: `https://medium.com/expertminds/data-protection-encryption-on-aws-explained-for-security-architects-d3ea417fda68` },
      { service: 'Amazon Macie',  url: `https://medium.com/expertminds/data-protection-encryption-on-aws-explained-for-security-architects-d3ea417fda68` },
      { service: 'AWS Network Firewall', url: `https://medium.com/expertminds/aws-network-security-ddos-protection-explained-1030a339c363` },
      { service: 'AWS Resource Access Manager', url: `https://medium.com/expertminds/mastering-identity-access-management-on-aws-for-security-certification-85c7e5452709` },
      { service: 'AWS Secrets Manager',  url: `https://medium.com/expertminds/data-protection-encryption-on-aws-explained-for-security-architects-d3ea417fda68` },
      { service: 'AWS Security Hub', url: `https://medium.com/expertminds/aws-threat-detection-security-monitoring-services-explained-9b0b09789cfd` },
      { service: 'AWS Shield', url: `https://medium.com/expertminds/aws-network-security-ddos-protection-explained-1030a339c363` },
      { service: 'AWS WAF', url: `https://medium.com/expertminds/aws-network-security-ddos-protection-explained-1030a339c363` },
      { service: 'IAM', url: `https://medium.com/expertminds/mastering-identity-access-management-on-aws-for-security-certification-85c7e5452709` },
    ],
  },
  {
    category: 'Serverless',
    icon: '⚡',
    resources: [
      { service: 'AWS AppSync', url: `https://medium.com/expertminds/serverless-on-aws-a1c9a190df70` },
      { service: 'AWS Fargate', url: `https://medium.com/expertminds/serverless-on-aws-a1c9a190df70` },
      { service: 'AWS Lambda', url: `https://medium.com/expertminds/serverless-on-aws-a1c9a190df70` },
    ],
  },
  {
    category: 'Storage',
    icon: '🗄️',
    resources: [
      { service: 'AWS Backup', url: `${BLOG_BASE}/aws-backup` },
      { service: 'Amazon EBS', url: `${BLOG_BASE}/amazon-ebs` },
      { service: 'Amazon EFS', url: `${BLOG_BASE}/amazon-efs` },
      { service: 'Amazon FSx', url: `${BLOG_BASE}/amazon-fsx` },
      { service: 'Amazon S3', url: `${BLOG_BASE}/amazon-s3` },
      { service: 'Amazon S3 Glacier', url: `${BLOG_BASE}/amazon-s3-glacier` },
      { service: 'AWS Storage Gateway', url: `${BLOG_BASE}/aws-storage-gateway` },
    ],
  },
];
