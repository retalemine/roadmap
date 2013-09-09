###Release 1.0:
* Bill processing

###Release 2.0:
* Purchase processing
* Managing price for products
* Inventory creation
* Archival of data for analytic purpose
* Bill processing
* Order tracking

###Release 3.0:
* Barcode based processing
* Price label generation
* User role based access restriction

###Release 4.0:
* Dealer tracking
* Customer tracking
* Employee tracking & payroll
* Sales reporting
* Purchase suggestion

###Release 5.0:
* Discount sales 
* Return and claim
* Damage and loss mitigation
* Expenses tracking
* Payment via card

###Release 6.0:
* Online catalog
* Online shopping @ outlet
* Online profile

###Release 7.0:
* Online shopping @ home via cash-on-delivery mode

###Release 8.0:
* Online shopping @ home via instant payment mode

###Release 9.0:
* Handheld devices for purchase processing
* Inventory management
* Order tracking

###Release 10.0:
* Gift, Coupons and rewards

###Release 11.0:
* Shopping style
  * Recipes based add to cart item list

---
###Release 1.0:
####Use cases:
1. On the fly inventory creation without interfering with bill processing
* Manual creation of inventory
* View inventory
* Edit inventory
* On the fly product suggestion
* Sales tracking and rendering
* Bill printing
* Multiple printer support
* Multi language support

###Release 2.0:
####Use cases:
1. Purchase order tracking [Single/Multi Terminal[Concurrency]]
  * Feed each purchase order to application system.
  * Should be intellectual to determine duplicate feeding of a purchase order.
  * Suggestion of product on the fly.
* Managing price for products.
  * Products can come with price tags that shouldn't be amended overtime. [ _unbounded, as stock varies_ ]
  * Products whose price tag has to be amended overtime. [ _single priced, market driven_ ]
* Inventory creation/update via closure of purchase order
  * For each product in the successful purchase order, the inventory is either created or updated.
  * Max discount% is set accordingly to determine CP.
* Inventory creation/update for product at shelf [ purchase schema won't be updated ]
  * For each product in the shelf, the inventory is either created or updated.
  * Max discount% is not set if CP is undetermined.
* Inventory creation on the fly, for product getting billed without an entry in product schema.[ purchase schema won't be updated ]
* Archival of outdated products and outdated price for analytic.
* Cash & Carry Order
  * For every order placed, sales order schema is created and a bill is generated as paid.
* Door Delivery Order
  * For every order placed, sales order schema is created and a bill is generated with payment as paid, on door payment, monthly settlement.
* Fulfillment
  * For every Door Delivery orders placed ensure delivery is successful, payment is complete and the system is updated.
  * For every return in delivery the sales order is updated accordingly.
* Sales closure
  * Inventory updated based on every sales order.

###Release 3.0:
####Use cases:
1. Purchase order tracking [Single/Multi Terminal[Concurrency]]
  * For product with barcode enable automatic detection of products from product schema, if one available.
  * Price label generation with barcode.
* Sales order processing
  * For product with barcode label, the product information should be retrieved.
  * In case of multiple suggestion, each should be properly prioritized.
* Access control
  * Access control to each functionality should be confined to specific designation.
  * Access control to action in a functionality should be confined to specific user group.

###Release 4.0:
####Use cases:
1. Purchase order tracking [Single/Multi Terminal[Concurrency]]
  * For each successful purchase, dealer schema is created/updated.
* Tracking Procurement [Company/Dealer/Period/Category]
* Order Tracking
  * For every sales order placed, customer schema is created or updated along with sales order schema
* Employee tracking & payroll generation
  * For every new or existing employee, the history of employee with proper designation and payment history is tracked.
* Sales report
  * profit% = ( discount%* 100 )/ ( 100 - d% )
  * profit = ( MRP –( (1 – max discount %)* 100 ))
  * Daily, monthly, quarterly, semi-annually, annually.
  * Sales count under each product
  * Profit from each product
  * Overall profit
  * Expenditure incurred
  * Active sales product
  * High profit margin products
* Purchase suggestion
  * For product quantity falling to Zero/Minimum count, a purchase report generated.
  * For expected seasonal sales, a purchase report generated.
* Export and print of reports.

###Release 5.0:
####Use cases:
1. Discount% suggestion @ product level (provided the feature enabled and the profit margin set (default 0%))
  * For any product, discount% should be suggested in such a way that the s quantity of sales order count for a particular price with n quantity items in rack(left behind after removing s quantity and pertaining to that price) 
    * If (s + n <= p (last purchase count) of that price) then the discount percentage is 0% to d% where d% discount will give up to the set min margin profit.
    * If ( s + n > p and (( s + n) – p ) < s then the least difference in unit price is chosen to be entitled as discount
    * If ( s + n > p and (( s + n) – p ) >= s then the least difference in unit price is chosen to be entitled as discount
* Discount% suggestion @ bill level (provided the feature enabled and the profit margin set (default 0%))
  * The profit margin from each product is calculated and the overall profit value is determined which is entitled to various discount%
* Return from customer & Claim
  * With Bill details
  * Without Bill details
    * Search recent sales order to locate a bill
  * In any case listed above, we aren’t sure of what to do with bill no. however it is to authenticate the right purchase.
  * For every replacement, claim can be made via discount over new purchase by customer [sales order]
* Return to dealer & Claim
  * Collect the previous purchase order details like date, purchase amount etc. 
  * Item returned can be replaced or discounted
* Sales closure
  * Inventory updated based on every sales order, according to sales/return/loss
* Loss via damage or expiry ( item cannot be returned )
  * Minimize loss via off shelf sales
  * Nature of loss improves future purchase strategy.
* Funding and personal expenses tracking
  * Delivery charges
  * Transportation charges
* Sales report
  * Should consider the discounted amount, loss, expenses accordingly in report generation.
* Payment via card

###Release 6.0:
####Use cases:
1. Online catalog
  * Search by item name.
  * Browse by item category.
* Online order @ outlet
  * Add to cart support.
  * Order placing bill slip.
* Customer profile tracking
  * Enable to view and edit profile.
  * Purchase history.

###Release 7.0:
####Use cases:
1. Online order placing via Cash-On-delivery

###Release 8.0:
####Use cases:
1. Online purchase via instant payment

###Release 9.0:
####Use cases:
1. Handheld devices for purchase processing
* Inventory management
* Order tracking

###Release 10.0: 
####Use cases:
1. Gift, Coupons and rewards

###Release 11.0: 
####Use cases:
1. Shopping style - Recipe based shopping
* Recommendation

