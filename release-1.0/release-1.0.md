####Action items:
* Use case scenarios for each functionality
* Mongo Query for each functionality
* General product schema design
* General bill schema design
* Overall architecture with distributed components and multi terminals
* BL layer creation
* UI design for each functionality
* UI layer creation
* Printer support configuration
* Multi language implementation

---
###Design:
* Managing price for products.
  * Products can come with price tags that shouldn't be amended overtime. [ _unbounded, as stock varies_ ]
  * Products whose price tag has to be amended overtime. [ _single priced, market driven_ ]
* Product catalog creation.
  * Instantly as and when a bill is generated for all those items not suggested and for all those items whose price is changed
  * As batch job, to process all the bills that are created after a point of time and saving the timestamp for next batch job execution.
* Archival of products and price.

Instant process | Queue service | Batch process
---|---|---
_Tightly coupled with billing process._ | Involes event triggering. May interfer with billing process. Loosely coupled. | Doesn't interfer with billing process. Completely loosely coupled.
Can track those items that are new or with new price and hits DB only for those records. | Event gets triggered only for new products or products with new price. Chances are there for duplicate events getting triggered at certain intervals. | No tracking, so the job as to be run periodically irrespective of inventory up-to-date or not. _High possibility of redundant hit to DB._
High possibility of getting suggested in next billing. | Possibility of getting suggested in next billing depends on queue performance. | Not until the job is completed.
Not so easy customization. | Event can be customized. | Highly customizable as standalone.
Can mark single priced products. Thus can also remove old prices. | Can mark single priced products. Thus can also remove old prices. | Not possible to mark single priced products.
Can have additional flag to remove outdated prices. | Can have additional flag to remove outdated prices. | Not possible to remove outdated prices.

---
###Use case - 1:
1. A new product getting entered for the first time. [ _Only single price_ ]
* An existing product in different unit getting entered for the first time. [ _Only single price_ ]
* An existing product with new price getting added along with old price, making it as list. [ _convert to unbounded price_ ]
* An existing product with revised price getting overwritten over old price. [ _Only single price_ ]
* Delete an outdated price detail from an existing product set. [ _remains as unbounded category_ ]
* Mark a product type detail as outdate in collection. [ _remains passive in collection_ ]


