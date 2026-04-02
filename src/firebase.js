// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3DUltI1YDQbDoVXs2SUXaeIQr95rPdzk",
  authDomain: "eterno-3ad92.firebaseapp.com",
  projectId: "eterno-3ad92",
  storageBucket: "eterno-3ad92.firebasestorage.app",
  messagingSenderId: "268116518698",
  appId: "1:268116518698:web:a25a990c6364001f41a053"
};

// Initialize Firebase with error handling
let app, auth, db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Set auth persistence
  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.warn('Error setting auth persistence:', error);
  });
  
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  // Fallback initialization for development
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (fallbackError) {
    console.error('Firebase fallback initialization failed:', fallbackError);
    throw new Error('Failed to initialize Firebase');
  }
}
// Sign up function
export const signUp = async (name, email, password, mobile) => {
  try {
    console.log('Starting signup process for:', email);
    
    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User created in Auth:', user.uid);
    
    try {
      // 2. Update user profile with display name
      await updateProfile(user, {
        displayName: name
      });
      console.log('User profile updated with display name');

      // 3. Save additional user data to Firestore
      const userDoc = {
        uid: user.uid,
        name,
        email,
        mobile,
        createdAt: new Date().toISOString(),
        role: 'user',
        emailVerified: user.emailVerified
      };

      await setDoc(doc(db, 'users', user.uid), userDoc);
      console.log('User data saved to Firestore');
      
      return { 
        success: true, 
        user: { 
          uid: user.uid,
          email: user.email,
          displayName: name,
          ...userDoc
        } 
      };
    } catch (dbError) {
      console.error('Error in user setup:', dbError);
      // If we fail after creating the auth user, delete the auth user to prevent orphaned accounts
      try {
        await user.delete();
        console.log('Cleaned up auth user due to failure');
      } catch (deleteError) {
        console.error('Error cleaning up auth user:', deleteError);
      }
      throw dbError; // Re-throw to be caught by the outer catch
    }
  } catch (error) {
    console.error('Signup error:', {
      code: error.code,
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    return { 
      success: false, 
      error: error.code || 'auth/unknown-error',
      message: error.message 
    };
  }
};

// Sign in function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Sign out function
export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Password reset function
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          uid: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          mobile: '',
          photoURL: user.photoURL || '',
          provider: 'google',
          role: 'user',
          emailVerified: user.emailVerified,
          updatedAt: new Date().toISOString()
        },
        { merge: true }
      );
    } catch (dbError) {
      const code = dbError?.code || '';
      // Auth succeeded; Firestore rules may block profile sync. Don't treat this as login failure.
      if (code === 'permission-denied') {
        console.warn('Firestore user sync blocked (permission-denied). Continuing auth session.', dbError);
        return { success: true, user, warning: 'permission-denied' };
      }
      console.warn('Firestore user sync failed. Continuing auth session.', dbError);
      return { success: true, user, warning: code || 'firestore-sync-failed' };
    }

    return { success: true, user };
  } catch (error) {
    const code = error?.code || '';
    if (code === 'auth/popup-blocked' || code === 'auth/popup-closed-by-user') {
      await signInWithRedirect(auth, googleProvider);
      return { success: true, redirect: true };
    }
    return { success: false, error: error.code || error.message };
  }
};

export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;
    await setDoc(
      doc(db, 'users', user.uid),
      {
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || '',
        mobile: '',
        photoURL: user.photoURL || '',
        provider: 'facebook',
        role: 'user',
        emailVerified: user.emailVerified,
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );
    return { success: true, user };
  } catch (error) {
    const code = error?.code || '';
    if (code === 'auth/popup-blocked' || code === 'auth/popup-closed-by-user') {
      await signInWithRedirect(auth, facebookProvider);
      return { success: true, redirect: true };
    }
    return { success: false, error: error.code || error.message };
  }
};

export const handleAuthRedirect = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const { user } = result;
      const providerId = result.providerId || result?._tokenResponse?.providerId || '';
      const provider = providerId.includes('google') ? 'google' : providerId.includes('facebook') ? 'facebook' : '';

      try {
        const userRef = doc(db, 'users', user.uid);
        const existing = await getDoc(userRef);
        const now = new Date().toISOString();

        if (!existing.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            name: user.displayName || '',
            email: user.email || '',
            mobile: '',
            photoURL: user.photoURL || '',
            provider,
            role: 'user',
            emailVerified: user.emailVerified,
            createdAt: now,
            updatedAt: now
          });
        } else {
          await setDoc(userRef, { updatedAt: now, lastLogin: now }, { merge: true });
        }
      } catch (dbError) {
        const code = dbError?.code || '';
        if (code === 'permission-denied') {
          console.warn('Firestore user sync blocked (permission-denied) after redirect. Continuing auth session.', dbError);
          return { success: true, user, warning: 'permission-denied' };
        }
        console.warn('Firestore user sync failed after redirect. Continuing auth session.', dbError);
        return { success: true, user, warning: code || 'firestore-sync-failed' };
      }

      return { success: true, user };
    }
    return { success: false };
  } catch (error) {
    console.error('Error handling auth redirect:', error);
    return { success: false, error: error.code || error.message };
  }
};

