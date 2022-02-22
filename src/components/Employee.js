import { useState,useEffect} from "react";
import {  Table } from "antd";

import * as Api  from "../Api";

const Employee = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [checkInDataSource, setCheckInDataSource] = useState([]);
	const [employeeDataSource, setEmployeeDataSource] = useState([]);
	const checkInTableColumns = [
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
	const employeeTableColumns = [
		{
			key: "1",
			title: "Id",
			dataIndex: "id"
		},
		{
			key: "2",
			title: "Name",
			dataIndex: "name",
		},
		{
			key: "3",
			title: "Email",
			dataIndex: "email"
		},
		{
			key: "4",
			title: "Department",
			dataIndex: "department",
            render: (department) => {
                return <span>{department.toString()}</span>;
              },
		},
        {
			key: "5",
			title: "Country",
			dataIndex: "country"
		},
        {
			key: "6",
			title: "Birthday",
			dataIndex: "birthday"
		},
        {
			key: "7",
			title: "Created At",
			dataIndex: "createdAt"
		},
        {
			key: "8",
			title: "Phone",
			dataIndex: "phone"
		}
    ];
	const id = props.match.params.id;

	const fetchCheckIns = async () => {
		try {
			const data = await Api.getCheckIns(id);
			setCheckInDataSource(data);
		}
		catch(error) {
			console.error(error);
		}
		finally {
			setIsLoading(false);
		}
	}

	const fetchEmployee = async () => {
		try {
			const data = await Api.getEmployee(id);
			setEmployeeDataSource([data]);
		}
		catch(error) {
			console.error(error);
		}
		finally {
			setIsLoading(false);
		}
	}

	useEffect( () => {
		setIsLoading(true);
		fetchCheckIns();
		fetchEmployee();
	},[id])

	return (
		<div>
			<h1 style={{textAlign:'center'}} >Employee Details</h1>
			<Table loading={isLoading} columns={employeeTableColumns} dataSource={employeeDataSource}  rowKey="id" /> 
			<h1 style={{textAlign:'center'}}>Check Ins</h1>
			<Table loading={isLoading} columns={checkInTableColumns} dataSource={checkInDataSource}  rowKey="checkin" /> 
		</div>
	);
}

export default Employee;
