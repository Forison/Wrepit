import { Avatar } from '@mui/material'
import React from 'react'
import { SxProps } from '@mui/material'

interface Props {
  name: string
  imageUrl: string | null
  sx?: SxProps
}

const ImageOrInitial = ({ name, imageUrl, ...sx }: Props): JSX.Element => {
  //@ts-ignore
  if (imageUrl) return <Avatar alt="user_avatar" src={imageUrl} {...sx} />
  return (
    // @ts-ignore
    <Avatar
      {...sx}
      alt="user_initials"
    >
      {name[0].toUpperCase()}
    </Avatar>
  )
}

export default ImageOrInitial