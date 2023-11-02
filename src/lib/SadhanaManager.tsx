import SadhanaData from '../models/SadhanaData';
import User from '../models/User';

class SadhanaManager {

  findSadhanaItemByDate(sadhanaData: SadhanaData[], date: Date) {
    return sadhanaData.find((item) => {
      // Convert item.date to a Date object for comparison
      const itemDate = new Date(item.date);

      // Check if day, month, and year match
      return (
        date.getDate() === itemDate.getDate() &&
        date.getMonth() === itemDate.getMonth() &&
        date.getFullYear() === itemDate.getFullYear()
      );
    })
  }

  /**
   * Merge existing sadhanaData list with user.sadhanaData
   * @param sadhanaData sadhana data to merge into user.sadhanaData
   * @param user
   * @returns SadhanaData[]
   */
  mergeSadhanaList(sadhanaData: SadhanaData[], user: User) {
    const mergedList: SadhanaData[] = [];

    // Create a map to store the latest data for each date
    const latestDataMap = new Map<string, SadhanaData>();

    // Store the latest data from user.sadhanaData
    if (user.sadhanaData && user.sadhanaData.length) {
      user.sadhanaData.forEach((item) => {
        latestDataMap.set(item.date.toISOString(), item);
      });
    }

    // Store the latest data from sadhanaData parameter
    if (sadhanaData && sadhanaData.length) {
      sadhanaData.forEach((item) => {
        latestDataMap.set(item.date.toISOString(), item);
      });
    }

    // Convert the map values back to an array
    mergedList.push(...latestDataMap.values());

    // Sort the merged list by date
    mergedList.sort((a, b) => a.date.getTime() - b.date.getTime());

    return mergedList;
  }
}

export default SadhanaManager;