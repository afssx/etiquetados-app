import { describe, expect, it } from "vitest";
import {
  buildResult,
  questionBank,
  scoreQuiz,
  selectNextQuestions,
  validateQuestionBank,
  type AnswerId,
} from "./quiz";

describe("banco de preguntas", () => {
  it("valida 36 preguntas, 144 opciones y dos escenarios no puntuables", () => {
    expect(questionBank.questions).toHaveLength(36);
    expect(questionBank.questions.reduce((total, question) => total + question.options.length, 0)).toBe(144);
    expect(questionBank.scoredProfileIds).toHaveLength(15);
    expect(questionBank.scenarioProfileIds).toEqual(["I01", "I02"]);
    expect(() => validateQuestionBank({ ...questionBank, questions: [] })).toThrow(
      "no cumple el esquema esperado",
    );
    expect(
      questionBank.questions.flatMap((question) =>
        question.options.flatMap((option) => Object.keys(option.weights)),
      ),
    ).not.toContain("I01");
  });

  it("rechaza opciones inválidas y pesos fuera de la escala en las nuevas preguntas", () => {
    const questions = structuredClone(questionBank.questions);
    const question = questions.find(({ id }) => id === "Q33");
    if (!question) throw new Error("Falta Q33");
    question.options[0].weights.M16 = 4;
    expect(() => validateQuestionBank({ ...questionBank, questions })).toThrow();
    question.options[0].weights.M16 = 2;
    question.options.pop();
    expect(() => validateQuestionBank({ ...questionBank, questions })).toThrow();
  });
});

describe("puntuación", () => {
  it("calcula puntos, apoyos y normalización sin tratarla como probabilidad", () => {
    const scores = scoreQuiz(questionBank, ["Q01", "Q03"], { Q01: "A", Q03: "A" });
    const alpha = scores.find((score) => score.id === "H01");

    expect(alpha).toMatchObject({
      points: 4,
      supports: 2,
      possiblePoints: 4,
      normalizedIndex: 100,
    });
    expect(alpha?.evidence).toEqual([
      { questionId: "Q01", optionId: "A", delta: 2 },
      { questionId: "Q03", optionId: "A", delta: 2 },
    ]);
    expect(scores.find((score) => score.id === "I01")).toBeUndefined();
  });

  it("no presenta una etiqueta con menos de dos preguntas de apoyo", () => {
    const result = buildResult(questionBank, ["Q01"], { Q01: "A" });
    expect(result.leaders).toEqual([]);
  });

  it("exige dos apoyos independientes también para M16", () => {
    expect(buildResult(questionBank, ["Q33"], { Q33: "B" }).leaders).toEqual([]);
    const result = buildResult(questionBank, ["Q33", "Q34"], { Q33: "B", Q34: "B" });
    expect(result.leaders[0]).toMatchObject({ id: "M16", supports: 2, points: 6 });
    expect(result.leaders[0].evidence).toEqual([
      { questionId: "Q33", optionId: "B", delta: 3 },
      { questionId: "Q34", optionId: "B", delta: 3 },
    ]);
  });
});

describe("selección adaptativa reproducible", () => {
  const coreIds = questionBank.questions
    .filter((question) => question.pool === "core")
    .map(({ id }) => id);
  const answers = Object.fromEntries(
    coreIds.map((id) => [id, "A" as AnswerId]),
  ) as Record<string, AnswerId>;

  it.each([12, 14] as const)(
    "construye una ruta de %i preguntas sin duplicados",
    (target) => {
      const first = selectNextQuestions(questionBank, 2048, answers, target);
      const second = selectNextQuestions(questionBank, 2048, answers, target);
      const pools = first.map((id) => questionBank.questions.find((question) => question.id === id)?.pool);

      expect(first).toHaveLength(target - 8);
      expect(new Set(first).size).toBe(first.length);
      expect(first).toEqual(second);
      expect(pools.filter((pool) => pool === "contrast")).toHaveLength(2);
      expect(new Set(pools.filter((pool) => pool !== "contrast")).size).toBe(2);
    },
  );

  it("incluye preguntas de ruptura cuando sus anclas aportan afinidad, sin forzarlas", () => {
    const activated = { ...answers, Q03: "A", Q06: "C" } as Record<string, AnswerId>;
    const seen = new Set<string>();
    for (let seed = 1; seed <= 40; seed += 1) {
      selectNextQuestions(questionBank, seed, activated, 14)
        .filter((id) => questionBank.questions.find((question) => question.id === id)?.pool === "ruptura")
        .forEach((id) => seen.add(id));
    }
    expect([...seen].sort()).toEqual(["Q33", "Q34", "Q35", "Q36"]);
    const unrelated = { ...answers, Q03: "B", Q06: "A" } as Record<string, AnswerId>;
    expect(selectNextQuestions(questionBank, 2048, unrelated, 14)).not.toContain("Q33");
    expect(selectNextQuestions(questionBank, 2048, unrelated, 14))
      .not.toContain("Q34");
    expect(selectNextQuestions(questionBank, 2048, unrelated, 14))
      .not.toContain("Q35");
    expect(selectNextQuestions(questionBank, 2048, unrelated, 14))
      .not.toContain("Q36");
  });
});
