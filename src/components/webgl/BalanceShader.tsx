"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect, Component, type ReactNode } from "react";
import * as THREE from "three";
const vertex = `uniform float uTime; uniform float uProgress; varying float vFade;
void main(){
  float formation=smoothstep(0.0,3.0,uTime);
  vec3 dispersed=position+vec3(sin(position.y*4.0)*.8,cos(position.x*3.0)*.45,0.0);
  vec3 p=mix(dispersed,position,formation);
  vec3 architecture=vec3(floor(position.x*3.0)/3.0,position.y*1.15,0.0);
  p=mix(p,architecture,uProgress*.8);
  p.x+=sin(p.y*3.0+uTime*.22)*.015;
  p.z+=sin(p.x*2.0+uTime*.15)*.025;
  vFade=(.55+.25*sin(p.y+uTime*.12))*formation;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
}`;
const fragment = `varying float vFade; void main(){gl_FragColor=vec4(.835,.647,.216,vFade*.55);}`;
function Threads() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    const vertices: number[] = [];
    const segment = (ax: number, ay: number, bx: number, by: number) => {
      for (let j = 0; j < 32; j++) {
        const a = j / 32,
          b = (j + 1) / 32;
        vertices.push(
          ax + (bx - ax) * a,
          ay + (by - ay) * a,
          0,
          ax + (bx - ax) * b,
          ay + (by - ay) * b,
          0,
        );
      }
    };
    for (let i = 0; i < 9; i++) {
      const o = i * 0.022;
      segment(o, -2, o, 2);
      segment(-1.8, 1 + o, 0, 1.6 + o);
      segment(0, 1.6 + o, 1.8, 1 + o);
      for (const sign of [-1, 1]) {
        segment(sign * 1.3, 1.15, sign * 0.7, -0.5 + o);
        segment(sign * 1.3, 1.15, sign * 1.9, -0.5 + o);
        segment(sign * 0.7, -0.5 + o, sign * 1.9, -0.5 + o);
      }
      segment(-0.7, -2 + o, 0.7, -2 + o);
    }
    return new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3),
    );
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uProgress: { value: 0 } }),
    [],
  );
  useFrame(({ clock, pointer }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.elapsedTime;
      material.current.uniforms.uProgress.value = Math.min(
        window.scrollY / 800,
        1,
      );
    }
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        pointer.x * 0.05,
        0.025,
      );
    }
  });
  return (
    <group ref={group}>
      <lineSegments geometry={geometry}>
        <shaderMaterial
          ref={material}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
class CanvasBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function BalanceShader({ active }: { active: boolean }) {
  return (
    <CanvasBoundary>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 6], fov: 48 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            gl.domElement.style.opacity = "0";
          });
        }}
      >
        <Threads />
      </Canvas>
    </CanvasBoundary>
  );
}
