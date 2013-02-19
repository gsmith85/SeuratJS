/*!
 * Seurat JavaScript Plugin v0.1
 * http://seuratjs.com/
 *
 * Tested with Raphael JavaScript Library v2.1
 * http://raphaeljs.com/
 *
 * Copyright 2012, Greg Smith
 * http://gregoryryansmith.com/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */

Raphael.fn.seurat = function (settings) {
	settings = settings || {};
	var imageSource = settings.imageSource || null;
	var step = settings.step || 10;
	var shape = settings.shape || "circ";
	var attributes = settings.attributes || {stroke: "none"};
	
	var animator = settings.animator || null;
	var generator = settings.generator || null;

	var ppr = this;
	var can = document.createElement('canvas');
	var ctx = can.getContext('2d');
	var colorData;

	function getColorAt(x, y) {
		var index = ((can.width * y) + x) * 4;
		return "rgb(" + colorData[index] + ", " + colorData[index + 1] + ", " + colorData[index + 2] + ")";
	}
	
	var center = step/2;
	var radius = center-1;
	
	function defaultRect(x,y,clr) {
		return ppr.rect(x, y, step, step).attr({fill: clr}).attr(attributes);
	}
	
	function defaultCirc(x,y,clr) {
		return ppr.circle(x+center, y+center, radius).attr({fill: clr}).attr(attributes);
	}
	
	var img = new Image();
	img.onload = function(){
		can.width = img.width;
		can.height = img.height;
		ctx.drawImage(img, 0, 0, img.width, img.height);
		colorData = ctx.getImageData(0, 0, img.width, img.height).data;
		
		for(var x = 0; x < can.width; x += step)
		for(var y = 0; y < can.height; y+= step){
			var elm;
			var color = getColorAt(x+center,y+center);
			
			if(generator != null){			
				elm = generator(ppr,x,y,color,step,attributes);
			}
			else{
				if(shape == "rect") elm = defaultRect(x,y,color);
				else elm = defaultCirc(x,y,color);
			}
			
			if(animator!=null) animator(elm,x,y,step);
		}
	}
	img.crossOrigin = '';
	img.src = imageSource;
};