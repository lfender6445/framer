require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"flipCard":[function(require,module,exports){
exports.flipCard = function(front, back, perspective, flipCurve, resultContainer) {
  var container, perspectiveLayer;
  perspectiveLayer = new Layer({
    width: front.width,
    height: front.height,
    x: front.x,
    y: front.y,
    backgroundColor: "transparent",
    superLayer: resultContainer
  });
  resultContainer.perspective = perspective;
  container = new Layer({
    width: front.width,
    height: front.height,
    backgroundColor: "transparent",
    superLayer: perspectiveLayer
  });
  back.superLayer = container;
  front.superLayer = container;
  front.x = 0;
  front.y = 0;
  back.x = 0;
  back.y = 0;
  front.states.add({
    front: {
      opacity: 1
    },
    back: {
      opacity: 0
    }
  });
  front.states.animationOptions = {
    curve: flipCurve
  };
  front.states.switchInstant("front");
  back.states.add({
    front: {
      opacity: 0
    },
    back: {
      opacity: 1
    }
  });
  back.states.animationOptions = {
    curve: flipCurve
  };
  container.states.add({
    front: {
      rotationY: 0
    },
    back: {
      rotationY: 180
    }
  });
  container.states.animationOptions = {
    curve: flipCurve
  };
  container.states.switchInstant("front");
  container.on(Events.Click, function() {
    this.states.next(["back", "front"]);
    return front.states.next(["back", "front"]);
  });
  return perspectiveLayer;
};


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}],"slide":[function(require,module,exports){
exports.slider = function() {
  var addBars, bars, createSlider, drawGraph, drawPrices, extractCount, extractPrice, graph, max, priceBar, priceRange, slider, sliderArea, sliderBar, sliderMax, sliderMin, state, updateState, widget;
  widget = new Layer({
    height: 650,
    width: 750
  });
  graph = new Layer({
    parent: widget,
    width: 506,
    height: 400,
    x: 122,
    y: 49
  });
  slider = new Layer({
    parent: widget,
    height: 98,
    width: 750,
    y: 465
  });
  sliderArea = new Layer({
    parent: slider,
    height: 60,
    width: 545,
    x: 103,
    y: 17
  });
  sliderBar = new Layer({
    parent: sliderArea,
    height: 13,
    width: 545,
    y: 25,
    backgroundColor: "rgba(48,31,255,0.8)"
  });
  priceBar = new Layer({
    parent: widget,
    width: 545,
    height: 54,
    y: 580,
    x: 103
  });
  createSlider = function(x) {
    slider = new Layer({
      parent: sliderArea,
      height: 60,
      width: 32,
      x: x,
      backgroundColor: "rgba(55,152,197,0.5)"
    });
    slider.draggable.vertical = false;
    slider.draggable.constraints = {
      width: 545
    };
    slider.draggable.overdrag = false;
    slider.draggable.momentum = false;
    return slider;
  };
  addBars = function(ranges) {
    var bars, i, j, layer, len, n, width;
    width = Math.floor((graph.width - 5) / ranges.length);
    bars = [];
    for (j = 0, len = ranges.length; j < len; j++) {
      i = ranges[j];
      n = ranges.indexOf(i);
      layer = new Layer({
        width: 40,
        height: 0,
        x: 5 + width * n,
        y: 5,
        backgroundColor: "rgba(89,233,5,100)"
      });
      bars.push(layer);
      graph.addChild(layer);
    }
    graph.rotationX = 180;
    return bars;
  };
  drawPrices = function(ranges) {
    var i, j, len, n, price, priceLayer, prices, results, width;
    width = Math.floor((priceBar.width - 5) / ranges.length);
    prices = ranges.map(extractPrice);
    results = [];
    for (j = 0, len = ranges.length; j < len; j++) {
      i = ranges[j];
      n = ranges.indexOf(i);
      price = prices[n];
      priceLayer = new Layer({
        height: 15,
        width: 35,
        x: 5 + width * n,
        y: 5
      });
      if (price >= 1000) {
        priceLayer.html = "" + (price / 1000) + "k";
      } else {
        priceLayer.html = price;
      }
      results.push(priceBar.addChild(priceLayer));
    }
    return results;
  };
  max = function(numbers) {
    return numbers.reduce(function(largest, price) {
      if (price > largest) {
        return price;
      } else {
        return largest;
      }
    });
  };
  extractPrice = function(step, i) {
    return step[0];
  };
  extractCount = function(step, i) {
    return step[1];
  };
  drawGraph = function(range, bars, options) {
    var color, count, i, j, len, maxCount, maxHeight, n, price, results;
    maxHeight = graph.height - 10;
    maxCount = max(range.map(extractCount));
    results = [];
    for (j = 0, len = range.length; j < len; j++) {
      i = range[j];
      n = range.indexOf(i);
      price = i[0];
      count = i[1];
      color = options["activeColor"];
      if (n < options["goneBefore"] || n > options["goneAfter"]) {
        count = 0;
      } else if (n < options["disabledBefore"] || n > options["disabledAfter"]) {
        color = options["disabledColor"];
      }
      bars[n].height = count / maxCount * maxHeight;
      results.push(bars[n].backgroundColor = color);
    }
    return results;
  };
  updateState = function(slider, property) {
    state[property] = Math.round(slider.point["x"] / 55);
    return drawGraph(priceRange, bars, state);
  };
  priceRange = [[500, 4], [700, 8], [900, 12], [1100, 15], [1300, 20], [1500, 25], [2000, 28], [3000, 20], [4000, 4], [5000, 1]];
  sliderMin = createSlider(0);
  sliderMax = createSlider(513);
  state = {
    activeColor: "green",
    disabledColor: "yellow",
    disabledBefore: 0,
    disabledAfter: 9,
    goneBefore: 0,
    goneAfter: 9
  };
  drawPrices(priceRange);
  bars = addBars(priceRange);
  drawGraph(priceRange, bars, state);
  sliderMin.onDrag(function() {
    return updateState(this, "disabledBefore");
  });
  sliderMin.onDragEnd(function() {
    return updateState(this, "goneBefore");
  });
  sliderMax.onDrag(function() {
    return updateState(this, "disabledAfter");
  });
  sliderMax.onDragEnd(function() {
    return updateState(this, "goneAfter");
  });
  return [widget, sliderMin, sliderMax];
};


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbGZlbmRlci9EZXNrdG9wL3NycC5mcmFtZXIvbW9kdWxlcy9mbGlwQ2FyZC5jb2ZmZWUiLCIvVXNlcnMvbGZlbmRlci9EZXNrdG9wL3NycC5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIvVXNlcnMvbGZlbmRlci9EZXNrdG9wL3NycC5mcmFtZXIvbW9kdWxlcy9zbGlkZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxPQUFPLENBQUMsUUFBUixHQUFtQixTQUFDLEtBQUQsRUFBUSxJQUFSLEVBQWMsV0FBZCxFQUEyQixTQUEzQixFQUFzQyxlQUF0QztBQUNqQixNQUFBO0VBQUEsZ0JBQUEsR0FBdUIsSUFBQSxLQUFBLENBQ3JCO0lBQUEsS0FBQSxFQUFPLEtBQUssQ0FBQyxLQUFiO0lBQ0EsTUFBQSxFQUFRLEtBQUssQ0FBQyxNQURkO0lBRUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQUZUO0lBR0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQUhUO0lBSUEsZUFBQSxFQUFpQixhQUpqQjtJQUtBLFVBQUEsRUFBWSxlQUxaO0dBRHFCO0VBVXZCLGVBQWUsQ0FBQyxXQUFoQixHQUE4QjtFQUM5QixTQUFBLEdBQWdCLElBQUEsS0FBQSxDQUNaO0lBQUEsS0FBQSxFQUFPLEtBQUssQ0FBQyxLQUFiO0lBQ0EsTUFBQSxFQUFRLEtBQUssQ0FBQyxNQURkO0lBRUEsZUFBQSxFQUFpQixhQUZqQjtJQUdBLFVBQUEsRUFBWSxnQkFIWjtHQURZO0VBT2hCLElBQUksQ0FBQyxVQUFMLEdBQWtCO0VBQ2xCLEtBQUssQ0FBQyxVQUFOLEdBQW1CO0VBQ25CLEtBQUssQ0FBQyxDQUFOLEdBQVU7RUFDVixLQUFLLENBQUMsQ0FBTixHQUFVO0VBQ1YsSUFBSSxDQUFDLENBQUwsR0FBUztFQUNULElBQUksQ0FBQyxDQUFMLEdBQVM7RUFDVCxLQUFLLENBQUMs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SUFBRCxFQUFPLENBQVAsQ0FWVztFQWFiLFNBQUEsR0FBWSxZQUFBLENBQWEsQ0FBYjtFQUNaLFNBQUEsR0FBWSxZQUFBLENBQWEsR0FBYjtFQUVaLEtBQUEsR0FBUTtJQUNOLFdBQUEsRUFBYSxPQURQO0lBRU4sYUFBQSxFQUFlLFFBRlQ7SUFHTixjQUFBLEVBQWdCLENBSFY7SUFJTixhQUFBLEVBQWUsQ0FKVDtJQUtOLFVBQUEsRUFBWSxDQUxOO0lBTU4sU0FBQSxFQUFXLENBTkw7O0VBU1IsVUFBQSxDQUFXLFVBQVg7RUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLFVBQVI7RUFDUCxTQUFBLENBQVUsVUFBVixFQUFzQixJQUF0QixFQUE0QixLQUE1QjtFQUVBLFNBQVMsQ0FBQyxNQUFWLENBQWlCLFNBQUE7V0FBRyxXQUFBLENBQVksSUFBWixFQUFrQixnQkFBbEI7RUFBSCxDQUFqQjtFQUNBLFNBQVMsQ0FBQyxTQUFWLENBQW9CLFNBQUE7V0FBRyxXQUFBLENBQVksSUFBWixFQUFrQixZQUFsQjtFQUFILENBQXBCO0VBQ0EsU0FBUyxDQUFDLE1BQVYsQ0FBaUIsU0FBQTtXQUFHLFdBQUEsQ0FBWSxJQUFaLEVBQWtCLGVBQWxCO0VBQUgsQ0FBakI7RUFDQSxTQUFTLENBQUMsU0FBVixDQUFvQixTQUFBO1dBQUcsV0FBQSxDQUFZLElBQVosRUFBa0IsV0FBbEI7RUFBSCxDQUFwQjtTQUNBLENBQUMsTUFBRCxFQUFTLFNBQVQsRUFBb0IsU0FBcEI7QUEvSmUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0cy5mbGlwQ2FyZCA9IChmcm9udCwgYmFjaywgcGVyc3BlY3RpdmUsIGZsaXBDdXJ2ZSwgcmVzdWx0Q29udGFpbmVyKSAtPlxuICBwZXJzcGVjdGl2ZUxheWVyID0gbmV3IExheWVyXG4gICAgd2lkdGg6IGZyb250LndpZHRoXG4gICAgaGVpZ2h0OiBmcm9udC5oZWlnaHRcbiAgICB4OiBmcm9udC54XG4gICAgeTogZnJvbnQueVxuICAgIGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG4gICAgc3VwZXJMYXllcjogcmVzdWx0Q29udGFpbmVyXG5cbiAgIyBwZXJzcGVjdGl2ZUxheWVyLnN0eWxlID0gYm9yZGVyOiAnMXB4IHJlZCBzb2xpZCdcblxuICByZXN1bHRDb250YWluZXIucGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZVxuICBjb250YWluZXIgPSBuZXcgTGF5ZXJcbiAgICAgIHdpZHRoOiBmcm9udC53aWR0aFxuICAgICAgaGVpZ2h0OiBmcm9udC5oZWlnaHRcbiAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG4gICAgICBzdXBlckxheWVyOiBwZXJzcGVjdGl2ZUxheWVyXG5cbiAgIyBjb250YWluZXIuc3R5bGUgPSBib3JkZXI6ICcxcHggYmx1ZSBzb2xpZCdcbiAgYmFjay5zdXBlckxheWVyID0gY29udGFpbmVyXG4gIGZyb250LnN1cGVyTGF5ZXIgPSBjb250YWluZXJcbiAgZnJvbnQueCA9IDBcbiAgZnJvbnQueSA9IDBcbiAgYmFjay54ID0gMFxuICBiYWNrLnkgPSAwXG4gIGZyb250LnN0YXRlcy5hZGRcbiAgICAgIGZyb250OiB7b3BhY2l0eTogMX1cbiAgICAgIGJhY2s6IHtvcGFjaXR5OiAwfVxuICBmcm9udC5zdGF0ZXMuYW5pbWF0aW9uT3B0aW9ucyA9XG4gICAgY3VydmU6IGZsaXBDdXJ2ZVxuICBmcm9udC5zdGF0ZXMuc3dpdGNoSW5zdGFudChcImZyb250XCIpXG5cbiAgYmFjay5zdGF0ZXMuYWRkXG4gICAgZnJvbnQ6IHtvcGFjaXR5OiAwfVxuICAgIGJhY2s6IHtvcGFjaXR5OiAxfVxuICBiYWNrLnN0YXRlcy5hbmltYXRpb25PcHRpb25zID1cbiAgICBjdXJ2ZTogZmxpcEN1cnZlXG5cbiAgY29udGFpbmVyLnN0YXRlcy5hZGRcbiAgICAgIGZyb250OiB7cm90YXRpb25ZOiAwfVxuICAgICAgYmFjazoge3JvdGF0aW9uWTogMTgwfVxuXG4gIGNvbnRhaW5lci5zdGF0ZXMuYW5pbWF0aW9uT3B0aW9ucyA9XG4gICAgY3VydmU6IGZsaXBDdXJ2ZVxuICBjb250YWluZXIuc3RhdGVzLnN3aXRjaEluc3RhbnQoXCJmcm9udFwiKVxuICBjb250YWluZXIub24gRXZlbnRzLkNsaWNrLCAtPlxuICAgIHRoaXMuc3RhdGVzLm5leHQoW1wiYmFja1wiLFwiZnJvbnRcIl0pXG4gICAgZnJvbnQuc3RhdGVzLm5leHQoW1wiYmFja1wiLFwiZnJvbnRcIl0pXG4gIHBlcnNwZWN0aXZlTGF5ZXJcbiIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCJleHBvcnRzLnNsaWRlciA9IC0+XG4gIHdpZGdldCA9IG5ldyBMYXllclxuICAgIGhlaWdodDogNjUwXG4gICAgd2lkdGg6IDc1MFxuXG4gIGdyYXBoID0gbmV3IExheWVyXG4gICAgcGFyZW50OiB3aWRnZXRcbiAgICB3aWR0aDogNTA2XG4gICAgaGVpZ2h0OiA0MDBcbiAgICB4OiAxMjJcbiAgICB5OiA0OVxuICAgICNiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwxKVwiXG5cbiAgc2xpZGVyID0gbmV3IExheWVyXG4gICAgcGFyZW50OiB3aWRnZXRcbiAgICBoZWlnaHQ6IDk4XG4gICAgd2lkdGg6IDc1MFxuICAgIHk6IDQ2NVxuICAgICNiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwxKVwiXG5cbiAgc2xpZGVyQXJlYSA9IG5ldyBMYXllclxuICAgIHBhcmVudDogc2xpZGVyXG4gICAgaGVpZ2h0OiA2MFxuICAgIHdpZHRoOiA1NDVcbiAgICB4OiAxMDNcbiAgICB5OiAxN1xuICAgICNiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgxMjUsMTI1LDEyNSwxKVwiXG5cbiAgc2xpZGVyQmFyID0gbmV3IExheWVyXG4gICAgcGFyZW50OiBzbGlkZXJBcmVhXG4gICAgaGVpZ2h0OiAxM1xuICAgIHdpZHRoOiA1NDVcbiAgICB5OiAyNVxuICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDQ4LDMxLDI1NSwwLjgpXCJcblxuICBwcmljZUJhciA9IG5ldyBMYXllclxuICAgIHBhcmVudDogd2lkZ2V0XG4gICAgd2lkdGg6IDU0NVxuICAgIGhlaWdodDogNTRcbiAgICB5OiA1ODBcbiAgICB4OiAxMDNcblxuICBjcmVhdGVTbGlkZXIgPSAoeCkgLT5cbiAgICBzbGlkZXIgPSBuZXcgTGF5ZXJcbiAgICAgIHBhcmVudDogc2xpZGVyQXJlYVxuICAgICAgaGVpZ2h0OiA2MFxuICAgICAgd2lkdGg6IDMyXG4gICAgICB4OiB4XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSg1NSwxNTIsMTk3LDAuNSlcIlxuXG4gICAgc2xpZGVyLmRyYWdnYWJsZS52ZXJ0aWNhbCA9IGZhbHNlXG4gICAgc2xpZGVyLmRyYWdnYWJsZS5jb25zdHJhaW50cyA9XG4gICAgICB3aWR0aDogNTQ1XG4gICAgc2xpZGVyLmRyYWdnYWJsZS5vdmVyZHJhZyA9IGZhbHNlXG4gICAgc2xpZGVyLmRyYWdnYWJsZS5tb21lbnR1bSA9IGZhbHNlXG4gICAgcmV0dXJuIHNsaWRlclxuXG4gIGFkZEJhcnMgPSAocmFuZ2VzKSAtPlxuICAgIHdpZHRoID0gTWF0aC5mbG9vcigoZ3JhcGgud2lkdGggLSA1KSAvIHJhbmdlcy5sZW5ndGgpXG4gICAgYmFycyA9IFtdXG4gICAgZm9yIGkgaW4gcmFuZ2VzXG4gICAgICBuID0gcmFuZ2VzLmluZGV4T2YoaSlcbiAgICAgIGxheWVyID0gbmV3IExheWVyXG4gICAgICAgIHdpZHRoOiA0MFxuICAgICAgICBoZWlnaHQ6IDBcbiAgICAgICAgeDogNSArIHdpZHRoICogblxuICAgICAgICB5OiA1XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDg5LDIzMyw1LDEwMClcIlxuICAgICAgYmFycy5wdXNoKGxheWVyKVxuICAgICAgZ3JhcGguYWRkQ2hpbGQobGF5ZXIpXG4gICAgZ3JhcGgucm90YXRpb25YID0gMTgwXG4gICAgcmV0dXJuIGJhcnNcblxuICBkcmF3UHJpY2VzID0gKHJhbmdlcykgLT5cbiAgICB3aWR0aCA9IE1hdGguZmxvb3IoKHByaWNlQmFyLndpZHRoIC0gNSkgLyByYW5nZXMubGVuZ3RoKVxuICAgIHByaWNlcyA9IHJhbmdlcy5tYXAoZXh0cmFjdFByaWNlKVxuICAgICMgcHJpY2VCYXJcbiAgICBmb3IgaSBpbiByYW5nZXNcbiAgICAgIG4gPSByYW5nZXMuaW5kZXhPZihpKVxuICAgICAgcHJpY2UgPSBwcmljZXNbbl1cbiAgICAgIHByaWNlTGF5ZXIgPSBuZXcgTGF5ZXJcbiAgICAgICAgaGVpZ2h0OiAxNVxuICAgICAgICB3aWR0aDogMzVcbiAgICAgICAgeDogNSArIHdpZHRoICogblxuICAgICAgICB5OiA1XG5cbiAgICAgIGlmIHByaWNlID49IDEwMDBcbiAgICAgICAgcHJpY2VMYXllci5odG1sID0gXCJcIiArIChwcmljZSAvIDEwMDApICsgXCJrXCJcbiAgICAgIGVsc2VcbiAgICAgICAgcHJpY2VMYXllci5odG1sID0gcHJpY2VcbiAgICAgIHByaWNlQmFyLmFkZENoaWxkKHByaWNlTGF5ZXIpXG5cbiAgbWF4ID0gKG51bWJlcnMpIC0+XG4gICAgbnVtYmVycy5yZWR1Y2UgKGxhcmdlc3QsIHByaWNlKSAtPlxuICAgICAgaWYgcHJpY2UgPiBsYXJnZXN0XG4gICAgICAgIHByaWNlXG4gICAgICBlbHNlXG4gICAgICAgIGxhcmdlc3RcblxuICBleHRyYWN0UHJpY2UgPSAoc3RlcCwgaSkgLT5cbiAgICByZXR1cm4gc3RlcFswXVxuXG4gIGV4dHJhY3RDb3VudCA9IChzdGVwLCBpKSAtPlxuICAgIHJldHVybiBzdGVwWzFdXG5cbiAgZHJhd0dyYXBoID0gKHJhbmdlLCBiYXJzLCBvcHRpb25zKSAtPlxuICAgIG1heEhlaWdodCA9IGdyYXBoLmhlaWdodCAtIDEwXG4gICAgbWF4Q291bnQgPSBtYXgocmFuZ2UubWFwKGV4dHJhY3RDb3VudCkpXG4gICAgZm9yIGkgaW4gcmFuZ2VcbiAgICAgIG4gPSByYW5nZS5pbmRleE9mKGkpXG4gICAgICBwcmljZSA9IGlbMF1cbiAgICAgIGNvdW50ID0gaVsxXVxuICAgICAgY29sb3IgPSBvcHRpb25zW1wiYWN0aXZlQ29sb3JcIl1cblxuICAgICAgaWYgbiA8IG9wdGlvbnNbXCJnb25lQmVmb3JlXCJdIG9yIG4gPiBvcHRpb25zW1wiZ29uZUFmdGVyXCJdXG4gICAgICAgIGNvdW50ID0gMFxuICAgICAgZWxzZSBpZiBuIDwgb3B0aW9uc1tcImRpc2FibGVkQmVmb3JlXCJdIG9yIG4gPiBvcHRpb25zW1wiZGlzYWJsZWRBZnRlclwiXVxuICAgICAgICBjb2xvciA9IG9wdGlvbnNbXCJkaXNhYmxlZENvbG9yXCJdXG5cbiAgICAgIGJhcnNbbl0uaGVpZ2h0ID0gY291bnQvbWF4Q291bnQgKiBtYXhIZWlnaHRcbiAgICAgIGJhcnNbbl0uYmFja2dyb3VuZENvbG9yID0gY29sb3JcblxuICB1cGRhdGVTdGF0ZSA9IChzbGlkZXIsIHByb3BlcnR5KSAtPlxuICAgIHN0YXRlW3Byb3BlcnR5XSA9IE1hdGgucm91bmQoc2xpZGVyLnBvaW50W1wieFwiXSAvIDU1KVxuICAgIGRyYXdHcmFwaChwcmljZVJhbmdlLCBiYXJzLCBzdGF0ZSlcblxuICBwcmljZVJhbmdlID0gW1xuICAgIFs1MDAsIDRdLFxuICAgIFs3MDAsIDhdLFxuICAgIFs5MDAsIDEyXSxcbiAgICBbMTEwMCwgMTVdLFxuICAgIFsxMzAwLCAyMF0sXG4gICAgWzE1MDAsIDI1XSxcbiAgICBbMjAwMCwgMjhdLFxuICAgIFszMDAwLCAyMF0sXG4gICAgWzQwMDAsIDRdLFxuICAgIFs1MDAwLCAxXSxcbiAgXVxuXG4gIHNsaWRlck1pbiA9IGNyZWF0ZVNsaWRlcigwKVxuICBzbGlkZXJNYXggPSBjcmVhdGVTbGlkZXIoNTEzKVxuXG4gIHN0YXRlID0ge1xuICAgIGFjdGl2ZUNvbG9yOiBcImdyZWVuXCJcbiAgICBkaXNhYmxlZENvbG9yOiBcInllbGxvd1wiXG4gICAgZGlzYWJsZWRCZWZvcmU6IDAsXG4gICAgZGlzYWJsZWRBZnRlcjogOSxcbiAgICBnb25lQmVmb3JlOiAwLFxuICAgIGdvbmVBZnRlcjogOSxcbiAgfVxuXG4gIGRyYXdQcmljZXMocHJpY2VSYW5nZSlcbiAgYmFycyA9IGFkZEJhcnMocHJpY2VSYW5nZSlcbiAgZHJhd0dyYXBoKHByaWNlUmFuZ2UsIGJhcnMsIHN0YXRlKVxuXG4gIHNsaWRlck1pbi5vbkRyYWcgLT4gdXBkYXRlU3RhdGUodGhpcywgXCJkaXNhYmxlZEJlZm9yZVwiKVxuICBzbGlkZXJNaW4ub25EcmFnRW5kIC0+IHVwZGF0ZVN0YXRlKHRoaXMsIFwiZ29uZUJlZm9yZVwiKVxuICBzbGlkZXJNYXgub25EcmFnIC0+IHVwZGF0ZVN0YXRlKHRoaXMsIFwiZGlzYWJsZWRBZnRlclwiKVxuICBzbGlkZXJNYXgub25EcmFnRW5kIC0+IHVwZGF0ZVN0YXRlKHRoaXMsIFwiZ29uZUFmdGVyXCIpXG4gIFt3aWRnZXQsIHNsaWRlck1pbiwgc2xpZGVyTWF4XVxuIl19
