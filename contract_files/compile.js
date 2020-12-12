const path = require('path');
const fs = require('fs');

const solc = require('solc');

// resolve()	=> Resolves the specified paths into an absolute path
//__dirname gets set to the current directory.
//contracts is the folder and assetMonitor.sol is contract file
const inboxPath = path.resolve(__dirname, 'contracts', 'assetMonitor.sol');

// fs => To handle the file system.
//readFile() =>	Reads the content of a file
//readFileSync() =>	Same as readFile(), but synchronous instead of asynchronous
const source = fs.readFileSync(inboxPath, 'utf8');


const compiledScript = solc.compile(source, 1).contracts[':assetMonitor'];
// console.log(compiledScript);

// console.log(compiledScript.interface);
// console.log(compiledScript.bytecode);

//ABI INTERFACE OF CONTRACT
module.exports.abi_interface = compiledScript.interface;

//BYTECODE OF CONTRACT
module.exports.bytecode = compiledScript.bytecode;