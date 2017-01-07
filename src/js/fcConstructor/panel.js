let panel=(function(){

  let fn={},
      defaultPanel={},
      panel,
      removeB,
      linkB,
      addLogicalBlock,
      addOperBlock;

  fn.render = function(actions){
    panel=document.createElement('div');
    panel.setAttribute('id', 'panel');
    if(actions){
      if(actions.onRemove) {
        removeB=document.createElement('span');
        removeB.innerHTML='Remove';
        removeB.addEventListener('click', actions.onRemove);
        panel.appendChild(removeB);
      }
      if(actions.onLink) {
        linkB=document.createElement('span');
        linkB.innerHTML=' Link';
        linkB.addEventListener('click', actions.onLink);
        panel.appendChild(linkB);
      }
      if(actions.onAddStartBlock) {
        addLogicalBlock=document.createElement('span');
        addLogicalBlock.innerHTML=' Add Start block';
        addLogicalBlock.addEventListener('click', actions.onAddStartBlock);
        panel.appendChild(addLogicalBlock);
      }
      if(actions.onAddEndBlock) {
        addLogicalBlock=document.createElement('span');
        addLogicalBlock.innerHTML=' Add End block';
        addLogicalBlock.addEventListener('click', actions.onAddEndBlock);
        panel.appendChild(addLogicalBlock);
      }
      if(actions.onAddLogicalBlock) {
        addLogicalBlock=document.createElement('span');
        addLogicalBlock.innerHTML=' Add X block';
        addLogicalBlock.addEventListener('click', actions.onAddLogicalBlock);
        panel.appendChild(addLogicalBlock);
      }
      if(actions.onAddOperBlock) {
        addOperBlock=document.createElement('span');
        addOperBlock.innerHTML=' Add Y block';
        addOperBlock.addEventListener('click', actions.onAddOperBlock);
        panel.appendChild(addOperBlock);
      }

    }



    document.body.insertBefore(panel,document.body.firstChild);
  };

  return fn;
})();



export {panel};
