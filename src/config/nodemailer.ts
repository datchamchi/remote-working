// Import the Nodemailer library
import nodemailer from 'nodemailer'

// Create a transporter object
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'vdat1608@gmail.com',
        pass: 'yhnuegakwqagvnfz',
    },
})

// Send the email
export function sendEmail(to: string, text: string) {
    transporter.sendMail(
        {
            from: 'remote-working@email.com',
            to,
            subject: 'Task Deadline Reminder',
            html: text,
        },
        function (error, info) {
            if (error) {
                console.log('Error:', error)
            } else {
                console.log('Email sent:', info.response)
            }
        }
    )
}
