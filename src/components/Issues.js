import React from "react";
import styled from "styled-components";
import {Colors} from "../theme";

const Container = styled.div`
	grid-row: 3 / span 1;
	grid-column: 4 / 9;
	
	background-color: ${Colors.primaryLighter};
	overflow-y: scroll;
	padding: 1rem 0;
	border-radius: 5px;
	
	::-webkit-scrollbar {
	  width: 7px;
	}
	
	::-webkit-scrollbar-track {
	  box-shadow: none;
	  border-radius: 10px;
	}
	
	::-webkit-scrollbar-thumb {
	  background: ${Colors.primaryDarker};
	  border-radius: 10px;
	}
	
	@media (max-width: 425px){
		overflow-y: visible;
	}
`

const Issue = styled.div`
	padding:1rem;
	
	&:nth-child(even){
		background-color: ${Colors.primaryDark};
	}
	&:last-child{
		margin-bottom: 1rem;
	}
	@media (max-width: 425px){
		white-space: normal;
		text-overflow: ellipsis;
		overflow-x: hidden;
	}
`


const Issues = ({issueList}) => {
	return (
		<Container>
				{issueList.items.map((issue, i) => {
					return (
						<Issue key={i}
						>
							{issue.title}
						</Issue>
					)
				})}
		</Container>
	)
}

export default Issues