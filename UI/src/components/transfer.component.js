import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sender: "",
            receiver: "",
            amount: "",
            customers: [],
            redirect: false
        };

        this.senderDropdownChange = this.senderDropdownChange.bind(this);
        this.receiverDropdownChange = this.receiverDropdownChange.bind(this);
    }

    senderDropdownChange(e) {
        this.setState({ sender: e.target.value });
        console.log(this.state.sender)
    }

    receiverDropdownChange(e) {
        this.setState({ receiver: e.target.value });
        console.log(this.state.receiver)
    }

    updateInputValue(evt) {
        this.setState({ amount: evt.target.value });
    }
    componentDidMount() {
        axios.get("https://sparks-bank-backend.herokuapp.com/users")
            .then(response => {
                this.setState({ customers: response.data })
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    senderFill = () => {
        return this.state.customers.map((customer) => {
            return <option value={customer._id}>{customer.name}</option>

        })
    }

    receiverFill = () => {
        return this.state.customers.map((customer) => {
            if (this.state.sender !== customer._id)
                return <option value={customer._id}>{customer.name}</option>

        })
    }


    sendData = () => {
        const transfer = {
            senderId: this.state.sender,
            recieverId: this.state.receiver,
            amount: this.state.amount
        }

        axios.post('https://sparks-bank-backend.herokuapp.com/transactions', transfer)
            .then(res => {
                console.log(res.data)
                alert("Money transferred!!");
                this.setState({ redirect: true })
            });



    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />;
        }
        return (
            <div className="container">
                <h1 className="transferHeading">Transfer</h1>
                <div className="transfer-form">
                    <div className="transfer-form-comp">
                        <label className="form-contol form-label">From</label>
                        <select className="form-control form-select" onChange={this.senderDropdownChange}>
                            <option value="NA">N/A</option>
                            {this.senderFill()}
                        </select>
                    </div>
                    <div className="transfer-form-comp">
                        <label className="form-contol form-label">To</label>
                        <select className="form-control form-select" onChange={this.receiverDropdownChange}>
                            <option value="NA">N/A</option>
                            {this.receiverFill()}
                        </select>
                    </div>

                    <div className="transfer-form-comp">
                        <label className="form-contol form-label">Amount</label>
                        <input className="form-control" value={this.state.amount} onChange={evt => this.updateInputValue(evt)} />
                    </div>

                    <button className="btn btn-primary" onClick={() => this.sendData()}>Transfer</button>

                </div>

                {/* <div>Sender Selected value is : {this.state.sender}</div>
                <div>Receiver Selected value is : {this.state.receiver}</div>
                <div>Amount is : {this.state.amount}</div> */}
            </div>
        )
    }
}