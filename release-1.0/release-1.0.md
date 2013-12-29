[tick]: https://raw.github.com/retalemine/roadmap/master/images/tick-16x12.png "Done"

####Action items:
* Use case scenarios for each functionality ![][tick]
* Mongo Query for each use cases ![][tick]
* General product schema design ![][tick]
* General bill schema design ![][tick]
* Overall architecture with distributed components and multi terminals
* BL layer creation
* UI design for each functionality
* UI layer creation
* Printer support configuration
* Multi language implementation

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

* Unwinded rendering of inventory data.

---
###Use cases under Functionality 1:
1. A product getting added for the first time.
* A product with different unit getting added for the first time.
* A product with different price getting added.
* A product with different price getting added and marked to delete other price details.
* A product with different price getting added and marked to delete other price details by marking it as single priced. 
* A product getting added for the first time and marked as single priced.
* A single priced product with different price getting updated.
* A single priced product with different price getting added and converted to unbounded price.

###Use cases under Functionality 2:
1. A product getting added for the first time.
* A product with different unit getting added for the first time.
* A product with different price getting added.
* A product with different price getting added and marked to delete other price details.
* A product with different price getting added and marked to delete other price details by marking it as single priced. 
* A product getting added for the first time and marked as single priced.
* A single priced product with different price getting updated.
* A single priced product with different price getting added and converted to unbounded price.

###Use cases under Functionality 3:
1. List every entry in DB.
* Search product based on name.
* Search product based on name and units.
* Search unit priced products.

###Use cases under Functionality 4:
1. On deleting a single priced product, the product itself gets deleted.
* On deleting a unbounded priced product, the outdated price alone gets removed.
* Converting a unbounded priced product to single priced product.
* Converting a single priced product to unbounded priced product.

###Use cases under Functionality 5:
1. Ajax call based on characters entered and search inventory based on name and unit.

###Use cases under Functionality 6:
1. Every bill should get saved to sales-order schema.
* Every processed bill should be rendered for reference.
* Searchable by date.
* Searchable by bill amount.
* Searchable by date and bill amount.

###Use cases under Functionality 7:
1. Bill printing

###Use cases under Functionality 8:
1. Multiple printer support

###Use cases under Functionality 9:
1. Multi language support

