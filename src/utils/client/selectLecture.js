/**
 * Select a lecture from a list of lectures
 * @param {object} param0 lectures: array of lectures objects, id: id of required lecture
 * @returns lecture object or undefined in no lecture with the supplied id
 */
const selectLecture = ({ lectures, id }) => lectures?.find((lect) => lect?.id === id);

export {
  selectLecture,
};
