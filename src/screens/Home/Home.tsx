import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red',
  },
});

export default function Home() {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home Screen</Text>
      <Button
        onPress={() => {
          navigate('NewEntry');
        }}
        title="New Entry"
      />
    </View>
  );
}
