import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

// Animated sphere that morphs
function MorphingSphere({ progress }) {
  const mesh = useRef()
  const materialRef = useRef()

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
    if (materialRef.current) {
      // Increase distortion as loading progresses
      materialRef.current.distort = 0.3 + (progress / 100) * 0.4
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} scale={2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#00ff88"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

// Orbiting particles
function OrbitingParticles({ count = 100 }) {
  const mesh = useRef()

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 2
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.1
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00ff88"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// Rotating rings
function LoadingRings({ progress }) {
  const ring1 = useRef()
  const ring2 = useRef()
  const ring3 = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ring1.current) ring1.current.rotation.x = t * 0.5
    if (ring2.current) ring2.current.rotation.y = t * 0.3
    if (ring3.current) ring3.current.rotation.z = t * 0.4
  })

  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshBasicMaterial color="#ff0055" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00ccff" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

// Main loading scene
export default function LoadingScene({ progress = 0 }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#050505']} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0055" />

      <MorphingSphere progress={progress} />
      <OrbitingParticles count={150} />
      <LoadingRings progress={progress} />

      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.002, 0.002]}
        />
      </EffectComposer>
    </Canvas>
  )
}
