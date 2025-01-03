function createShader(gl: WebGL2RenderingContext, type: GLenum, source: string ): WebGLShader | null {
  let shader = gl.createShader(type) as WebGLShader;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS) as GLboolean;

  if (success) return shader;

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

function createProgram(gl: WebGL2RenderingContext, vShader: WebGLShader, fShader: WebGLShader): WebGLProgram | null {
  let program = gl.createProgram() as WebGLProgram;
  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS) as GLboolean;

  if (success) return program;

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): boolean {
  const canvasToDisplaySizeMap = new Map([[canvas, [960, 540]]]);
  const [dWidth, dHeight] = canvasToDisplaySizeMap.get(canvas) as [GLint, GLint];

  const needResize = canvas.width != dWidth ||
                     canvas.height != dHeight;

  if (needResize) {
    console.log(`Current dimensions: ${canvas.width}px x ${canvas.height}px`);
    console.log(`Resizing to ${dWidth}px x ${dHeight}px`)
    canvas.width = dWidth;
    canvas.height = dHeight;
  }
  return needResize;
}

const vertexShaderSource = `#version 300 es
#pragma vscode_glsllint_stage : vert

layout(location = 1) in float aPointSize;
layout(location = 0) in vec2 aPosition;
layout(location = 2) in vec3 aColor;

out vec3 vColor;

void main()
{
  vColor = aColor;
  gl_Position = vec4(aPosition, 0.0, 1.0);
  gl_PointSize = aPointSize;
}`;
 
const fragmentShaderSource = `#version 300 es
 #pragma vscode_glsllint_stage : frag

precision highp float;
 
in vec3 vColor;

out vec4 fragColor;
 
void main() {
  fragColor = vec4(vColor, 1.0);
}
`;


let canvas = document.getElementById('gl-canvas') as HTMLCanvasElement;
let gl = canvas.getContext('webgl2') as WebGL2RenderingContext || null;
if (!gl) {
  canvas.innerHTML = '<h3>No WebGL for you!</h3>';
}

let vShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource) as WebGLShader;
let fShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource) as WebGLShader;
let program = createProgram(gl, vShader, fShader) as WebGLProgram;
gl.useProgram(program);


const positionData = new Float32Array([
  0.0, 0.0,
  -.5, 0.5,
  -.5, -.5,
  0.5, -.5,
  0.5, 0.5
]);
const pointSizeData = new Float32Array([
  100,
  200,
  300,
  400,
  50,
  550
]);
const colorData = new Float32Array([
  0.8, 0.0, 0.6,
  0.5, 0.5, 1.0,
  0.75, 0.6, 0.0,
  0.1, 0.2, 1.0,
  0.5, 0.2, 0.1
]);

const aPosition = 0;
const aPointSize = 1;
const aColor = 2;

const positionBuffer: WebGLBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, positionData, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

const pointSizeBuffer: WebGLBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, pointSizeBuffer);
gl.bufferData(gl.ARRAY_BUFFER, pointSizeData, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, 0, 0);

const colorBuffer: WebGLBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);
gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);


gl.enableVertexAttribArray(aPosition);
gl.enableVertexAttribArray(aPointSize);
gl.enableVertexAttribArray(aColor);

let offset = 0;
let count = 5;
gl.drawArrays(gl.POINTS, offset, count);