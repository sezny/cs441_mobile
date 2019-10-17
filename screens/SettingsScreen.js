import React, {useState} from 'react';
import { ExpoConfigView } from '@expo/samples';
import { SafeAreaView, ImageBackground, Text, Dimensions, View, TouchableOpacity, ScrollView, Picker, Modal, StyleSheet, FlatList, ActiviityIndicator} from 'react-native';
import { Input, Button } from 'react-native-ui-kitten';
import WeekView from 'react-native-week-view';
import * as SecureStore from 'expo-secure-store';


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function SettingsScreen() {


   const[username, getUsername, setUsername] = useState('Cnixon12');
   const[name] = useState('Curtis Nixon');
   const[email] = useState('CN@gmail.com');
   const[major] = useState('CS');
   const[school] = useState('San Marcos'); 
   

   
   /*getInfo(){
       //Get info from Server(Name, Email, School, Major, and Schedule)
       //go to https://facebook.github.io/react-native/docs/network for example
   }*/


  return (
  <ScrollView>
    <View style = {styles.row}>
            <Text style = {styles.item}>Username</Text>
            <Text style = {styles.info}>{username}</Text>
    </View>
    <View style = {styles.row}>
            <Text style = {styles.item}>Name</Text>
            <Text style = {styles.info}>{name}</Text>
    </View>
    <View style = {styles.row}>
            <Text style = {styles.item}>Email</Text>
            <Text style = {styles.info}>{email}</Text>
    </View>
    <View style = {styles.row}>
            <Text style = {styles.item}>Major</Text>
            <Text style = {styles.info}>{major}</Text>
    </View>
    <View style = {styles.row}>
            <Text style = {styles.item}>School</Text>
            <Text style = {styles.info}>{school}</Text>
    </View>
    <View style = {styles.scheduleDisplay}>
        <WeekView selectedDate={new Date()} numberOfDays={7}>
        </WeekView>    
    </View>
    <View>
        <Button style={{marginTop: 30}} color= "#0000ff" status="danger" size= "large" onPres={() => updatePersonalInfo()}>Update Personal Info</Button>
    </View>
  </ScrollView>
  );
}

SettingsScreen.navigationOptions = {
  title: 'Profile',

};
const styles = StyleSheet.create({
    row:{
        flex:1, 
        flexDirection: 'row',
        borderColor: '#000000',
        borderRadius:4,
        borderWidth: 1,
        marginTop:30
    },
    item:{
        textAlign: 'center',
        flex:1,
        fontSize: 30
    },
    info:{
        textAlign: 'center',
        flex:1,
        fontSize: 10, 
        marginTop: 10
    },
    scheduleDisplay:{
        borderColor: "red",
        borderRadius:4,
        borderWidth: 1, 
        height: 300, 
        marginTop: 30
    }
    });