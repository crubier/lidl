interface ParseOptions {
  startRule?: string;
  [key: string]: unknown;
}

interface OperatorParser {
  parse(input: string, options?: ParseOptions): string;
  SyntaxError: new (
    message: string,
    expected: unknown,
    found: string | null,
    location: unknown,
  ) => SyntaxError;
}

declare const operator: OperatorParser;
export default operator;
