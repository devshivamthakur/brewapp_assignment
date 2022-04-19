import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homescreen from './Component/Homescreen';
import Detailsscreen from './Component/Detailsscreen';
import Topratedscreen from './Component/Topratedscreen';
import Ionicons from "react-native-vector-icons/Ionicons";
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const App = () => {

  const Tab_navigation = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#000",
          tabBarActiveBackgroundColor: "#f0b85d",
          tabBarInactiveBackgroundColor: "#f0b85d"
        }}

      >
        <Tab.Screen name="Home" component={Homescreen}

          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                focused ? <Image
                  source={require('./assests/Images/moviefocus.png')}
                  style={styles.icon}
                /> : <Image
                  source={require('./assests/Images/movie_unfocus.png')}
                  style={styles.icon}
                />
              )
            },
            tabBarLabel: "Now Playing",
            headerShown: false

          }}
        />
        <Tab.Screen name="toprated" component={Topratedscreen}

          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons name='star-outline' color={focused ? "#000" : '#988F94'} size={size} />

              )
            },
            tabBarLabel: "Top Rated",
            headerShown: false

          }}

        />

      </Tab.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator 
      // initialRouteName='Details'
      >
        <Stack.Screen name="tab-nav" component={Tab_navigation}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="Details" component={Detailsscreen}
         options={{
          headerShown: false
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  }

})