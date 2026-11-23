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
  it("valida 32 preguntas, 128 opciones y dos escenarios no puntuables", () => {
    expect(questionBank.questions).toHaveLength(32);
    expect(questionBank.questions.reduce((total, question) => total + question.options.length, 0)).toBe(128);
    expect(questionBank.scoredProfileIds).toHaveLength(14);
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
});

describe("selección adaptativa reproducible", () => {
  const coreIds = questionBank.questions
    .filter((question) => question.pool === "core")
    .map(({ id }) => id);
  const answers = Object.fromEntries(
    coreIds.map((id) => [id, "A" as AnswerId]),
  ) as Record<string, AnswerId>;

  it.each([12, 14, 16] as const)(
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
});
