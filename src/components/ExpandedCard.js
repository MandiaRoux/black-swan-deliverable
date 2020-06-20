import React from 'react';
import styled from "styled-components";
import {Colors} from "../theme";
import {PieChart} from "./"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
	faArrowRight,
	faChartPie,
	faCodeBranch,
	faExclamationCircle,
	faFilter,
	faStar
} from '@fortawesome/free-solid-svg-icons'
import Issues from "./Issues";
import IconRow from "./IconRow";


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
const Link = styled.a`
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
	background-color:${Colors.primaryLighter} ;
	
	border-radius: 5px;
	height: 6em;
	padding: 1rem;
	margin-bottom: 1rem;
	position: relative;
	overflow-y:hidden;
	line-height: 1.2em;
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
		background: transparent;
		box-shadow: none;
		outline: none;
		border: none;
		color: ${Colors.textLight};
		svg {
			cursor: pointer;
		}
		&:hover {
			color:orange;
		}
	}
`

const Option = styled.button`
	padding: 1rem;
	border: 1px solid ${Colors.primaryDark};
	font-family: 'Source Code Pro', monospace;
	font-size: 1.6rem;
	background: transparent;
	box-shadow: none;
	outline: none;
	cursor: pointer;
	
	&:disabled {
		background-color: ${Colors.primaryDark};
	}
	
`

const ExpandedCard = ({title, description, url, forkCount, stargazerCount, openIssuesList, closedIssuesList}) => {
	const [showPieChart, updateShowPieChart] = React.useState(false);
	const [showClosedIssues, updateShowClosedIssues] = React.useState(false);
	const openIssueCount = openIssuesList.total_count
	const closedIssueCount = closedIssuesList.total_count
	
	
	return (
		<Container>
			<Link href={url} target={"_blank"}>
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
				<h3>{showClosedIssues ? "Closed" : "Open"} Issues</h3>
				
				<div>
					<FontAwesomeIcon size={"1x"} icon={faFilter}/>
					<Option onClick={() => updateShowClosedIssues(false)} disabled={!showClosedIssues}>Open</Option>
					<Option onClick={() => updateShowClosedIssues(true)} disabled={showClosedIssues}>Closed</Option>
				</div>
			</ActionBar>
			
			{showPieChart ?
				<PieChart openIssueCount={openIssueCount} closedIssueCount={closedIssueCount}/> :
				<Issues issueList={showClosedIssues ? closedIssuesList : openIssuesList}/>
			}
			
			<IconRow forkCount={forkCount} stargazerCount={stargazerCount} openIssueCount={openIssueCount}/>
		</Container>
	)
}


export default ExpandedCard