import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.3,
    cheese: 1,
    meat: 2.2
}

class BurgerBuilder extends Component{

    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese: 0,
            meat  : 0
        },
        totalPrice: 2.99,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients) {
        // const ingredients = {...this.state.ingredients};

        const sum = Object.keys(ingredients)
                            .map( igKey => {
                                return ingredients[igKey]
                            })
                            .reduce( ( prevValSum, newValElm ) => {
                                return prevValSum + newValElm; 
                            } ,0);
        
        // console.log(sum);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;
        
        const addedPrice = INGREDIENT_PRICES[type]; 
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + addedPrice;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {  
        const oldCount = this.state.ingredients[type];

        if( oldCount <= 0 ){
            return;
        }

        const updatedCount = oldCount - 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;
        
        const deductedPrice = INGREDIENT_PRICES[type]; 
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - deductedPrice;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false });
    }

    purchaseContinueHandler = () => {
        alert('You continued!');
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelHandler={this.purchaseCancelHandler}
                        purchaseContinueHandler={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={ this.addIngredientHandler }
                    ingredientRemoved={this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;