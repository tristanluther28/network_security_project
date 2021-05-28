const assert = require('assert');
const admin = require('firebase-admin');
const credential = require('./firebaseAdminCredential.json');
admin.initializeApp({
    credential: admin.credential.cert(credential),
    databaseURL: 'https://irrigationguardian.firebaseio.com'
});
const zlib = require('zlib');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const ses = new AWS.SES();

exports.handler = async (event) => {
    console.log(event);
    
    // decode + decompress payload
    const payload = Buffer.from(event.awslogs.data, 'base64');
    const logs = JSON.parse(zlib.unzipSync(payload).toString()).logEvents;

    const promises = [];
    
    // go through each log message
    for(const log of logs) {
        promises.push(new Promise(async (resolve, reject) => {
            try {
                console.log(log);
                
                const message = log.message;
                const json = getJson(message);

                console.log(json);
                
                // do the processing here
                await processData(json);
                
                resolve();
            } catch(e) {
                // console.log(e);
                reject(e);
            }
        }));
    }
    
    await Promise.all(promises);
    
    return {};
};

async function processData(data){
    const unidentifiedUser = isUnidentifiedUser(data);
    
    if(unidentifiedUser){
        const promises = [];

        const {fcmToken, email} = data;
        assert(
            fcmToken != null &&
            email != null
        );

        // console.log(fcmToken);
        // console.log(email);

        // send email
        promises.push(sendEmail(email));
        
        // TODO: get list of all past tokens from db and send message to them all
        
        // send push notification to user
        const registrationTokens = [];
        registrationTokens.push(fcmToken);
        const message = {
            tokens: registrationTokens,
            data: {
                'hello world': `${new Date()}`
            }
        };
        promises.push(new Promise((resolve, reject) => {
            admin.messaging().sendMulticast(message)
                .then((response) => {
                    console.log(response.successCount + ' FCM message(s) sent successfully');
                    resolve();
                })
                .catch(e => {
                    console.log(e);
                    reject(e);
                });
        }));

        await Promise.all(promises);
    } else {
        console.log(`Welcome back`);
    }
}

// algorithm goes here
function isUnidentifiedUser(data){
    return true;
}

function getJson(str){
    return JSON.parse(str.substring(
        str.indexOf("{"),
        str.lastIndexOf("}") + 1
    ));
}

async function sendEmail(recipient) {
    const params = {
        Source: 'fenga@oregonstate.edu',
        Destination: {
            CcAddresses: [
                'fenga@oregonstate.edu'
            ],
            ToAddresses: [
                recipient
            ]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: "<p>Hello World</p>"
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Test email'
            }
        }
    };

    return new Promise((resolve, reject) => {
        ses.sendEmail(params).promise().then(
            function(data) {
                // console.log(data);
                console.log(`Email sent to ${recipient}`);
                resolve();
            }).catch(
            function(err) {
                console.error(err, err.stack);
                reject(err);
            });
    });
}
