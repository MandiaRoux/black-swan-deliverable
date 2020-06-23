import React from "react"
import styled from "styled-components"
import { useDebounce } from "use-debounce"
import { Colors } from "../theme"

const Input = styled.input`
  padding: 1rem;
  margin: auto;
  background-color: ${Colors.background};
  min-width: 50%;
  border-radius: 5px;
  outline: none;
  border: none;
  font-family: "Source Code Pro", monospace;
`

const Container = styled.div`
  flex-grow: 1;
  text-align: center;
`

const Search = ({ debouncedSearch, isLoading }) => {
  const [input, setInput] = React.useState("")
  const [debouncedInput] = useDebounce(input, 500)

  React.useEffect(() => {
    if (debouncedInput) {
      debouncedSearch(debouncedInput)
    }
  }, [debouncedSearch, debouncedInput])

  return (
    <Container>
      <Input
        type="text"
        value={input}
        disabled={isLoading}
        placeholder="Search for a repo..."
        onChange={({ currentTarget }) => {
          setInput(currentTarget.value)
        }}
      />
    </Container>
  )
}

export default Search
