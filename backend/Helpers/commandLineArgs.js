let videoFolder = "";

function processCommandLineArgs() {
    if (process.argv.length >= 3) {
        videoFolder = process.argv[2];
    }
    else {
        videoFolder = '../../../../media/pi/OS1/Films';
    }
}

function getVideosFolder() {
    return videoFolder;
}

module.exports = {processCommandLineArgs, getVideosFolder}