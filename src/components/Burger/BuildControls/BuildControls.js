import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Meat', type: 'meat' },
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' }

];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>This price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {controls.map(control => (
                <BuildControl
                    key={control.label}
                    label={control.label}
                    added={() => props.ingredientAdded(control.type)}
                    removed={() => props.ingredientRemoved(control.type)}
                    disabled={props.disabled[control.type]}
                />
            ))}
            <button
                disabled={!props.purchasable}
                className={classes.OrderButton}
                onClick={props.ordered}
            >ORDER now!</button>
        </div>
    )
}

export default BuildControls;
