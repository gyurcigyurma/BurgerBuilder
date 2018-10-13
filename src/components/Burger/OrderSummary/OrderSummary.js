import React from 'react';
import Aux from '../../../hoc/Auxi';

const orderSummary = (props) => {
    const ingredientSummary =
        Object
            .entries(props.ingredients)
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
            <p>Continue to checkout?</p>

        </Aux>
    )
}

export default orderSummary;
