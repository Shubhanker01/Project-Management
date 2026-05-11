import Mailgen from "mailgen"

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
    passwordResetContent
}