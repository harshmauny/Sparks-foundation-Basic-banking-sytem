import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
    render() {
        return (
            <div class="container">
                <div id="option-cards" class="row">
                    <div class="col-sm-6">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Customers</h5>
                                <p class="card-text">Click Below to view Customer Details and Transfer Option</p>
                                <Link to='/customers'><button className="btn btn-primary">View Customers</button></Link>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Transactions</h5>
                                <p class="card-text">Click Below to view recent Transactions</p>
                                <Link to='/transactions'><button className="btn btn-success">View Transactions</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}