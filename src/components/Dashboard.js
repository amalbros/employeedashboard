import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import {  Table,Input } from "antd";
import { useRef } from 'react';

import * as Api from '../Api';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [nameField,setNameField] = useState("");
	const [dataSource, setDataSource] = useState([]);
    const [pageIndex,setPageIndex] = useState(1);
    const [sortBy,setSortBy] = useState({field:'id',order:'asc'});
    const [countryField,setCountryField] = useState("");
	const [departmentField,setDepartmentField] = useState("");
	const isFetching = useRef(false);
	const columns = [
		{
			key: "1",
			title: "Id",
			dataIndex: "id",
			render: id => <Link to={`/employee/${id}`}>{id}</Link>,
			sorter: () => { }
		},
		{
			key: "2",
			title: "Name",
			dataIndex: "name",
			sorter: () => { }
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

    const fetchEmployees = async() => {
		if (isFetching.current)
			return
		isFetching.current=true;
        setIsLoading(true);
        try {
            const data = await Api.getEmployees(nameField,countryField,departmentField,sortBy,pageIndex,10);
            setDataSource(data);
        }
        catch(error) {
            console.error(error);
        }
        finally {
			isFetching.current=false
            setIsLoading(false);
        }
    } 

    useEffect(() => {
    	fetchEmployees();
    }, [pageIndex])

    useEffect(() => {
		if (pageIndex===1) fetchEmployees();
		else setPageIndex(1);
	},[nameField,countryField,departmentField,sortBy.field,sortBy.order])

	const handleChange = (...args) => {
		if (args[0] && args[0].current){
			setPageIndex(args[0].current);
		}
		if (args[2] && args[2].order==='ascend'){
			setSortBy({order:'asc',field:args[2].field});
		}
		else if (args[2] && args[2].order==='descend'){
			setSortBy({order:'desc',field:args[2].field});
		}
	};

	return (
		<div>
            <Input placeholder="Search Name" value={nameField} style={{width:'300px', margin:'5px', float:'left', marginRight:'5px'}}
			onChange={e => {setNameField(e.target.value)}} />
			<Input placeholder="Filter By Country" value={countryField} style={{width:'300px', margin:'5px', marginRight:'5px'}}
			onChange={e => {setCountryField(e.target.value)}} />
			<Input placeholder="Filter By Department"  value={departmentField}
			onChange={e => {setDepartmentField(e.target.value)}} style={{width:'300px', margin:'5px'}} />
			<button style={{margin:'5px'}} onClick={()=>{setDepartmentField("");setCountryField("");setNameField("");}}>Clear </button>
			<Table loading={isLoading} columns={columns} dataSource={dataSource}  
            pagination={{
				current:pageIndex,
                pageSize:10,
                total:100
            }}
			onChange={handleChange} rowKey="id" />
		</div>
	);
}

export default Dashboard;
