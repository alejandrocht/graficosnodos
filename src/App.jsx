import { useState, useEffect } from 'react'
import Graph2D from './Graph2D'
import Graph3D from './Graph3D'
import { GROUP } from './data'
import './App.css'

const LEGEND = Object.entries(GROUP).map(([k, v]) => ({ key: k, ...v }))
const ALL_GROUPS = new Set(LEGEND.map(g => g.key))

export default function App() {
  const [view, setView] = useState('2d')                       // '2d' | '3d'
  const [selected, setSelected] = useState(null)
  const [activeGroups, setActiveGroups] = useState(new Set(ALL_GROUPS))
  const [dims, setDims] = useState({ w: window.innerWidth, h: window.innerHeight })

  useEffect(() => {
    const onResize = () => setDims({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Toggle de un grupo en el filtro
  const toggleGroup = (key) => {
    setSelected(null)
    setActiveGroups(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      // nunca dejar el grafo totalmente vacío → si se apaga el último, mostrar todos
      return next.size === 0 ? new Set(ALL_GROUPS) : next
    })
  }
  const isolateGroup = (key) => { setSelected(null); setActiveGroups(new Set([key])) }
  const showAll      = () => { setSelected(null); setActiveGroups(new Set(ALL_GROUPS)) }

  const allActive = activeGroups.size === ALL_GROUPS.size

  return (
    <div className="root">
      <header className="topbar">
        <span className="topbar-title">Ontología CIAR</span>
        <span className="topbar-sub">14 entidades · 29 relaciones</span>
        <div className="toggle">
          <button className={`toggle-btn ${view === '2d' ? 'active' : ''}`}
            onClick={() => { setView('2d'); setSelected(null) }}>2D</button>
          <button className={`toggle-btn ${view === '3d' ? 'active' : ''}`}
            onClick={() => { setView('3d'); setSelected(null) }}>3D</button>
        </div>
      </header>

      {view === '2d'
        ? <Graph2D width={dims.w} height={dims.h} selected={selected} onSelect={setSelected} activeGroups={activeGroups} />
        : <Graph3D width={dims.w} height={dims.h} selected={selected} onSelect={setSelected} activeGroups={activeGroups} />}

      {/* Panel de atributos (compartido) */}
      <div className={`panel ${selected ? 'open' : ''}`}>
        {selected && (
          <>
            <div className="ph" style={{ background: selected.groupColor }}>
              <div>
                <div className="ph-title">{selected.label}</div>
                <div className="ph-sub">{selected.groupName}</div>
              </div>
              <button className="ph-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="pb">
              <div className="section-label">ATRIBUTOS</div>
              {selected.attrs.map(([name, hint]) => {
                const isPk = name === selected.pk
                return (
                  <div key={name} className={`attr-row ${isPk ? 'is-pk' : ''}`}>
                    <code className="attr-name">{name}</code>
                    {isPk && <span className="pk-badge">PK</span>}
                    {hint && <span className="attr-hint">{hint}</span>}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Filtro por grupo (leyenda interactiva) */}
      <div className="legend">
        <div className="legend-head">
          <span className="legend-title">Filtrar por grupo</span>
          {!allActive && <button className="legend-all" onClick={showAll}>Todos</button>}
        </div>
        {LEGEND.map(lg => {
          const on = activeGroups.has(lg.key)
          return (
            <div
              key={lg.key}
              className={`lg-row clickable ${on ? '' : 'off'}`}
              onClick={() => toggleGroup(lg.key)}
              onDoubleClick={() => isolateGroup(lg.key)}
              title="Clic: mostrar/ocultar · Doble clic: ver solo este"
            >
              <div className="lg-dot" style={{ background: lg.color, opacity: on ? 1 : 0.3 }} />
              <span>{lg.name}</span>
              <span className="lg-check">{on ? '✓' : ''}</span>
            </div>
          )
        })}
        <div className="legend-hint">
          {view === '2d'
            ? 'Clic nodo → relaciones + atributos · doble clic grupo → aislar'
            : '⏸ congela física · clic nodo → atributos · doble clic grupo → aislar'}
        </div>
      </div>
    </div>
  )
}
