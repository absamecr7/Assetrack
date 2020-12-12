import web3 from './web3';

const address = '<Contract address>';

const abi = [
	{
		constant: true,
		inputs: [{ name: 'tokenID', type: 'string' }],
		name: 'getDataHash',
		outputs: [{ name: '', type: 'string' }],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [{ name: 'tokenID', type: 'string' }],
		name: 'getDetails',
		outputs: [
			{
				components: [
					{ name: 'dataHash', type: 'string' },
					{ name: 'ipfsHash', type: 'string' }
				],
				name: '',
				type: 'tuple'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'no_of_assets',
		outputs: [{ name: '', type: 'uint256' }],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{ name: 'tokenID', type: 'string' },
			{ name: 'dataHash', type: 'string' },
			{ name: 'ipfsHash', type: 'string' }
		],
		name: 'addToken',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'getDashBoard',
		outputs: [{ name: '', type: 'string' }],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [{ name: 'tokenID', type: 'string' }],
		name: 'getIpfsHash',
		outputs: [{ name: '', type: 'string' }],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [{ name: '', type: 'uint256' }],
		name: 'dashBoard',
		outputs: [{ name: '', type: 'string' }],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{ name: 'tokenID', type: 'string' },
			{ name: 'newIpfsHash', type: 'string' }
		],
		name: 'changeIpfsHash',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: true,
		inputs: [{ name: '', type: 'uint256' }],
		name: 'Tokens',
		outputs: [{ name: '', type: 'string' }],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'getAllActions',
		outputs: [{ name: '', type: 'string[]' }],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{ name: 'tokenID', type: 'string' },
			{ name: 'newDataHash', type: 'string' }
		],
		name: 'changeDataHash',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: false,
		inputs: [{ name: 'message', type: 'string' }],
		name: 'addToDashBoard',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'administrator',
		outputs: [{ name: '', type: 'address' }],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{ inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' }
];

export default new web3.eth.Contract(abi, address);
