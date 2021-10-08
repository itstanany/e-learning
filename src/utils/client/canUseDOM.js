const canUseDOM = () => !!(typeof window !== 'undefined' && window.document && window.document.createElement);

export {
  canUseDOM,
};
