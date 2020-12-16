import React, { Component } from 'react';
import axios from 'axios';

const ListTransaction = props => (
    <tr>
        <th scope="row">{props.index}</th>
        <td>{props.senderName + "  "}({props.transactions.senderId})</td>
        <td>{props.receiverName + "  "}({props.transactions.recieverId})</td>
        <td>{props.transactions.transactionId}</td>
        <td>{props.transactions.amount}</td>
    </tr>
)

export default class ViewTransactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            customers: []
        }
    }
    componentDidMount() {
        var transactionData = []
        axios.get("https://sparks-bank-backend.herokuapp.com/transactions")
            .then(response => {
                //this.setState({ transactions: response.data })
                transactionData = response.data
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get("https://sparks-bank-backend.herokuapp.com/users")
            .then(response => {
                this.setState({ customers: response.data, transactions: transactionData })

                //console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    transactionFill = () => {

        return this.state.transactions.map((transaction, index) => {
            var SenderName = this.state.customers.find(name => {
                return transaction.senderId === name._id
            })
            var ReceiverName = this.state.customers.find(name => {
                return transaction.recieverId == name._id
            })
            console.log(transaction.receiver)
            return <ListTransaction transactions={transaction} senderName={SenderName.name} receiverName={ReceiverName.name} key={transaction._id} index={index + 1} />
        })
    }
    render() {
        return (
            <div className="container">
                <h1 className="transactionHeading">Transactions</h1>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Sender</th>
                            <th scope="col">Receiver</th>
                            <th scope="col">Transaction ID</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.transactionFill()}
                    </tbody>
                </table>
            </div>
        )
    }
}