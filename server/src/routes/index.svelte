<script>
	import { stores } from '@sapper/app';
	const { session } = stores();
</script>

<svelte:head>
	<title>Jo-CO₂</title>
</svelte:head>
  
{#if $session.isAuthenticated}
<div>
	Signed in as <strong>{$session.user.name}</strong>
	| <a href="/logout">Sign out</a>
</div>
{:else}
<a href="/login">Sign In</a>
{/if}

<pre>
{JSON.stringify($session, null, 2)}
</pre>