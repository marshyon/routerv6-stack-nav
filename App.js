import React, { useState, useCallback } from 'react'

// import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as Font from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
// import * as Svg from 'react-native-svg';
import Svg, { Circle, Rect } from 'react-native-svg';


const Stack = createNativeStackNavigator();


function SvgComponent(props) {
  return (
    <Svg height="50%" width="50%" viewBox="0 0 100 100" {...props}>
      <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
      <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="yellow" />
    </Svg>
  );
}



function HomeScreen() {

  const navigation = useNavigation();
  // const { navigation, params}  = useNavigation();

  // console.log('params: ', params ? params : 'no params')  // params:  undefined


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Ionicons name="md-checkmark-circle" size={32} color="green" />

      <TouchableOpacity
        onPress={() => navigation.navigate('Stack-App', { screen: 'Stack-Main' })}
      >
        <Text>Go To Main</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Stack-App', { screen: 'Stack-App-Details', user: 'jane', itemID: 86  })}
      >
        <Text>Go To Details ...</Text>
      </TouchableOpacity>



    </View>
  );
}

function DetailsScreen({route, navigation}) {

  // const navigation = useNavigation();jj
  console.log('route params: ', route.params ? route.params : 'no params')  // params:  undefined
  const myObject = {
    user: 'jon',
    itemID: 86
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>

      <TouchableOpacity
        // onPress={() => props.navigation.navigate('Stack-App', { screen: 'Stack-App-Details' })}
        // onPress={() => props.navigation.navigate('Stack-App', { screen: 'Stack-App-Details', user: 'jane', itemID: 86  })}
        onPress={() => {
          // console.log('props: ', props)
          // props.navigation.push('Stack-App', { screen: 'Stack-App-Details', params: {user: 'jon', itemID: 86 }  })
          navigation.push('Stack-App-Details', myObject)
        }}
      >
        <Text>More Details ...</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('home-screen')
        }}
      >
        <Text>HOME!</Text>
      </TouchableOpacity>






    </View>
  );
}

function StackMainScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Stack-Main" component={Main} options={{ headerShown: true }} />
      <Stack.Screen name="Stack-App-Details" component={DetailsScreen} />
    </Stack.Navigator>
  )
}

export default function App({ navigation }) {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home-screen" component={HomeScreen} />
        <Stack.Screen name="Stack-App" component={StackMainScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

const Main = ({ navigation }) => {


  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      console.log('fonts loaded ok now ...')
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    console.log('fonts not loaded yet ...')
    return null;
  }

  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //     <Stack.Screen name="Details" component={DetailsScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
      }}>
      <View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#20315f',
            fontFamily: 'Inter-Black',
            marginTop: 20
          }}>
          Welcome to RNApp
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <SvgComponent width={100} height={100} style={{ transform: [{ rotate: '-25deg' }] }} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Stack-App-Details')}
        style={{
          backgroundColor: '#AD40AF',
          padding: 20,
          width: '90%',
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 50
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 22,
            color: 'white'
          }}>Stack-App-Details...</Text>
        <Ionicons name="md-checkmark-circle" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
