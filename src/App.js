import './App.css';
import styled from "styled-components";
import {Card, TopMenuBar} from "./components"
import React, {Component} from 'react';
import {Colors, Spacing} from "./theme";
import Search from "./components/layout/Search";

const Results = styled.div`
	background-color: ${Colors.background};

	margin-top: calc(${Spacing.menuHeight} + 1rem);
	padding: 1rem;
	
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 2rem;

`
const Title = styled.h1`
	margin: auto 2rem;
	display: inline-block;
	color: ${Colors.textLight};
`
const Main = styled.div`
	min-height: 100vh;
	background-color: ${Colors.background};
`

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			searchResults: [],
			isLoading: false,
			error: null
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
	
	render() {
		const {searchResults, isLoading, error} = this.state
		
		if (error) {
			return <p>{error.message}</p>;
		}
		if (isLoading) {
			return <p>Loading ...</p>;
		}
		return (
			<Main>
				<TopMenuBar>
					<Title>Git Gud</Title>
					<Search debouncedSearch={this.search}/>
				</TopMenuBar>
				<Results>
					{searchResults.map(function (repo, i) {
						return (
							<Card key={i}
								  title={repo.name}
								  description={repo.description}
							url={repo.url}/>
						)
					})}
				</Results>
			
			</Main>
		);
	}
}

export default App;
