import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface CrawlerResponse {
    success: boolean;
    message: string;
    content: Record<string, string>;
}

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { message } = await request.json();

        // Make request to Python backend
        const response = await fetch('http://127.0.0.1:8000', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_message: message })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to get response from crawler service');
        }

        const data: CrawlerResponse = await response.json();
        return json(data);

    } catch (error) {
        console.error('Crawler API error:', error);
        return json(
            { 
                success: false,
                message: error instanceof Error ? error.message : 'Failed to process URL',
                content: {}
            },
            { status: 500 }
        );
    }
}; 