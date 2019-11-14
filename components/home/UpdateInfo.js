import Modal from "react-native-modal";
import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Picker} from 'react-native';
import {Button, Input} from 'react-native-ui-kitten';

import {MaterialIcons} from '@expo/vector-icons';

const {height, width} = Dimensions.get('window');

export default function UpdateInfo({visible, setUpdateInfoModalVisible, name, email, major, school, username, setUsername, setName, setEmail, setMajor, setSchool}){

  function saveChanges(){

    //connect to server and change users information
    setUpdateInfoModalVisible(false);
  }

  return(
    <Modal
          onSwipeComplete={() => setUpdateInfoModalVisible(false)}
          swipeDirection="down"
          isVisible={visible}>
          <View style={styles.modalContainer}>
            <View>
              <TouchableOpacity onPress={() =>{setUpdateInfoModalVisible(false)}}>
                <MaterialIcons style={{marginRight:15}} name="clear" size={30} color="#274BDB"/>
              </TouchableOpacity>
              <Input placeholder={username} value={username} onChangeText={text => setUsername(text)}/>
              <Input style={{marginTop: 20}} placeholder={name} value={name} onChangeText={text => setName(text)}/>
              <Input style={{marginTop: 20}} placeholder={email} value={email} onChangeText={text => setEmail(text)}/>
              <View style={{alignItems:'center'}}>
                  <Text style = {{
                          marginTop:20,
                          fontSize: 20,
                          color: 'black'

                      }
                  }>Select School Below</Text>

              </View>
              <Picker     style={{height:80}}
                              itemStyle={{height:80}}
                              selectedValue = {school}
                              onValueChange={(itemValue, itemIndex) => setSchool(itemValue)}
                              >
                  <Picker.Item label = "CalState San Marcos" value = "San Marcos" />
                  <Picker.Item label = "San Diego Sate University" value = "SD State" />
                  <Picker.Item label = "University of San Diego" value = "USD" />
                  <Picker.Item label = "University of California San Diego" value= "UCSD" />
              </Picker>
              <View style={{alignItems:'center'}}>
                  <Text style = {{
                          marginTop:20,
                          fontSize: 20,
                          color: 'black'

                      }
                  }>Select Major Below</Text>
              </View>
              <Picker     style={{height:80}}
                              itemStyle={{height:80}}
                              selectedValue = {major}
                              onValueChange={(itemValue, itemIndex) => setMajor(itemValue)}
                              >
                  <Picker.Item label = "Computer Science" value = "Computer Science" />
                  <Picker.Item label = "Nursing" value = "Nursing" />
                  <Picker.Item label = "Business" value = "Business" />
                  <Picker.Item label = "Computer Information Systems" value= "CIS" />
              </Picker>
              <Button
                  style={{marginTop:30}}
                  status='danger'
                  size = 'large'
                  onPress={() => saveChanges()}>Save Changes</Button>
          </View>
        </View>
    </Modal>

  )
};
const styles = StyleSheet.create({
  modalContainer:{
    flex: 1,
    backgroundColor: 'white',
    width: width,
    marginLeft: -20,
    marginBottom: -20,
    marginTop: 80,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  }
});
