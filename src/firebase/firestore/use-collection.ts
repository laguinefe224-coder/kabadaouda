'use client';
import { useEffect, useState } from 'react';
import { onSnapshot, Query, DocumentData, CollectionReference } from 'firebase/firestore';

export function useCollection<T>(q: Query | CollectionReference | null) {
    const [data, setData] = useState<T[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!q) {
            setData(null);
            setLoading(false);
            return;
        };

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
            setData(docs);
            setLoading(false);
        }, (err) => {
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [q]);

    return { data, loading, error };
}
