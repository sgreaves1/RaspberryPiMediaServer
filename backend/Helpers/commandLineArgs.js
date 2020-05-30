const publicIp = require('public-ip');

let videoFolder = "";
let ip = "";
let key = "";

async function processCommandLineArgs() {
    if (process.argv.length >= 3) {
        videoFolder = process.argv[2];
        ip = "192.168.1.110";
        //key = "43e4a901";
        key = "d665bc3c";
    }
    else {
        videoFolder = '../../../../media/pi/OS1/Films';
        ip = await publicIp.v4();
        key = "d665bc3c";
    }
}

function getVideosFolder() {
    return videoFolder;
}

function getPublicIp() {
    return ip;
}

function getKey() {
    return key;
}

module.exports = {processCommandLineArgs, getVideosFolder, getPublicIp, getKey}