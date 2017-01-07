import {scena} from './scena';
import {panel} from './panel';


let flowchartConstructor=(function(){
  let fn={};


  fn.init=function(){
    // scena.loadItems({
    //   items: [{id:'0', label:'Start', getShape: ()=>'rect'},{id:'1', label:'End', getShape: ()=>'rect'}],
    //   edges: [{from: '0', to: '1', label: 'fff'}]
    // });
    scena.init();
  };

  fn.render=function(){
    panel.render(scena.getActions());
    scena.render();
  };


  return fn;
})();


export {flowchartConstructor};
