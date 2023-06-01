<svelte:options tag="folder-app" />
<script>
	import File from './File.svelte';
	export let resources = [];
</script>

{#each resources as resource}
   <ul style=" padding: 0.5rem 0.938rem 0.5rem 0.938rem; margin: 0 0 0 0.313rem; list-style: none; border-left: 0.05rem solid #3777BC; border-bottom: 0.05rem solid #3777BC;">
    
        {#if resource.category == "Folder"}        
            <button style=" border: none;color: #fff; border-color: #3777bc; background-color: #3777bc; font-weight: 700; box-shadow: 0 0.063rem 0.188rem 0 rgba(0,0,0,.2); width: 4rem; height: 2rem;">{resource.name}</button>
        {/if}
        {#if resource.expanded}        
            {#if resource.resources.length > 0}
                <li style=" padding: 0.5rem 0.938rem 0.5rem 0.938rem">
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
