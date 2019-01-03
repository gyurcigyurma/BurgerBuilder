import React from 'react';
import Aux from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {

    componentWillUpdate() {
        console.log('[OrderSummary updates]')
    }

    render() {
        const ingredientSummary =
            Object
                .entries(this.props.ingredients)
                .map((currentArr) => {
                    return (
                        <li key={currentArr[0]}>
                            <span style={{ textTransform: 'capitalize' }}>{currentArr[0]}</span>:{currentArr[1]}
                        </li>);
                })

        return (
            <Aux>
                <h3>Your order summary</h3>
                <p>A nice burger with the following ingredients:</p>
                <ul>{ingredientSummary}</ul>
                <p><strong>Your order total is: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>

            </Aux>
        )
    }
}

export default OrderSummary;






