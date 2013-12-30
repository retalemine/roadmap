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
* Unwinded rendering of inventory data.

---
###Use cases under functionality 1:
1. A product getting added for the first time.
* A product with different unit getting added for the first time.
* A product with different price getting added.
* A product with different price getting added and marked to delete other price details.

###Use cases under functionality 2:
1. List every entry in DB.
* Search product based on name.
* Search product based on name and units.

###Use cases under functionality 3:
1. Edit a product name. [Note: They are unbounded while rendering]
* Edit a product unit.
* Edit a product price.
* On deleting a unbounded priced product, the outdated price alone gets removed.

###Use cases under functionality 4:
1. * Adding a new product.
* Adding a product with different unit.
* Adding new price to a product and marked to delete all old price.

###Use cases under functionality 5:
1. Ajax call based on characters entered and search inventory based on name and unit.

###Use cases under functionality 6:
1. Every bill should get saved to sales-order schema along with biller name.
* Every processed bill should be rendered for reference.
* Searchable by date.
* Searchable by bill amount.
* Searchable by date and bill amount.
* Searchable by biller name.

###Use cases under functionality 7:
1. Bill printing

###Use cases under functionality 8:
1. Multiple printer support

###Use cases under functionality 9:
1. Multi language support

