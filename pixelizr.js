/* All code (c) Greg Smith */

Raphael.fn.pixelizr = function (settings) { //imageSrc, diameter, mode, anim
	settings = settings || {};
	var imageSource = settings.imageSource || null;
	var step = settings.step || 10;
	var mode = settings.step || "circ";
	var animation = settings.animation || null;
	var attributes = settings.attributes || {stroke: "none"};
	var generation = settings.generation || null;

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
			
			if(generation != null) 
				generation(x,y,color,attr)
			else{
				if(mode == "rect") elm = defaultRect(x,y,color);
				else elm = defaultCirc(x,y,color);
			}
			
			if(animation!=null) animation(elm,x,y);
		}
	}
	img.src = imageSource;
};