export function Customer(props) {
    return (
        <tr>
            <td><input data-testid="delete" type="button" data-id={props.value.id} onClick={props.handleDeleteCustomer} value="Delete" /></td>
            <td data-testid="id">{props.value.id}</td>
            <td data-testid="firstName">{props.value.firstName}</td>
            <td data-testid="lastName">{props.value.lastName}</td>
        </tr>
    )
}

export function CustomerList(props) {
    return (
        <div data-testid="success-content">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.isSubmitting
                            ? (
                                <div>Submitting...</div>
                            ) : (
                                props.data.map((item) =>
                                    <Customer handleDeleteCustomer={props.handleDeleteCustomer} key={item.id} value={item} />
                                )
                            )
                    }
                </tbody>
            </table>
        </div>
    )
}