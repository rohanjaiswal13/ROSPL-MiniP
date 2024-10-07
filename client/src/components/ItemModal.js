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
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';
import {getAccounts} from '../actions/accountActions';
import PropTypes from 'prop-types';


class ItemModal extends Component{
	state={
		modal: false,
		dropdownOpen: false,
		dropdownAccountOpen: false,
		name: '',
		transactionType: 'Type',
		amount: 0,
		accountNumber: 'Account'
	}

	componentDidMount(){
		this.props.getAccounts();

	}

	toggle=()=>{
		this.setState({
			modal: !this.state.modal

		});
	}

	toggleType=()=> {
	    this.setState(prevState => ({
	      dropdownOpen: !prevState.dropdownOpen
	    }));
	}

	toggleAccount=()=> {
	    this.setState(prevState => ({
	      dropdownAccountOpen: !prevState.dropdownAccountOpen
	    }));
	}

	onChange =(e)=>{
		this.setState({
			[e.target.name]: e.target.value

		});
	}

	select = (event) => {
	    this.setState({
	      transactionType: event.target.innerHTML
	    });
	}
	chooseAccount = (event) => {
	    this.setState({
	      accountNumber: event.target.innerHTML
	    });
	}

	onSubmit=(e)=>{
		//prevent default submission
		e.preventDefault();
		const num=this.state.accountNumber.split("-");
	
		const newItem ={
			name: this.state.name,
			transactionType: this.state.transactionType,
			amount: this.state.amount,
			accountNumber: num[2]

		}
		//add item via addItem action
		this.props.addItem(newItem);

		//close modal
		this.toggle();
	}

	render(){
		const { accounts }=this.props.account;
		return(
			<div>
				<Button 
				style={{marginBottom: '2rem', background: 'Green', borderRadius: '100%' }}
				onClick={this.toggle}
				>+
				</Button>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
				>
					<ModalHeader toggle={this.toggle}>Add To List</ModalHeader>

					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Dropdown style={{ marginBottom: '1rem' }} isOpen={this.state.dropdownOpen} toggle={this.toggleType}>
							        <DropdownToggle caret>
							          {this.state.transactionType}
							        </DropdownToggle>
							        <DropdownMenu >
							          <DropdownItem header>Pick One</DropdownItem>
							          <DropdownItem divider />
							          <DropdownItem onClick={this.select}>Income</DropdownItem>
							          <DropdownItem onClick={this.select}>Expense</DropdownItem>
							        </DropdownMenu>
						      	</Dropdown>

						      	<Label for="account">Account</Label>
						      	<Dropdown style={{ marginBottom: '1rem' }} isOpen={this.state.dropdownAccountOpen} toggle={this.toggleAccount}>
							        <DropdownToggle caret>
							          {this.state.accountNumber}
							        </DropdownToggle>
							        <DropdownMenu >
							          <DropdownItem header>Pick One</DropdownItem>
							          <DropdownItem divider />
							          {accounts.map(({_id, name, accountHolder, accountType, accountNumber ,date}) => (
							          	<DropdownItem onClick={this.chooseAccount}>{name}-{accountHolder}-{accountNumber}</DropdownItem>
							          ))}
							        </DropdownMenu>
						      	</Dropdown>

								<Label for="item">Item</Label>
								<Input style={{ marginBottom: '1rem' }} 
									type="text"
									name="name"
									id="item"
									placeholder="Add new transaction"
									onChange={this.onChange}
								/>
								<InputGroup>
							        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
									<Input 
										type="currency"
										name="amount"
										id="amount"

										placeholder="Add the transaction amount"
										onChange={this.onChange}
									/>
								</InputGroup>
							        
								<Button color="dark" style={{marginTop: '2rem'}} block>Add Item</Button>
							</FormGroup>
						</Form>

					</ModalBody>
				</Modal>

			</div>

		);
	}

}

ItemModal.propTypes={
	getAccounts: PropTypes.func.isRequired,
	account: PropTypes.object.isRequired,
	item: PropTypes.object.isRequired

}

const mapStateToProps=(state)=>({
	item: state.item,
	account: state.account
});
export default connect(mapStateToProps, {addItem, getAccounts})(ItemModal);