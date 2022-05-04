export default function handler(req, res) {
    if (req.method === 'GET') {
        const responseJson = [];
        for (let i = 1; i <= 50; i++) {
            responseJson.push(
                {
                    "id": i,
                    "firstName": `First Name ${i}`,
                    "lastName": `Last Name ${i}`
                }
            );
        }
        res.status(200).json(responseJson);
    } else {
        res.status(204).json();
    }
}
