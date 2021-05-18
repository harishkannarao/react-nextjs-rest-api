export function DisplayError(props) {
    let errorMessage = props.error.message;
    if (props.error.isAxiosError) {
        errorMessage = JSON.stringify(props.error.response)
    }
    return (
        <div data-testid="error-content">"An error has occurred: " + {errorMessage}</div>
    )
}