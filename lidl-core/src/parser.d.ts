interface Location {
  source: string;
  start: { offset: number; line: number; column: number };
  end: { offset: number; line: number; column: number };
}

interface PeggySyntaxError extends SyntaxError {
  expected: unknown;
  found: string | null;
  location: Location;
  format(sources: { source: string; text: string }[]): string;
}

interface ParseOptions {
  startRule?: string;
  resolver?: unknown;
  [key: string]: unknown;
}

interface Parser {
  parse(input: string, options?: ParseOptions): any;
  SyntaxError: new (
    message: string,
    expected: unknown,
    found: string | null,
    location: Location,
  ) => PeggySyntaxError;
}

declare const parser: Parser;
export default parser;
