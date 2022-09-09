
export default async function handler(req, res) {
    const {body} = req;
    const dataRes = JSON.parse(body);
    try{
        if (req.method === 'POST') {
            const resUpdate = await fetch(`${process.env.nodeAppApi}/v1/auth/user`, {
                method: 'post',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json',
                    "x-access-token": `${dataRes.token}`
                },
                body: JSON.stringify( {
                    payment_method: 'paypal',
                    subscriptionId: dataRes.subscriptionId,
                    plan: dataRes.plan
                })
            })
            return res.status(200).json( body );
        }
    } catch(err) {
        res.status(500).json('erorr res!')
    }
}