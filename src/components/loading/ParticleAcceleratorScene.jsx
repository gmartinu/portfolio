import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

// Atom with electron orbits
function Atom({ position, color, electronColor, scale = 1, speed = 1, rotation = 0 }) {
  const groupRef = useRef()
  const nucleusRef = useRef()
  const electron1Ref = useRef()
  const electron2Ref = useRef()
  const electron3Ref = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed

    if (nucleusRef.current) {
      nucleusRef.current.rotation.x = t * 0.5
      nucleusRef.current.rotation.y = t * 0.7
    }

    // Electron orbits
    if (electron1Ref.current) {
      electron1Ref.current.position.x = Math.cos(t * 3) * 0.4 * scale
      electron1Ref.current.position.y = Math.sin(t * 3) * 0.4 * scale
    }
    if (electron2Ref.current) {
      electron2Ref.current.position.x = Math.cos(t * 3 + Math.PI * 0.66) * 0.35 * scale
      electron2Ref.current.position.z = Math.sin(t * 3 + Math.PI * 0.66) * 0.35 * scale
    }
    if (electron3Ref.current) {
      electron3Ref.current.position.y = Math.cos(t * 3 + Math.PI * 1.33) * 0.3 * scale
      electron3Ref.current.position.z = Math.sin(t * 3 + Math.PI * 1.33) * 0.3 * scale
    }

    // Pulsing glow
    if (glowRef.current) {
      glowRef.current.scale.setScalar(scale * (1 + Math.sin(t * 5) * 0.1))
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={[0, 0, rotation]}>
      {/* Outer glow */}
      <mesh ref={glowRef} scale={scale * 1.5}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>

      {/* Nucleus */}
      <mesh ref={nucleusRef} scale={scale}>
        <icosahedronGeometry args={[0.15, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Electron orbit rings */}
      <mesh scale={scale} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.4, 0.008, 8, 64]} />
        <meshBasicMaterial color={electronColor} transparent opacity={0.4} />
      </mesh>
      <mesh scale={scale} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.008, 8, 64]} />
        <meshBasicMaterial color={electronColor} transparent opacity={0.3} />
      </mesh>
      <mesh scale={scale} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.3, 0.008, 8, 64]} />
        <meshBasicMaterial color={electronColor} transparent opacity={0.3} />
      </mesh>

      {/* Electrons */}
      <mesh ref={electron1Ref} scale={scale * 0.6}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial
          color={electronColor}
          emissive={electronColor}
          emissiveIntensity={3}
        />
      </mesh>
      <mesh ref={electron2Ref} scale={scale * 0.6}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial
          color={electronColor}
          emissive={electronColor}
          emissiveIntensity={3}
        />
      </mesh>
      <mesh ref={electron3Ref} scale={scale * 0.6}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial
          color={electronColor}
          emissive={electronColor}
          emissiveIntensity={3}
        />
      </mesh>
    </group>
  )
}

// Accelerator ring
function AcceleratorRing({ radius = 5, tubeRadius = 0.04, segments = 256 }) {
  const ringRef = useRef()
  const energyRingRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (energyRingRef.current) {
      energyRingRef.current.rotation.z = t * 0.2
    }
  })

  return (
    <group>
      {/* Main ring structure */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, tubeRadius, 16, segments]} />
        <meshStandardMaterial
          color="#1a1a2e"
          emissive="#00ff88"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Inner glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, tubeRadius * 4, 16, segments]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.08} />
      </mesh>

      {/* Energy flow ring */}
      <mesh ref={energyRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, tubeRadius * 0.5, 8, segments]} />
        <meshBasicMaterial color="#00ccff" transparent opacity={0.5} />
      </mesh>

      {/* Outer decorative rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.08, 0.015, 8, segments]} />
        <meshBasicMaterial color="#ff0055" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 0.92, 0.015, 8, segments]} />
        <meshBasicMaterial color="#00ccff" transparent opacity={0.25} />
      </mesh>

      {/* Additional structural rings for more detail */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.15, 0.008, 8, segments]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 0.85, 0.008, 8, segments]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

