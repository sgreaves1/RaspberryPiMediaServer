const publicIp = require('public-ip');

let videoFolder = "";
let ip = "";

async function processCommandLineArgs() {
    if (process.argv.length >= 3) {
        videoFolder = process.argv[2];
        ip = "192.168.1.110";
    }
    else {
        videoFolder = '../../../../media/pi/OS1/Films';
        ip = await publicIp.v4();
    }
}

function getVideosFolder() {
    return videoFolder;
}

function getPublicIp() {
    return ip;
}

module.exports = {processCommandLineArgs, getVideosFolder, getPublicIp}