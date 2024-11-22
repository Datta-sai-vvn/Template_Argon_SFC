// src/firebase/Auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "./firebaseConfig"; // Import the Firebase app

// Initialize Firebase app
const auth = getAuth(app);

// Sign-Up Function
export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up successfully", userCredential.user);
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

// Login Function
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully", userCredential.user);
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
};

// Logout Function
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

export const updateDisplayName = async (newName) => {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: newName,
    });
    console.log('Display name updated');
  }
};

// Export the auth instance for use in your other components
export { auth };
