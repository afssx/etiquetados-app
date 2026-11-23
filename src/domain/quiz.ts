import rawBank from "../data/questions.json";

export type AnswerId = "A" | "B" | "C" | "D";
export type QuestionPool =
  | "core"
  | "masculinidad"
  | "feminidad"
  | "orientacion"
  | "roles"
  | "ambiguedad"
  | "contrast";

export interface Option {
  id: AnswerId;
  text: string;
  weights: Record<string, number>;
}

export interface Question {
  id: string;
  pool: QuestionPool;
  topic: string;
  text: string;
  options: Option[];
}

export interface Profile {
  id: string;
  name: string;
  category: string;
  falseAssumption: string;
  fictionalBranch: string;
  mode: "satirical_score" | "scenario";
}

export interface QuestionBank {
  schemaVersion: number;
  project: string;
  scoredProfileIds: string[];
  scenarioProfileIds: string[];
  profiles: Profile[];
  config: { defaultTotal: number };
  questions: Question[];
}

export interface ProfileScore {
  id: string;
  points: number;
  supports: number;
  possiblePoints: number;
  normalizedIndex: number;
  evidence: Array<{ questionId: string; optionId: AnswerId; delta: number }>;
}

export interface QuizResult {
  scores: ProfileScore[];
  leaders: ProfileScore[];
}

