<script>
	import Nav from '../components/Nav.svelte';
	export let segment;
</script>

<style windi:preflights:global windi:safelist:global>
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>