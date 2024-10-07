import { connect } from 'react-redux';
import { getItems, addItem } from '../actions/itemActions';
import { getAccounts } from '../actions/accountActions';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
Button,
Modal,
ModalHeader, 
ModalBody, 
Form, 
FormGroup, 
Label, 
Input, InputGroup, InputGroupAddon, Dropdown, DropdownItem, DropdownToggle, DropdownMenu
} from 'reactstrap';

class PayOffCredit extends Component{
	//life cycle method
	state={
		modal: false,
		items: getItems,
		accounts: getAccounts,
		assets: 0,
		liabilities: 0,
		accountNumber: 'Account',
		amount: 0,
		dropdownAccountOpen: false

	}
	
	componentDidMount(){
		this.props.getItems();
		this.props.getAccounts();

	}

	toggle=()=>{
		this.setState({
			modal: !this.state.modal

		});
	}

	toggleAccount=()=> {
	    this.setState(prevState => ({
	      dropdownAccountOpen: !prevState.dropdownAccountOpen
	    }));
	}

	chooseAccount = (event) => {
	    this.setState({
	      accountNumber: event.target.innerHTML
	    });
	}

	onChange =(e)=>{
		this.setState({
			[e.target.name]: e.target.value

		});
	}

	onSubmit=(e)=>{
		//prevent default submission
		e.preventDefault();
		const num=this.state.accountNumber.split("-");

		const fromItem ={
			name: 'Paid to Credit Card: '+this.props.actNum,
			transactionType: 'Expense',
			amount: this.state.amount,
			accountNumber: num[2]

		}

		const toItem ={
			name: 'Paying off Credit Card from Account: '+num[2],
			transactionType: 'Income',
			amount: this.state.amount,
			accountNumber: this.props.actNum

		}
		//add item via addItem action
		this.props.addItem(fromItem);
		this.props.addItem(toItem);

		//close modal
		this.toggle();
	}


//Can transfer money from another account to mastercard to pay off
//results in income on mastercard and expense on other account


	render (){
		let { items }=this.props.item;
		let { accounts }=this.props.account;

		return(
			<div>

				<Button 
				style={{float: 'right', background: 'Red', borderRadius: '5%' }}
				onClick={this.toggle}
				>Pay
				</Button>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
				>
					<ModalHeader toggle={this.toggle}>Paying off Credit</ModalHeader>

					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>

						      	<Label for="from">Pay from Account</Label>
						      	<Dropdown style={{ marginBottom: '1rem' }} isOpen={this.state.dropdownAccountOpen} toggle={this.toggleAccount}>
							        <DropdownToggle caret>
							          {this.state.accountNumber}
							        </DropdownToggle>
							        <DropdownMenu >
							          <DropdownItem header>Pick One</DropdownItem>
							          <DropdownItem divider />
							          {accounts.filter(eachAct => eachAct.accountType != 'Credit Card').map(({_id, name, accountHolder, accountType, accountNumber ,date}) => (
							          	<DropdownItem onClick={this.chooseAccount}>{name}-{accountHolder}-{accountNumber}</DropdownItem>
							          ))}
							        </DropdownMenu>
						      	</Dropdown>

						      	<Label for="amt">Amount to pay off</Label>
								<InputGroup>
							        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
									<Input 
										type="currency"
										name="amount"
										id="amount"

										placeholder={this.state.amount}
										onChange={this.onChange}
									/>
								</InputGroup>
							        
								<Button color="dark" style={{marginTop: '2rem'}} block>Pay</Button>
							</FormGroup>
						</Form>

					</ModalBody>
				</Modal>

				
				
            </div>
            
		);

	}
}




PayOffCredit.propTypes={
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired,
	getAccounts: PropTypes.func.isRequired,
	account: PropTypes.object.isRequired

}
const mapStateToProps =(state)=> ({
	item: state.item,
	account: state.account

});

export default connect(mapStateToProps,{addItem, getItems, getAccounts}) (PayOffCredit);

	


