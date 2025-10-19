import dayjs from 'dayjs';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const styles = StyleSheet.create({
  containerShadow: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderRadius: 12,
    backgroundColor: '#F2F1F2',
    borderColor: 'rgb(0,0,0,0.1)',
    borderWidth: 0.5,
  },
  container: {
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    aspectRatio: 16 / 9,
    width: '100%',
  },
  textContainer: {
    width: '100%',
    backgroundColor: '#fff',
    gap: 4,
    padding: 16,
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: 700,
    color: '#333333',
    fontSize: 16,
  },
  desc: {
    color: '#888888',
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
      style={styles.containerShadow}
      activeOpacity={0.75}
      onPress={() => {
        console.log(id);
      }}
    >
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: image }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>
            {dayjs(date).isAfter(dayjs().subtract(7, 'day'))
              ? dayjs(date).fromNow()
              : dayjs(date).format('MMMM DD, YYYY')}
          </Text>
          <Text style={styles.desc} numberOfLines={2}>
            {desc}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
