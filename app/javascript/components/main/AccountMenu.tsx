import React, { useState, MouseEvent } from 'react'
import { Logout } from '@mui/icons-material'
import { useMutation, useQuery } from '@apollo/client'
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material'
import Loading from '../shared/Loading'
import ImageOrInitial from '../shared/ImageOrInitial'
import { LOGOUT_USER } from '../api/mutations'
import { CURRENT_USER } from '../api/queries'


export default function AccountMenu(): JSX.Element {
  const [logout] = useMutation(LOGOUT_USER, {
    onCompleted: () => {
      window.location.replace('/log_in')
    }
  })
  const { data, loading } = useQuery(CURRENT_USER)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const redirectToProfile = (): void => window.location.replace('/profile')

  if (loading) return <Loading />
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', position: 'relative', top: '-10px' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="medium"
            sx={{ paddingTop: 0 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <ImageOrInitial
              name={data.currentUser.firstName}
              imageUrl={data.currentUser.imageUrl}
              sx={{ bgcolor: '#5bbff1' }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={redirectToProfile}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
