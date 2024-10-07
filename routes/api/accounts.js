//express router 
const express= require('express');
const router=express.Router();

//Item Model
const Account = require('../../models/Account');

//@route GET api/items
//@desc Get all items
//@access Public
router.get('/', (req,res) => {// uses / since router is already mapped to file in server
	Account.find()
	.sort({dateCreated: -1})//sort by date (1) asc (-1) desc
	.then(accounts => res.json(accounts))//stores results in items array
});

//@route POST api/items
//@desc Create an Item
//@access Public
router.post('/', (req,res) => {
	const newAccount= new Account({
		name: req.body.name,
		accountHolder: req.body.accountHolder,
		accountType: req.body.accountType,
		accountNumber: req.body.accountNumber
	});
	//from account model above
	newAccount.save().then(account => res.json(account));
});

//@route DELETE api/items/:id
//@desc Delete an Item
//@access Public
router.delete('/:id', (req,res) => {// uses :id for an id value to delete value
	Account.findById(req.params.id)//extract from param
	.then(account => account.remove()
	.then(() => res.json({success: true})))	
	.catch(err => res.status(404).json({success: false}));
});




module.exports=router;