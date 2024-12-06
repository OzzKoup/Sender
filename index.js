
require('colors');
const Sender = require('./src/Sender');
const Config = require('./src/Configuration');
const { readLines, selectProxySource } = require('./src/Proxy');
async function main() {
    const config = new Config();
    const sender = new Sender(config);
    const proxySource = await selectProxySource();
    const proxies = await readLines(proxySource.source);
    if (proxies.length === 0) {
        console.error('No proxies found in proxy.txt. Exiting...'.red);
        return;
    }
    console.log(`Loaded ${proxies.length} proxies`.green);
    const userIDs = await readLines('uid.txt');
    if (userIDs.length === 0) {
        console.error('No user IDs found in uid.txt. Exiting...'.red);
        return;
    }

    console.log(`Loaded ${userIDs.length} user IDs\n`.green);

    const connectionPromises = userIDs.flatMap((userID) =>
        proxies.map((proxy) => bot.connectToProxy(proxy, userID))
    );

    await Promise.all(connectionPromises);
}

main().catch(console.error);