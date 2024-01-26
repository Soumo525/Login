import { Client, Account } from "appwrite";

const client = new Client()

    client
          .setEndpoint("https://cloud.appwrite.io/v1")
          .setProject("##")
export const account = Account(client)
export default client;