import { activityIds, grades, subjects, type GradeId, type SubjectId } from "../data/catalog.ts";

export const STORAGE_KEY = "kids-learning-city:v1";
export interface Progress {
  version: 1;
  grade: GradeId;
  subject: SubjectId;
  completed: string[];
  sound: boolean;
}

export function createProgress(): Progress {
  return { version: 1, grade: "preschool", subject: "math", completed: [], sound: false };
}

export function parseProgress(raw: string | null): Progress {
  const fallback = createProgress();
  if (!raw) return fallback;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || !("version" in value) || value.version !== 1) return fallback;
    const state = value as Record<string, unknown>;
    const validIds = new Set(activityIds());
    return {
      ...fallback,
      grade: grades.some((grade) => grade.id === state.grade) ? state.grade as GradeId : fallback.grade,
      subject: subjects.some((subject) => subject.id === state.subject) ? state.subject as SubjectId : fallback.subject,
      completed: Array.isArray(state.completed) ? [...new Set(state.completed.filter((id): id is string => typeof id === "string" && validIds.has(id)))] : [],
      sound: state.sound === true,
    };
  } catch {
    return fallback;
  }
}

export function completeActivity(progress: Progress, activityId: string): Progress {
  if (!activityIds().includes(activityId) || progress.completed.includes(activityId)) return progress;
  return { ...progress, completed: [...progress.completed, activityId] };
}

export function challengeProgress(progress: Progress, grade = progress.grade) {
  const math = progress.completed.filter((id) => id.startsWith(`${grade}:math:`)).length;
  const vietnamese = Number(progress.completed.includes(`${grade}:vietnamese:0`));
  const game = Number(progress.completed.includes(`${grade}:game:0`));
  return { math, vietnamese, game, total: math + vietnamese + game, complete: math === 2 && vietnamese === 1 && game === 1 };
}

export function starCount(progress: Progress): number {
  const bonuses = grades.filter((grade) => challengeProgress(progress, grade.id).complete).length * 30;
  return progress.completed.length * 5 + bonuses;
}
