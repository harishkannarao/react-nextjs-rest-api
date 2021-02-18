import React from 'react';

export class HomePage extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>Next.js</title>
                </head>
                <body>
                    <div data-testid="message">Welcome to Next.js!!!</div>
                </body>
            </html>           
        );
    }
}

export default HomePage  