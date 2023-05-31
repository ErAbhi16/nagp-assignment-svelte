<svelte:options tag="folderview-app" />
<script>
	import File from './File.svelte';

	export let resources = [];

	function toggle(resource) {
		let newItem = {
            category: "",
        };

        resources = [...resources, newItem];
        resource.expanded = !resource.expanded;
        resources = resources.filter((item) => item.category != "");
	}
</script>

{#each resources as resource}
   <ul
        style=" padding: 8px 15px 8px 15px;
   margin: 0 0 0 5px;
   list-style: none;
   border-left: 1px solid #eee;"
    >
    
        {#if resource.category == "Folder"}
        
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
                on:click={() => toggle(resource)}>
                {resource.name}
                </button
            >
        {/if}

        {#if resource.expanded}
        
            {#if resource.resources.length > 0}
                <li style=" padding: 8px 15px 8px 15px">
                    <svelte:self {...resource} />
                </li>
            {:else if resource.category == "File"}
                <li>
                    <File {...resource} />
                </li>
            {/if}
        {/if}
    </ul>
{/each}
