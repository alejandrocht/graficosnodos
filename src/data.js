// ── Colors por grupo ──────────────────────────────────────────────
export const GROUP = {
  ac: { color: '#e8952a', name: 'Académico'         },
  po: { color: '#2980b9', name: 'Postulante'         },
  ev: { color: '#e74c3c', name: 'Evaluación'         },
  kn: { color: '#16a085', name: 'Conocimiento'       },
  me: { color: '#8e44ad', name: 'Mercado Laboral'    },
}

// ── Nodos ─────────────────────────────────────────────────────────
// lines: cómo se muestra el label en el círculo
// attrs: [[nombre, hint?], ...]
export const RAW_NODES = [
  {
    id: '1', label: 'Facultad', group: 'ac',
    lines: ['Facultad'], r: 20,
    attrs: [['id_facultad'], ['nombre'], ['decano'], ['descripcion_breve']],
  },
  {
    id: '2', label: 'Carrera', group: 'ac',
    lines: ['Carrera'], r: 22,
    attrs: [
      ['id_carrera'], ['nombre'], ['grado_academico'], ['modalidad'],
      ['descripcion_breve'], ['estado', 'Activo / Rediseño'],
    ],
  },
  {
    id: '3', label: 'MallaCurricular', group: 'ac',
    lines: ['Malla', 'Curricular'], r: 22,
    attrs: [
      ['id_malla'], ['nombre_malla'], ['version'],
      ['anio_inicio'], ['anio_fin'], ['total_creditos'], ['estado'],
    ],
  },
  {
    id: '4', label: 'Curso', group: 'ac',
    lines: ['Curso'], r: 20,
    attrs: [
      ['id_curso'], ['codigo_signatura'], ['nombre'], ['creditos'],
      ['nivel'], ['tipo_curso'], ['coordinador'], ['descripcion_breve'],
    ],
  },
  {
    id: '5', label: 'Silabo', group: 'ac',
    lines: ['Silabo'], r: 20,
    attrs: [
      ['id_silabo'], ['periodo_academico'], ['version'], ['sumilla'],
      ['objetivo_general'], ['contenidos'], ['metodologia'],
      ['sistema_evaluacion'], ['fecha_actualizacion'],
    ],
  },
  {
    id: '6', label: 'Postulante', group: 'po',
    lines: ['Postulante'], r: 28,
    attrs: [
      ['id_postulante'], ['sexo'], ['fecha_nacimiento'], ['fecha_ingreso'],
      ['carrera'], ['puesto_actual'], ['nivel', 'ciclo'],
      ['situacion', 'estudiante / egresado'],
      ['PPA', 'promedio ponderado actual'],
      ['PPG', 'promedio ponderado general'],
      ['Rango_merito'],
    ],
  },
  {
    id: '7', label: 'EvalDesempeno', group: 'ev',
    lines: ['Eval', 'Desempeño'], r: 24,
    attrs: [
      ['id_evaluacion'], ['fecha_evaluacion'], ['periodo'],
      ['puntaje_general'], ['nivel_desempeno'],
      ['comentarios'], ['evaluador'], ['tipo_evaluacion'],
    ],
  },
  {
    id: '8', label: 'Competencias', group: 'kn',
    lines: ['Competen-', 'cias'], r: 28,
    attrs: [
      ['nombre_competencia'], ['tipo_competencia'],
      ['descripcion_breve'], ['categoria'],
    ],
  },
  {
    id: '9', label: 'Conocimiento', group: 'kn',
    lines: ['Conoci-', 'miento'], r: 28,
    attrs: [
      ['nombre_estandar'],
      ['categoria', 'hard skill / soft skill / herramienta / marco teórico'],
      ['sinonimos', 'lista de alias: "Python3", "Py"'],
      ['nivel_complejidad'], ['descripcion_breve'],
    ],
  },
  {
    id: '10', label: 'Empresa', group: 'me',
    lines: ['Empresa'], r: 22,
    attrs: [
      ['ruc'], ['razon_social'], ['nombre'], ['tamaño'],
      ['tipo', 'público / privado'], ['descripcion_breve'],
    ],
  },
  {
    id: '11', label: 'Industria', group: 'me',
    lines: ['Industria'], r: 20,
    attrs: [
      ['id_industria'], ['nombre'], ['ciiu'],
      ['sector_macro', 'ej: tecnología, banca, salud'], ['descripcion_breve'],
    ],
  },
  {
    id: '12', label: 'OfertaLaboral', group: 'me',
    lines: ['Oferta', 'Laboral'], r: 22,
    attrs: [
      ['id_oferta'], ['fecha_publicidad'],
      ['modalidad', 'presencial / remoto / híbrido'],
      ['Area'], ['cargo'], ['posicion'], ['desc_breve'],
    ],
  },
  {
    id: '13', label: 'DemandaMercado', group: 'me',
    lines: ['Demanda', 'Mercado'], r: 22,
    attrs: [
      ['id_demanda'], ['periodo'], ['sector'], ['descripcion'],
      ['nivel_demanda'], ['frecuencia_aparicion'], ['cantidad_ofertas'],
      ['fuente', 'linkedin, bolsa de la universidad'],
    ],
  },
  {
    id: '14', label: 'Funcion', group: 'me',
    lines: ['Función'], r: 22,
    attrs: [
      ['id_funcion'], ['nombre_puesto'], ['nivel_experiencia'],
      ['departamento'], ['descripcion_breve'],
    ],
  },
]

