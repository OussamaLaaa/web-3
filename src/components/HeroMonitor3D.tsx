import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function MonitorScene() {
  const monitorRef = useRef<THREE.Group>(null)
  const keyLightRef = useRef<THREE.DirectionalLight>(null)
  const glowRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame(({ pointer, clock }) => {
    const monitor = monitorRef.current
    const keyLight = keyLightRef.current
    const glowMaterial = glowRef.current

    if (!monitor || !keyLight || !glowMaterial) return

    const targetY = pointer.x * 0.08
    const targetX = -pointer.y * 0.045

    monitor.rotation.y = THREE.MathUtils.lerp(monitor.rotation.y, targetY, 0.06)
    monitor.rotation.x = THREE.MathUtils.lerp(monitor.rotation.x, targetX, 0.06)

    keyLight.position.x = THREE.MathUtils.lerp(keyLight.position.x, 1.8 + pointer.x * 0.45, 0.08)
    keyLight.position.y = THREE.MathUtils.lerp(keyLight.position.y, 1.2 + pointer.y * 0.25, 0.08)

    glowMaterial.emissiveIntensity = 0.2 + Math.sin(clock.elapsedTime * 0.45) * 0.02
  })

  return (
    <>
      <color attach="background" args={['#090a0d']} />
      <ambientLight intensity={0.35} color="#d4cec2" />
      <directionalLight ref={keyLightRef} position={[1.8, 1.2, 2.4]} intensity={1.2} color="#ece4d6" />
      <pointLight position={[-1.8, -0.8, 1.5]} intensity={0.35} color="#8f969e" />
      <group ref={monitorRef} position={[0, 0, 0]}>
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[2.95, 1.78, 0.12]} />
          <meshStandardMaterial color="#0f1116" roughness={0.62} metalness={0.38} />
        </mesh>
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[2.68, 1.5]} />
          <meshStandardMaterial
            ref={glowRef}
            color="#b8b6b0"
            roughness={0.2}
            metalness={0.02}
            emissive="#b1aca0"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0.34, 0.22, 0.055]} rotation={[0, 0, -0.2]}>
          <planeGeometry args={[1.15, 0.24]} />
          <meshStandardMaterial color="#f2ece0" transparent opacity={0.09} />
        </mesh>
        <mesh position={[0, 0, 0.058]}>
          <planeGeometry args={[2.62, 1.45]} />
          <meshStandardMaterial color="#10131a" transparent opacity={0.16} />
        </mesh>
      </group>
    </>
  )
}

function HeroMonitor3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: 27, position: [0, 0.02, 4.9] }}
      gl={{ antialias: true, alpha: false, powerPreference: 'low-power' }}
    >
      <MonitorScene />
    </Canvas>
  )
}

export default HeroMonitor3D
