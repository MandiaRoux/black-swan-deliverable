import React from "react"
import styled from "styled-components"
import { Colors } from "../theme"
import { PieChart } from "./"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faChartPie, faFilter, faTimes } from "@fortawesome/free-solid-svg-icons"
import Issues from "./Issues"
import IconRow from "./basic/IconRow"

const Container = styled.div`
  background-color: ${Colors.primary};
  border-radius: 5px;
  font-size: 1.6rem;

  width: 100%;
  height: 100%;
  padding: 2rem;
  position: relative;

  display: grid;
  grid-template-rows: 5rem 5rem 1fr 5rem;
  grid-template-columns: repeat(8, 1fr);
  grid-column-gap: 2rem;

  button {
    background: transparent;
    box-shadow: none;
    outline: none;
    border: none;
  }

  @media (max-width: 425px) {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: scroll;
  }
`
const Link = styled.a`
  grid-row: 1;
  grid-column: 1 / 8;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  color: ${Colors.primaryLighter};
  cursor: pointer;

  span {
    margin-left: 1rem;
  }

  &:hover {
    color: ${Colors.primaryDarker};
  }

  @media (max-width: 425px) {
    margin: 1rem 0;
    min-height: 2rem;
  }
`
const Title = styled.h2`
  grid-row: 2;
  grid-column: 1 / 4;
  color: ${Colors.textLight};

  @media (max-width: 425px) {
    padding: 1rem 0;
  }
`
const Content = styled.div`
  grid-row: 3 / span 1;
  grid-column: 1 / 4;

  p {
    min-height: 6em;
    overflow-y: hidden;
    border-radius: 5px;
    padding: 1rem;
    background-color: ${Colors.primaryLighter};
  }

  margin-bottom: 1rem;
  position: relative;
`
const ActionBar = styled.div`
  grid-row: 2;
  grid-column: 4 / 9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  color: ${Colors.textLight};

  h3 {
    display: inline-block;
    min-width: 150px;
  }

  > button {
    color: ${Colors.textLight};
    transform: translateY(0);
    transition: transform 0.3s;

    svg {
      cursor: pointer;
    }

    &:hover {
      transform: translateY(-5px);
    }
  }
  @media (max-width: 425px) {
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
  }
`
const Toggle = styled.div`
  svg {
    margin-right: 1rem;
  }
  button {
    padding: 1rem;
    border: 1px solid ${Colors.primaryDark};
    font-family: "Source Code Pro", monospace;
    font-size: 1.6rem;
    cursor: pointer;
    color: ${Colors.textLight};

    &:disabled {
      background-color: ${Colors.primaryDark};
    }
    &:nth-child(2) {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    &:nth-child(3) {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
`

const CloseModalButton = styled.button`
  grid-row: 1;
  grid-column: 8 / 9;
  justify-self: flex-end;
  align-self: start;
  color: ${Colors.textLight};

  transform: translateY(0);
  transition: transform 0.3s;

  svg {
    cursor: pointer;
  }

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 425px) {
    width: 100%;
    text-align: right;
  }
`

const ExpandedCard = ({
  title,
  description,
  closeModal,
  url,
  forkCount,
  stargazerCount,
  issueCount,
  openIssuesList,
  closedIssuesList,
  loadMoreClosedIssues,
  issuesLoading,
  paginationLinks,
}) => {
  const [showPieChart, updateShowPieChart] = React.useState(false)
  const [showClosedIssues, updateShowClosedIssues] = React.useState(false)

  const openIssueCount = openIssuesList.total_count
  const closedIssueCount = closedIssuesList.total_count

  return (
    <Container>
      <CloseModalButton onClick={closeModal}>
        <span>
          <FontAwesomeIcon size={"2x"} icon={faTimes} />
        </span>
      </CloseModalButton>
      <Link href={url} target={"_blank"}>
        {url}
        <span>
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </Link>
      <Title>{title}</Title>
      <Content>
        <p>{description}</p>
      </Content>

      <ActionBar>
        <button
          disabled={openIssueCount + closedIssueCount === 0}
          onClick={() => updateShowPieChart(!showPieChart)}
        >
          <FontAwesomeIcon size={"2x"} icon={faChartPie} />
        </button>
        <h3>{showClosedIssues ? "Closed" : "Open"} Issues</h3>

        <Toggle>
          <FontAwesomeIcon size={"1x"} icon={faFilter} />
          <button
            onClick={() => updateShowClosedIssues(false)}
            disabled={!showClosedIssues || showPieChart}
          >
            Open
          </button>
          <button
            onClick={() => updateShowClosedIssues(true)}
            disabled={showClosedIssues || showPieChart}
          >
            Closed
          </button>
        </Toggle>
      </ActionBar>
      {showPieChart ? (
        <PieChart openIssueCount={openIssueCount} closedIssueCount={closedIssueCount} />
      ) : (
        <Issues
          issueList={showClosedIssues ? closedIssuesList : openIssuesList}
          paginationLinks={
            showClosedIssues
              ? paginationLinks.closedIssuesPaginationLinks
              : paginationLinks.openIssuesPaginationLinks
          }
          isLoading={issuesLoading}
          loadMoreClosedIssues={loadMoreClosedIssues}
        />
      )}
      <IconRow forkCount={forkCount} stargazerCount={stargazerCount} issueCount={issueCount} />
    </Container>
  )
}

export default ExpandedCard
