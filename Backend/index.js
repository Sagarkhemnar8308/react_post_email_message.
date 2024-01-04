const express = require('express');
const cors = require('cors');
const expressAsyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
require('dotenv').config();

const server = express();

server.use(express.json());
server.use(cors()); 

server.get('/', (req, res) => {
    res.send('Application is running');
});

server.post('/email', expressAsyncHandler(async (req, resp) => {
    const { email, message, subject } = req.body;

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST|| 'smtp.example.com',
        port: process.env.SMTP_PORT|| 587,
        secure: false,
        auth: {
            user: process.env.SMTP_MAIL||'sagarkhemnar8308@gmail.com',
            pass: process.env.SMTP_PASSWORD||'nnug pfoi blzc dhnz',
        }
    });

    const mailOptions = {
        from:  process.env.SMTP_MAIL||'sagarkhemnar143@gmail.com',
        to: email,
        subject: subject,
        text: message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent successfully:', info.response);
        resp.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        resp.status(404).json({ message: 'Failed to send message' });
    }
}));

const PORT = 4200;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
