import { google } from "googleapis";
import { authorize, IAuthorizeOptions } from "./authorize";

import { GatsbySourceGoogleCalendar } from '../src'

// Load client secrets from a local file.
export async function fetchEvents(options: IAuthorizeOptions & any): Promise<GatsbySourceGoogleCalendar.GoogleCalendarEvent[]> {
  return authorize(options).then((auth: any) => listEvents(auth, options)).catch(reason => { throw reason })
}

export function listEvents(auth: any, options: GatsbySourceGoogleCalendar.PluginOptions): Promise<GatsbySourceGoogleCalendar.GoogleCalendarEvent[]> {
  const calendar = google.calendar({ version: "v3", auth });
  return new Promise((resolve) => {
    calendar.events.list(
      {
        calendarId: "primary",
        timeMin: (options.startDate || new Date()).toISOString(),
        maxResults: options.limit || 10,
        singleEvents: true,
        orderBy: 'starttime'
      },
      (err: any, res: any) => {
        if (err) {
          throw err
        }
        resolve(res.data.items);
      }
    );
  });
}
