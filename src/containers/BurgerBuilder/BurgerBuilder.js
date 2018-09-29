import React, { Component } from "react";
import Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';

export default class BurgerBuiler extends Component {
    /*constructor (props) {
        super(props);        
    }*/

    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat: 0
        }
    }

    render() {
        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients} />
                <div>Controls</div>
            </Aux>
        )
    }
}