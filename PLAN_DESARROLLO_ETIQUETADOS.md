# ETIQUETADOS — Plan de desarrollo de la aplicación web

> **Versión:** 1.0 — 23 de noviembre de 2026  
> **Nombre oficial:** Etiquetados  
> **Concepto principal:** «Un juego que te etiqueta antes de conocerte».  
> **Slug:** `etiquetados`  
> **Objetivo de entrega:** prototipo funcional, visualmente llamativo y demostrable en clase  
> **Rutas:** A (innovación tecnológica) + C (creación comunicativa, gráfica y sonora)  
> **Stack:** React 19.3 + TypeScript + Vite 8 + Tailwind CSS 4 + shadcn/ui + Motion + Vercel  
> **Duración:** 14 preguntas por recorrido en el MVP (alternativa corta de 12; máximo 14).
> **Banco de preguntas:** `src/data/questions.json`; catálogo de perfiles, las 36 preguntas, sus cuatro opciones y pesos.

---

## 1. Visión del producto

**Nombre oficial:** **Etiquetados**  
**Concepto principal:** «Un juego que te etiqueta antes de conocerte».

**Propuesta de valor:** una experiencia web interactiva, satírica y provocadora. El participante responde preguntas sobre gustos, intereses y comportamientos; un algoritmo deliberadamente prejuicioso convierte esas respuestas en etiquetas exageradas y luego revela las reglas arbitrarias que las produjeron.

**Objetivo pedagógico:** demostrar cómo los estereotipos sociales pueden encasillar injustamente a las personas y ayudar a estudiantes universitarios a cuestionar sistemas de clasificación que presentan asociaciones culturales arbitrarias como si fueran objetivas.

**Lo que NO es:** un test psicológico, detector de orientación sexual, género o raza, diagnóstico ni predictor probabilístico. Ninguna respuesta permite determinar identidad de género, orientación sexual, cisgeneridad o racialización.

**Giro narrativo:** el algoritmo entrega sus etiquetas con seguridad; la revelación rompe esa apariencia de autoridad y deja claro que la clasificación describe los prejuicios programados, no a quien participa.

**Criterios de éxito del MVP:**
1. Flujo sin login: bienvenida → nombre o apodo → introducción → 14 preguntas una a una → procesamiento → etiqueta principal y secundarias → revelación → aprendizaje → cierre.
2. Cada pregunta tiene **exactamente cuatro respuestas**, todas con pesos configurados.
3. Motor reproducible y adaptable, sin preguntas duplicadas ni perfilado real.
4. Funciona en teléfonos, tablets y navegador de escritorio, incluso sin backend.
5. Los perfiles compuestos de raza (`I01`, `I02`) se presentan únicamente como **casos ficticios educativos**, nunca como clasificación del participante.
6. Artefacto final y análisis académico redactados y realizados por el grupo. Las herramientas de IA generativa se usan solo para planificación/conceptualización, conforme al Nivel 2 de la guía del curso.

## 2. Alcance y decisiones cerradas

| Tema | Decisión MVP |
|---|---|
| Marca | **Etiquetados**; slug técnico `etiquetados` |
| Slogan | «Un juego que te etiqueta antes de conocerte» |
| Idioma | Español (Colombia), copy corto y claro |
| Participante | Debe introducir un nombre o seudónimo (2–30 caracteres), sin pedir género, sexo, raza u orientación |
| Banco | **36 preguntas puntuables**; cuatro opciones cada una, con pesos `1..3` |
| Sesión normal | **14 preguntas** = 8 anclas + 4 adaptativas + 2 de contraste |
| Sesión corta | 12 = 8+2+2; máximo absoluto 14 |
| Adaptatividad | Ajusta los temas de las preguntas pendientes, no asigna identidades reales |
| Resultados | Etiqueta principal y etiquetas secundarias satíricas + puntuación de juego + explicación + contradicciones |
| Interseccionalidad | Dos historias ficticias opcionales en la explicación final; **no puntúan identidad** |
| Estado/datos | Solo memoria de la pestaña; ningún nombre ni respuesta se envía a servidor |
| Análisis | Piloto anónimo presencial; medición antes/después agregada opcional sin identificar participantes |
| Infraestructura | SPA estática en Vercel; sin base de datos ni API en MVP |
| Audio | Efectos propios muy breves (selección, transición y revelación), siempre con botón silenciar |
| Exclusiones | IA/LLM real, detección de rostro/voz, autenticación, geolocalización y ranking social público |

**Nota ética:** el onboarding debe anunciar que es una experiencia satírica que usa prejuicios ficticios, aunque **no** debe revelar todavía cuáles son las reglas ni la combinación que dará el resultado. La sátira se dirige a la lógica del algoritmo, no al participante. Participación voluntaria, sin recolectar datos sensibles.

---

## 3. Taxonomía de estereotipos — 17 nodos

Se mantienen los 16 nodos originales y se añade `M16`. En total hay **15 etiquetas satíricas puntuables** y **2 escenarios interseccionales**. Las ramas «hombre»/«mujer»/«gay»/«lesbiana» son *suposiciones del algoritmo ficticio*, no identidades deducidas.

| Código | Etiqueta satírica / caso ficticio | Rama caricaturizada | Suposición falsa que el resultado debe desmontar | Modo |
|---|---|---|---|---|

| `H01` | Macho alfa dominante | Hombre cis heterosexual | El liderazgo o la fuerza supuestamente demuestra que alguien es un «macho alfa». | Puntuable |

| `H02` | Machista tradicional | Hombre cis heterosexual | El hombre debería mandar y algunas tareas serían «de mujeres». | Puntuable |

| `H03` | Hombre proveedor | Hombre cis heterosexual | Un hombre supuestamente vale por cuánto dinero aporta. | Puntuable |

| `H06` | Hombre que no llora | Hombre cis heterosexual | Mostrar emociones se considera poco masculino. | Puntuable |

| `M01` | Mujer sumisa | Mujer cis heterosexual | Escuchar y ceder se clasifica como obligación femenina. | Puntuable |

| `M02` | Ama de casa tradicional | Mujer cis heterosexual | Cocinar y cuidar se atribuye exclusivamente a mujeres. | Puntuable |

| `M04` | Mujer centrada en su apariencia | Mujer cis heterosexual | Interés por moda o belleza se convierte en un supuesto sobre identidad. | Puntuable |

| `M13` | Mujer «mandona» | Mujer cis heterosexual | El liderazgo se penaliza cuando el sistema lo atribuye a una mujer. | Puntuable |

| `M16` | Mujer feminista | Feminidad / Ruptura de roles tradicionales | El algoritmo confunde autonomía, liderazgo o apoyo a la igualdad con el género y las creencias de una persona, y caricaturiza el feminismo como una amenaza. | Puntuable |

| `H07` | Hombre gay «afeminado» | Hombre gay | La expresión estética se confunde con orientación sexual. | Puntuable |

| `H09` | Hombre gay fan de divas | Hombre gay | El gusto por el pop se interpreta como evidencia de orientación sexual. | Puntuable |

| `M07` | Lesbiana «masculinizada» | Mujer lesbiana | Los gustos deportivos o la ropa cómoda se confunden con orientación sexual. | Puntuable |

| `M10` | Lesbiana «que no parece lesbiana» | Mujer lesbiana | Se niega la diversidad de expresiones de una mujer lesbiana. | Puntuable |

| `H11` | Hombre bisexual «indeciso» | Hombre bisexual | Cambiar de preferencia o elegir dos cosas se trata absurdamente como bisexualidad. | Puntuable |

