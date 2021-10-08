const apiPost = async ({ url, body }) => {
  const res = await fetch(`/api/${url}`, {
    method: 'POST',
    body,
    credentials: 'include',
  });
  return res.json();
};

export {
  apiPost,
};
