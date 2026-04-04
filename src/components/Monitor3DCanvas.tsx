import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import Monitor3D from './Monitor3D'
import { prefersReducedMotion, isMobile } from '../utils/motionUtils'
import './Monitor3DCanvas.css'

interface Monitor3DCanvasProps {
  scrollProgress?: number
}

function Monitor3DCanvas({ scrollProgress = 0 }: Monitor3DCanvasProps) {
  const [shouldRender3D, setShouldRender3D] = useState(false)

  useEffect(() => {
    // Only render 3D if not reduced motion
    const reducedMotion = prefersReducedMotion()
    setShouldRender3D(!reducedMotion)
  }, [])

  if (!shouldRender3D) {
    // Fallback: don't render canvas if reduced motion is preferred
    return null
  }

  const mobile = isMobile()

  return (
    <div className="monitor-3d-canvas">
      <Canvas
        dpr={mobile ? [1, 1.5] : [1, 2]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />

        <Suspense fallback={null}>
          <Monitor3D scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Monitor3DCanvas
