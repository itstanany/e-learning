const apiGet = ({ url }) => (
  fetch(`/api/${url}`).then((res) => (res.json()))
);
export {
  apiGet,
};
