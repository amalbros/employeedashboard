import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import {  Table,Input } from "antd";

import * as Api from '../Api';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
	const [dataSource, setDataSource] = useState([]);
    const [dataSourceCopy, setDataSourceCopy] = useState([]);
	const columns = [
		{
			key: "1",
			title: "Id",
			dataIndex: "id",
			render: id => <Link to={`/employee/${id}`}>{id}</Link>
		},
		{
			key: "2",
			title: "Name",
			dataIndex: "name"
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

	useEffect( () => {
		const fetchEmployees = async () => {
			setIsLoading(true);
			try {
				const data = await Api.getEmployees();
                console.log(data)
				setDataSource(data);
                setDataSourceCopy(data);
			}
			catch(error) {
				console.error(error);
			}
			finally {
				setIsLoading(false);
			}
		}
		fetchEmployees();
	},[]) 

	return (
		<div>
            <Input placeholder="Search Name"
			onChange={e => {
				const currValue = e.target.value;
				const filteredData = dataSourceCopy.filter(entry =>  entry.name.toUpperCase().includes(currValue.toUpperCase()));
				setDataSource(filteredData);
			}}/>
			<Table loading={isLoading} columns={columns} dataSource={dataSource}  rowKey="id" />
		</div>
	);
}
export default Dashboard;
