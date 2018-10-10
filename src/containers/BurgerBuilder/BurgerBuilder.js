import React, { Component } from "react";
import Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

export default class BurgerBuiler extends Component {
    /*constructor (props) {
        super(props);        
    }*/

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    INGREDIENTS_PRICES = {
      salad: 0.4,
      bacon: 0.7,
      cheese: 0.5,
      meat: 1.2

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const priceAddition = this.INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
        
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                ingredientAdded = {this.addIngredientHandler} />
            </Aux>
        )
    }
}