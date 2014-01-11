///////////////////////////////////////////////////////////////////////////////
//////CASE 1: SCHEMA DESIGNED TO HOLD DIFF. PRODUCT TYPE IN ONE RECORD SET/////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////INSERT///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
//////A PRODUCT WITH VARIOUS UNIT VOL AND DIFF PRICE ACROSS STOCK//////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet1.insert(
{
	pName : "Old Cinthol",
	pTypes : [
		{
			pUnit : {
				val : "small",
				unit : "size"
			},
			pPrice : [
				{
					price : 10,
					unit : "Rs",
					dateCMU : new Date()
				},
				{
					price : 12,
					unit : "Rs",
					dateCMU : new Date()
				}
			]
		},
		{
			pUnit : {
				val : "normal",
				unit : "size"
			},
			pPrice : [
				{
					price : 23,
					unit : "Rs",
					dateCMU : new Date()
				},
                                {
					price : 25,
					unit : "Rs",
					dateCMU : new Date()
				}
			]
		}            
	]
})
///////////////////////////////////////////////////////////////////////////////
//////A PRODUCT WITH SINGLE UNIT OF VOL AND ONLY ONE VALID PRICE AT A TIME/////
///////////////////////////////////////////////////////////////////////////////
db.productSet1.insert(
{
	pName : "Sugar",
	pTypes : [
		{
			pUnit : {
				val : 1,
				unit : "kg"
			},
			pPrice : [
				{
					price : 50,
					unit : "Rs",
					dateCMU : new Date()
				}
			]
		}
	]
})
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////UPDATE///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
///xx///ADDING A NEW PRODUCT TYPE TO EXISTING LIST OF A PRODUCT////////////////
//////////DOUBLE DOLLOR ISSUE//////////////////////////////////////////////////
db.productSet1.update(
{
        pName: 'Old Cinthol',
	'pTypes.pUnit.qty':3,
	'pTypes.pUnit.val':'normal',
	'pTypes.pUnit.unit':'size',
	'pTypes.pPrice.price':70,
	'pTypes.pPrice.unit':'Rs'
},
{
        $set: {
		'pTypes.$.pPrice.$.dateCMU': new Date()
        }
},
{
	upsert:true,
	multi:true
})
///////////////////////////////////////////////////////////////////////////////
//////ADDING A NEW PRODUCT TYPE TO EXISTING LIST OF A PRODUCT//////////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet1.update(
{
        pName: 'Old Cinthol'
},
{
        $addToSet: {
                pTypes: {
                        pUnit: {
				qty: 3,
                                val: 'normal',
                                unit: 'size'
                        },
                        pPrice: [
                        {
                                price: 70,
                                unit: 'Rs',			
				dateCMU : new Date()
                        }]
                }
        }
},
{
	upsert:true,
	multi:true
})
///////////////////////////////////////////////////////////////////////////////
///xx///ADDING A NEW PRICE INFO TO EXISTING LIST OF PRICE//////////////////////
//////////////ADDING TO ZEROTH POSTION ONLY////////////////////////////////////
db.productSet1.update(
{
        pName: 'Old Cinthol',
	'pTypes.pUnit.qty':3,
	'pTypes.pUnit.val':'normal',
	'pTypes.pUnit.unit':'size',
},
{
        $addToSet: {
                'pTypes.$.pPrice': {
                        price: 65,
                        unit: 'Rs',
			dateCMU : new Date()
                }
        }
},
{
	upsert:true,
	multi:true
})
///////////////////////////////////////////////////////////////////////////////
///////UPDATING THE PRICE TO NEW VALUE OVER AN EXISTING VALUE//////////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet1.update(
{
        pName: 'Sugar',
	'pTypes.pUnit.val':1,
	'pTypes.pUnit.unit':'kg',
},
{
        $set: {
                'pTypes.$.pPrice': [{
                        price: 45,
                        unit: 'Rs',
			dateCMU : new Date()
                }]
        }
},
{
	upsert:true,
	multi:true
})
///////////////////////////////////////////////////////////////////////////////
//////CASE 2.1: SCHEMA HOLDS DIF PRODUCT TYPE IN DIFF RECORD SET //////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////INSERT///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/////////////////////////////USE CASE - 1//////////////////////////////////////
//////A PRODUCT WITH SINGLE UNIT OF VOL AND ONLY ONE VALID PRICE AT A TIME ////
///////////////////////////////////////////////////////////////////////////////
db.productSet2.insert({
        pName: "Sugar",
        pUnit: {
                val: 1,
                unit: "kg"
        },
        pPrice: [{
                price: 50,
                unit: "Rs"
        }],
        pActive: 1,
	dateCMA : new Date()
})
/////////////////////////////USE CASE - 2//////////////////////////////////////
////A PRODUCT WITH DIFF UNIT OF VOL AND POSSIBLY MULTI PRICE OVER DIFF STOCK///
///////////////////////////////////////////////////////////////////////////////
db.productSet2.insert({
        pName: "Old Cinthol",
        pUnit: {
                val: "small",
                unit: "size"
        },
        pPrice: [{
                price: 10,
                unit: "Rs"
        }],
        pActive: 1,
	dateCMA : new Date()
})
db.productSet2.insert({
        pName: "Old Cinthol",
        pUnit: {
                val: "normal",
                unit: "size"
        },
        pPrice: [{
                price: 23,
                unit: "Rs"
        }],
        pActive: 1,
	dateCMA : new Date()
})
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////UPDATE///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/////////////////////////////USE CASE - 3//////////////////////////////////////
//////////ADDING NEW PRICE TO EXISTING PRICE TO MAKE IT AS LIST////////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet2.update({
        pName: "Old Cinthol",
        'pUnit.val': "small",
        'pUnit.unit': "size"
}, {
        $addToSet: {
                pPrice: {
                        price: 12,
                        unit: "Rs"
                }
        },
	$set:{
		dateCMA : new Date(),
		pActive : 1
	}
}, {
        upsert: true,
        multi: true
})
/////////////////////////////USE CASE - 4//////////////////////////////////////
/////////////OVERWRITTING REVISED PRICE OVER EXISTING PRICE////////////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet2.update({
        pName: "Sugar",
        'pUnit.val': 1,
        'pUnit.unit': "kg"
}, {
        $set: {
                pPrice: [{
                        price: 45,
                        unit: "Rs"
                }],
		dateCMA : new Date(),
		pActive : 1
        }
}, {
        upsert: true,
        multi: true
})
/////////////////////////////USE CASE - 5//////////////////////////////////////
////////DELETING AN OUTDATED PRICE FROM THE LIST OF PRICES/////////////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet2.update({
        pName: "Old Cinthol",
        'pUnit.val': "small",
        'pUnit.unit': "size"
}, {
        $pull: {
                pPrice: {
                        price: 10,
                        unit: "Rs"
                }
        },
	$set:{
		dateCMA : new Date(),
		pActive : 1
	}
}, {
        upsert: true,
        multi: true
})
/////////////////////////////USE CASE - 6//////////////////////////////////////
////////UPDATE A PRODUCT DETAIL TO BE OUTDATED IN THE COLLECTION///////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet2.update({
        pName: "Old Cinthol",
        'pUnit.val': "small",
        'pUnit.unit': "size"
}, {
	$set:{
		pActive : 0,
		dateCMA : new Date()
	}
}, {
        upsert: false,
        multi: true
})
/////////////////////////////USE CASE - 7//////////////////////////////////////
/////////TRYING TO FIND AN ABSCENT PRODUCT AND GETTING INSERTED ///////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet2.update({
        pName: "Hamam",
        'pUnit.val': "big",
        'pUnit.unit': "size"
}, {
        $addToSet: {
                pPrice: {
                        price: 35,
                        unit: "Rs"
                }
        },
	$set:{
		dateCMA : new Date(),
		pActive : 1
	}
}, {
        upsert: true,
        multi: true
})
///////////////////////////////////////////////////////////////////////////////
//////CASE 2.2: SCHEMA HOLDS DIF PRODUCT TYPE IN DIFF RECORD SET //////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet3.drop()
///////////////////////////////////////////////////////////////////////////////
////USECASE 1.1 A product getting added for the first time/////////////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet3.update({
        pName: "Lux Sandal",
        'pUnit.val': "big",
        'pUnit.unit': "size"
}, {
        $addToSet: {
                pPrice: {
                        price: 55,
                        unit: "Rs"
                }
        },
	$set:{
		dateCM : new Date()
	}
}, {
        upsert: true,
        multi: true
})
///////////////////////////////////////////////////////////////////////////////
////USECASE 1.2 A product with different unit getting added for the first time/
///////////////////////////////////////////////////////////////////////////////
db.productSet3.update({
        pName: "Lux Sandal",
        'pUnit.val': "small",
        'pUnit.unit': "size"
}, {
        $addToSet: {
                pPrice: {
                        price: 25,
                        unit: "Rs"
                }
        },
	$set:{
		dateCM : new Date()
	}
}, {
        upsert: true,
        multi: true
})
///////////////////////////////////////////////////////////////////////////////
////USECASE 1.3 A product with different price getting added///////////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet3.update({
        pName: "Lux Sandal",
        'pUnit.val': "small",
        'pUnit.unit': "size"
}, {
        $addToSet: {
                pPrice: {
                        price: 20,
                        unit: "Rs"
                }
        },
	$set:{
		dateCM : new Date()
	}
}, {
        upsert: true,
        multi: true
})
///////////////////////////////////////////////////////////////////////////////
////USECASE 1.4 A product with different price getting added and marked to delete other price details
///////////////////////////////////////////////////////////////////////////////
///////////A FLAG TO MARK THAT OTHERS PRICE BE DELETED/////////////////////////
db.productSet3.update({
        pName: "Lux Sandal",
        'pUnit.val': "small",
        'pUnit.unit': "size"
}, {
	$set:{
                pPrice: [{
                        price: 23,
                        unit: "Rs"
                }],
		dateCM : new Date()
	}
}, {
        upsert: true,
        multi: true
})
///////////////////////////////////////////////////////////////////////////////
///////$exists: true///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////data for testing////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet3.update({
        pName: "Sugar",
        'pUnit.val': "1",
        'pUnit.unit': "kg"
}, {
        $addToSet: {
                pPrice: {
                        price: 45,
                        unit: "Rs"
                }
        },
	$set:{
		dateCM : new Date()
	}
}, {
        upsert: true,
        multi: true
})
db.productSet3.update({
        pName: "Axe body spray",
        'pUnit.val': "150",
        'pUnit.unit': "ml"
}, {
        $addToSet: {
                pPrice: {
                        price: 155,
                        unit: "Rs"
                }
        },
	$set:{
		dateCM : new Date()
	}
}, {
        upsert: true,
        multi: true
})
///////////////////////////////////////////////////////////////////////////////
////USECASE 2.1 List every entry in DB/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet3.aggregate({
	$unwind:"$pPrice"
},{
	$sort:{
		pName:1,
		pUnit:1,
		pPrice:1
	}
})
//---------------------------------------------------------------------------//
db.productSet3.find({
}).sort({
	pName:1,pUnit:1,pPrice:1
})
///////////////////////////////////////////////////////////////////////////////
////USECASE 2.2 Search product based on name///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet3.aggregate([{
	$match:{
		pName:/lux sandal/i
	}
},{
	$unwind:"$pPrice"
},{
	$sort:{
		pName:1,
		pUnit:1,
		pPrice:1
	}
}])
//---------------------------------------------------------------------------//
db.productSet3.find({
	pName:/lux sandal/i
}).sort({
	pName:1,pUnit:1,pPrice:1
})
///////////////////////////////////////////////////////////////////////////////
////USECASE 2.3 Search product based on name and units/////////////////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet3.aggregate([{
	$match:{
		pName:/lux sandal/i,
		'pUnit.val':/small/i,
		'pUnit.unit':'size'
	}
},{
	$unwind:"$pPrice"
},{
	$sort:{
		pName:1,
		pUnit:1,
		pPrice:1
	}
}])
//---------------------------------------------------------------------------//
db.productSet3.find({
	pName:/lux sandal/i,
	'pUnit.val':/small/i,
	'pUnit.unit':'size'
}).sort({
	pName:1,pUnit:1,pPrice:1
})
///////////////////////////////////////////////////////////////////////////////
////USECASE 3.1 Edit a product name.[Note: They are unbounded while rendering]/
///////////////////////////////////////////////////////////////////////////////
db.productSet3.update({
	pName:'Lux Sandal',
	'pUnit.val':'small',
	'pUnit.unit':'size'
},{
	$set:{
		pName:'Lux Sandal - Updated',
		dateCM : new Date()
	}
})
///////////////////////////////////////////////////////////////////////////////
////USECASE 3.2 Edit a product unit////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet3.update({
	pName:'Lux Sandal',
	'pUnit.val':'big',
	'pUnit.unit':'size'
},{
	$set:{
		'pUnit.val':'big - updated',
		'pUnit.unit':'size',
		dateCM : new Date()
	}
})
///////////////////////////////////////////////////////////////////////////////
////USECASE 3.3 Edit a product price///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
db.productSet3.update({
	pName:'Lux Sandal',
	'pUnit.val':'small',
	'pUnit.unit':'size',
	pPrice: { $elemMatch: {unit:"Rs",price:23}}
},{
	$set:{
		dateCM : new Date(),
		'pPrice.$.price': 20
	}
})
///////////////////////////////////////////////////////////////////////////////
////USECASE 3.4 On deleting a unbounded priced product, the outdated price alone gets removed.
///////////////////////////////////////////////////////////////////////////////
///////NOTE: Single valued price array will be left empty after deletion//??///
db.productSet3.update({
	pName:'Lux Sandal',
	'pUnit.val':'small',
	'pUnit.unit':'size'
},{
	$set:{
		dateCM : new Date()
	},
	$pull: {
                pPrice: {
                        price: 20,
                        unit: "Rs"
                }
        }
})
///////////////////////////////////////////////////////////////////////////////
////USECASE 4.1 Adding a new product//////USECASE 1.1//////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
////USECASE 4.2 Adding a product with different unit////////USECASE 1.2////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
////USECASE 4.3 Adding a product with different price///////USECASE 1.3////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
////USECASE 4.4 Adding new price to a product and marked to delete all old price - USECASE 1.4
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
////USECASE 5.1 Ajax call based on characters entered and search inventory based on name and unit
///////////////////////////////////////////////////////////////////////////////
??
///////////////////////////////////////////////////////////////////////////////
////USECASE 6.1 Every bill should get saved to sales-order schema//////////////
///////////////////////////////////////////////////////////////////////////////
//////NOTE : Only product set of single pricing unit (like 'Rs') grouped///////
///////////////////////////////////////////////////////////////////////////////
db.salesOrders3.insert({
	bNo: ObjectId().str,
	bDate: new Date(),
	bItems: [{
		pDesc: 'Lux Sandal - small size',
		pPrice: 20,
		qty: 2
	},{
		pDesc: 'Sugar - 1 kg',
		pPrice: 45,
		qty: 3
	}],
	tax: [{
		type: 'VAT',
		pct: 4
	},{
		type: 'Service Tax',
		pct: 2
	}],
	bNetAmount: 185.5,
	bUnit: 'Rs',
	payment: {
		mode: 'cash',
		date: new Date(),
		status: ['paid']
	}
})
///////////////////////////////////////////////////////////////////////////////
/////////////////////TEST DATA/////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
db.salesOrders3.insert({
	bNo: 1,
	bDate: new Date(2013, 11, 31),
	bItems: [{
		pDesc: 'Lux Sandal - small size',
		pPrice: 20,
		qty: 6
	},{
		pDesc: 'Sugar - 1 kg',
		pPrice: 45,
		qty: 2
	}],
	tax: [{
		type: 'VAT',
		pct: 4
	},{
		type: 'Service Tax',
		pct: 2
	}],
	bNetAmount: 159,
	bUnit: 'Rs',
	payment: {
		mode: 'cash',
		date: new Date(2013, 11, 31),
		status: ['paid']
	}
})
db.salesOrders3.insert({
	bNo: 2,
	bDate: new Date(2013, 11, 31),
	bItems: [{
		pDesc: 'Lux Sandal - big size',
		pPrice: 45,
		qty: 1
	},{
		pDesc: 'Sugar - 1 kg',
		pPrice: 45,
		qty: 1
	}],
	tax: [{
		type: 'VAT',
		pct: 4
	}],
	bNetAmount: 93.5,
	bUnit: 'Rs',
	payment: {
		status: ['on door delivery']
	},
	dDetail: {
		name: 'Suresh',
		phoneNo: 09950554466,
		address: '45 first street, address, city pincode'
	}
})
db.salesOrders3.insert({
	bNo: 3,
	bDate: new Date(2014, 0, 1),
	bItems: [{
		pDesc: 'Hamam - big size',
		pPrice: 55,
		qty: 1
	},{
		pDesc: 'Sugar - 1 kg',
		pPrice: 45,
		qty: 1
	}],
	tax: [{
		type: 'VAT',
		pct: 4
	}],
	bNetAmount: 104,
	bUnit: 'Rs',
	payment: {
		status: ['monthly Pay Pending']
	},
	dDetail: {
		name: 'Kailesh',
		phoneNo: 08950554466,
		address: '51 second street, address, city pincode'
	}
})
db.salesOrders3.insert({
	bNo: 4,
	bDate: new Date(2014, 0, 2),
	bItems: [{
		pDesc: 'Lux Sandal - small size',
		pPrice: 20,
		qty: 2
	},{
		pDesc: 'Sugar - 1 kg',
		pPrice: 45,
		qty: 3
	}],
	tax: [{
		type: 'VAT',
		pct: 4
	},{
		type: 'Service Tax',
		pct: 2
	}],
	bNetAmount: 185.5,
	bUnit: 'Rs',
	payment: {
		mode: 'cheque',
		status: ['waiting cheque clearence']
	}
})
db.salesOrders3.insert({
	bNo: 5,
	bDate: new Date(2014, 0, 3),
	bItems: [{
		pDesc: 'Hamam - small size',
		pPrice: 15,
		qty: 2
	},{
		pDesc: 'Sugar - 1 kg',
		pPrice: 45,
		qty: 1
	}],
	tax: [{
		type: 'VAT',
		pct: 4
	}],
	bNetAmount: 78,
	bUnit: 'Rs',
	payment: {
		mode: 'cash',
		date: new Date(2014, 0, 3),
		status: ['door delivered','paid']
	},
	dDetail: {
		name: 'Mahesh',
		phoneNo: 07950554466,
		address: '5 second street, address, city pincode'
	}
})
db.salesOrders3.insert({
	bNo: 6,
	bDate: new Date(2014, 0, 7),
	bItems: [{
		pDesc: 'Hamam - big size',
		pPrice: 55,
		qty: 1
	},{
		pDesc: 'Axe body spray - 150 ml',
		pPrice: 145,
		qty: 1
	}],
	tax: [{
		type: 'VAT',
		pct: 4
	}],
	bNetAmount: 208,
	bUnit: 'Rs',
	payment: {
		mode: 'cash',
		date: new Date(2014, 0, 31),
		status: ['settled via monthly payment','paid']
	},
	dDetail: {
		name: 'Kailesh',
		phoneNo: 08950554466,
		address: '51 second street, address, city pincode'
	}
})
db.salesOrders3.insert({
	bNo: 7,
	bDate: new Date(2014, 1, 1),
	bItems: [{
		pDesc: 'Lux Sandal - small size',
		pPrice: 20,
		qty: 2
	},{
		pDesc: 'Sugar - 1 kg',
		pPrice: 45,
		qty: 3
	}],
	tax: [{
		type: 'VAT',
		pct: 4
	},{
		type: 'Service Tax',
		pct: 2
	}],
	bNetAmount: 185.5,
	bUnit: 'Rs',
	payment: {
		mode: 'cheque',
		date: new Date(2014, 1, 10),
		status: ['cheque cleared','paid']
	}
})
///////////////////////////////////////////////////////////////////////////////
////USECASE 6.2 Every processed bill should be rendered for reference//////////
///////////////////////////////////////////////////////////////////////////////
db.salesOrders3.find({
}).sort({
	bDate:-1
}).skip(0).limit(1)
///////////////////////////////////////////////////////////////////////////////
////USECASE 6.3 Searchable by date/////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
db.salesOrders3.find({
	bDate:{
		$gte: new Date(2014, 0, 1),
		$lte: new Date(2014, 0, 31)
	}
}).sort({
	bDate:-1
}).skip(0).limit(1)
///////////////////////////////////////////////////////////////////////////////
////USECASE 6.4 Searchable by bill amount//////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
db.salesOrders3.find({
	bNetAmount:{
		$gte: 50,
		$lte: 100
	}
}).sort({
	bDate:-1
}).skip(0).limit(1)
///////////////////////////////////////////////////////////////////////////////
////USECASE 6.5 Searchable by date and bill amount/////////////////////////////
///////////////////////////////////////////////////////////////////////////////
db.salesOrders3.find({
	bDate:{
		$gte: new Date(2014, 0, 1),
		$lte: new Date(2014, 0, 31)
	},
	bNetAmount:{
		$gte: 50,
		$lte: 100
	}
}).sort({
	bDate:-1
}).skip(0).limit(1)
///////////////////////////////////////////////////////////////////////////////
////USECASE 6.6 Searchable by a product in the bill////////////////////////////
///////////////////////////////////////////////////////////////////////////////
db.salesOrders3.find({
	bItems.pDesc://??Array
}).sort({
	bDate:-1
}).skip(0).limit(1)
///////////////////////////////////////////////////////////////////////////////
////USECASE 6.7 Searchable by payment status///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
db.salesOrders3.find({
	payment.status: //??
}).sort({
	bDate:-1
}).skip(0).limit(1)
///////////////////////////////////////////////////////////////////////////////
////USECASE 6.8 Searchable by contact person or phone no.//////////////////////
///////////////////////////////////////////////////////////////////////////////
db.salesOrders3.find({
	$or:{
		dDetail.name: //??,
		dDetail.phoneNo:
	}
}).sort({
	bDate:-1
}).skip(0).limit(1)
///////////////////////////////////////////////////////////////////////////////
////USECASE 6.9 Update Delivery Status along with payment status///////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
////USECASE 6.10 Update Cheque clearence status////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
