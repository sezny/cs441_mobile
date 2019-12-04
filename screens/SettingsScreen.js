import React, {useState} from 'react';
import { ExpoConfigView } from '@expo/samples';
import {SafeAreaView, ImageBackground, Text, Dimensions, View, TouchableOpacity, ScrollView, Picker, Modal, StyleSheet, FlatList, ActiviityIndicator} from 'react-native';
import { Input, Button } from 'react-native-ui-kitten';
import WeekView from 'react-native-week-view';
import {Overlay } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import DatePicker from 'react-native-datepicker';


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function SettingsScreen() {


    const[username, getUsername, setUsername] = useState('Cnixon12');
    const[name] = useState('Curtis Nixon');
    const[email] = useState('CN@gmail.com');
    const[major] = useState('CS');
    const[school] = useState('San Marcos');
    const[startDate, setStartDate] = useState('10-21-2019');
    const[endDate, setEndDate] = useState('');
    const[eventDesc, setDesc] = useState('');
    const[eventName, setEventName] = useState('');



    function createEvent(){
        console.log("Hello")
    }


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
            <View style={styles.scheduleDisplay}>
                <WeekView onEventPress={createEvent} selectedDate={new Date()} numberOfDays={3} headerStyle={styles.headerStyle} locale='fr'>
                </WeekView>
            </View>
            <View style = {styles.addEventView}>
                <Text style={styles.addEventText}>Add Event to Schedule</Text>
                <DatePicker customStyles={{
                    datePicker: { backgroundColor: '#222'  },
                    datePickerCon: { backgroundColor: '#333' },
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    },
                    dateText: {
                        color: 'black'
                    },
                    // ... You can check the source to find the other keys.
                }} date={startDate} mode='date' placeholder='select date' format="MM-DD-YYYY" minDate="05-01-2016" maxDate="05-01-2020" onDateChange={date=>setStartDate(date)} confirmBtnText ='Confirm' cancelBtnText='Cancel'/>
                <DatePicker style={styles.datePicker} date={new Date()} mode='date' placeholder='select date' format="MM-DD-YYYY" minDate='09-30-2019' maxDate="12-31-2020" onDateChange={date=>setEndDate(date)} confirmBtnText ='Confirm' cancelBtnText='Cancel' />
                <Input placeholder="Add event description here" value={eventDesc} onChangeText = {text => setDesc(text)}/>
                <Button style={{marginTop:30}} size="large" onPress={() => createEvent()}>Add Event</Button>
            </View>
            <View>
                <Button style={{marginTop: 30}} status="danger" size= "large" onPres={() => updatePersonalInfo()} >Update Personal Info</Button>
            </View>
        </ScrollView>
    );
}

SettingsScreen.navigationOptions = {
    title: 'Profile',

};
const styles = StyleSheet.create({
    datePicker:{
        flex: 1,
        width: 200
    },
    addEventView:{
        borderColor: "red",
        borderRadius: 4,
        borderWidth: 1,
        marginTop: 30
    },
    addEventText:{
        textAlign: 'center',
        fontSize: 20
    },
    headerStyle:{
        backgroundColor: '#4286f4'
    },
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
        height: 500,
        marginTop: 30
    }
});