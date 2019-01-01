"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const googleapis_1 = require("googleapis");
const util_1 = require("./util");
const TOKEN_PATH = "./token.json";
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
async function authorize(options) {
    const credentials = await util_1.resolveResource(options, "credentials");
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    let resolvedToken;
    try {
        resolvedToken = await util_1.resolveResource(options, "token");
    }
    catch (err) {
        if (options.tokenPath) {
            await getLocalAccessToken(oAuth2Client);
        }
        else {
            throw err;
        }
    }
    if (resolvedToken)
        oAuth2Client.setCredentials(resolvedToken);
    return oAuth2Client;
}
exports.authorize = authorize;
async function getLocalAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES
    });
    console.log("Authorize this app by visiting this url: ", authUrl);
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, reject) => rl.question("Enter the code from that page here: ", (code) => {
        oAuth2Client.getToken(code, (err, token) => {
            if (err)
                reject(err);
            oAuth2Client.setCredentials(token);
            fs_1.default.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
                if (err)
                    reject(err);
                console.log("Token stored to", TOKEN_PATH);
            });
            resolve(oAuth2Client);
            rl.close();
        });
    }));
}
