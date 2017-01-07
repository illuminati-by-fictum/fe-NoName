import dagreD3  from 'dagre-d3';
import d3 from 'd3';
import $ from 'jquery';
import {flowchartConstructor} from './fcConstructor';

window.d3=d3;


flowchartConstructor.init();
flowchartConstructor.render();





//
//
//
// var g = new dagreD3.graphlib.Graph().setGraph({})
//         .setDefaultEdgeLabel(function () {
//         return {};
// });
//
//
// g.setNode(0, {
//     label: "TOP",
// });
// g.setNode(1, {
//     label: "S",
// });
// g.setNode(2, {
//     label: "NP",
// });
// g.setNode(3, {
//     label: "DT",
// });
// g.setNode(4, {
//     label: "This",
// });
// g.setNode(5, {
//     label: "VP",
// });
// g.setNode(6, {
//     label: "VBZ",
// });
// g.setNode(7, {
//     label: "is",
// });
// g.setNode(8, {
//     label: "NP",
// });
// g.setNode(9, {
//     label: "DT",
// });
// g.setNode(10, {
//     label: "an",
// });
// g.setNode(11, {
//     label: "NN",
// });
// g.setNode(12, {
//     label: "example",
// });
// g.setNode(13, {
//     label: ".",
// });
// g.setNode(14, {
//     label: "sentence",
// });
//
// g.setEdge(3, 4, {label:'test'});
// g.setEdge(2, 3);
// g.setEdge(1, 2);
// g.setEdge(6, 7);
// g.setEdge(5, 6);
// g.setEdge(9, 10);
// g.setEdge(8, 9);
// g.setEdge(11, 12);
// g.setEdge(8, 11);
// g.setEdge(5, 8);
// g.setEdge(1, 5);
// g.setEdge(13, 14);
// g.setEdge(1, 13);
// g.setEdge(0, 1);
//
//
// // Round the corners of the nodes
// g.nodes().forEach(function (v) {
//     var node = g.node(v);
//     node.rx = node.ry = 5;
// });
//
// //makes the lines smooth
// g.edges().forEach(function (e) {
//     var edge = g.edge(e.v, e.w);
//     edge.lineInterpolate = 'basis';
// });
//
// // Create the renderer
// var render = new dagreD3.render();
//
// // Set up an SVG group so that we can translate the final graph.
// var svg = d3.select("svg"),
//     inner = svg.append("g");
//
// // Set up zoom support
// var zoom = d3.behavior.zoom().on("zoom", function () {
//     inner.attr("transform", "translate(" + d3.event.translate + ")" +
//         "scale(" + d3.event.scale + ")");
// });
// svg.call(zoom);
//
// // Run the renderer. This is what draws the final graph.
// render(inner, g);
//
// // Center the graph
// var initialScale = 1.0;
// zoom.translate([(svg.attr("width") - g.graph().width * initialScale) / 2, 20])
//     .scale(initialScale)
//     .event(svg);
// svg.attr("height", g.graph().height * initialScale + 40);
//
//
// //code for drag
//
// //give IDs to each of the nodes so that they can be accessed
// svg.selectAll("g.node rect")
//     .attr("id", function (d) {
//     return "node" + d;
// });
// svg.selectAll("g.edgePath path")
//     .attr("id", function (e) {
//     return e.v + "-" + e.w;
// });
// svg.selectAll("g.edgeLabel g")
//     .attr("id", function (e) {
//     return 'label_'+e.v + "-" + e.w;
// });
//
// g.nodes().forEach(function (v) {
//     var node = g.node(v);
//     node.customId = "node" + v;
// })
// g.edges().forEach(function (e) {
//     var edge = g.edge(e.v, e.w);
//     edge.customId = e.v + "-" + e.w
// });
//
//
// var nodeDrag = d3.behavior.drag()
//     .on("dragstart", dragstart)
//     .on("drag", dragmove);
//
//
// var edgeDrag = d3.behavior.drag()
//     .on("dragstart", dragstart)
//     .on('drag', function (d) {
//         translateEdge(g.edge(d.v, d.w), d3.event.dx, d3.event.dy);
//         $('#' + g.edge(d.v, d.w).customId).attr('d', calcPoints(d));
//     });
//
// nodeDrag.call(svg.selectAll("g.node"));
// edgeDrag.call(svg.selectAll("g.edgePath"));
//
//
// svg.selectAll("g.node")
//   .on('click', function(d){
//     let node = d3.select(this);
//     let selectedNode = g.node(d);
//     console.log(node);
//     console.log(selectedNode);
//   })
//
// function dragstart(d) {
//     d3.event.sourceEvent.stopPropagation();
// }
//
// function dragmove(d) {
//     var node = d3.select(this),
//         selectedNode = g.node(d);
//     var prevX = selectedNode.x,
//         prevY = selectedNode.y;
//
//     selectedNode.x += d3.event.dx;
//     selectedNode.y += d3.event.dy;
//     node.attr('transform', 'translate(' + selectedNode.x + ',' + selectedNode.y + ')');
//
//     var dx = selectedNode.x - prevX,
//         dy = selectedNode.y - prevY;
//
//     g.edges().forEach(function (e) {
//         if (e.v == d || e.w == d) {
//             let edge = g.edge(e.v, e.w);
//             translateEdge(g.edge(e.v, e.w), dx, dy);
//             $('#' + edge.customId).attr('d', calcPoints(e));
//             let label = $('#label_' + edge.customId);
// 			var xforms = label.attr('transform');
//             if (xforms != "") {
//                 var parts  = /translate\(\s*([^\s,)]+)[ ,]?([^\s,)]+)?/.exec(xforms);
//                 var X = parseInt(parts[1])+dx, Y = parseInt(parts[2])+dy;
//                 console.log(X,Y);
//                 if (isNaN(Y)) {
//                     Y = dy;
//                 }
//                 label.attr('transform','translate('+X+','+Y+')');
//             }
//         }
//     })
// }
//
//
// function translateEdge(e, dx, dy) {
//     e.points.forEach(function (p) {
//         p.x = p.x + dx;
//         p.y = p.y + dy;
//     });
// }
//
// //taken from dagre-d3 source code (not the exact same)
// function calcPoints(e) {
//     var edge = g.edge(e.v, e.w),
//         tail = g.node(e.v),
//         head = g.node(e.w);
//     var points = edge.points.slice(1, edge.points.length - 1);
//     var afterslice = edge.points.slice(1, edge.points.length - 1)
//     points.unshift(intersectRect(tail, points[0]));
//     points.push(intersectRect(head, points[points.length - 1]));
//     return d3.svg.line()
//         .x(function (d) {
//         return d.x;
//     })
//         .y(function (d) {
//         return d.y;
//     })
//         .interpolate("basis")
//     (points);
// }
//
// //taken from dagre-d3 source code (not the exact same)
// function intersectRect(node, point) {
//     var x = node.x;
//     var y = node.y;
//     var dx = point.x - x;
//     var dy = point.y - y;
//     var w = $("#" + node.customId).attr('width') / 2;
//     var h = $("#" + node.customId).attr('height') / 2;
//     var sx = 0,
//         sy = 0;
//     if (Math.abs(dy) * w > Math.abs(dx) * h) {
//         // Intersection is top or bottom of rect.
//         if (dy < 0) {
//             h = -h;
//         }
//         sx = dy === 0 ? 0 : h * dx / dy;
//         sy = h;
//     } else {
//         // Intersection is left or right of rect.
//         if (dx < 0) {
//             w = -w;
//         }
//         sx = w;
//         sy = dx === 0 ? 0 : w * dy / dx;
//     }
//     return {
//         x: x + sx,
//         y: y + sy
//     };
// }
