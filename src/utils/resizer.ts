/**
 * Helper utility to calculate and clamp split-pane resize width percentages.
 */
export const calculateSplitPercentage = (
    clientX: number,
    containerLeft: number,
    containerWidth: number,
    minPercent: number = 25,
    maxPercent: number = 72
): number => {
    const rawPercent = ((clientX - containerLeft) / containerWidth) * 100;
    return Math.min(Math.max(rawPercent, minPercent), maxPercent);
};
