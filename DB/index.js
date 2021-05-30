const rds = require('./rds.js');
const data = {
    "deviceType": "Desktop/Laptop",
    "timezone": "America/Los_Angeles",
    "os": {
        "type": "Windows",
        "version": "10",
    },
    "browser": {
        "type": "Chrome",
        "version": "90.0"
    },
    "ip": "67.169.208.115",
    "uid": "07JzRY01roTeV9PDLywqp7RZCLh2",
    "fcmToken": "asdf"
};

main();

async function main(){
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

    var lastData = lastdata[lastdata.length - 2];

    //console.log(lastData);

    if ( lastData.uid_firebase == data.uid )
    {
        console.log("uid is same");

        if(lastData.ip != data.ip)
        {
            console.log("ip is different");
            console.log(true);
        }

        if(lastData.device_type != data.deviceType)
        {
            console.log("device type is different");
            console.log(true);
        }

        if(lastData.time_zone != data.timezone)
        {
            console.log("timezone is different");
            console.log(true);
        }

        if(lastData.os != data.os.type)
        {
            console.log("os is different");
            console.log(true);
        } 

        if ((lastData.browser != data.browser.type) && (lastData.os_version != data.os.version)){
            console.log("browser is different");
            console.log(true);
        }
    }
    console.log(false);
}