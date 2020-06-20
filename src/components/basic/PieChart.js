import React from 'react';
import styled from "styled-components";
import {Colors} from "../../theme";
import { PieChart } from 'react-minimal-pie-chart';


const Container = styled.div`

`

const Chart = ({openIssueCount, closedIssueCount}) => {
	const totalTicketCount = openIssueCount + closedIssueCount
	const open = (openIssueCount/totalTicketCount)*100
	const closed = (closedIssueCount/totalTicketCount)*100
	return (
		<Container>
			<PieChart
				data={[
					{ title: 'Open Tickets', value: open, color: Colors.primaryLighter },
					{ title: 'Closed Tickets', value: closed, color: Colors.primaryDarker },
				]}
			 />
		</Container>
	)
}


export default Chart