import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const fetchIngedientsFail = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL
    }
}

export const addIngredient = (name) => (
    {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
);

export const removeIngredient = (name) => (
    {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    }
);



export const setIngredients = (ingredients) => ({
    type: actionTypes.SET_INGREDIENTS,
    ingredients
})


export const initIngredients = () => {
    return dispatch => {        
        axios.get('https://learnburger-72a11.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngedientsFail())
            })
    }
}






