###Guidelines:
* Aims to provide Business Automation Solutions
* What need to be visualized ought to be persisted for future reference => what you need is what is saved!
* Better Management of entry purchase and end sales.
* Better visualization of customer need, market need and season sales.
* Better tracking and projection of sales and company growth.
* Efficient operational cost via right purchase ensured by chosen products/company/dealer/market condition.
* Maximum profit via customer satisfaction, retain customer, customer demand, market demand, and season sales.
* Earliest entry to quench thirst of market. 
  * Product or technology shouldn’t be the bottleneck to take the end products to end users. 
  * Should be a fair and cost-effective marketing.
  * Better risk analysis and handling.
  * Risk factors [customer satisfaction, investment, time, product expiry period, market saturation, exit criteria]

---
###Features:
* Sales Management
* Inventory Management
* Purchase Management
* Business Intelligence
* Finance and accounting
* Point of Sale

---
###Design-factors:
* Cost associated with each model via each phase. 
  * Hardware and software costs.
  * Infrastructure costs like network connectivity.
* Risk factors
  * Network connectivity lost issues.
  * Server down or system crashes.
* Time availability
* Cross platform
* Open source license

---
###Guidelines for application architecture:
* Communication between presentation, business, data layer
* Loosely coupled
* Secure
* Scalable
* Zero down time
* Cross platform compatible and should target multiple devices

Desktop Application | Web Application
---|---
Requires client interface application. No dependency on browser. | No specific cleint application. Dependent on browser. Plugin optional.
Runs as separate process. | Runs as part of browser request handling.
Client side installation required. | Browser needed at client side.
Lacks open source Rich UI. | Rich UI available.
Code w.r.t network connection, concurrency, session needs extra care. | Works over http and concurrency and session are implicitly handled 
Accessible only from client interface. | Accessible from any browser and from anywhere.

---
###Guidelines for coding:
* Enhanceable over different release - extendability
* Code reuse
* Presentation be a single war
* Business and data layer be available as a standard jar
* Project setup should always start from maven archetype
* Business layer be first created
