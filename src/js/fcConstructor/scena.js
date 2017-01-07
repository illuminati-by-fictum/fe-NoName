import dagreD3  from 'dagre-d3';
import d3 from 'd3';
import $ from 'jquery';
import {item} from './item';


let scena=(function(){
  let fn={},
      g,      //graph
      svg,
      selectedElements={},
      render;    //svg canvas

  fn.init=function() {
    if(!this.items) this.items=[];
    if(!this.edges) this.edges=[];

    this.g = new dagreD3.graphlib.Graph().setGraph({})
                .setDefaultEdgeLabel(function () {
                    return {};
                });

    for(let i in this.items){
      this.g.setNode(this.items[i].id, {label: this.items[i].label, shape: this.items[i].getShape()});
    }
    for(let i in this.edges){
      if(this.edges[i].label) this.g.setEdge(this.edges[i].from, this.edges[i].to, {label:this.edges[i].label});
      else this.g.setEdge(this.edges[i].from, this.edges[i].to);
    }
    // Round the corners of the nodes
    this.g.nodes().forEach( (v) => {
        let node = this.g.node(v);
        node.rx = node.ry = 5;
    });

    this.g.edges().forEach( (e) => {
        let edge = this.g.edge(e.v, e.w);
        edge.lineInterpolate = 'basis';
    });

    g=this.g;
  };

  fn.loadItems=function(itemObjs) {
      this.items=itemObjs.items;
      this.edges=itemObjs.edges;
  };


  fn.addItem=function(item){

  };

  fn.removeItem=function(){

  };


  fn.bindEventListeners=function(){
    let nodeDrag = d3.behavior.drag()
        .on("dragstart", dragstart)
        .on("drag", dragmove);
    let edgeDrag = d3.behavior.drag()
        .on("dragstart", dragstart)
        .on('drag', function (d) {
            translateEdge(g.edge(d.v, d.w), d3.event.dx, d3.event.dy);
            $('#' + g.edge(d.v, d.w).customId).attr('d', calcPoints(d));
        });

    nodeDrag.call(svg.selectAll("g.node"));
    edgeDrag.call(svg.selectAll("g.edgePath"));
    svg.selectAll("g.node")
      .on('click', function(d){
        let node = d3.select(this);
        let selectedNode = g.node(d);
        if(!selectedElements.from||(selectedElements.from&&selectedElements.to))
          selectedElements.from={data:d , nodeEntity: g.node(d)};
        else
          selectedElements.to={data:d , nodeEntity: g.node(d)};

        selectedElements.lastAdded={data:d , nodeEntity: g.node(d)};
      });

    svg.selectAll("g.edgePath")
      .on('click', function(d){
        // this.edges=this.edges.filter(item=>!(item.from==d.v&&item.to==d.w)); //toRemove
        selectedElements={edge:{data: d, edgeEntity:g.edge(d.v, d.w)}};
      })
  };

  fn.render=function(){

    // Create the renderer
    render = new dagreD3.render();

    // Set up an SVG group so that we can translate the final graph.
    svg = d3.select("svg");

    if(svg.select("g"))
      svg.select("g").remove();
    let inner = svg.append("g");

    // Set up zoom support
    var zoom = d3.behavior.zoom().on("zoom", function () {
        inner.attr("transform", "translate(" + d3.event.translate + ")" +
            "scale(" + d3.event.scale + ")");
    });
    svg.call(zoom);

    // Run the renderer. This is what draws the final graph.
    render(inner, g);
    this.afterRender();
  };


  fn.afterRender=function(){
    //give IDs to each of the nodes so that they can be accessed
    svg.selectAll("g.node rect")
        .attr("id", function (d) {
        return "node" + d;
    });
    svg.selectAll("g.edgePath path")
        .attr("id", function (e) {
        return e.v + "-" + e.w;
    });
    svg.selectAll("g.edgeLabel g")
        .attr("id", function (e) {
        return 'label_'+e.v + "-" + e.w;
    });

    svg.selectAll("g.node g")
        .attr("id", function (e) {
        return 'label_'+e;
    });
    g.nodes().forEach(function (v) {
        let node = g.node(v);
        node.customId = "node" + v;
    })
    g.edges().forEach(function (e) {
        let edge = g.edge(e.v, e.w);
        edge.customId = e.v + "-" + e.w
    });


    this.bindEventListeners();
  }



  fn.getActions=function(){
    let _this=this;
    return {
      onRemove          : ()  =>  _this.onRemove(),
      onLink            : ()  =>  _this.onLink(),
      onAddStartBlock   : ()  =>  _this.onAddStartBlock(),
      onAddEndBlock     : ()  =>  _this.onAddEndBlock(),
      onAddOperBlock    : ()  =>  _this.onAddOperBlock()
    }
  }

  fn.removeEdge=function(edge){
    let edg=edge?edge:selectedElements.edge;
    this.edges=this.edges.filter(item=>!(item.from==edg.data.v&&item.to==edg.data.w)); //toRemove
    let _edges={};
    let _edgesLabels={};
    for(let i in g._edgeObjs){
      if(!(g._edgeObjs[i].v==edg.data.v&&g._edgeObjs[i].w==edg.data.w)){
         _edges[i]=g._edgeObjs[i];
         _edgesLabels[i]=g._edgeLabels[i];
      }
    }
    g._edgeObjs=_edges;
    g._edgeCount=Object.keys(_edges).length;
    g._edgeLabels=_edgesLabels;
    let edgeEl = document.getElementById(edg.edgeEntity.customId);
    edgeEl.parentNode.removeChild(edgeEl);
    let edgeLabel = document.getElementById('label_'+edg.data.v + "-" + edg.data.w);
    edgeLabel.parentNode.removeChild(edgeLabel);
    g.removeEdge(
                  edg.data.v,
                  edg.data.w,
                  edg.data.v+edg.data.w
                );
  }

  fn.onRemove=function(){
    if(selectedElements.edge) this.removeEdge();
    if(selectedElements.lastAdded){
      this.items=this.items.filter(item=>item.data!=selectedElements.lastAdded.data);
      delete g._nodes[selectedElements.lastAdded.data];
      g._nodeCount=Object.keys(g._nodes).length;
      let nodeEl = document.getElementById(selectedElements.lastAdded.nodeEntity.customId);
      nodeEl.parentNode.removeChild(nodeEl);
      let nodeLabel = document.getElementById('label_'+selectedElements.lastAdded.data);
      nodeLabel.parentNode.removeChild(nodeLabel);

      g.removeEdge(selectedElements.lastAdded.data);

      for(let i in this.edges){
        if(this.edges[i].from==selectedElements.lastAdded.data||this.edges[i].to==selectedElements.lastAdded.data){
          this.removeEdge({data: {v: this.edges[i].from, w: this.edges[i].to}, edgeEntity:g.edge(this.edges[i].from, this.edges[i].to)});
        }
      }

      selectedElements={};
    }
  }



  fn.onLink=function(){
    if(!(g.edge(selectedElements.from.data,selectedElements.to.data) && g.edge(selectedElements.to.data,selectedElements.from.data))){
      this.edges[selectedElements.from.data+""+selectedElements.to.data]={from:selectedElements.from.data, to:selectedElements.to.data};
      g.setEdge(selectedElements.from.data,selectedElements.to.data);
    }
    selectedElements={};
    this.render();
    this.afterRender();
  }

  fn.onAddStartBlock=function(){
    console.log("in1");
    this.items.push(item.createItem('begin', 'Start', this.items.length));
    for(let i in this.items){
      this.g.setNode(this.items[i].data, {label: this.items[i].label, shape: this.items[i].getShape()});
    }

    // Round the corners of the nodes
    this.g.nodes().forEach( (v) => {
        let node = this.g.node(v);
        node.rx = node.ry = 5;
    });
    this.render();
    this.afterRender();
  }
  fn.onAddEndBlock=function(){
    this.items.push(item.createItem('end', 'End', this.items.length));

    for(let i in this.items){
      this.g.setNode(this.items[i].data, {label: this.items[i].label, shape: this.items[i].getShape()});
    }

    // Round the corners of the nodes
    this.g.nodes().forEach( (v) => {
        let node = this.g.node(v);
        node.rx = node.ry = 5;
    });
    this.render();
    this.afterRender();
  }

  fn.onAddOperBlock=function(){
    let b = true;
    let varNumbers=[];

    while(b){

      varNumbers.push(prompt("Enter Y number", 'default'));
      b=confirm("Enter more Y ?");

    }
    let name="";
    for(let i in varNumbers) name+="Y"+varNumbers[i]+" ";

    this.items.push(item.createItem('oper', name, this.items.length));
    for(let i in this.items){
      this.g.setNode(this.items[i].data, {label: this.items[i].label, shape: this.items[i].getShape()});
    }

    // Round the corners of the nodes
    this.g.nodes().forEach( (v) => {
        let node = this.g.node(v);
        node.rx = node.ry = 5;
    });
    this.render();
    this.afterRender();
  }
  //private functions

  function dragstart(d) {
      d3.event.sourceEvent.stopPropagation();
  }

  function dragmove(d) {
      var node = d3.select(this),
          selectedNode = g.node(d);
      var prevX = selectedNode.x,
          prevY = selectedNode.y;

      selectedNode.x += d3.event.dx;
      selectedNode.y += d3.event.dy;
      node.attr('transform', 'translate(' + selectedNode.x + ',' + selectedNode.y + ')');

      var dx = selectedNode.x - prevX,
          dy = selectedNode.y - prevY;

      g.edges().forEach(function (e) {
          if (e.v == d || e.w == d) {
              let edge = g.edge(e.v, e.w);
              translateEdge(g.edge(e.v, e.w), dx, dy);
              $('#' + edge.customId).attr('d', calcPoints(e));
              let label = $('#label_' + edge.customId);
  			var xforms = label.attr('transform');
              if (xforms != "") {
                  var parts  = /translate\(\s*([^\s,)]+)[ ,]?([^\s,)]+)?/.exec(xforms);
                  var X = parseInt(parts[1])+dx, Y = parseInt(parts[2])+dy;
                  console.log(X,Y);
                  if (isNaN(Y)) {
                      Y = dy;
                  }
                  label.attr('transform','translate('+X+','+Y+')');
              }
          }
      })
  }

  function translateEdge(e, dx, dy) {
      e.points.forEach(function (p) {
          p.x = p.x + dx;
          p.y = p.y + dy;
      });
  }

  function calcPoints(e) {
      var edge = g.edge(e.v, e.w),
          tail = g.node(e.v),
          head = g.node(e.w);
      var points = edge.points.slice(1, edge.points.length - 1);
      var afterslice = edge.points.slice(1, edge.points.length - 1)
      points.unshift(intersectRect(tail, points[0]));
      points.push(intersectRect(head, points[points.length - 1]));
      return d3.svg.line()
          .x(function (d) {
          return d.x;
      })
          .y(function (d) {
          return d.y;
      })
          .interpolate("basis")
      (points);
  }

  function intersectRect(node, point) {
      var x = node.x;
      var y = node.y;
      var dx = point.x - x;
      var dy = point.y - y;
      var w = $("#" + node.customId).attr('width') / 2;
      var h = $("#" + node.customId).attr('height') / 2;
      var sx = 0,
          sy = 0;
      if (Math.abs(dy) * w > Math.abs(dx) * h) {
          // Intersection is top or bottom of rect.
          if (dy < 0) {
              h = -h;
          }
          sx = dy === 0 ? 0 : h * dx / dy;
          sy = h;
      } else {
          // Intersection is left or right of rect.
          if (dx < 0) {
              w = -w;
          }
          sx = w;
          sy = dx === 0 ? 0 : w * dy / dx;
      }
      return {
          x: x + sx,
          y: y + sy
      };
  }


  return fn;
})();


export {scena};
