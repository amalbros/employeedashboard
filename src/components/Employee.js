const Employee = (props) => {
    return (
        <h1>{props.match.params.id}</h1>
    )
}
export default Employee;