| `M11` | Mujer bisexual «confundida» | Mujer bisexual | La indecisión cotidiana se sexualiza por prejuicio. | Puntuable |

| `I01` | Hombre negro gay: escenario interseccional | Escenario | Caso ficticio sobre el cruce de racismo y homofobia. | Caso |

| `I02` | Mujer negra lesbiana: escenario interseccional | Escenario | Caso ficticio sobre racismo, sexismo y lesbofobia. | Caso |

### Árbol conceptual (no es un árbol de identificación real)

```text
                          ALGORITMO PREJUICIOSO (SIMULADO)
                                      |
               +----------------------+------------------------+
               |                      |                        |
       Roles/expresión           Sexualidad inventada     Casos interseccionales
               |                      |                      (no puntuables)
       +-------+-------+       +------+--------+            +----+----+
       |               |       |               |            |         |
  Masculinidad      Feminidad  Gay / lesbiana  Bisexual    I01       I02
  H01,H02,H03,H06   M01,M02,   H07,H09,       H11,M11      caso      caso
                    M04,M13,   M07,M10                     ficticio  ficticio
                    M16
```

**Regla crítica:** no utilizar una pregunta para inferir «hombre cis», «mujer cis», «gay», «lesbiana» o «bisexual» como características reales. La app solo mide cuántas veces las respuestas coinciden con caricaturas escritas por el grupo. Los nodos `I01` e `I02` son material para discutir discriminaciones combinadas, no salidas del clasificador de participantes.

### Grupos de afinidad usados por el selector adaptativo

| Grupo | Perfiles orientativos | Preguntas disponibles |
|---|---|---|
| `masculinidad` | H01, H02, H03, H06 | Q09–Q12 |
| `feminidad` | M01, M02, M04, M13 | Q13–Q16 |
| `orientacion` | H07, H09, M07, M10 | Q17–Q20 |
| `roles` | H01, H03, M01, M02, M13, M04 | Q21–Q24 |
| `ambiguedad` | H11, M11 y etiquetas en conflicto | Q25–Q28 |
| `ruptura` | M16, M13 | Q33–Q36 |

`M16` representa el sesgo machista del algoritmo, no una definición del feminismo. Apoyar la igualdad, ser independiente o ejercer liderazgo no permite deducir género ni creencias personales. El resultado presenta la caricatura y esta corrección explícita.

---

## 4. Experiencia de usuario: recorrido y copy

1. **Welcome (`/`)**: bienvenida «Bienvenido a Etiquetados»; slogan «Un juego que te etiqueta antes de conocerte»; composición gráfica de stickers, sellos y códigos de clasificación; aviso visible de experiencia satírica; botón «Empezar».
2. **Onboarding (`/jugar`, paso `intro`)**: solicitar nombre o apodo (2–30 caracteres), sin apellidos ni datos sensibles. No mostrar casilla de consentimiento; esta versión es para ejecución local y no se publicará.
3. **Introducción (`/jugar`, paso `ready`)**: mostrar el texto exacto «Responde unas preguntas y descubre qué etiqueta te pondría nuestro algoritmo». Explicar que no es un test de identidad sin revelar todavía las reglas satíricas.
4. **Quiz (`/jugar`, paso `question`)**: una pregunta por pantalla, cuatro opciones A–D, indicador y barra de progreso; selección obligatoria para avanzar, botón «Atrás», opción silenciar y acción para salir/reiniciar. Conservar el motor adaptativo.
5. **Procesamiento (`/jugar`, paso `processing`)**: animación breve en la que sellos, códigos y etiquetas aparentan analizar las respuestas; copy como «Clasificando tus respuestas…» y «Preparando tu etiqueta…». Dejar claro al final que es una simulación, no IA real, y permitir saltar la animación.
6. **Resultado (`/resultado`)**: titular «[Nombre], el algoritmo te puso esta etiqueta»; mostrar la etiqueta estereotípica principal como sticker/sello protagonista y otras etiquetas secundarias cuando correspondan. Mostrar puntos del algoritmo (nunca probabilidades) y dos o tres respuestas que activaron las etiquetas.
7. **Revelación**: revelar que las etiquetas se construyeron con prejuicios y reglas arbitrarias; romper visualmente, despegar o tachar las etiquetas asignadas. Explicar por qué esas asociaciones no determinan identidades ni describen a la persona.
8. **Aprendizaje**: presentar los casos ficticios `I01` e `I02` para conversar sobre discriminaciones combinadas. No puntúan, no perfilan y no modifican el resultado.
9. **Cierre**: copy exacto «Tus gustos no definen quién eres. Las etiquetas tampoco». Ofrecer «Reiniciar juego»; no compartir nombres ni resultados en redes por defecto.

### Sistema de animación, sonido y respuesta

- Al elegir una respuesta, emitir un efecto corto y mostrar una transición ligera entre tarjetas; nunca retrasar la interacción.
- Durante el procesamiento, hacer entrar etiquetas/stickers en secuencia, permitir que se acumulen y superpongan brevemente y mostrar un sello de clasificación.
- En el resultado, presentar la etiqueta principal con una entrada marcada y las secundarias en capas de menor jerarquía; acompañar con un sonido de revelación opcional.
- En la revelación, separar, romper o despegar visualmente las etiquetas para devolver protagonismo a la persona; evitar destellos rápidos, estrobos o movimiento brusco.
- Todo sonido comienza apagado o solo tras interacción, tiene control de silencio y no debe ser necesario para entender el flujo.
- Respetar `prefers-reduced-motion`: eliminar desplazamientos, sacudidas y acumulación animada; conservar cambios de estado instantáneos y comprensibles.

**Comportamientos UX:** diseño mobile-first; teclas 1–4 para elegir y Enter para avanzar cuando sea válido; foco visible; no avanzar sin respuesta; animaciones ligeras; controles táctiles de al menos 44 px; contraste suficiente y lectura clara.

### Guion de la revelación

> «[Nombre], nuestro algoritmo te puso esta etiqueta: [etiqueta]. Parece convincente, ¿no? La construimos con reglas arbitrarias: asociamos [gusto] con [suposición]. Esa asociación no demuestra nada sobre tu identidad. El problema no eres tú: es el sistema que convierte prejuicios en clasificaciones».

Si hay etiquetas incompatibles: «El sistema te asignó etiquetas contradictorias. No eres tú quien está mal clasificado: el algoritmo fue diseñado con prejuicios».

---

## 5. Catálogo completo de preguntas y respuestas ponderadas

**Convención de pesos:** `H01:+3` suma tres *puntos satíricos* a esa etiqueta si se elige la opción. Pesos permitidos **1, 2 o 3** (y cero para etiquetas no listadas). No hay pesos negativos. Los identificadores A–D son fijos en el JSON, pero su orden visual se puede barajar por semilla de sesión. **Los pesos no son probabilidades ni evidencia sobre identidades.**

### 5.1 Anclas obligatorias — 8 preguntas en cada recorrido

#### Q01 — ¿Cuál es tu plan ideal de sábado?

**Pool:** `core` · **Tema:** `ocio`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Fútbol y asado. | `H01:+2`, `H02:+1` |

| **B** | Compras y spa. | `M04:+3` |

| **C** | Concierto pop y baile. | `H09:+3`, `H07:+1` |

| **D** | Cocinar y estar en casa. | `M02:+3`, `M01:+1` |



#### Q02 — ¿Qué haces cuando te sientes triste?

