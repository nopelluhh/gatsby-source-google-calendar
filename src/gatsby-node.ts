import { GatsbySourceGoogleCalendar } from "./";

import createNodeHelpers from "gatsby-node-helpers";

import { fetchEvents } from "./fetch_events";

const nodeHelpers = createNodeHelpers({ typePrefix: "GoogleCalendar" });
const { createNodeFactory } = nodeHelpers;

const EventNode = createNodeFactory("Event");

export const sourceNodes = async (gatsby: any, pluginOptions: any) => {
  const {
    actions: { createNode }
  } = gatsby;

  const {
    credentials,
    credentialsPath,
    credentialsPromise,
    token,
    tokenPath,
    tokenPromise,
    limit,
    startDate
  } = pluginOptions;

  const events = await fetchEvents({
    credentials,
    credentialsPath,
    credentialsPromise,
    token,
    tokenPath,
    tokenPromise,
    limit,
    startDate
  } as GatsbySourceGoogleCalendar.PluginOptions);

  events.map(async event => {
    const node = EventNode(event);
    createNode(node);
  });

  return;
};
