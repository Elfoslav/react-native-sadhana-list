import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  useColorScheme,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { RootStackParamList } from '../lib/types';
import commonStyles from '../styles/commonStyles';
import UsersService from '../services/UsersService';
import User from '../models/User';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

function HomeView({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const usersService = new UsersService();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState(user ? user.username : '');
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onChangeUsername = (username: string) => {
    setUsername(username);
  }

  const goToSadhanaList = () => {
    if (!username) {
      Alert.alert('Fill in username!', 'Please enter your username before proceeding.');
      return;
    }

    // create user
    usersService.createUser({
      username,
      sadhanaData: [],
    });

    navigation.navigate('SadhanaList');
  }

  useEffect(() => {
    const getUser = async () => {
      const foundUser = await usersService.getUser();
      if (foundUser) {
        setUser(foundUser);
        setUsername(foundUser.username);
      }
    }

    getUser();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={commonStyles.container}>
          <Image style={styles.logo} source={require('../assets/images/iskcon-logo.png')} />
          <TextInput
            style={commonStyles.textInput}
            value={username}
            placeholder="Your name"
            autoCorrect={false}
            onChangeText={onChangeUsername}
          />

          <TouchableOpacity
            activeOpacity={0.85}
            style={commonStyles.touchableBtnLg}
            onPress={goToSadhanaList}
          >
            <Text style={commonStyles.touchableBtnText}>Show Sadhana List</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerText: {
    textAlign: 'center',
    fontSize: 18,
  },
  logo: {
    width: '100%', // Set the width to 100%
    height: 220, // Set the height (adjust as needed)
  },
});

export default HomeView;