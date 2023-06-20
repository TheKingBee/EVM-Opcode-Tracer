const axios = require('axios');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

// Input validation
if (!argv.opcode || typeof argv.opcode !== 'string') {
    console.error('Error: Missing or invalid opcode.');
    process.exit(1);
}

if (!argv.months || typeof argv.months !== 'number' || argv.months <= 0) {
    console.error('Error: Missing or invalid number of months.');
    process.exit(1);
}

// Infura credentials
const projectId = process.env.INFURA_PROJECT_ID;
const projectSecret = process.env.INFURA_PROJECT_SECRET;

if (!projectId || !projectSecret) {
    console.error('Error: Missing Infura credentials. Please set INFURA_PROJECT_ID and INFURA_PROJECT_SECRET environment variables.');
    process.exit(1);
}

// Calculate the starting block (argv.months months ago)
const now = Math.floor(Date.now() / 1000);
const monthsAgo = now - (argv.months * 30 * 24 * 60 * 60);
const blocksAgo = Math.floor((monthsAgo) / 15);  // assume 15 seconds per block

// Prepare the filter
const filter = {
    fromBlock: `0x${(blocksAgo).toString(16)}`,  // hexadecimal string
    toBlock: 'latest'
};

// Make the request
axios.post(`https://mainnet.infura.io/v3/${projectId}`, {
    jsonrpc: '2.0',
    id: 1,
    method: 'trace_filter',
    params: [filter],
    auth: {
        username: projectId,
        password: projectSecret
    }
}).then(response => {
    if (response.data.result) {
        for (let trace of response.data.result) {
            if (trace.action.callType === 'call' && trace.action.input && trace.action.input.includes(argv.opcode)) {
                console.log(`Found ${argv.opcode} in transaction ${trace.transactionHash}`);
            }
        }
    } else {
        console.error('Error: No result from Infura Trace API.');
    }
}).catch(error => {
    console.error('Error querying Infura Trace API: ' + error);
});
