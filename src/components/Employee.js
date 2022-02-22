import { useState,useEffect} from "react";
import {  Table } from "antd";

import * as Api  from "../Api";

const Employee = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			key: "1",
			title: "Check In",
			dataIndex: "checkin"
		},
		{
			key: "2",
			title: "Location",
			dataIndex: "location"
		},
		{
			key: "3",
			title: "Purpose",
			dataIndex: "purpose"
		},
		{
			key: "4",
			title: "Id",
			dataIndex: "id"
		},
		{
			key: "4",
			title: "Employee Id",
			dataIndex: "employeeId"
		}
	];
	const id = props.match.params.id;

	useEffect( () => {
		setIsLoading(true);
		const fetchCheckIns = async () => {
			try {
				const data = await Api.getCheckIns(id);
				setDataSource(data);
			}
			catch(error) {
				console.error(error);
			}
			finally {
				setIsLoading(false);
			}
		}
		fetchCheckIns();
	},[id])

	const handleChange = (...args) => {
	};

	return (
		<div>
			<h1 style={{textAlign:'center'}}>Check Ins</h1>
			<Table loading={isLoading} columns={columns} dataSource={dataSource}  rowKey="checkin" onChange={handleChange}/> 
		</div>
	);
}

export default Employee;
