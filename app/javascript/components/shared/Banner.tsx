import React, { useState } from 'react'
import { Alert, IconButton, SxProps, Collapse } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
  severity: 'success' | 'error' | null
  message: string
  sx?: SxProps
  withCloseIcon?: boolean
}

export default function Banner({ severity, message, withCloseIcon, ...sx }: Props): JSX.Element {
  const [open, setOpen] = useState(true)

  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        {...sx}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(!open)
            }}
          >
            {withCloseIcon && <CloseIcon fontSize="inherit" />}
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  )
}

