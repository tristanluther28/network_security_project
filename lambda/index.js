const assert = require('assert');
const admin = require('firebase-admin');

const rds = require('./rds.js');

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
    data.timestamp = new Date();
    const unidentifiedUser = isUnidentifiedUser(data);
    
    if(unidentifiedUser){
        const promises = [];

        // send email
        promises.push(sendEmail(data.uid, data));
        
        // send push notification to user
        promises.push(sendPush(data.fcmToken, data));

        await Promise.all(promises);
    } else {
        console.log(`Welcome back`);
    }
}

// algorithm goes here edit here
function isUnidentifiedUser(data){

    var lastData = collectLastData(data);

    if ( lastData.uid_firebase == data.uid)
    {
        console.log("uid is same");

        if(lastData.ip != data.ip)
        {
            console.log("ip is different");
            return true;
        }

        if(lastData.device_type != data.deviceType)
        {
            console.log("device type is different");
            return true;
        }

        if(lastData.time_zone != data.timezone)
        {
            console.log("timezone is different");
            return true;
        }

        if(lastData.os != data.os.type)
        {
            console.log("os is different");
            return true;
        } 

        if ((lastData.browser != data.browser.type) && (lastData.os_version != data.os.version)){
            console.log("browser is different");
            return true;
        }
    }
    return false;
}

async function collectLastData(data){
    await rds.init();
    
    const lastdata = await rds.query("SELECT * FROM users WHERE uid_firebase='"+data.uid+"' ORDER BY timestamp");
    /*
    var i = 0;
    while(i < lastdata.length){
        console.log(lastdata[i]);
        i++;
    }
    */
    
    await rds.end();
    return lastdata[lastdata.length -2];
}

function getJson(str){
    return JSON.parse(str.substring(
        str.indexOf("{"),
        str.lastIndexOf("}") + 1
    ));
}


async function sendEmail(uid, data) {
    const email = await new Promise((resolve, reject) => {
        admin.auth().getUser(uid)
            .then(userRecord => {
                console.log(`Got email: ${userRecord.email}`);
                resolve(userRecord.email);
            })
            .catch(e => {
                console.log(e);
                reject(e);
            });
    });

    const params = {
        Source: 'fenga@oregonstate.edu',
        Destination: {
            ToAddresses: [
                email
            ]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<p>${JSON.stringify(data)}</p>`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'New login detected'
            }
        }
    };

    return new Promise((resolve, reject) => {
        ses.sendEmail(params).promise().then(
            function(data) {
                // console.log(data);
                console.log(`Email sent to ${email}`);
                resolve();
            }).catch(
            function(err) {
                console.error(err, err.stack);
                reject(err);
            });
    });
}

async function sendPush(fcmToken, data){
    const registrationTokens = [];
    registrationTokens.push(fcmToken);
    const message = {
        tokens: registrationTokens,
        data: {
            'New Login': `${JSON.stringify(data)}`
        }
    };

    return new Promise((resolve, reject) => {
        admin.messaging().sendMulticast(message)
            .then((response) => {
                console.log(response.successCount + ' FCM message(s) sent successfully');
                resolve();
            })
            .catch(e => {
                console.log(e);
                reject(e);
            });
    });
}