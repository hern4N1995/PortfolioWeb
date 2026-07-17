const projects = [
  {
    id: 1,
    title: 'SIFADECO',
    description:
      'Proyecto colaborativo desarrollado junto al área de Sistemas del Ministerio de Producción de Corrientes.',
    category: 'web',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    video: '/video/sifadeco.mp4',
    media: [{ type: 'video', src: '/video/sifadeco.mp4' }],
    liveUrl: 'https://sifadeco.vercel.app',
    repoUrl: null,
    featured: true,
  },
  {
    id: 2,
    title: 'Estudio Jurídico Tránsito Martínez',
    description:
      'Plataforma web institucional desarrollada de forma independiente para un cliente, con funcionalidades de contacto, publicación de contenidos y gestión de reseñas de clientes.',
    category: 'web',
    stack: ['React', 'Node.js'],
    video: '/video/estudio.mp4',
    media: [{ type: 'video', src: '/video/estudio.mp4' }],
    liveUrl: 'https://estudiotransito.com.ar',
    repoUrl: null,
    featured: true,
  },
  {
    id: 3,
    title: 'TecnoPC',
    description: 'Piezas gráficas para redes sociales del emprendimiento propio de reparación de PC.',
    category: 'diseno',
    client: 'TecnoPC',
    media: [
      { type: 'image', src: '/images/design/tecnopc1.jpg' },
      { type: 'image', src: '/images/design/tecnopc2.jpg' },
    ],
  },
  {
    id: 4,
    title: 'Clases de Música',
    description: 'Diseño de flyer para el emprendimiento de un cliente.',
    category: 'diseno',
    client: 'Clases de Música',
    media: [{ type: 'image', src: '/images/design/musica.png' }],
  },
  {
    id: 5,
    title: 'Ayrton Pitstop',
    description: 'Flyer y videos promocionales para redes sociales del emprendimiento de un cliente.',
    category: 'diseno',
    client: 'Ayrton Pitstop',
    media: [
      { type: 'video', src: '/video/design/ayrtonpitstop1.mp4' },
      { type: 'video', src: '/video/design/ayrtonpitstop2.mp4' },
      { type: 'image', src: '/images/design/ayrtonpitstop1.png' },
    ],
  },
];

export default projects;