const ANSWER_IDS: AnswerId[] = ["A", "B", "C", "D"];
const ADAPTIVE_POOLS: QuestionPool[] = [
  "masculinidad",
  "feminidad",
  "orientacion",
  "roles",
  "ambiguedad",
];
const PROFILE_GROUPS: Record<Exclude<QuestionPool, "core" | "contrast">, string[]> = {
  masculinidad: ["H01", "H02", "H03", "H06"],
  feminidad: ["M01", "M02", "M04", "M13"],
  orientacion: ["H07", "H09", "M07", "M10"],
  roles: ["H01", "H03", "M01", "M02", "M13", "M04"],
  ambiguedad: ["H11", "M11"],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isQuestionBank(value: unknown): value is QuestionBank {
  if (!isRecord(value)) return false;
  const { scoredProfileIds, scenarioProfileIds, profiles, questions, config } = value;
  if (
    value.schemaVersion !== 1 ||
    typeof value.project !== "string" ||
    !Array.isArray(scoredProfileIds) ||
    !Array.isArray(scenarioProfileIds) ||
    !Array.isArray(profiles) ||
    profiles.length !== 16 ||
    !Array.isArray(questions) ||
    !isRecord(config) ||
    config.defaultTotal !== 14 ||
    questions.length !== 32 ||
    scoredProfileIds.length !== 14 ||
    scenarioProfileIds.length !== 2
  ) {
    return false;
  }

  const scoredIds = new Set(scoredProfileIds);
  const scenarioIds = new Set(scenarioProfileIds);
  if (
    scoredIds.size !== 14 ||
    scenarioIds.size !== 2 ||
    [...scoredIds].some((id) => scenarioIds.has(id))
  ) {
    return false;
  }

  const profileIds = new Set<string>();
  const profileModes = new Map<string, string>();
  for (const profile of profiles) {
    if (
      !isRecord(profile) ||
      typeof profile.id !== "string" ||
      typeof profile.name !== "string" ||
      typeof profile.category !== "string" ||
      typeof profile.falseAssumption !== "string" ||
      typeof profile.fictionalBranch !== "string" ||
      !["satirical_score", "scenario"].includes(String(profile.mode))
    ) {
      return false;
    }
    if (profileIds.has(profile.id)) return false;
    profileIds.add(profile.id);
    profileModes.set(profile.id, String(profile.mode));
  }
  if (
    profileIds.size !== scoredIds.size + scenarioIds.size ||
    [...scoredIds].some((id) => !profileIds.has(String(id))) ||
    [...scoredIds].some((id) => profileModes.get(String(id)) !== "satirical_score") ||
    [...scenarioIds].some(
      (id) => !profileIds.has(String(id)) || profileModes.get(String(id)) !== "scenario",
    )
  ) {
    return false;
  }

  const questionIds = new Set<string>();
  const poolCounts = new Map<string, number>();
  for (const question of questions) {
    if (
      !isRecord(question) ||
      typeof question.id !== "string" ||
      typeof question.text !== "string" ||
      typeof question.topic !== "string" ||
      !ADAPTIVE_POOLS.concat(["core", "contrast"]).includes(question.pool as QuestionPool) ||
      !Array.isArray(question.options) ||
      question.options.length !== 4
    ) {
      return false;
    }
    if (questionIds.has(question.id)) return false;
    questionIds.add(question.id);
    poolCounts.set(question.pool as string, (poolCounts.get(question.pool as string) ?? 0) + 1);

    const optionIds = new Set<string>();
    for (const option of question.options) {
      if (
        !isRecord(option) ||
        typeof option.id !== "string" ||
        !ANSWER_IDS.includes(option.id as AnswerId) ||
        typeof option.text !== "string" ||
        !isRecord(option.weights)
      ) {
        return false;
      }
      if (Object.keys(option.weights).length === 0) return false;
      if (optionIds.has(option.id)) return false;
      optionIds.add(option.id);
      for (const [profileId, weight] of Object.entries(option.weights)) {
        if (
          !scoredIds.has(profileId) ||
          scenarioIds.has(profileId) ||
          typeof weight !== "number" ||
          !Number.isInteger(weight) ||
          weight < 1 ||
          weight > 3
        ) {
          return false;
        }
      }
    }
    if (optionIds.size !== 4) return false;
  }

  return (
    poolCounts.get("core") === 8 &&
    poolCounts.get("contrast") === 4 &&
    ADAPTIVE_POOLS.every((pool) => poolCounts.get(pool) === 4)
  );
}

export function validateQuestionBank(value: unknown): QuestionBank {
  if (!isQuestionBank(value)) {
    throw new Error(
      "El banco de preguntas no cumple el esquema esperado (32 preguntas, opciones A–D y perfiles válidos).",
    );
  }
  return value;
}

export const questionBank = validateQuestionBank(rawBank);

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function stableHash(value: string): number {
  return [...value].reduce((hash, character) => Math.imul(hash ^ character.charCodeAt(0), 16777619), 2166136261) >>> 0;
}

export function seededShuffle<T>(items: readonly T[], seed: number): T[] {
  const result = [...items];
  const random = seededRandom(seed);
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

export function scoreQuiz(
  bank: QuestionBank,
  questionIds: readonly string[],
  answers: Readonly<Record<string, AnswerId>>,
): ProfileScore[] {
  const questions = new Map(bank.questions.map((question) => [question.id, question]));
  const scores = new Map<string, ProfileScore>(
    bank.scoredProfileIds.map((id) => [
      id,
      { id, points: 0, supports: 0, possiblePoints: 0, normalizedIndex: 0, evidence: [] },
    ]),
  );

  for (const questionId of questionIds) {
    const question = questions.get(questionId);
    if (!question) throw new Error(`Pregunta desconocida: ${questionId}`);
    const answerId = answers[questionId];
    if (!answerId) continue;
    const option = question.options.find((item) => item.id === answerId);
    if (!option) throw new Error(`Respuesta desconocida para ${questionId}: ${answerId}`);

    for (const [profileId, score] of scores) {
      score.possiblePoints += Math.max(
        0,
        ...question.options.map((item) => item.weights[profileId] ?? 0),
      );
      const delta = option.weights[profileId] ?? 0;
      if (delta > 0) {
        score.points += delta;
        score.supports += 1;
        score.evidence.push({ questionId, optionId: answerId, delta });
      }
    }
  }

  return [...scores.values()].map((score) => ({
    ...score,
    normalizedIndex:
      score.possiblePoints === 0
        ? 0
        : Math.round(
            (100 * score.points * Math.min(1, score.supports / 2)) / score.possiblePoints,
          ),
  }));
}

export function selectNextQuestions(
  bank: QuestionBank,
  seed: number,
  answers: Readonly<Record<string, AnswerId>>,
  targetTotal: 12 | 14 | 16,
): string[] {
  const coreIds = bank.questions.filter((question) => question.pool === "core").map(({ id }) => id);
  const coreScores = scoreQuiz(bank, coreIds, answers);
  const profileScores = new Map(coreScores.map((score) => [score.id, score.normalizedIndex]));
  const tieOrder = seededShuffle(ADAPTIVE_POOLS, seed);
  const tieRank = new Map(tieOrder.map((pool, index) => [pool, index]));
  const rankedGroups = [...ADAPTIVE_POOLS].sort((first, second) => {
    const affinity = (pool: QuestionPool) => {
      const profileIds = PROFILE_GROUPS[pool as keyof typeof PROFILE_GROUPS];
      const topScores = profileIds
        .map((id) => profileScores.get(id) ?? 0)
        .sort((a, b) => b - a)
        .slice(0, 2);
      return topScores.reduce((total, score) => total + score, 0) / topScores.length;
    };
    return (
      affinity(second) - affinity(first) ||
      (tieRank.get(first) ?? 0) - (tieRank.get(second) ?? 0)
    );
  });

  const questionsPerGroup = (targetTotal - 10) / 2;
  const adaptiveIds = rankedGroups.slice(0, 2).flatMap((pool) =>
    seededShuffle(
      bank.questions.filter((question) => question.pool === pool).map(({ id }) => id),
      seed + stableHash(pool),
    ).slice(0, questionsPerGroup),
  );
  const contrastIds = seededShuffle(
    bank.questions.filter((question) => question.pool === "contrast").map(({ id }) => id),
    seed + 701,
  ).slice(0, 2);

  return [...adaptiveIds, ...contrastIds];
}

export function buildResult(
  bank: QuestionBank,
  questionIds: readonly string[],
  answers: Readonly<Record<string, AnswerId>>,
): QuizResult {
  const scores = scoreQuiz(bank, questionIds, answers).sort(
    (first, second) =>
      second.normalizedIndex - first.normalizedIndex ||
      second.points - first.points ||
      first.id.localeCompare(second.id),
  );
  const eligible = scores.filter((score) => score.supports >= 2);
  const first = eligible[0];
  const second = eligible[1];
  const leaders =
    first && second && first.normalizedIndex - second.normalizedIndex <= 8
      ? [first, second]
      : first
        ? [first]
        : [];
  return { scores, leaders };
}
