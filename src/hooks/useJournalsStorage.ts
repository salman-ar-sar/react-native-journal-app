import { useEffect, useState } from 'react';
import { storage } from '../store/mmkvStore';
import {
  getAllJournalEntries,
  JournalEntry,
  MMKV_JOURNAL_STORAGE_KEY,
} from '../store/journalStorage';

export function useMMKVStorage() {
  const [value, setValue] = useState<JournalEntry[]>(getAllJournalEntries());

  useEffect(() => {
    const listener = (changedKey: string) => {
      if (changedKey === MMKV_JOURNAL_STORAGE_KEY) {
        setValue(getAllJournalEntries());
      }
    };

    // Subscribe to storage changes
    const unsubscribe = storage.addOnValueChangedListener(listener);

    return () => {
      unsubscribe.remove();
    };
  }, []);

  return { journals: value };
}
