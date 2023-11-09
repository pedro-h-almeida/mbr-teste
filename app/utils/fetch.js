export async function fetchWrapper(url) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`)
  const result = await data.json();

  return result;
}