import React,{Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../Axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component{

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        // console.log(this.props);
        // axios.get('URL')
        //     .then( response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch( error =>{
        //         // console.log(error);
        //         this.setState({ error: true})
        //     });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
                            .map( igKey => {
                                return ingredients[igKey]
                            })
                            .reduce( ( prevValSum, newValElm ) => {
                                return prevValSum + newValElm; 
                            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    
    render(){
        const disabledInfo = {
            ...this.props.igdt
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>

     
        if( this.props.igdt ){
            burger = (<Aux>
                <Burger ingredients= {this.props.igdt }/>
                <BuildControls 
                    ingredientAdded={ this.props.onAddIngredient } 
                    ingredientRemoved={ this.props.onRemoveIngredient } 
                    disabled={ disabledInfo }
                    price={ this.props.prc }
                    purchasable={ this.updatePurchaseState( this.props.igdt ) }
                    ordered={ this.purchaseHandler } />
            </Aux>);

            orderSummary = (
                            <OrderSummary 
                                ingredients={ this.props.igdt }
                                purchaseCancelHandler={ this.purchaseCancelHandler }
                                purchaseContinueHandler={ this.purchaseContinueHandler } 
                                price={ this.props.prc } />
            ); 
        }

        if( this.state.loading ){
            orderSummary = <Spinner />;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
               {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        igdt: state.ingredients,
        prc: state.totalPrice
    };
}
const mapDispatchToProps = dispatch => {
    return{
        onAddIngredient: ( ingName ) => dispatch(burgerBuilderActions.addIngredient( ingName ) ),
        onRemoveIngredient: ( ingName ) => dispatch(burgerBuilderActions.removeIngredient( ingName ) )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(withErrorHandler(BurgerBuilder, axios));