import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    FlatList,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default class App extends React.Component {

    render() {
        return (
            <MapView
        style={styles.mapStyle}
        initialRegion={{
            latitude: 33.128331,
                longitude:-117.159256,
                latitudeDelta: 0.0055,
                longitudeDelta: 0.0055,
        }}
    >
    <MapView.Marker
        coordinate={{latitude: 33.130650,
            longitude: -117.157923,}}
        title={"CS 441 Study Group"}
        description={"Finals"}
        />
        </MapView>
    );
    }
}
const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: 800,

    },

});

