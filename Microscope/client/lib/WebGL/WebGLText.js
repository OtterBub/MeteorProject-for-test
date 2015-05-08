Meteor.startup( function start() {
	var canvas = document.getElementById("glcanvas");
	
	if( canvas == null ) {
		console.log( 'canvas is null' );
	}
	
	console.log( "debug" );
	
	gl = initWebGL(canvas);
	
	if( gl ) {
		gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		gl.viewport( 0, 500, canvas.width, canvas.height );
	}
});

function initWebGL(canvas) {
	gl = null;
	
	try {
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	}
	catch(e) {
		
	}
	
	if( !gl ){
		//alert("Unable to initialize WebGL. Your browser may not support it.");
		gl = null;
	}
	return gl;
}