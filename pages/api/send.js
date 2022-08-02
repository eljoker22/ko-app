import { Novu } from '@novu/node';


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = JSON.parse(req.body);
        const novu = new Novu('df82e514194b79721613be646c6216eb');

        novu.trigger('test', {
            to: { 
            subscriberId: 'eljokermano50@gmail.com', 
          },
          payload: {
            name: 'jemy1'
          }
        });
        
        res.status(200).json({ name: 'John Doe' })
    }
}