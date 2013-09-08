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
//////CASE 2: SCHEMA HOLDS DIF PRODUCT TYPE IN DIFF RECORD SET ////////////////
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
///////$exists: true///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


