<script lang="ts">
    import { logout } from '$lib/auth';
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { Card } from '$lib/components/ui/card';

    interface Response {
        success: boolean;
        message: string;
        content: Record<string, string>;
    }

    let messages = $state<Array<{ role: 'user' | 'assistant', content: string }>>([]);
    let currentMessage = $state('');
    let loading = $state(false);

    const handleSubmit = async () => {
        if (!currentMessage.trim() || loading) return;

        loading = true;
        const userMessage = currentMessage;
        currentMessage = '';

        // Add user message to chat
        messages = [...messages, { role: 'user', content: userMessage }];

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });

            if (!response.ok) throw new Error('Failed to get response');

            const data: Response = await response.json();
            messages = [...messages, { role: 'assistant', content: data.message }];
        } catch (error) {
            console.error('Chat error:', error);
            messages = [...messages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }];
        } finally {
            loading = false;
        }
    };
</script>

<div class="container mx-auto p-4 flex flex-col h-screen">
    <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">AI Agent Chat</h1>
        <Button variant="destructive" onclick={logout}>
            Logout
        </Button>
    </div>

    <Card class="flex-grow overflow-hidden flex flex-col mb-4">
        <div class="flex-grow overflow-y-auto p-4 space-y-4">
            {#if messages.length === 0}
                <div class="text-center text-gray-500">
                    Start a conversation with the AI agent...
                </div>
            {/if}
            
            {#each messages as message}
                <div class="flex flex-col {message.role === 'user' ? 'items-end' : 'items-start'}">
                    <div class="max-w-[80%] rounded-lg p-3 {
                        message.role === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                    }">
                        {message.content}
                    </div>
                </div>
            {/each}

            {#if loading}
                <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div class="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div class="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                </div>
            {/if}
        </div>
    </Card>

    <form 
        class="flex gap-2" 
        onsubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}
    >
        <Input
            type="text"
            placeholder="Type your message..."
            bind:value={currentMessage}
            disabled={loading}
        />
        <Button type="submit" disabled={loading || !currentMessage.trim()}>
            Send
        </Button>
    </form>
</div>
