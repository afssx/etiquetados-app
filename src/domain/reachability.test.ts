import { describe, expect, it } from "vitest";
import {
  buildResult,
  questionBank,
  seededShuffle,
  selectNextQuestions,
  type AnswerId,
} from "./quiz";

describe("alcance de estereotipos", () => {
  it.each([12, 14] as const)(
    "encuentra un recorrido real hacia cada etiqueta en %i preguntas",
    (total) => {
      const byId = new Map(questionBank.questions.map((question) => [question.id, question]));
      const coreIds = questionBank.questions
        .filter((question) => question.pool === "core")
        .map((question) => question.id);
      const missing: string[] = [];

      for (const profileId of questionBank.scoredProfileIds) {
        let found = false;
        for (let seed = 1; seed <= 1200 && !found; seed += 1) {
          let randomState = seed;
          const random = () => {
            randomState = (Math.imul(randomState, 1664525) + 1013904223) >>> 0;
            return randomState / 4294967296;
          };
          const answers: Record<string, AnswerId> = {};
          const answer = (id: string) => {
            const question = byId.get(id);
            if (!question) throw new Error(`Pregunta desconocida: ${id}`);
            const max = Math.max(...question.options.map((option) => option.weights[profileId] ?? 0));
            const preferred = question.options.filter((option) => (option.weights[profileId] ?? 0) === max);
            const choices = max > 0 && random() < 0.8 ? preferred : question.options;
            answers[id] = choices[Math.floor(random() * choices.length)].id;
          };
          const core = seededShuffle(coreIds, seed);
          core.forEach(answer);
          const remaining = selectNextQuestions(questionBank, seed, answers, total);
          remaining.forEach(answer);
          const route = [...core, ...remaining];
          expect(route).toHaveLength(total);
          expect(new Set(route).size).toBe(total);
          const leaders = buildResult(questionBank, route, answers).leaders;
          found = profileId === "M16"
            ? leaders[0]?.id === profileId
            : leaders.some((leader) => leader.id === profileId);
        }
        if (!found) missing.push(profileId);
      }

      expect(missing).toEqual([]);
    },
    120_000,
  );
});
