import React from 'react';
import styled from "styled-components";
import {Colors} from "../theme";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCodeBranch, faExclamationCircle, faStar, faExpandArrowsAlt} from '@fortawesome/free-solid-svg-icons'
import IconRow from "./IconRow";

const Title = styled.h3`
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 95%;
`

const Container = styled.div`
	background-color: ${Colors.primary};
	border-radius: 5px;

	padding: 1rem;
	position: relative;
	
	display: flex;
	flex-direction: column;
	cursor: pointer;
	
	transition: all .3s;
	transform: translateY(0);
	box-shadow: none;
	
	&:hover {
		transform: translateY(-10px);
		box-shadow: 1px 7px 8px ${Colors.primaryDark};
	}
`

const Content = styled.div`
	height: 8.4em;
	padding: 1rem 0;
	margin-bottom: 1rem;
	position: relative;
	overflow:hidden;
	text-overflow: ellipsis;
	line-height: 1.2em;
	
	
	:after {
		  content: "";
		  text-align: right;
		  position: absolute;
		  bottom: 0;
		  right: 0;
		  width: 100%;
		  height: 2.4em;
		  background: linear-gradient(to bottom, rgba(${Colors.primaryRGB}, 0), rgba(${Colors.primaryRGB}, 1) 50%);
		}
`

const Icon = styled(FontAwesomeIcon)`
	position: absolute;
	top:1rem;
	right:1rem;
	transition: all .3s;
	
	${Container}:hover & {
    	transform: scale(1.2);
  	}
`

const Card = ({title, description, forks, stargazers, issues, expand}) => {
	return (
		<Container onClick={expand}>
			<Title>{title}</Title>
			<Icon icon={faExpandArrowsAlt}/>
			<Content>{description}</Content>
			<IconRow forkCount={forks} stargazerCount={stargazers} openIssueCount={issues}/>
		</Container>
	)
}


export default Card