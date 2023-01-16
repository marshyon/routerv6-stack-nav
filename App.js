import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Ionicons from '@expo/vector-icons/Ionicons';
import Svg, { Circle, Rect } from 'react-native-svg';
import { v4 as uuidv4 } from 'uuid';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();



function SvgComponent(props) {
  return (
    <Svg height="50%" width="50%" viewBox="0 0 100 100" {...props}>
      <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
      <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="yellow" />
    </Svg>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function HomeScreen() {

  const navigation = useNavigation();

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
        onPress={() => navigation.navigate('Stack-App', { screen: 'Stack-App-Details', user: 'jane', itemID: 86 })}
      >
        <Text>Go To Details ...</Text>
      </TouchableOpacity>



    </View>
  );
}

function DetailsScreen({ route, navigation }) {

  const myObject = {
    user: 'jon',
    itemID: uuidv4()
  }

  const [appParams, setAppParams] = useState({})
  useEffect(() => {
    setAppParams(route.params)
  }, [appParams, route.params]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>

      <TouchableOpacity
        onPress={() => {
          navigation.push('Stack-App-Details', myObject)
        }}
      >
        <Text>More Details ...</Text>
      </TouchableOpacity>

      {appParams && (<Text>itemID : {appParams?.itemID}</Text>)}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Stack-Main')
        }}
      ><Text>
          Go to bottom of stack
        </Text>
      </TouchableOpacity>

    </View >





  );
}

function StackMainScreen() {
  return (
    <Stack.Navigator options={{ headerShown: false }}>
      <Stack.Screen name="Stack-Main" component={Main} options={{ headerShown: false }} />
      <Stack.Screen name="Stack-App-Details" component={DetailsScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  )
}

function TabMainScreen() {
  return (


    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Stack-App') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Stack-App" component={StackMainScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

export default function App({ navigation }) {

  return (
    <NavigationContainer>
      {/* <TabMainScreen /> */}

      <Drawer.Navigator initialRouteName="Home"
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}      
      >
        <Drawer.Screen name="Home Drawer" component={TabMainScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>


    </NavigationContainer>
  )
}

const Main = ({ navigation }) => {



  return (
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
