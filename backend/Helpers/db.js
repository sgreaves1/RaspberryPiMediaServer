async function MongoCommand(mongoCommandFunction) {
    try {
        const client = global.mongoClient;
        let db = client.db('Movies');
        return await mongoCommandFunction(db);
    } catch (error) {
        console.log(error.stack);
    }
}

module.exports = {timedMongoCommand};