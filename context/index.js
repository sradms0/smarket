import React, { Component } from 'react';
import Data from './Data';

const data = new Data();
const storeData = data.getStoreData();

export const Context = React.createContext();

export class Provider extends Component {
  state = { 
    authenticatedUser: null,
    cartItems: [],
    storeLocations: [],
    storeData: null,
    currentStore: null,
    cartTotal: 0
  };

  addCartItem = item => {
    // check if item is already in cart; update quantity if so
    const { cartItems } = this.state;
    const existing = this.findItem(item);
    item.quantity++;

    if (!existing) cartItems.push(item);

    this.updateCartItems(cartItems);
  }

  removeCartItem = item => {
    let { cartItems } = this.state;
    const idx = cartItems.findIndex(i => i === item);

    if (idx > -1) {
      if (item.quantity === 1)
        cartItems = [...cartItems.slice(0,idx), ...cartItems.slice(idx+1)];
      item.quantity--;
      this.updateCartItems(cartItems)
    }
  }

  findItem = item => {
   return this.state.cartItems.find(i => i === item);
  }

  getTotalCartItems = () => {
    return this.state.cartItems
      .reduce((acc,curr) => acc+curr.quantity, 0);
  }

  clearCartItems = () => {
    this.updateCartItems([]);
  }

  updateCartItems = cartItems => {
    this.setState({ cartItems: [...cartItems]});
    this.updateCartTotal(cartItems);
  }

  updateCartTotal = cartItems => {
    const price = cartItems
      .reduce((acc, curr) => acc+curr.price*curr.quantity, 0);
    this.setState({ cartTotal: price})
  }

  updateCurrentStore = (storeDisplayName, storeDataName) => {
    const store = storeData.stores.find(s => s.name === storeDataName);
    this.setState({ currentStore: {displayName: storeDisplayName, data: store}});
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

  updateCreditCard = async (emailAddress, creditCard) => {
    try {
      const res = await data.updateCreditCard(emailAddress, creditCard);
      const { authenticatedUser } = this.state;
      const credentials = { 
        emailAddress: authenticatedUser.emailAddress, 
        password: authenticatedUser.password 
      };
      const updatedUser = this.login(credentials);
      return res;
    } catch(err) {
      return err;
    }
  }

  getSurroundingStores = () => {
    try {
      const res = data.getSurroundingStores();
      this.setState({ storeLocations: res });
    } catch(err) {
      this.setState({ storesLocations: err.message });
    }
  }



  render() {
    const value = {
      authenticatedUser: this.state.authenticatedUser,
      cartItems: this.state.cartItems,
      cartTotal: this.state.cartTotal,
      storeLocations: this.state.storeLocations,
      currentStore: this.state.currentStore,
      actions: {
        clearData: this.clearData,
        register: this.register,
        login: this.login,
        updateCreditCard: this.updateCreditCard,
        addCartItem: this.addCartItem ,
        removeCartItem: this.removeCartItem,
        updateCartTotal: this.updateCartTotal,
        calculateCartTotalWithTax: this.calculateCartTotalWithTax,
        getSurroundingStores: this.getSurroundingStores,
        updateCurrentStore: this.updateCurrentStore,
        getTotalCartItems: this.getTotalCartItems,
        clearCartItems: this.clearCartItems 
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

