import React from 'react';
import styled, {keyframes} from "styled-components";



const Toggle = styled.div`

		
`

const Option = styled.button`

`

const ToggleSwitch = ({onChange, filterActive}) => {
	return (
		<Toggle>
			<Option>
				Open
			</Option>
			<Option>
				Closed
			</Option>
		</Toggle>
	
		
		
	)
}

export default ToggleSwitch