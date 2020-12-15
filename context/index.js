import React, { Component } from 'react';
import Data from './Data';

const data = new Data();

export const Context = React.createContext();

export class Provider extends Component {
  state = { 
    //authenticatedUser: null,
    authenticatedUser: true,
    cartItems: [],
    stores: [],
    cartTotal: 0
  };

  updateCartItems = items => {
    this.setState({ cartItems: items});
  }

  updateCartTotal = price => {
    this.setState({ cartTotal: price})
  }

  calculateCartTotalWithTax = tax => {
    const { cartTotal } = this.state;
    return cartTotal+cartTotal*tax;
  }

  clearData = async () => {
    try {
      await data.clearStorage();
      return res;
    } catch(err) {
      return err;
    }
  }

  register = async newUser => {
    try {
      const res = await data.writeUser(newUser);
      return res;
    } catch (err) {
      return err;
    }
  }

  login = async credentials => {
    try {
      const res = await data.readUser(credentials), { user } = res;
      if (user) this.setState({ authenticatedUser: user });
      return res;
    } catch(err) {
      return err;
    }
  }

  getSurroundingStores = () => {
    try {
      const res = data.getSurroundingStores();
      this.setState({ stores: res });
    } catch(err) {
      this.setState({ stores: err.message });
    }
  }

  render() {
    const value = {
      authenticatedUser: this.state.authenticatedUser,
      cartItems: this.state.cartItems,
      cartTotal: this.state.cartTotal,
      stores: this.state.stores,
      actions: {
        clearData: this.clearData,
        register: this.register,
        login: this.login,
        updateCartItems: this.updateCartItems,
        updateCartTotal: this.updateCartTotal,
        calculateCartTotalWithTax: this.calculateCartTotalWithTax,
        getSurroundingStores: this.getSurroundingStores
      }
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const { Consumer } = Context;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context}/>}
      </Context.Consumer>
    );
  }
}

