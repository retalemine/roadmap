###Schema:
---
* Product Schema
* Sales Order schema
  * Billing structure

===
###Use-Cases:
---
1. A new product getting entered for the first time. [Only single price]
* An existing product in different unit getting entered for the first time. [Only single price]
* An existing product with revised price getting added along with old price, making it as list. [convert to unbounded price]
* An existing product with revised price getting overwritten over old price. [Only single price]
* Delete an outdated price detail from an existing product set. [remains as unbounded category]
* Mark a product type detail as outdate in collection. [remains passive in collection]

===
###Schema-Definition:
---
####Bill structure:
***
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
***
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
* Product Unit
* Product Description [Product Name ~  Unit]
* MRP []
