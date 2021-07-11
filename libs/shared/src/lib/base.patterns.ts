enum BaseTypes {
  EVENT = 'event',
  SOCKET = 'socket'
}
enum BaseEvents {
  JOIN = 'join',
  PART = 'part',
  MESSAGE = 'message',
}

export type BasePatterns = `twitch-${BaseEvents}-${BaseTypes}`;
export type EventPatterns = `twitch-${BaseEvents}-event`;
export type SocketPatterns = `twitch-${BaseEvents}-socket`;
