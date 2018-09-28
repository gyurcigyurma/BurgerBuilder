import React, { Component } from "react";
import Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';

export default class BurgerBuiler extends Component {
    render() {
        return (
            <Aux>
                <Burger />
                <div>Controls</div>
            </Aux>
        )
    }
}