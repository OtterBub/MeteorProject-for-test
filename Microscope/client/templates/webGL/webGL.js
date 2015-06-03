Template.webGL.onRendered( function() {
	$("canvas").show();
	$("canvas").css("left", 200);
	$("canvas").css("top", 500);
	//$("canvas").attr("height", 100);
	$("canvas").attr("width", 100);
	WebGLstart( 'glcanvas' );
	initBuffers();
	initShaders();
	drawScene();
});

var horizAspect = 480.0/640.0;
var squareVerticesBuffer = null;
function initBuffers() {
	squareVerticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);;
	
	var vertices = [
		1.0, 1.0, 0.0,
		-1.0, 1.0, 0.0,
		1.0, -1.0, 0.0,
		-1.0, -1.0, 0.0
	];
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function drawScene() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	perspertiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);
	
	loadIdentity();
	mvTranslate([-0.0, 0.0, -6.0]);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
	gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function initShaders() {
	var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl, "shader-vs");
	
	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);
	
	if( !gl.getProgramParameter(shaderProgram, gl.LINK_STATUS) ) {
		alert("Unable to initialize the shader program.");
	}
	
	gl.useProgram(shaderProgram);
	
	vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(vertexPositionAttribute);	
}

function getShader( gl, id ) {
	var shaderScript, theSource, currentChild, shader;
	
	shaderScript = document.getElementById(id);
	
	if(!shaderScript) {
		console.log( "shaderScript Error" );
		return null;
	}
	theSource = "";
	currentChild = shaderScript.firstChild;
	
	while(currentChild) {
		if(currentChild.nodeType == currentChild.TEXT_NODE) {
			theSource += currentChild.textContent;
		}
		currentChild = currentChild.nextSibling
	}
	
	if(shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if(shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		console.log( "shaderScript.type Error" );
		return null;
	}
	
	gl.shaderSource(shader, theSource);
	gl.compileShader(shader);
	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert("error compiling shaders: " + gl.getShaderInfoLog(shader));
		return null;
	}
	
	return shader;
}