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
            html: `<h1>Welcome to our fighting game!</h1> <br>
                    <h3>We hope you will enjoy it.</h3>`
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

