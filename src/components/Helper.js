import React from "react";
import styled from "styled-components";
import {Colors} from "../theme";
import HelperImage from "../assets/code_inspction.svg";

const Container = styled.div`
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

const Helper = () => {
	return (
		<Container>
			<p>Use the searchbar above to look for repositories on Github.</p>
			<img alt={"a helpful image"} src={HelperImage}/>
		</Container>
	)
}

export default Helper