**Pool:** `core` · **Tema:** `emociones`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Me aguanto; no lloro. | `H06:+3` |

| **B** | Busco que me cuiden. | `M01:+2` |

| **C** | Pongo una diva pop y canto. | `H09:+2`, `H07:+1` |

| **D** | Cambio de plan varias veces. | `H11:+2`, `M11:+2` |



#### Q03 — ¿Qué te atrae más de un trabajo?

**Pool:** `core` · **Tema:** `trabajo`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Mandar y dirigir. | `H01:+2`, `M13:+2`, `M16:+2` |

| **B** | Ganar para mantener el hogar. | `H03:+3` |

| **C** | Cuidar a otras personas. | `M02:+3` |

| **D** | Diseñar imagen y estilo. | `M04:+2`, `H07:+2` |



#### Q04 — ¿Cómo eliges tu ropa?

**Pool:** `core` · **Tema:** `estética`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Rápido y sin pensar. | `H02:+2`, `H06:+1` |

| **B** | Que combine todo. | `M04:+2`, `M10:+1` |

| **C** | Con brillo y mucho estilo. | `H07:+3`, `H09:+1` |

| **D** | Cómoda y deportiva. | `M07:+3` |



#### Q05 — ¿Qué haces al escuchar una balada triste?

**Pool:** `core` · **Tema:** `música`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Cambio la canción; nada de lágrimas. | `H06:+3` |

| **B** | La canto y me emociono. | `M01:+2`, `M10:+1` |

| **C** | La convierto en un show. | `H09:+3` |

| **D** | Escucho dos versiones y no elijo. | `H11:+2`, `M11:+2` |



#### Q06 — Si tu grupo no se pone de acuerdo, ¿qué haces?

**Pool:** `core` · **Tema:** `decisiones`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Decido yo. | `H01:+3` |

| **B** | Acepto lo que elijan. | `M01:+3` |

| **C** | Propongo un plan y reparto tareas. | `M13:+2`, `H03:+1`, `M16:+2` |

| **D** | Quiero probar todas las opciones. | `H11:+2`, `M11:+2` |



#### Q07 — ¿Qué regalo te ilusiona más?

**Pool:** `core` · **Tema:** `regalos`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Accesorios para el carro. | `H02:+2`, `H03:+1` |

| **B** | Un kit de belleza. | `M04:+3` |

| **C** | Entradas para una diva pop. | `H09:+3` |

| **D** | Equipo deportivo. | `M07:+2`, `H01:+1` |



#### Q08 — ¿Qué cualidad te describe mejor?

**Pool:** `core` · **Tema:** `carácter`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Ser fuerte. | `H01:+2`, `H06:+1` |

| **B** | Cuidar a otros. | `M02:+2`, `M01:+1` |

| **C** | Tener estilo. | `H07:+2`, `M10:+1` |

| **D** | Cambiar de opinión sin problema. | `H11:+2`, `M11:+2` |



### 5.2 Adaptativas: masculinidad

#### Q09 — Cuando alguien te contradice, ¿qué haces?

**Pool:** `masculinidad` · **Tema:** `poder`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Impongo mi opinión. | `H01:+3`, `H02:+1` |

| **B** | Digo que yo tengo la última palabra. | `H02:+3` |

| **C** | Me quedo callado. | `H06:+2` |

| **D** | Organizo una solución para todos. | `M13:+2` |



#### Q10 — ¿Qué tarea elegirías en una reunión familiar?

**Pool:** `masculinidad` · **Tema:** `hogar`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Manejar la parrilla. | `H02:+2`, `H01:+1` |

| **B** | Pagar toda la cuenta. | `H03:+3` |

| **C** | Lavar los platos. | `M02:+2` |

| **D** | Decidir cómo se organiza todo. | `M13:+2`, `H01:+1` |



#### Q11 — ¿Qué sería una señal de éxito?

**Pool:** `masculinidad` · **Tema:** `éxito`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Tener autoridad. | `H01:+3` |

| **B** | Mantener a toda mi familia. | `H03:+3` |

| **C** | Nunca mostrar debilidad. | `H06:+3` |

| **D** | Poder elegir mi propio estilo. | `H07:+2` |



#### Q12 — En una discusión, ¿qué frase dirías?

**Pool:** `masculinidad` · **Tema:** `conflictos`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Aquí mando yo. | `H01:+2`, `H02:+2` |

| **B** | Yo pago, yo decido. | `H03:+2`, `H02:+2` |

| **C** | No voy a mostrar que me afecta. | `H06:+3` |

| **D** | Propongo que lo hablemos. | `M01:+1`, `M13:+1` |



### 5.3 Adaptativas: feminidad

#### Q13 — ¿Qué prefieres hacer en casa?

**Pool:** `feminidad` · **Tema:** `hogar`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Cocinar para todos. | `M02:+3` |

| **B** | Que alguien decida por mí. | `M01:+3` |

| **C** | Arreglar el espacio y decorar. | `M04:+2` |

| **D** | Organizar y dirigir las tareas. | `M13:+3` |



#### Q14 — ¿Qué valoras más en una pareja?

**Pool:** `feminidad` · **Tema:** `relaciones`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Que tome todas las decisiones. | `M01:+3` |

| **B** | Que me deje cuidar el hogar. | `M02:+2` |

| **C** | Que admire mi apariencia. | `M04:+3` |

| **D** | Que respete mi liderazgo. | `M13:+3` |



#### Q15 — Antes de una reunión, ¿qué preparas primero?

**Pool:** `feminidad` · **Tema:** `presentación`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Mi maquillaje y mi ropa. | `M04:+3` |

| **B** | Lo que todos van a necesitar. | `M02:+2` |

| **C** | Lo que debo decir como líder. | `M13:+3` |

| **D** | Cómo no incomodar a nadie. | `M01:+2` |



#### Q16 — ¿Qué te haría sentir orgulloso/a?

**Pool:** `feminidad` · **Tema:** `logros`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Tener una familia muy cuidada. | `M02:+3` |

| **B** | Que todos me vean impecable. | `M04:+3` |

| **C** | Dirigir un gran proyecto. | `M13:+3` |

| **D** | Que los demás aprueben mis decisiones. | `M01:+3` |



### 5.4 Adaptativas: estereotipos sobre orientación

#### Q17 — Te ponen a elegir música. ¿Cuál escoges?

**Pool:** `orientacion` · **Tema:** `música`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Pop de grandes divas. | `H09:+3` |

| **B** | Rock con guitarra fuerte. | `M07:+2`, `H01:+1` |

| **C** | Una balada romántica. | `M10:+2`, `M01:+1` |

| **D** | Dos estilos; no me decido. | `H11:+2`, `M11:+2` |



#### Q18 — ¿Cómo es tu estilo ideal?

**Pool:** `orientacion` · **Tema:** `moda`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Llamativo y muy cuidado. | `H07:+3` |

| **B** | Deportivo y cómodo. | `M07:+3` |

| **C** | Femenino y elegante. | `M10:+3` |

| **D** | Cambio de estilo todos los días. | `H11:+2`, `M11:+2` |



#### Q19 — En una fiesta, ¿qué prefieres?

**Pool:** `orientacion` · **Tema:** `celebración`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Hacer una coreografía. | `H09:+3`, `H07:+1` |

| **B** | Ir con ropa deportiva. | `M07:+2` |

| **C** | Ponerme un look elegante. | `M10:+2`, `M04:+1` |

| **D** | Pasar por varios ambientes. | `H11:+2`, `M11:+2` |



