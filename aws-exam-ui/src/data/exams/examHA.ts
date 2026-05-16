import type { ExamDefinition } from './types';

export const examHA: ExamDefinition = {
    "id": "exam_ha_scalability_saa_c03",
    "title": "SAA-C03 Practice Set on High Availability and Scalability",
    "description": "Comprehensive exam questions covering Elastic Load Balancing (ALB, NLB, GWLB), Auto Scaling Groups, SSL/TLS, sticky sessions, cross-zone load balancing, and connection draining",
    "durationSeconds": 4800,
    "questions": [
        {
            "id": "q1",
            "type": "multiple",
            "prompt": "A company needs to distribute traffic across EC2 instances for a web application that uses WebSocket connections requiring long-lived TCP connections. Which load balancer type(s) should be considered? (Choose two.)",
            "options": [
                "Application Load Balancer (ALB) with WebSocket support",
                "Network Load Balancer (NLB) for ultra-high performance TCP connections",
                "Classic Load Balancer (ELB) for backward compatibility",
                "Gateway Load Balancer (GWLB) for appliance traffic"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "ALB supports WebSocket and long-lived connections with application-layer routing. NLB handles extreme performance and low latency for long-lived TCP connections. Classic ELB is legacy and shouldn't be chosen for new deployments. GWLB is for 3rd-party appliances, not web traffic distribution."
        },
        {
            "id": "q2",
            "type": "single",
            "prompt": "You have an Application Load Balancer distributing traffic to EC2 instances in multiple Availability Zones. Which type of routing would you use to direct requests to a microservice based on the URL path?",
            "options": [
                "Host-based routing to different target groups",
                "Path-based routing to different target groups",
                "Port-based routing to different target groups",
                "IP-based routing to different instances"
            ],
            "correctOptionIndex": 1,
            "explanation": "Path-based routing allows ALB to direct requests to different target groups based on URL path patterns (e.g., /api/* to API servers, /images/* to image servers). Host-based routing uses domain names, port-based uses TCP ports, and IP-based isn't a native ALB feature."
        },
        {
            "id": "q3",
            "type": "multiple",
            "prompt": "A financial services company requires ultra-low latency and extreme throughput for real-time trading applications. Which load balancer configuration should be implemented? (Choose two.)",
            "options": [
                "Network Load Balancer (NLB) operating at Layer 4",
                "NLB with ultra-high performance (up to 100 Gbps throughput)",
                "Application Load Balancer for content-based routing",
                "NLB with enabled cross-zone load balancing for AZ distribution"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "NLB at Layer 4 provides extreme performance with millions of requests per second and sub-millisecond latency, supporting up to 100 Gbps throughput. ALB operates at Layer 7 and has higher latency. Cross-zone adds latency for this use case (better to stay in single AZ for true ultra-low latency)."
        },
        {
            "id": "q4",
            "type": "single",
            "prompt": "Your e-commerce application uses an Application Load Balancer with sticky sessions enabled. A user fills their shopping cart and then their request is routed to a different EC2 instance. What is the likely cause?",
            "options": [
                "Sticky sessions are misconfigured",
                "The target instance was deregistered from the target group",
                "Cross-zone load balancing is enabled",
                "The duration cookie expired"
            ],
            "correctOptionIndex": 3,
            "explanation": "Sticky sessions use duration-based cookies that expire. When a cookie expires, the next request routes to any available target. Deregistration would show health check failures. Cross-zone doesn't override sticky sessions. Misconfiguration would prevent sticky sessions entirely."
        },
        {
            "id": "q5",
            "type": "multiple",
            "prompt": "A company wants to minimize latency for users in specific AWS regions while distributing load within each region. Which load balancing strategies should be implemented? (Choose two.)",
            "options": [
                "Enable cross-zone load balancing on ALB for even distribution across AZs",
                "Disable cross-zone load balancing to keep traffic in the primary AZ",
                "Use Route 53 with geolocation routing to direct users to regional load balancers",
                "Use a single NLB across multiple regions for centralized management"
            ],
            "correctOptionIndexes": [1, 2],
            "explanation": "Disabling cross-zone load balancing keeps traffic local to the primary AZ, reducing latency. Route 53 geolocation routing directs users to regional load balancers based on geography. Enabling cross-zone adds inter-AZ latency. Single NLB across regions adds significant latency."
        },
        {
            "id": "q6",
            "type": "single",
            "prompt": "You need to implement SSL/TLS termination on an Application Load Balancer for HTTPS traffic. Where should the SSL certificate be stored?",
            "options": [
                "Stored on each EC2 instance backend",
                "Stored in AWS Certificate Manager (ACM) and referenced by the ALB",
                "Embedded in the ALB configuration file",
                "Stored in an S3 bucket and referenced by the ALB"
            ],
            "correctOptionIndex": 1,
            "explanation": "AWS Certificate Manager (ACM) is the recommended way to store SSL certificates for load balancers. ACM handles certificate renewal automatically and integrates natively with ALB/NLB. Storing certificates on instances bypasses the LB encryption benefits. S3 and configuration files are insecure."
        },
        {
            "id": "q7",
            "type": "multiple",
            "prompt": "An Application Load Balancer is receiving HTTPS traffic on port 443 and needs to terminate SSL/TLS connections. Which configurations are required? (Choose two.)",
            "options": [
                "Create a listener on port 443 with HTTPS protocol",
                "Associate an SSL certificate from AWS Certificate Manager (ACM)",
                "Configure each backend EC2 instance with identical SSL certificates",
                "Add security group rule allowing inbound on port 443"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "ALB listener on port 443 with HTTPS and ACM certificate enables SSL termination. Backend instances don't need SSL certificates (traffic from ALB to backends can be HTTP). Security group rules are needed but don't configure SSL itself."
        },
        {
            "id": "q8",
            "type": "single",
            "prompt": "You're configuring connection draining on a load balancer before performing maintenance on EC2 instances. What does connection draining accomplish?",
            "options": [
                "It closes all existing connections immediately",
                "It allows existing connections to complete while preventing new connections",
                "It stops the load balancer from accepting any traffic",
                "It removes the instance from the target group permanently"
            ],
            "correctOptionIndex": 1,
            "explanation": "Connection draining (also called deregistration delay) allows existing connections to complete gracefully while the load balancer stops routing new requests to the draining instance. It doesn't close connections immediately, stop the LB entirely, or permanently deregister the instance."
        },
        {
            "id": "q9",
            "type": "multiple",
            "prompt": "A company's Auto Scaling Group needs to scale based on application demand while maintaining cost efficiency. Which scaling policies should be configured? (Choose two.)",
            "options": [
                "Target Tracking Scaling Policy to maintain a specific CloudWatch metric (e.g., CPU at 70%)",
                "Step Scaling Policy with different actions for different metric ranges",
                "Scheduled Scaling to scale instances at fixed times regardless of demand",
                "Predictive Scaling using machine learning to forecast demand"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Target Tracking automatically scales to maintain a target metric value (simplest method). Step Scaling provides fine-grained control with different actions per metric threshold. Scheduled Scaling is for known patterns (not dynamic demand). Predictive Scaling uses ML but requires historical data."
        },
        {
            "id": "q10",
            "type": "single",
            "prompt": "You have an Auto Scaling Group with 2 instances in us-east-1a and 3 instances in us-east-1b. A scale-down event occurs. Which AZ will have an instance terminated?",
            "options": [
                "us-east-1a (to rebalance toward equal distribution)",
                "us-east-1b (to terminate from the largest AZ)",
                "The AZ with the newest instances will have one terminated",
                "The termination policy determines which AZ, but typically the one with most instances"
            ],
            "correctOptionIndex": 3,
            "explanation": "Auto Scaling Group termination policies determine which instance to terminate. Default policy terminates from the AZ with the most instances (us-east-1b with 3). This helps maintain balanced distribution across AZs while scaling down."
        },
        {
            "id": "q11",
            "type": "multiple",
            "prompt": "An Application Load Balancer needs to distribute traffic based on multiple criteria (path, hostname, and HTTP headers). Which routing methods support this? (Choose two.)",
            "options": [
                "Host-based routing using different domain names",
                "Path-based routing using URL patterns",
                "Header-based routing using HTTP header values",
                "Session-based routing using sticky sessions only"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "ALB supports host-based (domain name) and path-based (URL) routing natively. Header-based and query parameter-based routing are also supported but not both mentioned. Session-based (sticky) is for maintaining affinity, not initial routing."
        },
        {
            "id": "q12",
            "type": "single",
            "prompt": "You need to monitor the health of targets in an Application Load Balancer. An instance fails the health check. What happens to traffic destined for that instance?",
            "options": [
                "Traffic is still routed to the unhealthy instance",
                "The load balancer stops routing new requests and drains connections",
                "The load balancer immediately terminates all connections",
                "The instance is automatically removed from the target group"
            ],
            "correctOptionIndex": 1,
            "explanation": "When an instance fails a health check, the load balancer marks it as unhealthy and stops routing NEW requests to it. Existing connections may continue briefly (depending on draining settings). The instance isn't automatically removed, and existing connections are drained gracefully."
        },
        {
            "id": "q13",
            "type": "multiple",
            "prompt": "A company is deploying a multi-tier application with different load balancing requirements per tier. Which load balancer types are best suited for different scenarios? (Choose two.)",
            "options": [
                "Network Load Balancer (NLB) for web tier with extreme performance requirements",
                "Application Load Balancer (ALB) for API tier with path-based routing to microservices",
                "Gateway Load Balancer (GWLB) for database tier traffic distribution",
                "Classic Load Balancer (CLB) for legacy application compatibility"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "NLB is ideal for web tier needing extreme performance. ALB is perfect for API tier with content-based routing. GWLB is for 3rd-party appliances (security, analytics), not database traffic. CLB is legacy and shouldn't be chosen for new deployments."
        },
        {
            "id": "q14",
            "type": "single",
            "prompt": "An Application Load Balancer has cross-zone load balancing enabled and 2 AZs with different numbers of instances (AZ1: 5 instances, AZ2: 1 instance). How is traffic distributed?",
            "options": [
                "80% to AZ1, 20% to AZ2 (proportional to instance count)",
                "50% to AZ1, 50% to AZ2 (equal per AZ)",
                "100% to AZ1 (concentrates on largest AZ)",
                "Traffic is distributed only within each AZ separately"
            ],
            "correctOptionIndex": 1,
            "explanation": "With cross-zone load balancing enabled, the load balancer distributes traffic equally across AZs (50/50), not proportional to instance count. Within each AZ, traffic is then distributed to targets. This ensures even load distribution regardless of capacity differences."
        },
        {
            "id": "q15",
            "type": "multiple",
            "prompt": "A company wants to implement high availability for a stateless web application across multiple AZs. Which components should be configured together? (Choose two.)",
            "options": [
                "Application Load Balancer with listeners and target groups across multiple AZs",
                "Auto Scaling Group with minimum size of at least 2 instances in different AZs",
                "Network Load Balancer instead of ALB for better availability",
                "Multi-AZ RDS database to persist session data"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "ALB across AZs with ASG spanning multiple AZs provides high availability for stateless applications. NLB isn't better than ALB for this purpose. Multi-AZ RDS is for database HA, not application HA (and the app is stateless)."
        },
        {
            "id": "q16",
            "type": "single",
            "prompt": "You configure sticky sessions on an Application Load Balancer with a duration of 1 day. After 12 hours, a user gets routed to a different instance. Why?",
            "options": [
                "The sticky session duration expired",
                "The target instance was deregistered",
                "The user's browser cleared cookies",
                "ALB lost the session mapping"
            ],
            "correctOptionIndex": 2,
            "explanation": "A 1-day duration cookie would persist, but if the user's browser clears cookies (or uses incognito/private mode), the sticky session cookie is lost. The next request routes to any available target. Cookie expiration wouldn't occur at 12 hours with a 1-day duration."
        },
        {
            "id": "q17",
            "type": "multiple",
            "prompt": "An organization needs to protect backend servers from direct internet access while using a load balancer. Which security configurations should be implemented? (Choose two.)",
            "options": [
                "Create security group for load balancer allowing inbound on port 80/443",
                "Create security group for backend instances allowing inbound from load balancer's security group",
                "Configure backend instances with public IP addresses for direct access",
                "Use security group rules referencing the load balancer security group in the backend rules"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "LB security group allows internet traffic on 80/443. Backend security group allows inbound only from LB security group (using SG reference, not IP). Backend instances shouldn't have public IPs if LB is the only entry point. This is the standard architecture for security."
        },
        {
            "id": "q18",
            "type": "single",
            "prompt": "You need to scale an Auto Scaling Group based on a custom CloudWatch metric (requests per second) instead of built-in metrics. Which scaling policy type should be used?",
            "options": [
                "Simple Scaling Policy",
                "Step Scaling Policy with custom CloudWatch alarms",
                "Target Tracking Scaling Policy with a custom metric",
                "Scheduled Scaling Policy"
            ],
            "correctOptionIndex": 2,
            "explanation": "Target Tracking Scaling Policy supports custom CloudWatch metrics in addition to built-in metrics (CPU, ALB request count). It automatically creates CloudWatch alarms and scales to maintain the target value. Simple/Step require manual alarm setup. Scheduled is time-based, not metric-based."
        },
        {
            "id": "q19",
            "type": "multiple",
            "prompt": "An Application Load Balancer is deployed across 3 AZs with instances in each AZ. Which high availability benefits are realized? (Choose two.)",
            "options": [
                "If one AZ becomes unavailable, traffic is automatically routed to instances in remaining AZs",
                "The load balancer itself is highly available and resilient to AZ failures",
                "Instances in the failed AZ are automatically replaced by the load balancer",
                "Traffic is distributed within each AZ even if instances fail health checks"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Multi-AZ ALB provides: automatic failover to remaining AZs, and the ALB service itself is managed and HA by AWS. Auto Scaling Groups (not LB) replace failed instances. Health checks already exclude unhealthy instances regardless of AZ."
        },
        {
            "id": "q20",
            "type": "single",
            "prompt": "A Gateway Load Balancer (GWLB) is deployed to distribute traffic through third-party virtual appliances. What is the primary use case?",
            "options": [
                "Distributing web application traffic across EC2 instances",
                "Load balancing database traffic for high performance",
                "Distributing traffic through security appliances (firewalls, IDS/IPS) for inspection",
                "Scaling microservices based on HTTP routes"
            ],
            "correctOptionIndex": 2,
            "explanation": "GWLB is designed to distribute traffic through chains of 3rd-party virtual appliances (firewalls, DPI, analytics) using the GENEVE protocol. It's for appliance traffic distribution, not web/database/microservice scenarios."
        },
        {
            "id": "q21",
            "type": "multiple",
            "prompt": "A company is configuring Auto Scaling Groups for both peak and off-peak capacity planning. Which strategies should be implemented? (Choose two.)",
            "options": [
                "Scheduled Scaling to increase capacity before peak hours and decrease after peak",
                "Target Tracking Scaling to automatically adjust capacity based on demand metrics",
                "Step Scaling to handle sudden traffic spikes with quick response",
                "Manual Scaling to give operators full control over capacity"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Scheduled Scaling handles known patterns (peak/off-peak times). Target Tracking provides automatic adjustment based on metrics. Step Scaling is good for handling sudden spikes with graduated responses. Manual scaling is operator-dependent and not suitable for automated planning."
        },
        {
            "id": "q22",
            "type": "single",
            "prompt": "An Auto Scaling Group has a desired capacity of 5, minimum of 2, and maximum of 10. A scale-out event tries to launch 8 instances. How many instances will be launched?",
            "options": [
                "8 instances (requested amount)",
                "5 instances (to reach desired capacity)",
                "3 instances (to reach maximum of 10)",
                "0 instances (already at desired capacity)"
            ],
            "correctOptionIndex": 2,
            "explanation": "ASG will launch only 5 instances (from current desired of 5 to maximum of 10), not 8. The maximum capacity limit acts as a hard cap. The ASG already has 5 instances at desired capacity, so only 5 more can be added to reach the max of 10."
        },
        {
            "id": "q23",
            "type": "multiple",
            "prompt": "A company needs SSL/TLS encryption between the load balancer and backend EC2 instances. Which configurations are required? (Choose two.)",
            "options": [
                "Configure ALB listener with HTTPS and install certificate on ALB",
                "Configure target group with HTTPS protocol for backend communication",
                "Install SSL certificate on each backend EC2 instance",
                "Use ALB with HTTPS listener and configure security groups for port 443"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "ALB needs HTTPS listener with certificate for client-facing encryption. Each backend instance needs SSL certificate for end-to-end encryption (optional but recommended). Target group protocol would be HTTPS if you want encrypted backend traffic. Security groups allow the traffic."
        },
        {
            "id": "q24",
            "type": "single",
            "prompt": "Your Application Load Balancer is showing increased latency when distributed across multiple AZs with cross-zone load balancing enabled. What optimization should be considered?",
            "options": [
                "Disable cross-zone load balancing to keep traffic in primary AZ",
                "Increase the number of instances in secondary AZs",
                "Switch to Network Load Balancer for lower latency",
                "Enable sticky sessions to reduce routing overhead"
            ],
            "correctOptionIndex": 0,
            "explanation": "Cross-zone load balancing adds inter-AZ latency. Disabling it keeps traffic within the primary AZ for lowest latency. Increasing instances doesn't reduce latency. NLB doesn't inherently have lower latency for ALB-type workloads. Sticky sessions don't reduce baseline latency."
        },
        {
            "id": "q25",
            "type": "multiple",
            "prompt": "An organization is implementing a blue-green deployment strategy with load balancers. Which features support this approach? (Choose two.)",
            "options": [
                "ALB can route traffic between two different target groups (blue and green environments)",
                "Connection draining allows graceful traffic shift from old to new environments",
                "Sticky sessions ensure users stay on their original environment during transition",
                "Auto Scaling Groups can create parallel capacity for both environments"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "ALB routing can direct traffic to different target groups (blue/green). Connection draining gracefully shifts existing connections during switchover. Sticky sessions aren't necessary (could even hinder the strategy). ASG can support both environments but isn't specific to blue-green."
        },
        {
            "id": "q26",
            "type": "single",
            "prompt": "You need to ensure that a user's requests always go to the same EC2 instance for session continuity. Which load balancer feature enables this?",
            "options": [
                "Health check configuration",
                "Sticky sessions (session affinity)",
                "Cross-zone load balancing",
                "Connection draining"
            ],
            "correctOptionIndex": 1,
            "explanation": "Sticky sessions use cookies to ensure requests from the same user route to the same target. Health checks determine instance availability. Cross-zone affects traffic distribution across AZs. Connection draining handles graceful shutdown."
        },
        {
            "id": "q27",
            "type": "multiple",
            "prompt": "An Auto Scaling Group needs to replace instances that fail health checks automatically. Which components should be configured? (Choose two.)",
            "options": [
                "Configure health check type (EC2 or ELB) in the ASG",
                "Set health check grace period to allow instances time to initialize",
                "Configure load balancer health checks with appropriate interval and threshold",
                "Manually trigger instance replacement when health checks fail"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "ASG health check type determines if it uses EC2 health checks or ELB health checks. Health check grace period prevents premature replacement of initializing instances. LB health checks are also important. Manual intervention defeats automation."
        },
        {
            "id": "q28",
            "type": "single",
            "prompt": "Your Application Load Balancer is receiving traffic from users in different geographic regions. To optimize for latency, what should be implemented?",
            "options": [
                "Enable cross-zone load balancing to distribute load evenly",
                "Use Route 53 with geolocation routing to direct users to regional load balancers",
                "Add more EC2 instances to the current load balancer",
                "Increase the target tracking metric threshold"
            ],
            "correctOptionIndex": 1,
            "explanation": "Route 53 geolocation routing directs users to the nearest regional load balancer, minimizing latency. Cross-zone increases latency by routing across AZs. More instances don't improve geographic latency. Metric threshold adjustment is for scaling, not latency."
        },
        {
            "id": "q29",
            "type": "multiple",
            "prompt": "A company needs to implement both horizontal and vertical scaling for their application. Which services/configurations enable this? (Choose two.)",
            "options": [
                "Auto Scaling Groups for horizontal scaling (adding/removing instances)",
                "Switching to larger instance types for vertical scaling (requires manual configuration)",
                "Network Load Balancer for increasing throughput capacity",
                "Increasing EC2 instance vCPU/memory by modifying the instance type"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "ASG provides horizontal scaling by adjusting instance count. Changing to larger instance types enables vertical scaling (resize within same family or to different family). NLB doesn't scale instances. Manual configuration for vertical scaling is typical."
        },
        {
            "id": "q30",
            "type": "single",
            "prompt": "An Application Load Balancer listener is configured with an HTTPS certificate from AWS Certificate Manager. How does the ALB handle the certificate renewal?",
            "options": [
                "Manual renewal is required before certificate expiration",
                "AWS automatically renews the certificate through ACM",
                "The certificate must be uploaded to S3 for renewal",
                "The ALB generates a new self-signed certificate automatically"
            ],
            "correctOptionIndex": 1,
            "explanation": "AWS Certificate Manager automatically manages certificate renewal for certificates associated with ALB/NLB/CloudFront. No manual action is required. Certificates don't go to S3, and self-signed certs aren't used for validated domains."
        },
        {
            "id": "q31",
            "type": "multiple",
            "prompt": "A financial application requires extremely low latency with millions of requests per second. Which load balancer and configuration should be chosen? (Choose two.)",
            "options": [
                "Network Load Balancer (NLB) operating at Layer 4 for ultra-high performance",
                "Enable NLB flow hash algorithm for consistent connection routing",
                "Disable cross-zone load balancing to minimize inter-AZ latency",
                "Application Load Balancer with path-based routing for flexibility"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "NLB at Layer 4 provides extreme performance (millions req/sec, sub-millisecond latency). Disabling cross-zone keeps traffic local for lowest latency. Flow hash algorithm maintains connection affinity. ALB at Layer 7 has higher latency than NLB."
        },
        {
            "id": "q32",
            "type": "single",
            "prompt": "You need to distribute traffic for a real-time gaming application requiring persistent connections with sub-millisecond latency. Which load balancer is most appropriate?",
            "options": [
                "Application Load Balancer for flexible routing",
                "Network Load Balancer for extreme performance and low latency",
                "Classic Load Balancer for simple distribution",
                "Gateway Load Balancer for appliance traffic"
            ],
            "correctOptionIndex": 1,
            "explanation": "Network Load Balancer provides the lowest latency (sub-millisecond) and highest performance, supporting millions of requests per second. It's ideal for real-time applications with persistent connections. ALB is higher latency due to Layer 7 processing. CLB and GWLB don't fit this use case."
        },
        {
            "id": "q33",
            "type": "multiple",
            "prompt": "An Auto Scaling Group is scaling instances based on CloudWatch CPU metrics. Which issues could prevent expected scaling? (Choose two.)",
            "options": [
                "Insufficient IAM permissions for ASG to execute scaling actions",
                "CloudWatch alarm misconfiguration with incorrect threshold or evaluation periods",
                "Load Balancer health checks marking all instances as unhealthy",
                "Sticky sessions preventing traffic from reaching new instances"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Missing IAM permissions prevent ASG from launching/terminating instances. Misconfigured alarms (threshold, evaluation periods, metrics) prevent scaling triggers. LB health checks and sticky sessions don't prevent scaling decisions (they affect routing)."
        },
        {
            "id": "q34",
            "type": "single",
            "prompt": "An Application Load Balancer target group has health check configured with interval of 30 seconds and unhealthy threshold of 2. How long until an unhealthy instance stops receiving traffic?",
            "options": [
                "30 seconds",
                "60 seconds (2 failed checks × 30 seconds)",
                "At least 60 seconds (depends on when check cycle aligns)",
                "Immediately when first health check fails"
            ],
            "correctOptionIndex": 2,
            "explanation": "With 30-second interval and unhealthy threshold of 2, it takes at least 60 seconds (2 failed checks) to mark unhealthy. The actual time depends on when the health check cycle aligns. An instance isn't immediately removed after a single failure."
        },
        {
            "id": "q35",
            "type": "multiple",
            "prompt": "A company wants to implement canary deployments with load balancers to gradually roll out new application versions. Which configurations support this? (Choose two.)",
            "options": [
                "ALB with multiple target groups routing different percentages of traffic to old/new versions",
                "Weighted target group attributes to control traffic split between versions",
                "ASG termination policies to gracefully remove old instances",
                "Route 53 weighted routing policies to shift traffic to new ALB"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "ALB listener rules can route different percentages to different target groups. Route 53 weighted routing can gradually shift traffic between ALBs. Target group weights don't exist in ALB directly. ASG termination policies are for instance removal, not traffic gradual shift."
        },
        {
            "id": "q36",
            "type": "single",
            "prompt": "You have an Auto Scaling Group with desired capacity of 4 and currently has 4 running instances. A target tracking policy triggers a scale-out to 6 instances. At what point does the desired capacity change?",
            "options": [
                "Immediately when the scaling policy decision is made",
                "When new instances reach 'running' state",
                "When new instances pass the load balancer health check",
                "After connection draining completes on existing instances"
            ],
            "correctOptionIndex": 0,
            "explanation": "The desired capacity changes immediately when the scaling policy decision is made. The ASG then launches new instances to reach the new desired capacity. Reaching 'running' state and health checks are part of the launch process but don't trigger the capacity change."
        },
        {
            "id": "q37",
            "type": "multiple",
            "prompt": "An organization is securing an Application Load Balancer to prevent unauthorized access. Which security measures should be implemented? (Choose two.)",
            "options": [
                "Configure security group for ALB allowing only required ports (80, 443)",
                "Enable AWS WAF (Web Application Firewall) on the ALB for application-layer protection",
                "Store SSL certificates in S3 with restricted access",
                "Configure backend security group to allow traffic only from ALB security group"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "ALB security group restricting ports is essential. Backend security group allowing only LB traffic adds defense-in-depth. AWS WAF provides Layer 7 protection (optional but recommended). Certificates should be in ACM, not S3."
        },
        {
            "id": "q38",
            "type": "single",
            "prompt": "A web application uses sticky sessions on the load balancer. The application deploys a new version which clears session data during startup. What happens to existing users?",
            "options": [
                "Sticky sessions persist, users continue on old session data",
                "New requests route to updated instances, causing session loss",
                "Load balancer automatically creates new sessions",
                "Sticky sessions ensure users see the new version without data loss"
            ],
            "correctOptionIndex": 0,
            "explanation": "Sticky sessions route user requests to the same instance. If that instance is updated and clears session data, the user's session is lost when they hit that instance. Sticky sessions don't prevent application-level data loss from deployments."
        },
        {
            "id": "q39",
            "type": "multiple",
            "prompt": "A company is implementing multi-tier load balancing with different requirements per tier. Which configurations are appropriate? (Choose two.)",
            "options": [
                "Web tier: ALB with host-based and path-based routing to different backend services",
                "API tier: Network Load Balancer for ultra-high performance microservice communication",
                "Database tier: Gateway Load Balancer to distribute queries across database instances",
                "Cache tier: Application Load Balancer with sticky sessions for connection affinity"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "ALB with content-based routing is perfect for web tier routing to services. NLB for API tier microservices provides high performance. GWLB isn't for databases (they have their own replication). ALB for cache isn't ideal; Redis/Memcached have their own clustering."
        },
        {
            "id": "q40",
            "type": "single",
            "prompt": "An Auto Scaling Group's scaling policy is creating too many instances during traffic spikes, overshooting the target. How can this be addressed?",
            "options": [
                "Increase the target tracking metric percentage to reduce sensitivity",
                "Reduce the scale-out cooldown period for faster decisions",
                "Enable predictive scaling to anticipate demand",
                "Increase the unhealthy instance replacement threshold"
            ],
            "correctOptionIndex": 0,
            "explanation": "Increasing the target metric percentage (e.g., from 70% to 80% CPU) reduces overshooting. Reducing cooldown causes more frequent scaling. Predictive scaling can help but doesn't directly reduce overshoot. Replacement threshold is for health checks, not target tracking."
        }
    ]
};
