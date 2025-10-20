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

export default function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const { navigate } = navigation;

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
