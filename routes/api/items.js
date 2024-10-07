//express router 
const express= require('express');
const router=express.Router();

//Item Model
const Item = require('../../models/Item');

//@route GET api/items
//@desc Get all items
//@access Public
router.get('/', (req,res) => {// uses / since router is already mapped to file in server
	Item.find()
	.sort({date: -1})//sort by date (1) asc (-1) desc
	.then(items => res.json(items))//stores results in items array
});

//@route POST api/items
//@desc Create an Item
//@access Public
router.post('/', (req,res) => {
	const newItem= new Item({
		name: req.body.name,
		transactionType: req.body.transactionType,
		amount: req.body.amount,
		accountNumber: req.body.accountNumber
	});//from item model above
	newItem.save().then(item => res.json(item));
});

//@route DELETE api/items/:id
//@desc Delete an Item
//@access Public
router.delete('/:id', (req,res) => {// uses :id for an id value to delete value
	Item.findById(req.params.id)//extract from param
	.then(item => item.remove()
	.then(() => res.json({success: true})))	
	.catch(err => res.status(404).json({success: false}));
});




module.exports=router;