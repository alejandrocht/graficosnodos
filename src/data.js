// ── Colores por grupo ─────────────────────────────────────────────────────
export const GROUP = {
  ac: { color: '#e8952a', name: 'Académico' },
  ev: { color: '#e74c3c', name: 'Evaluación' },
  kn: { color: '#16a085', name: 'Competencias' },
  me: { color: '#8e44ad', name: 'Mercado Laboral' },
}

// ── Nodos ─────────────────────────────────────────────────────────────────
export const RAW_NODES = [
  {
    id: '1', label: 'Facultad', group: 'ac',
    comment: 'Agrupa carreras bajo una unidad académica.',
    lines: ['Facultad'], r: 20,
    attrs: [
      ['id_facultad', 'Identifica de forma única la facultad.'],
      ['nombre_facultad', 'Nombre de la facultad.'],
      ['decano', 'Decano responsable.'],
      ['descripcion_breve_facultad', 'Descripción.'],
      ['codigo_facultad', 'Código interno de la facultad.'],
    ],
  },
  {
    id: '2', label: 'Carrera', group: 'ac',
    comment: 'Representa el programa formativo.',
    lines: ['Carrera'], r: 22,
    attrs: [
      ['id_carrera', 'Identificador de la carrera.'],
      ['nombre_carrera', 'Nombre del programa.'],
      ['codigo_carrera', 'Código administrativo.'],
      ['coordinador', 'Coordinador del programa.'],
      ['descripcion_breve_carrera', 'Descripción.'],
    ],
  },
  {
    id: '4', label: 'Curso', group: 'ac',
    comment: 'Unidad formativa.',
    lines: ['Curso'], r: 20,
    attrs: [
      ['id_curso', 'Identificador del curso.'],
      ['nombre_curso', 'Nombre del curso.'],
      ['coordinador', 'Responsable del curso.'],
      ['creditos', 'Carga académica.'],
      ['nivel', 'Ciclo o nivel.'],
      ['tipo_curso', 'Obligatorio / Electivo.'],
    ],
  },
  {
    id: '5', label: 'Silabo', group: 'ac',
    comment: 'Documenta el contenido declarado del curso.',
    lines: ['Silabo'], r: 20,
    attrs: [
      ['id_silabo', 'Identificador del sílabo.'],
      ['codigo_silabo', 'Código del sílabo.'],
      ['sumilla', 'Contenidos declarados.'],
    ],
  },
  {
    id: '7', label: 'EvalDesempeno', group: 'ev',
    comment: 'Registra mediciones de desempeño.',
    lines: ['Eval', 'Desempeño'], r: 24,
    attrs: [
      ['id_eva_desempenio', 'Identificador de evaluación.'],
      ['fecha_evaluacion', 'Fecha de la evaluación.'],
      ['periodo', 'Periodo.'],
      ['puntaje_general', 'Resultado cuantitativo.'],
      ['recomendaciones', 'Observaciones/Recomendaciones.'],
      ['fecha_inicioo', 'Inicio.'],
      ['fecha_fin', 'Fin.'],
      ['id_carrera', 'Carrera asociada.'],
      ['id_requerimiento_laboral', 'Requerimiento asociado.'],
      ['id_empresa', 'Empresa que evalúa.'],
    ],
  },
  {
    id: '8', label: 'Competencia', group: 'kn',
    comment: 'Capacidades amplias y formativas.',
    lines: ['Compe-', 'tencia'], r: 28,
    attrs: [
      ['id_competencia', 'Identificador de la competencia.'],
      ['nombre_competencia', 'Nombre de la competencia.'],
      ['descripcion_breve_competencia', 'Descripción.'],
      ['tipo_competencia', 'Blanda/Dura.'],
    ],
  },
  {
    id: '9', label: 'Habilidad', group: 'kn',
    comment: 'Capacidades observables y concretas.',
    lines: ['Habi-', 'lidad'], r: 28,
    attrs: [
      ['id_habilidades', 'Identificador de habilidad.'],
      ['nombre_habilidad', 'Nombre.'],
      ['descripcion_breve', 'Interpretación.'],
    ],
  },
  {
    id: '10', label: 'Empresa', group: 'me',
    comment: 'Organización que publica ofertas.',
    lines: ['Empresa'], r: 22,
    attrs: [
      ['id_empresa', 'Identificador de la empresa.'],
      ['nombre', 'Nombre comercial.'],
      ['ruc', 'RUC.'],
      ['razon_social', 'Razón social.'],
      ['tipo', 'Tipo de empresa.'],
      ['descripcion_breve', 'Descripción.'],
      ['id_industria', 'Industria a la que pertenece.'],
    ],
  },
  {
    id: '11', label: 'Industria', group: 'me',
    comment: 'Sector económico.',
    lines: ['Industria'], r: 20,
    attrs: [
      ['id_industria', 'Identificador de industria.'],
      ['nombre', 'Nombre del sector.'],
      ['ciiu', 'Clasificación económica.'],
      ['sector_macro', 'Agrupación.'],
      ['descripcion_breve', 'Actividades.'],
    ],
  },
  {
    id: '12', label: 'OfertaLaboral', group: 'me',
    comment: 'Publicación laboral concreta.',
    lines: ['Oferta', 'Laboral'], r: 22,
    attrs: [
      ['id_ofe_laboral', 'Identificador de oferta.'],
      ['fecha_publicacion', 'Publicación.'],
      ['fecha_finalizacion', 'Cierre.'],
      ['area', 'Área funcional.'],
      ['area_especifica', 'Sub-área.'],
      ['cargo', 'Cargo ofrecido.'],
      ['descripcion_breve', 'Descripción.'],
    ],
  },
  {
    id: '14', label: 'Puesto', group: 'me',
    comment: 'Cargo o rol laboral.',
    lines: ['Puesto'], r: 22,
    attrs: [
      ['id_puesto', 'Identificador del puesto.'],
      ['nombre', 'Nombre del cargo.'],
      ['ciclo_requerido', 'Ciclo esperado.'],
    ],
  },
  {
    id: '15', label: 'Herramienta', group: 'kn',
    comment: 'Tecnologías concretas.',
    lines: ['Herra-', 'mienta'], r: 26,
    attrs: [
      ['id_herramienta', 'Identificador de herramienta.'],
      ['nombre_herramienta', 'Nombre del software.'],
      ['descripcion_breve_herramienta', 'Descripción.'],
    ],
  },
  {
    id: '16', label: 'RequerimientoLaboral', group: 'me',
    comment: 'Intermedia entre empresa/oferta y lo solicitado.',
    lines: ['Req.', 'Laboral'], r: 25,
    attrs: [
      ['id_req_laboral', 'Identificador del requerimiento.'],
      ['id_oferta_laboral', 'Oferta asociada.'],
      ['id_puesto', 'Puesto.'],
      ['id_empresa', 'Empresa.'],
      ['id_competencia', 'Competencia.'],
      ['id_habilidad', 'Habilidad.'],
      ['id_herramienta', 'Herramienta.'],
    ],
  },
  {
    id: '17', label: 'CoberturaCurricular', group: 'ac',
    comment: 'Intermedia entre curso/sílabo y lo enseñado.',
    lines: ['Cobertura', 'Curricular'], r: 25,
    attrs: [
      ['id_cob_curricular', 'Identificador de cobertura.'],
      ['id_curso', 'Curso asociado.'],
      ['id_silabo', 'Silabo asociado.'],
      ['id_competencia', 'Competencia enseñada.'],
      ['id_habilidad', 'Habilidad enseñada.'],
      ['id_herramienta', 'Herramienta enseñada.'],
    ],
  },
]

