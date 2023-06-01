const { network, ethers } = require("hardhat")
const { developementChains } = require("../helper-hardhat-config")
const { networkConfig } = require("../helper-hardhat-config")
const { VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const { verify } = require("../deploy-helper/verify")

//const FUND_AMOUNT = ethers.utils.parseEther("15") // 1 Ether, or 1e18 (10^18) Wei

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const waitBlockConfirmations = developementChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    log("----------------------------------------------------")

    const SimpleStorage = await deploy("SimpleStorage", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmation: waitBlockConfirmations,
    })

    if (
        !developementChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(SimpleStorage.address, [])
    }
    log(`Contract '${SimpleStorage.address}' is deployed ....`)
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "SimpleStorage"]
