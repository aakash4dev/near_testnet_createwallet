# NEAR Testnet Wallet Creator

## Introduction

This project automates the creation of NEAR protocol wallets on the testnet. Utilizing the `near-api-js` library and the `unique-names-generator` for generating unique account IDs, it simplifies the process of mass wallet creation for testing or development purposes.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- Basic familiarity with JavaScript and asynchronous programming in Node.js

### Installation

1. Clone the repository:

```bash
git clone https://github.com/aakash4dev/near_testnet_createwallet.git
cd near_testnet_createwallet
```

2. Install the required npm packages:

```bash
npm install
```

### Usage

To start creating wallets, run the script with Node.js:

```bash
node main.js
```

Replace `main.js` with the actual name of the script file.

The script is configured to create 1000 wallets by default. You can adjust the number of wallets to create by modifying the `numberOfWalletsToCreate` variable in the script.

### Configuration

The wallet creation script uses a predefined configuration for connecting to the NEAR testnet. You can modify the `nearConfig` object in the script to change network parameters if needed.

## How It Works

The script generates unique account names using a combination of adjectives, colors, and animals. It then connects to the NEAR testnet and creates a new wallet for each generated account name, saving the wallet details in two formats:
- Full account details in the `wallets` directory
- Minimal account data, which is wallet address and private key in the `wallets_min_data` directory

## Contributing

Feel free to fork the repository and submit pull requests. For major changes or issues, please open an issue first to discuss what you would like to change.

## License

none

---