export function Customer(props) {
    return (
        <tr>
            <td data-testid="id">{props.value.id}</td>
            <td data-testid="firstName">{props.value.firstName}</td>
            <td data-testid="lastName">{props.value.lastName}</td>
        </tr>
    )
}

export function CustomerList(props) {
    const customers = props.data.map((item) =>
        <Customer key={item.id} value={item} />
    )
    return (
        <div data-testid="success-content">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {customers}
                </tbody>
            </table>
        </div>
    )
}