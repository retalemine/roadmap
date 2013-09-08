###Design:
* Managing price for products.
  * Products can come with price tags that shouldn't be amended overtime. [ _unbounded, as stock varies_ ]
  * Products whose price tag has to be amended overtime. [ _single priced, market driven_ ]
* Product catalog creation.
  * Instantly as and when a bill is generated for all those items not suggested and for all those items whose price is changed
  * As batch job, to process all the bills that are created after a point of time and saving the timestamp for next batch job execution.

---
###Use case - 1:
1. A new product getting entered for the first time. [ _Only single price_ ]
* An existing product in different unit getting entered for the first time. [ _Only single price_ ]
* An existing product with new price getting added along with old price, making it as list. [ _convert to unbounded price_ ]
* An existing product with revised price getting overwritten over old price. [ _Only single price_ ]
* Delete an outdated price detail from an existing product set. [ _remains as unbounded category_ ]
* Mark a product type detail as outdate in collection. [ _remains passive in collection_ ]

---
###Schema:
* Product Schema
* Sales-order schema
  * Billing structure

###Schema-Definition:
####Bill structure:
* Header Notes
* Bill No# - Billed Date#
  * Serial No.
  * Product Description
  * Unit Price(MRP)
  * Quantity
  * Net Price ( Quantity * Unit Price ) [-ve for return items]
* Gross Amount
* Tax % [Sales Tax, Service Tax, VAT]
* Tax Amount [Sales Tax, Service Tax, VAT]
* Net Amount Payable
* Amount received*
* Payback amount*
* Footer Notes
* Delivery Details
  * Contact Person Name
  * Mobile Number
  * Home Address

####Sales Order Schema:
* Bill No.
* Billed Date
  * Serial No.
  * Product Description
  * Unit Price(MRP)
  * Quantity
  * Net Price (Quantity *  Unit Price)
* Gross Amount
* Tax % [Sales Tax, Service Tax, VAT]
* Tax Amount [Sales Tax, Service Tax, VAT]
* Net Amount Paid
* Delivery Details
  * Contact Person Name
  * Mobile Number
  * Home Address 
* Payment
  * Status [Paid, On door delivery, Monthly Pay]
  * Mode [Cash, Cheque]
  * Date

####Product Schema (Inventory Creation Schema):
***
* Product Name [if no particular product name is applicable then category along with company will be chosen as product name]
* Product Unit [kg, lt, size]
* Price []
* Date [Created/Modified/Accessed]