// Posiciones fijas para la vista 2D (espacio amplio ~1650×1000).
const POS2D = {
  '1': [120, 80],     // Facultad
  '2': [120, 210],    // Carrera
  '4': [120, 500],    // Curso
  '5': [120, 660],    // Silabo
  '17': [430, 600],   // CoberturaCurricular
  '7': [430, 360],    // EvalDesempeno
  '8': [760, 210],    // Competencia
  '9': [760, 450],    // Habilidad
  '15': [760, 700],   // Herramienta
  '10': [1120, 180],  // Empresa
  '16': [1120, 440],  // RequerimientoLaboral
  '14': [1120, 670],  // Puesto
  '11': [1460, 80],   // Industria
  '12': [1460, 390],  // OfertaLaboral
}

const PK = {
  '1': 'id_facultad',
  '2': 'id_carrera',
  '4': 'id_curso',
  '5': 'id_silabo',
  '7': 'id_eva_desempenio',
  '8': 'id_competencia',
  '9': 'id_habilidades',
  '10': 'id_empresa',
  '11': 'id_industria',
  '12': 'id_ofe_laboral',
  '14': 'id_puesto',
  '15': 'id_herramienta',
  '16': 'id_req_laboral',
  '17': 'id_cob_curricular',
}

// Enriquecer nodos con color de grupo, posición 2D y PK.
export const NODES = RAW_NODES.map(n => ({
  ...n,
  groupColor: GROUP[n.group].color,
  groupName: GROUP[n.group].name,
  pk: PK[n.id],
  val: n.r * n.r, // usado por react-force-graph para collision
  x2d: POS2D[n.id][0],
  y2d: POS2D[n.id][1],
}))

