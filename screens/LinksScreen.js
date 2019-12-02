import React, { Component, useState } from "react";
import MapView from "react-native-maps";
import FilterTimePeriod from '/Users/cmorales/Desktop/cs441_mobile/kdh/components/home/FilterEventTimePeriod.js';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Modal from "react-native-modal";
import { AppRegistry, StyleSheet, Text, View, ScrollView, Animated, Image, Dimensions, TouchableOpacity, SafeAreaView, Switch,
}
    from "react-native";
import {Button} from "react-native-ui-kitten";
//images for event cards
const Images = [
    { uri: "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F1106530967%2F960x0.jpg%3Ffit%3Dscale" },
    { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9XVE39MLzxFLA69tNEmFYoRgxcTqJyCaDXd58SwOFu2PW6F2xwA&s" },
    { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw6hDm_GurPUw777RQtDCfXLY35YG2GCG8pVy1PIKzuBtUr0yfEA&s" },
    { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6LiP5nBL8u-4nwiCRVhPr0U4BCgP6BOIB0BUVnUjSOrqDd6gR8A&s" }
]
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT * 1.75;
let deviceWidth = Dimensions.get('window').width;
//const [MapEventModalVisible, setMapEventModalVisible] = useState(true);

function getEventInfo() {
    console.log("pressed button successfully");
    setMapEventModalVisible(true);
    //console.log(marker.description);
    //pull up modal and update with event info from server
}
export default class screens extends Component {

    //Initial state false for the toggle satellite switch.
    state = { switchValue: false };
    switchMapType = () => {
        console.log('changing');
        this.setState({mapType: this.state.mapType === 'satellite' ? 'standard' : 'satellite' });
    };

    //toggle satellite or standard view switch
    //onValueChange of the switch this function will be called
    //state changes according to switch which will result in re-render the text
    toggleSwitch = value => {
        this.setState({ switchValue: value });
        this.switchMapType();
    };

    //These are hardcoded and instead the values need to be updated from server every time new
    //event is created and then removed when a particular event is deleted or has passed
    state = {
        location: {},
        errorMessage: "",
        mapType: "standard",
        markers: [
            {
                coordinate: {
                    latitude: 33.130650,
                    longitude: -117.157923,
                },
                title: "CS441 Group Session",
                description: "Work on final project!",
                image: Images[0],
            },
            {
                coordinate: {
                    latitude: 33.127199,
                    longitude: -117.157948,
                },
                title: "CS351 Final Review",
                description: "study for programming languages final",
                image: Images[1],
            },
            {
                coordinate: {
                    latitude: 33.127977,
                    longitude: -117.158462,
                },
                title: "Academic Hall Event...",
                description: "etc...",
                image: Images[2],
            },
            {
                coordinate: {
                    latitude: 33.128656,
                    longitude: -117.158612,
                },
                title: "University Hall Event...",
                description: "etc..",
                image: Images[3],
            },
        ],
        region: {
            latitude: 33.128331,
            longitude:-117.159256,
            latitudeDelta: 0.0055,
            longitudeDelta: 0.0055,
        },
    };

    //handle location services to show user location
    //and request location permissions
    _getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });

            let location = await Location.getCurrentPositionAsync();
            this.setState({ location });
        }
    }

    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
        this._getLocationAsync();
    }

    componentDidMount() {


        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here
        this.animation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= this.state.markers.length) {
                index = this.state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            //Re focus view to current event marker
            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const { coordinate } = this.state.markers[index];
                    this.map.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: this.state.region.latitudeDelta,
                            longitudeDelta: this.state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });
    }

    render() {

        const interpolations = this.state.markers.map((marker, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });

            return { scale, opacity };
        });

        return (
            <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 26, marginLeft: 20, marginBottom: 10, fontWeight: "700"}}>Event Locator</Text>
        <FilterTimePeriod/>
        <View style={styles.container}>
            <MapView
        ref={map => this.map = map}
        initialRegion={this.state.region}
        mapType= {this.state.mapType}
        showsUserLocation={true}
        style={styles.container}
            >
            {this.state.markers.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    const opacityStyle = {
                        opacity: interpolations[index].opacity,
                    };
                    return (
                        <MapView.Marker key={index} coordinate={marker.coordinate}>
                        <Animated.View style={[styles.markerWrap, opacityStyle]}>
                <Animated.View style={[styles.ring, scaleStyle]} />
                    <View style={styles.marker} />
                    </Animated.View>
                    </MapView.Marker>
                );
                })}
            </MapView>
            <Animated.ScrollView horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={true}
        snapToInterval={CARD_WIDTH}
        onScroll={Animated.event(
                [
                    {
                        nativeEvent: {
                            contentOffset: {
                                x: this.animation,
                            },
                        },
                    },
                ],
                { useNativeDriver: true }
            )}
        style={styles.scrollView}
        contentContainerStyle={styles.endPadding}
            >
            {this.state.markers.map((marker, index) => (
                    <TouchableOpacity style={styles.card} key={index}>
                <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
                />
                <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
        <Button style={styles.buttonInfo} color= "cyan" size= "small" onPress={() => {getEventInfo()}}>Info</Button>
        </View>
        </TouchableOpacity>
    ))}
    </Animated.ScrollView>
        </View>
        <View style={styles.toggleContainer}>
            <Switch
        style={{ marginTop: 40 }}
        onValueChange={this.toggleSwitch}
        value={this.state.switchValue}
        />
        <Text>{this.state.switchValue ? 'Satellite' : 'Satellite'}</Text>
        </View>
        </SafeAreaView>
    );
    }
}

screens.navigationOptions = {
    header: null,
};
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        justifyContent: 'space-between',
    },
    scrollView: {
        position: "absolute",
        bottom: 1,
        left: 0,
        right: 0,
        paddingVertical: 5,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH*2.5,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 3,
        marginBottom: 3,
        fontWeight: "bold",
        alignSelf: "center",
    },
    cardDescription: {
        fontSize: 12,
        backgroundColor: "cyan",
    },
    buttonInfo:{
        marginTop: 0,
        height: 5,
        width: "100%",
        alignSelf: "center",
        backgroundColor: "#00bfff",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "white",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "cyan",
    },
    toggleContainer: {
        paddingLeft: 350,
        height: 30,
        position:'absolute'
    },
});


