# Etiquetados

**Un juego que te etiqueta antes de conocerte.**

Experiencia web educativa y satírica sobre cómo los estereotipos pueden encasillar injustamente a las personas. El algoritmo del juego usa reglas deliberadamente prejuiciosas; sus etiquetas no describen ni determinan la identidad de quien participa.

## Ejecución local

Este proyecto se ejecutará solo en local; no se publicará ni se desplegará en un servicio de hosting.

Requisitos: Node.js compatible con Vite 8 (20.19+ o 22.12+) y npm.

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite en la terminal, normalmente `http://localhost:5173`.

## Recorrido

1. Escribe un nombre o apodo y pulsa **Comenzar**. No hay casilla de consentimiento.
2. Contesta 12 o 14 preguntas; la ruta estándar contiene 14.
3. El algoritmo adapta parte de las preguntas y presenta una clasificación satírica.
4. La revelación explica los prejuicios usados y muestra casos ficticios para reflexión.

El nombre y las respuestas permanecen en memoria durante la sesión: no hay backend, analítica, almacenamiento persistente ni publicación de resultados.

## Comandos

```bash
npm test       # pruebas del catálogo, el algoritmo y la selección
npm run build  # validación TypeScript y compilación
npm run preview
```

## Estructura

- `src/app/`: interfaz y flujo del juego.
- `src/data/questions.json`: catálogo de perfiles, preguntas y pesos.
- `src/domain/`: validación y lógica del cuestionario.
- [PLAN_DESARROLLO_ETIQUETADOS.md](./PLAN_DESARROLLO_ETIQUETADOS.md): especificación del producto y criterios éticos.

El catálogo incluye la etiqueta satírica «Mujer feminista»: el juego explica que autonomía, liderazgo y apoyo a la igualdad no permiten inferir el género ni las creencias de una persona, y que la caricatura no define el feminismo. El juego no es un test psicológico ni un detector de género, orientación sexual, raza, personalidad o ideología. `I01` e `I02` son escenarios ficticios; no forman parte del puntaje.
