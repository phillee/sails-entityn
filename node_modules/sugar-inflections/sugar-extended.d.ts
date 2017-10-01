// Extended type definitions for Sugar v2.0.4
// Project: https://sugarjs.com/
// Definitions by: Andrew Plummer <plummer.andrew@gmail.com>

/// <reference path="sugar.d.ts" />

interface String {
  humanize(): string;
  pluralize(num?: number): string;
  singularize(): string;
}