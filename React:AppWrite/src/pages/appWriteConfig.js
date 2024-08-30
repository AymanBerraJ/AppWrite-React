import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66cef7cd0010f8227296");

export const account = new Account(client);

export default client;
