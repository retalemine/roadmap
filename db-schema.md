### Schema:
* Product Schema
* Category Schema
* Purchase Order Schema
* Dealer Schema
* Sales Order schema
     * Billing structure
* Customer/Organization Schema
* Event Schema
* Employee Schema
* Access Control Schema
* Shelf Schema

---
### Schema-Definition:
#### Product Schema:
* Product Code
* Product Name
* Product Unit
     * value (val) [[(0-9)*][(0-9)*][small,medium,big]]
     * unit (unit) [gram, kg, ml, lt, size, pcs, pkt, btl]
* Product Description [Product Name ~  Unit]
* CGST Rate
* SGST Rate
* HSN Code
* SAC Code
* Company
* Product Tags
* Picture
* Expiry period
* Min Quantity
* Min Discount%
* Product location []
* Status
* Date (cmt) [Created/Modified]
* Stock (stock) []
     * SKU
     * SKU Unit
	     * value (val) [[(0-9)*][(0-9)*][small,medium,big]]
	     * unit (unit) [gram, kg, ml, lt, size, pcs, pkt, btl]
	 * MRP
	     * value (val) [(0-9)*]
	     * unit (unit) [INR]
     * MSP
     * Min Quantity
     * Shelf Quantity
     * Godown Quantity
     * Min Discount%
     * Max Discount%
     * Offer
	 * Expiry period
	 * Manufacture Date
	 * Packed Date
	 * Expiry Date
	 * Picture
	 * Date (cmt) [Created/Modified]

#### Category Schema:
* Category
* SubCategory
* Product Id []

#### Purchase Order Schema:
* Purchase Date
* Purchase Order No. / Bill No. / Receipt No.
* Dealer Trade Name
* Dealer Trade No.
* Dealer Contact No.
* Dealer Employee Name
* Dealer Employee Contact No.
     * Company Name
        * Product barcode
        * Product Name
        * Product Unit
        * Price
        * Quantity
        * Gross Price
        * Discount %
        * Discount price
        * Net Price
        * Offer
        * Purchase type [buy, return, replacement]
        * MRP
* Total Gross Amount
* Discount %
* Discount price
* Net Amount
* Tax % [Sales Tax, Service Tax, VAT, GST]
* Tax Amount [Sales Tax, Service Tax, VAT, GST Rate]
* Net Amount Payable
* Payment
     * Status [Paid, Not Paid]
     * Mode [Cash]
     * Date
* Remarks

#### Dealer Schema:
* Dealer Trade Name
* Dealer Trade No.
* Dealer Contact No.
* Dealer Employees []
     * Name
     * Contact No. []
     * visited date []
     * Remark []
* Products []
     * Company
        * Product []
* Last purchase date
* Visits
     * Daily
     * Weekly
        * M/T/W/T/F/S/S
     * Every n days
     * Monthly
        * Beginning / End

#### Bill structure:
* Header Notes
* Bill No# - Billed Date#
     * Serial No.
     * Product Description
     * Unit Price(MRP)
     * Quantity
     * Discount %
     * Discount price
     * Net Price (Quantity*  Unit Price ) – Discount Price)) [-ve for return items]
* Gross Amount
* Discount %
* Discount price
* Net Amount
* Tax % [Sales Tax, Service Tax, VAT]
* Tax Amount [Sales Tax, Service Tax, VAT]
* Net Amount Payable
* Amount received*
* Payback amount*
* Footer Notes

#### Sales Order Schema:
* Bill No.
* Billed Date
     * Serial No.
     * Sales type [sales, sales_return, sales_replacement]
     * Product Description
     * Unit Price(MRP)
     * Quantity
     * Discount %
     * Discount price
     * Net Price (Quantity*  Unit Price ) – Discount Price))
     * Sales type [cart/delivered/returned/delivered-returned]
     * Profit (product discount% - sales order discount % - net sale value – actual price)
* Gross Amount
* Discount %
* Discount price
* Net Amount
* Tax % [Sales Tax, Service Tax, VAT]
* Tax Amount [Sales Tax, Service Tax, VAT]
* Net Amount Payable
* Purchase mode
* Customer Id
* Payment
     * Status [Paid, On door delivery, Monthly Pay]
     * Mode [Cash, Cheque]
     * Date

#### Customer/Organization Schema:
* Customer Id
* Customer Name
* Gender
* Age Group
* Address [landmarks]
* Contact No.
* Registered Date
* Purchase History
     * Bill-id
     * Purchase Date
     * Payment status
     * Payment mode
     * Payment date
* Due Bills[ Bill details, amount, expected date of payment ]

#### Event Schema:
* Event name
* Event Date
* Sales Period
* Purchase Alert Date
* Products []
* Pre Sales history []
     * Product
        * Sales count
        * Costs

#### Employee Schema:
* Name
* Contact Number
* Contact address
* Date of joining
* Reference person details
     * Name
     * Contact number
     * Contact address
* Monthly salary
* Designation []
* Advance salary
     * Paid amount
     * Paid date
* Salary Due payment
* Payment history
     * Paid amount
     * Paid date
* Leave history
     * [date of leave]

#### Access control schema:
* Role Name
* Designation
* Read-only privileges []
* write privileges []


#### Shelf schema:
* Shelf description
* location


