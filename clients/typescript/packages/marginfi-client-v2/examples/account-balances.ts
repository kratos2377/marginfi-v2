import { Connection } from "@solana/web3.js";
import {
  AccountType,
  getConfig,
  MarginfiClient,
  NodeWallet,
  shortenAddress,
} from "../src";
import MarginfiAccount, { MarginRequirementType } from "../src/account";

async function main() {
  const connection = new Connection(
    "https://devnet.genesysgo.net/",
    "confirmed"
  );
  const wallet = NodeWallet.local();
  const config = await getConfig("devnet1");
  const client = await MarginfiClient.fetch(config, wallet, connection);

  const programAddresses = await client.getAllProgramAccountAddresses(
    AccountType.MarginfiGroup
  );
  console.log(programAddresses.map((key) => key.toBase58()));

  const marginfiAccount = await MarginfiAccount.fetch(
    "D3fKdP5zUPVGxtkGG5VXFxymcGpG71Nz5WskM6UhX2kD",
    client
  );

  const group = marginfiAccount.group;

  const bankLabel1 = "SOL";
  const bank1 = group.getBankByLabel(bankLabel1);
  if (!bank1) throw Error(`${bankLabel1} bank not found`);

  const bankLabel2 = "USDC";
  const bank2 = group.getBankByLabel(bankLabel2);
  if (!bank2) throw Error(`${bankLabel2} bank not found`);

  marginfiAccount.lendingAccount.forEach((balance) => {
    const bank = group.banks.get(balance.bankPk.toString())!;
    const [assets, liabs] = balance.getUsdValue(
      bank,
      MarginRequirementType.Equity
    );

    console.log(
      "Balance for %s (%s) deposits: %s, borrows: %s",
      shortenAddress(bank.mint),
      shortenAddress(balance.bankPk),
      assets,
      liabs
    );
  });
}

main();