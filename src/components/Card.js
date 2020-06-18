import React from 'react';
import styled from "styled-components";
import {Colors} from "../theme";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCodeBranch, faExclamationCircle, faStar, } from '@fortawesome/free-solid-svg-icons'

const Title = styled.h3`

`

const Container = styled.div`
	background-color: ${Colors.primary};
	border-radius: 5px;

	padding: 1rem;
	position:relative;
	
	display: flex;
	flex-direction: column;
`

const Content = styled.div`
	height: 6em;
	padding: 1rem 0;
	margin-bottom: 1rem;
	position: relative;
	overflow-y:hidden;
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
const Link = styled.div`
	max-width: 90%;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	direction: rtl;
    text-align: left;
`
const IconLabel = styled.i`
	margin: 3px;
    padding: .5rem;
    
    svg {
    margin-right: .5rem;
    }
`


const Card = ({title, description, forks, stargazers, issues, expand}) => {
	return (
		<Container>
			<button onClick={expand}>EXPAND</button>
			<Title>{title}</Title>
			<Content>{description}</Content>
			<IconRow>
				<IconLabel>
					<FontAwesomeIcon icon={faCodeBranch}/>
					{forks}
				</IconLabel>
				<IconLabel>
					<FontAwesomeIcon icon={faStar}/>
					{stargazers}
				</IconLabel>
				<IconLabel>
					<FontAwesomeIcon icon={faExclamationCircle}/>
					{issues}
				</IconLabel>
			</IconRow>
		</Container>
	)
}


export default Card