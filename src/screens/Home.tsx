import { StyleSheet, FlatList, Text } from 'react-native';
import JournalEntry from '../components/JournalEntry';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatingActionButton from '../components/FoatingActionButton';
import { useMMKVStorage } from '../hooks/useJournalsStorage';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    width: '100%',
    padding: 16,
    paddingTop: 8,
  },
  listContentContainer: { gap: 16, paddingBottom: 24 },
  header: {
    fontSize: 16,
    fontWeight: 700,
    paddingVertical: 16,
  },
});

export default function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const { navigate } = navigation;
  const { journals } = useMMKVStorage();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Journeys</Text>
      <FlatList
        data={journals}
        style={styles.listContainer}
        contentContainerStyle={styles.listContentContainer}
        renderItem={({ item: entry }) => (
          <JournalEntry
            id={entry.id}
            image={`file://${entry.imagePath}`}
            title={entry.title}
            desc={entry.desc}
            date={entry.createdAt.toString()}
          />
        )}
        keyExtractor={({ id }) => id}
      />
      <FloatingActionButton
        onPress={() => {
          navigate('NewEntry');
        }}
      />
    </SafeAreaView>
  );
}
