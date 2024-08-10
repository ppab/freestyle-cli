import {strReplaceRegexMatchFromContext} from "./strReplaceRegexMatchFromContext";

export const parseSegments = (
    segments: string[],
    context: BuilderContext,
    joinChar = '',
): string => {
    return segments.map((value) => strReplaceRegexMatchFromContext(value, context)).join(joinChar);
};