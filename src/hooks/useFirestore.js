import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useFirestore = (collectionName, options = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let q = collection(db, collectionName);

        if (options.where) {
            q = query(q, where(...options.where));
        }

        if (options.orderBy) {
            q = query(q, orderBy(...options.orderBy));
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const results = [];
            snapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });
            setData(results);
            setLoading(false);
        }, (err) => {
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [collectionName, JSON.stringify(options)]);

    return { data, loading, error };
};
