import { moveDoc } from '../firebase';

/**
 * api endpoint controller for deleting courses
 * @param {object} req NextJS request object
 * @param {object} res NextJS response object
 * @returns json object of "deleted" boolean prop
 */
const deleteCourses = async (req, res) => {
  try {
    const { body: { ids } } = req;
    let deleted = false;
    // move document from curses collection to deleted collections
    const movedState = await Promise.all(
      ids?.map((id) => (moveDoc({
        collectionFrom: 'courses',
        collectionTo: 'deletedCourses',
        docId: id,
        recursive: true,
      })
      )),
    );
    // all courses deleted successfully?
    deleted = movedState.indexOf(false) === -1;
    return res.status(200).json(
      {
        deleted,
      },
    );
  } catch {
    return res.status(200).json({
      deleted: false,
    });
  }
};

export {
  deleteCourses,
};
