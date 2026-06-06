import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import ForceGraph3D from 'react-force-graph-3d'
import SpriteText from 'three-spritetext'
import * as THREE from 'three'
import { graphData, NEIGHBORS } from './data'

export default function Graph3D({ width, height, selected, onSelect, activeGroups }) {
  const fgRef = useRef()
  const [frozen, setFrozen] = useState(false)

  const data = useMemo(() => {
    const nodes = graphData.nodes.filter(n => activeGroups.has(n.group))
    const ids = new Set(nodes.map(n => n.id))
    const links = graphData.links.filter(l => ids.has(l.source) && ids.has(l.target))
    return {
      nodes: nodes.map(n => ({ ...n })),
      links: links.map(l => ({ ...l })),
    }
  }, [activeGroups])

  const hl = selected ? NEIGHBORS[selected.id] : null

  useEffect(() => {
    const fg = fgRef.current
    if (!fg) return
    fg.d3Force('charge').strength(-700)
    fg.d3Force('link').distance(140).strength(0.6)
  }, [])

  // Al asentarse la simulación, fijar todos los nodos → arrastrar uno ya no
  // mueve a los demás (resuelve "muevo uno y se mueven todos")
  const handleEngineStop = useCallback(() => {
    data.nodes.forEach(n => { n.fx = n.x; n.fy = n.y; n.fz = n.z })
    setFrozen(true)
  }, [data])

  // Botón: congelar (fija posiciones) / reanudar (libera + recalienta física)
  const toggleFreeze = useCallback(() => {
    if (frozen) {
      data.nodes.forEach(n => { n.fx = undefined; n.fy = undefined; n.fz = undefined })
      fgRef.current?.d3ReheatSimulation()    // método confirmado en la ref
      setFrozen(false)
    } else {
      data.nodes.forEach(n => { n.fx = n.x; n.fy = n.y; n.fz = n.z })
      setFrozen(true)
    }
  }, [frozen, data])

  // ── Esfera + etiqueta SIEMPRE delante (depthTest off) ─────────
  const nodeThreeObject = useCallback((node) => {
    const group  = new THREE.Group()
    const radius = node.r * 0.5
    const isSel  = selected?.id === node.id
    const dimmed = hl && !hl.nodes.has(node.id)

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 28, 28),
      new THREE.MeshLambertMaterial({
        color: node.groupColor,
        transparent: true,
        opacity: dimmed ? 0.15 : 0.95,
        emissive: isSel ? new THREE.Color(node.groupColor) : new THREE.Color(0x000000),
        emissiveIntensity: isSel ? 0.5 : 0,
      })
    )
    group.add(sphere)

    const sprite = new SpriteText(node.label)
    sprite.color = dimmed ? 'rgba(255,255,255,0.3)' : '#ffffff'
    sprite.backgroundColor = isSel ? node.groupColor : 'rgba(13,15,26,0.82)'
    sprite.borderColor = isSel ? '#ffffff' : node.groupColor
    sprite.borderWidth = 0.5
    sprite.borderRadius = 2.5
    sprite.padding = 2
    sprite.textHeight = 4.5
    sprite.fontWeight = 'bold'
    sprite.position.set(0, radius + 4, 0)
    // SIEMPRE delante de las esferas → nunca se tapa el nombre
    sprite.material.depthTest = false
    sprite.material.depthWrite = false
    sprite.renderOrder = 999
    group.add(sprite)

    return group
  }, [selected, hl])

  const handleNodeClick = useCallback((node) => {
    onSelect(node)
    const fg = fgRef.current
    if (fg && node.x != null) {
      const dist = 130
      const r = 1 + dist / Math.hypot(node.x, node.y, node.z || 0.0001)
      fg.cameraPosition(
        { x: node.x * r, y: node.y * r, z: (node.z || 0) * r + dist },
        node, 800
      )
    }
  }, [onSelect])

  const linkThreeObject = useCallback((link) => {
    const sprite = new SpriteText(link.label)
    sprite.color = '#ffffff'
    sprite.backgroundColor = 'rgba(13,15,26,0.88)'
    sprite.borderColor = link.color
    sprite.borderWidth = 0.4
    sprite.borderRadius = 2.5
    sprite.padding = 1.6
    sprite.textHeight = 3.2
    sprite.fontWeight = 'bold'
    sprite.material.depthTest = false
    sprite.renderOrder = 998
    return sprite
  }, [])

  const linkPositionUpdate = useCallback((sprite, { start, end }) => {
    sprite.position.set(
      start.x + (end.x - start.x) / 2,
      start.y + (end.y - start.y) / 2,
      start.z + (end.z - start.z) / 2,
    )
  }, [])

  return (
    <>
      <button className="freeze-btn" onClick={toggleFreeze}>
        {frozen ? '▶ Reanudar' : '⏸ Congelar'}
      </button>
      <ForceGraph3D
        ref={fgRef}
        width={width}
        height={height}
        graphData={data}
        backgroundColor="#0d0f1a"
        nodeId="id"
        nodeLabel=""
        nodeThreeObject={nodeThreeObject}
        nodeThreeObjectExtend={false}
        linkColor={l => l.color}
        linkWidth={l => (hl && !hl.links.has(l.id)) ? 0.4 : 1.4}
        linkOpacity={0.5}
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={0.92}
        linkDirectionalParticles={l => (hl && !hl.links.has(l.id)) ? 0 : 2}
        linkDirectionalParticleWidth={1.6}
        linkDirectionalParticleSpeed={0.006}
        linkThreeObject={linkThreeObject}
        linkThreeObjectExtend={true}
        linkPositionUpdate={linkPositionUpdate}
        linkCurvature={l => l.curvature ?? 0.08}
        onNodeClick={handleNodeClick}
        onBackgroundClick={() => onSelect(null)}
        onEngineStop={handleEngineStop}
        enableNodeDrag
        showNavInfo={false}
        cooldownTicks={200}
        warmupTicks={60}
        d3VelocityDecay={0.45}
      />
    </>
  )
}