#### Q20 — ¿Qué contenido guardas más?

**Pool:** `orientacion` · **Tema:** `redes`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Tutoriales de estilo. | `H07:+3` |

| **B** | Clips de divas pop. | `H09:+3` |

| **C** | Videos de fútbol femenino. | `M07:+3` |

| **D** | Ideas muy diferentes entre sí. | `H11:+2`, `M11:+2` |



### 5.5 Adaptativas: roles, pareja y poder

#### Q21 — ¿Qué rol te gusta en un proyecto?

**Pool:** `roles` · **Tema:** `equipo`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Ser jefe. | `H01:+2`, `M13:+2` |

| **B** | Administrar el dinero. | `H03:+3` |

| **C** | Cuidar los detalles. | `M02:+2`, `M04:+1` |

| **D** | Diseñar la presentación. | `H07:+2`, `M04:+1` |



#### Q22 — En una primera cita, ¿qué eliges?

**Pool:** `roles` · **Tema:** `primera cita`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Pagar todo. | `H03:+3` |

| **B** | Que decidan por mí. | `M01:+3` |

| **C** | Llevar un outfit perfecto. | `M04:+2`, `H07:+1` |

| **D** | Elegir el lugar y la hora. | `M13:+2`, `H01:+1` |



#### Q23 — ¿Cómo ayudas a una amistad enferma?

**Pool:** `roles` · **Tema:** `cuidado`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Organizo turnos y decisiones. | `M13:+2`, `H01:+1` |

| **B** | Cocino y llevo comida. | `M02:+3` |

| **C** | Pago lo que haga falta. | `H03:+3` |

| **D** | Me quedo escuchando. | `M01:+2`, `M10:+1` |



#### Q24 — ¿Qué te da más confianza?

**Pool:** `roles` · **Tema:** `confianza`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Tomar el control. | `H01:+3` |

| **B** | Tener dinero ahorrado. | `H03:+3` |

| **C** | Verme impecable. | `M04:+2`, `H07:+1` |

| **D** | Que otros me aprueben. | `M01:+3` |



### 5.6 Adaptativas: indecisión y etiquetas contradictorias

#### Q25 — En un restaurante hay dos platos favoritos. ¿Qué haces?

**Pool:** `ambiguedad` · **Tema:** `decisión`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Pido ambos. | `H11:+3`, `M11:+2` |

| **B** | Que alguien elija por mí. | `M01:+2` |

| **C** | Elijo el más caro. | `H03:+2` |

| **D** | Elijo el de mejor presentación. | `M04:+2` |



#### Q26 — Te invitan a dos planes a la vez. ¿Qué haces?

**Pool:** `ambiguedad` · **Tema:** `planes`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Intento ir a los dos. | `H11:+3`, `M11:+3` |

| **B** | Elijo el más deportivo. | `M07:+2` |

| **C** | Elijo el concierto pop. | `H09:+2` |

| **D** | Elijo el más elegante. | `M10:+2` |



#### Q27 — ¿Qué haces si te gustan dos estilos opuestos?

**Pool:** `ambiguedad` · **Tema:** `preferencias`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Me quedo con ambos. | `H11:+2`, `M11:+3` |

| **B** | Elijo el más tradicional. | `H02:+2` |

| **C** | Elijo el más llamativo. | `H07:+3` |

| **D** | Elijo el más cómodo. | `M07:+2` |



#### Q28 — ¿Cómo te describirías hoy?

**Pool:** `ambiguedad` · **Tema:** `personalidad`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Depende del día. | `H11:+2`, `M11:+3` |

| **B** | Muy firme con mis ideas. | `H01:+2` |

| **C** | Muy pendiente de otros. | `M02:+2` |

| **D** | Muy atento a mi imagen. | `M04:+2` |



### 5.7 Contraste final: contradicción deliberada

#### Q29 — Te ofrecen elegir una actividad nueva. ¿Cuál pruebas?

**Pool:** `contrast` · **Tema:** `contradicción`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Boxeo y artes marciales. | `H01:+2`, `M07:+2` |

| **B** | Maquillaje artístico. | `H07:+2`, `M04:+2` |

| **C** | Cuidado de bebés. | `M02:+2`, `M10:+1` |

| **D** | Un poco de todas. | `H11:+2`, `M11:+2` |



#### Q30 — ¿Qué te gustaría que dijeran de ti?

**Pool:** `contrast` · **Tema:** `contradicción`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Qué fuerte y decidido/a. | `H01:+2`, `M13:+2` |

| **B** | Qué delicado/a y atento/a. | `M01:+2`, `M10:+1` |

| **C** | Qué estilo tan único. | `H07:+2`, `M04:+1` |

| **D** | Qué bien maneja sus finanzas. | `H03:+3` |



#### Q31 — En una tarde libre, ¿qué te apetece?

**Pool:** `contrast` · **Tema:** `contradicción`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Ver deportes. | `H02:+2`, `M07:+2` |

| **B** | Arreglarme para salir. | `M04:+2`, `H07:+2` |

| **C** | Una maratón de divas pop. | `H09:+3` |

| **D** | Probar dos planes distintos. | `H11:+2`, `M11:+2` |



#### Q32 — Si te dieran un micrófono, ¿qué dirías?

**Pool:** `contrast` · **Tema:** `contradicción`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|

| **A** | Aquí se hace lo que yo digo. | `H01:+2`, `H02:+1` |

| **B** | Quiero que todos estén bien. | `M01:+2`, `M02:+1` |

| **C** | ¡Que empiece el espectáculo! | `H09:+2`, `H07:+2` |

| **D** | Tengo varias ideas distintas. | `H11:+2`, `M11:+2` |



### 5.8 Ruptura de roles tradicionales — 4 preguntas adaptativas

Las reglas de este grupo son caricaturas deliberadamente prejuiciosas, no inferencias sobre el género o las creencias de quien responde.

#### Q33 — ¿Quién debería decidir en una relación?

**Pool:** `ruptura` · **Tema:** `relaciones`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|
| **A** | El hombre debe llevar las riendas. | `H02:+3`, `H01:+1` |
| **B** | Ambos, sin que nadie mande. | `M16:+3` |
| **C** | Quien aporte más dinero. | `H03:+2`, `H02:+1` |
| **D** | Yo: no quiero que decidan por mí. | `M16:+2`, `M13:+2` |

#### Q34 — ¿Qué opinas si una mujer gana más que su pareja?

**Pool:** `ruptura` · **Tema:** `igualdad salarial`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|
| **A** | El hombre debería ser el proveedor. | `H03:+3`, `H02:+1` |
| **B** | El salario no depende del género. | `M16:+3` |
| **C** | Lo importante es pagar las cuentas. | `H03:+1` |
| **D** | Me gusta la independencia económica. | `M16:+2`, `M13:+1` |

#### Q35 — ¿Quién debería encargarse del hogar?

**Pool:** `ruptura` · **Tema:** `hogar`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|
| **A** | La mujer: así ha sido siempre. | `H02:+3`, `M02:+1` |
| **B** | Las tareas deben compartirse. | `M16:+3` |
| **C** | Depende de los acuerdos de cada hogar. | `M01:+1` |
| **D** | Quien tenga tiempo, sin roles impuestos. | `M16:+2`, `M13:+1` |

#### Q36 — Si cuestionan a una mujer que lidera, ¿qué haces?

**Pool:** `ruptura` · **Tema:** `liderazgo`

