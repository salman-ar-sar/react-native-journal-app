import dayjs from 'dayjs';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 104,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  image: {
    width: 60,
    height: 80,
    borderRadius: 8,
    borderWidth: 0.2,
    borderColor: '#303030',
  },
  textContainer: {
    height: '100%',
    flex: 1,
  },
  detailsContainer: { flex: 1, justifyContent: 'center' },
  title: {
    fontWeight: 500,
    marginBottom: 4,
  },
  desc: {
    color: '#303030',
    fontSize: 12,
  },
  date: {
    color: 'gray',
    fontSize: 10,
    textAlign: 'right',
  },
});

type JournalEntryProps = {
  id: string;
  image: string;
  title: string;
  date: string;
  desc: string;
};

export default function JournalEntry({
  id,
  image,
  title,
  date,
  desc,
}: JournalEntryProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.75}
      onPress={() => {
        console.log(id);
      }}
    >
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.textContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
        <Text style={styles.date}>
          {dayjs(date).isAfter(dayjs().subtract(7, 'day'))
            ? dayjs(date).fromNow()
            : dayjs(date).format('DD MMM YYYY')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
