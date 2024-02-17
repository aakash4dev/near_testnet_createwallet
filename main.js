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
                `${newAccount.accountId} 
  ${newAccount.keypair.secretKey}`
            );
        });

        console.log(newAccount);
        return true;
    } catch (error) {
        return false;
    }
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// create 10000 wallets for testing
async function createNwallets(n) {
    let i = 1;
    let walletCreateSuccess;
    while (i < n) {
        console.log("creating account ", i);
        walletCreateSuccess = await walletCreate();

        if (!walletCreateSuccess) {
            // wait 5 minutes if request limit exceeded
            await delay(5 * 60 * 1000);
        }

        await delay(2 * 60 * 1000); // create account in every minute [ request should not exceed]
        i++;
    }

    // after deployment success build "call function of smart contract" part below
}
createNwallets(1000);
// walletCreate(); // optional name input