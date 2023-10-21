export type ListPagination = (current: number, total: number) => { prev?: string; next?: string }

export const blogPagination: ListPagination = (current, total) => {
  const prev =
    current === 1 ? undefined : `/blog/${current === 2 ? '' : current - 1}`;
  const next = current === total ? undefined : `/blog/${current + 1}`;
  return { prev, next };
}

export const weeklyPagination: ListPagination = (current, total) => {
  const prev =
    current === 1 ? undefined : `/weekly/${current === 2 ? '' : current - 1}`;
  const next = current === total ? undefined : `/weekly/${current + 1}`;
  return { prev, next };
}
