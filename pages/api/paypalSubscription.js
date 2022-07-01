
export default async function handler(req, res) {
    const {body} = req;
    const dataRes = JSON.parse(body);
    try{
        if (req.method === 'POST') {
            const resUpdate = await fetch('http://localhost:1337/api/user/updateLoggedInUser', {
                method: 'PUT',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTY1NTQ5OTE4OSwiZXhwIjoxNjU4MDkxMTg5fQ.udGooRL4_zFyjwSXROZRfO_k48BoNkBE6JSvKP-q4CE`
                },
                body: JSON.stringify( {data: {
                    payment_method: 'paypal',
                    subscriptionId: dataRes.subscriptionId,
                    plan: dataRes.plan
                }})
            })
            return res.status(200).json( body );
        }
    } catch(err) {
        res.status(500).json('erorr res!')
    }
}