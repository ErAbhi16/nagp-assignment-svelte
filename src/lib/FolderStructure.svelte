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
    if(props.name === ""){
      alert("Please input valid Folder/File name");
      return;
    }
    if(props.category === ""){
      alert("Please choose valid category");
      return;
    }

    if(props.category === "File" && localData.length === 0){
      alert("Root Folder doesn't exists !");
      return;
    }

    if(props.category === "Folder" && localData.length === 0 && props.root === false){
      alert("No Root Folder exists, Please check root");
      return;
    }

    if(props.category === "Folder" && props.parent === '' && props.root === false){
      alert("Please check root or select any folder from dropdown");
      return;
    }

    for(var i=0; i < localData.length; i++){
      if(localData[i].name == newResource.name && localData[i].root == newResource.root) {
        alert('File/Folder already exists');
        return;
      }
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
  
    for(var i=0; i < localData.length; i++){
      if(localData[i].name==props.parent) {
        localData[i].resources = [...localData[i].resources , newResource];
      }
    }
  
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
  <label for="form-section">Please enter your details</label>
  <label for="name"><span>Name</span><input type="text" id="name" bind:value={props.name} class="input-field"/></label>
  <label for="category"><span>Category</span><select bind:value={props.category} on:change={onCategoryChange} class="select-field">
    <option value="">
      Select Category
    </option>
    {#each categories as category}
      <option value={category}>
        {category}
      </option>
    {/each}
  </select></label>
  <div hidden={hideRoot}> 
    <label for="rootFolder"><span>Root Folder:</span><input type="checkbox" id="rootFolder" bind:checked={props.root} /></label>
  </div>

  {#if !props.root && resources.length > 0}
    
  <label for="parent"><span>Please choose folders:</span><select id="parent" bind:value={props.parent} class="select-field">
      {#each resources as folderName}
              <option value={folderName}>
                  {folderName}
              </option>
      {/each}
  </select></label>
    
  {/if}
  <label><span> </span><button class="nagp-save" on:click={save}>Save</button>
    <button class="nagp-cancel"on:click={reset}>Cancel</button></label>
  </div>
</div>
  <div class="form-section">
  <div class="nagp-folder">
  <div class="nagp-folder-heading">Folder Heirarchy</div>
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
    padding: 10px;
  }
    .nagp-folder{
      max-width: 500px;
      padding: 20px 12px 10px 20px;
      font: 13px Arial, Helvetica, sans-serif;
      text-align: left;
    }
    .nagp-folder-heading{
      font-weight: bold;
      font-style: italic;
      border-bottom: 2px solid #ddd;
      margin-bottom: 20px;
      font-size: 15px;
      padding-bottom: 3px;
    }
    .nagp-folder label{
      display: block;
      margin: 0px 0px 15px 0px;
    }
    .nagp-folder label > span{
      width: 100px;
      font-weight: bold;
      float: left;
      padding-top: 8px;
      padding-right: 5px;
    }
    .nagp-folder input.input-field, .nagp-folder .select-field{
      width: 48%;	
    }
    .nagp-folder input.input-field, 
     .nagp-folder .select-field{
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      border: 1px solid #C2C2C2;
      box-shadow: 1px 1px 4px #EBEBEB;
      -moz-box-shadow: 1px 1px 4px #EBEBEB;
      -webkit-box-shadow: 1px 1px 4px #EBEBEB;
      border-radius: 3px;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      padding: 8px 15px 8px 15px;
      outline: none;
    }
    .nagp-folder .input-field:focus, 
    .nagp-folder .select-field:focus{
      border: 1px solid #0C0;
    }

    .nagp-cancel{
    color: #3777bc;
    border-color: #fff;
    background-color: #fff;
    font-weight: 700;
    -webkit-box-shadow: 0 1px 3px 0 rgba(0,0,0,.2);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.2);
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
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.2);
    }
   
    </style>