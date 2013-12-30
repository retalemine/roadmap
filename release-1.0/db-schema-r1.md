###Schema:
* Product Schema (products)
* Sales-order schema (salesorders)
  * Billing structure

###Schema-Definition:
####Product Schema (Inventory Creation Schema):
* Product Name (pName)
* Product Unit (pUnit)
  * value (val) [[(0-9)*][(0-9)*][small,medium,big]]
  * unit (unit) [kg, lt, size]
* Price (pPrice) []
  * price [(0-9)*]
  * unit [Rs]
* Date (dateCM) [Created/Modified]

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
* Biller Name
* Delivery Details
  * Contact Person Name
  * Mobile Number
  * Home Address

####Sales-order Schema:
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
*Biller Name
