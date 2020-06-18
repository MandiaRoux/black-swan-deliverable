import './App.css';
import styled from "styled-components";
import {Card, ExpandedCard, TopMenuBar} from "./components"
import React, {Component} from 'react';
import {Colors, Spacing} from "./theme";
import Search from "./components/layout/Search";
import Modal from 'react-modal';

const Results = styled.div`
	background-color: ${Colors.background};

	margin-top: calc(${Spacing.menuHeight} + 1rem);
	padding: 1rem;
	
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
	grid-gap: 2rem;

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
			issueList: {}
		};
	}
	
	search = (query) => {
		console.log(query)
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
		this.setState({modalOpen: true, modalLoading: true})
		
		//The expanded view of a repo requires two different API calls - one for the additional info of the repo itself and one for the issue list of that repo.
		// For performance reasons this is processed through a singular state change
		Promise.all([
			fetch('https://api.github.com/repos/' + query),
			fetch('https://api.github.com/search/issues?q=' + query)
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
					issuesList:data[1].items,
					modalLoading: false
				}
			))
	}
	
	render() {
		const {searchResults, isLoading, error, expandedRepo, modalLoading, issuesList} = this.state
		if (error) {
			return <p>{error.message}</p>;
		}
		return (
			<Main>
				<TopMenuBar>
					<Title>Git Gud</Title>
					<Search debouncedSearch={this.search}/>
				</TopMenuBar>
				<Results>
					<Card
						title={"repo.name"}
						description={"repo.description"}
						url={"repo.url"}
						forks={"69036"}
						stargazers={"14644"}
						issues={"338"}
						expand={() => this.expandRepo("openatx/uiautomator2")}/>
					<Card
						title={"repo.name"}
						description={"repo.description"}
						url={"repo.url"}
						forks={"69036"}
						stargazers={"14644"}
						issues={"338"}
						expand={() => this.expandRepo("openatx/uiautomator2")}/>
					<Card
						title={"repo.name"}
						description={"repo.description"}
						url={"repo.url"}
						forks={"69036"}
						stargazers={"14644"}
						issues={"338d3"}
						expand={() => this.expandRepo("openatx/uiautomator2")}/>
					<Card
						title={"repo.name"}
						description={"repo.description"}
						url={"repo.url"}
						forks={"69036"}
						stargazers={"14644"}
						issues={"33s82"}
						expand={() => this.expandRepo("openatx/uiautomator2")}/>
					
					{isLoading && <p>Loading ...</p>}
					{searchResults.map((repo, i) => {
						return (
							<Card key={i}
								  title={repo.name}
								  description={repo.description}
								  url={repo.url}
								  forks={repo.forks_count}
								  stargazers={repo.stargazers_count}
								  issue={repo.open_issues_count}
								  expand={() => this.expandRepo(repo.full_name)}/>
						)
					})}
				</Results>
				<Modal
					isOpen={this.state.modalOpen}
					onRequestClose={this.toggleModal}
					shouldCloseOnOverlayClick={true}
					contentLabel="Example Modal"
				>
					{modalLoading ? <p>loading</p> :
						<ExpandedCard
							title={expandedRepo.name}
							description={expandedRepo.description}
							url={expandedRepo.url}
							forkCount={expandedRepo.forks_count}
							stargazerCount={expandedRepo.stargazers_count}
							issueCount={expandedRepo.open_issues_count}
							issueList={issuesList}
						/>
					}
				
				</Modal>
			</Main>
		);
	}
}

export default App;
