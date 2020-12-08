import React, { Component } from 'react';
import Data from './Data';

const data = new Data();

export const Context = React.createContext();

export class Provider extends Component {
  state = { 
    authenticatedUser: null,
    cartTotal: 0
  };

  updateCartTotal = price => {
    this.setState({ cartTotal: price})
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

  render() {
    const value = {
      authenticatedUser: this.state.authenticatedUser,
      cartTotal: this.state.cartTotal,
      actions: {
        clearData: this.clearData,
        register: this.register,
        login: this.login,
        updateCartTotal: this.updateCartTotal
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

