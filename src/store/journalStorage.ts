import RNFS from 'react-native-fs';
import { storage } from './mmkvStore';
import { v4 as uuidv4 } from 'uuid';

const MMKV_JOURNAL_STORAGE_KEY = 'journals';

export interface JournalEntry {
  id: string;
  title: string;
  desc: string;
  imagePath: string;
  createdAt: number;
}

export const saveImageToAppStorage = async (
  sourceUri: string,
): Promise<string> => {
  try {
    const normalizedPath = sourceUri.replace('file://', '');

    const fileName = `journal_${Date.now()}.jpg`;
    const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    await RNFS.copyFile(normalizedPath, destPath);

    return destPath;
  } catch (err) {
    console.error('Failed to save image:', err);
    throw err;
  }
};

export const saveJournalEntry = async (
  title: string,
  desc: string,
  imageUri: string,
): Promise<JournalEntry> => {
  const imagePath = await saveImageToAppStorage(imageUri);

  const entry: JournalEntry = {
    id: uuidv4(),
    title,
    desc,
    imagePath,
    createdAt: Date.now(),
  };

  const existingData = storage.getString(MMKV_JOURNAL_STORAGE_KEY);
  const entries: JournalEntry[] = existingData ? JSON.parse(existingData) : [];
  entries.push(entry);
  storage.set(MMKV_JOURNAL_STORAGE_KEY, JSON.stringify(entries));

  return entry;
};

export const getAllJournalEntries = (): JournalEntry[] => {
  const data = storage.getString(MMKV_JOURNAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getJournalById = (id: string): JournalEntry | undefined => {
  const entries = getAllJournalEntries();
  return entries.find(e => e.id === id);
};

export const deleteJournalEntry = async (id: string): Promise<void> => {
  const entries = getAllJournalEntries();
  const updated = entries.filter(e => e.id !== id);
  const deleted = entries.find(e => e.id === id);

  if (deleted?.imagePath && (await RNFS.exists(deleted.imagePath))) {
    await RNFS.unlink(deleted.imagePath);
  }

  storage.set(MMKV_JOURNAL_STORAGE_KEY, JSON.stringify(updated));
};
