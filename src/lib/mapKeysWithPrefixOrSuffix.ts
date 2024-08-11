export const mapKeysWithPrefixOrSuffix = (
  obj: Record<string, any>,
  { prefix = '', suffix = '' }: { prefix?: string; suffix?: string },
): Record<string, any> => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      acc[`${prefix}${key}${suffix}`] = value;
      return acc;
    },
    {} as Record<string, any>,
  );
};
