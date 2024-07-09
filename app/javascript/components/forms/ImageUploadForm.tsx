import React from 'react'
import { useFormikContext } from 'formik'
import {
  Button,
  Grid,
  Stack,
  TextField,
} from '@mui/material'

interface imageProp {
  image: string
}

export default function ImageUploadForm(): JSX.Element {
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    isSubmitting
  } = useFormikContext<imageProp>()

  return (
    <form noValidate onSubmit={handleSubmit} encType="multipart/form-data">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <TextField
              id='image'
              type='file'
              value={values.image}
              name='image'
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Button
            disableElevation
            disabled={isSubmitting}
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            sx={{
              background: '#5bbff1',
              color: '#FFF'
            }}
          >
            Upload Your Avatar
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
