import React from 'react'

export default function DisplayFormValues({isDirty, isValid, values}) {
  return (
    <Box color='grey.600' mt='10px'>
        {isDirty && !isValid && (
          <>
            <Typography>Username: {values.username}</Typography>
            <Typography>Password: {values.password}</Typography>
          </>
        )}
      </Box>
  )
}
