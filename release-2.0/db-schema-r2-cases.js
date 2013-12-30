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
////USECASE 1.5 A product with different price getting added and marked to delete other price details by marking it as single priced////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////////////A FLAG TO MARK THAT IT IS SINGLE PRICED////////////////////////////
db.productSet3.update({
        pName: "Lux Sandal",
        'pUnit.val': "small",
        'pUnit.unit': "size"
}, {
	$set:{
                pPrice: [{
                        price: 27,
                        unit: "Rs"
                }],
		marketPriced : 1,
		dateCM : new Date()
	}
}, {
        upsert: true,
        multi: true
})
///////////////////////////////////////////////////////////////////////////////
////USECASE 1.6 A product getting added for the first time and marked as single priced
///////////////////////////////////////////////////////////////////////////////
////////////A FLAG TO MARK THAT IT IS SINGLE PRICED////////////////////////////
db.productSet3.update({
        pName: "Sugar",
        'pUnit.val': 1,
        'pUnit.unit': "kg"
}, {
	$set:{
                pPrice: [{
                        price: 45,
                        unit: "Rs"
                }],
		marketPriced : 1,
		dateCM : new Date()
	}
}, {
        upsert: true,
        multi: true
})
///////////////////////////////////////////////////////////////////////////////
////USECASE 1.7 A single priced product with different price getting updated///
///////////////////////////////////////////////////////////////////////////////
////////////A FLAG TO MARK THAT IT IS SINGLE PRICED////////////////////////////
db.productSet3.update({
        pName: "Sugar",
        'pUnit.val': 1,
        'pUnit.unit': "kg"
}, {
	$set:{
		pPrice: [{
                        price: 50,
                        unit: "Rs"
                }],
		marketPriced : 1,
		dateCM : new Date()
	}
}, {
        upsert: true,
        multi: true
})
///////////////////////////////////////////////////////////////////////////////
////USECASE 1.8 A single priced product with different price getting added and converted to unbounded price
///////////////////////////////////////////////////////////////////////////////
////////////A FLAG TO MARK THAT IT IS SINGLE PRICED BEING UNCHECKED////////////
db.productSet3.update({
        pName: "Sugar",
        'pUnit.val': 1,
        'pUnit.unit': "kg"
}, {
        $addToSet: {
                pPrice: {
                        price: 55,
                        unit: "Rs"
                }
        },
	$set:{
		dateCM : new Date()
	},
	$unset:{marketPriced:1}
}, {
        upsert: true,
        multi: true
})
///////////////////////////////////////////////////////////////////////////////
///////$exists: true///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
