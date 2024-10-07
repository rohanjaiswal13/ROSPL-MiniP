import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class Calculations extends Component{
	//life cycle method
	state={
		items: getItems,
		income: 0,
		expense: 0
	}
	
	componentDidMount(){
		this.props.getItems();

	}


	getIncome=(item)=>{
		let inc=0;
		if (typeof item != 'undefined'){
			for(let x=0; x<item.length;x++){
				if(item[x].transactionType==="Income"){
					inc=inc+item[x].amount;
				}
			}
		}
		
		return Math.round(inc * 100) / 100;
	}

	getExpenses=(item)=>{
		let exp=0;
		if (typeof item != 'undefined'){
			for(let x=0; x<item.length;x++){
				if(item[x].transactionType==="Expense"){
					exp=exp+item[x].amount;
				}
			}
		}
		
		return Math.round(exp * 100) / 100;
	}


	render (){
		let { items }=this.props.item;
		this.state.income=this.getIncome(items);
		this.state.expense=this.getExpenses(items);


		return(
			<div>
				<h2>Income</h2>
	            {"$"+this.state.income}
	            
	            <h2>Expense</h2>
	            {"$"+this.state.expense}
            </div>
            
		);

	}
}




Calculations.propTypes={
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired

}
const mapStateToProps =(state)=> ({
	item: state.item

});

export default connect(mapStateToProps,{getItems}) (Calculations);

	