| Opción | Respuesta visible | Pesos agregados |
|---|---|---|
| **A** | Prefiero que un hombre tome el mando. | `H02:+3`, `H01:+1` |
| **B** | Pregunto si la juzgan por su trabajo. | `M16:+3` |
| **C** | Escucho y dejo que el equipo decida. | `M01:+1` |
| **D** | Defiendo su derecho a liderar. | `M16:+2`, `M13:+1` |

### 5.9 Dos escenarios interseccionales (educación, NO clasificación)

Estos casos permiten conservar los perfiles `I01` e `I02`. Se muestran después del resultado, con personajes ficticios claramente descritos. Cada opción otorga **puntos de reflexión** de 0–3 (solo para dar retroalimentación local), **no puntos de identidad**. No se pregunta si el participante pertenece a esos grupos.

**Caso `I01`: «Un músico negro y gay se presenta a una audición. ¿Cuál es la respuesta adecuada?»**

| Opción | Texto | `reflectionPoints` | Retroalimentación |
|---|---|---:|---|
| A | «Mejor no contratarlo: el público puede juzgarlo». | 0 | Reproduce un prejuicio discriminatorio. |
| B | «Solo lo aceptaría si oculta quién es». | 0 | Condiciona la oportunidad a ocultar su identidad. |
| C | «Lo evaluaría por su interpretación». | 3 | Centra la evaluación en criterios relevantes. |
| D | «Preguntaría al público si lo acepta». | 1 | Traslada una decisión justa a posibles prejuicios ajenos. |

**Caso `I02`: «Una ingeniera de sonido negra y lesbiana solicita liderar una sesión. ¿Qué criterio utilizas?»**

| Opción | Texto | `reflectionPoints` | Retroalimentación |
|---|---|---:|---|
| A | «La evaluaría por experiencia y resultados». | 3 | Utiliza méritos vinculados al trabajo. |
| B | «Preferiría un hombre para manejar al equipo». | 0 | Convierte un prejuicio de género en barrera laboral. |
| C | «Me preocupa que los clientes la juzguen». | 1 | Reproduce una exclusión anticipando prejuicios ajenos. |
| D | «Solo le daría tareas de apoyo». | 0 | Limita oportunidades por una suposición discriminatoria. |

**Medida:** una respuesta no etiqueta al participante como racista/homófobo; invita a discutir el impacto de las decisiones y la interseccionalidad. No se almacena `reflectionPoints` fuera de la sesión.

---

## 6. Modelo de datos e interfaces TypeScript

`src/data/questions.json` es el **origen de verdad**; no duplicar preguntas en componentes. Se valida al cargar la aplicación y durante la suite de pruebas.

```ts
type ScoredProfileId =
  | 'H01' | 'H02' | 'H03' | 'H06'
  | 'M01' | 'M02' | 'M04' | 'M13' | 'M16'
  | 'H07' | 'H09' | 'M07' | 'M10' | 'H11' | 'M11';

type ScenarioId = 'I01' | 'I02'; // nunca puntuables

type Pool = 'core' | 'masculinidad' | 'feminidad' |
  'orientacion' | 'roles' | 'ambiguedad' | 'ruptura' | 'contrast';

type AnswerId = 'A' | 'B' | 'C' | 'D';

type Option = {
  id: AnswerId;
  text: string;
  weights: Partial<Record<ScoredProfileId, 1 | 2 | 3>>;
};

type Question = {
  id: string; // Q01..Q36
  pool: Pool;
  topic: string;
  text: string;
  options: [Option, Option, Option, Option];
};

type AnswerRecord = {
  questionId: string;
  optionId: AnswerId;
};

type QuizSession = {
  sessionId: string; // UUID local, no se envía
  displayName: string; // seudónimo permitido
  seed: number; // fija aleatoriedad y permite recomputación
  targetQuestions: 12 | 14;
  phase: 'intro' | 'question' | 'loading' | 'result' | 'reveal';
  selectedQuestionIds: string[]; // orden de preguntas seleccionado
  answers: AnswerRecord[];
  stepIndex: number;
  muted: boolean;
};

type ScoreDetails = {
  id: ScoredProfileId;
  points: number;
  supports: number; // cantidad de preguntas distintas que aportaron a la etiqueta
  possiblePoints: number; // max alcanzable en las preguntas efectivamente mostradas
  normalizedIndex: number; // índice de juego, NO probabilidad
  evidence: { questionId: string; optionId: AnswerId; delta: number }[];
};
```

**Reglas de validación:** 36 IDs únicos; `core=8`, grupos adaptativos `4` por grupo, `contrast=4`; todas las preguntas tienen 4 opciones A–D únicas; cada opción tiene ≥1 peso válido; todas las referencias apuntan a los 15 IDs puntuables (nunca `I01` ni `I02`); nombre recortado/validado; respuestas pertenecen a pregunta seleccionada; cada pregunta se responde máximo una vez.

## 7. Algoritmo de puntuación y motor adaptativo

### 7.1 Cálculo (recalculado desde respuestas; sin acumulación mutable)

1. Inicializar `points=0`, `supports=0` y `possiblePoints=0` para cada uno de los 15 perfiles.
2. Por cada pregunta respondida, sumar los pesos de la opción elegida a `points` y registrar una evidencia por perfil.
3. Para cada pregunta **mostrada**, sumar a `possiblePoints[p]` el mayor peso que cualquiera de sus cuatro opciones podría aportar a `p` (si no aparece, sumar 0).
4. El índice didáctico por perfil será `100 × (points / possiblePoints) × min(1, supports / 2)` cuando `possiblePoints > 0`; en otro caso, 0. Sirve solo para ordenar caricaturas; **no es un porcentaje de identidad ni una certeza**.
5. Para un resultado único se necesitan al menos **dos preguntas distintas** apoyando la etiqueta. En caso contrario, mostrar «El algoritmo no tiene ni suficientes prejuicios para decidir», además de las dos etiquetas más cercanas.
6. Si los dos índices elegibles más altos difieren en **8 puntos o menos**, mostrar **doble etiqueta contradictoria** (sin ocultar la contradicción). Si no, mostrar el primero.
7. Las comparaciones y los gráficos deben rotularse **«Índice de caricatura»** o **«Puntos del algoritmo»**, jamás «probabilidad de ser hombre/gay/etc.».
8. Se debe acompañar cada resultado con 2–3 evidencias textuales (`answer → prejudice`) y la explicación correctiva.

### 7.2 Selección de preguntas (14 por recorrido)

**Etapa A: 8 preguntas base.** Seleccionar siempre `Q01..Q08` en orden barajado mediante una semilla local. No repetir preguntas; también se puede barajar el orden visual A–D, pero no cambiar sus IDs ni pesos.

**Etapa B: 4 adaptativas.** Tras las ocho respuestas, calcular los índices por perfil. Agrupar esos índices por `masculinidad`, `feminidad`, `orientacion`, `roles`, `ambiguedad` y `ruptura`. La afinidad de cada grupo es el promedio de sus **dos índices más altos** (índice de juego, no atributos). Elegir los dos grupos con afinidad más alta, con dos preguntas de cada uno en la sesión de 14 o una en la de 12. La semilla resuelve empates y baraja las preguntas de forma reproducible. El grupo `ruptura` no se incluye obligatoriamente; las anclas Q03/A y Q06/C aportan dos puntos a M16 cada una, además de conservar sus pesos originales.

**Etapa C: 2 preguntas de contraste.** Elegir dos diferentes de `Q29..Q32` cuya temática aporte variedad. Su objetivo es evitar una clasificación lineal: pueden sumar puntos a etiquetas incompatibles. Nunca repetir una pregunta ya vista.

