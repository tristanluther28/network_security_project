<?php
require "../../vendor/autoload.php";

use Aws\CloudWatchLogs\CloudWatchLogsClient;
use Maxbanton\Cwh\Handler\CloudWatch;
use Monolog\Logger;
use Monolog\Formatter\LineFormatter;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\SyslogHandler;

$logFile = "app_local.log";
$appName = "app";
$facility = "local0";

$cwClient = new CloudWatchLogsClient([
    'region' => 'us-east-1',
    'version' => 'latest',
    // 'profile' => 'default',
    // 'credentials' => 
//    'scheme' => 'http'
]);
// Log group name, will be created if none
$cwGroupName = 'fingerprinting';
// Log stream name, will be created if none
$cwStreamNameInstance = 'stream0';
// Days to keep logs, 14 by default
$cwRetentionDays = null;

$cwHandler = new CloudWatch($cwClient, $cwGroupName, $cwStreamNameInstance, $cwRetentionDays, 1, [ 'application' => 'php-testapp01' ],Logger::INFO);

$logger = new Logger('PHP Logging');

$formatter = new LineFormatter(null, null, false, true);
$syslogFormatter = new LineFormatter("%channel%: %level_name%: %message% %context% %extra%",null,false,true);
$infoHandler = new StreamHandler(__DIR__."/".$logFile, Logger::INFO);
$infoHandler->setFormatter($formatter);

$warnHandler = new SyslogHandler($appName, $facility, Logger::WARNING);
$warnHandler->setFormatter($syslogFormatter);

$cwHandler->setFormatter($formatter);

$logger->pushHandler($warnHandler);
$logger->pushHandler($infoHandler);
$logger->pushHandler($cwHandler);
?>