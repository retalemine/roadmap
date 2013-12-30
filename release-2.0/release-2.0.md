[tick]: https://raw.github.com/retalemine/roadmap/master/images/tick-16x12.png "Done"

####Action items:
* Use case scenarios for each functionality
* Mongo Query for each use cases
* schema design
* Overall architecture with distributed components and multi terminals
* BL layer creation
* UI design for each functionality
* UI layer creation

---
###Design:
* Product catalog creation.
 * Instantly as and when a bill is generated for all those items not suggested and for all those items whose price is changed.
 * As queue processing, pushing job to queue for all those items not suggested and for all those items whose price is changed. Jobs can either be pushed straight away to queue or made to go through a staging phase where additional flag can be passed. The staging phase allows data in queue to be flagged before being processed by listener.
 * As batch job, to process all the bills that are created after a point of time and saving the timestamp for next batch job execution.

Instant process | Queue service | Batch process
---|---|---
_Tightly coupled with billing process._ | Involes event triggering. May interfer with billing process. Loosely coupled. | Doesn't interfer with billing process. Completely loosely coupled.
Can track those items that are new or with new price and hits DB only for those records. | Event gets triggered only for new products or products with new price. Chances are there for duplicate events getting triggered at certain intervals. | No tracking, so the job as to be run periodically irrespective of inventory up-to-date or not. _High possibility of redundant hit to DB._
High possibility of getting suggested in next billing. | Possibility of getting suggested in next billing depends on queue performance. | Not until the job is completed.
Not so easy customization. | Event can be customized. | Highly customizable as standalone.
Can mark single priced products and can also remove old prices. But interfer with billing process. | Can mark single priced products and can also remove old prices. Achieved by editing the data before getting pushed to queue. | Not possible to mark single priced products.
Can have additional flag to remove outdated prices. | Can have additional flag to remove outdated prices. | Not possible to remove outdated prices.

---
###Use cases under functionality 1:
1. 