**Inicio del recorrido:** se genera y almacena en memoria `seed` y `targetQuestions`; se construye la cola base. La selección adaptativa se calcula solamente al completar la octava pregunta y queda fijada para esa ejecución, evitando que el orden se mueva mientras el usuario avanza.

**Si el usuario retrocede:** editar la respuesta, volver a calcular puntuaciones desde cero. Si se cambia cualquier respuesta de la fase base, invalidar adaptativas y contraste ya respondidas, avisar de la recomputación, y reconstruir la cola. Si se cambia una respuesta adaptativa, mantener la cola fijada y recalcular solo el resultado. Esto evita rutas inconsistentes.

**Equidad de selección:** ninguna opción debe aumentar el número total de preguntas; cada participante ve 12 o 14 según la configuración. Evitar elegir todos los ítems sobre un mismo tema o dar más oportunidades de puntuar a una sola categoría sin contraste. En QA, ejecutar simulaciones de miles de sesiones para detectar perfiles sistemáticamente favorecidos.

### 7.3 Pseudocódigo operativo

```ts
function scoreQuiz(questions: Question[], answers: AnswerRecord[]) {
  const byId = new Map(questions.map(q => [q.id, q]));
  const scores = Object.fromEntries(SCORED_PROFILE_IDS.map(id => [id, {
    id, points: 0, supports: 0, possiblePoints: 0, normalizedIndex: 0, evidence: []
  }])) as Record<ScoredProfileId, ScoreDetails>;

  for (const answer of answers) {
    const question = byId.get(answer.questionId);
    if (!question) throw new Error('Unknown question');
    const option = question.options.find(x => x.id === answer.optionId);
    if (!option) throw new Error('Unknown option');

    for (const profileId of SCORED_PROFILE_IDS) {
      const maximum = Math.max(0, ...question.options.map(
        x => x.weights[profileId] ?? 0
      ));
      scores[profileId].possiblePoints += maximum;
      const delta = option.weights[profileId] ?? 0;
      if (delta > 0) {
        scores[profileId].points += delta;
        scores[profileId].supports += 1;
        scores[profileId].evidence.push({
          questionId: question.id, optionId: option.id, delta
        });
      }
    }
  }

  for (const p of SCORED_PROFILE_IDS) {
    const s = scores[p];
    s.normalizedIndex = s.possiblePoints === 0 ? 0 :
      Math.round(100 * s.points / s.possiblePoints * Math.min(1, s.supports / 2));
  }
  return scores;
}

function chooseSessionQuestions(seed: number): string[] {
  // Primera cola: barajar Q01..Q08 usando PRNG determinista con seed.
  return seededShuffle(CORE_IDS, seed);
}

function extendAfterCore(seed: number, answers: AnswerRecord[],
                         targetQuestions: 12 | 14): string[] {
  const scores = scoreQuiz(QUESTIONS, answers); // exactamente 8 respuestas aquí
  const topGroups = rankGroups(scores, seed).slice(0, 2);
  const each = (targetQuestions - 10) / 2; // 12→1, 14→2
  const adaptive = topGroups.flatMap(g =>
    seededShuffle(QUESTIONS_BY_POOL[g], seed + stableHash(g)).slice(0, each)
  );
  const contrast = seededShuffle(CONTRAST_IDS, seed + 701).slice(0, 2);
  return [...adaptive, ...contrast];
}

// Implementar seededShuffle, stableHash y rankGroups como funciones puras.
// rankGroups define explícitamente sus perfiles y aplica desempate estable.
```

**Nota para el implementador:** el algoritmo de ejemplo es una especificación/pseudocódigo; las constantes `SCORED_PROFILE_IDS`, `QUESTIONS`, `CORE_IDS`, `CONTRAST_IDS`, `QUESTIONS_BY_POOL` y las funciones auxiliares se implementan en `src/domain`. Aplicar el cálculo tras completar ocho anclas; `scoreQuiz` recibe una sola respuesta vigente por pregunta. En `rankGroups`, usar la fórmula documentada y desempates estables. La diferencia entre H11 y M11 es un recurso arbitrario de la sátira, no una inferencia válida.

### 7.4 Selección del resultado y evidencia

- Ordenar perfiles con `supports >= 2` por `normalizedIndex DESC`, `points DESC`, `id ASC` (desempate estable).
- Si hay empate de índice cercano (`<=8`), presentar ambos, incluso si parecen incompatibles.
- Construir explicaciones de cada evidencia con una tabla de mensajes `evidenceCopy` vinculada al perfil o al tema: ej. `Q17/A → «El sistema confundió escuchar divas pop con una orientación sexual»`.
- No inventar números de certeza; el índice es un recurso narrativo.
- Si no hay candidato elegible, mostrar «No cabes en nuestro algoritmo» como final alternativo y revelar igualmente las reglas utilizadas.
- Guardar la semilla en memoria junto a la cola para que el botón Atrás no cambie preguntas al azar.

### 7.5 Ejemplo ilustrativo

```text
Q01 C (concierto pop): H09 +3, H07 +1
Q02 D (cambiar de plan): H11 +2, M11 +2
Q03 A (mandar): H01 +2, M13 +2, M16 +2
...
Resultado del juego: dos caricaturas pueden puntuar a la vez.
Revelación: «Que te guste el pop, liderar o cambiar de plan
no nos dice tu género ni tu orientación sexual».
```

---

## 8. Arquitectura React / frontend

### 8.1 Stack actualizado

| Capa | Herramienta | Justificación |
|---|---|---|
| UI | React **19.3** + TypeScript estricto | Interfaz por componentes y contratos de datos tipados |
| Bundler | Vite **8** | SPA rápida, build estático y desarrollo local sencillo |
| Estilos | Tailwind CSS **4** + `@tailwindcss/vite` | Tokens visuales, diseño adaptable y utilidades consistentes |
| Componentes | shadcn/ui | Botones, tarjetas, progreso y controles accesibles personalizables |
| Movimiento | Motion para React (`motion/react`) | Entrada/salida de stickers, transiciones y revelación con soporte reducido |
| Estado | `useReducer` + Context | Mantiene una sesión local y coordina las fases del juego |
| Ruteo | React Router | URLs públicas `/`, `/jugar` y `/resultado` |
| Validaciones | Zod + TypeScript | Validación del banco y de la entrada de nombre/apodo |
| Iconos/sonido | `lucide-react` + Web Audio API | Iconografía clara y efectos cortos generados localmente |
| Pruebas | Vitest + Testing Library + Playwright | Lógica, accesibilidad básica y recorrido móvil |
| Hosting | Vercel (Static Vite SPA) | Despliegue estático, HTTPS y previews |

**No agregar por defecto:** Next.js, backend, base de datos, autenticación, TanStack Query, analytics, LLM o microservicios. El algoritmo es determinista y local; no usar IA real ni transmitir respuestas.

### 8.2 Estructura sugerida

```text
etiquetados/
├── public/
│   ├── favicon.svg
│   └── og-etiquetados.png
├── src/
│   ├── app/App.tsx
│   ├── components/
│   │   ├── WelcomeScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── IntroScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── ProcessingScreen.tsx
│   │   ├── StickerTag.tsx
│   │   ├── ResultScreen.tsx
│   │   ├── RevealSection.tsx
│   │   ├── LearningCases.tsx
│   │   └── SoundToggle.tsx
│   ├── data/questions.json
│   ├── domain/{types,validateBank,scoreQuiz,selectQuestions,results}.ts
│   ├── hooks/useQuiz.ts
│   ├── styles/globals.css
│   └── main.tsx
├── tests/
│   ├── scoreQuiz.test.ts
│   ├── selectQuestions.test.ts
│   └── bank.test.ts
├── e2e/quiz-flow.spec.ts
├── index.html
├── vite.config.ts
├── vercel.json
└── package.json
```

