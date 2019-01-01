"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const authorize_1 = require("./authorize");
// Load client secrets from a local file.
async function fetchEvents(options) {
    return authorize_1.authorize(options).then((auth) => listEvents(auth, options)).catch(reason => { throw reason; });
}
exports.fetchEvents = fetchEvents;
function listEvents(auth, options) {
    const calendar = googleapis_1.google.calendar({ version: "v3", auth });
    return new Promise((resolve) => {
        calendar.events.list({
            calendarId: "primary",
            timeMin: (options.startDate || new Date()).toISOString(),
            maxResults: options.limit || 10,
            singleEvents: true,
            orderBy: 'starttime'
        }, (err, res) => {
            if (err) {
                throw err;
            }
            resolve(res.data.items);
        });
    });
}
exports.listEvents = listEvents;
