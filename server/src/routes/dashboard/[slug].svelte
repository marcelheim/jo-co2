<script context="module">
    export async function preload(page, session) {
		const { slug } = page.params;
		return { slug };
	}
</script>
<script>
    export let slug
    if (typeof window !== 'undefined') {
	    // client-only code here
    }
</script>
Einen sensor <br/>
Slug: {slug}