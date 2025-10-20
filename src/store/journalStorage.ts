import RNFS from 'react-native-fs';
import { storage } from './mmkvStore';
import { v4 as uuidv4 } from 'uuid';
import dayjs, { Dayjs } from 'dayjs';

export const MMKV_JOURNAL_STORAGE_KEY = 'journals';

export interface JournalEntry {
  id: string;
  title: string;
  desc: string;
  imagePath: string;
  createdAt: Dayjs;
}

const saveImageToAppStorage = async (sourceUri: string): Promise<string> => {
  try {
    const normalizedPath = sourceUri.replace('file://', '');
    const ext = sourceUri.split('.').at(-1) ?? 'jpg';

    const fileName = `journal_${Date.now()}.${ext}`;
    const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    await RNFS.copyFile(normalizedPath, destPath);

    return destPath;
  } catch (err) {
    console.error('Failed to save image:', err);
    throw err;
  }
};

export async function saveJournalEntry(
  title: string,
  desc: string,
  imageUri: string,
): Promise<JournalEntry> {
  const imagePath = await saveImageToAppStorage(imageUri);

  const entry: JournalEntry = {
    id: uuidv4(),
    title,
    desc,
    imagePath,
    createdAt: dayjs(),
  };

  const existingData = storage.getString(MMKV_JOURNAL_STORAGE_KEY);
  const entries: JournalEntry[] = existingData ? JSON.parse(existingData) : [];
  entries.push(entry);
  storage.set(MMKV_JOURNAL_STORAGE_KEY, JSON.stringify(entries));

  return entry;
}

export function getAllJournalEntries(): JournalEntry[] {
  const data = storage.getString(MMKV_JOURNAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getJournalById(id: string): JournalEntry | undefined {
  const entries = getAllJournalEntries();
  return entries.find(e => e.id === id);
}

export async function deleteJournalEntry(id: string): Promise<void> {
  const entries = getAllJournalEntries();
  const updated = entries.filter(e => e.id !== id);
  const deleted = entries.find(e => e.id === id);

  if (deleted?.imagePath && (await RNFS.exists(deleted.imagePath))) {
    await RNFS.unlink(deleted.imagePath);
  }

  storage.set(MMKV_JOURNAL_STORAGE_KEY, JSON.stringify(updated));
}

export async function deleteAllJournals() {
  const entries = getAllJournalEntries();

  await Promise.allSettled(
    entries.map(async item => {
      if (item?.imagePath && (await RNFS.exists(item.imagePath))) {
        await RNFS.unlink(item.imagePath);
      }
    }),
  );

  storage.set(MMKV_JOURNAL_STORAGE_KEY, JSON.stringify([]));
}
