import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {


    componentDidMount() {
        console.log('MÁUNT')
        this.props.onFetchOrders(this.props.token);
    }

    componentWillUnmount ( ) {
        console.log('itten')
    }
    render() {
        let orders = <Spinner></Spinner>;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ))
        }
        return (
            <div> maci
                {orders}
            </div>
        );

    }
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
})

const mapDispatchToProps = (dispatch) => ({
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
