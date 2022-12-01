import fs from 'fs';
import path from 'path';

const pipe =
  (...fns: CallableFunction[]) =>
  (x: any) =>
    fns.reduce((v, f) => f(v), x);

export const flattenArray = (input: any[]): any[] =>
  input.reduce((acc, item) => [...acc, ...(Array.isArray(item) ? item : [item])], []);

const map =
  <T = any>(fn: (value: T, index: number, array: T[]) => {}) =>
  (input: T[]) =>
    input.map(fn);

const walkDir = (fullPath: string) => {
  return fs.statSync(fullPath).isFile() ? fullPath : getAllFilesRecursively(fullPath);
};

const pathJoinPrefix = (prefix: string) => (extraPath: string) => path.join(prefix, extraPath);

export const getAllFilesRecursively = (folder: string): string[] => {
  return pipe(fs.readdirSync, map(pipe(pathJoinPrefix(folder), walkDir)), flattenArray)(folder);
};
