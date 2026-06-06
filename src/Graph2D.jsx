import { useRef, useEffect, useMemo, useCallback } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { graphData, NEIGHBORS } from './data'

export default function Graph2D({ width, height, selected, onSelect, activeGroups }) {
  const fgRef = useRef()

  // Datos con posiciones FIJAS (fx/fy) → grafo estático, filtrados por grupo
  const data = useMemo(() => {
    const nodes = graphData.nodes.filter(n => activeGroups.has(n.group))
    const ids = new Set(nodes.map(n => n.id))
    const links = graphData.links.filter(l => ids.has(l.source) && ids.has(l.target))
    return {
      nodes: nodes.map(n => ({ ...n, fx: n.x2d, fy: n.y2d, x: n.x2d, y: n.y2d })),
      links: links.map(l => ({ ...l })),
    }
  }, [activeGroups])

  const hl = selected ? NEIGHBORS[selected.id] : null

  // Encuadrar al montar y cuando cambie tamaño o filtro
  useEffect(() => {
    const t = setTimeout(() => fgRef.current?.zoomToFit(400, 80), 150)
    return () => clearTimeout(t)
  }, [width, height, activeGroups])

  // ── Nodo: círculo de color + etiqueta DEBAJO (nunca se tapa) ──
  const paintNode = useCallback((node, ctx, scale) => {
    const r      = node.r
    const isSel  = selected?.id === node.id
    const dimmed = hl && !hl.nodes.has(node.id)

    ctx.globalAlpha = dimmed ? 0.15 : 1

    // Círculo
    ctx.beginPath()
    ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
    ctx.fillStyle = node.groupColor
    ctx.fill()
    ctx.lineWidth   = isSel ? 4 : 2
    ctx.strokeStyle = isSel ? '#1a1a2e' : '#ffffff'
    ctx.stroke()

    // Etiqueta debajo del círculo
    const fontSize = Math.max(11, 13 / Math.sqrt(scale)) // legible a cualquier zoom
    ctx.font = `600 ${fontSize}px 'Helvetica Neue', Helvetica, sans-serif`
    ctx.textAlign    = 'center'
    ctx.textBaseline = 'top'
    const label = node.label
    const tw = ctx.measureText(label).width
    const ty = node.y + r + 5
    // fondo blanco para el texto
    ctx.fillStyle = 'rgba(255,255,255,0.85)'
    ctx.fillRect(node.x - tw / 2 - 3, ty - 1, tw + 6, fontSize + 4)
    ctx.fillStyle = isSel ? '#1a1a2e' : '#33384a'
    ctx.fillText(label, node.x, ty)

    ctx.globalAlpha = 1
  }, [selected, hl])

  // Área clicable = círculo
  const paintArea = useCallback((node, color, ctx) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.r + 4, 0, Math.PI * 2)
    ctx.fill()
  }, [])

  // ── Arista: línea curva + flecha + etiqueta en pill ──────────
  const paintLink = useCallback((link, ctx) => {
    const src = link.source, tgt = link.target
    if (typeof src !== 'object' || typeof tgt !== 'object') return
    const dimmed = hl && !hl.links.has(link.id)

    ctx.globalAlpha = dimmed ? 0.07 : 0.9

    // Punto medio con curvatura
    const mx = (src.x + tgt.x) / 2
    const my = (src.y + tgt.y) / 2
    const dx = tgt.x - src.x, dy = tgt.y - src.y
    const len = Math.hypot(dx, dy) || 1
    const curv = link.curvature ?? 0.1
    const cx = mx - dy * curv
    const cy = my + dx * curv

    // Inicio en borde del círculo origen
    const a0 = Math.atan2(cy - src.y, cx - src.x)
    const sx = src.x + src.r * Math.cos(a0)
    const sy = src.y + src.r * Math.sin(a0)
    // Fin en borde del círculo destino
    const a1 = Math.atan2(cy - tgt.y, cx - tgt.x)
    const ex = tgt.x + (tgt.r + 5) * Math.cos(a1)
    const ey = tgt.y + (tgt.r + 5) * Math.sin(a1)

    // Curva
    ctx.beginPath()
    ctx.moveTo(sx, sy)
    ctx.quadraticCurveTo(cx, cy, ex, ey)
    ctx.strokeStyle = link.color
    ctx.lineWidth   = dimmed ? 1 : 2
    ctx.stroke()

    // Flecha
    const ang = Math.atan2(ey - cy, ex - cx)
    const h = 9
    ctx.beginPath()
    ctx.moveTo(ex, ey)
    ctx.lineTo(ex - h * Math.cos(ang - Math.PI / 7), ey - h * Math.sin(ang - Math.PI / 7))
    ctx.lineTo(ex - h * Math.cos(ang + Math.PI / 7), ey - h * Math.sin(ang + Math.PI / 7))
    ctx.closePath()
    ctx.fillStyle = link.color
    ctx.fill()

    // Etiqueta en el punto medio de la curva (pill)
    if (!dimmed) {
      const lx = 0.25 * sx + 0.5 * cx + 0.25 * ex
      const ly = 0.25 * sy + 0.5 * cy + 0.25 * ey
      const fs = 10
      ctx.font = `700 ${fs}px 'Helvetica Neue', Helvetica, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const tw = ctx.measureText(link.label).width
      const pad = 4
      ctx.fillStyle = '#ffffff'
      ctx.strokeStyle = link.color
      ctx.lineWidth = 1
      roundRect(ctx, lx - tw / 2 - pad, ly - fs / 2 - pad, tw + pad * 2, fs + pad * 2, 4)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = '#2a2f3e'
      ctx.fillText(link.label, lx, ly)
    }

    ctx.globalAlpha = 1
  }, [hl])

  return (
    <ForceGraph2D
      ref={fgRef}
      width={width}
      height={height}
      graphData={data}
      backgroundColor="#f8f9fb"
      nodeId="id"
      nodeCanvasObject={paintNode}
      nodeCanvasObjectMode={() => 'replace'}
      nodePointerAreaPaint={paintArea}
      linkCanvasObject={paintLink}
      linkCanvasObjectMode={() => 'replace'}
      linkCurvature={l => l.curvature ?? 0.1}
      onNodeClick={n => onSelect(n)}
      onNodeDragEnd={n => { n.fx = n.x; n.fy = n.y }}
      onBackgroundClick={() => onSelect(null)}
      enableNodeDrag={true}
      cooldownTicks={0}
      d3AlphaDecay={1}
      d3VelocityDecay={1}
      minZoom={0.3}
      maxZoom={5}
    />
  )
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
