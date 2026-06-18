// ── Colores por grupo ─────────────────────────────────────────────────────
export const GROUP = {
  ac: { color: '#e8952a', name: 'Académico' },
  ev: { color: '#e74c3c', name: 'Evaluación' },
  kn: { color: '#16a085', name: 'Competencias' },
  me: { color: '#8e44ad', name: 'Mercado Laboral' },
}

// ── Nodos ─────────────────────────────────────────────────────────────────
// comment: explica por qué el nodo existe en la ontología.
// lines: cómo se muestra el label en el círculo.
// attrs: [[nombre, por qué existe], ...]
export const RAW_NODES = [
  {
    id: '1', label: 'Facultad', group: 'ac',
    comment: 'Agrupa carreras bajo una unidad académica y permite ubicar la responsabilidad institucional del programa.',
    lines: ['Facultad'], r: 20,
    attrs: [
      ['id_facultad', 'Identifica de forma única la facultad.'],
      ['nombre_facultad', 'Permite reconocer la unidad académica por su nombre oficial.'],
      ['decano', 'Registra la autoridad responsable de la facultad.'],
      ['descripcion_breve', 'Resume el alcance académico de la facultad.'],
    ],
  },
  {
    id: '2', label: 'Carrera', group: 'ac',
    comment: 'Representa el programa formativo que organiza la malla, los cursos y el perfil profesional esperado.',
    lines: ['Carrera'], r: 22,
    attrs: [
      ['id_carrera', 'Identifica de forma única la carrera.'],
      ['nombre_carrera', 'Permite mostrar el nombre oficial del programa.'],
      ['codigo_carrera', 'Conecta la carrera con códigos internos o administrativos.'],
      ['descripcion_breve_carrera', 'Explica el foco formativo de la carrera.'],
    ],
  },
  {
    id: '3', label: 'MallaCurricular', group: 'ac',
    comment: 'Ordena los cursos de una carrera en un plan vigente y permite analizar cobertura curricular por periodo.',
    lines: ['Malla', 'Curricular'], r: 22,
    attrs: [
      ['id_malla', 'Identifica de forma única la malla curricular.'],
      ['nombre_malla', 'Distingue versiones o planes curriculares.'],
      ['anio_inicio', 'Indica desde cuándo aplica la malla.'],
      ['anio_fin', 'Indica hasta cuándo aplica o si fue reemplazada.'],
      ['estado', 'Permite saber si la malla está activa, cerrada o en revisión.'],
    ],
  },
  {
    id: '4', label: 'Curso', group: 'ac',
    comment: 'Es la unidad formativa donde se desarrollan competencias y se cubren habilidades o herramientas.',
    lines: ['Curso'], r: 20,
    attrs: [
      ['id_curso', 'Identifica de forma única el curso.'],
      ['nombre_curso', 'Permite reconocer el curso dentro de la malla.'],
      ['nivel', 'Ubica el curso por ciclo, semestre o progresión formativa.'],
      ['creditos', 'Mide la carga académica del curso.'],
      ['coordinador', 'Registra al responsable académico del curso.'],
      ['modalidad', 'Indica si el curso se dicta presencial, virtual o híbrido.'],
    ],
  },
  {
    id: '5', label: 'Silabo', group: 'ac',
    comment: 'Documenta el contenido declarado del curso y sirve como evidencia formal de lo que se pretende enseñar.',
    lines: ['Silabo'], r: 20,
    attrs: [
      ['id_silabo', 'Identifica de forma única el sílabo.'],
      ['sumilla', 'Resume los contenidos y objetivos declarados del curso.'],
    ],
  },
  {
    id: '7', label: 'EvalDesempeno', group: 'ev',
    comment: 'Registra mediciones de desempeño para observar competencias, habilidades y puestos asociados.',
    lines: ['Eval', 'Desempeño'], r: 24,
    attrs: [
      ['id_evaluacion', 'Identifica de forma única la evaluación.'],
      ['fecha_evaluacion', 'Permite ubicar cuándo se midió el desempeño.'],
      ['periodo', 'Agrupa evaluaciones por ciclo, campaña o intervalo.'],
      ['puntaje_general', 'Resume cuantitativamente el resultado obtenido.'],
      ['nivel_desempeno', 'Clasifica el resultado en una escala interpretable.'],
      ['comentarios', 'Conserva observaciones cualitativas del evaluador.'],
      ['evaluador', 'Identifica quién realizó la evaluación.'],
      ['tipo_evaluacion', 'Distingue si la evaluación es laboral, académica, práctica u otra.'],
    ],
  },
  {
    id: '8', label: 'Competencia', group: 'kn',
    comment: 'Representa capacidades amplias y formativas que se evidencian mediante habilidades concretas.',
    lines: ['Compe-', 'tencia'], r: 28,
    attrs: [
      ['id_competencia', 'Identifica de forma única la competencia.'],
      ['nombre_competencia', 'Permite nombrar la competencia en lenguaje académico o laboral.'],
      ['nombre_estandar', 'Normaliza nombres equivalentes para comparación e integración.'],
      ['tipo_competencia', 'Distingue competencias genéricas de competencias específicas.'],
      ['dimension', 'Agrupa la competencia por dimensión formativa o profesional.'],
      ['descripcion', 'Explica el alcance conceptual de la competencia.'],
      ['fuente', 'Indica de dónde proviene la definición de la competencia.'],
    ],
  },
  {
    id: '9', label: 'Habilidad', group: 'kn',
    comment: 'Modela capacidades observables y concretas que pueden requerirse en empleo o enseñarse en currículo.',
    lines: ['Habi-', 'lidad'], r: 28,
    attrs: [
      ['id_habilidad', 'Identifica de forma única la habilidad.'],
      ['nombre_habilidad', 'Permite nombrar la habilidad observable.'],
      ['nombre_estandar', 'Normaliza variantes de una misma habilidad.'],
      ['tipo_habilidad', 'Clasifica la habilidad como técnica, blanda, analítica u otra.'],
      ['descripcion', 'Aclara qué conducta o capacidad representa la habilidad.'],
    ],
  },
  {
    id: '10', label: 'Empresa', group: 'me',
    comment: 'Representa la organización que publica ofertas, pide requerimientos y realiza evaluaciones.',
    lines: ['Empresa'], r: 22,
    attrs: [
      ['ruc', 'Identifica legalmente a la empresa.'],
      ['razon_social', 'Registra el nombre legal de la organización.'],
      ['nombre', 'Permite mostrar el nombre comercial o reconocible.'],
      ['tamaño', 'Contextualiza la escala de la empresa.'],
      ['tipo', 'Distingue si la empresa es pública, privada u otra.'],
      ['descripcion_breve', 'Resume la actividad o perfil de la empresa.'],
    ],
  },
  {
    id: '11', label: 'Industria', group: 'me',
    comment: 'Clasifica empresas y demandas por sector económico para analizar patrones del mercado laboral.',
    lines: ['Industria'], r: 20,
    attrs: [
      ['id_industria', 'Identifica de forma única la industria.'],
      ['nombre', 'Permite mostrar el nombre del sector o industria.'],
      ['ciiu', 'Conecta la industria con una clasificación económica estándar.'],
      ['sector_macro', 'Agrupa industrias en categorías amplias como tecnología, banca o salud.'],
      ['descripcion_breve', 'Explica qué actividades incluye la industria.'],
    ],
  },
  {
    id: '12', label: 'OfertaLaboral', group: 'me',
    comment: 'Representa una publicación laboral concreta que ofrece un puesto y contiene requerimientos solicitados.',
    lines: ['Oferta', 'Laboral'], r: 22,
    attrs: [
      ['id_oferta', 'Identifica de forma única la oferta laboral.'],
      ['fecha_publicidad', 'Permite analizar cuándo fue publicada la oferta.'],
      ['modalidad', 'Indica si el trabajo es presencial, remoto o híbrido.'],
      ['Area', 'Ubica la oferta dentro de un área funcional.'],
      ['cargo', 'Describe el cargo anunciado.'],
      ['posicion', 'Distingue nivel o tipo de posición ofrecida.'],
      ['desc_breve', 'Resume el contenido de la publicación laboral.'],
    ],
  },
  {
    id: '13', label: 'DemandaMercado', group: 'me',
    comment: 'Agrupa señales del mercado para identificar qué perfiles, habilidades o herramientas aparecen con mayor demanda.',
    lines: ['Demanda', 'Mercado'], r: 22,
    attrs: [
      ['id_demanda', 'Identifica de forma única la demanda observada.'],
      ['periodo', 'Permite analizar la demanda en un intervalo temporal.'],
      ['descripcion', 'Resume el patrón de demanda detectado.'],
      ['nivel_demanda', 'Clasifica la intensidad de la demanda.'],
      ['frecuencia_aparicion', 'Mide cuántas veces aparece el patrón en las ofertas.'],
      ['cantidad_ofertas', 'Indica cuántas ofertas sostienen la demanda observada.'],
      ['fuente', 'Indica de dónde se extrajo la señal de mercado.'],
      ['sector_referencial', 'Solo conserva texto auxiliar; la industria principal se modela con Industria --PRESENTA--> DemandaMercado.'],
    ],
  },
  {
    id: '14', label: 'Puesto', group: 'me',
    comment: 'Representa el cargo o rol laboral ofrecido; sirve como contexto para responsabilidades, nivel y requerimientos del empleo.',
    lines: ['Puesto'], r: 22,
    attrs: [
      ['id_puesto', 'Identifica de forma única el puesto.'],
      ['nombre_puesto', 'Nombra el cargo o rol solicitado en la oferta laboral.'],
      ['nivel_experiencia', 'Indica la seniority o experiencia esperada para el puesto.'],
      ['departamento', 'Ubica el puesto dentro de un área organizacional.'],
      ['descripcion_breve', 'Resume el propósito, tareas principales o alcance del puesto.'],
    ],
  },
  {
    id: '15', label: 'Herramienta', group: 'kn',
    comment: 'Representa tecnologías concretas que pueden ser solicitadas por empresas o enseñadas en cursos.',
    lines: ['Herra-', 'mienta'], r: 26,
    attrs: [
      ['id_herramienta', 'Identifica de forma única la herramienta.'],
      ['nombre_herramienta', 'Permite nombrar software, lenguaje, plataforma o tecnología.'],
      ['nombre_estandar', 'Normaliza variantes como Excel, MS Excel o Microsoft Excel.'],
      ['categoria_herramienta', 'Clasifica la herramienta por tipo: software, lenguaje, framework, plataforma u otra.'],
      ['descripcion', 'Explica para qué se usa la herramienta.'],
    ],
  },
  {
    id: '16', label: 'RequerimientoLaboral', group: 'me',
    comment: 'Intermedia entre empresa/oferta y lo solicitado, evitando conectar ofertas directamente con habilidades o herramientas.',
    lines: ['Req.', 'Laboral'], r: 25,
    attrs: [
      ['id_requerimiento', 'Identifica de forma única el requerimiento extraído.'],
      ['texto_original', 'Conserva el texto tal como apareció en la oferta.'],
      ['tipo_requerimiento', 'Distingue si el requerimiento es competencia, habilidad, herramienta, experiencia u otro.'],
      ['nivel_requerido', 'Indica el grado de dominio solicitado.'],
      ['obligatorio', 'Permite diferenciar requisitos excluyentes de deseables.'],
      ['fuente_columna', 'Registra de qué campo o columna se extrajo el requisito.'],
      ['confianza_extraccion', 'Mide qué tan confiable fue la extracción automática o manual.'],
    ],
  },
  {
    id: '17', label: 'CoberturaCurricular', group: 'ac',
    comment: 'Intermedia entre curso/sílabo y lo enseñado, permitiendo comparar currículo contra requerimientos laborales.',
    lines: ['Cobertura', 'Curricular'], r: 25,
    attrs: [
      ['id_cobertura', 'Identifica de forma única la cobertura curricular.'],
      ['texto_original', 'Conserva el texto académico original del curso o sílabo.'],
      ['unidad_silabo', 'Ubica la cobertura dentro de una unidad o sección del sílabo.'],
      ['nivel_ensenado', 'Indica el nivel de profundidad con que se enseña.'],
      ['tipo_cobertura', 'Distingue si se cubre competencia, habilidad, herramienta u otro elemento.'],
      ['fuente_documento', 'Indica el documento de donde se extrajo la cobertura.'],
      ['confianza_extraccion', 'Mide qué tan confiable fue la extracción de la cobertura.'],
    ],
  },
]

