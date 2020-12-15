import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, ScrollView, View, Button, Alert, TouchableOpacity, FlatList, TextInput, Modal, TouchableHighlight } from 'react-native';

export default function Wallet({ context }) {
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [creditCardZipCode, setCreditCardZipCode] = useState('');
    const [creditCardCVV, setCreditCardCVV] = useState('');
    const [modalOn, setModalOn] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');

    const onCreditCardNumberChange = text => setCreditCardNumber(text);
    const onCreditCardZipCodeChange = text => setCreditCardZipCode(text);
    const onCreditCardCVVChange = text => setCreditCardCVV(text);

    const change = async () =>{
      let status;
      try {
        const res = await context.actions.updateCreditCard(
          context.authenticatedUser.emailAddress, {
            number: creditCardNumber,
            zip: creditCardZipCode,
            cvv: creditCardCVV,
          }
        );
        status = res.message;
      } catch(err) {
        status = err.message;
        
      } 
      setSubmissionMessage(status);
      setModalOn(true);
    }

    return(
        <View style={styles.container}>
            <Text style={{fontSize: 32, color: '#b22222'}}>Account</Text>
    <Text>{'\n\n'}</Text>
    <Text>------</Text>
            <Text style={{color: '#b22222'}}>Current Credit Card Number</Text>
            <Text style={{color: '#b22222'}}>{`Number: ${context.authenticatedUser.creditCard.number}`}</Text>
            <Text style={{color: '#b22222'}}>{`Zip: ${context.authenticatedUser.creditCard.zip}`}</Text>
            <Text style={{color: '#b22222'}}>{`CVV: ${context.authenticatedUser.creditCard.cvv}`}</Text>
            <Text>------</Text>
            <Text>{'\n\n'}</Text>
            <Text style={{color: '#b22222'}}>Change Payment Information</Text>
            <Text style={styles.text}>Credit-Card Number</Text>
            <TextInput
            style={styles.textInput}
            onChangeText={text => onCreditCardNumberChange(text)}
            defaultValue={creditCardNumber}
            />
            <Text style={styles.text}>Zip Code</Text>
            <TextInput
            style={styles.textInput}
            onChangeText={text => onCreditCardZipCodeChange(text)}
            value={creditCardZipCode}
            />
            <Text style={styles.text}>CVV</Text>
            <TextInput
            style={styles.textInput}
            onChangeText={text => onCreditCardCVVChange(text)}
            value={creditCardCVV}
            />
            <Text>{'\n'}</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={change}>
                <Text style={{color: '#f8f8ff', borderColor: '#f8f8ff'}}> Submit Changes</Text>
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
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
    borderColor:'#BB3333',
    color: '#b22222',
    },
    row: {
      fontSize: 24, 
      padding: 30, 
      borderWidth: 1,
      borderColor: "#DDDDDD",
     backgroundColor: '#BB3333',
     alignItems: 'center',
     justifyContent: 'center',
  },
  
    item: {
      backgroundColor:'#a6d1ae',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
  
    title: {
      fontSize: 32,
    },
    text: {
        textTransform: 'capitalize',
        color: '#b22222',
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
        backgroundColor:'#b22222',
        padding: 10,
        color: '#f8f8ff',
        borderWidth: 5,
        
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
      },
      textColor: {
        backgroundColor: '#b22222',
        color: '#f8f8ff',
        fontSize: 32,
        borderColor: '#f8f8ff',
        borderWidth: 5,
      }
  });
