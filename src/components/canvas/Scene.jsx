import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Float } from '@react-three/drei'
import { Suspense, useRef, useMemo } from 'react'

// Central nucleus (glowing core)
function Nucleus() {
  const mesh = useRef()

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.6, 2]} />
        <meshBasicMaterial
          color="#00ff88"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial
          color="#00ff88"
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  )
}

// Orbit ring - the visible path (no rotation, handled by parent group)
function OrbitRing({ radius, color, opacity = 0.2 }) {
  return (
    <mesh>
      <torusGeometry args={[radius, 0.012, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

// Single electron - orbits on XY plane, parent group handles tilt
function Electron({ radius, speed, startAngle, color }) {
  const groupRef = useRef()
  const glowRef = useRef()
  const angle = useRef(startAngle)

  useFrame((state, delta) => {
    angle.current += delta * speed
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angle.current) * radius
      groupRef.current.position.y = Math.sin(angle.current) * radius
      groupRef.current.position.z = 0
    }
    // Pulse the glow
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 4) * 0.2)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Core electron */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  )
}

// Complete orbit - ring + electrons, all sharing the same rotation
function Orbit({ tiltX, tiltY, radius, color, electronSpeed, electronCount = 2 }) {
  return (
    <group rotation={[tiltX, tiltY, 0]}>
      {/* The orbit ring path */}
      <OrbitRing radius={radius} color={color} opacity={0.25} />

      {/* Electrons on this orbit */}
      {Array.from({ length: electronCount }).map((_, i) => (
        <Electron
          key={i}
          radius={radius}
          speed={electronSpeed}
          startAngle={(i * Math.PI * 2) / electronCount}
          color={color}
        />
      ))}
    </group>
  )
}

// Complete atom with nucleus and orbiting electrons
function Atom() {
  const group = useRef()

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group ref={group}>
      <Nucleus />

      {/* Three orbits at different angles - electrons now follow the rings! */}
      <Orbit
        tiltX={Math.PI / 2}
        tiltY={0}
        radius={2.5}
        color="#00ff88"
        electronSpeed={0.8}
        electronCount={2}
      />
      <Orbit
        tiltX={Math.PI / 2}
        tiltY={Math.PI / 3}
        radius={2.5}
        color="#00ccff"
        electronSpeed={0.6}
        electronCount={2}
      />
      <Orbit
        tiltX={Math.PI / 2}
        tiltY={-Math.PI / 3}
        radius={2.5}
        color="#ff0055"
        electronSpeed={0.7}
        electronCount={2}
      />
    </group>
  )
}

// Background particles
function Particles({ count = 200 }) {
  const mesh = useRef()

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 8 + Math.random() * 12
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.01
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.015
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
        size={0.015}
        color="#00ff88"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

export default function Scene() {
  return (
    <Canvas
      className="absolute inset-0"
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ff88" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ccff" />
        <Atom />
        <Particles count={150} />
      </Suspense>
    </Canvas>
  )
}
