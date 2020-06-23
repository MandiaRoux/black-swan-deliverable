import React from "react"
import styled from "styled-components"
import { Colors } from "../../theme"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCodeBranch, faExclamationCircle, faStar } from "@fortawesome/free-solid-svg-icons"

const Container = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  justify-content: center;
  align-content: space-evenly;
  width: 100%;

  @media (max-width: 425px) {
    position: initial;
  }
`
const IconLabel = styled.i`
  margin: 3px;
  padding: 0.5rem;
  color: ${Colors.textLight};

  svg {
    margin-right: 0.5rem;
  }
`

const IconRow = ({ forkCount, stargazerCount, issueCount }) => {
  return (
    <Container>
      <IconLabel>
        <FontAwesomeIcon icon={faCodeBranch} />
        {forkCount}
      </IconLabel>
      <IconLabel>
        <FontAwesomeIcon icon={faStar} />
        {stargazerCount}
      </IconLabel>
      <IconLabel>
        <FontAwesomeIcon icon={faExclamationCircle} />
        {issueCount}
      </IconLabel>
    </Container>
  )
}

export default IconRow
