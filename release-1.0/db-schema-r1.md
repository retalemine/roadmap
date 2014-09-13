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
* Price (pPrices) []
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
* Tax
  * Tax type [Sales Tax, Service Tax, VAT]
  * Tax %
  * Tax Amount
* Net Amount Payable
* Amount received*
* Payback amount*
* Footer Notes
* Customer Detail
  * Contact Person Name
  * Mobile Number
  * Home Address

####Sales-order Schema:
* Bill No. (bNo)
* Billed Date (bDate)
* Bill Items (bItems) []
  * Product Description (pDesc)
  * Unit Price(MRP) (pPrice)
  * Quantity (qty)
* Tax (tax) []
  * tax type (type) [Sales Tax, Service Tax, VAT]
  * percentage (pct)
* Net Amount Payable (bNetAmount) [(0-9)*]
* Billing unit (bunit) [Rs]
* Payment (payment)
  * Mode (mode) [Cash, Cheque]
  * Delayed pay (delayed) [Y]
  * paid (paid) [Y]
  * Paid Date (date)
* Customer Details (cDetail)
  * Contact Person Name (name)
  * Mobile Number (phoneNo)
  * Home Address (address)
* Door Delivery Status (dDelivered) [Y/N]

