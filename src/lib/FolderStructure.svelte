<svelte:options tag="folderstructure-app" />
<script>
  import { onMount } from 'svelte';
  import FolderFilestore from '../stores/FolderFilestore';
  import Folder from './Folder.svelte';

  const categories = ["Folder","File"];

  export let resources = [];

  onMount(() => {
      FolderFilestore.subscribe(items => {
        resources = items.filter(item => item.category === 'Folder' && item.root === true).map(item => item.name);
      });
    });

  let props = {
    name:'',
    root: false,
    resources:[], 
    category:'', 
    parent: '', 
    expanded:true
  }

  let hideRoot = true;

  function onCategoryChange(){
    if(props.category === 'Folder'){
      hideRoot = false;
    }else{
      hideRoot = true;
    }
  }

  function save() {
    const newResource = { ...props};
    let localData = $FolderFilestore;

    if(props.category === ""){
      alert("Please choose valid category");
      return;
    }
        
    if(props.name === ""){
      alert("Please input valid Folder/File name");
      return;
    }

    if(props.category === "Folder" && props.parent === '' && props.root === false){
      alert("Please check root or select any folder from dropdown");
      return;
    }

    if(props.category === "File" && localData.length === 0){
      alert("Root Level Folder doesn't exists . Please create root level folder !");
      return;
    }

    if(props.category === "Folder" && localData.length === 0 && props.root === false){
      alert("No Root Level Folder exists, Please check root");
      return;
    }



  let existsAtSameLevel = localData.some((item) => {
    return item.name === newResource.name && item.root === newResource.root;
  });

  if (existsAtSameLevel) {
    alert('File/Folder already exists at the same level');
    return;
  }
  
    for(var i=0; i < localData.length; i++){
      let resourcesList = localData[i].resources;
      for(var j=0;j<resourcesList.length;j++) {
 
        if(resourcesList[j].name == newResource.name && resourcesList[j].root == newResource.root && resourcesList[j].parent == newResource.parent) {
          alert('File/Folder Name already exists');
          return;
        }
      }
    }
  
  localData = localData.map((item) => {
    if (item.name === props.parent) {
      item.resources = [...item.resources, newResource];
    }
    return item;
  });
  
    FolderFilestore.update(data =>{
      return localData;
    })
  
    if(newResource.parent == '') {
      FolderFilestore.update(arr => [...arr, newResource]);
    }
    
    props.name = '';
    props.category = '';
    props.root = false;
    props.parent = '';
    props.expanded = true;
    hideRoot = true;
  }

  function reset() {
    props.name = '';
    props.category = '';
    props.root = false;
    props.parent = '';
    props.expanded = true;
  }

</script>

<div class="form-container">
  <div class="form-section">
<div class="nagp-folder">
  <label for="form-section" class="nagp-folder-heading">Please enter folder/file details</label>
  <label for="name"><span>Name</span><input type="text" id="name" bind:value={props.name} class="input-field"/></label>
  <label for="category"><span>Category</span><select bind:value={props.category} on:change={onCategoryChange} class="select-field">
    <option value="">
      Select
    </option>
    {#each categories as category}
      <option value={category}>
        {category}
      </option>
    {/each}
  </select></label>
  <div hidden={hideRoot}> 
    <label for="rootFolder"><span>Root Level</span><input type="checkbox" id="rootFolder" bind:checked={props.root} /></label>
  </div>

  {#if !props.root && resources.length > 0}
    
  <label for="parent"><span>Select folder</span><select id="parent" bind:value={props.parent} class="select-field">
      {#each resources as folderName}
              <option value={folderName}>
                  {folderName}
              </option>
      {/each}
  </select></label>
    
  {/if}
  <label><button class="nagp-save" on:click={save}>Save</button>
    <button class="nagp-cancel"on:click={reset}>Cancel</button></label>
  </div>
</div>
  <div class="form-section">
  <div class="nagp-folder">
  <div class="nagp-folder-heading">Folder Structure</div>
    <Folder resources={$FolderFilestore}></Folder>
  </div>
  </div>
  </div>


  <style type="text/css">
    .form-container {
    display: flex;
    justify-content: space-between;
  }

  .form-section {
    flex-basis: 50%;
    padding: 0.625rem;
  }
    .nagp-folder{
      max-width: 31.25rem;
      padding: 1.25rem 0.75rem 0.625rem 1.25rem;
      font: 0.125rem Lato;
      text-align: left;
    }
    .nagp-folder-heading{
      font-weight: bold;
      font-style: italic;
      margin-bottom: 1.25rem;
      font-size: 0.938rem;
      padding-bottom:0.188rem;
    }
    .nagp-folder label{
      display: block;
      margin: 0rem 0rem 0.938rem 0rem;
    }
    .nagp-folder label > span{
      width: 6.25rem;
      font-weight: bold;
      float: left;
      padding-top: 0.5rem;
      padding-right: 0.313rem;
      font-size: 0.90rem;
    }
    .nagp-folder input.input-field, .nagp-folder .select-field{
      width: 45%;	
    }
    .nagp-folder input.input-field, 
     .nagp-folder .select-field{
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      border: 0.063rem solid #C2C2C2;
      padding: 0.5rem 0.938rem 0.5rem 0.938rem;
      outline: none;
    }

    .nagp-cancel{
    color: #3777bc;
    border-color: #fff;
    background-color: #fff;
    font-weight: 700;
    -webkit-box-shadow: 0 0.063rem 0.188rem 0 rgba(0,0,0,.2);
    box-shadow: 0 0.063rem 0.188rem 0 rgba(0,0,0,.2);
    width: 6rem;
    height: 2rem;
    margin-left: 0.5rem;
    cursor: pointer;
    }

    .nagp-cancel:hover {
    color: #2969ad;
    }

    .nagp-save:hover {
    color: #fff;
    }

    .nagp-save{
    color: #fff;
    border-color: #3777bc;
    background-color: #3777bc;
    font-weight: 700;
    box-shadow: 0 0.063rem 0.188rem 0 rgba(0,0,0,.2);
    width: 6rem;
    height: 2rem;
    cursor: pointer;
    }
   
    </style>