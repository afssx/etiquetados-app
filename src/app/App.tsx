import { useEffect, useMemo, useReducer, useState } from "react";
import type { FormEvent } from "react";
import {
  buildResult,
  questionBank,
  selectNextQuestions,
  seededShuffle,
  type AnswerId,
  type ProfileScore,
} from "../domain/quiz";
import { learningCases } from "../domain/learningCases";

type Screen = "landing" | "quiz" | "calculating" | "result";
type Answers = Record<string, AnswerId>;

interface QuizState {
  screen: Screen;
  name: string;
  targetTotal: 12 | 14 | 16;
  seed: number;
  questionIds: string[];
  answers: Answers;
  index: number;
  muted: boolean;
  notice: string;
}

type Action =
  | { type: "START"; name: string; targetTotal: 12 | 14 | 16 }
  | { type: "SELECT"; optionId: AnswerId }
  | { type: "NEXT" }
  | { type: "BACK" }
  | { type: "REVEAL" }
  | { type: "TOGGLE_SOUND" }
  | { type: "RESET" };

const initialState: QuizState = {
  screen: "landing",
  name: "",
  targetTotal: 14,
  seed: 1,
  questionIds: [],
  answers: {},
  index: 0,
  muted: true,
  notice: "",
};

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case "START": {
      const seed = window.crypto.getRandomValues(new Uint32Array(1))[0] ?? 1;
      const coreIds = questionBank.questions
        .filter((question) => question.pool === "core")
        .map(({ id }) => id);
      return {
        ...initialState,
        screen: "quiz",
        name: action.name,
        targetTotal: action.targetTotal,
        seed,
        questionIds: seededShuffle(coreIds, seed),
      };
    }
    case "SELECT": {
      const questionId = state.questionIds[state.index];
      if (!questionId) return state;
      const previousAnswer = state.answers[questionId];
      if (previousAnswer === action.optionId) return state;

      const isCoreQuestion = questionBank.questions.find(
        (question) => question.id === questionId,
      )?.pool === "core";
      const changedCoreAfterAdaptives =
        isCoreQuestion && state.questionIds.length > 8 && previousAnswer !== undefined;
      if (!changedCoreAfterAdaptives) {
        return {
          ...state,
          answers: { ...state.answers, [questionId]: action.optionId },
          notice: "",
        };
      }

      const coreIds = state.questionIds.slice(0, 8);
      const answers = Object.fromEntries(
        Object.entries({ ...state.answers, [questionId]: action.optionId }).filter(([id]) =>
          coreIds.includes(id),
        ),
      ) as Answers;
      return {
        ...state,
        questionIds: coreIds,
        answers,
        notice:
          "Cambiaste una respuesta inicial. Las preguntas adaptativas anteriores se descartaron y se elegirán de nuevo.",
      };
    }
    case "NEXT": {
      if (!state.questionIds[state.index] || !state.answers[state.questionIds[state.index]]) {
        return state;
      }
      if (state.index === 7 && state.questionIds.length === 8) {
        return {
          ...state,
          questionIds: [
            ...state.questionIds,
            ...selectNextQuestions(
              questionBank,
              state.seed,
              state.answers,
              state.targetTotal,
            ),
          ],
          index: 8,
          notice: "",
        };
      }
      if (state.index === state.questionIds.length - 1) {
        return { ...state, screen: "calculating", notice: "" };
      }
      return { ...state, index: state.index + 1, notice: "" };
    }
    case "BACK":
      return state.index > 0 ? { ...state, index: state.index - 1, notice: "" } : state;
    case "REVEAL":
      return { ...state, screen: "result" };
    case "TOGGLE_SOUND":
      return { ...state, muted: !state.muted };
    case "RESET":
      return { ...initialState, muted: state.muted };
  }
}

function playTone(muted: boolean, note: number) {
  if (muted || !window.AudioContext) return;
  const context = new window.AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = note;
  gain.gain.setValueAtTime(0.055, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.18);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.18);
  window.setTimeout(() => void context.close(), 250);
}

