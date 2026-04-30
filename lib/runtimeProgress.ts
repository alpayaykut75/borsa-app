const levelExamCompletionMap = new Map<number, boolean>();

export function markLevelExamPassed(unitId: number) {
  levelExamCompletionMap.set(unitId, true);
}

export function isLevelExamPassed(unitId: number): boolean {
  return levelExamCompletionMap.get(unitId) === true;
}
