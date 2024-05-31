import { FC } from 'react'
import { StyledCircularProgressContainer } from './loading.styles'
import { CircularProgress } from '@mui/material'
import { PropTypes } from './loading.types'

export const Loading:FC<PropTypes> = ({ size = 40 }) => {
  
  return (
    <StyledCircularProgressContainer>
      <CircularProgress size={size} />
    </StyledCircularProgressContainer>
  )
}
