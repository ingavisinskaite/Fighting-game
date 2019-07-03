const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();



var smtpTransport = nodemailer.createTransport("smtps://fightinggame8%40gmail.com:"+encodeURIComponent('f1ght1nggame') + "@smtp.gmail.com:465"); 

exports.sendWelcomeMail = functions.auth.user().onCreate(user => {
      
    const dest = user.email;

        const mailOptions = {
            from: 'fightinggame8@gmail.com',
            to: dest,
            subject: 'Welcome Email',
            html: `<mjml>
            <mj-body>
              <mj-section>
                <mj-column>
                  <mj-image width="100px" src="/assets/logo.png"></mj-image>
                  <mj-divider border-color="grey"></mj-divider>
                  <mj-text font-size="26px" color="red" font-family="helvetica" align="center">Welcome to our fighting game!</mj-text>
                  <mj-spacer></mj-spacer>
                  <mj-text font-size="20px" font-family="helvetica" align="center" color="grey">Thanks for joining, we hope you'll enjoy it.</mj-text>
                </mj-column>
              </mj-section>
            </mj-body>
          </mjml>`
        };
        
        return smtpTransport.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error.toString());
            }
            console.log('Sended');
        }); 
});

exports.sendGoodbyeMail = functions.auth.user().onDelete(user => {
      
    const dest = user.email;

        const mailOptions = {
            from: 'fightinggame8@gmail.com',
            to: dest,
            subject: 'Goodbye',
            html: `<h1>We're sorry to see you go!</h1> <br>
                    <h3>We hope you enjoyed it.</h3>`
        };
        
        return smtpTransport.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error.toString());
            }
            console.log('Sended');
        }); 
});

