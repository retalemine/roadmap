[tick]: https://raw.github.com/retalemine/roadmap/master/images/tick-16x12.png "Done"

####Action items:
* Use case scenarios for each functionality ![][tick]
* Mongo Query for each use cases ![][tick]
* General product schema design ![][tick]
* General bill schema design ![][tick]
* Overall architecture with distributed components and single terminal
* BL layer creation
* UI design for each functionality
* UI layer creation
* Printer support configuration
* Multi language implementation
* Application Hosting
  * OpenShift
* MongoDB Hosting
  * OpenShift Catridge
  * MongoLab

---
###Design:
* Purchase scenarios
  * pay via cash and carry
  * pay via cheque and carry
  * carry on pay via monthly base
  * order door delivery and pay via cash
  * order door delivery and pay via cheque
  * order door delivery and pay via cash on delivery
  * order door delivery and pay via cheque on delivery
  * order door delivery and pay via cash on monthly base
  * order door delivery and pay via cheque on monthly base
* Unwinded rendering of inventory data.
* BillNo
  * Format
  * Selection
* Execution environment aware code
  * Maven Profile
  * Spring ApplicationContextInitializer
* Environment specifications
  * vaadin execution environment
  * mongodb credentials
* Service retry mechanism
  * mongo options - auto-connect-retry
  * AOP
  * Persisting timeout scenarios - MongoTimeoutException {AnyServerSelector}
* Offline support for basic features

---
###Use cases under functionality 1:
1. A product getting added for the first time. ![][tick]
* A product with different unit getting added for the first time. ![][tick]
* A product with different price getting added. ![][tick]
* A product with different price getting added and marked to delete other price details. ![][tick]

###Use cases under functionality 2:
1. List every entry in DB. ![][tick]
* Search product based on name. ![][tick]
* Search product based on name and units. ![][tick]

###Use cases under functionality 3:
1. Edit a product name. [Note: They are unbounded while rendering]
* Edit a product unit.
* Edit a product price.
* On deleting a unbounded priced product, the outdated price alone gets removed.

###Use cases under functionality 4:
1. Adding a new product. ![][tick]
* Adding a product with different unit. ![][tick]
* Adding a product with different price. ![][tick]
* Adding new price to a product and marked to delete all old price. ![][tick]

###Use cases under functionality 5:
1. Ajax call based on characters entered and search inventory based on name and unit.

###Use cases under functionality 6:
1. Every bill should get saved to sales-order schema as any of the below scenarios.
  * pay via cash and carry ![][tick]
  * pay via cheque and carry
  * carry on pay via monthly base
  * order door delivery and pay via cash ![][tick]
  * order door delivery and pay via cheque
  * order door delivery and pay via cash on delivery
  * order door delivery and pay via cheque on delivery
  * order door delivery and pay via cash on monthly base
  * order door delivery and pay via cheque on monthly base
* Every processed bill should be rendered for reference.
* Searchable by date.
* Searchable by bill amount.
* Searchable by date and bill amount.
* Searchable by a product in the bill.
* Searchable by contact person or phone no.
* Retrieve bills under cheque payment without clearance.
* Update cheque clearence status.
* Retrieve deliverable bill.
* Update Delivery Status along with payment status [cash/cheque/monthly base].
* Retrieve bills under delayed payment i.e delayed flag set and payment mode is not set
* Update payment status [cash/cheque]
* Sum total of all the bills shown up in the search result.
* Highlight bills due for payment for more than a month.
* Lookup existing customer details while billing along with contact info.

###Use cases under functionality 7:
1. Bill printing.
* Printing additional copy of bill.

###Use cases under functionality 8:
1. Multiple printer support

###Use cases under functionality 9:
1. Multi language support

