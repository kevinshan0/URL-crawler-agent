import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => {
    const { slug } = params;
    
    if (!['login', 'signup'].includes(slug)) {
        throw error(404, 'Page not found');
    }

    return {
        slug
    };
}; 