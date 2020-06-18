import React from "react";
import styled from "styled-components";
import {useDebounce} from "use-debounce";
import {Colors} from "../../theme";


const Input = styled.input`
	padding: 1rem;
	margin: auto;
	background-color: ${Colors.background};
	min-width: 50%;
	border-radius: 5px;
    outline: none;
  
`

const Container = styled.div`
	flex-grow: 1;
	text-align: center;
`

const Search = ({debouncedSearch}) => {
	const [input, setInput] = React.useState('');
	const [debouncedInput] = useDebounce(input, 500);
	
	React.useEffect(
		() => {
			if (debouncedInput) {
				debouncedSearch(debouncedInput);
			}
		},
		[debouncedInput]
	);
	
	
	return (
		<Container>
			<Input
				type="text"
				value={input}
				placeholder="Search for a repo..."
				onChange={({ currentTarget }) => {
					setInput(currentTarget.value);
				}}
			/>
		</Container>
		
	);
};

export default Search