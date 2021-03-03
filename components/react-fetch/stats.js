export function Stats(props) {
    return (
        <div>
            <strong>👀 <span data-testid="subscribers_count">{props.subscribers_count}</span></strong>{" "}
            <strong>✨ <span data-testid="stargazers_count">{props.stargazers_count}</span></strong>{" "}
            <strong>🍴 <span data-testid="forks_count">{props.forks_count}</span></strong>
        </div>
    )
}