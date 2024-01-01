import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import UsersService from '../services/UsersService';
import SadhanaData from '../models/SadhanaData';
import User from '../models/User';
import SadhanaManager from '../lib/SadhanaManager';
import { Button, Icon } from '@rneui/themed';
import SadhanaModal from '../components/SadhanaModal';
import commonStyles from '../styles/commonStyles';

const SadhanaListView: React.FC = () => {
  const usersService = new UsersService();
  const sadhanaManager = new SadhanaManager();
  const initialDate = new Date();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(initialDate);
  // current shown sadhana list
  const [sadhanaList, setSadhanaList] = useState<SadhanaData[]>([]);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  let mangalaSum = 0;
  let guruPujaSum = 0;
  let gauraAratiSum = 0;
  let japaSum = 0;

  async function generateSadhanaList(date: Date): Promise<SadhanaData[]> {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const numberOfDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const user = await usersService.getUser() as User;

    return Array.from({ length: numberOfDaysInMonth }, (_, i) => i + 1).map((day) => {
      // Create a Date object for the current day in the loop
      const currentDate = new Date(currentYear, currentMonth, day);

      // Find the matching sadhanaItem in user.sadhanaData based on day, month, and year
      const sadhanaItem = sadhanaManager.findSadhanaItemByDate(user.sadhanaData, currentDate);

      return {
        date: currentDate,
        mangala: sadhanaItem ? sadhanaItem.mangala : false,
        guruPuja: sadhanaItem ? sadhanaItem.guruPuja : false,
        gauraArati: sadhanaItem ? sadhanaItem.gauraArati : false,
        japaRounds: sadhanaItem ? sadhanaItem.japaRounds : 0,
        reading: sadhanaItem ? sadhanaItem.reading : 0,
        note: sadhanaItem ? sadhanaItem.note : '',
      };
    });
  }

  // Function to handle switching to the previous month
  const switchToPreviousMonth = () => {
    const previousMonth = new Date(currentDate);
    previousMonth.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(previousMonth);
  };

  // Function to handle switching to the next month
  const switchToNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const updateSadhanaList = async (sadhanaData: SadhanaData[]) => {
    setSadhanaList(sadhanaData);

    if (user) {
      const mergedSadhanaData = sadhanaManager.mergeSadhanaList(sadhanaData, user);
      const updatedUser = {
        ...user,
        sadhanaData: mergedSadhanaData,
      };

      setUser(updatedUser);
      usersService.saveUser(updatedUser);
    }
  };

  const handleCheckboxChange = (index: number, propertyName: string) => {
    const updatedSadhanaList = [...sadhanaList];
    updatedSadhanaList[index][propertyName] = !updatedSadhanaList[index][propertyName];
    updateSadhanaList(updatedSadhanaList);
  };

  const handleJapaRoundsChange = (index: number, value: string) => {
    const updatedSadhanaList = [...sadhanaList];
    if (value) {
      updatedSadhanaList[index].japaRounds = parseInt(value, 10);
      updateSadhanaList(updatedSadhanaList);
    } else {
      updatedSadhanaList[index].japaRounds = null;
      updateSadhanaList(updatedSadhanaList);
    }
  };

  const openEditModal = (index: number) => {
    setEditingIndex(index);
    setEditModalVisible(true);
  };

  const confirmEditModal = (sadhanaData: SadhanaData) => {
    const updatedSadhanaList = [...sadhanaList];
    // Update sadhana data on given index
    updatedSadhanaList[editingIndex] = sadhanaData;
    updateSadhanaList(updatedSadhanaList);
    closeEditModal();
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const formatDate = (date: Date) => {
    return `${date.getDate()}.${date.getMonth() + 1}`;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate()
      && date1.getMonth() === date2.getMonth();
  };

  const shortenString = (text: string, num: number) => {
    const shortenedText = text.slice(0, num);

    if (text.length > num) {
      return `${shortenedText}...`;
    }

    return shortenedText;
  };

  const getAbbreviatedDayName = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
    const dayName = date.toLocaleDateString('en-US', options);
    return dayName.slice(0, 3);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const sadhanaData = await generateSadhanaList(currentDate);
      setSadhanaList(sadhanaData);
      setIsLoading(false);
    };

    fetchData();
  }, [currentDate]);

  useEffect(() => {
    const getUser = async () => {
      const foundUser = await usersService.getUser();
      if (foundUser) {
        setUser(foundUser);
      }
    }

    getUser();
  }, []);

  // Render the table as a vertical list
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.table}>
          {/* Month navigation buttons */}
          <View style={styles.monthNav}>
            <Text style={styles.navIcon} onPress={switchToPreviousMonth}>&#8249;</Text>
            <Text style={styles.currentMonth}>
              {currentDate.toLocaleString('default', { month: 'long' })}{' '}
              {currentDate.getFullYear()}
            </Text>
            <Text style={styles.navIcon} onPress={switchToNextMonth}>&#8250;</Text>
          </View>

          {/* Header row */}
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Date</Text>
            <Text style={styles.headerText}>Mangala</Text>
            <Text style={styles.headerText}>Guru Puja</Text>
            <Text style={styles.headerText}>Gaura</Text>
            <Text style={styles.headerText}>Japa</Text>
            <Text style={styles.headerText}>Note</Text>
          </View>

          {isLoading && sadhanaList.length === 0 && (
            <ActivityIndicator
              style={styles.activityIndicator}
              animating={isLoading}
              size="large"
              color="#008800"
            />
          )}

          {/* List of days */}
          {sadhanaList.map((sadhana, index) => {
            const isToday = isSameDay(sadhana.date, new Date());
            mangalaSum += sadhana.mangala ? 1 : 0;
            guruPujaSum += sadhana.guruPuja ? 1 : 0;
            gauraAratiSum += sadhana.gauraArati ? 1 : 0;
            japaSum += sadhana.japaRounds ? sadhana.japaRounds : 0;

            return (
              <View
                key={index}
                style={[styles.row, isToday ? styles.activeRow : null]}
              >
                <View
                  style={styles.flexRow}
                >
                  <Text style={styles.dayText}>
                    {getAbbreviatedDayName(sadhana.date)}
                    {'\n'}
                    {formatDate(sadhana.date)}
                  </Text>
                  <View style={styles.mangalaCheckboxContainer}>
                    <CheckBox
                      value={sadhana.mangala}
                      onValueChange={() => handleCheckboxChange(index, 'mangala')}
                    />
                  </View>
                  <View style={styles.guruPujaCheckboxContainer}>
                    <CheckBox
                      value={sadhana.guruPuja}
                      onValueChange={() => handleCheckboxChange(index, 'guruPuja')}
                    />
                  </View>
                  <View style={styles.gauraAratiCheckboxContainer}>
                    <CheckBox
                      value={sadhana.gauraArati}
                      onValueChange={() => handleCheckboxChange(index, 'gauraArati')}
                    />
                  </View>
                  <TextInput
                    style={commonStyles.numericInput}
                    keyboardType="numeric"
                    placeholder="0"
                    value={sadhana.japaRounds ? sadhana.japaRounds.toString() : ''}
                    onChangeText={(value) => handleJapaRoundsChange(index, value)}
                  />
                  <Button size="sm" type="clear" onPress={() => openEditModal(index)}>
                    <Icon name="edit" color="gray" />
                  </Button>
                </View>

                {sadhana.note && (
                  <View style={styles.note}>
                    <Text>{shortenString(sadhana.note, 50)}</Text>
                  </View>
                )}
              </View>
            )
          })}

          <View
            style={styles.row}
          >
            <View
              style={styles.flexRow}
            >
              <Text style={styles.dayText}>
                Sum:
              </Text>
              <View style={styles.mangalaSumContainer}>
                <Text>{mangalaSum}/{sadhanaList.length}</Text>
              </View>
              <View style={styles.guruPujaSumContainer}>
                <Text>{guruPujaSum}/{sadhanaList.length}</Text>
              </View>
              <View style={styles.gauraAratiSumContainer}>
                <Text>{gauraAratiSum}/{sadhanaList.length}</Text>
              </View>
              <View style={styles.japaSumContainer}>
                <Text>{japaSum}/{sadhanaList.length * 16}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <SadhanaModal
        isVisible={isEditModalVisible}
        sadhanaData={sadhanaList[editingIndex]}
        confirmModal={confirmEditModal}
        closeModal={closeEditModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  table: {
    flex: 1,
    flexDirection: 'column',
  },
  activityIndicator: {
    marginTop: 10,
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  currentMonth: {
    fontSize: 18,
  },
  navIcon: {
    fontSize: 36,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    backgroundColor: '#FAFAFA',
  },
  row: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeRow: {
    backgroundColor: '#E0E0E0',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dayText: {
    fontSize: 16,
    width: 50,
  },
  mangalaCheckboxContainer: {
    alignItems: 'center',
    marginEnd: 30,
  },
  guruPujaCheckboxContainer: {
    alignItems: 'center',
    marginEnd: 20,
  },
  gauraAratiCheckboxContainer: {
    alignItems: 'center',
  },
  mangalaSumContainer: {
    marginStart: 5,
  },
  guruPujaSumContainer: {
    marginStart: 35,
  },
  gauraAratiSumContainer: {
    marginStart: 20,
  },
  japaSumContainer: {
    alignItems: 'center',
    marginEnd: 46,
  },
  note: {
    marginTop: 2,
  },
});

export default SadhanaListView;
