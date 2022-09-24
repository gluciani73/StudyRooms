const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2

const {CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN} = require('../CONSTANTS.js')

const sendMail = async (options) => {
    try {
        const OAuth2Client = new OAuth2(CLIENT_ID,CLIENT_SECRET,'https://developers.google.com/oauthplayground')
        OAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

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