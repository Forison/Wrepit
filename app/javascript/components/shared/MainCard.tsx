import React, { forwardRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { SxProps, Card, CardContent, CardHeader, Typography } from '@mui/material'

// header style
const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
}
// TODO: Should refactored to suitable types 
interface Props {
  border?: boolean
  boxShadow?: boolean
  children?: JSX.Element
  subheader?: any
  content?: boolean
  contentSX?: any
  darkTitle?: boolean
  divider?: boolean
  elevation?: number
  secondary?: any
  shadow?: any
  sx?: SxProps
  title?: string
  modal?: boolean
  others?: any
}


function MainCard(
  {
    border = true,
    boxShadow,
    children,
    content = true,
    contentSX = {},
    darkTitle,
    elevation = 0,
    secondary,
    shadow,
    sx = {},
    title,
    ...others
  }: Props,
  ref
): JSX.Element {
  const theme = useTheme()
  boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow

  return (
    <Card
      elevation={elevation}
      ref={ref}
      {...others}
      sx={{
        border: border ? '1px solid' : 'none',
        borderRadius: 2,
        // borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800,
        // boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme.customShadows.z1 : 'inherit',
        ':hover': {
          // boxShadow: boxShadow ? shadow || theme.customShadows.z1 : 'inherit'
        },
        '& pre': {
          m: 0,
          p: '16px !important',
          fontFamily: theme.typography.fontFamily,
          fontSize: '0.75rem'
        },
        ...sx
      }}
    >
      {/* card header and action */}
      {!darkTitle && title && <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} action={secondary} />}
      {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />}

      {/* card content */}
      {content && <CardContent sx={contentSX}>{children}</CardContent>}
      {!content && children}
    </Card>
  )
}

export default forwardRef(MainCard)