// Posiciones fijas para la vista 2D (espacio amplio ~1650×1000).
// Layout por zonas: académico (izq) → evaluación (centro)
// → competencias/habilidades/herramientas (centro-derecha) → mercado (der).
const POS2D = {
  '1': [120, 80],     // Facultad
  '2': [120, 210],    // Carrera
  '3': [120, 340],    // MallaCurricular
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
  '13': [1460, 680],  // DemandaMercado
}

// Primary Key de cada entidad (id_* donde existe; clave natural en las demás).
const PK = {
  '1': 'id_facultad',
  '2': 'id_carrera',
  '3': 'id_malla',
  '4': 'id_curso',
  '5': 'id_silabo',
  '7': 'id_evaluacion',
  '8': 'id_competencia',
  '9': 'id_habilidad',
  '10': 'ruc',
  '11': 'id_industria',
  '12': 'id_oferta',
  '13': 'id_demanda',
  '14': 'id_puesto',
  '15': 'id_herramienta',
  '16': 'id_requerimiento',
  '17': 'id_cobertura',
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
  ['2', '3', 'TIENE', 'ac'],
  ['3', '4', 'CONTIENE', 'ac'],
  ['4', '5', 'TIENE', 'ac'],

  // Competencias y currículo
  ['4', '8', 'DESARROLLA', 'kn'],
  ['5', '8', 'DECLARA', 'kn'],
  ['8', '9', 'SE_EVIDENCIA_EN', 'kn'],
  ['4', '17', 'TIENE_COBERTURA', 'ac'],
  ['5', '17', 'DECLARA_COBERTURA', 'ac'],
  ['17', '8', 'CUBRE_COMPETENCIA', 'kn'],
  ['17', '9', 'ENSEÑA_HABILIDAD', 'kn'],
  ['17', '15', 'ENSEÑA_HERRAMIENTA', 'kn'],

  // Mercado laboral
  ['11', '10', 'AGRUPA', 'me'],
  ['11', '13', 'PRESENTA', 'me'],
  ['13', '12', 'AGRUPA', 'me'],
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
  ['7', '14', 'ASOCIADA_A', 'ev'],

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
