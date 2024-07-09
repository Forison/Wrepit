import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { Formik } from 'formik'
import Banner from '../shared/Banner'
import { Box } from '@mui/material'
import FileUploadForm from '../forms/ImageUploadForm'
import { useMutation } from '@apollo/client'
import { UPLOAD_IMAGE } from '../api/mutations'
// import { UPLOAD_IMAGE } from '../api/mutations'


const initialValue = {
  image: '',
}

interface ImageProps {
  image: string
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '3px solid #5bbff1',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

export default function ImageUploadModal(): JSX.Element {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState(null)

  const [uploadImage, { loading }] = useMutation(UPLOAD_IMAGE, {
    onCompleted: (data) => {
      if (!!data) {
        setSeverity('success')
        setMessage('Image upload successful')
        setTimeout(() => {
          handleClose()
        }, 2000);
      }
    },
    onError: () => {
      setSeverity('error')
      setMessage('Sorry, Image upload unsuccessful, please try again')
    }
  })

  const handleSubmit = () => {
    const file = (document.getElementById('image') as HTMLInputElement).files[0]
    uploadImage({
      variables: {
        image: file
      }
    })
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ margin: '40px 0 0 25px' }}
      >
        Upload Avatar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {message && <Banner severity={severity} message={message} />}
          <br />
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValue}
          >
            <FileUploadForm />
          </Formik>
        </Box>
      </Modal>
    </>
  )
}

