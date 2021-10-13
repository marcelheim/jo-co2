<script>
	export let segment;
</script>

<nav class="flex">
	<ul class="flex justify-between w-full">
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">home</a></li>
		<li><a aria-current="{segment === 'dashboard' ? 'page' : undefined}" href="dashboard">dashboard</a></li>
		<li><a aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a></li>
	</ul>
</nav>