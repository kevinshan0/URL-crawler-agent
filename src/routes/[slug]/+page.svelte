<script lang="ts">
    import { signIn, register, signInWithPopupHandler } from '$lib/auth';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import { Button } from '$lib/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import { loginSchema, signupSchema } from './schema';
    import { afterNavigate } from '$app/navigation';
    
    const { data } = $props<{ data: PageData }>();
    let isSignup = $derived(data.slug === 'signup');

    let email = $state('');
    let password = $state('');
    let confirmPassword = $state('');
    let error = $state('');
    let loading = $state(false);

    // Reset form when route changes
    afterNavigate(() => {
        email = '';
        password = '';
        confirmPassword = '';
        error = '';
        loading = false;
    });

    const validateForm = () => {
        const schema = isSignup ? signupSchema : loginSchema;
        const result = schema.safeParse({ email, password, confirmPassword });
        
        if (!result.success) {
            error = result.error.issues[0].message;
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        error = '';
        if (!validateForm()) return;
        
        loading = true;
        try {
            if (isSignup) {
                await register(email, password);
            } else {
                await signIn(email, password);
            }
            goto('/');
        } catch (e: any) {
            error = e.message;
        }
        loading = false;
    };
</script>

<div class="container mx-auto flex items-center justify-center min-h-screen py-12 px-4">
    <Card class="w-full max-w-md">
        <CardHeader>
            <CardTitle class="text-2xl text-center">
                {isSignup ? 'Create your account' : 'Sign in to your account'}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <form 
                onsubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }} 
                class="space-y-4"
            >
                {#if error}
                    <div class="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                        {error}
                    </div>
                {/if}

                <div class="space-y-2">
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        bind:value={email}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div class="space-y-2">
                    <Label for="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        bind:value={password}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {#if isSignup}
                    <div class="space-y-2">
                        <Label for="confirm-password">Confirm Password</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            bind:value={confirmPassword}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                {/if}

                <div class="space-y-2">
                    <Button type="submit" class="w-full" disabled={loading}>
                        {loading ? 'Loading...' : (isSignup ? 'Sign up' : 'Sign in')}
                    </Button>

                    <Button 
                        type="button" 
                        variant="outline" 
                        class="w-full"
                        onclick={signInWithPopupHandler}
                        disabled={loading}
                    >
                        Sign {isSignup ? 'up' : 'in'} with Google
                    </Button>
                </div>

                <div class="text-center text-sm">
                    <a 
                        href={isSignup ? '/login' : '/signup'} 
                        class="text-primary hover:underline"
                    >
                        {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                    </a>
                </div>
            </form>
        </CardContent>
    </Card>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>
