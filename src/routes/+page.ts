import { auth } from '$lib/firebase';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    // Wait for Firebase Auth to initialize
    await new Promise<void>((resolve) => {
        if (auth.currentUser) {
            resolve();
        } else {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                unsubscribe();
                resolve();
            });
        }
    });

    // Now we can safely check the user
    const user = auth.currentUser;
    if (!user) {
        throw redirect(302, '/signup');
    }

    return {
        user: {
            email: user.email,
            uid: user.uid
        }
    };
};