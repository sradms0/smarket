import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [creditCardZipCode, setCreditCardZipCode] = useState('');
  const [creditCardCVV, setCreditCardCVV] = useState('');
  const [modalOn, setModalOn] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const onEmailAddressChange = text => setEmailAddress(text);
  const onPasswordChange = text => setPassword(text);
  const onConfirmPasswordChange = text => setConfirmPassword(text);
  const onCreditCardNumberChange = text => setCreditCardNumber(text);
  const onCreditCardZipCodeChange = text => setCreditCardZipCode(text);
  const onCreditCardCVVChange = text => setCreditCardCVV(text);

  const validators = [
    {key: 'email', f: () => !/\w+@\w+\.\w{2,3}/.test(emailAddress) ? 'valid email required' : null},
    {key: 'password', f: () => password.length < 5 ? 'must be at least 5 characters' : null},
    {key: 'password confirmation', f: () => confirmPassword !== password ? 'passwords do not match' : null},
    {key: 'cc-num', f: () => !/^(\d{13,16})$/.test(creditCardNumber) ? 'number between 13 and 16 required' : null},
    {key: 'cc-zip', f: () => !/^(\d{5})$/.test(creditCardZipCode) ? '5 digit zip code required' : null},
    {key: 'cc-zip', f: () => !/^(\d{3})$/.test(creditCardCVV) ? '3 digit number required' : null}
  ]

  const validate = () => validators.map(v => ({ field: v.key,  status: v.f() })).filter(res => res.status);

  const createAccount = async () => {
    const errs = validate();
    let status;
    if (errs.length) 
      status = errs.reduce((acc, curr) => acc + `${curr.field}: ${curr.status}\n\n`, '');
    else {
      const user = {
        emailAddress, password, 
        creditCard: { number: creditCardNumber, zip: creditCardZipCode, cvv: creditCardCVV }
      };
      status = `account for ${emailAddress} successfully created`;
      try {
        const duplicate = await AsyncStorage.getItem(emailAddress);
        if (duplicate) throw new Error(`${emailAddress} already exists...`);
        await AsyncStorage.setItem(emailAddress, JSON.stringify(user));
      } catch(err) {
        status = err.message;
      }
    }
    setSubmissionMessage(status);
    setModalOn(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeader}>Welcome to Smarket!</Text>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionHeader}>credentials</Text>
        </View>
        <Text style={styles.text}>email address</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => onEmailAddressChange(text)}
          value={emailAddress}
        />
        <Text style={styles.text}>password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => onPasswordChange(text)}
          value={password}
        />
        <Text style={styles.text}>confirm password:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => onConfirmPasswordChange(text)}
          value={confirmPassword}
        />
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionHeader}>payment info</Text>
        </View>
        <Text style={styles.text}>credit-card number</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => onCreditCardNumberChange(text)}
          value={creditCardNumber}
        />
        <Text style={styles.text}>zip code</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => onCreditCardZipCodeChange(text)}
          value={creditCardZipCode}
        />
        <Text style={styles.text}>cvv</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => onCreditCardCVVChange(text)}
          value={creditCardCVV}
        />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={createAccount}
      >
        <Text>Register</Text>
      </TouchableOpacity>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOn}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{submissionMessage}
            </Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => setModalOn(false)}
            >
              <Text style={styles.modalTextStyle}>Return</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    flex: 1,
    marginTop: '10%',
    marginBottom: '10%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: {
    margin: 20
  },
  mainHeader: {
    marginTop: '5%',
    fontSize: 30,
    textTransform: 'capitalize',
  },
  sectionHeader: {
    fontSize: 20,
    textTransform: 'capitalize',
  },
  text: {
    textTransform: 'capitalize',
  },
  textInput: {
    width: 150,
    height: 40,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    borderRadius:20
  },
  button: {
    width:200,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    backgroundColor:'#a6d1ae',
    padding: 10
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  modalTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});
