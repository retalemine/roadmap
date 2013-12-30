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

