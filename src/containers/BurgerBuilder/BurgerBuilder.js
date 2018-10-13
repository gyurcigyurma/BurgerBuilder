import React, { Component } from "react";
import Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 4,
        purchasable: false,
        isPurchaseInProgress: false //purchasing neki
    }

    INGREDIENTS_PRICES = {
        salad: 0.4,
        bacon: 0.7,
        cheese: 0.5,
        meat: 1.2

    }

    updatePurchaseState = (ingredients) => {
        const purchasable =
            Object
                .values(ingredients)
                .some(function (item) {
                    return item > 0;
                })
        this.setState({purchasable: purchasable})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const priceAddition = this.INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount < 1) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = this.INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredients);
    }

    isPurchaseInProgressHandler = () => {  //purchaseHandler neki
        this.setState({isPurchaseInProgress: true})

    }

    render() {

        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        console.log(disabledInfo)
        return (
            <Aux>
                <Modal show={this.state.isPurchaseInProgress}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    totalPrice={this.state.totalPrice}
                    ordered={this.isPurchaseInProgressHandler}/>
            </Aux>
        )
    }
}