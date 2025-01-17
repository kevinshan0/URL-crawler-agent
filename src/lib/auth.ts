import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "$lib/firebase";
import { goto } from "$app/navigation";

export const signInWithPopupHandler = async () => {
    try {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        auth.useDeviceLanguage();
        
        const result = await signInWithPopup(auth, provider);
        await goto('/');
        return result.user;
    } catch (error: any) {
        console.error('Google sign in failed:', error);
        throw error;
    }
};

// Sign in user
export const signIn = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await goto('/');
    return result;
};
  
// Register user
export const register = async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await goto('/');
    return result;
};
  
// Sign out user
export const logout = async () => {
    try {
        await signOut(auth);
        goto('/login', { replaceState: true });
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }
};