'use client';

import { createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

interface FirebaseContextType {
  app: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
}

const FirebaseContext = createContext<FirebaseContextType>({
    app: null,
    firestore: null,
    auth: null,
});

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [app, setApp] = useState<FirebaseApp | null>(null);

  useEffect(() => {
    // This code now runs only on the client-side.
    // It uses the raw, un-encoded API key directly.
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    };

    if (typeof window !== 'undefined' && firebaseConfig.apiKey && firebaseConfig.projectId) {
      const initializedApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
      setApp(initializedApp);
    } else if (typeof window !== 'undefined') {
        console.error("Firebase client configuration is incomplete. Initialization skipped.");
    }
  }, []);

  const firestore = useMemo(() => app ? getFirestore(app) : null, [app]);
  const auth = useMemo(() => app ? getAuth(app) : null, [app]);

  const value = {
    app,
    firestore,
    auth,
  };

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const useFirebaseApp = () => useFirebase()?.app;
export const useFirestore = () => useFirebase()?.firestore;
export const useAuth = () => useFirebase()?.auth;
