import React from "react"
import styled from "styled-components"
import { Colors } from "../theme"
import { Pagination } from "./"

const Container = styled.div`
  grid-row: 3 / span 1;
  grid-column: 4 / 9;

  background-color: ${Colors.primaryLighter};
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 5px;

  position: relative;

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: none;
    background: ${Colors.primaryLight};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Colors.primaryDark};
    border-radius: 10px;
  }

  opacity: ${(props) => (props.isLoading ? 0.5 : 1)};

  @media (max-width: 425px) {
    overflow-y: visible;
  }
`

const Issue = styled.div`
  padding: 1rem;

  &:nth-child(even) {
    background-color: ${Colors.primaryDark};
    color: ${Colors.textLight};
  }
  &:last-child {
    margin-bottom: 1rem;
  }
  @media (max-width: 425px) {
    white-space: normal;
    text-overflow: ellipsis;
    overflow-x: hidden;
  }
`

const Issues = ({ issueList, isLoading, loadMoreClosedIssues, paginationLinks }) => {
  return (
    <Container isLoading={isLoading}>
      {issueList.items.map((issue, i) => {
        return <Issue key={i}>{issue.title}</Issue>
      })}
      {paginationLinks && (
        <Pagination handlePagination={loadMoreClosedIssues} paginationLinks={paginationLinks} />
      )}
    </Container>
  )
}

export default Issues
