require('colors');
const fs = require('fs');

async function readLines(filename) {
    try {
        const data = await fs.promises.readFile(filename, 'utf-8');
        console.log(`Loaded proxies from ${filename}`.green);
        return data.split('\n').filter(Boolean);
    } catch (error) {
        console.error(`Failed to read ${filename}: ${error.message}`.red);
        return [];
    }
}

async function selectProxySource() {
    const filename = 'proxy.txt'; // Default custom proxy file
    console.log(`Using custom proxy file: ${filename}`.cyan);
    return { type: 'file', source: filename };
}

module.exports = { readLines, selectProxySource };