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

