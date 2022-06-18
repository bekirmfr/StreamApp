require("dotenv").config();
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
export const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "shareAmount",
        type: "uint16"
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "poolId",
        type: "uint32"
      }
    ],
    name: "BuyShare",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "poolId",
        type: "uint32"
      },
      {
        indexed: false,
        internalType: "address",
        name: "entity",
        type: "address"
      }
    ],
    name: "CancelBuy",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "collectionId",
        type: "uint256"
      }
    ],
    name: "Create",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "depositId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "depositAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "poolId",
        type: "uint256"
      }
    ],
    name: "DepositReceived",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "poolId",
        type: "uint32"
      },
      {
        indexed: false,
        internalType: "address",
        name: "relayer",
        type: "address"
      }
    ],
    name: "PoolReady",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "poolId",
        type: "uint32"
      },
      {
        indexed: false,
        internalType: "address",
        name: "relayer",
        type: "address"
      }
    ],
    name: "PoolSigned",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32"
      }
    ],
    name: "RoleAdminChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "RoleGranted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "RoleRevoked",
    type: "event"
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "RELAYER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      },
      {
        internalType: "uint16",
        name: "_collectionShareLimit",
        type: "uint16"
      },
      {
        internalType: "uint16",
        name: "_poolShareLimit",
        type: "uint16"
      },
      {
        internalType: "bool",
        name: "_isWhitelisted",
        type: "bool"
      }
    ],
    name: "activate",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      },
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      }
    ],
    name: "addCostPair",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      }
    ],
    name: "addPool",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      },
      {
        internalType: "uint16",
        name: "_shareAmount",
        type: "uint16"
      }
    ],
    name: "buy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_collectionId",
        type: "uint32"
      }
    ],
    name: "cancelBuy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "collectionId",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string"
      },
      {
        internalType: "address",
        name: "_relayer",
        type: "address"
      },
      {
        internalType: "contract IERC20",
        name: "_costToken",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_costAmount",
        type: "uint256"
      },
      {
        internalType: "uint16",
        name: "_totalShares",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_feeNumerator",
        type: "uint256"
      },
      {
        internalType: "uint32",
        name: "_feeDenominator",
        type: "uint32"
      },
      {
        internalType: "uint16",
        name: "_maxPools",
        type: "uint16"
      },
      {
        internalType: "uint32",
        name: "_minDepositDuration",
        type: "uint32"
      }
    ],
    name: "create",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      }
    ],
    name: "deleteCostPairs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      }
    ],
    name: "getCollection",
    outputs: [
      {
        components: [
          {
            internalType: "uint16",
            name: "id",
            type: "uint16"
          },
          {
            internalType: "bytes32",
            name: "name",
            type: "bytes32"
          },
          {
            internalType: "address",
            name: "relayer",
            type: "address"
          },
          {
            internalType: "uint32",
            name: "activePool",
            type: "uint32"
          },
          {
            internalType: "uint16",
            name: "totalShares",
            type: "uint16"
          },
          {
            internalType: "uint16",
            name: "collectionShareLimit",
            type: "uint16"
          },
          {
            internalType: "uint16",
            name: "poolShareLimit",
            type: "uint16"
          },
          {
            internalType: "bool",
            name: "isWhitelisted",
            type: "bool"
          },
          {
            internalType: "bool",
            name: "status",
            type: "bool"
          },
          {
            internalType: "uint256",
            name: "feeNumerator",
            type: "uint256"
          },
          {
            internalType: "uint32",
            name: "feeDenominator",
            type: "uint32"
          },
          {
            internalType: "uint16",
            name: "maxPools",
            type: "uint16"
          },
          {
            internalType: "uint32",
            name: "minDepositDuration",
            type: "uint32"
          }
        ],
        internalType: "struct Collection",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      }
    ],
    name: "getCostPairs",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          }
        ],
        internalType: "struct Pair[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_depositId",
        type: "uint32"
      }
    ],
    name: "getDeposit",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "entity",
            type: "address"
          },
          {
            internalType: "uint16",
            name: "collectionId",
            type: "uint16"
          },
          {
            internalType: "uint32",
            name: "poolId",
            type: "uint32"
          },
          {
            internalType: "address",
            name: "token",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          },
          {
            internalType: "uint16",
            name: "shares",
            type: "uint16"
          }
        ],
        internalType: "struct Deposit",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_poolId",
        type: "uint32"
      }
    ],
    name: "getPool",
    outputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "id",
            type: "uint32"
          },
          {
            internalType: "uint32",
            name: "collectionId",
            type: "uint32"
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256"
          },
          {
            internalType: "uint16",
            name: "shareSum",
            type: "uint16"
          },
          {
            internalType: "bool",
            name: "isDeployed",
            type: "bool"
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "description",
                type: "bytes32"
              },
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32"
              },
              {
                internalType: "bytes32",
                name: "txHash",
                type: "bytes32"
              }
            ],
            internalType: "struct Signature",
            name: "signature",
            type: "tuple"
          }
        ],
        internalType: "struct Pool",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      }
    ],
    name: "getPoolCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      }
    ],
    name: "getPools",
    outputs: [
      {
        internalType: "uint32[]",
        name: "",
        type: "uint32[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      }
    ],
    name: "getRemainingShares",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      }
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      },
      {
        internalType: "string",
        name: "_name",
        type: "string"
      },
      {
        internalType: "address",
        name: "_relayer",
        type: "address"
      },
      {
        internalType: "uint16",
        name: "_totalShares",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "_feeNumerator",
        type: "uint256"
      },
      {
        internalType: "uint32",
        name: "_feeDenominator",
        type: "uint32"
      },
      {
        internalType: "uint16",
        name: "_maxPools",
        type: "uint16"
      },
      {
        internalType: "uint32",
        name: "_minDepositDuration",
        type: "uint32"
      }
    ],
    name: "set",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      },
      {
        internalType: "uint16",
        name: "_collectionShareLimit",
        type: "uint16"
      },
      {
        internalType: "uint16",
        name: "_poolShareLimit",
        type: "uint16"
      },
      {
        internalType: "bool",
        name: "_isWhitelisted",
        type: "bool"
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool"
      }
    ],
    name: "set2",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      },
      {
        internalType: "uint32",
        name: "_poolId",
        type: "uint32"
      }
    ],
    name: "setActivePool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      },
      {
        internalType: "address[]",
        name: "_blacklistedAddresses",
        type: "address[]"
      },
      {
        internalType: "bool",
        name: "_setValue",
        type: "bool"
      }
    ],
    name: "setBlacklist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      },
      {
        internalType: "address",
        name: "_relayer",
        type: "address"
      }
    ],
    name: "setRelayer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool"
      }
    ],
    name: "setStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_collectionId",
        type: "uint16"
      },
      {
        internalType: "address[]",
        name: "_whitelistedAddresses",
        type: "address[]"
      },
      {
        internalType: "bool",
        name: "_setValue",
        type: "bool"
      }
    ],
    name: "setWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_poolId",
        type: "uint32"
      },
      {
        internalType: "bytes32",
        name: "_description",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "_data",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "_txHash",
        type: "bytes32"
      }
    ],
    name: "sign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
