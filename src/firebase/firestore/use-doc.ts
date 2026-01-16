'use client';

import { useEffect, useState, useRef } from 'react';
import { doc, onSnapshot, DocumentReference } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

interface UseDocReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useDoc<T>(path: string): UseDocReturn<T> {
  const db = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const unsubscribeRef = useRef<(() => void) | undefined>();

  useEffect(() => {
    if (!path) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    if (!db) return; // wait for db

    try {
      const docRef = doc(db, path) as DocumentReference<T>;

      unsubscribeRef.current = onSnapshot(
        docRef,
        (snap) => {
          if (snap.exists()) {
            setData({ id: snap.id, ...snap.data() } as T);
          } else {
            setData(null);
          }
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error(`Error fetching doc from ${path}:`, err);
          setError(err);
          setData(null);
          setLoading(false);
        }
      );
    } catch (err) {
      console.error(`Error creating document reference for path: ${path}`, err);
      setError(err as Error);
      setData(null);
      setLoading(false);
    }

    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
    };
  }, [db, path]);

  return { data, loading, error };
}
