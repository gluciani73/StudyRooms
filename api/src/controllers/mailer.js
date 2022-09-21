const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2
// pal envio de mails
const CLIENT_ID = "374729590488-tfhid7q5qv8snscaounusdtvmtet8utp.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REFRESH_TOKEN = "1//04FYV051G4rGZCgYIARAAGAQSNwF-L9Ir-B89LvCTR8dm7mQhcHbTdAz6Gq1ZlyBG_toaOuP52gtNN_MUzNyR4yuR6k6MzsJKUf0"

const sendMail = async (options) => {
    try {
        const OAuth2Client = new OAuth2(CLIENT_ID,CLIENT_SECRET,'https://developers.google.com/oauthplayground')
        OAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
        //const token = await OAuth2Client.getAccessToken()
        const accessToken = await new Promise((resolve, reject) => {
            OAuth2Client.getAccessToken((err, token) => {
              if (err) {
                reject("Failed to create access token :(");
              }
              resolve(token);
            });
          });

        const transport = nodemailer.createTransport({
            service:"gmail",
            tls: {
                rejectUnauthorized: false
            },
            auth:{
                type:"OAuth2",
                user:"study.rooms.mail@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const results = await transport.sendMail(options)
        if(results) console.log(`mail sent to: ${options.to}`);
        transport.close()

    } catch (error) {
        console.log(error)
    }
}

module.exports = sendMail