import { getAllAuthors } from '..';

/**
 * api endpoint controller for getting all authors
 * @param {object} req NextJS request object
 * @param {object} res NextJS response object
 * @returns array of document objects of fields: "uid", "name", and "role"
 */
const allAuthorsController = async (req, res) => {
  const allAuthors = await getAllAuthors();
  return res.json({ allAuthors });
};

export {
  allAuthorsController,
};
