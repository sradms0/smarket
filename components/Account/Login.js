import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableHighlight, View } from 'react-native';

export default function Login({ context, navigation }) {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [modalOn, setModalOn] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const onEmailAddressChange = text => setEmailAddress(text);
  const onPasswordChange = text => setPassword(text);

  const login = async () => {
    let res, status;
    try {
      res = await context.actions.login({ emailAddress, password });
      status = res.message;
      if (res.status === 200){
        navigation.navigate("Store Picker");
      }
    } catch(err) {
      status = err.message;
    } finally {
      if (res?.status === 401) {
        setSubmissionMessage(status);
        setModalOn(true);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeader}>SMARKET</Text>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionHeader}>Welcome back!</Text>
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
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={login}
      >
        <Text style={styles.textColor}>Login</Text>
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
    backgroundColor: '#faebd7',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#b22222',
  },
  sectionContainer: {
    flex: 1,
    marginTop: '10%',
    marginBottom: '10%',
    backgroundColor: '#f8f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor:'#BB3333',
    color: '#b22222',
  },
  sectionLabel: {
    margin: 20
  },
  mainHeader: {
    marginTop: '10%',
    fontSize: 30,
    textTransform: 'capitalize',
    backgroundColor:'#f8f8ff',
    color: '#b22222',
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor:'#BB3333',
    borderEndWidth: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    textTransform: 'capitalize',
    color: '#b22222',
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
    borderWidth: 3,
    borderColor: '#f8f8ff',
    color: '#f8f8ff',
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
    color: '#f8f8ff',
  }
});
