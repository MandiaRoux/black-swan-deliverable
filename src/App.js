import './App.css';
import styled from "styled-components";
import {Card, ExpandedCard, TopMenuBar} from "./components"
import React, {Component} from 'react';
import {Colors, Spacing} from "./theme";
import Search from "./components/layout/Search";
import Modal from 'react-modal';
import Loader from "./components/Loader";
import HelperImage from "./assets/code_inspction.svg";
import ToggleSwitch from "./components/Toggle";
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
const Main = styled.div`
	min-height: 100vh;
	font-size:1.6rem;
	color: ${Colors.textLight};

	background-color: ${Colors.background};
`
const Helper = styled.div`
	padding: 3rem 1rem;
	text-align: center;
	color: ${Colors.primaryDark};
	margin: 2rem;
	
	img {
		position: absolute;
		top:50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-height: 50vh;
	}
`

Modal.setAppElement('#root')

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			searchResults: [],
			isLoading: false,
			error: null,
			modalOpen: false,
			modalLoading: false,
			expandedRepo: {},
			openIssuesList: {},
			closedIssuesList:{},
			totalIssuesCount:0
		};
	}
	
	search = (query) => {
		this.setState({isLoading: true})
		
		fetch('https://api.github.com/search/repositories?q=' + query)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Something went wrong ...');
				}
			})
			.then(data => this.setState({searchResults: data.items, isLoading: false}))
			.catch(error => this.setState({error, isLoading: false}));
		;
	}
	
	toggleModal = () => {
		this.setState({modalOpen: !this.state.modalOpen})
	}
	
	expandRepo = (query) => {
		this.setState({modalOpen: true, modalLoading: true, closedTicketsLoading:true})
		//The expanded view of a repo requires two different API calls - one for the additional info of the repo itself and one for the issue list of that repo.
		// For performance reasons this is processed through a singular state change
		Promise.all([
			fetch('https://api.github.com/repos/' + query),
			fetch('https://api.github.com/search/issues?q=repo:' + query + '+type:issue+state:open'),
		])
			// map responses into an array of response.json() to read their content
			.then(responses =>
				Promise.all(
					responses.map(response =>
						response.json()
					)
				)
			)
			.then(data => this.setState(
					{
					expandedRepo: data[0],
					openIssuesList:data[1],
					modalLoading: false
				}
			));
		
		fetch('https://api.github.com/search/issues?q=repo:' + query + '+type:issue+state:closed')
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Something went wrong ...');
				}
			})
				.then(data => this.setState({closedIssuesList:data}))
				.catch(error => this.setState({error, closedTicketsLoading: false}));
	}
	
	render() {
		const {searchResults, isLoading, error, expandedRepo, modalLoading, openIssuesList, closedIssuesList} = this.state
		if (error) {
			return <p>{error.message}</p>;
		}
		return (
			<Main>
				<TopMenuBar>
					<Title>Git Gud</Title>
					<Search debouncedSearch={this.search} isLoading={isLoading}/>
				</TopMenuBar>
				{isLoading && <Loader />}
				{(searchResults.length === 0 && !isLoading) && <Helper>
					<p>Use the searchbar above to look for repositories on Github.</p>
					<img src={HelperImage}/>
				</Helper>}
				<Results>
					{searchResults.map((repo, i) => {
						return (
							<Card key={i}
								  title={repo.name}
								  description={repo.description}
								  url={repo.url}
								  forks={repo.forks_count}
								  stargazers={repo.stargazers_count}
								  issues={repo.open_issues_count}
								  expand={() => this.expandRepo(repo.full_name)}/>
						)
					})}
				</Results>
				<Modal
					isOpen={this.state.modalOpen}
					onRequestClose={this.toggleModal}
					shouldCloseOnOverlayClick={true}
					style={{
						content: {
							backgroundColor: Colors.primary
						}
					}}
				>
					{modalLoading ? <Loader secondary/> :
						<ExpandedCard
							title={expandedRepo.name}
							description={expandedRepo.description}
							url={expandedRepo.url}
							forkCount={expandedRepo.forks_count}
							stargazerCount={expandedRepo.stargazers_count}
							issueCount={expandedRepo.open_issues_count}
							openIssuesList={openIssuesList}
							closedIssuesList={closedIssuesList}
							openIssuesCount={expandedRepo.open_issues_count}
						/>
					}
				
				</Modal>
			</Main>
		);
	}
}

export default App;
