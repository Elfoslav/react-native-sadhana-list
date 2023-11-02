import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../models/User';
import { dateReviver } from '../lib/functions';

const USER = 'user';

class UserAsyncStore {

  async createUser(newUser: User) {
    try {
      const existingUser = await AsyncStorage.getItem(USER);
      if (!existingUser) {
        await AsyncStorage.setItem(USER, JSON.stringify(newUser));
        return newUser;
      }

      return null;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // Method to read user data
  async getUser(): Promise<User | null> {
    try {
      const user = await AsyncStorage.getItem(USER);
      if (user !== null) {
        return JSON.parse(user, dateReviver);
      }

      console.log('user not found');
      return null;
    } catch (e) {
      console.log(e)
      throw e;
    }
  }

  // Method to write user data
  async saveUser(user: User) {
    try {
      await AsyncStorage.setItem(USER, JSON.stringify(user))
    } catch (error) {
      console.log('saveUser error', error);
      throw error;
    }
  }
}

export default UserAsyncStore;