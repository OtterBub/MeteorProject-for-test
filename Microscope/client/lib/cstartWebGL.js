/* global initWebGL */
/* global WebGLstart */
/* global gl */
gl = null;

WebGLstart = function start( canvas ) {
	var canvas = document.getElementById(canvas);
	
	console.log("CallstartFunction");
	
	gl = initWebGL(canvas);
	
	if( gl ) {
		gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
		console.log("init Complete WegGL");
	} else {
		console.log("cant init gl");
	}
}

initWebGL = function initWebGL(canvas) {
	gl = null;
	
	try {
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	}
	catch(e) {}
	
	if( !gl ) {
		console.log("Unable to initialize WebGL");
		gl = null;
	}
	return gl;
}