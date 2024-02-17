import {
    uniqueNamesGenerator,
    adjectives,
    colors,
    animals,
} from "unique-names-generator";
import * as nearAPI from "near-api-js";
const { connect } = nearAPI;
import * as fs from "fs";



const walletCreate = async (newAccountId) => {
    try {
        if (newAccountId === undefined) {
            let random = uniqueNamesGenerator({
                dictionaries: [adjectives, colors, animals],
            });
            newAccountId = random + ".testnet";
        }

        const nearConfig = {
            networkId: "testnet",
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://wallet.testnet.near.org",
            helperUrl: "https://helper.testnet.near.org",
        };

        const nearConnection = await connect(nearConfig);
        const keyPair = nearAPI.KeyPair.fromRandom("ed25519");

        let newAccount = await nearConnection.createAccount(
            newAccountId,
            keyPair.publicKey
        );

        newAccount.keypair = keyPair;

        fs.readdir("wallets", (err, files) => {
            fs.writeFileSync(
                `wallets/${files.length + 1}.json`,
                JSON.stringify(newAccount, null, 4)
            );

            fs.writeFileSync(
                `wallets_min_data/${files.length + 1}.json`,
                `{"wallet_address": "${newAccount.accountId}", "private_key": "${newAccount.keypair.secretKey}"}`
            );
        });

        console.log(newAccount);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function createNwallets(n) {
    let i = 1;
    let walletCreateSuccess;
    while (i < n) {
        console.log("creating account ", i);
        walletCreateSuccess = await walletCreate();

        if (!walletCreateSuccess) {
            console.error("wallet creation failed, retrying after a second")
            await delay(1000);
            i--
        }
        i++;
    }
}

let numberOfWalletsToCreate = 1000
createNwallets(numberOfWalletsToCreate);