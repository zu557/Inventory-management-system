// lib/fetcher.ts
export const fetcher = (url: string) =>
    fetch(url, { credentials: 'include' }).then((res) => res.json());