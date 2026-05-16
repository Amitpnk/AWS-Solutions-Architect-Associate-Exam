import type { ExamDefinition } from './types';

export const examRoute53: ExamDefinition = {
    "id": "exam_route53_saa_c03",
    "title": "SAA-C03 Practice Set on Route 53",
    "description": "Comprehensive exam questions covering DNS basics, Route 53 routing policies (Simple, Weighted, Latency, Failover, Geolocation, Geoproximity, IP-based, Multi Value), health checks, TTL, CNAME vs Alias, domain registration, and hybrid DNS",
    "durationSeconds": 7800,
    "questions": [
        {
            "id": "q1",
            "type": "multiple",
            "prompt": "A company needs to implement a DNS solution that distributes traffic to multiple EC2 instances with health checks for automatic failover. Which Route 53 routing policies would be appropriate? (Choose two.)",
            "options": [
                "Weighted routing to distribute traffic proportionally with health checks",
                "Failover routing with primary and secondary resources",
                "Simple routing for basic DNS resolution",
                "Latency-based routing for lowest latency across regions"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Weighted routing distributes traffic by percentage with health checks. Failover routing automatically switches to secondary on primary failure. Simple routing doesn't support health checks. Latency routing is for multi-region optimization, not primary failover needs."
        },
        {
            "id": "q2",
            "type": "single",
            "prompt": "What is the primary difference between CNAME and Alias records in Route 53?",
            "options": [
                "CNAME works for any domain; Alias only works for AWS resources",
                "CNAME can be used for root domains; Alias cannot",
                "Alias is free; CNAME incurs query charges",
                "CNAME points to IP addresses; Alias points to domain names"
            ],
            "correctOptionIndex": 0,
            "explanation": "CNAME records work for any domain but not root domains. Alias records are AWS-specific and work with AWS resources (ALB, CloudFront, S3) including root domains. Alias queries are free; CNAME queries are charged. Alias is generally preferred for AWS."
        },
        {
            "id": "q3",
            "type": "multiple",
            "prompt": "A global e-commerce application wants to direct users to the nearest regional server for optimal performance. Which Route 53 routing policies could achieve this? (Choose two.)",
            "options": [
                "Latency-based routing to automatically route to lowest-latency region",
                "Geolocation routing to route based on user's geographic location",
                "Geoproximity routing to route based on geographic location with bias",
                "Weighted routing to manually balance traffic across regions"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Latency-based routes to the region with lowest latency. Geolocation routes based on geographic location. Geoproximity also uses location but adds bias adjustment. Weighted routing requires manual percentage configuration."
        },
        {
            "id": "q4",
            "type": "single",
            "prompt": "You create a Route 53 health check that fails. What is the TTL impact on DNS resolution?",
            "options": [
                "The TTL immediately decreases to 1 second",
                "DNS clients continue using cached responses until TTL expires",
                "The health check failure has no direct impact on TTL",
                "The record is immediately removed from DNS"
            ],
            "correctOptionIndex": 2,
            "explanation": "Health check failures don't directly affect TTL. DNS clients use cached responses until TTL expires. Once TTL expires, clients query again and get the health check result. Failover routing can redirect to healthy records based on health checks."
        },
        {
            "id": "q5",
            "type": "multiple",
            "prompt": "A company registers a domain with a third-party registrar but wants to use Route 53 for DNS management. Which configurations are needed? (Choose two.)",
            "options": [
                "Create a Route 53 hosted zone for the domain",
                "Update nameservers at the third-party registrar to point to Route 53",
                "Migrate the domain from the registrar to Route 53",
                "Create DNS records in Route 53 hosted zone"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Create Route 53 hosted zone, get its nameservers, then update nameservers at the registrar. You don't need to migrate the domain (it can stay at the registrar). Create records in Route 53 once nameservers are updated."
        },
        {
            "id": "q6",
            "type": "single",
            "prompt": "You create an Alias record pointing to an ALB. After the ALB is deleted, what happens to DNS queries to the Alias record?",
            "options": [
                "Route 53 returns the cached Alias record",
                "Route 53 detects the missing resource and returns NXDOMAIN",
                "The Alias record continues to exist but becomes invalid",
                "DNS clients receive a timeout error"
            ],
            "correctOptionIndex": 1,
            "explanation": "Route 53 Alias records are intelligent—they check if the target resource exists. If the ALB is deleted, Route 53 returns NXDOMAIN (Non-Existent Domain) to indicate the record is invalid. This is an advantage of Alias over CNAME."
        },
        {
            "id": "q7",
            "type": "multiple",
            "prompt": "A company wants to implement blue-green deployment with DNS-based traffic switching. Which Route 53 configurations support this? (Choose two.)",
            "options": [
                "Weighted routing to shift traffic percentages between blue and green environments",
                "Failover routing with blue as primary and green as secondary",
                "Simple routing to alternate between blue and green records",
                "Alias records pointing to both ALBs with health checks"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Weighted routing gradually shifts traffic (e.g., 100% blue → 50/50 → 100% green). Failover routing can switch instantly (blue primary, green secondary). Simple routing doesn't support health checks. Alias records with health checks enable failover."
        },
        {
            "id": "q8",
            "type": "single",
            "prompt": "You set a TTL of 3600 seconds for a Route 53 record. A DNS client caches the response. How long will the client use the cached record?",
            "options": [
                "3600 seconds (1 hour)",
                "Until the client restarts",
                "Indefinitely",
                "30 seconds (Route 53 default)"
            ],
            "correctOptionIndex": 0,
            "explanation": "TTL (Time-to-Live) of 3600 seconds means DNS clients cache the response for 1 hour. After 1 hour, the client must query again. TTL doesn't depend on client restart or have indefinite caching."
        },
        {
            "id": "q9",
            "type": "multiple",
            "prompt": "A company needs to serve different content to users based on their geographic location. Which Route 53 routing policies support this? (Choose two.)",
            "options": [
                "Geolocation routing to route based on user country/state/continent",
                "Geoproximity routing to route based on geographic coordinates with bias",
                "Latency-based routing to route based on closest region",
                "IP-based routing to route based on client IP address location"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Geolocation routes by user location (country/state/continent). Geoproximity uses location with bias adjustment for fine-tuning. Latency and IP-based can indirectly achieve location-based routing but aren't the primary intent."
        },
        {
            "id": "q10",
            "type": "single",
            "prompt": "You configure Route 53 failover routing with a primary and secondary resource. When will the secondary resource be used?",
            "options": [
                "When the primary resource is unhealthy (health check fails)",
                "Randomly, alternating between primary and secondary",
                "When primary load exceeds a threshold",
                "During scheduled maintenance windows"
            ],
            "correctOptionIndex": 0,
            "explanation": "Failover routing switches to secondary only when primary fails health checks. It's not random or load-based. Failover is automatic based on health check results."
        },
        {
            "id": "q11",
            "type": "multiple",
            "prompt": "A Route 53 health check is configured with interval of 30 seconds and failure threshold of 3. How long before a resource is marked unhealthy?",
            "options": [
                "30 seconds (on first failure)",
                "At least 90 seconds (3 consecutive failures × 30 seconds)",
                "Could be 90-120 seconds depending on timing",
                "3 minutes (Route 53 default)"
            ],
            "correctOptionIndexes": [1, 2],
            "explanation": "With interval of 30 seconds and failure threshold of 3, it takes at least 3 × 30 = 90 seconds. Due to check timing, it could take up to 120 seconds. Health checks must fail the specified number of times before marking unhealthy."
        },
        {
            "id": "q12",
            "type": "single",
            "prompt": "You need to use a Route 53 Alias record to point to an S3 website endpoint. Which S3 configuration is required?",
            "options": [
                "Enable S3 static website hosting",
                "Create a CloudFront distribution first",
                "Configure S3 bucket CORS",
                "No special configuration is needed"
            ],
            "correctOptionIndex": 0,
            "explanation": "S3 Alias records require S3 static website hosting to be enabled on the bucket. This creates an HTTP endpoint that Route 53 can point to. CloudFront and CORS are optional but not required for Alias records."
        },
        {
            "id": "q13",
            "type": "multiple",
            "prompt": "A multi-region application uses Route 53 with latency-based routing. What factors determine which region's resources are used? (Choose two.)",
            "options": [
                "The region with the lowest latency from the DNS client's location",
                "Health check status of resources in each region",
                "The geographic location of the user",
                "The time of day and traffic patterns"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Latency-based routing selects the lowest-latency region. Health checks determine if a region's resources are available. Geographic location is used by geolocation routing, not latency. Time and traffic patterns aren't factors (those are manual with weighted routing)."
        },
        {
            "id": "q14",
            "type": "single",
            "prompt": "What is the difference between Route 53 health checks and CloudWatch alarms?",
            "options": [
                "Health checks monitor AWS resources; CloudWatch alarms monitor metrics",
                "Route 53 health checks are redundant with CloudWatch alarms",
                "Health checks are free; CloudWatch alarms require CloudWatch",
                "CloudWatch alarms trigger failover; health checks provide monitoring"
            ],
            "correctOptionIndex": 0,
            "explanation": "Route 53 health checks monitor endpoint health (HTTP, TCP, calculated checks). CloudWatch alarms monitor metrics (CPU, disk, custom metrics). Both serve different purposes and are often used together."
        },
        {
            "id": "q15",
            "type": "multiple",
            "prompt": "A company has two data centers and wants traffic distributed proportionally (60% to DC1, 40% to DC2) with automatic failover if one fails. Which routing policies could achieve this? (Choose two.)",
            "options": [
                "Weighted routing with 60/40 weights and health checks",
                "Failover routing (primary/secondary)",
                "Latency routing to balance based on response time",
                "Simple routing with multiple records"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Weighted routing allows exact percentage distribution (60/40) with health checks for failover. Failover routing provides failover but not proportional distribution. Latency routing is automatic but may not achieve exact percentages. Simple routing doesn't support health checks."
        },
        {
            "id": "q16",
            "type": "single",
            "prompt": "You create a Route 53 record with TTL of 60 seconds. A client queries the record and caches it. You update the record in Route 53. When will the client see the updated record?",
            "options": [
                "Immediately",
                "Within 60 seconds (when TTL expires)",
                "After 5 minutes",
                "Only after manual cache clearing"
            ],
            "correctOptionIndex": 1,
            "explanation": "Clients cache DNS records for the TTL duration. With 60-second TTL, updates are visible to clients within 60 seconds. Lower TTL allows faster propagation but increases DNS query load. This is why shorter TTL is used before planned changes."
        },
        {
            "id": "q17",
            "type": "multiple",
            "prompt": "Route 53 is configured with Geolocation routing. A user's location doesn't match any specific geolocation rule. What routing options are available? (Choose two.)",
            "options": [
                "Route to a default location rule",
                "Return NXDOMAIN (no answer)",
                "Route based on latency as fallback",
                "Require the user to specify location"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Geolocation routing can have a default rule for unmatched locations. Alternatively, no answer (NXDOMAIN) is returned. There's no automatic fallback to latency or user specification required."
        },
        {
            "id": "q18",
            "type": "single",
            "prompt": "You need to point example.com (root domain) to an Application Load Balancer. Which Route 53 record type should you use?",
            "options": [
                "CNAME record",
                "A record",
                "Alias A record pointing to ALB",
                "NS record"
            ],
            "correctOptionIndex": 2,
            "explanation": "CNAME records cannot be used for root domains. Standard A records require IP addresses (ALB IPs change). Alias A records are the preferred solution—they point to ALB and are AWS-specific. NS records are for nameserver delegation."
        },
        {
            "id": "q19",
            "type": "multiple",
            "prompt": "A company implements IP-based routing in Route 53 to control access based on client IP location. Which scenarios are appropriate? (Choose two.)",
            "options": [
                "Route internal users (specific IP ranges) to different content",
                "Route based on geographic location without knowing exact IP ranges",
                "Direct employees from specific office networks to different endpoints",
                "Prevent access from certain geographic regions"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "IP-based routing works when you know specific IP ranges (internal networks, office IPs). It's not suitable for geographic routing without knowing IP ranges. IP-based routing is useful for internal/partner networks. Geolocation routing is better for geographic prevention."
        },
        {
            "id": "q20",
            "type": "single",
            "prompt": "Route 53 Geoproximity routing is configured with a bias of +100. What is the effect of this bias?",
            "options": [
                "Increases the geographic distance by 100 kilometers",
                "Expands the region of effect by 100% (bias pulls more traffic to this location)",
                "Sets a 100-millisecond latency threshold",
                "Routes 100% of traffic to this location"
            ],
            "correctOptionIndex": 1,
            "explanation": "Geoproximity bias of +100 expands the geographic radius of the location, pulling more traffic toward it (compared to negative bias which contracts the radius). Bias is a percentage adjustment, not distance or latency."
        },
        {
            "id": "q21",
            "type": "multiple",
            "prompt": "A company uses Route 53 with weighted routing for A/B testing. One variant is performing poorly. What actions can improve the situation? (Choose two.)",
            "options": [
                "Reduce the weight percentage for the poor-performing variant",
                "Add a health check to detect poor performance and failover",
                "Temporarily set the weight to 0% to route no traffic to poor variant",
                "Delete the poor variant record entirely"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Reducing weight or setting to 0% immediately reduces traffic to poor variant. Health checks can detect unhealthy variants for automatic failover. Deleting the record ends the test abruptly. Weighted routing allows gradual testing without complete removal."
        },
        {
            "id": "q22",
            "type": "single",
            "prompt": "What is Route 53 Alias record's key advantage over CNAME records for AWS resources?",
            "options": [
                "Alias records are faster (lower latency)",
                "Alias records work at the root domain level and are free",
                "Alias records support all DNS record types",
                "Alias records automatically update when target IP changes"
            ],
            "correctOptionIndex": 3,
            "explanation": "Alias records automatically follow the target's IP changes (especially important for ALBs with dynamic IPs). They work at root domains (CNAME limitation) and are free. They're AWS-specific and only work with AWS resources."
        },
        {
            "id": "q23",
            "type": "multiple",
            "prompt": "Route 53 hosted zone is created for example.com. Which features become available? (Choose two.)",
            "options": [
                "Ability to create DNS records (A, AAAA, CNAME, Alias, MX, TXT, etc.)",
                "Automatic domain registration with Route 53",
                "Unique nameservers for the hosted zone provided by AWS",
                "Automatic SSL certificate generation for the domain"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Hosted zones allow DNS record creation and provide AWS nameservers. Domain registration is optional (can use any registrar). SSL certificates are separate (ACM or other CAs)."
        },
        {
            "id": "q24",
            "type": "single",
            "prompt": "You configure Route 53 failover routing with a primary and secondary. The primary becomes healthy again after being unhealthy. What happens?",
            "options": [
                "Traffic immediately switches back to primary",
                "Traffic gradually shifts back to primary",
                "Traffic remains on secondary",
                "Manual intervention is required to switch back"
            ],
            "correctOptionIndex": 0,
            "explanation": "Failover routing automatically switches traffic back to primary when it becomes healthy (health check passes). There's no gradual shift—it's automatic and immediate."
        },
        {
            "id": "q25",
            "type": "multiple",
            "prompt": "A global company needs to implement DNS failover with health checks. Which health check configurations should be considered? (Choose two.)",
            "options": [
                "HTTP/HTTPS health checks on application endpoints",
                "TCP health checks for non-HTTP services",
                "CloudWatch Alarm-based health checks for metric monitoring",
                "Simple DNS resolution checks without endpoint verification"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "HTTP/HTTPS checks verify application health. TCP checks work for non-HTTP services. CloudWatch Alarm checks monitor metrics. Simple DNS resolution isn't a health check type—it doesn't verify endpoint health."
        },
        {
            "id": "q26",
            "type": "single",
            "prompt": "Route 53 Multi Value routing is used with 3 records, each with health checks enabled. At least one record is unhealthy. What happens?",
            "options": [
                "All 3 records are returned regardless of health",
                "Only healthy records are returned; unhealthy records are excluded",
                "One random record is returned",
                "All records are marked as unhealthy"
            ],
            "correctOptionIndex": 1,
            "explanation": "Multi Value routing returns multiple healthy records (up to 8). Unhealthy records are automatically excluded from responses. This differs from simple routing which returns all records regardless of health."
        },
        {
            "id": "q27",
            "type": "multiple",
            "prompt": "A company uses Route 53 with DNS firewall to control DNS queries. Which use cases are appropriate? (Choose two.)",
            "options": [
                "Block access to domains known to contain malware",
                "Block DNS queries to specific internal domain suffixes",
                "Filter DNS queries based on query source IP",
                "Prevent DNS data exfiltration to external DNS servers"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Route 53 Resolver DNS Firewall can block malicious domains and filter by source IP. It's designed for security filtering. Internal domain access control and data exfiltration prevention have other solutions."
        },
        {
            "id": "q28",
            "type": "single",
            "prompt": "You have Route 53 Resolver configured for hybrid DNS resolution between on-premises and AWS. Which component enables this?",
            "options": [
                "Route 53 Alias records",
                "Route 53 Resolver Endpoints (inbound and outbound)",
                "CloudWatch monitoring",
                "VPC endpoints"
            ],
            "correctOptionIndex": 1,
            "explanation": "Route 53 Resolver Endpoints enable hybrid DNS: inbound endpoints accept queries from on-premises, outbound endpoints forward queries to on-premises DNS. This enables bidirectional DNS resolution between environments."
        },
        {
            "id": "q29",
            "type": "multiple",
            "prompt": "Route 53 is being used for a mission-critical application requiring high availability. Which redundancy measures should be implemented? (Choose two.)",
            "options": [
                "Use multiple Route 53 hosted zones (not possible - single hosted zone per domain)",
                "Combine Alias records with health checks for automatic failover",
                "Use failover or weighted routing policies with multi-region resources",
                "Rely on Route 53 as sole DNS (Route 53 is highly available by default)"
            ],
            "correctOptionIndexes": [1, 2],
            "explanation": "One hosted zone per domain (no multiple zones). Alias + health checks enable failover. Failover/weighted policies support multi-region HA. Route 53 itself is highly available (replicated globally)."
        },
        {
            "id": "q30",
            "type": "single",
            "prompt": "You transfer a domain from another registrar to Route 53. During the transfer, will the domain stop resolving?",
            "options": [
                "Yes, for 24-48 hours during transfer",
                "No, if nameservers are updated before transfer completes",
                "Only if you don't update nameservers at the old registrar",
                "Depends on TTL settings"
            ],
            "correctOptionIndex": 1,
            "explanation": "If you update nameservers to Route 53's nameservers before completing the transfer, the domain continues resolving (no downtime). Once nameservers point to Route 53, it handles DNS regardless of transfer status."
        },
        {
            "id": "q31",
            "type": "multiple",
            "prompt": "A company implements Route 53 Simple routing for a load-balanced application. What are the limitations? (Choose two.)",
            "options": [
                "Cannot use health checks (all records returned)",
                "Cannot use Alias records",
                "Cannot distribute traffic proportionally",
                "Cannot set TTL values"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Simple routing doesn't support health checks—all records are always returned. It doesn't support weighted distribution. Alias records and TTL values work fine with simple routing."
        },
        {
            "id": "q32",
            "type": "single",
            "prompt": "Route 53 Weighted routing has two records: Weight 100 and Weight 0. How is traffic distributed?",
            "options": [
                "100% to the Weight 100 record",
                "50% each (weights are relative)",
                "0% to Weight 100, 100% to Weight 0",
                "Alternating between the two"
            ],
            "correctOptionIndex": 0,
            "explanation": "Weights determine proportional distribution. Weight 100 vs Weight 0 = 100% to the non-zero weight. Total weight is 100, so 100/(100+0) = 100%. Setting weight to 0 effectively disables a record."
        },
        {
            "id": "q33",
            "type": "multiple",
            "prompt": "Route 53 is configured with Latency-based routing across 3 regions. A region experiences network issues increasing latency. What happens? (Choose two.)",
            "options": [
                "Route 53 automatically detects increased latency and shifts traffic to lower-latency regions",
                "Users in affected region experience degraded performance until latency improves",
                "Health check failures in the affected region trigger failover",
                "Traffic is equally distributed across regions regardless of latency changes"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Latency routing automatically shifts based on latency changes (detected by Route 53 measurements). Health check failures can trigger failover. Latency routing is dynamic and adapts to network conditions."
        },
        {
            "id": "q34",
            "type": "single",
            "prompt": "You need to implement blue-green deployment with DNS-based switching. The production (green) endpoint is the current endpoint, and blue is the new version. Which approach is recommended?",
            "options": [
                "Use Simple routing to alternate records",
                "Use Weighted routing with 100% weight on green, then gradually shift to blue",
                "Use Failover routing with green as primary and blue as secondary",
                "Use Latency routing for automatic switching"
            ],
            "correctOptionIndex": 1,
            "explanation": "Weighted routing allows controlled gradual traffic shift (100% green → 90/10 green/blue → 50/50 → 0/100 blue). This is the blue-green pattern. Failover is for HA, not gradual deployment. Simple doesn't support weights."
        },
        {
            "id": "q35",
            "type": "multiple",
            "prompt": "Route 53 DNS query logging is enabled. Which information is captured in the logs? (Choose two.)",
            "options": [
                "Query timestamp, domain name, and query type (A, AAAA, CNAME, etc.)",
                "DNS response code (NOERROR, NXDOMAIN, SERVFAIL, etc.)",
                "Query response time and latency",
                "Client IP address and user identity"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Route 53 query logs capture timestamp, domain, query type, response code. They don't include response time metrics or detailed user information. Logs are stored in CloudWatch Logs."
        },
        {
            "id": "q36",
            "type": "single",
            "prompt": "A Route 53 health check is configured with an HTTP health check on port 80. The endpoint is behind an Application Load Balancer. What should the health check monitor?",
            "options": [
                "The ALB endpoint directly",
                "A specific backend EC2 instance",
                "The ALB health check endpoint",
                "A CloudWatch alarm"
            ],
            "correctOptionIndex": 0,
            "explanation": "The health check should monitor the ALB (which represents the application as a whole). Monitoring individual instances is redundant (ALB has its own health checks). CloudWatch alarm-based checks are separate."
        },
        {
            "id": "q37",
            "type": "multiple",
            "prompt": "A company uses Route 53 MX records to configure email service. Which additional records are typically needed? (Choose two.)",
            "options": [
                "SPF (TXT record) for sender authentication",
                "DKIM (TXT record) for email signing",
                "A records for mail server IP resolution",
                "CNAME records for mail forwarding"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "MX records specify mail servers. SPF (TXT) and DKIM (TXT) records enhance email security. A records resolve mail server names. CNAME records aren't typically used for email."
        },
        {
            "id": "q38",
            "type": "single",
            "prompt": "You register a domain with Route 53. How long does it take for the domain to be active and resolving?",
            "options": [
                "Immediately (seconds)",
                "Within 1-2 hours",
                "Within 24-48 hours",
                "Within 5 business days"
            ],
            "correctOptionIndex": 0,
            "explanation": "Route 53 domain registration is processed quickly. The domain becomes active within seconds to minutes (not hours or days like traditional registrars). DNS resolution is immediate once records are created."
        },
        {
            "id": "q39",
            "type": "multiple",
            "prompt": "Route 53 is integrated with CloudFront for a global web application. Which configurations are common? (Choose two.)",
            "options": [
                "Alias record pointing Route 53 domain to CloudFront distribution",
                "CloudFront distribution as the target for weighted routing",
                "CNAME record pointing to CloudFront domain name",
                "Geolocation routing to select different CloudFront distributions by region"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "Alias records point domains to CloudFront distributions (preferred method). Geolocation routing can direct users to different CDN edge locations. CNAME also works but Alias is preferred. CloudFront itself isn't a weighted routing target."
        },
        {
            "id": "q40",
            "type": "single",
            "prompt": "A Route 53 health check fails for a primary resource. The failover record is promoted. What is the expected time before traffic switches?",
            "options": [
                "Immediately (within seconds)",
                "Based on health check interval (typically 30-60 seconds minimum)",
                "Within 1-2 minutes",
                "Depends on TTL of the record (up to TTL duration)"
            ],
            "correctOptionIndex": 1,
            "explanation": "Failover routing switches based on health check failures. Time depends on health check interval (3 failures × 30 seconds = 90 seconds minimum). TTL doesn't affect failover time—that's for cached responses. Actual failover is fast once health check detects failure."
        }
    ]
};
