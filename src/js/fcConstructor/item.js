let item=(function(){

  let fn={};

  fn.createItem=function(type, name, count){
    return {
      data      :  count,
      label     :  name,
      type      :  type,
      getShape  :  getShapeByType(type)
    }
  }

  function getShapeByType(type){
    let bType={
      'begin':  ()=>'rect',
      'end':    ()=>'rect',
      'logic':  ()=>'diamond',
      'oper':   ()=>'rect',
    }

    return bType[type];
  }

  return fn;
})();


export  {item};
