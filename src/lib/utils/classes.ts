export function classes(args: string[]): string {
  return args.filter(Boolean).join(' ')
}
