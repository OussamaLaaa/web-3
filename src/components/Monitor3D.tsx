import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Monitor3DProps {
  scrollProgress?: number
}

function Monitor3D(_props: Monitor3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const frameRef = useRef<THREE.Group>(null)
  const lightRef = useRef<THREE.PointLight>(null)

  // Subtle mouse parallax
  const mouseRef = useRef({ x: 0, y: 0 })

  // Create materials
  const screenMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0.06, 0.065, 0.08),
        emissive: new THREE.Color(0.9, 0.88, 0.85),
        emissiveIntensity: 0.18,
        roughness: 0.25,
        metalness: 0.15,
        transparent: true,
        opacity: 0.95,
      }),
    []
  )

  const frameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0.12, 0.13, 0.15),
        roughness: 0.4,
        metalness: 0.6,
      }),
    []
  )

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.9, 0.88, 0.84),
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide,
      }),
    []
  )

  // Subtle animation loop
  useFrame((state) => {
    if (!meshRef.current || !frameRef.current || !lightRef.current) return

    const time = state.clock.getElapsedTime()

    // Very subtle floating motion
    meshRef.current.position.y = Math.sin(time * 0.3) * 0.02

    // Subtle rotation based on mouse position
    const targetX = mouseRef.current.x * 0.05
    const targetY = mouseRef.current.y * 0.05

    frameRef.current.rotation.y += (targetX - frameRef.current.rotation.y) * 0.02
    frameRef.current.rotation.x += (targetY - frameRef.current.rotation.x) * 0.02

    // Breathing light
    lightRef.current.intensity = 0.35 + Math.sin(time * 0.5) * 0.08

    // Pulse emissive slightly
    if (screenMaterial.emissiveIntensity !== undefined) {
      screenMaterial.emissiveIntensity = 0.18 + Math.sin(time * 0.4) * 0.04
    }
  })

  // Mouse move handler
  const handlePointerMove = (event: any) => {
    if (!event.uv) return
    mouseRef.current.x = (event.uv.x - 0.5) * 2
    mouseRef.current.y = (event.uv.y - 0.5) * 2
  }

  return (
    <group ref={frameRef} position={[0, 0, 0]}>
      {/* Main monitor screen */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerMove={handlePointerMove}
      >
        <boxGeometry args={[3.2, 2.4, 0.08]} />
        <primitive object={screenMaterial} attach="material" />
      </mesh>

      {/* Monitor frame - top */}
      <mesh position={[0, 1.24, 0]}>
        <boxGeometry args={[3.3, 0.08, 0.1]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      {/* Monitor frame - bottom */}
      <mesh position={[0, -1.24, 0]}>
        <boxGeometry args={[3.3, 0.08, 0.1]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      {/* Monitor frame - left */}
      <mesh position={[-1.65, 0, 0]}>
        <boxGeometry args={[0.08, 2.4, 0.1]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      {/* Monitor frame - right */}
      <mesh position={[1.65, 0, 0]}>
        <boxGeometry args={[0.08, 2.4, 0.1]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      {/* Back panel for depth */}
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[3.3, 2.5, 0.04]} />
        <meshStandardMaterial
          color={new THREE.Color(0.05, 0.055, 0.07)}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>

      {/* Subtle glow behind screen */}
      <mesh position={[0, 0, -0.15]} scale={1.05}>
        <planeGeometry args={[3.4, 2.6]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>

      {/* Point light for atmospheric lighting */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 0.5]}
        intensity={0.35}
        distance={4}
        color={new THREE.Color(0.9, 0.88, 0.84)}
        decay={2}
      />

      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.2} />
    </group>
  )
}

export default Monitor3D
