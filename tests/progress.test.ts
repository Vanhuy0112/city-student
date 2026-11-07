import { test } from "node:test";
import assert from "node:assert/strict";
import { activityIds, getGame, getLesson, grades, subjects } from "../src/data/catalog.ts";
import { challengeProgress, completeActivity, createProgress, parseProgress, starCount } from "../src/lib/progress.ts";

test("all six subjects and six grades have a valid, age-appropriate question", () => {
  assert.equal(subjects.length, 6);
  assert.equal(grades.length, 6);
  for (const grade of grades) {
    for (const subject of subjects) {
      const lesson = getLesson(subject.id, grade.id);
      assert.equal(lesson.grade, grade.id);
      assert.ok(lesson.question.options[lesson.question.answer]);
      assert.ok(lesson.question.explanation.trim());
    }
  }
  assert.equal(getGame("preschool").question.count, 3);
  assert.notEqual(getGame("5").question.prompt, getGame("preschool").question.prompt);
  assert.equal(new Set(activityIds()).size, 48);
});

test("replaying or double-clicking an activity never awards duplicate stars", () => {
  const once = completeActivity(createProgress(), "preschool:math:0");
  assert.equal(starCount(once), 5);
  assert.equal(completeActivity(once, "preschool:math:0"), once);
  assert.equal(completeActivity(once, "made-up-activity"), once);
});

test("challenge bonus is awarded only after two distinct math lessons, Vietnamese and a game", () => {
  let progress = createProgress();
  for (const id of ["preschool:math:0", "preschool:math:1", "preschool:vietnamese:0"]) progress = completeActivity(progress, id);
  assert.equal(starCount(progress), 15);
  assert.equal(challengeProgress(progress).complete, false);
  progress = completeActivity(progress, "preschool:game:0");
  assert.deepEqual(challengeProgress(progress), { math: 2, vietnamese: 1, game: 1, total: 4, complete: true });
  assert.equal(starCount(progress), 50);
  assert.equal(starCount(completeActivity(progress, "preschool:game:0")), 50);
});

test("each grade has an independent challenge with consistent global star totals", () => {
  const progress = completeActivity(createProgress(), "1:math:0");
  assert.equal(challengeProgress(progress).math, 0);
  assert.equal(challengeProgress(progress, "1").math, 1);
  assert.equal(starCount(progress), 5);
});

test("storage validation rejects corrupt, foreign, duplicate and unrecognized data", () => {
  for (const raw of [null, "invalid", "null", "42", '{"version":2}']) assert.deepEqual(parseProgress(raw), createProgress());
  const restored = parseProgress(JSON.stringify({ version: 1, grade: "unknown", subject: "fake", completed: ["1:math:0", "1:math:0", "fake", 123], sound: "true" }));
  assert.deepEqual(restored, { ...createProgress(), completed: ["1:math:0"] });
  const valid = { ...createProgress(), grade: "5", subject: "art", sound: true };
  assert.deepEqual(parseProgress(JSON.stringify(valid)), valid);
});
