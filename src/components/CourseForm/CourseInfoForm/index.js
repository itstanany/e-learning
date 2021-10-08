/**
 * Form to render course information
 * presentational component
 */
import {
  Button, Grid, MenuItem, TextField, Typography,
} from '@material-ui/core';
import Image from 'next/image';
import { InputNumber, InputText } from '../../Input';

const ThumbnailGallery = ({ src, deleteHandler }) => (
  <Grid
    container
    justifyContent="flex-start"
    alignItems="center"
    alignContent="center"
  >
    <Grid
      item
      xs={12}
      sm={3}
    >
      <Typography
        component="h6"
        variant="h6"
      >
        Thumbnail
      </Typography>
    </Grid>
    <Grid
      item
    >
      <Image
        src={src}
        width="250px"
        height="100px"
      />
    </Grid>
    <Grid
      item
      style={{ marginLeft: 'auto' }}

    >
      <Button
        onClick={deleteHandler}
        variant="outlined"
        color="secondary"
      >
        Delete
      </Button>
    </Grid>
  </Grid>
);

function CourseInfoForm({
  title,
  handlerInpChange,
  description,
  author,
  role,
  allAuthors,
  price,
  thumbnail,
  onDeleteThumbnail,
}) {
  return (
    <Grid container spacing={2}>
      <Grid
        xs={12}
      >
        <Typography
          component="h5"
          variant="h5"
        >
          Course Info
        </Typography>
      </Grid>

      {/* Course Title */}
      <Grid item xs={12} sm={6}>
        <InputText
          tag={TextField}
          autoComplete="courseTitle"
          name="title"
          variant="outlined"
          required
          fullWidth
          id="title"
          label="Course Title"
          autoFocus
          value={title}
          onChange={handlerInpChange}
          key="title"
        />
      </Grid>

      {/*
        // optimize load allAuthors on opening the dropdown and admin role
      */}
      {/* Course Author */}
      <Grid item xs={12} sm={3}>
        <TextField
          id="author"
          key="author"
          select
          fullWidth
          label="Course Author"
          value={author || ''}
          variant="outlined"
          name="author"
          onChange={handlerInpChange}
          disabled={role !== 'admin'}
        >
          {
            allAuthors?.length > 0
            && allAuthors?.map((option) => (
              <MenuItem
                key={option.uid}
                value={option.name}
              >
                {option.name}
              </MenuItem>
            ))
          }
        </TextField>
      </Grid>

      {/* Course Price */}
      <Grid item xs={12} sm={3}>
        <InputNumber
          tag={TextField}
          variant="outlined"
          type="number"
          required
          fullWidth
          id="price"
          label="Course Price"
          name="price"
          autoComplete="number"
          value={price}
          onChange={handlerInpChange}
          key="coursePrice"
        />
      </Grid>

      {/* Course Description */}
      <Grid
        item
        xs={12}
        sm={6}
      >
        <InputText
          tag={TextField}
          variant="outlined"
          multiline
          minRows={3}
          required
          fullWidth
          id="description"
          key="description"
          label="Course Description"
          name="description"
          autoComplete="description"
          value={description}
          onChange={handlerInpChange}
        />
      </Grid>
      {/* Course Thumbnail */}
      <Grid item xs={12} sm={6}>
        {
          thumbnail
            ? (
              <ThumbnailGallery
                deleteHandler={onDeleteThumbnail}
                src={thumbnail}
              />
            )
            : (
              <TextField
                variant="outlined"
                required
                fullWidth
                type="file"
                inputProps={{
                  accept: 'image/*',
                }}
                id="thumbnail"
                key="thumbnail"
                label="Course Thumbnail"
                name="thumbnail"
                autoComplete="thumbnail"
                onChange={handlerInpChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )
        }

      </Grid>

    </Grid>
  );
}

export default CourseInfoForm;

export {
  CourseInfoForm,
};
