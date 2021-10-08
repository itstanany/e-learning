/**
 * Lectures form
 * Presentational component
 */
// todo, add gradient border color

import {
  Button,
  FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Typography,
} from '@material-ui/core';
import { InputNumber, InputText } from '../../Input';

const MenuItems = ({ items }) => (items.map((item) => (
  <MenuItem
    value={item.value}
    key={item.value}
  >
    {
      item.render
    }
  </MenuItem>
)));

const lectureResourceTypes = [
  { render: 'Video', value: 'video' },
  { render: 'Text', value: 'text' },
  { render: 'PDF', value: 'pdf' },
  { render: 'Photo', value: 'photo' },
  { render: 'Audio', value: 'audio' },
];

const SourceMenuItems = MenuItems({ items: lectureResourceTypes });

const useStyles = makeStyles(() => ({
  lecture: {
    borderStyle: 'solid',
    borderRadius: '10px',
    borderColor: '#e0e0e0',
    margin: '5px 0px',
    padding: '5px',
    // prevent overflow over its parent container
    width: '100%',
  },
  formControl: {
    width: '100%',
  },
  lecturesWrapper: {
    border: '2px dashed #0e0e0e',
    borderColor: 'linear-gradient(to right, red, purple)',
    padding: '10px 5px',
    borderRadius: '8px',
  },
  newLectBtn: {
    margin: '10px auto',
  },
}));

function LecturesForm({
  lectures,
  handlerInpChange,
  handlerAddNewRes,
  handlerAddNewLect,
  isLoading,
}) {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.lecturesWrapper}
    >
      <Grid
        item
        xs={12}
      >
        <Typography
          component="h6"
          variant="h6"
        >
          Lectures
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
      >
        {
          lectures?.map((lecture, index) => (
            <Grid
              key={lecture.order}
              container
              spacing={2}
              className={classes.lecture}
            >
              {/* Lecture Entry Sub-form */}

              {/* Lecture Title */}
              <Grid item xs={12} sm={6}>
                <InputText
                  tag={TextField}
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  key="lectureTitle"
                  label="Lecture Title"
                  name="title"
                  autoComplete="title"
                  value={lecture.title}
                  onChange={handlerInpChange}
                  onChangeProps={
                    {
                      index,
                    }
                  }
                />
              </Grid>

              {/* Lecture Order */}
              <Grid item xs={12} sm={6}>
                <InputNumber
                  tag={TextField}
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  disabled
                  id="lectureOrder"
                  key="lectureOrder"
                  label="Lecture Order"
                  name="lectureOrder"
                  autoComplete="lectureOrder"
                  value={lecture.order}
                />
              </Grid>
              {/* Lecture description */}
              <Grid item xs={12} sm={6}>
                <InputText
                  tag={TextField}
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={3}
                  id="description"
                  key="description"
                  label="Lecture Description"
                  name="description"
                  autoComplete="description"
                  value={lecture.description}
                  onChange={handlerInpChange}
                  onChangeProps={
                    {
                      index,
                    }
                  }
                />
              </Grid>

              {/* Lecture resources */}
              <Grid item xs={12} sm={6}>
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-between"
                >
                  {
                    lecture.resources?.map((res, resIdx) => (
                      <>
                        <Grid
                          item
                          xs={6}
                        >
                          <InputText
                            tag={TextField}
                            variant="outlined"
                            required
                            fullWidth
                            id="source"
                            key="source"
                            label="Lecture Resource"
                            name="src"
                            autoComplete="lectureSource"
                            value={res?.src}
                            onChange={handlerInpChange}
                            onChangeProps={
                              {
                                index,
                                resIndex: resIdx,
                              }
                            }
                          />
                        </Grid>
                        <Grid
                          item
                          xs={6}
                        >
                          <FormControl
                            className={classes.formControl}
                          >
                            <InputLabel id="resourceTypeLabel">Resource Type</InputLabel>
                            <Select
                              labelId="resourceTypeLabel"
                              id="resourceTypeInput"
                              value={res?.type}
                              name="type"
                              onChange={(e) => (
                                handlerInpChange(e, { index, resIndex: resIdx })
                              )}
                            >
                              {
                                SourceMenuItems
                              }
                            </Select>
                          </FormControl>
                        </Grid>
                      </>
                    ))
                  }
                  <Grid
                    item
                    xs={12}
                  >
                    <Button
                      onClick={(e) => handlerAddNewRes(e, { index })}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Add New Resource
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))
        }
      </Grid>
      {/* Add new Lecture subform entry */}
      <Grid
        item
        xs={12}
        md={4}
        className={classes.newLectBtn}
      >
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handlerAddNewLect}
          disabled={isLoading}
        >
          Add New Lecture
        </Button>
      </Grid>
    </Grid>
  );
}

export default LecturesForm;
export {
  LecturesForm,
};
