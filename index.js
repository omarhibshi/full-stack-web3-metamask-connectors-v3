const { ethers } = require("ethers")

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            console.log("We see metamask 😘️ ")
            await ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
        document.getElementById("statusLabel").innerHTML =
            "MetaMask wallet connected"
        const accounts = await ethereum.request({ method: "eth_accounts" })
        document.getElementById("walletAddressLabel").innerHTML = accounts
        console.log(accounts)
    } else {
        console.log("We don't see metamask 😭️ ")
        document.getElementById("statusLabel").innerHTML =
            "Please install MetaMask"
        document.getElementById("walletAddressLabel").innerHTML =
            "0x000000000000000000000000000000000000000"
    }
}
async function execute() {
    /**
     * @Notice To execut a function, you need the following:
     *  - ddress :
     *  - contract ABI (blueprint to interac with a contract)
     *  - function
     *  - node connection : Metamask network
     */
    if (typeof window.ethereum !== "undefined") {
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        const abi = [
            {
                inputs: [
                    {
                        internalType: "string",
                        name: "_name",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "_favoriteNumber",
                        type: "uint256",
                    },
                ],
                name: "addPerson",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "string",
                        name: "",
                        type: "string",
                    },
                ],
                name: "nameToFavoriteNumber",
                outputs: [
                    {
                        internalType: "uint256",
                        name: "",
                        type: "uint256",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "uint256",
                        name: "",
                        type: "uint256",
                    },
                ],
                name: "people",
                outputs: [
                    {
                        internalType: "uint256",
                        name: "favoriteNumber",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "retrieve",
                outputs: [
                    {
                        internalType: "uint256",
                        name: "",
                        type: "uint256",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "uint256",
                        name: "_favoriteNumber",
                        type: "uint256",
                    },
                ],
                name: "store",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
        ]
        const provider = new ethers.providers.Web3Provider(window.ethereum) // window.ethereum = RPC
        const signer = provider.getSigner() // This is going to get the connected account
        const SSContract = new ethers.Contract(contractAddress, abi, signer)
        try {
            await SSContract.store(78)
        } catch (error) {
            console.log(error)
        }
    } else {
        document.getElementById("statusLabel").innerHTML =
            "Please install MetaMask"
    }
}
module.exports = {
    connect,
    execute,
}
