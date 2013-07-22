###Schema:
---
* Product Schema
* Sales Order schema
  * Billing structure

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
* Payment
  * Status [Paid, On door delivery, Monthly Pay]
  * Mode [Cash, Cheque]
  * Date

####Product Schema (Inventory Creation Schema):
***
* Product Name [if no particular product name is applicable then category along with company will be chosen as product name]
* Product Unit
* Product Description [Product Name ~  Size]
* MRP
