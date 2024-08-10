
export const joinSegments = (
    segments: string[],
    joinChar = '',
): string => {
    return segments.map((value) => value).join(joinChar);
};