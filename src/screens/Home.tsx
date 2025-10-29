import { StyleSheet, FlatList, Text } from 'react-native';
import JournalEntry from '../components/JournalEntry';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatingActionButton from '../components/FoatingActionButton';
import { useMMKVObject } from 'react-native-mmkv';
import {
  type JournalEntry as JournalEntryType,
  MMKV_JOURNAL_STORAGE_KEY,
} from '../store/journalStorage';
import { storage } from '../store/mmkvStore';

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
  const [journals] = useMMKVObject<JournalEntryType[]>(
    MMKV_JOURNAL_STORAGE_KEY,
    storage,
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Journeys</Text>
      <FlatList
        data={journals}
        style={styles.listContainer}
        contentContainerStyle={styles.listContentContainer}
        renderItem={({ item: entry }) => (
          <JournalEntry
            image={`file://${entry.imagePath}`}
            title={entry.title}
            desc={entry.desc}
            date={entry.createdAt.toString()}
            onPress={() => navigate('JournalEntryView', { entry })}
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
