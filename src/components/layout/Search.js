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
    border-bottom: 3px solid transparent;
    outline: none;
    &:focus {
          outline: none;
          border-bottom: 3px solid ${Colors.primary};
        }
`

const Container = styled.div`
	flex-grow: 1;
	text-align: center;
`

const Search = ({debouncedSearch}) => {
	const [input, setInput] = React.useState('');
	const [debouncedInput] = useDebounce(input, 1000);
	
	React.useEffect(
		() => {
			if (debouncedInput) {
				console.log("DEB SEARCH")
				debouncedSearch(debouncedInput);
			} else {
				console.log("DEB NO")
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