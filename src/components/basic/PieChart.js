import React from 'react';
import styled from "styled-components";
import {Colors} from "../../theme";
import { PieChart } from 'react-minimal-pie-chart';


const Container = styled.div`
	grid-row: 3 / span 1;
	grid-column: 4 / 9;
	text-align: center;
	background-color: ${Colors.primaryLighter};
	border-radius: 5px;
	display: flex;
	align-items: center;
`


const Chart = ({openIssueCount, closedIssueCount}) => {
	const totalTicketCount = openIssueCount + closedIssueCount
	const open = (openIssueCount/totalTicketCount)*100
	const closed = (closedIssueCount/totalTicketCount)*100
	
	
	
	return (
		<Container>
			
			<PieChart
				data={[
					{ title: 'Open Tickets', value: open, color: Colors.primaryDark },
					{ title: 'Closed Tickets', value: closed, color: Colors.primaryDarker },
				]}
				label={({dataEntry}) => dataEntry.title}
				labelStyle={{
					fontSize: '6px',
					fontFamily: 'monospace',
					color: '#F9F9F7',
					fontWeight: '400',
				}}
				radius={42}
				labelPosition={112}
				animate={true}
				animationDuration={1000}
				style={{ height: '300px' }}
			 />
		
		</Container>
	)
}


export default Chart