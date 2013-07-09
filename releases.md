Release 1.0:
============
 * Bill processing

Release 2.0:
=============
 * User role based access restriction
 * Purchase processing
 * Inventory creation
 * Bill processing
 * Order tracking
 * Price label generation

Release 3.0:
============
 * Discount sales 
 * Return and claim
 * Damage and loss mitigation
 * Expenses tracking

Release 4.0:
============
 * Dealer tracking
 * Customer tracking
 * Sales reporting
 * Purchase suggestion

Release 5.0:
============
 * Online catalog

Release 6.0:
============
 * Online order placing

Release 7.0:
============
 * Online payment

Release 8.0:
============
 * Online customer profile management
 * Gift and rewards

Release 9.0:
============
 * Handheld devices for purchase processing
 * Inventory management
 * Order tracking

Release 1.0:
============
Use cases:
==========
 * On the fly product catalog creation and suggestion
 * Sales tracking
 * Multi language support
 * Multiple printer support
Action items:
=============
 * UI design
 * General bill schema and general product catalog design

Release 2.0:
============
Use cases:
==========
 * Purchase order tracking [Single/Multi Terminal[Concurrency]]
   * Feed each purchase order to application system.
   * Should be intellectual to determine duplicate feeding of a purchase order.
   * For product with barcode enable automatic detection of products from product schema, if one available. Else add a new product set.
   * For product without barcode enable retrieval of information from product schema, if one available. Else generate and add a new product set.
 * Purchase closure
   * For each purchase completed, inventory is updated.
     * Cost price has to be inferred via max discount %
   * For each purchase completed, dealer schema is updated.
 * Inventory creation/update via purchase order placed.
   * As listed above for new procurements.
   * For product at shelf, inventory need to be created.
     * Note: we don’t have any entry in purchase schema for these products and the dealer’s information will also be missing.
     * For those products where actual price know, the max discount % is set accordingly. 
     * profit% = ( discount% * 100 )/ ( 100 - d% )
     * profit = ( MRP –( (1 – max discount %) * 100 ))
 * Inventory creation on the fly when new product is getting billed.
 * Cash & Carry Order Tracking
   * For every order made the application system is updated via customer schema and sales order schema and a bill is generated as paid.
 * Door Delivery Order Tracking
   * For every order made the application system is updated via customer schema and sales order schema and a bill is generated with payment as paid, on door payment, monthly settlement.
 * Fulfillment
   * For every Door Delivery orders placed ensure payment is complete and the system is updated.
 * Access control
   * Each action in UI should be mapped to specific designation in the organization
Action items:
=============
 * Schema design in MongoDB
 * Use case scenarios for each functionality
 * Mongo Query for each functionality
 * Overall architecture with distributed components and multi terminals
 * User interface design for each functionality

Release 3.0:
============
Use cases:
==========
 * Discount% suggestion @ product level (provided the feature enabled and the profit margin set (default 0%))
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
 * Loss via damage or expiry ( item cannot be returned )
   * Minimize loss via off shelf sales
   * Nature of loss improves future purchase strategy.
 * Funding and personal expenses tracking
   * Delivery charges
   * Transportation charges

Release 4.0:
============
Use cases:
==========
 * Sales closure
   * For each sales order yet to be processed, the inventory is updated according to sales/return/loss
     * Discounted value for each product and bill is taken into consideration.
   * For product quantity falling to Zero/Minimum count, a purchase report generated.
 * Sales report
   * Daily, monthly, quarterly, semi-annually, annually.
   * Sales count under each product
   * Profit from each product
   * Overall profit
   * Expenditure incurred
   * Active sales product
   * High profit margin products
 * Tracking Procurement [Company/Dealer/Period/Category]
 * Seasonal purchase suggestion
 * Print functionality

Release 5.0:
============
Use cases:
==========
 * Online catalog build


Release 6.0:
============
Use cases:
==========
 * Online order placing via Cash-On-delivery

Release 7.0:
============
Use cases:
==========
 * Online purchase via instant payment

Release 8.0:
============
Use cases:
==========
 * Online customer profile management
 * Gift and rewards

Release 9.0: 
============
Use cases:
==========
 * Handheld devices for purchase processing
 * Inventory management
 * Order tracking

