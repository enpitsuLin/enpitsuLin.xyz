export function classes(args: (string | null | undefined)[]): string {
  return args.filter(Boolean).join(' ')
}
