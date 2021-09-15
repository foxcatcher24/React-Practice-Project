import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients : null,
    totalPrice: 2.99,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.3,
    cheese: 1,
    meat: 2.2
}

const reducer = ( state=initialState, action ) => {
    switch( action.type ){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [ action.ingredientName ] : state.ingredients[ action.ingredientName ] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[ action.ingredientName ]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [ action.ingredientName ] : state.ingredients[ action.ingredientName ] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[ action.ingredientName ]
            };
        default:
            return state;
    }
};

export default reducer;