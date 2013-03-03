/*!
 * http://seuratjs.com/
 *
 * Tested with Raphael JavaScript Library v2.1
 * http://raphaeljs.com/
 *
 * Copyright 2012, 2013 Greg Smith
 * http://gregoryryansmith.com/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */

Raphael.fn.seurat = function(settings) {
  settings = settings || {};
  var imageSource = settings.imageSource,
    step = settings.step || 10,
    shape = settings.shape || "circ",
    attributes = settings.attributes || {stroke: "none"},
    animator = settings.animator,
    generator = settings.generator;

  var paper = this,
    canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    colorData;

  var center = step / 2,
    radius = center - 1;

  var getColorAt = function(x, y) {
    var index = ((canvas.width * y) + x) * 4;
    return "rgb(" + colorData[index] + ", " + colorData[index + 1] + ", " + colorData[index + 2] + ")";
  }

  var defaultRect = function(x, y, clr) {
    return paper.rect(x, y, step, step).attr({fill: clr}).attr(attributes);
  }
	
  var defaultCirc = function(x, y, clr) {
    return paper.circle(x+center, y+center, radius).attr({fill: clr}).attr(attributes);
  }
	
  var img = new Image();
  img.onload = function() {
  	var x = 0,
  	  y = 0,
      element, 
      color;

    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);
    colorData = context.getImageData(0, 0, img.width, img.height).data;
		
    for (; x < canvas.width; x += step) {
      for (y = 0; y < canvas.height; y += step) {
          color = getColorAt(x + center, y + center);
          
          element = (generator) ? generator(paper, x, y, color, step, attributes) :
               (shape == "rect") ? defaultRect(x, y, color) : defaultCirc(x, y, color);

          if (animator) {
          	animator(element, x, y, step);
          }
      }
    }
  }

  img.crossOrigin = '';
  img.src = imageSource;
}