import { FC } from 'react'
import { PropTypes } from './card.types'
import { StyledCard } from './card.styles'

export const Card:FC<PropTypes> = ({ children }) => {
  return (
    <StyledCard>
        {children}
    </StyledCard>
    )
}