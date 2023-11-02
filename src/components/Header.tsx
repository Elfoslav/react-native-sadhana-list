import { StyleSheet, Text, View } from "react-native";

type HeaderProps = {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{ title }</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#eee',
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    color: '#565656',
    fontSize: 18,
  },
});

export default Header;