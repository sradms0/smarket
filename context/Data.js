import AsyncStorage from '@react-native-async-storage/async-storage';
import * as storeData from './storeData.json'

export default class Data {
  #storage
  constructor() {
    this.#storage = AsyncStorage;
  }

  #validateNewUser({ emailAddress, password, confirmPassword, creditCard }) {
    const validators = [
      {key: 'email', f: () => !/\w+@\w+\.\w{2,3}/.test(emailAddress) ? 'valid email required' : null},
      {key: 'password', f: () => password.length < 5 ? 'must be at least 5 characters' : null},
      {key: 'password confirmation', f: () => confirmPassword !== password ? 'passwords do not match' : null},
      ...this.#getCardValidators(creditCard)
    ];
    return validators
      .map(v => ({ field: v.key,  status: v.f() }))
      .filter(res => res.status)
      .reduce((acc, curr) => acc + `${curr.field}: ${curr.status}\n\n`, '');
  }

  #validateNewCard(creditCard) {
    const validators = this.#getCardValidators(creditCard);
    return validators
      .map(v => ({ field: v.key,  status: v.f() }))
      .filter(res => res.status)
      .reduce((acc, curr) => acc + `${curr.field}: ${curr.status}\n\n`, '');
  }

  #getCardValidators({ number, zip, cvv }) {
    return [
      {key: 'cc-num', f: () => !/^(\d{13,16})$/.test(number) ? 'number between 13 and 16 required' : null},
      {key: 'cc-zip', f: () => !/^(\d{5})$/.test(zip) ? '5 digit zip code required' : null},
      {key: 'cc-cvv', f: () => !/^(\d{3})$/.test(cvv) ? '3 digit number required' : null}
    ];
  }

  async clearStorage() {
    try {
      await this.#storage.clear();
      return { message: 'storage cleared', status: 204 };
    } catch(err) {
      return { message: err.message, status: 500 };
    }
  }

  async writeUser(newUser) {
    const errs = this.#validateNewUser(newUser), { emailAddress } = newUser;
    try {
      if (!errs.length) {
        const duplicate = await this.#storage.getItem(emailAddress);
        if (duplicate) {
          return { message: `${emailAddress} already exists...`, status: 409 };
        } else {
          delete newUser.confirmPassword;
          await this.#storage.setItem(emailAddress, JSON.stringify(newUser));
          return { message: `${emailAddress} added!`, status: 201 };
        }
      } else {
        return { message: errs, status: 400 };
      }
    } catch(err) {
      console.log(err);
      return { message: err.message, status: 500 };
    }
  }

  async readUser({ emailAddress, password }) {
    try {
      const data = await this.#storage.getItem(emailAddress), user = JSON.parse(data);
      if (user && user.password === password) {
        return { message: 'login successful!', user, status: 200 };
      } else {
        return { message: 'login failed...', status: 401}
      }
    } catch(err) {
      console.log(err)
      return { message: err.message, status: 500 };
    }
  }

  async updateCreditCard(emailAddress, newCardData) {
    try {
      const errs = this.#validateNewCard(newCardData);
      if (!errs.length) {
        const data = await this.#storage.getItem(emailAddress), user = JSON.parse(data);
        user.creditCard.number = newCardData.number;
        user.creditCard.zip = newCardData.zip;
        user.creditCard.cvv = newCardData.cvv;
        await this.#storage.setItem(emailAddress, JSON.stringify(user));
        return { message: 'card updated!', user, status: 200 };
      } else {
        return { message: errs, status: 400 };
      }
    } catch (err) {
      console.log(err);
      return { message: err.message, status: 500 };
    }
  }

  getSurroundingStores() {
    const stores = [
      {
        name: 'Wegmans',
        dataName: "wegmans",
        latlng: {
          latitude: 42.435840244168105,
          longitude: -76.5107587458254
        },
        pinColor: 'purple'
      },
      {
        name: 'Ithaca Bakery',
        dataName: "ithaca_bakery",
        latlng: {
          latitude: 42.44293212984289,
          longitude: -76.50888635890841
        },
        pinColor: 'purple'
      },
      {
        name: 'Saigon Kitchen',
        dataName: "saigon_kitchen",
        latlng: {
          latitude: 42.43960410828241,
          longitude: -76.50748814842532
        },
        pinColor: 'purple'
      },
    ];
    return stores;
  }

  getStoreData() {
    storeData.stores.forEach(store => 
      store.items.forEach(item => item.quantity = 0)
    );
    return storeData;
  }
}
