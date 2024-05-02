import algosdk from "algosdk";

const algodToken = "a".repeat(64);
const server: string = "http://localhost";
const port: string = "4001";

const mnemonic: string =
  "win animal quiz decade stereo endless cost priority decide true away lounge roast arrange mixed dune sport kite surface box that mansion table absent album";

export function getClient(): algosdk.Algodv2 {
  let client = new algosdk.Algodv2(algodToken, server, port);
  return client;
}

export function getAccount(): algosdk.Account {
  let account = algosdk.mnemonicToSecretKey(mnemonic);
  return account;
}
