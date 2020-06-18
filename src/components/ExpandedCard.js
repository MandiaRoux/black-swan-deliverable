import React from 'react';
import styled from "styled-components";
import {Colors} from "../theme";
import {PieChart} from "./"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight, faChartPie, faCodeBranch, faExclamationCircle, faStar} from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
	background-color: ${Colors.primary};
	border-radius: 5px;
	font-size: 1.6rem;
	
	width: 100%;
	height: 100%;
	padding: 2rem;
	position:relative;
	
	display: grid;
	grid-template-rows: 5rem 5rem 1fr 5rem;
	grid-template-columns: repeat(8, 1fr);
	grid-column-gap: 2rem;
`
const Link = styled.div`
	grid-row: 1;
	grid-column: 1 / -1;
	max-width: 90%;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
    text-align: center;
    
    span {
    	margin-left:1rem;
    }
`
const Title = styled.h3`
	grid-row: 2;
	grid-column: 1 / 4;
	color: ${Colors.textLight};
`
const Content = styled.div`
	grid-row: 3 / span 1;
	grid-column: 1 / 4;
	background-color:whitesmoke ;
	
	
	height: 6em;
	padding: 1rem 0;
	margin-bottom: 1rem;
	position: relative;
	overflow-y:hidden;
	line-height: 1.2em;
`
const Issues = styled.div`
	grid-row: 3 / span 1;
	grid-column: 4 / 9;
	
	background-color: ${Colors.secondary};
	overflow-y: scroll;
	padding: 1rem;
	border-radius: 5px;
`


const IconLabel = styled.i`
	margin: 3px;
    padding: .5rem;
    
    svg {
    margin-right: .5rem;
    }
`

const IconRow = styled.div`
	display: flex;
	position: absolute;
	bottom:0;
	left: 0;
	right: 0;
	
    justify-content: center;
    align-content: space-evenly;
    width: 100%;
`
const ActionBar = styled.div`
	grid-row: 2;
	grid-column: 4 / 9;
	display: flex;
	justify-content: space-evenly;
	
	h3 {
		display: inline-block;
	}
	
	button {
		background: transparent;
		box-shadow: none;
		outline: none;
		border: none;
		svg {
			cursor: pointer;
		}
		&:hover {
			color:orange;
		}
	}
`

const IssueList = styled.div`
	padding-bottom: 2rem;
`
const Issue = styled.div`

	&:nth-child(odd){
		background-color: whitesmoke;
	}
	&:not(:last-child){
		margin-bottom: 1rem;
	}

`


const ExpandedCard = ({title, description, url, forkCount, stargazerCount, openIssuesList, closedIssuesList}) => {
	const [showPieChart, updateShowPieChart] = React.useState(false);
	const [closedIssueFilter, updateClosedIssueFilter] = React.useState(false);
	const openIssueCount = openIssuesList.total_count
	const closedIssueCount = closedIssuesList.total_count

	return (
		<Container>
			<Link>
				{url}
				<span>
					<FontAwesomeIcon icon={faArrowRight}/>
				</span>
			</Link>
			<Title>{title}</Title>
			<Content>{description}</Content>
			<ActionBar>
				<button onClick={() => updateShowPieChart(!showPieChart)}>
					<FontAwesomeIcon size={"2x"} icon={faChartPie}/>
				</button>
				<h3>{closedIssueFilter ? "Closed" : "Open"} Issues</h3>
				<button onClick={() => updateClosedIssueFilter(!closedIssueFilter)}>
					Filter Toggle
				</button>
			</ActionBar>
			
			{showPieChart ? <PieChart openIssueCount={openIssueCount} closedIssueCount={closedIssueCount}/> : <Issues>
				{closedIssueFilter ?
					<IssueList>{closedIssuesList.items.map((issue, i) => {
						return (
							<Issue key={i}
							>
								{issue.title}
							</Issue>
						)
					})}
					</IssueList>
					:
					<IssueList>{openIssuesList.items.map((issue, i) => {
						return (
							<Issue key={i}
							>
								{issue.title}
							</Issue>
						)
					})}
					</IssueList>
				}
			
			
			</Issues>}
			
			<IconRow>
				<IconLabel>
					<FontAwesomeIcon icon={faCodeBranch}/>
					{forkCount}
				</IconLabel>
				<IconLabel>
					<FontAwesomeIcon icon={faStar}/>
					{stargazerCount}
				</IconLabel>
				<IconLabel>
					<FontAwesomeIcon icon={faExclamationCircle}/>
					{openIssueCount}
				</IconLabel>
			</IconRow>
		</Container>
	)
}


export default ExpandedCard