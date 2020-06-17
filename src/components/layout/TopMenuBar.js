import React from 'react';
import styled from "styled-components";
import {Colors, Spacing} from "../../theme";


const Container = styled.div`
	display: flex;
	align-items: center;
	
	top:0;
	background-color: ${Colors.primary};
	height: ${Spacing.menuHeight};
	width: 100%;
	z-index: 10;
`



const TopMenuBar = ({children}) => {
	return (
		<Container>
			{children}
		</Container>
	)
}


export default TopMenuBar