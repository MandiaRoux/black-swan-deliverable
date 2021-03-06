import "./App.css"
import styled from "styled-components"
import { Card, ExpandedCard, Helper, Search, Loader } from "./components"
import React, { Component } from "react"
import { Colors, Spacing } from "./theme"
import Modal from "react-modal"

const parse = require("parse-link-header")

const Results = styled.div`
  background-color: ${Colors.background};

  margin-top: calc(${Spacing.menuHeight} + 1rem);
  padding: 1rem;
  text-align: center;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  grid-gap: 3rem;

  p {
    color: ${Colors.primaryDark};
  }
`
const Title = styled.h1`
  margin: auto 2rem;
  display: inline-block;
  color: ${Colors.textLight};
`
const TopMenuBar = styled.div`
  display: flex;
  align-items: center;

  top: 0;
  background-color: ${Colors.primary};
  height: ${Spacing.menuHeight};
  width: 100%;
  z-index: 10;
`
const Main = styled.div`
  min-height: 100vh;
  font-size: 1.6rem;
  color: ${Colors.textLight};
  background-color: ${Colors.background};
`

Modal.setAppElement("#root")

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchResults: [],
      isLoading: false,
      error: null,
      modalOpen: false,
      modalLoading: false,
      expandedRepo: {},
      openIssuesList: {},
      closedIssuesList: {},
      paginationLinks: {
        openIssuesPaginationLinks: {},
        closedIssuesPaginationLinks: {},
      },
      issuesLoading: false,
      totalIssuesCount: 0,
    }
  }

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  searchRepositories = (query) => {
    this.setState({ isLoading: true, searchResults: [] })

    fetch("https://api.github.com/search/repositories?q=" + query)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Something went wrong ...")
        }
      })
      .then((data) => this.setState({ searchResults: data.items, isLoading: false }))
      .catch((error) => this.setState({ error, isLoading: false }))
  }

  expandRepo = (query) => {
    /*  The expanded view of a repo requires two different API calls,
    one for the additional info of the repo itself and one for the issue list of that repo.
    For performance reasons this is processed through a singular state change */

    this.setState({ modalOpen: true, modalLoading: true })

    let headerLinks = {}

    Promise.all([
      fetch("https://api.github.com/repos/" + query),
      fetch("https://api.github.com/search/issues?q=repo:" + query + "+type:issue+state:open"),
    ])
      // map responses into an array of json() promises to unwrap their content
      .then((responses) =>
        Promise.all(
          responses.map((response) => {
            headerLinks = parse(response.headers.get("link"))
            return response.json()
          })
        )
      )
      .then((data) =>
        this.setState({
          expandedRepo: data[0],
          openIssuesList: data[1],
          modalLoading: false,
          paginationLinks: {
            ...this.state.paginationLinks,
            openIssuesPaginationLinks: headerLinks,
          },
        })
      )

    /* The closed tickets of a repo are not required data for the initial modal opening
    Thus this call is not included in the above promise so that the user can open the modal and view open issues while this is running */
    fetch("https://api.github.com/search/issues?q=repo:" + query + "+type:issue+state:closed")
      .then((response) => {
        if (response.ok) {
          const parsedHeaders = parse(response.headers.get("link"))
          this.setState({
            paginationLinks: {
              ...this.state.paginationLinks,
              closedIssuesPaginationLinks: parsedHeaders,
            },
          })
          return response.json()
        } else {
          throw new Error("Something went wrong ...")
        }
      })
      .then((data) => this.setState({ closedIssuesList: data, issuesLoading: false }))
      .catch((error) => this.setState({ error, issuesLoading: false }))
  }

  handlePagination = (linkHeader) => {
    this.setState({ issuesLoading: true })

    const { q: query, url } = linkHeader
    const paginatingClosedIssues = query.includes("state:closed")
    let newHeaders = {}

    fetch(url)
      .then((response) => {
        if (response.ok) {
          newHeaders = parse(response.headers.get("link"))
          return response.json()
        } else {
          throw new Error("Something went wrong ...")
        }
      })
      .then((data) => {
        if (paginatingClosedIssues) {
          this.setState({
            closedIssuesList: data,
            issuesLoading: false,
            paginationLinks: {
              ...this.state.paginationLinks,
              closedIssuesPaginationLinks: newHeaders,
            },
          })
        } else {
          this.setState({
            openIssuesList: data,
            issuesLoading: false,
            paginationLinks: {
              ...this.state.paginationLinks,
              openIssuesPaginationLinks: newHeaders,
            },
          })
        }
      })
      .catch((error) => this.setState({ error, issuesLoading: false }))
  }

  render() {
    const {
      searchResults,
      isLoading,
      error,
      expandedRepo,
      modalLoading,
      openIssuesList,
      closedIssuesList,
      issuesLoading,
      paginationLinks,
    } = this.state

    return (
      <Main>
        <TopMenuBar>
          <Title>Git Gud</Title>
          <Search debouncedSearch={this.searchRepositories} isLoading={isLoading} />
        </TopMenuBar>

        {searchResults.length === 0 && !isLoading && !error && <Helper />}

        {isLoading && <Loader />}

        {error ? (
          <Helper error />
        ) : (
          <React.Fragment>
            <Results>
              {searchResults.map((repo, i) => {
                return (
                  <Card
                    key={i}
                    title={repo.name}
                    description={repo.description}
                    url={repo.url}
                    forkCount={repo.forks_count}
                    stargazerCount={repo.stargazers_count}
                    issueCount={repo.open_issues_count}
                    expand={() => this.expandRepo(repo.full_name)}
                  />
                )
              })}
            </Results>
            <Modal
              isOpen={this.state.modalOpen}
              onRequestClose={this.toggleModal}
              shouldCloseOnOverlayClick={true}
              className="Modal"
              overlayClassName="Overlay"
            >
              {modalLoading ? (
                <Loader secondary />
              ) : (
                <ExpandedCard
                  title={expandedRepo.name}
                  closeModal={this.toggleModal}
                  description={expandedRepo.description}
                  url={expandedRepo.html_url}
                  forkCount={expandedRepo.forks_count}
                  stargazerCount={expandedRepo.stargazers_count}
                  issueCount={expandedRepo.open_issues_count}
                  openIssuesList={openIssuesList}
                  closedIssuesList={closedIssuesList}
                  loadMoreClosedIssues={this.handlePagination}
                  paginationLinks={paginationLinks}
                  issuesLoading={issuesLoading}
                />
              )}
            </Modal>
          </React.Fragment>
        )}
      </Main>
    )
  }
}

export default App