// Posiciones fijas para la vista 2D (espacio amplio ~1500×1000).
// Layout por zonas: académico (izq) → persona/eval (centro) → mercado (der),
// con Competencias y Conocimiento como hubs centrales bien separados.
const POS2D = {
  '1' : [150, 140],   // Facultad
  '2' : [150, 330],   // Carrera
  '3' : [150, 520],   // MallaCurricular
  '4' : [150, 710],   // Curso
  '5' : [150, 900],   // Silabo
  '6' : [500, 240],   // Postulante
  '7' : [540, 780],   // EvalDesempeno
  '8' : [800, 350],   // Competencias    (hub)
  '9' : [800, 740],   // Conocimiento    (hub)
  '10': [1140, 290],  // Empresa
  '11': [1410, 150],  // Industria
  '12': [1390, 480],  // OfertaLaboral
  '13': [1390, 770],  // DemandaMercado
  '14': [1070, 570],  // Funcion
}

// Primary Key de cada entidad (id_* donde existe; clave natural en las demás).
const PK = {
  '1':'id_facultad', '2':'id_carrera', '3':'id_malla', '4':'id_curso', '5':'id_silabo',
  '6':'id_postulante', '7':'id_evaluacion', '8':'nombre_competencia', '9':'nombre_estandar',
  '10':'ruc', '11':'id_industria', '12':'id_oferta', '13':'id_demanda', '14':'id_funcion',
}

// Enriquecer nodos con color de grupo, posición 2D y PK
export const NODES = RAW_NODES.map(n => ({
  ...n,
  groupColor: GROUP[n.group].color,
  groupName:  GROUP[n.group].name,
  pk: PK[n.id],
  val: n.r * n.r,        // usado por react-force-graph para collision
  x2d: POS2D[n.id][0],
  y2d: POS2D[n.id][1],
}))

// ── Links ─────────────────────────────────────────────────────────
// [source, target, label, grupo]
const RAW_LINKS = [
  ['1','2','OFRECE','ac'],
  ['2','3','TIENE','ac'],
  ['3','4','CONTIENE','ac'],
  ['4','5','TIENE','ac'],
  ['5','9','INCLUYE','kn'],
  ['4','9','ENSENHA','kn'],
  ['4','8','DESARROLLA','kn'],
  ['5','8','DECLARA','kn'],
  ['2','6','FORMA','po'],
  ['6','2','ESTUDIO','po'],
  ['6','8','POSEE','po'],
  ['6','9','DOMINA','po'],
  ['6','10','TRABAJA_EN','po'],
  ['6','14','REALIZA','po'],
  ['10','7','REALIZA','ev'],
  ['7','6','EVALUA','ev'],
  ['7','8','MIDE','ev'],
  ['7','9','MIDE','ev'],
  ['7','14','ASOCIADA_A','ev'],
  ['11','10','AGRUPA','me'],
  ['10','12','PUBLICA','me'],
  ['13','12','AGRUPA','me'],
  ['12','8','REQUIERE','me'],
  ['12','9','REQUIERE','me'],
  ['12','14','INCLUYE','me'],
  ['13','8','EXIGE','me'],
  ['13','9','EXIGE','me'],
  ['14','8','REQUIERE','me'],
  ['14','9','USA','me'],
]

// Curvatura en abanico: las aristas que LLEGAN al mismo nodo se abren en
// distintos ángulos → sus etiquetas no se enciman (clave en los hubs).
const byTarget = {}
RAW_LINKS.forEach((l, i) => { (byTarget[l[1]] ||= []).push(i) })
const CURV = {}
Object.values(byTarget).forEach(idxs => {
  const n = idxs.length
  idxs.forEach((idx, k) => {
    CURV[idx] = n === 1 ? 0.06 : (-0.34 + (0.68 * k) / (n - 1))
  })
})

export const LINKS = RAW_LINKS.map(([source, target, label, g], i) => {
  let curvature = CURV[i]
  // bidireccional Carrera↔Postulante: curvas opuestas para no superponerse
  if (source === '2' && target === '6') curvature = 0.28
  if (source === '6' && target === '2') curvature = -0.28
  return {
    id: `l${i}`,
    source, target, label,
    group: g,
    color: GROUP[g].color,
    curvature,
  }
})

export const graphData = {
  nodes: NODES.map(n => ({ ...n })),
  links: LINKS.map(l => ({ ...l })),
}

// Vecindad: id de nodo → { nodes:Set(ids vecinos+self), links:Set(ids de aristas) }
export const NEIGHBORS = (() => {
  const map = {}
  NODES.forEach(n => { map[n.id] = { nodes: new Set([n.id]), links: new Set() } })
  LINKS.forEach(l => {
    map[l.source].nodes.add(l.target)
    map[l.target].nodes.add(l.source)
    map[l.source].links.add(l.id)
    map[l.target].links.add(l.id)
  })
  return map
})()
