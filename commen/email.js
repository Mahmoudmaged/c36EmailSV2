const nodemailer = require("nodemailer");
const {google} = require('googleapis');

// SENDEMAILCLINTID  = 
// SENDEMAILSECRETKEY =
// SENDEMAILREDIRECTURI
// EMAILREFRESHTOKEN = 
const CLIENT_ID = process.env.SENDEMAILCLINTID;
const CLIENT_SECRET = process.env.SENDEMAILSECRETKEY;
const REDIRECT_URI = process.env.SENDEMAILREDIRECTURI;
const REFRESH_TOKEN = process.env.EMAILREFRESHTOKEN;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);


oauth2Client.setCredentials({
    refresh_token :REFRESH_TOKEN
});


async function sendEmail(dest, message , attachment) {
    const accessToken = await oauth2Client.getAccessToken()
    let attach =[];
    if(attachment){
        attach  = attachment
    }
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            type:"oauth2",
            clientId:CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            accessToken: accessToken,
            refreshToken: REFRESH_TOKEN,
            user:process.env.senderEmail, // generated ethereal user
           
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Fred Foo 👻" <${process.env.senderEmail}>`, // sender address
        to: dest, // list of receivers
        subject: "confirmationEmail ✔", // Subject line
        attachments :attach,
        text: "hello confirmation email", // plain text body
        html: message, // html body
    });

}

module.exports = sendEmail