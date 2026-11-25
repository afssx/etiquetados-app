# Etiquetados — Desarrollo de la aplicación web

## Visión del producto

**Etiquetados** es una experiencia web educativa y satírica sobre cómo los estereotipos pueden encasillar injustamente a las personas. Su concepto principal es: «Un juego que te etiqueta antes de conocerte».

El participante responde preguntas sobre gustos y comportamientos. Un algoritmo deliberadamente prejuicioso transforma esas respuestas en una clasificación satírica y después explica las asociaciones arbitrarias utilizadas.

El juego no es un test psicológico ni un detector de género, orientación sexual, raza, personalidad o ideología. Sus resultados describen las reglas del sistema ficticio, no la identidad ni las creencias de quien participa. La sátira se dirige al algoritmo y no al participante.

## Alcance implementado

- Aplicación web en español, ejecutada localmente y sin inicio de sesión.
- Nombre o seudónimo de 2 a 30 caracteres; no se solicitan datos de identidad.
- Recorrido seleccionable de 12 o 14 preguntas, con 14 como opción predeterminada.
- Preguntas adaptativas, resultado satírico, explicación de las reglas y dos casos ficticios de reflexión.
- Nombre, respuestas y elecciones de los casos mantenidos en memoria durante la sesión, sin backend, analítica ni almacenamiento persistente.
- Sonido opcional, apagado inicialmente, y opción para reiniciar.

Esta entrega no se publica ni se despliega en un servicio de hosting.

## Recorrido

1. La pantalla inicial presenta la experiencia satírica y solicita un nombre o apodo y la cantidad de preguntas. No hay casilla de consentimiento.
2. Se muestra una pregunta por pantalla, con cuatro opciones, progreso y navegación hacia atrás. La respuesta es obligatoria para avanzar.
3. Al completar las preguntas aparece una animación breve de procesamiento que se puede saltar.
4. El resultado muestra una o dos clasificaciones satíricas, o un resultado indeterminado si no hay suficiente apoyo. También presenta índices de caricatura, no probabilidades.
5. La revelación explica algunas asociaciones entre las respuestas y los prejuicios programados. Después presenta dos casos ficticios con retroalimentación; no afectan la clasificación.
6. La persona puede reiniciar el juego y borrar el estado de la sesión.

Durante el cuestionario se pueden usar las teclas 1–4 para elegir y Enter para avanzar cuando corresponda. La interfaz incluye estilos adaptables, foco visible y una alternativa de movimiento reducido.

## Banco de preguntas

El archivo [`src/data/questions.json`](../src/data/questions.json) es la fuente de verdad del catálogo de perfiles, las preguntas, sus opciones y los pesos. No es necesario mantener una copia de ese contenido en este documento.

El banco contiene 36 preguntas, cada una con cuatro opciones A–D. Cada opción aporta pesos enteros de 1 a 3 a uno o más perfiles puntuables; estos puntos no representan probabilidades ni evidencia sobre la identidad de una persona. Los dos perfiles de escenarios ficticios no reciben pesos.

Al cargar la aplicación, el dominio valida la estructura del banco, los identificadores, las opciones, los pesos y la distribución de preguntas por grupo. Un banco inválido produce un error explícito.

## Puntuación y selección adaptativa

La lógica está implementada en [`src/domain/quiz.ts`](../src/domain/quiz.ts):

1. Se barajan las ocho preguntas base con una semilla generada localmente.
2. Tras responderlas, se calcula la afinidad de cada grupo adaptativo como el promedio de sus dos índices de perfil más altos. Se seleccionan los dos grupos de mayor afinidad; la semilla resuelve los empates.
3. Se eligen una pregunta por grupo para el recorrido de 12 o dos por grupo para el de 14, más dos preguntas de contraste. La selección es reproducible con la misma semilla y respuestas.
4. Para cada perfil, se suman los puntos de las respuestas y el máximo posible en las preguntas respondidas. El índice de caricatura se calcula como `100 × puntos / puntos posibles × min(1, apoyos / 2)`, redondeado; si no hay puntos posibles, es cero. Los apoyos son preguntas distintas que aportan puntos al perfil.
5. Solo pueden liderar perfiles con al menos dos apoyos. Se ordenan por índice, puntos e identificador; si los dos primeros índices difieren en ocho puntos o menos, se muestran ambos. Si no hay perfiles elegibles, el resultado es indeterminado.

Si se modifica una respuesta base después de seleccionar la ruta adaptativa, se descartan las respuestas posteriores, se informa a la persona y se vuelve a seleccionar la ruta. Cambiar una respuesta adaptativa mantiene la selección y recalcula el resultado.

## Escenarios de reflexión

Los dos casos interseccionales se implementan en [`src/domain/learningCases.ts`](../src/domain/learningCases.ts) y aparecen después de abrir la revelación. Cada opción muestra retroalimentación sobre la decisión planteada. Los casos son ficticios, no clasifican a la persona, no modifican el resultado y sus respuestas no se almacenan de forma persistente.

## Arquitectura

| Área | Implementación |
|---|---|
| Interfaz y estado | React y TypeScript; `useReducer` y estado local |
| Compilación y desarrollo | Vite |
| Estilos y animaciones | CSS en [`src/styles.css`](../src/styles.css) |
| Sonido | Web Audio API, con control de silencio |
| Datos | JSON local, validado al cargar |
| Pruebas | Vitest |

La navegación entre pantallas se gestiona mediante estado de React, sin rutas independientes. No se utiliza IA real ni se envían las respuestas a un servidor.

### Archivos principales

- [`src/app/App.tsx`](../src/app/App.tsx): pantallas, estado y flujo del juego.
- [`src/data/questions.json`](../src/data/questions.json): perfiles, preguntas, opciones y pesos.
- [`src/domain/quiz.ts`](../src/domain/quiz.ts): validación, selección y puntuación.
- [`src/domain/learningCases.ts`](../src/domain/learningCases.ts): casos ficticios y retroalimentación.
- [`src/domain/quiz.test.ts`](../src/domain/quiz.test.ts) y [`src/domain/reachability.test.ts`](../src/domain/reachability.test.ts): pruebas de la lógica y el alcance de resultados.

## Ejecución y comprobación

Se requiere Node.js compatible con Vite 8 (20.19+ o 22.12+) y npm.

```bash
npm install
npm run dev
npm test
npm run build
npm run preview
```

`npm run dev` inicia el servidor local; `npm test` ejecuta las pruebas con Vitest; `npm run build` valida TypeScript y genera la compilación; `npm run preview` permite previsualizarla.

Las pruebas existentes verifican el banco, el cálculo de puntuaciones y evidencias, los umbrales de resultados, la selección reproducible y el alcance de los perfiles en recorridos de 12 y 14 preguntas. No sustituyen la revisión manual de la interfaz, el teclado, el sonido y el movimiento reducido en distintos dispositivos.

## Privacidad, ética e inclusión

- Permitir seudónimos y no pedir ni deducir datos sensibles.
- Mantener nombres y respuestas solo en memoria; no incluirlos en URL ni compartir resultados automáticamente.
- Presentar el aviso de sátira desde el inicio y explicar al final que las asociaciones no determinan identidades ni creencias.
- Usar los escenarios ficticios para reflexionar sobre discriminaciones combinadas, sin convertir sus respuestas en diagnósticos.
- Si se realiza un piloto, solicitar participación voluntaria, recoger únicamente opiniones o resúmenes anónimos agregados y no publicar capturas identificables sin autorización.
- Acreditar el uso de herramientas de IA en el dossier de acuerdo con las reglas del curso.
