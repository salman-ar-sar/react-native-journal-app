import dayjs from 'dayjs';
import { ArrowLeft } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

export default function JournalEntryView({
  navigation,
  route,
}: RootStackScreenProps<'JournalEntryView'>) {
  const {
    params: { entry },
  } = route;
  const { goBack } = navigation;
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  useEffect(() => {
    Image.getSize(`file://${entry.imagePath}`, (width, height) => {
      const ratio = height / width;
      const adjustedHeight = (screenWidth - 16) * ratio;
      setImageHeight(adjustedHeight);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!imageHeight) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.backButton} onPress={goBack}>
        <ArrowLeft size={24} />
      </Pressable>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          style={[styles.image, { height: imageHeight }]}
          source={{ uri: `file://${entry.imagePath}` }}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{entry.title}</Text>
          <Text style={styles.date}>
            {dayjs(entry.createdAt).isAfter(dayjs().subtract(7, 'day'))
              ? dayjs(entry.createdAt).fromNow()
              : dayjs(entry.createdAt).format('MMMM DD, YYYY')}
          </Text>
          <Text style={styles.desc}>{entry.desc}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.location}>Location</Text>
          <Image
            style={[styles.locationPlaceHolder]}
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA1fhCyo0d4Sj8pxC_nEIwr7E8AGRecdjJKW2wgTdl0dipvQ6fx_7GebTuInjTmhJwehjPjQq3tnJGXcoW7j0RN4fRH1ln-U9ni2mlyL17kI3OySS0_2cO93BCOD4TawoI5TfeTES5d8-wOIs3eFGHDnuyhCR6xT11tMj5jKvQKIul8BzF-K6P0RHO7csWLfCq4rnJZkjjNQANeUv0Vuf_WR6b2MfQJfB3KLcEeBr098IQHsVszcJBq2JStDMC0hyQ0D8i9FTCnKM',
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    height: '100%',
  },
  backButton: {
    padding: 16,
  },
  scrollContainer: {
    gap: 16,
    paddingBottom: 16,
  },
  image: {
    borderRadius: 24,
    marginHorizontal: 16,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    marginHorizontal: 16,

    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    color: '#0f172b',
    fontWeight: 600,
    fontSize: 30,
    paddingBottom: 8,
  },
  date: { color: '#13a4ec', paddingBottom: 16 },
  desc: {
    color: '#45556',
    fontSize: 16,
    paddingBottom: 4,
  },
  location: {
    fontSize: 24,
    fontWeight: 600,
    paddingBottom: 16,
  },
  locationPlaceHolder: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 16,
  },
});
