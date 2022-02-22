const url = "https://620dfdda20ac3a4eedcf5a52.mockapi.io/api";

export const getCheckIns = async (id) => {
    const checkIns = await fetch(url + `/employee/${id}/checkin`)
	return checkIns.json()
}

export const getEmployee = async (id) => {
    const employee = await fetch(url + `/employee/${id}`)
	return employee.json()
}

export const getEmployees = async (nameField,countryField,departmentField,sortBy,pageIndex,limit) => {
    let employees=null;
    let queryString="";
    if (countryField!=="")
        queryString=`&country=${countryField}`
    if (departmentField!=="")
        queryString=`&department=${departmentField}`
    employees = await fetch(url+`/employee?search=${nameField}&sortBy=${sortBy.field}&order=${sortBy.order}&page=${pageIndex}&limit=${limit}`+queryString)
    return employees.json()
}
