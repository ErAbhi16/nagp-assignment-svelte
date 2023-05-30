<svelte:options tag="folderview-app" />
<script>
	import File from './File.svelte';

	export let files = [];

	function toggle(file) {
		let newItem = {
            category: "",
        };

        files = [...files, newItem];
        file.expanded = !file.expanded;
        files = files.filter((it) => it.category != "");
	}
</script>

{#each files as file}
    <ul
        style=" padding: 8px 15px 8px 15px;
   margin: 0 0 0 5px;
   list-style: none;
   border-left: 1px solid #eee;"
    >
    
        {#if file.category == "Folder"}
        
            <button
                style=" border: none;
				padding: 8px 15px 8px 15px;
				background: #3777bc;;
				color: #fff;
				box-shadow: 1px 1px 4px #DADADA;
				-moz-box-shadow: 1px 1px 4px #DADADA;
				-webkit-box-shadow: 1px 1px 4px #DADADA;
				border-radius: 3px;
				-webkit-border-radius: 3px;
				-moz-border-radius: 3px;"
                on:click={() => toggle(file)}>
                {file.name}
                </button
            >
        {/if}

        {#if file.expanded}
        
            {#if file.files.length > 0}
                <li style=" padding: 8px 15px 8px 15px">
                    <svelte:self {...file} />
                </li>
            {:else if file.category == "File"}
                <li>
                    <File {...file} />
                </li>
            {/if}
        {/if}
    </ul>
{/each}

<!-- <style>
	button {
		padding: 0 0 0 1.5em;
		background-size: 1em 1em;
		font-weight: bold;
		cursor: pointer;
		border: none;
		margin: 0;
	}


	ul {
		padding: 0.2em 0 0 0.5em;
		margin: 0 0 0 0.5em;
		list-style: none;
		border-left: 1px solid #eee;
	}

	li {
		padding: 0.2em 0;
	}
</style> -->
