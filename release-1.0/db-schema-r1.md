###Schema:
* Product Schema (products)
* Sales-order schema (salesorders)
  * Billing structure

###Schema-Definition:
####Product Schema (Inventory Creation Schema):
* Product Name (pName)
* Product Unit (pUnit)
  * value (val) [[(0-9)*][(0-9)*][small,medium,big]]
  * unit (unit) [gram, kg, ml, lt, size, pcs]
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
* Net Amount Payable
* Payment
  * Mode [Cash, Cheque]
  * Paid Date
  * Status [Paid, On door delivery, Door delivered, Monthly Pay Pending, Settled vai monthly payment, waiting cheque clearence, cheque cleared]
* Delivery Details
  * Contact Person Name
  * Mobile Number
  * Home Address 
