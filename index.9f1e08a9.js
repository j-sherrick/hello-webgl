let e;function r(e,r,t){let o=e.createShader(r);return(e.shaderSource(o,t),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS))?o:(console.log(e.getShaderInfoLog(o)),e.deleteShader(o),null)}const t=`#version 300 es
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
}`,o=`#version 300 es
 #pragma vscode_glsllint_stage : frag

precision highp float;
 
in vec3 vColor;

out vec4 fragColor;
 
void main() {
  fragColor = vec4(vColor, 1.0);
}
`;let a=document.getElementById("gl-canvas"),n=a.getContext("webgl2")||null;n||(a.innerHTML="<h3>No WebGL for you!</h3>");let l=r(n,n.VERTEX_SHADER,t),i=r(n,n.FRAGMENT_SHADER,o),A=(e=n.createProgram(),(n.attachShader(e,l),n.attachShader(e,i),n.linkProgram(e),n.getProgramParameter(e,n.LINK_STATUS))?e:(console.log(n.getProgramInfoLog(e)),n.deleteProgram(e),null));n.useProgram(A);const c=new Float32Array([0,0,-.5,.5,-.5,-.5,.5,-.5,.5,.5]),g=new Float32Array([100,200,300,400,50,550]),f=new Float32Array([.8,0,.6,.5,.5,1,.75,.6,0,.1,.2,1,.5,.2,.1]),R=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,R),n.bufferData(n.ARRAY_BUFFER,c,n.STATIC_DRAW),n.vertexAttribPointer(0,2,n.FLOAT,!1,0,0);const s=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,s),n.bufferData(n.ARRAY_BUFFER,g,n.STATIC_DRAW),n.vertexAttribPointer(1,1,n.FLOAT,!1,0,0);const u=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,u),n.bufferData(n.ARRAY_BUFFER,f,n.STATIC_DRAW),n.vertexAttribPointer(2,3,n.FLOAT,!1,0,0),n.enableVertexAttribArray(0),n.enableVertexAttribArray(1),n.enableVertexAttribArray(2),n.drawArrays(n.POINTS,0,5);
//# sourceMappingURL=index.9f1e08a9.js.map
