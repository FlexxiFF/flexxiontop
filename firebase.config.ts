// Firebase Authentication Service
// For now, we'll implement a mock service that mimics Firebase functionality
// In a real implementation with proper Firebase setup, you would import from 'firebase/auth'

export const firebaseAuthService = {
  // Mock sign in with email and password
  signIn: async (email: string, password: string): Promise<any> => {
    // Simulate Firebase authentication
    // In a real Firebase implementation, you would call signInWithEmailAndPassword
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        if (email === 'admin' && password === 'admin') {
          resolve({ uid: 'mock-admin-user-id', email });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 300);
    });
  },

  // Mock sign out
  signOut: async (): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        resolve();
      }, 300);
    });
  },

  // Mock authentication state listener
  onAuthStateChanged: (callback: (user: any) => void): (() => void) => {
    // Simulate checking auth state
    const user = localStorage.getItem('firebase_auth_token') ? { uid: 'mock-admin-user-id', email: 'admin' } : null;
    callback(user);
    
    // Return unsubscribe function
    return () => {
      // Cleanup if needed
    };
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    // Check if we have a stored auth token
    return !!localStorage.getItem('firebase_auth_token');
  },

  // Set authentication state
  setAuthenticated: (token?: string): void => {
    if (token) {
      localStorage.setItem('firebase_auth_token', token);
    } else {
      localStorage.removeItem('firebase_auth_token');
    }
  }
};
