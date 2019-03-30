### Service API
* Add/Update Product
    * products/add
    * products/edit
    * products/update
* Fetch Product
    * products/view (how different from search result being singular)
    * products/search
* Purchase Invoices
* Sales Invoices
* Add/Update Customer
* Fetch Customer
* Add/Update Dealer
* Fetch Dealer
* Add/Update Events
* Fetch Events
* Add/Update Employee
* Fetch Employee

### Use Case for Product
* Dealer facing - Purchase Invoice
    * New Product (new stock)
    * Existing Product and Old Price (same or no offer and same exp.date)(instead of update -> new stock)
    * Existing Product and Old Price and has offer (new stock)
    * Existing Product and Old Price and has diff offer (new stock)
    * Existing Product and Old Price and diff exp. date (new stock)
    * Existing Product and New Price (new stock)

* Create Inventory
* Update/Edit Inventory

* Same barcode but different company products
* Same barcode but difference in product within same company

```
db.product.update(
  { SKU: "TD00", "stock.MSP.val": 80.0, "stock.MSP.unit": "INR" },
  {
    $set: {
      name: "Toor Dal",
      "unit.val": 1.0,
      "unit.unit": "kg",
      company: "Manipur",
      tag: ["grocery"],
      "GST.val": 0.0,
      "GST.unit": "%",
      HSN: "HS",
      SAC: "SA",
      "stock.$.offerInfo": "No Offer se"
    }
  }
);

```