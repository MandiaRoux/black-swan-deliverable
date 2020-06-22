import React from "react";
import styled from "styled-components";
import {Colors} from "../../theme";
import HelperImage from "../../assets/code_inspection.svg";
import HelperErrorImage from "../../assets/404.png";

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

const Helper = ({error}) => {
	return (
		<Container>
			{error ?
				<div>
					<p>Something went wrong! You probably exceeded your rate limit.</p>
					<img alt={"404 image"} src={HelperErrorImage}/>
				</div> :
				<div>
					<p>Use the searchbar above to look for repositories on Github.</p>
					<img alt={"a helpful image"} src={HelperImage}/>
				</div>
			}
		</Container>
	)
}

export default Helper