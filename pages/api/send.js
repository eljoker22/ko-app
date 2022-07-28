const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_api_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = JSON.parse(req.body);
        const data = {
            to: 'eljokermano60@gmail.com',
            from: 'mjmedia@mj-mediaa.com',
            subject: 'support mj media',
            text: 'body.msg',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
            mail.send(data).then(() => { console.log('succes') }).catch((err) => console.log(err));
        res.status(200).json({ name: 'John Doe' })
    }
}