import { useEffect, useRef } from "react";

// "Giant Peacock Moth" by eb78 (CC BY-SA 4.0,
// sketchfab.com/3d-models/giant-peacock-moth-a4192a5a1c7746b6bf2695b043ada92f),
// converted to public/moth/: the colour texture, and mesh.bin with per-vertex
// weights for the forewings, hindwings and antennae taken from the model's rig.
//
// mesh.bin: u32 vertexCount, u32 indexCount, then per vertex 11 f32
// (position xyz, normal xyz, uv, forewing, hindwing, antenna), then u16 indices.
// X = wingspan, Y = body with the head up, Z = towards the viewer.

// Low internal resolution on purpose: every rendered pixel becomes one dither
// dot once the canvas is scaled up.
const W = 240;
const H = 160;

const vertex = `
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec3 rig;
uniform float forewing, hindwing, antennae, yaw, pitch, bob;
varying vec2 vUv;
varying vec3 vNormal;

// Lift a wing about the body axis; the sign of x picks the side, so both
// wings mirror each other.
vec3 hinge(vec3 p, float a) {
  float s = sign(p.x);
  return vec3(p.x * cos(a) - s * p.z * sin(a), p.y, abs(p.x) * sin(a) + p.z * cos(a));
}

vec3 view(vec3 p) {
  p = vec3(p.x * cos(yaw) + p.z * sin(yaw), p.y, -p.x * sin(yaw) + p.z * cos(yaw));
  return vec3(p.x, p.y * cos(pitch) - p.z * sin(pitch), p.y * sin(pitch) + p.z * cos(pitch));
}

void main() {
  float a = forewing * rig.x + hindwing * rig.y;
  vec3 p = hinge(position, a);
  p.x += antennae * rig.z * p.y;
  p = view(p + vec3(0.0, bob, 0.0));
  vNormal = view(hinge(normal, a));
  vUv = uv;
  float f = 3.0 / (3.0 - p.z);
  // Sized so the whole moth stays in frame even with its wings up and turned.
  gl_Position = vec4(p.x * f * 1.12 * ${(H / W).toFixed(4)}, (p.y * f - 0.13) * 1.12, -p.z * 0.3, 1.0);
}`;

const fragment = `
precision mediump float;
uniform sampler2D tex;
uniform float dark;
varying vec2 vUv;
varying vec3 vNormal;

// Ordered (Bayer) dither threshold for this pixel, built up from 2×2 to 8×8.
float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

void main() {
  vec4 c = texture2D(tex, vUv);
  if (c.a < 0.5) discard;
  float light = 0.7 + 0.3 * abs(dot(normalize(vNormal), normalize(vec3(-0.4, 0.5, 0.8))));
  vec3 col = c.rgb * light;
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  // Dot density follows contrast with the page: dark areas get dense dots on
  // a light page, bright areas on a dark one. Midtones are lifted, then
  // steepened, so the eyespots and bands read as pattern.
  float shade = pow(lum, 0.75);
  float density = clamp((dark > 0.5 ? shade - 0.38 : 0.62 - shade) * 1.8 + 0.5, 0.0, 1.0);
  // Each dot carries the moth's own colour at that spot, a little more saturated.
  vec3 dot = clamp(mix(vec3(lum), col, 1.35), 0.0, 1.0);
  // Off pixels are written as transparent rather than discarded, so they
  // still hide whatever is behind them.
  gl_FragColor = density > bayer8(gl_FragCoord.xy) ? vec4(dot, 1.0) : vec4(0.0);
}`;

export function Moth() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current!;
    const gl = el.getContext("webgl", { antialias: false, premultipliedAlpha: true });
    if (!gl) return;

    let frame = 0;
    let stopped = false;
    let visible = false;
    let ready = false;
    let pointer = 0;
    let turn = 0;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const program = link(gl, vertex, fragment);
    gl.useProgram(program);
    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const u = {
      forewing: uniform("forewing"),
      hindwing: uniform("hindwing"),
      antennae: uniform("antennae"),
      yaw: uniform("yaw"),
      pitch: uniform("pitch"),
      bob: uniform("bob"),
      dark: uniform("dark"),
    };
    let count = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    };
    // Only animate while the moth is on screen.
    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && ready && !still) frame = requestAnimationFrame(tick);
    });
    io.observe(el);

    Promise.all([
      fetch("/moth/mesh.bin").then((r) => r.arrayBuffer()),
      fetch("/moth/texture.webp").then((r) => r.blob()).then((b) => createImageBitmap(b)),
    ]).then(([mesh, image]) => {
      if (stopped) return;
      const [vertices, indices] = new Uint32Array(mesh, 0, 2);
      count = indices;

      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh, 8, vertices * 11), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh, 8 + vertices * 44, indices), gl.STATIC_DRAW);
      for (const [name, size, offset] of [["position", 3, 0], ["normal", 3, 3], ["uv", 2, 6], ["rig", 3, 8]] as const) {
        const loc = gl.getAttribLocation(program, name);
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 44, offset * 4);
      }

      gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

      gl.enable(gl.DEPTH_TEST);
      gl.clearColor(0, 0, 0, 0);
      ready = true;
      if (still) {
        draw(-1.2);
      } else {
        addEventListener("pointermove", onMove, { passive: true });
        if (visible) frame = requestAnimationFrame(tick);
      }
    });

    function tick(now: number) {
      if (stopped || !visible) return;
      draw(now / 1000);
      frame = requestAnimationFrame(tick);
    }

    function draw(t: number) {
      const g = gl!;
      // Resting, not flying: the wings drift open and shut, the hindwings a
      // beat behind the forewings.
      turn += (pointer * 0.3 - turn) * 0.04;
      g.uniform1f(u.forewing, 0.3 + 0.25 * Math.sin(t * 1.3));
      g.uniform1f(u.hindwing, 0.26 + 0.22 * Math.sin(t * 1.3 - 0.5));
      g.uniform1f(u.antennae, 0.15 * Math.sin(t * 0.9));
      g.uniform1f(u.yaw, turn + 0.1 * Math.sin(t * 0.37));
      g.uniform1f(u.pitch, -0.35 + 0.05 * Math.sin(t * 0.8));
      g.uniform1f(u.bob, 0.025 * Math.sin(t * 1.1));
      g.uniform1f(u.dark, document.documentElement.dataset.theme === "dark" ? 1 : 0);
      g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
      g.drawElements(g.TRIANGLES, count, g.UNSIGNED_SHORT, 0);
    }

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      io.disconnect();
      removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <figure className="mt-2">
      <canvas
        ref={canvas}
        width={W}
        height={H}
        aria-hidden
        className="mx-auto block aspect-[240/160] w-full max-w-[420px] [image-rendering:pixelated]"
      />
      <figcaption className="mt-1 text-center font-mono text-xs text-ink-3 italic">saturnia pyri</figcaption>
    </figure>
  );
}

function link(gl: WebGLRenderingContext, vs: string, fs: string) {
  const program = gl.createProgram()!;
  for (const [type, source] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]] as const) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "Shader failed");
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  return program;
}
