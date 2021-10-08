const validateFormRequired = ({ formName }) => {
  const form = document.forms[formName];
  const { elements } = form;
  let valid = true;
  // eslint-disable-next-line no-restricted-syntax
  for (const ele of elements) {
    const isRequired = ele?.attributes?.getNamedItem('required');
    if (isRequired && (!ele.value)) {
      valid = false;
      break;
    }
  }
  return valid;
};

export {
  validateFormRequired,
};
