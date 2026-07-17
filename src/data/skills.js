import {
  BrainCircuit,
  Code2,
  Database,
  HardHat,
  Palette,
  Wrench,
} from 'lucide-react';

const skills = [
  {
    category: 'Análisis de Datos',
    icon: BrainCircuit,
    items: ['Power BI', 'Python (Pandas)', 'Python (NumPy)'],
  },
  {
    category: 'Desarrollo Web',
    icon: Code2,
    items: ['React', 'Node.js', 'HTML5', 'CSS3', 'JavaScript'],
  },
  {
    category: 'Infraestructura',
    icon: HardHat,
    items: ['Armado y reparación de PC', 'Redes', 'CCTV'],
  },
  {
    category: 'Herramientas',
    icon: Wrench,
    items: ['Microsoft Office', 'Git', 'Community Management'],
  },
  {
    category: 'Bases de Datos',
    icon: Database,
    items: ['PostgreSQL', 'pgAdmin4', 'SQL Server'],
  },
  {
    category: 'Diseño y Multimedia',
    icon: Palette,
    items: ['Photoshop', 'Canva', 'Clipchamp', 'Sony Vegas', 'Diseño de flyers'],
  },
];

export default skills;
