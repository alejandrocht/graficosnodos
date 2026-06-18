import { useRef, useEffect, useMemo, useCallback } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { graphData, NEIGHBORS } from './data'

export default function Graph2D({ width, height, selected, onSelect, activeGroups }) {
  const fgRef = useRef()

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

  useEffect(() => {
    const t = setTimeout(() => fgRef.current?.zoomToFit(400, 130), 150)
    return () => clearTimeout(t)
  }, [width, height, activeGroups])

  const paintNode = useCallback((node, ctx, scale) => {
    const r = node.r
    const isSel = selected?.id === node.id
    const dimmed = hl && !hl.nodes.has(node.id)

    ctx.globalAlpha = dimmed ? 0.15 : 1

    ctx.beginPath()
    ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
    ctx.fillStyle = node.groupColor
    ctx.fill()
    ctx.lineWidth = isSel ? 4 : 2
    ctx.strokeStyle = isSel ? '#1a1a2e' : '#ffffff'
    ctx.stroke()

    const fontSize = Math.max(10, Math.min(12, 12 / Math.sqrt(scale)))
    const lines = node.lines?.length ? node.lines : [node.label]
    const lineHeight = fontSize + 2

    ctx.font = `600 ${fontSize}px 'Helvetica Neue', Helvetica, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    const labelWidth = Math.max(...lines.map(line => ctx.measureText(line).width))
    const labelHeight = lineHeight * lines.length + 4
    const ty = node.y + r + 6

    ctx.fillStyle = isSel ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.9)'
    ctx.fillRect(node.x - labelWidth / 2 - 4, ty - 2, labelWidth + 8, labelHeight)
    ctx.fillStyle = isSel ? '#1a1a2e' : '#33384a'
    lines.forEach((line, i) => ctx.fillText(line, node.x, ty + 2 + (i * lineHeight)))

    ctx.globalAlpha = 1
  }, [selected, hl])

  const paintArea = useCallback((node, color, ctx) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.r + 4, 0, Math.PI * 2)
    ctx.fill()
  }, [])

  const paintLink = useCallback((link, ctx, scale) => {
    const src = link.source
    const tgt = link.target
    if (typeof src !== 'object' || typeof tgt !== 'object') return

    const dimmed = hl && !hl.links.has(link.id)
    ctx.globalAlpha = dimmed ? 0.06 : 0.78

    const mx = (src.x + tgt.x) / 2
    const my = (src.y + tgt.y) / 2
    const dx = tgt.x - src.x
    const dy = tgt.y - src.y
    const curv = link.curvature ?? 0.1
    const cx = mx - dy * curv
    const cy = my + dx * curv

    const a0 = Math.atan2(cy - src.y, cx - src.x)
    const sx = src.x + src.r * Math.cos(a0)
    const sy = src.y + src.r * Math.sin(a0)
    const a1 = Math.atan2(cy - tgt.y, cx - tgt.x)
    const ex = tgt.x + (tgt.r + 5) * Math.cos(a1)
    const ey = tgt.y + (tgt.r + 5) * Math.sin(a1)

    ctx.beginPath()
    ctx.moveTo(sx, sy)
    ctx.quadraticCurveTo(cx, cy, ex, ey)
    ctx.strokeStyle = link.color
    ctx.lineWidth = dimmed ? 0.8 : 1.6
    ctx.stroke()

    const ang = Math.atan2(ey - cy, ex - cx)
    const h = 8
    ctx.beginPath()
    ctx.moveTo(ex, ey)
    ctx.lineTo(ex - h * Math.cos(ang - Math.PI / 7), ey - h * Math.sin(ang - Math.PI / 7))
    ctx.lineTo(ex - h * Math.cos(ang + Math.PI / 7), ey - h * Math.sin(ang + Math.PI / 7))
    ctx.closePath()
    ctx.fillStyle = link.color
    ctx.fill()

    const showLabel = !dimmed

    if (showLabel) {
      const lx = 0.25 * sx + 0.5 * cx + 0.25 * ex
      const ly = 0.25 * sy + 0.5 * cy + 0.25 * ey
      const labelLines = getRelationLabelLines(link.label)
      const fs = Math.max(8, Math.min(9.5, 9.5 / Math.sqrt(scale)))
      const lineHeight = fs + 2

      ctx.font = `700 ${fs}px 'Helvetica Neue', Helvetica, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const tw = Math.max(...labelLines.map(line => ctx.measureText(line).width))
      const th = lineHeight * labelLines.length
      const padX = 4
      const padY = 3
      ctx.fillStyle = 'rgba(255,255,255,0.95)'
      ctx.strokeStyle = link.color
      ctx.lineWidth = 1
      roundRect(ctx, lx - tw / 2 - padX, ly - th / 2 - padY, tw + padX * 2, th + padY * 2, 4)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = '#2a2f3e'
      labelLines.forEach((line, i) => {
        const y = ly - th / 2 + (lineHeight / 2) + (i * lineHeight)
        ctx.fillText(line, lx, y)
      })
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

function getRelationLabelLines(label) {
  if (label.length <= 14) return [label]

  const parts = label.split('_').map((part, index, all) => (
    index < all.length - 1 ? `${part}_` : part
  ))
  const lines = []
  let current = ''

  parts.forEach(part => {
    const next = current ? `${current}${part}` : part
    if (next.length <= 14) {
      current = next
    } else {
      if (current) lines.push(current)
      current = part
    }
  })

  if (current) lines.push(current)
  return lines
}