// Phone Authentication Functions
export const setUpRecaptcha = (containerId) => {
  try {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          console.log('reCAPTCHA expired');
        }
      });
    }
    return window.recaptchaVerifier;
  } catch (error) {
    console.error('Error setting up reCAPTCHA:', error);
    return null;
  }
};

export const sendPhoneOTP = async (phoneNumber, recaptchaVerifier) => {
  try {
    console.log('Sending OTP to phone:', phoneNumber);
    
    // For development, use test phone numbers to avoid billing
    const testPhoneNumbers = {
      '+911234567890': '123456',
      '+919876543210': '654321',
      '+15555215555': '123456',
      '+15555215556': '654321'
    };
    
    // If it's a test number, simulate OTP sending
    if (testPhoneNumbers[phoneNumber]) {
      console.log('Using test phone number, OTP:', testPhoneNumbers[phoneNumber]);
      // Simulate confirmation result for test numbers
      window.confirmationResult = {
        confirm: async (otp) => {
          if (otp === testPhoneNumbers[phoneNumber]) {
            // Create a proper mock user object with required Firebase methods
            const mockUser = {
              uid: 'test-user-' + Date.now(),
              phoneNumber: phoneNumber,
              displayName: 'Test User',
              email: null,
              photoURL: null,
              emailVerified: false,
              // Add mock Firebase methods
              getIdToken: () => Promise.resolve('mock-token-' + Date.now()),
              refreshToken: 'mock-refresh-token',
              metadata: {},
              providerData: [],
              delete: () => Promise.resolve(),
              reload: () => Promise.resolve(),
              toJSON: () => ({
                uid: 'test-user-' + Date.now(),
                phoneNumber: phoneNumber,
                displayName: 'Test User'
              })
            };
            return { user: mockUser };
          } else {
            throw new Error('Invalid OTP');
          }
        }
      };
      
      return { 
        success: true, 
        message: 'Test OTP sent successfully',
        confirmationResult: window.confirmationResult,
        isTestMode: true
      };
    }
    
    // For production, use actual Firebase phone auth
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    window.confirmationResult = confirmationResult;
    
    return { 
      success: true, 
      message: 'OTP sent successfully',
      confirmationResult 
    };
  } catch (error) {
    console.error('Error sending OTP:', error);
    
    // Provide helpful error messages
    let errorMessage = error.message;
    if (error.code === 'auth/billing-not-enabled') {
      errorMessage = 'Phone authentication is not enabled. Please enable it in Firebase Console or use test numbers: +911234567890 (OTP: 123456) or +919876543210 (OTP: 654321)';
    } else if (error.code === 'auth/invalid-phone-number') {
      errorMessage = 'Invalid phone number format. Please enter a valid 10-digit number.';
    } else if (error.code === 'auth/quota-exceeded') {
      errorMessage = 'Too many OTP requests. Please try again later.';
    }
    
    return { 
      success: false, 
      error: error.code || 'auth/unknown-error',
      message: errorMessage 
    };
  }
};

export const verifyPhoneOTP = async (otp, name) => {
  try {
    if (!window.confirmationResult) {
      throw new Error('No confirmation result found. Please request OTP again.');
    }

    const result = await window.confirmationResult.confirm(otp);
    const user = result.user;
    
    // For test users, update the display name directly in the user object
    if (user.uid && user.uid.startsWith('test-user-')) {
      user.displayName = name || 'Test User';
      console.log('Test user profile updated with name:', user.displayName);
    } else {
      // For real Firebase users, use updateProfile
      if (name && user.displayName !== name) {
        try {
          await updateProfile(user, { displayName: name });
        } catch (profileError) {
          console.warn('Profile update failed:', profileError);
        }
      }
    }
    
    // Use final display name
    const finalName = user.displayName || name || 'Test User';

    // Save user data to Firestore
    const userDoc = {
      uid: user.uid,
      name: finalName,
      phoneNumber: user.phoneNumber,
      provider: 'phone',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'users', user.uid), userDoc, { merge: true });
      console.log('Phone user data saved to Firestore');
    } catch (firestoreError) {
      console.warn('Firestore save failed (may be test user or permissions issue):', firestoreError);
      
      // For test users, we can continue even if Firestore fails
      if (user.uid && user.uid.startsWith('test-user-')) {
        console.log('Test user created successfully (Firestore skipped)');
        return { 
          success: true, 
          user: { 
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            displayName: finalName,
            ...userDoc
          },
          warning: 'test-user-firestore-skipped'
        };
      }
      
      throw firestoreError;
    }

    return { 
      success: true, 
      user: { 
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        displayName: finalName,
        ...userDoc
      } 
    };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    
    // Provide helpful error messages
    let errorMessage = error.message;
    if (error.code === 'auth/invalid-verification-code') {
      errorMessage = 'Invalid OTP. Please check and try again.';
    } else if (error.code === 'auth/code-expired') {
      errorMessage = 'OTP has expired. Please request a new one.';
    } else if (error.code === 'auth/missing-verification-code') {
      errorMessage = 'Please enter the OTP sent to your phone.';
    }
    
    return { 
      success: false, 
      error: error.code || 'auth/unknown-error',
      message: errorMessage 
    };
  }
};

export const clearPhoneAuth = () => {
  window.confirmationResult = null;
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
    window.recaptchaVerifier = null;
  }
};

export { auth, db };
