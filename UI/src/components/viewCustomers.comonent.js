import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListCustomer = props => (
    <tr>
        <th scope="row">{props.index}</th>
        <td>{props.customers.name}</td>
        <td>{props.customers.email}</td>
        <td>{props.customers.currBal}</td>
    </tr>
)

export default class ViewCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
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

    customerFill = () => {
        return this.state.customers.map((customer, index) => {
            console.log("hello customer")
            return <ListCustomer customers={customer} key={customer._id} index={index + 1} />
        })
    }
    render() {
        return (
            <div className="container">

                <div className="customer-transfer">
                    <h1>Welcome to Customers page</h1>
                    <Link to="/transfer"><button className="btn btn-primary customer-transfer-btn">Transfer</button></Link>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Current Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.customerFill()}
                    </tbody>
                </table>
            </div>
        )
    }
}