**Rutas y referencias públicas:**

| Ruta | Pantalla | Comportamiento |
|---|---|---|
| `/` | Welcome + onboarding/introducción | Entrada, slogan, nombre/apodo |
| `/jugar` | Quiz y procesamiento | Preguntas adaptativas, progreso y animación de clasificación |
| `/resultado` | Resultado, revelación y cierre | Etiquetas, explicación pedagógica y reinicio |

Usar `etiquetados` como `name` del paquete y slug del proyecto en Vercel. El `<title>`, la descripción SEO, `og:title`, `og:description`, favicon, textos accesibles y enlaces internos deben usar la marca Etiquetados. Mantener los identificadores originales del banco (`Q01`–`Q32`, perfiles y opciones); las preguntas nuevas son `Q33`–`Q36`.

### 8.3 Estados y eventos principales

```text
WELCOME --START--> ONBOARDING (nombre/apodo)
ONBOARDING --CONTINUE--> INTRODUCCIÓN
INTRODUCCIÓN --BEGIN--> QUIZ
QUIZ --SELECT_OPTION--> QUIZ (respuesta seleccionada)
QUIZ --NEXT/BACK--> QUIZ
QUIZ --FINISH--> PROCESSING
PROCESSING --RESULT--> RESULT --> REVELACIÓN --> APRENDIZAJE/CIERRE
CUALQUIER PASO --RESET--> WELCOME
```

Eventos: `START`, `SET_NAME`, `SELECT_OPTION`, `NEXT`, `BACK`, `SET_SOUND`, `REVEAL`, `SHOW_CASES`, `RESET`. Un reducer administra la sesión en memoria; ningún nombre ni respuesta persiste al reiniciar o cerrar la pestaña.

---

## 9. Dirección visual y narrativa de diseño

**Concepto visual:** «archivo de etiquetas + máquina clasificadora». Stickers, sellos, códigos de barras, folios y rótulos de clasificación se acumulan como si el sistema intentara encasillar a la persona. La identidad debe ser contemporánea, juvenil, provocadora y divertida; el humor se dirige al algoritmo y no a quien juega. Evitar una estética infantil o de test clínico.

**Paleta propuesta (verificar contrastes AA por componente y en móvil):**

| Uso | Color | Hex |
|---|---|---|
| Fondo | Carbón azulado | `#11121B` |
| Superficie | Grafito | `#1D1E2A` |
| Texto principal | Blanco cálido | `#F5F2EE` |
| Sticker principal | Lima eléctrica | `#D3FF6A` |
| Sello de alerta | Rosa intenso | `#FF4D8D` |
| Acento informativo | Cian brillante | `#54D9E8` |
| Acento secundario | Naranja | `#FFB454` |

Usar combinaciones de alto contraste para texto y controles; los tonos saturados funcionan como etiquetas, bordes y acentos, no como fondos de párrafos extensos. El sistema visual incluye stickers con esquinas recortadas, sellos de tinta, folios, tipografía monoespaciada para códigos y un motivo de código de barras generado con CSS/SVG. Etiquetas secundarias se superponen con jerarquía clara, sin tapar información.

**Tipografía:** sans display contundente para titulares y sans legible para lectura; mono solo para códigos, progreso y sellos. Mantener alternativas locales y no depender de imágenes o fuentes externas para que la experiencia funcione sin red.

**Especificaciones de movimiento:** transiciones de preguntas breves; etiquetas que entran, se apilan y se superponen durante el procesamiento; sello visual al clasificar; resultado principal con entrada destacada; revelación que despega, rompe o tacha las etiquetas. Todo movimiento es ligero y no bloquea controles. En `prefers-reduced-motion`, desactivar desplazamientos y sacudidas y mostrar los mismos estados de forma inmediata.

**Sonido y accesibilidad:** efectos originales breves y opcionales en selección, clasificación y revelación; nunca autoplay antes de una interacción y siempre con silencio visible. No depender solo del color o el sonido, evitar destellos rápidos, mantener foco visible y botones de al menos 44 px. La sátira cuestiona el sistema, no ridiculiza al participante.

---

## 10. Instalación local y dependencias

**Requisito:** Node.js compatible con Vite (mínimo **20.19+ o 22.12+** según la guía oficial; preferible Node 22 LTS reciente) y npm actualizado.

```bash
npm create vite@latest etiquetados -- --template react-ts
cd etiquetados
npm install
npm install tailwindcss @tailwindcss/vite motion lucide-react zod react-router-dom
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
npx shadcn@latest init
npx shadcn@latest add button card progress badge
npm run dev
npm test
npm run build
```

Registrar `tailwindcss()` junto a `react()` en `vite.config.ts` y usar `@import "tailwindcss";` en los estilos globales. Configurar el alias de importación de shadcn/ui si lo requiere el preset.

**Pinning:** al iniciar el proyecto, generar `package-lock.json` y mantenerlo en Git. Fijar dependencias a versiones compatibles verificadas por CI; no usar `latest` como versión declarada en producción.

---

## 11. Vercel (referencia futura; no publicar esta entrega)

La arquitectura conserva Vercel como destino técnico posible, pero esta entrega se ejecutará únicamente en local y **no se publicará ni se desplegará**. Los pasos siguientes son referencia para un uso futuro y no deben ejecutarse para esta versión.

