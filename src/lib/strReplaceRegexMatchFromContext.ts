export const strReplaceRegexMatchFromContext = (
  str: string,
  ctx: { [key: string]: string },
): string => {
  //The regex \{\{([^}]+)\}\} matches any text within double curly braces {{string}}.
  const regex = /\{\{([^}]+)\}\}/g;
  // for value:{{ENTITY_PLURAL}}-update-{{ENTITY}}.dto.ts
  // it will match :
  //match->>> {{ENTITY_PLURAL}} ENTITY_PLURAL
  //match->>> {{ENTITY}} ENTITY
  //"fileOutputPath": "src/testes/dto/testes-update-test.dto.ts",
  const matchFunction = (match, capturedGroup) => ctx[capturedGroup] || match;
  return str.replace(regex, matchFunction);
};

export const strReplaceRegexMatchFromContextRemoveString = (
  str: string,
  content: string,
  regex: RegExp,
): string => {
  const hasMatch = regex.test(str);
  console.log('regexExp->>', regex);
  console.log('hasMatch->>', hasMatch);
  console.log('content', content);
  const r = str.replace(regex, content);
  console.log('r->');
  console.log('r->', r);
  return r;
};
