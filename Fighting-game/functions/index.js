const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();
const db = admin.firestore();



var smtpTransport = nodemailer.createTransport("smtps://fightinggame8%40gmail.com:" + encodeURIComponent('f1ght1nggame') + "@smtp.gmail.com:465");

exports.sendWelcomeMail = functions.auth.user().onCreate(user => {

  const dest = user.email;

  const mailOptions = {
    from: 'fightinggame8@gmail.com',
    to: dest,
    subject: 'Welcome Email',
    html: `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title> <!--[if !mso]><!-- --><meta http-equiv="X-UA-Compatible" content="IE=edge"> <!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style type="text/css">#outlook a{padding:0}.ReadMsgBody{width:100%}.ExternalClass{width:100%}.ExternalClass *{line-height:100%}body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}p{display:block;margin:13px 0}</style><!--[if !mso]><!--><style type="text/css">@media only screen and (max-width:480px){@-ms-viewport{width:320px}@viewport{width:320px}}</style><!--<![endif]--> <!--[if mso]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> <![endif]--> <!--[if lte mso 11]><style type="text/css">.outlook-group-fix{width:100% !important}</style><![endif]--><style type="text/css">@media only screen and (min-width:480px){.mj-column-per-100{width:100% !important;max-width:100%}}</style><style type="text/css">@media only screen and (max-width:480px){table.full-width-mobile{width:100% !important}td.full-width-mobile{width:auto !important}}</style></head><body><div style=""> <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"> <![endif]--><div style="Margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"> <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" > <![endif]--><div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:100px;"> <img height="auto" src="https://i.ibb.co/3h29vYx/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="100" /></td></tr></tbody></table></td></tr><tr><td style="font-size:0px;padding:10px 25px;word-break:break-word;"><p style="border-top:solid 4px grey;font-size:1;margin:0px auto;width:100%;"></p> <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px grey;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;</td></tr></table> <![endif]--></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:26px;line-height:1;text-align:center;color:red;"> Welcome to our fighting game!</div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:20px;line-height:1;text-align:center;color:grey;"> Thank you for joining, we hope you'll enjoy it.</div></td></tr></table></div> <!--[if mso | IE]></td></tr></table> <![endif]--></td></tr></tbody></table></div> <!--[if mso | IE]></td></tr></table> <![endif]--></div></body>`
  };

  return smtpTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
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
    html: `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title> <!--[if !mso]><!-- --><meta http-equiv="X-UA-Compatible" content="IE=edge"> <!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style type="text/css">#outlook a{padding:0}.ReadMsgBody{width:100%}.ExternalClass{width:100%}.ExternalClass *{line-height:100%}body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}p{display:block;margin:13px 0}</style><!--[if !mso]><!--><style type="text/css">@media only screen and (max-width:480px){@-ms-viewport{width:320px}@viewport{width:320px}}</style><!--<![endif]--> <!--[if mso]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> <![endif]--> <!--[if lte mso 11]><style type="text/css">.outlook-group-fix{width:100% !important}</style><![endif]--><style type="text/css">@media only screen and (min-width:480px){.mj-column-per-100{width:100% !important;max-width:100%}}</style><style type="text/css">@media only screen and (max-width:480px){table.full-width-mobile{width:100% !important}td.full-width-mobile{width:auto !important}}</style></head><body><div style=""> <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"> <![endif]--><div style="Margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"> <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" > <![endif]--><div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:100px;"> <img height="auto" src="https://i.ibb.co/3h29vYx/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="100" /></td></tr></tbody></table></td></tr><tr><td style="font-size:0px;padding:10px 25px;word-break:break-word;"><p style="border-top:solid 4px grey;font-size:1;margin:0px auto;width:100%;"></p> <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px grey;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;</td></tr></table> <![endif]--></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:26px;line-height:1;text-align:center;color:red;"> We're sorry to see you go!</div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:20px;line-height:1;text-align:center;color:grey;"> Hope you enjoyed it.</div></td></tr></table></div> <!--[if mso | IE]></td></tr></table> <![endif]--></td></tr></tbody></table></div> <!--[if mso | IE]></td></tr></table> <![endif]--></div></body></html>`
  };

  return smtpTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error.toString());
    }
    console.log('Sended');
  });
});


exports.matchPlayers = functions.firestore.document('rooms/{roomId}')
  .onUpdate((change, context) => {
    console.log('Trigger in Room with ID:')
    console.log(context.params.roomId);

  if (change.after.data().playersWaiting.length > 1) { 
    //let matchedPlayers = change.after.data.playersWaiting.sort(() => .5 - Math.random()).slice(0, 2);
    const waitingPlayerIds = change.after.data().playersWaiting;

    db.doc('users/' + waitingPlayerIds[0]).update({
      opponentId: waitingPlayerIds[1]
    });

    db.doc('users/' + waitingPlayerIds[1]).update({
      opponentId: waitingPlayerIds[0]
    });
  }

  return 0;
  //   let firstPlayer = waitingPlayers[0];
  //   firstPlayer.opponentId = waitingPlayers[1].id
  //   let opponentId = '';
  //   const currentUserPosition = matchedPlayers.indexOf(userId);
  //   console.log(2);
  //   if (currentUserPosition === 0) {
  //     opponentId = matchedPlayers[1];
  //     console.log(opponentId);
  //   } else {
  //     opponentId = matchedPlayers[0];
  //     console.log(opponentId);
  //   }
  //   user.opponentId = opponentId;
  //   admin.firestore.collection('users').doc(userId).set({opponentId: opponentId})
  //   .then(function() {
  //     console.log("Document successfully updated!");
  // })
  // .catch(function(error) {
  //     console.error("Error updating document: ", error);
  // });
});
