/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from './src/views/HomeView';
import SadhanaListView from './src/views/SadhanaListView';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeView} options={{ title: 'Sadhana List App' }} />
        <Stack.Screen name="SadhanaList" component={SadhanaListView} options={{ title: 'Sadhana list' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
