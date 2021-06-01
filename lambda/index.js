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

    await rds.init();
    
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

    await rds.end();
    
    return {};
};

async function processData(data){
    // data = {
    //     "type": "user-data",
    //     "uid": "AuuByZzZVYNCbcUTtfRsCNK5NOP2",
    //     "fcmToken": "fXGf2c4ULq0-9zNgCczNqY:APA91bE14n8MXq5UAHkvE8TDVr8g6_8QPRnpbASMhRG_NkQocCiZpPkbl05QaC4ukKoD1MiI04oohuAA5valYoEZKFu56WZGOA-mp_391AWqu-pHGGZYUfVY-hMLfBcGDh-Z1ZlPCSKd",
    //     "os": { "type": "Windows", "version": "10" },
    //     "browser": { "type": "Chrome", "version": "90.0" },
    //     "timezone": "America/Los_Angeles",
    //     "deviceType": "Desktop/Laptop",
    //     "ip": "71.237.149.135"
    // };

    // data = {
    //     "type": "user-data",
    //     "uid": "AuuByZzZVYNCbcUTtfRsCNK5NOP2",
    //     "fcmToken": "e8KLJxCY2ct36-7UcgNzgw:APA91bGDtGZwGOGgNd3joaVTe_WHjW0GvUK-c6TVPTY9BMG6VSI_Ne4Yenp0-DiNLY6Vj7WK-W6_MzsHpeKqDaI43sMmVD0xVAzkFEDJoihTg_PlDYbbqP1I9k4_kT4EHTtPnMGx2U2D",
    //     "os": { "type": "Windows", "version": "10" },
    //     "browser": { "type": "Chrome", "version": "91.0" },
    //     "timezone": "America/Los_Angeles",
    //     "deviceType": "Desktop/Laptop",
    //     "ip": "128.193.154.164"
    // };

    data.timestamp = new Date();
    const unidentifiedUser = await isUnidentifiedUser(data);
    
    if(unidentifiedUser){
        const promises = [];

        // send email
        promises.push(sendEmail(data));
        
        // send push notification to user
        promises.push(sendPush(data));

        await Promise.all(promises);
    } else {
        console.log(`Welcome back`);
    }
}

// algorithm goes here edit here
async function isUnidentifiedUser(data){

    var collectedData = new Array();
    collectedData = await collectData(data);

    var i = 0;

    while(i < collectedData.length){
        //If the uid matches and the entry is less than one hour old
        if ( collectedData[i].uid_firebase == data.uid /*&& (data.timestamp - collectedData[i].timestamp) < 3600*/)
        {
            console.log("uid is same");

            if(collectedData[i].ip != data.ip)
            {
                console.log("ip is different");
                return true;
            }

            if(collectedData[i].device_type != data.deviceType)
            {
                console.log("device type is different");
                return true;
            }

            if(collectedData[i].time_zone != data.timezone)
            {
                console.log("timezone is different");
                return true;
            }

            if(collectedData[i].os != data.os.type)
            {
                console.log("os is different");
                return true;
            } 

            if ((collectedData[i].browser != data.browser.type) && (collectedData[i].os_version != data.os.version)){
                console.log("browser is different");
                return true;
            }
        }
        i++;
    }
    return false;
}

async function collectData(data){
    const collectedData = await rds.query("SELECT * FROM users WHERE uid_firebase='"+data.uid+"' ORDER BY timestamp");
    return collectedData;
}

function getJson(str){
    return JSON.parse(str.substring(
        str.indexOf("{"),
        str.lastIndexOf("}") + 1
    ));
}


async function sendEmail(data) {
    const email = await new Promise((resolve, reject) => {
        admin.auth().getUser(data.uid)
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

async function sendPush(data){
    const rawTokens = await rds.query(`SELECT fcmToken FROM users WHERE uid_firebase='${data.uid}' AND fcmToken!='${data.fcmToken}' AND fcmToken!='undefined' AND LENGTH(fcmToken)>0`);
    let registrationTokens = [];
    for(const rawToken of rawTokens){
        registrationTokens.push(rawToken.fcmToken);
    }
    // remove duplicate tokens
    registrationTokens = Array.from(new Set(registrationTokens));
    console.log('registrationTokens: ' + registrationTokens);
    // remove incoming token b/c don't want to receive that
    // NOTE: doing again b/c sql sometimes doesn't work
    registrationTokens = registrationTokens.filter(v => v !== data.fcmToken); 

    if(registrationTokens.length > 0){
        const message = {
            tokens: registrationTokens,
            data: {
                'New login detected': `${JSON.stringify(data)}`
            }
        };

        return new Promise((resolve, reject) => {
            admin.messaging().sendMulticast(message)
                .then((response) => {
                    console.log(response.successCount + ` FCM message(s) sent successfully to ${registrationTokens.length} person(s)`);
                    resolve();
                })
                .catch(e => {
                    console.log(e);
                    reject(e);
                });
        });
    }
}