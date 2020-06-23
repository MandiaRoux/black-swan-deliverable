import React from "react"
import styled from "styled-components"
import { Colors } from "../../theme"
import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Paginator = styled.div`
  background-color: ${Colors.primaryLight};
  position: sticky;
  bottom: 0;

  display: flex;
  justify-content: center;
  padding: 0.5rem;

  button {
    background: transparent;
    box-shadow: none;
    outline: none;
    border: none;
    margin: 0 1rem;
    cursor: pointer;
    color: ${Colors.textLight};

    &:hover:not(:disabled) {
      color: ${Colors.textMed};
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  @media (max-width: 425px) {
    position: initial;
  }
`
const Pagination = ({ handlePagination, paginationLinks }) => {
  const nextLink = paginationLinks.next
  const prevLink = paginationLinks.prev
  const firstLink = paginationLinks.first
  const lastLink = paginationLinks.last

  return (
    <Paginator>
      <button disabled={!firstLink} onClick={() => handlePagination(firstLink)}>
        <FontAwesomeIcon size={"2x"} icon={faAngleDoubleLeft} />
      </button>
      <button disabled={!prevLink} onClick={() => handlePagination(prevLink)}>
        <FontAwesomeIcon size={"2x"} icon={faAngleLeft} />
      </button>
      <button disabled={!nextLink} onClick={() => handlePagination(nextLink)}>
        <FontAwesomeIcon size={"2x"} icon={faAngleRight} />
      </button>
      <button disabled={!lastLink} onClick={() => handlePagination(lastLink)}>
        <FontAwesomeIcon size={"2x"} icon={faAngleDoubleRight} />
      </button>
    </Paginator>
  )
}

export default Pagination
