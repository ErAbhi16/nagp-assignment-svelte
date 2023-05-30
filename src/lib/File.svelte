<svelte:options tag="fileview-app" />
<script>
	export let name;
</script>

<span style=" border: none;
padding: 8px 1px 8px 1px;
font-weight: bold;
text-align: left;
color: #3777bc;
border-radius: 3px;
-webkit-border-radius: 3px;
-moz-border-radius: 3px;">{name}</span>

<style>
	span {
		padding: 0 0 0 1.5em;
		background: 0 0.1em no-repeat;
		background-size: 1em 1em;
	}
</style>
