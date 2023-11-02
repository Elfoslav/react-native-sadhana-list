import firestore from '@react-native-firebase/firestore';
import User from '../models/User';
import { dateReviver } from '../lib/functions';

class UserFirestore {
  private db;

  constructor() {
    this.db = firestore();
  }

  async createUser(newUser: User) {
    try {
      const userDoc = await this.db.collection('users').doc(newUser.username).get();
      console.log('firestore userDoc.exists', userDoc.exists);
      if (!userDoc.exists) {
        await this.saveUser(newUser);
        return newUser;
      }
    } catch (error) {
      throw error;
    }
  }

  // Method to read user data
  async getUser(username: string) {
    try {
      const userDoc = await this.db.collection('users').doc(username).get();
      if (userDoc.exists) {
        const user = userDoc.data();
        console.log('getUser: ', user);

        if (user && user.sadhanaData) {
          user.sadhanaData = JSON.parse(user.sadhanaData, dateReviver);
        }

        console.log('getUser parsed: ', user);

        return user;
      } else {
        console.log('user does not exist', username);
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  // Method to write user data
  async saveUser(user: User) {
    try {
      await this.db.collection('users').doc(user.username).set({
        username: user.username,
        sadhanaData: JSON.stringify(user.sadhanaData)
      });
    } catch (error) {
      console.log('saveUser error', error);
      throw error;
    }
  }
}

export default UserFirestore;