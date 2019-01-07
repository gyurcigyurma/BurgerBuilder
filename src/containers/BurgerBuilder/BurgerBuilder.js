import React, { Component } from "react";
import Auxi from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuiler extends Component {
    /*constructor (props) {
        super(props);        
    }*/

    state = {
        totalPrice: 4,
        purchasable: false,
        isPurchaseInProgress: false, //purchasing neki
        error: false
    }

    INGREDIENTS_PRICES = {
        salad: 0.4,
        bacon: 0.7,
        cheese: 0.5,
        meat: 1.2

    }

    componentDidMount() {
        axios.get('https://learnburger-72a11.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    updatePurchaseState = (ingredients) => {
        const purchasable =
            Object
                .values(ingredients)
                .some(function (item) {
                    return item > 0;
                })
        this.setState({ purchasable: purchasable })
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
        this.setState({ isPurchaseInProgress: true })

    }

    purchaseCancelHandler = () => {
        this.setState({ isPurchaseInProgress: false })
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Gunter Majon',
                address: {
                    street: 'test str 5',
                    zipCode: '23232355',
                    country: 'Lybia'
                },
                email: 'test@majom.hu'
            },
            deliveryMethod: 'post'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                    isPurchaseInProgress: false
                })
                console.log(response)
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    isPurchaseInProgress: true
                })
                console.log(error)
            });
    }

    render() {

        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p>Ingredients cant' loaded</p> : <Spinner />;
        let orderSummary = null;
        if (this.state.loading) {
            orderSummary = <Spinner />
        }


        if (this.state.ingredients) {
            burger = (
                <Auxi>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        totalPrice={this.state.totalPrice}
                        ordered={this.isPurchaseInProgressHandler} />
                </Auxi>);

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                price={this.state.totalPrice}
                purchaseContinued={this.purchaseContinueHandler}
            />
        }

        return (
            <Auxi>
                <Modal show={this.state.isPurchaseInProgress} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxi>
        )
    }
}

export default withErrorHandler(BurgerBuiler, axios);