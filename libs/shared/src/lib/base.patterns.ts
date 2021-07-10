enum BaseTypes {
  AUDIT= 'audit'
}
enum BaseEvents {
  JOIN = 'join',
}

export type BasePatterns = `twitch-${BaseEvents}-${BaseTypes}`;
export type AuditPatterns = `twitch-${BaseEvents}-audit`;
