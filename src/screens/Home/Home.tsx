import { StyleSheet, FlatList, Text, View, Button } from 'react-native';
import JournalEntry from '../../components/JournalEntry/JournalEntry';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockJournalEntries = [
  {
    id: '1',
    title: 'Paris Trip',
    note: 'The Detail Screen has been switched to dark mode, ensuring that the large photo, title, date, full note, and map section are all presented clearly within a darker interface.',
    date: '2025-10-12',
    image: 'https://picsum.photos/1920/1080?random=1',
  },
  {
    id: '2',
    title: 'Beach Day',
    note: 'Water was crystal clear.',
    date: '2025-10-12',
    image: 'https://picsum.photos/1920/1080?random=2',
  },
  {
    id: '3',
    title: 'Beach Day',
    note: 'Water was crystal clear.',
    date: '2025-10-12',
    image: 'https://picsum.photos/1920/1080?random=3',
  },
  {
    id: '4',
    title: 'Beach Day',
    note: 'Water was crystal clear.',
    date: '2025-10-12',
    image: 'https://picsum.photos/1920/1080?random=4',
  },
  {
    id: '5',
    title: 'Beach Day',
    note: 'Water was crystal clear.',
    date: '2025-10-12',
    image: 'https://picsum.photos/1920/1080?random=5',
  },
  {
    id: '6',
    title: 'Beach Day',
    note: 'Water was crystal clear.',
    date: '2025-10-12',
    image: 'https://picsum.photos/1920/1080?random=6',
  },
  {
    id: '7',
    title: 'Beach Day',
    note: 'Water was crystal clear.',
    date: '2025-10-18',
    image: 'https://picsum.photos/1920/1080?random=7',
  },
  {
    id: '8',
    title: 'Beach Day',
    note: 'Water was crystal clear.',
    date: '2025-10-12',
    image: 'https://picsum.photos/1920/1080?random=8',
  },
  {
    id: '9',
    title: 'Beach Day',
    note: 'Water was crystal clear.',
    date: '2025-10-12',
    image: 'https://picsum.photos/1920/1080?random=9',
  },
  {
    id: '10',
    title: 'Beach Day',
    note: 'Water was crystal clear.',
    date: '2025-10-12',
    image: 'https://picsum.photos/1920/1080?random=10',
  },
  {
    id: '11',
    title: 'Beach Day - 11',
    note: 'Water was crystal clear.',
    date: '2025-10-12',
    image: 'https://picsum.photos/1920/1080?random=11',
  },
];

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
    paddingTop: 0,
  },
  listContentContainer: { gap: 16, paddingBottom: 24 },
  header: {
    fontSize: 16,
    fontWeight: 700,
    paddingBottom: 16,
  },
});

export default function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const { navigate } = navigation;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Journeys</Text>
      <FlatList
        data={mockJournalEntries}
        style={styles.listContainer}
        contentContainerStyle={styles.listContentContainer}
        renderItem={({ item: entry }) => (
          <JournalEntry
            id={entry.id}
            image={entry.image}
            title={entry.title}
            desc={entry.note}
            date={entry.date}
          />
        )}
        keyExtractor={({ id }) => id}
      />
      <Button
        onPress={() => {
          navigate('NewEntry');
        }}
        title="New Entry"
      />
    </SafeAreaView>
  );
}