// Particle trail
function ParticleTrail({ atomPosition, color, intensity = 1 }) {
  const pointsRef = useRef()
  const positions = useRef(new Float32Array(300)) // 100 particles * 3 coords
  const opacities = useRef(new Float32Array(100))
  const trailHistory = useRef([])

  useFrame(() => {
    if (!atomPosition) return

    // Add current position to trail history
    trailHistory.current.push([...atomPosition])
    if (trailHistory.current.length > 100) {
      trailHistory.current.shift()
    }

    // Update particle positions from trail
    for (let i = 0; i < trailHistory.current.length; i++) {
      const pos = trailHistory.current[i]
      positions.current[i * 3] = pos[0]
      positions.current[i * 3 + 1] = pos[1]
      positions.current[i * 3 + 2] = pos[2]
      opacities.current[i] = (i / trailHistory.current.length) * intensity
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05 * intensity}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Collision explosion particles
function ExplosionParticles({ active, intensity }) {
  const pointsRef = useRef()
  const velocities = useRef([])
  const particleCount = 500

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const size = new Float32Array(particleCount)
    const vels = []

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = 0
      pos[i * 3 + 1] = 0
      pos[i * 3 + 2] = 0
      size[i] = Math.random() * 0.1 + 0.02

      // Random velocity in all directions
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const speed = Math.random() * 0.15 + 0.05
      vels.push({
        x: Math.sin(phi) * Math.cos(theta) * speed,
        y: Math.sin(phi) * Math.sin(theta) * speed,
        z: Math.cos(phi) * speed,
        decay: Math.random() * 0.02 + 0.01
      })
    }
    velocities.current = vels
    return [pos, size]
  }, [])

  useFrame(() => {
    if (!active || !pointsRef.current) return

    const posArray = pointsRef.current.geometry.attributes.position.array

    for (let i = 0; i < particleCount; i++) {
      const vel = velocities.current[i]
      posArray[i * 3] += vel.x * intensity
      posArray[i * 3 + 1] += vel.y * intensity
      posArray[i * 3 + 2] += vel.z * intensity
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  if (!active) return null

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#ffffff"
        transparent
        opacity={intensity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Shockwave ring
function ShockwaveRing({ active, progress }) {
  const ringRef = useRef()
  const ring2Ref = useRef()

  useFrame(() => {
    if (!active) return
    if (ringRef.current) {
      ringRef.current.scale.setScalar(progress * 20)
      ringRef.current.material.opacity = Math.max(0, 1 - progress * 0.8)
    }
    if (ring2Ref.current) {
      ring2Ref.current.scale.setScalar(progress * 15)
      ring2Ref.current.material.opacity = Math.max(0, 0.8 - progress)
    }
  })

  if (!active) return null

  return (
    <group>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1, 64]} />
        <meshBasicMaterial
          color="#00ff88"
          transparent
          opacity={1}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 0.9, 64]} />
        <meshBasicMaterial
          color="#00ccff"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

// Energy core at collision point
function EnergyCore({ active, intensity }) {
  const coreRef = useRef()
  const outerRef = useRef()

  useFrame((state) => {
    if (!active) return
    const t = state.clock.getElapsedTime()

    if (coreRef.current) {
      coreRef.current.scale.setScalar(intensity * 2)
      coreRef.current.rotation.x = t * 2
      coreRef.current.rotation.y = t * 3
    }
    if (outerRef.current) {
      outerRef.current.scale.setScalar(intensity * 3)
    }
  })

  if (!active) return null

  return (
    <group>
      <mesh ref={outerRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={intensity * 0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.3, 2]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#ffffff"
          emissiveIntensity={intensity * 5}
        />
      </mesh>
    </group>
  )
}

// Background particles
function BackgroundParticles({ count = 200 }) {
  const pointsRef = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00ff88"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  )
}

// Main scene controller
function SceneController({ phase, progress, onCollision }) {
  const atom1Ref = useRef({ position: [5, 0, 0] })
  const atom2Ref = useRef({ position: [-5, 0, 0] })
  const [atom1Pos, setAtom1Pos] = useState([5, 0, 0])
  const [atom2Pos, setAtom2Pos] = useState([-5, 0, 0])
  const [atom1Opacity, setAtom1Opacity] = useState(0)
  const [atom2Opacity, setAtom2Opacity] = useState(0)
  const [collisionIntensity, setCollisionIntensity] = useState(0)
  const [shockwaveProgress, setShockwaveProgress] = useState(0)
  const { camera } = useThree()
  const cameraAngleRef = useRef(0)
  const angleOffsetRef = useRef(0)

  const radius = 5
  const collisionTriggered = useRef(false)

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    if (phase === 'beam1_intro') {
      // First beam fades in and starts moving slowly
      setAtom1Opacity(Math.min(1, progress / 50))
      setAtom2Opacity(0)

      const slowSpeed = 0.3
      const angle1 = t * slowSpeed
      angleOffsetRef.current = angle1 // Store the angle for continuity

      const pos1 = [
        Math.cos(angle1) * radius,
        0,
        Math.sin(angle1) * radius
      ]
      setAtom1Pos(pos1)
      atom1Ref.current.position = pos1

      // Camera starts from a wide view
      camera.position.x += (0 - camera.position.x) * 0.02
      camera.position.y += (5 - camera.position.y) * 0.02
      camera.position.z += (14 - camera.position.z) * 0.02
      camera.lookAt(0, 0, 0)

    } else if (phase === 'beam2_intro') {
      // Second beam fades in on the opposite side
      setAtom1Opacity(1)
      setAtom2Opacity(Math.min(1, progress / 50))

      const slowSpeed = 0.4
      const angle1 = t * slowSpeed
      const angle2 = angle1 + Math.PI // Opposite side

      const pos1 = [
        Math.cos(angle1) * radius,
        0,
        Math.sin(angle1) * radius
      ]
      const pos2 = [
        Math.cos(angle2) * radius,
        0,
        Math.sin(angle2) * radius
      ]

      setAtom1Pos(pos1)
      setAtom2Pos(pos2)
      atom1Ref.current.position = pos1
      atom2Ref.current.position = pos2

      // Camera adjusts to show both beams
      camera.position.y += (4.5 - camera.position.y) * 0.02
      camera.position.z += (13 - camera.position.z) * 0.02
      camera.lookAt(0, 0, 0)

    } else if (phase === 'accelerating') {
      setAtom1Opacity(1)
      setAtom2Opacity(1)

      // Atoms orbit the ring, speeding up over time
      // Progress goes from 0-100 during acceleration
      const speedMultiplier = 0.5 + (progress / 100) * 3 // Starts slow, speeds up significantly
      const angle1 = t * speedMultiplier
      const angle2 = angle1 + Math.PI // Opposite side

      const pos1 = [
        Math.cos(angle1) * radius,
        0,
        Math.sin(angle1) * radius
      ]
      const pos2 = [
        Math.cos(angle2) * radius,
        0,
        Math.sin(angle2) * radius
      ]

      setAtom1Pos(pos1)
      setAtom2Pos(pos2)
      atom1Ref.current.position = pos1
      atom2Ref.current.position = pos2

      // Camera follows the first particle with smooth interpolation
      const followIntensity = Math.min(1, progress / 40) // Gradually increase follow
      const cameraDistance = 12 - (progress / 100) * 3 // Get closer as speed increases
      const cameraHeight = 4 - (progress / 100) * 2 // Lower as we speed up

      // Smoothly interpolate camera angle to follow atom1
      const targetAngle = angle1 - Math.PI / 4 // Slightly behind the particle
      cameraAngleRef.current += (targetAngle - cameraAngleRef.current) * 0.02 * followIntensity

      const camX = Math.cos(cameraAngleRef.current) * cameraDistance * 0.4 * followIntensity
      const camZ = Math.sin(cameraAngleRef.current) * cameraDistance * 0.4 * followIntensity + cameraDistance

      camera.position.x += (camX - camera.position.x) * 0.03
      camera.position.y += (cameraHeight - camera.position.y) * 0.03
      camera.position.z += (camZ - camera.position.z) * 0.03

      camera.lookAt(0, 0, 0)

      // Camera shake as energy builds (subtle)
      if (progress > 75) {
        const shake = (progress - 75) / 300
        camera.position.x += Math.sin(t * 25) * shake
        camera.position.y += Math.cos(t * 30) * shake
      }
    } else if (phase === 'collision') {
      // Atoms rush to center
      const collisionProgress = progress / 100

      const pos1 = [
        (1 - collisionProgress) * radius,
        0,
        0
      ]
      const pos2 = [
        -(1 - collisionProgress) * radius,
        0,
        0
      ]

      setAtom1Pos(pos1)
      setAtom2Pos(pos2)

      if (collisionProgress >= 0.95 && !collisionTriggered.current) {
        collisionTriggered.current = true
        onCollision?.()
      }

      // Camera pulls back and centers for the impact
      const targetZ = 11 + collisionProgress * 3
      camera.position.z += (targetZ - camera.position.z) * 0.08
      camera.position.x *= 0.92
      camera.position.y += (3 - camera.position.y) * 0.08
      camera.lookAt(0, 0, 0)

      // Intense camera shake during collision
      const shake = collisionProgress * 0.2
      camera.position.x += Math.sin(t * 40) * shake
      camera.position.y += Math.cos(t * 45) * shake
    } else if (phase === 'explosion') {
      setCollisionIntensity(Math.min(1, progress / 50))
      setShockwaveProgress(progress / 100)

      // Camera pulls back dramatically during explosion
      const targetZ = 14 + (progress / 100) * 8
      camera.position.z += (targetZ - camera.position.z) * 0.04
      camera.position.x *= 0.92
      camera.position.y *= 0.95
      camera.lookAt(0, 0, 0)
    }
  })

  const showAtom1 = phase === 'beam1_intro' || phase === 'beam2_intro' || phase === 'accelerating' || phase === 'collision'
  const showAtom2 = phase === 'beam2_intro' || phase === 'accelerating' || phase === 'collision'
  const showExplosion = phase === 'explosion'

  const atomScale = phase === 'collision' ? 1.5 :
                    phase === 'accelerating' ? 1 + (progress / 150) :
                    phase === 'beam1_intro' || phase === 'beam2_intro' ? 0.8 + (progress / 250) : 1
  const trailIntensity = phase === 'accelerating' ? 1 + (progress / 40) :
                         phase === 'collision' ? 2.5 : 0.5

  return (
    <>
      <AcceleratorRing radius={radius} />
      <BackgroundParticles />

      {showAtom1 && (
        <group position={atom1Pos}>
          <Atom
            position={[0, 0, 0]}
            color="#00ff88"
            electronColor="#00ccff"
            scale={atomScale * atom1Opacity}
            speed={phase === 'accelerating' ? 1.5 + progress / 20 : 1}
          />
        </group>
      )}

      {showAtom2 && (
        <group position={atom2Pos}>
          <Atom
            position={[0, 0, 0]}
            color="#ff0055"
            electronColor="#ffaa00"
            scale={atomScale * atom2Opacity}
            speed={phase === 'accelerating' ? 1.5 + progress / 20 : 1}
          />
        </group>
      )}

      {showAtom1 && atom1Opacity > 0.5 && (
        <ParticleTrail
          atomPosition={atom1Pos}
          color="#00ff88"
          intensity={trailIntensity * atom1Opacity}
        />
      )}

      {showAtom2 && atom2Opacity > 0.5 && (
        <ParticleTrail
          atomPosition={atom2Pos}
          color="#ff0055"
          intensity={trailIntensity * atom2Opacity}
        />
      )}

      {showExplosion && (
        <>
          <ExplosionParticles active={true} intensity={collisionIntensity} />
          <ShockwaveRing active={true} progress={shockwaveProgress} />
          <EnergyCore active={true} intensity={collisionIntensity} />
        </>
      )}
    </>
  )
}

// Main component
export default function ParticleAcceleratorScene({ phase, progress, onCollision }) {
  const bloomIntensity = useMemo(() => {
    if (phase === 'explosion') return 1.5 + (progress / 50)
    if (phase === 'collision') return 0.8 + (progress / 100)
    if (phase === 'accelerating') return 0.5 + (progress / 150)
    if (phase === 'beam1_intro' || phase === 'beam2_intro') return 0.4
    return 0.5
  }, [phase, progress])

  const chromaticOffset = useMemo(() => {
    if (phase === 'explosion') return [0.01, 0.01]
    if (phase === 'collision') return [0.006, 0.006]
    if (phase === 'accelerating' && progress > 70) return [0.003, 0.003]
    return [0.001, 0.001]
  }, [phase, progress])

  return (
    <Canvas
      camera={{ position: [0, 4, 14], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#050505']} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0055" />
      <pointLight position={[0, 0, 0]} intensity={phase === 'explosion' ? 3 : 0} color="#ffffff" />

      <SceneController
        phase={phase}
        progress={progress}
        onCollision={onCollision}
      />

      <EffectComposer>
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={chromaticOffset}
        />
      </EffectComposer>
    </Canvas>
  )
}
