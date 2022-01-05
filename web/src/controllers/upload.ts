export const uploadCsv = async (form: FormData) => {
  const url = `/uploadcsv`;
  const result = await fetch(url, { credentials: 'same-origin', body: form, method: 'POST' });
  if (result.ok) {
    const resultJson = await result.json();
    if (resultJson) return resultJson;
  }
  return result.statusText;
};
