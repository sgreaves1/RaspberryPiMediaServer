function connectionStatus() {

    let mongoName = global.mongoClient.s.url;
    let isConnected = (global.mongoClient.isConnected() ? 'connected' : 'disconnected');

    return {[mongoName]: isConnected};
}

module.exports = {connectionStatus};