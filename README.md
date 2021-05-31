# Overview
Live demo will showcase an example use case of client fingerprinting to alert users of new (unidentified) logins

# Services used
- [Firebase](https://console.firebase.google.com/u/0)
- [AWS](https://aws.amazon.com)
    - Lambda Function
    - Lambda Layer
    - Cloudwatch logging
    - Simple Email Service (SES)

# Local softwares needed
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html)
- [Composer](https://getcomposer.org/download/)
- PHP 7.4 (choose 1)
    - [PHP only Thread Safe](https://windows.php.net/download#php-7.4)
    - [XAMP](https://www.apachefriends.org/download.html)
- [Node.js](https://nodejs.org/en/download)

# Preqrequisite Setup
1. Configure AWS credentials and follow prompts
```cmd
aws configure
```

# Lambda backend
## Setup
1. Install dependencies
```cmd
npm i
```
2. Create `lambda/firebaseAdminCredential.json` and paste credentials you downloaded from [https://console.firebase.google.com/u/0/project/\<your project id\>/settings/serviceaccounts/adminsdk](#nolink)
3. Update database credentials in `lambda/rds.js`

## Test locally
1. Run local test
```cmd
node test.js
```

# Website
## Setup
1. Install dependencies
```cmd
composer install
```
2. Update AWS profile to your profile (typically `default`) in `src/services/logger.php`
3. Update `src/services/firebase.php` with configuration from [https://console.firebase.google.com/u/0/project/\<your project id\>/settings/general](#nolink)
4. Update `vapidKey` in `getFcmToken()` in `src/js/messaging.js` with Web Push certificate Key pair from [https://console.firebase.google.com/u/0/project/\<your project id\>/settings/cloudmessaging](#nolink)
5. Update database credentials in `src/classes/Db.php`

## Run
```cmd
php -S localhost:8000 -t ./src
```
Go to http://localhost:8000
- Note: website must be run on a live server (not locally) in order for ip capture to work

# Troubleshooting
- Error AwsCloudwatchLogging
    - Make sure to configure AWS credentials properly
- Curl SSL error
    1. Download `cacert.pem` from https://curl.se/docs/caextract.html
    - Go to PHP directory and update `curl.cainfo = <path to cacert.pem` in `php.ini`
    2. Restart PHP if using XAMP
