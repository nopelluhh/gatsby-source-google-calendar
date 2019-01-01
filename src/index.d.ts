import { Credentials } from "google-auth-library";
import "./temporary-types";

export namespace GatsbySourceGoogleCalendar {
  export interface PluginOptions {
    credentials?: any;
    credentialsPath?: string;
    credentialsPromise?: Promise<any>
    tokenPromise?: Promise<Credentials>;
    token?: Credentials;
    tokenPath?: string;
    limit?: number,
    startDate?: Date
  }

  export interface GoogleCalendarEvent {
    kind: string;
    etag: string;
    id: string;
    status: string;
    htmlLink: string;
    created: Date;
    updated: Date;
    summary: string;
    description: string;
    colorId: string;
    creator: {
      email: string;
      displayName: string;
      self: true;
    };
    organizer: {
      email: string;
      displayName: string;
      self: true;
    };
    start: {
      dateTime: string;
      timeZone: string;
    };
    end: {
      dateTime: string;
      timeZone: string;
    };
    recurringEventId?: string;
    originalStartTime: {
      dateTime: string;
      timeZone: string;
    };
    iCalUID: string;
    sequence: 2;
    extendedProperties: any,
    reminders: any
  }
}
