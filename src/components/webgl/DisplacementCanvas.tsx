"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef, Component, type ReactNode, Suspense } from "react";
import * as THREE from "three";
function Plane() {
  const texture = useTexture("/images/architecture.svg");
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uMap: { value: texture },
      uTime: { value: 0 },
      uPointer: { value: 0 },
    }),
    [texture],
  );
  useFrame(({ clock, pointer }) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value = clock.elapsedTime;
      mat.current.uniforms.uPointer.value = THREE.MathUtils.lerp(
        mat.current.uniforms.uPointer.value,
        pointer.x,
        0.025,
      );
    }
  });
  return (
    <mesh>
      <planeGeometry args={[2, 2, 24, 24]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader="varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}"
        fragmentShader="uniform sampler2D uMap; uniform float uTime; uniform float uPointer; varying vec2 vUv; void main(){vec2 uv=vUv;uv.x+=sin(uv.y*9.+uTime*.15)*.003*uPointer;gl_FragColor=texture2D(uMap,uv);}"
      />
    </mesh>
  );
}
class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function DisplacementCanvas({ active }: { active: boolean }) {
  return (
    <Boundary>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            gl.domElement.style.opacity = "0";
          });
        }}
      >
        <Suspense fallback={null}>
          <Plane />
        </Suspense>
      </Canvas>
    </Boundary>
  );
}
