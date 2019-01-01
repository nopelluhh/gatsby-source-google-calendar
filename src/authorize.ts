import fs from "fs";
import readline from "readline";
import { google } from "googleapis";
import { OAuth2Client, Credentials } from "google-auth-library";

import { resolveResource } from "./util";

const TOKEN_PATH = "./token.json";
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

export interface IAuthorizeOptions {
  tokenPromise?: Promise<Credentials>;
  token?: Credentials;
  tokenPath?: string;
}

export async function authorize(options: IAuthorizeOptions) {
  const credentials = await resolveResource(options, "credentials");
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  let resolvedToken;
  try {
    resolvedToken = await resolveResource(options, "token");
  } catch (err) {
    if (options.tokenPath) {
      await getLocalAccessToken(oAuth2Client);
    } else {
      throw err;
    }
  }

  if (resolvedToken) oAuth2Client.setCredentials(resolvedToken);

  return oAuth2Client;
}

async function getLocalAccessToken(oAuth2Client: OAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url: ", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve, reject) =>
    rl.question("Enter the code from that page here: ", (code: string) => {
      oAuth2Client.getToken(code, (err: any, token: any) => {
        if (err) reject(err);
        oAuth2Client.setCredentials(token);
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
          if (err) reject(err);
          console.log("Token stored to", TOKEN_PATH);
        });
        resolve(oAuth2Client);
        rl.close();
      });
    })
  );
}
