import { Button } from '@mui/material'
import React from 'react'

export default function CustomButton({ isDirty, isValid, children, type }) {
  return (
    <Button type={type} fullWidth variant='contained' disabled={!!(!isDirty || !isValid)} >
      {children}
    </Button>
  )
}
