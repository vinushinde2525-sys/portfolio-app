import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ── Stars ──────────────────────────────────────────────────
function StarField({ count = 2000 }) {
  const mesh = useRef()
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes     = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i*3]   = (Math.random()-0.5)*60
      positions[i*3+1] = (Math.random()-0.5)*40
      positions[i*3+2] = (Math.random()-0.5)*20
      sizes[i] = Math.random() * 0.04 + 0.01
    }
    return { positions, sizes }
  }, [count])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    mesh.current.rotation.y = clock.getElapsedTime() * 0.01
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.005) * 0.05
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions,3]} />
        <bufferAttribute attach="attributes-size"     args={[sizes,1]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#FFF8F0" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

// ── Shooting Stars ─────────────────────────────────────────
function ShootingStars() {
  const group = useRef()
  const stars = useMemo(() => Array.from({length:8}, (_,i) => ({
    x: (Math.random()-0.5)*30,
    y: (Math.random()-0.5)*15 + 5,
    z: (Math.random()-0.5)*5,
    speed: Math.random()*0.08 + 0.04,
    offset: Math.random()*Math.PI*2,
    length: Math.random()*3 + 1.5,
  })), [])

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.children.forEach((star, i) => {
      const s = stars[i]
      const progress = ((t*s.speed + s.offset) % 1)
      star.position.x = s.x + progress * 20 - 10
      star.position.y = s.y - progress * 12
      star.material.opacity = progress < 0.1 ? progress*10 : progress > 0.85 ? (1-progress)*6.67 : 0.8
    })
  })

  return (
    <group ref={group}>
      {stars.map((s,i) => (
        <mesh key={i} position={[s.x, s.y, s.z]}>
          <sphereGeometry args={[0.03,4,4]} />
          <meshBasicMaterial color="#FF9A3C" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

// ── Planets ────────────────────────────────────────────────
function Planet({ pos, size, color, speed, phase, emissive }) {
  const mesh = useRef()
  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.position.x = pos[0] + Math.sin(t*speed + phase)*0.6
    mesh.current.position.y = pos[1] + Math.cos(t*speed*0.7 + phase)*0.4
    mesh.current.rotation.y = t * speed * 0.3
  })
  return (
    <mesh ref={mesh} position={pos}>
      <sphereGeometry args={[size,32,32]} />
      <meshStandardMaterial color={color} emissive={emissive||color} emissiveIntensity={0.15} roughness={0.8} metalness={0.1} />
    </mesh>
  )
}

// ── Nebula Glow Orbs ───────────────────────────────────────
function NebulaOrbs() {
  const orbs = useMemo(()=>[
    { pos:[8,-1,-8],   color:'#8B2500', size:4.5, speed:0.06, phase:0 },
    { pos:[-9,3,-10],  color:'#3D0D00', size:5.5, speed:0.04, phase:2 },
    { pos:[5,6,-12],   color:'#5C1A00', size:3.5, speed:0.08, phase:4 },
    { pos:[-4,-5,-9],  color:'#4A1000', size:4.0, speed:0.05, phase:1 },
  ],[])
  return (
    <>
      {orbs.map((o,i)=>(
        <NebulaOrb key={i} {...o} />
      ))}
    </>
  )
}
function NebulaOrb({pos,color,size,speed,phase}) {
  const mesh = useRef()
  useFrame(({clock})=>{
    if(!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.position.x = pos[0]+Math.sin(t*speed+phase)*1.2
    mesh.current.position.y = pos[1]+Math.cos(t*speed*0.8+phase)*0.8
  })
  return (
    <mesh ref={mesh} position={pos}>
      <sphereGeometry args={[size,16,16]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} />
    </mesh>
  )
}

// ── Cosmic Dust particles ──────────────────────────────────
function CosmicDust({ count=800 }) {
  const mesh = useRef()
  const positions = useMemo(()=>{
    const arr = new Float32Array(count*3)
    for(let i=0;i<count;i++){
      arr[i*3]  =(Math.random()-0.5)*40
      arr[i*3+1]=(Math.random()-0.5)*25
      arr[i*3+2]=(Math.random()-0.5)*15
    }
    return arr
  },[count])

  useFrame((_,delta)=>{
    if(!mesh.current) return
    const pos = mesh.current.geometry.attributes.position
    for(let i=0;i<count;i++){
      pos.array[i*3+1]+=delta*0.03
      if(pos.array[i*3+1]>12.5) pos.array[i*3+1]=-12.5
    }
    pos.needsUpdate=true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions,3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#FF7A35" transparent opacity={0.25} sizeAttenuation />
    </points>
  )
}

// ── Mouse parallax ─────────────────────────────────────────
function Parallax() {
  const {camera} = useThree()
  const mouse = useRef({x:0,y:0})
  const target = useRef({x:0,y:0})

  useEffect(()=>{
    const fn = e=>{
      mouse.current.x = (e.clientX/window.innerWidth-0.5)*0.6
      mouse.current.y = -(e.clientY/window.innerHeight-0.5)*0.3
    }
    window.addEventListener('mousemove',fn,{passive:true})
    return ()=>window.removeEventListener('mousemove',fn)
  },[])

  useFrame(()=>{
    target.current.x += (mouse.current.x - target.current.x)*0.03
    target.current.y += (mouse.current.y - target.current.y)*0.03
    camera.position.x = target.current.x
    camera.position.y = target.current.y
    camera.lookAt(0,0,0)
  })
  return null
}

export default function GlobalCanvas() {
  return (
    <div style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',
      background:'radial-gradient(ellipse 80% 70% at 85% 40%, rgba(120,40,5,0.5) 0%, rgba(40,10,2,0.3) 35%, transparent 65%), radial-gradient(ellipse 60% 80% at 15% 60%, rgba(60,15,0,0.25) 0%, transparent 55%), #020106'
    }}>
      <Canvas camera={{position:[0,0,9],fov:55}} gl={{antialias:false,alpha:true,powerPreference:'low-power'}} style={{width:'100%',height:'100%'}}>
        <ambientLight intensity={0.1} />
        <pointLight position={[8,-2,-5]} color="#F4621F" intensity={2} distance={20} />
        <pointLight position={[-8,4,-8]} color="#FF4500" intensity={1} distance={25} />
        <Suspense fallback={null}>
          <StarField count={2200} />
          <CosmicDust count={600} />
          <ShootingStars />
          <NebulaOrbs />
          <Planet pos={[-7,3,-10]} size={1.8} color="#8B3A00" emissive="#5C2000" speed={0.05} phase={0} />
          <Planet pos={[9,-3,-12]} size={2.4} color="#6B2A00" emissive="#4A1800" speed={0.04} phase={2} />
          <Planet pos={[3,7,-15]} size={1.2} color="#7A3500" emissive="#4A1D00" speed={0.07} phase={4} />
          <Planet pos={[-4,-6,-8]} size={0.8} color="#9B4500" emissive="#5C2500" speed={0.09} phase={1} />
        </Suspense>
        <Parallax />
      </Canvas>
    </div>
  )
}
