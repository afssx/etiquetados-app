export interface LearningCase {
  id: "I01" | "I02";
  title: string;
  question: string;
  options: Array<{ text: string; feedback: string; points: number }>;
}

export const learningCases: LearningCase[] = [
  {
    id: "I01",
    title: "Una audición",
    question:
      "Un músico negro y gay se presenta a una audición. ¿Qué criterio debería guiar la decisión?",
    options: [
      {
        text: "No contratarlo: el público puede juzgarlo.",
        feedback: "La decisión convierte el prejuicio anticipado del público en una barrera.",
        points: 0,
      },
      {
        text: "Aceptarlo solo si oculta quién es.",
        feedback: "Condicionar una oportunidad a ocultar la identidad también discrimina.",
        points: 0,
      },
      {
        text: "Evaluar su interpretación con los mismos criterios.",
        feedback: "La evaluación se centra en criterios pertinentes para la audición.",
        points: 3,
      },
      {
        text: "Preguntar al público si lo acepta.",
        feedback: "La decisión justa no debería delegarse a posibles prejuicios ajenos.",
        points: 1,
      },
    ],
  },
  {
    id: "I02",
    title: "Liderar una sesión",
    question:
      "Una ingeniera de sonido negra y lesbiana solicita liderar una sesión. ¿Qué criterio utilizas?",
    options: [
      {
        text: "Evaluar su experiencia y resultados.",
        feedback: "La decisión se apoya en méritos relacionados con el trabajo.",
        points: 3,
      },
      {
        text: "Preferir un hombre para manejar al equipo.",
        feedback: "El género se usa como barrera en lugar de evaluar capacidades.",
        points: 0,
      },
      {
        text: "Preocuparme por si los clientes la juzgan.",
        feedback: "Anticipar el prejuicio de terceros puede reproducir la exclusión.",
        points: 1,
      },
      {
        text: "Darle únicamente tareas de apoyo.",
        feedback: "Limitar sus oportunidades parte de una suposición discriminatoria.",
        points: 0,
      },
    ],
  },
];
