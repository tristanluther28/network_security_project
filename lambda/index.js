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

// algorithm goes here edit here
function isUnidentifiedUser(data){
   /* var lastData = collectLastData();

    if (lastData.login.email == data.login.email){
        console.log("email is same");
    }
    if (lastData.device.browser.name == data.device.browser.name){
        console.log("browser is same");
    }

    if ( lastData.login.uid == data.login.uid)
    {
        console.log("uid is same");

        if(lastData.login.ip != data.login.ip)
        {
            console.log("ip is different");
            return true;
        }
        if(lastData.device.deviceType != data.device.deviceType)
        {
            console.log("device type is different");
            return true;
        }
        if(lastData.location.timezone != data.location.timezone)
        {
            console.log("timezone is different");
            return true;
        }
        if(lastData.location.offset != data.location.offset)
        {
            console.log("location is different");
            return true;
        }
        if(lastData.device.os.name != data.device.os.name)
        {
            console.log("os is different");
            return true;
        } 
    }
    return false;
    */return true;
}
/*
function collectLastData(){
    var lastData = {
        "login":{
            "uid":"asdfqwerasdf",
            "email":"test@email.com",
            "ip":"127.0.0.1"
        },
        "device":{
            "cookieEnabled":true,
            "deviceMemory":8,
            "hardwareConcurrency":12,
            "language":"en-US",
            "languages":["en-US","en"],
            "platform":"Win32",
            "userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
            "deviceType":"desktop",
            "browser":{
                "name":"Chrome",
                "version":90.04430212
            },
            "os":{
                "name":"Windows",
                "version":10
            }
        },
        "canvas":{
            "renderer":"WebKit WebGL",
            "gpu":"ANGLE (Intel, Intel(R) UHD Graphics 630 Direct3D11 vs_5_0 ps_5_0, D3D11-26.20.100.7925)",
            "supportsTouch":false
        },
        "connection":{
        },
        "location":{
            "offset":420,
            "timezone":"America/Los_Angeles"
        }
    }
    

    return lastData;
}
*/

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
