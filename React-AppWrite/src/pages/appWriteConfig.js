import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_LINK_APPWRITE)
  .setProject(import.meta.env.VITE_PROJECT);

export const database = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);

export default {client, database, storage};
