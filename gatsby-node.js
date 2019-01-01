"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gatsby_node_helpers_1 = __importDefault(require("gatsby-node-helpers"));
const fetch_events_1 = require("./fetch_events");
const nodeHelpers = gatsby_node_helpers_1.default({ typePrefix: "GoogleCalendar" });
const { createNodeFactory } = nodeHelpers;
const EventNode = createNodeFactory("Event");
exports.sourceNodes = async (gatsby, pluginOptions) => {
    const { actions: { createNode } } = gatsby;
    const { credentials, credentialsPath, credentialsPromise, token, tokenPath, tokenPromise, limit, startDate } = pluginOptions;
    const events = await fetch_events_1.fetchEvents({
        credentials,
        credentialsPath,
        credentialsPromise,
        token,
        tokenPath,
        tokenPromise,
        limit,
        startDate
    });
    events.map(async (event) => {
        const node = EventNode(event);
        createNode(node);
    });
    return;
};
