/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import codePush from 'react-native-code-push';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from './src/views/HomeView';
import SadhanaListView from './src/views/SadhanaListView';

// If you want your app to discover updates more quickly, you can also choose to sync up with the CodePush server
// every time the app resumes from the background.
const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

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

export default codePush(codePushOptions)(App);
