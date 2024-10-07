import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { getAccounts } from '../actions/accountActions';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import PayOffCredit from './PayOffCredit';

class AccountSummary extends Component{
	//life cycle method
	state={
		items: getItems,
		accounts: getAccounts,
		assets: 0,
		liabilities: 0
	}
	
	componentDidMount(){
		this.props.getItems();
		this.props.getAccounts();

	}


	getAssets=(item, accountNumber)=>{
		let inc=0;
		if (typeof item != 'undefined'){
			for(let x=0; x<item.length;x++){
				if(item[x].transactionType==="Income" & item[x].accountNumber===accountNumber){
					inc=inc+item[x].amount;
				}
			}
		}
		
		return Math.round(inc * 100) / 100;
	}

	getLiabilities=(item, accountNumber)=>{
		let exp=0;
		if (typeof item != 'undefined'){
			for(let x=0; x<item.length;x++){
				if(item[x].transactionType==="Expense" & item[x].accountNumber===accountNumber){
					exp=exp+item[x].amount;
				}
			}
		}
		return Math.round(exp * 100) / 100;
	}

	getBalance=(item, accountNumber)=>{
		let exp=0;
		let temp=0;
		if (typeof item != 'undefined'){
			for(let x=0; x<item.length;x++){
				if(item[x].accountNumber===accountNumber){
					temp=item[x].amount;
					if(item[x].transactionType==="Expense"){
						temp=temp*-1;
					}
					exp=exp+temp;
				}
				
			}
		}
		return Math.round(exp * 100) / 100;
	}

	checkType=(type)=>{
		if(type==='Credit Card'){
			return true;
		}
		return false;
	}


	render (){
		let { items }=this.props.item;
		let { accounts }=this.props.account;
		this.state.assets=this.getAssets(items, 789);
		this.state.liabilities=this.getLiabilities(items, 789);


		return(
			<div>


				{accounts.map(({name, accountHolder, accountType, accountNumber, dateCreated }) => (

					<div style={{border: 'solid 2px', margin: '1rem', padding: '1rem'}}>
						<div style={{fontWeight: 'bold', marginBottom: '0.2rem'}}>
							Account: 
						</div>

						<div style={{display: accountType==='Credit Card' ? 'inline' : 'none'}} >
							<PayOffCredit actNum={accountNumber}/>
						</div>

						<div style={{marginBottom: '0.6rem', display: 'inline'}}>
							{name} - {accountHolder} - {accountType} - {accountNumber} - {dateCreated.substring(0, dateCreated.indexOf("T"))}
							
						</div>

						<div>
							<h4>Income</h4>

							${this.getAssets(items,accountNumber)}
								

						</div>

						<div>
							<h4>Expenses</h4>

							${this.getLiabilities(items,accountNumber)}
						</div>

						<div>
							<h4>Balance</h4>

							${this.getBalance(items,accountNumber)}
						</div>

					</div>
				))}	
				
            </div>
            
		);

	}
}




AccountSummary.propTypes={
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired,
	getAccounts: PropTypes.func.isRequired,
	account: PropTypes.object.isRequired

}
const mapStateToProps =(state)=> ({
	item: state.item,
	account: state.account

});

export default connect(mapStateToProps,{getItems, getAccounts}) (AccountSummary);

	