1. Crear repositorio GitHub con slug/nombre `etiquetados` y subir código + `package-lock.json`, sin datos personales.
2. Importar el repositorio en [Vercel](https://vercel.com/); el framework preset debe ser **Vite** y el project slug **etiquetados**.
3. Build command: `npm run build`; output directory: `dist` (autodetectable).
4. Node runtime: seleccionar una versión compatible con Vite en ajustes si es necesario.
5. Publicar; probar el dominio temporal HTTPS en un celular real y generar el QR.
6. Configurar el rewrite de SPA en `vercel.json` para que las rutas `/jugar` y `/resultado` abran también desde enlaces directos:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

No implementar funciones backend: el proyecto solo calcula datos de la sesión en el navegador.

**Metadatos SEO:** título «Etiquetados — Un juego que te etiqueta antes de conocerte»; descripción: «Responde unas preguntas y descubre qué etiqueta te pondría nuestro algoritmo. Una experiencia satírica sobre estereotipos y clasificación»; usar la misma identidad en Open Graph y favicon.

**Checklist release:** build sin errores; nombre/apodo validado; flujo completo de 14 preguntas; rutas directas funcionales; resultado principal y secundario explicables; reiniciar borra nombre y respuestas; sonido silenciable; lectura y contraste probados en móvil; `prefers-reduced-motion` verificado; URL/QR comprobados y ningún error de consola.

---

## 12. Privacidad, ética e inclusión

- Solicitar **nombre o seudónimo** exclusivamente para personalizar la narrativa, sin exigir identidad legal. Sanitizar por React y limitar longitud. No pedir ni deducir datos de raza, identidad de género u orientación reales.
- No guardar el nombre ni respuestas en `localStorage`, cookies, base de datos o analítica; no enviar a Vercel Functions. Estado solo en memoria; al cerrar o reiniciar se borra. No usar nombres en URLs.
- No presentar **ninguna** clasificación como diagnóstico personal. Mostrar aviso de sátira al inicio y desmontaje al final. No usar barras de «% gay», «% hombre», etc.; únicamente índices del juego.
- No almacenar ni transmitir las respuestas de los escenarios `I01/I02`; para estudiantes racializados o LGBTQ+, utilizar casos ficticios y no suplantar sus testimonios.
- Si se realiza un piloto, solicitar participación voluntaria y registrar solo opiniones/resúmenes anónimos agregados. No publicar capturas identificables sin autorización.
- Mantener un **modo facilitador** para proyectar la revelación, explicar las reglas y evitar que el salón convierta resultados individuales en burlas.
- No usar IA para producir automáticamente los materiales finales si la guía del curso restringe IAG a planificación. Acreditar en dossier las decisiones del grupo y su bitácora de uso de IAG.

---

## 13. Estrategia de pruebas

### Unitarias (Vitest)

- Banco válido: 36 preguntas, 144 opciones, 15 perfiles puntuables, IDs únicos, pesos enteros positivos `1..3`, cero referencias puntuables a `I01/I02`.
- `scoreQuiz`: opción correcta suma pesos exactos; no suma perfiles no listados; normalización está en `0..100`; evidencia contiene ID de pregunta y respuesta.
- Dos respuestas distintas con el mismo ID se rechazan o reemplazan antes de puntuar; «Atrás» nunca duplica puntos.
- `selectQuestions`: recorridos de 12 y 14, sin duplicados, exactamente ocho `core` y dos `contrast`, dos grupos adaptativos con número esperado; misma semilla + mismas respuestas = misma ruta. Verificar selección opcional de `ruptura` y que M16 pueda liderar con al menos dos apoyos.
- Perfiles con menos de dos evidencias nunca se presentan como resultado único; empates próximos muestran dos etiquetas.
- Los escenarios `I01/I02` no pueden figurar en `ScoreDetails`.

### UI / E2E

- Nombre vacío, demasiado corto y demasiado largo; permitir seudónimo.
- Entrada desde móvil 360×800; tarjetas sin scroll horizontal; avance con touch y teclado.
- Reinicio borra nombre/respuestas, respuestas previas no se filtran al siguiente jugador.
- Cambiar una respuesta de ancla invalida ruta adaptativa posterior y explica lo ocurrido.
- Audio puede silenciarse; no suena sin interacción; respetar movimiento reducido.
- La pantalla final explica por qué se eligió la etiqueta y menciona que no determina identidad real.

### Prueba de equidad del simulador

- Generar >=10.000 recorridos sintéticos con distintas semillas y opciones uniformes, y otros recorridos dirigidos para cada perfil.
- Medir distribución de perfiles, cobertura por grupo, frecuencia de empates y cantidad de «sin perfil».
- Auditar que ningún perfil monopolice resultados solo porque aparece en más opciones del banco; si ocurre, ajustar preguntas/pesos o el denominador, documentando el motivo.
- Recordar: es QA del juego y de sus sesgos **simulados**, no validación científica de orientación, género o personalidad.

---

## 14. Plan de implementación priorizado

### P0 — Imprescindible para presentar

| Orden | Tarea | Criterio de aceptación |
|---:|---|---|
| 1 | Scaffold `etiquetados` con React + TypeScript + Vite + Tailwind + shadcn/ui + Motion | Corre localmente y hace build con la identidad Etiquetados |
| 2 | Cargar `src/data/questions.json` y validarlo | 36 preguntas, 144 opciones y 15 perfiles puntuables; identificadores y pesos originales conservados, con señales M16 añadidas en Q03/A y Q06/C |
| 3 | Construir `scoreQuiz` + pruebas | Pesos, normalización y evidencias comprobados |
| 4 | Implementar selección de 8+4+2 | 14 preguntas sin repetición y rutas reproducibles |
| 5 | Crear Welcome + Onboarding + Introducción + Quiz + Procesamiento + Resultado | Recorrido de marca completo, funcional y mobile-first |
| 6 | Construir revelación visual y explicación de reglas | Ningún resultado afirma detectar identidades reales |
| 7 | Aplicar stickers, sellos, Motion y sonidos propios | Etiquetas aparecen y se rompen; efectos accesibles y silenciables |
| 8 | Desplegar `etiquetados` en Vercel + QR + piloto | Enlace y rutas directas comprobados en un móvil real |

### P1 — Solo si sobra tiempo

- Escenarios interseccionales `I01/I02` interactivos en la explicación final (incluidos como reflexión educativa; no puntúan).
- Modo facilitador en proyector con historia de reglas usadas sin nombres.
- Contador local de respuestas y gráfica didáctica, sin guardar identidades.
- Versión corta de 12 preguntas, seleccionable al iniciar la experiencia.

### P2 — Después del curso

- Editor de preguntas para docentes, localización ES/EN, dashboard con consentimiento explícito y datos realmente anónimos, lectura del dossier, accesibilidad auditada y componentes opcionales de audio espacial.

### Distribución de responsabilidades (3 integrantes)

| Rol | Responsabilidad |
|---|---|
| Mercadeo 1 | Copy de preguntas, contexto social, revisión ética, explicación de resultados y dossier |
| Mercadeo 2 | Concepto visual, guion de revelación, UX, prototipo, QR, dinámica con público |
| Música | Identidad sonora y efectos, dirección de ritmo narrativo, apoyo a integración técnica y QA |

**Riesgo principal:** perder tiempo en animaciones o intentar entrenar IA. El valor académico está en la mecánica satírica, la crítica conceptual y el acabado de la experiencia, no en usar un modelo real.

**Plan de contingencia para presentación:** tener enlace Vercel y QR impresos, una copia local en portátil y una secuencia corta de capturas o grabación de pantalla por si falla internet. Si hay poco tiempo antes de la fecha de entrega, priorizar P0 completo y dejar P1 fuera.

---

## 15. Dossier y sustentación académica

**Dossier (3–5 páginas):** diagnóstico de estereotipos y categorización en plataformas; tres autores o textos efectivamente estudiados (por ejemplo Butler: performatividad; Foucault: normalización y poder; Mara Viveros: interseccionalidad); contribución a la inclusión; objetivo; decisiones éticas; bitácora de uso de IAG en planificación.

**Pitch de 7 minutos:** 0:00–1:00 hook y QR; 1:00–3:00 juego; 3:00–4:00 revelación; 4:00–6:00 vínculo con teoría, reglas y límites del sistema; 6:00–7:00 reflexión, cambio de perspectiva y cierre. El juego puede ejecutarse en teléfonos individuales; preparar un modo demostración abreviado para evitar que las 14 preguntas se prolonguen durante la sustentación.

**Meta de evaluación:** experiencia lúdica bien acabada, fundamentación rigurosa, mensaje de inclusión inequívoco, prototipo funcional y demostración estable. La dinámica **no valida** que se puedan detectar identidades reales; demuestra lo contrario.

---

## 16. Referencias de implementación (verificadas 23-11-2026)

- React 19.3: https://react.dev/blog/2026/09/09/react-19-3
- Vite (guía y requisitos Node): https://vite.dev/guide/
- Vercel para Vite (SPA rewrite): https://vercel.com/docs/frameworks/frontend/vite

**Artefacto de datos:** [`src/data/questions.json`](src/data/questions.json) es el catálogo activo de perfiles, preguntas y pesos. No se debe volver a copiar manualmente desde este documento.
