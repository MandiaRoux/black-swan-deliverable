import React from 'react';
import styled from "styled-components";
import {Colors} from "../theme";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCodeBranch, faExclamationCircle, faStar, faArrowRight, faChartPie} from '@fortawesome/free-solid-svg-icons'
import { PieChart } from 'react-minimal-pie-chart';


const Container = styled.div`

`

const Chart = ({openIssueCount, closedIssueCount}) => {
	const totalTicketCount = openIssueCount + closedIssueCount
	const open = (openIssueCount/totalTicketCount)*100
	const closed = (closedIssueCount/totalTicketCount)*100
	console.log(">>", open, closed, openIssueCount, totalTicketCount)
	return (
		<Container>
			<PieChart
				data={[
					{ title: 'Open Tickets', value: open, color: '#E38627' },
					{ title: 'Closed Tickets', value: closed, color: '#C13C37' },
				]}
			 />
		</Container>
	)
}


export default Chart