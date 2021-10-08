const apiPostJson = async ({ url, body = null }) => {
  const res = await fetch(`/api/${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  });
  if (res.status === 403) {
    return 403;
  }
  return res.json();
};

export {
  apiPostJson,
};
