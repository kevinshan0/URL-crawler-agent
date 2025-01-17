<script lang="ts">
    import { logout } from '$lib/auth';
    import { Button } from '$lib/components/ui/button';
    import type { PageData } from './$types';

    const { data } = $props<{ data: PageData }>();
</script>

<div class="container mx-auto p-4">
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Welcome{data.user?.email ? `, ${data.user.email}` : ''}</h1>
        <Button variant="destructive" onclick={logout}>
            Logout
        </Button>
    </div>
</div>