function isValidName(name: string) {
  const length = name.trim().length;
  return length >= 2 && length <= 30;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [nameInput, setNameInput] = useState("");
  const [targetTotal, setTargetTotal] = useState<12 | 14 | 16>(14);
  const [showReveal, setShowReveal] = useState(false);
  const [caseAnswers, setCaseAnswers] = useState<Record<string, number>>({});

  const currentQuestion = useMemo(() => {
    const id = state.questionIds[state.index];
    return questionBank.questions.find((question) => question.id === id);
  }, [state.index, state.questionIds]);
  const selectedOption = currentQuestion ? state.answers[currentQuestion.id] : undefined;
  const result = useMemo(
    () => buildResult(questionBank, state.questionIds, state.answers),
    [state.answers, state.questionIds],
  );
  const profilesById = useMemo(
    () => new Map(questionBank.profiles.map((profile) => [profile.id, profile])),
    [],
  );

  useEffect(() => {
    if (state.screen !== "calculating") return;
    const timeout = window.setTimeout(() => dispatch({ type: "REVEAL" }), 850);
    return () => window.clearTimeout(timeout);
  }, [state.screen]);

  useEffect(() => {
    if (state.screen !== "quiz") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && ["INPUT", "TEXTAREA"].includes(event.target.tagName)) {
        return;
      }
      const optionIndex = Number(event.key) - 1;
      if (optionIndex >= 0 && optionIndex < 4) {
        const option = currentQuestion?.options[optionIndex];
        if (option) {
          event.preventDefault();
          dispatch({ type: "SELECT", optionId: option.id });
          playTone(state.muted, 520 + optionIndex * 55);
        }
      } else if (
        event.key === "Enter" &&
        !(event.target instanceof HTMLButtonElement)
      ) {
        event.preventDefault();
        dispatch({ type: "NEXT" });
      } else if (
        event.key === "Enter" &&
        event.target instanceof HTMLButtonElement &&
        event.target.classList.contains("answer-option") &&
        selectedOption
      ) {
        event.preventDefault();
        dispatch({ type: "NEXT" });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentQuestion, selectedOption, state.muted, state.screen]);

  function startQuiz(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidName(nameInput)) return;
    setShowReveal(false);
    setCaseAnswers({});
    dispatch({ type: "START", name: nameInput.trim(), targetTotal });
    playTone(state.muted, 440);
  }

  function selectOption(optionId: AnswerId) {
    dispatch({ type: "SELECT", optionId });
    playTone(state.muted, 590);
  }

  function resetQuiz() {
    setNameInput("");
    setTargetTotal(14);
    setShowReveal(false);
    setCaseAnswers({});
    dispatch({ type: "RESET" });
  }

  if (state.screen === "landing") {
    return (
      <main className="shell landing">
        <div className="topline">
          <span className="brand"><span className="brand-mark">?</span> ETIQUETADOS</span>
          <span className="edition">EXPERIMENTO 001 / SIN REGISTRO</span>
        </div>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="pulse-dot" /> UN ALGORITMO CREE QUE TE CONOCE</p>
            <h1>ETIQUETA<span>DOS</span></h1>
            <p className="hero-lede">
              Un juego que te etiqueta antes de conocerte. El problema no eres tú: es la máquina.
            </p>
            <div className="notice">
              <span className="notice-icon" aria-hidden="true">!</span>
              <p><strong>Experiencia satírica.</strong> No determina tu identidad, género,
                orientación ni personalidad.</p>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="scanner-card">
              <span className="scan-label">ANÁLISIS DE PREJUICIOS</span>
              <div className="scan-face">?</div>
              <div className="scan-line" />
              <span className="scan-status">IDENTIDAD: NO DISPONIBLE</span>
            </div>
            <span className="art-tag tag-top">DATOS ≠ PERSONA</span>
            <span className="art-tag tag-bottom">ERROR: DEMASIADO HUMANO</span>
          </div>
        </section>
        <section className="start-panel">
          <div>
            <p className="eyebrow">01 — ANTES DE EMPEZAR</p>
            <h2>¿Cómo te llamamos?</h2>
            <p className="muted">Usa un nombre o seudónimo. No necesitamos nada más.</p>
          </div>
          <form className="start-form" onSubmit={startQuiz}>
            <label className="field-label" htmlFor="display-name">Nombre o apodo</label>
            <input
              id="display-name"
              maxLength={30}
              minLength={2}
              onChange={(event) => setNameInput(event.target.value)}
              placeholder="Tu nombre"
              value={nameInput}
            />
            <label className="field-label" htmlFor="question-count">Cantidad de preguntas</label>
            <select
              id="question-count"
              onChange={(event) => setTargetTotal(Number(event.target.value) as 12 | 14 | 16)}
              value={targetTotal}
            >
              <option value={12}>Rápida · 12 preguntas</option>
              <option value={14}>Completa · 14 preguntas</option>
              <option value={16}>Extendida · 16 preguntas</option>
            </select>
            <button className="button button-primary" disabled={!isValidName(nameInput)} type="submit">
              Comenzar <span aria-hidden="true">↗</span>
            </button>
          </form>
        </section>
        <footer className="site-footer">
          <span>NO ES UN TEST. ES UN ESPEJO DEL SISTEMA.</span>
          <span>HECHO PARA CUESTIONAR, NO PARA ETIQUETAR.</span>
        </footer>
      </main>
    );
  }

  if (state.screen === "quiz" && currentQuestion) {
    return (
      <main className="shell quiz-shell">
        <div className="quiz-topline">
          <button className="wordmark-button" onClick={resetQuiz} type="button">
            <span className="brand-mark">?</span> ETIQUETADOS
          </button>
          <div className="quiz-tools">
            <span className="desktop-hint">RESPUESTAS LOCALES · SIN PERFIL REAL</span>
            <button
              aria-pressed={!state.muted}
              className="sound-button"
              onClick={() => dispatch({ type: "TOGGLE_SOUND" })}
              type="button"
            >
              {state.muted ? "Sonido apagado" : "Sonido activado"}
            </button>
          </div>
        </div>
        <div className="progress-meta">
          <span>PREGUNTA <strong>{String(state.index + 1).padStart(2, "0")}</strong> / {state.targetTotal}</span>
          <span>{currentQuestion.topic.toUpperCase()}</span>
        </div>
        <div
          aria-label={`Progreso: ${state.index + 1} de ${state.targetTotal} preguntas`}
          className="progress-track"
          role="progressbar"
          aria-valuemax={state.targetTotal}
          aria-valuemin={0}
          aria-valuenow={state.index + 1}
        >
          <div className="progress-fill" style={{ width: `${((state.index + 1) / state.targetTotal) * 100}%` }} />
        </div>
        <section aria-labelledby="question-title" className="question-panel">
          <p className="eyebrow">A VECES ELEGIR NO SIGNIFICA NADA. VEAMOS QUÉ DICE LA MÁQUINA.</p>
          <h1 aria-live="polite" id="question-title">{currentQuestion.text}</h1>
          <p className="answer-helper">Elige la opción que más te guste. No hay respuestas correctas. <span>1–4 para elegir</span></p>
          <div className="answers-grid">
            {currentQuestion.options.map((option, index) => (
              <button
                aria-pressed={selectedOption === option.id}
                className={`answer-option${selectedOption === option.id ? " is-selected" : ""}`}
                key={option.id}
                onClick={() => selectOption(option.id)}
                type="button"
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span>{option.text}</span>
                <span className="option-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          {state.notice && <p className="inline-notice" role="status">{state.notice}</p>}
          <div className="quiz-navigation">
            <button className="button button-quiet" disabled={state.index === 0} onClick={() => dispatch({ type: "BACK" })} type="button">
              ← Atrás
            </button>
            <button className="button button-primary" disabled={!selectedOption} onClick={() => dispatch({ type: "NEXT" })} type="button">
              {state.index === state.targetTotal - 1 ? "Ver resultado" : "Siguiente"} <span aria-hidden="true">→</span>
            </button>
          </div>
          <p className="privacy-caption">Tus elecciones no se guardan ni se transmiten.</p>
        </section>
      </main>
    );
  }

  if (state.screen === "calculating") {
    return (
      <main aria-live="polite" className="shell loading-screen">
        <div className="loading-orbit"><span>?</span></div>
        <p className="eyebrow"><span className="pulse-dot" /> PROCESO LOCAL · SIN INTELIGENCIA ARTIFICIAL</p>
        <h1>Buscando<br /><span>prejuicios...</span></h1>
        <p>Clasificando gustos absurdamente.</p>
        <button className="button button-quiet" onClick={() => dispatch({ type: "REVEAL" })} type="button">Saltar animación →</button>
      </main>
    );
  }

  const leaders = result.leaders;
  const evidenceScores = leaders.length
    ? leaders
    : result.scores.filter((score) => score.points > 0).slice(0, 2);
  const evidence = evidenceScores
    .flatMap((score) =>
      score.evidence.map((item) => ({
        ...item,
        profile: profilesById.get(score.id),
        option: questionBank.questions
          .find((question) => question.id === item.questionId)
          ?.options.find((option) => option.id === item.optionId),
      })),
    )
    .slice(0, 3);

  return (
    <main className="shell result-shell">
      <div className="quiz-topline">
        <span className="wordmark-button"><span className="brand-mark">?</span> INFORME DEL SISTEMA</span>
        <button className="sound-button" onClick={() => dispatch({ type: "TOGGLE_SOUND" })} type="button">
          {state.muted ? "Sonido apagado" : "Sonido activado"}
        </button>
      </div>
      <section className="result-hero">
        <p className="eyebrow"><span className="pulse-dot" /> INFORME GENERADO · {state.targetTotal} RESPUESTAS</p>
        <h1>{state.name}, nuestro algoritmo prejuicioso te etiquetó como...</h1>
        {leaders.length ? (
          <div className={`result-labels${leaders.length > 1 ? " is-contradiction" : ""}`}>
            {leaders.map((score) => {
              const profile = profilesById.get(score.id);
              return (
                <article className="result-label" key={score.id}>
                  <span className="result-code">{score.id} / ETIQUETA INVENTADA</span>
                  <h2>{profile?.name}</h2>
                  <p>{profile?.category}</p>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="no-label">
            <span className="result-code">RESULTADO: INDETERMINADO</span>
            <h2>No cabes en nuestro algoritmo.</h2>
            <p>El sistema no reunió ni dos prejuicios independientes para etiquetarte. Eso habla de sus límites, no de ti.</p>
          </div>
        )}
        {leaders.length > 1 && (
          <p className="contradiction-note">El sistema cree dos cosas contradictorias a la vez. No eres tú quien está mal clasificado: el sistema fue diseñado con prejuicios.</p>
        )}
        <div className="score-list" aria-label="Puntos del algoritmo (no representan probabilidades)">
          {result.scores.slice(0, 4).map((score: ProfileScore) => (
            <div className="score-row" key={score.id}>
              <span>{profilesById.get(score.id)?.name}</span>
              <div className="score-track"><div style={{ width: `${score.normalizedIndex}%` }} /></div>
              <strong>{score.normalizedIndex}</strong>
            </div>
          ))}
          <p className="score-caption">Índice de caricatura · no es una probabilidad ni describe tu identidad</p>
        </div>
        {!showReveal ? (
          <button className="button button-primary reveal-button" onClick={() => {
            setShowReveal(true);
            playTone(state.muted, 690);
          }} type="button">
            Revelar cómo se inventó <span aria-hidden="true">↓</span>
          </button>
        ) : (
          <section aria-labelledby="reveal-title" aria-live="polite" className="reveal-panel">
            <p className="eyebrow">02 — EL GIRO</p>
            <h2 id="reveal-title">El algoritmo no te conoce.<br />Solo conoce sus prejuicios.</h2>
            <p className="reveal-lede">Tu resultado no revela quién eres; revela cómo se programó esta caricatura. Asociar gustos con identidades no es evidencia: es un estereotipo convertido en regla.</p>
            <h3>Así fabricó su conclusión</h3>
            {evidence.length ? (
              <ul className="evidence-list">
                {evidence.map((item) => (
                  <li key={`${item.questionId}-${item.profile?.id}`}>
                    <span className="evidence-mark">↳</span>
                    <span>Elegiste <strong>«{item.option?.text}»</strong>; el sistema sumó {item.delta} punto{item.delta === 1 ? "" : "s"} a «{item.profile?.name}» porque asumió: <em>{item.profile?.falseAssumption}</em></span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">No hubo suficientes coincidencias para fabricar una etiqueta. El catálogo no contempla todas las experiencias, y eso también es un límite.</p>
            )}
            <div className="callout">
              <strong>Esto no determina tu identidad.</strong> Ninguna respuesta permite deducir género, orientación sexual, raza ni personalidad. La sátira se dirige al algoritmo, no a quien participa.
            </div>
            <section aria-labelledby="learning-title" className="learning-section">
              <div className="section-heading">
                <div><p className="eyebrow">03 — PONLO A PRUEBA</p><h3 id="learning-title">Dos casos ficticios. Cero etiquetas.</h3></div>
                <span className="case-note">No se puntúan ni se guardan</span>
              </div>
              <div className="case-grid">
                {learningCases.map((learningCase) => (
                  <article className="case-card" key={learningCase.id}>
                    <span className="case-id">{learningCase.id} · {learningCase.title}</span>
                    <h4>{learningCase.question}</h4>
                    <div className="case-options">
                      {learningCase.options.map((option, index) => (
                        <button
                          aria-pressed={caseAnswers[learningCase.id] === index}
                          className={caseAnswers[learningCase.id] === index ? "case-option selected" : "case-option"}
                          key={option.text}
                          onClick={() => setCaseAnswers((previous) => ({ ...previous, [learningCase.id]: index }))}
                          type="button"
                        >
                          <span>{String.fromCharCode(65 + index)}</span>{option.text}
                        </button>
                      ))}
                    </div>
                    {caseAnswers[learningCase.id] !== undefined && (
                      <p className="case-feedback" role="status">{learningCase.options[caseAnswers[learningCase.id]]?.feedback}</p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          </section>
        )}
        <div className="result-actions">
          <button className="button button-quiet" onClick={resetQuiz} type="button">↻ Reiniciar prueba</button>
          <span className="text-link">Una experiencia para cuestionar, no etiquetar.</span>
        </div>
      </section>
      <footer className="site-footer"><span>NINGUNA PERSONA CABE EN UNA CATEGORÍA.</span><span>LAS REGLAS SÍ SE PUEDEN CUESTIONAR.</span></footer>
    </main>
  );
}

export default App;