// ── Links ─────────────────────────────────────────────────────────────────
// [source, target, label, grupo]
const RAW_LINKS = [
  // Académico
  ['1', '2', 'OFRECE', 'ac'],
  ['2', '4', 'CONTIENE', 'ac'],
  ['4', '5', 'TIENE', 'ac'],

  // Competencias y currículo
  ['4', '8', 'DESARROLLA', 'kn'],
  ['5', '8', 'DECLARA', 'kn'],
  ['4', '17', 'TIENE_COBERTURA', 'ac'],
  ['5', '17', 'DECLARA_COBERTURA', 'ac'],
  ['17', '8', 'CUBRE_COMPETENCIA', 'kn'],
  ['17', '9', 'ENSEÑA_HABILIDAD', 'kn'],
  ['17', '15', 'ENSEÑA_HERRAMIENTA', 'kn'],

  // Mercado laboral
  ['11', '10', 'AGRUPA', 'me'],
  ['10', '12', 'PUBLICA', 'me'],
  ['10', '16', 'PIDE_REQUERIMIENTO', 'me'],
  ['12', '16', 'TIENE_REQUERIMIENTO', 'me'],
  ['12', '2', 'DIRIGE_A', 'me'],
  ['16', '8', 'REQUIERE_COMPETENCIA', 'me'],
  ['16', '9', 'REQUIERE_HABILIDAD', 'me'],
  ['16', '15', 'REQUIERE_HERRAMIENTA', 'me'],

  // Evaluación
  ['10', '7', 'REALIZA', 'ev'],
  ['7', '8', 'MIDE', 'ev'],
  ['7', '9', 'MIDE', 'ev'],
  ['7', '15', 'MIDE', 'ev'],
  ['7', '14', 'ASOCIADA_A', 'ev'],
  ['7', '2', 'EVALUA_CARRERA', 'ev'],

  // Puesto
  ['12', '14', 'OFRECE_PUESTO', 'me'],
  ['14', '16', 'DEFINE_REQUERIMIENTO', 'me'],
]

// Curvatura en abanico: las aristas que llegan al mismo nodo se abren en
// distintos ángulos para que sus etiquetas no se encimen.
const byTarget = {}
RAW_LINKS.forEach((l, i) => { (byTarget[l[1]] ||= []).push(i) })
const CURV = {}
Object.values(byTarget).forEach(idxs => {
  const n = idxs.length
  idxs.forEach((idx, k) => {
    CURV[idx] = n === 1 ? 0.06 : (-0.34 + (0.68 * k) / (n - 1))
  })
})

export const LINKS = RAW_LINKS.map(([source, target, label, g], i) => ({
  id: `l${i}`,
  source, target, label,
  group: g,
  color: GROUP[g].color,
  curvature: CURV[i],
}))

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
