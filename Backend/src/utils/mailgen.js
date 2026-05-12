import Mailgen from "mailgen"
import nodemailer from "nodemailer"


const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanager.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailHtml = mailGenerator.generate(options.mailgenContent)

    const transport = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMPT_HOST,
        port: process.env.MAILTRAP_SMPT_PORT,
        auth: {
            user: process.env.MAILTRAP_SMPT_USER,
            pass: process.env.MAILTRAP_SMPT_PASS
        }
    });

    const mail = {
        from: process.env.EMAIL,
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }
    try {
        await transport.sendMail(mail)
    } catch (error) {
        console.error("Email Service failed")
    }

}
const emailVerificationContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: 'Welcome to our App!! We are excited to have you onboard',
            action: {
                instructions: 'To Verify your email please click on the following button',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: verificationUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}

const passwordResetContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: 'Welcome to Password reset mail option',
            action: {
                instructions: 'To Reset your password please click on the button below',
                button: {
                    color: '#bc2722', // Optional action button color
                    text: 'Password Reset',
                    link: passwordResetUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}

export {
    emailVerificationContent,
    passwordResetContent,
    sendEmail
}