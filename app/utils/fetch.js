export async function fetchWrapper(url) {
  const data = await fetch(`${process.env.BACK_END_URL}/${url}`)
  const result = await data.json();

  return result;
}