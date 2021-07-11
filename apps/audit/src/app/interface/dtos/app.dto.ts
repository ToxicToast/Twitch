export interface HandleJoinDTO {
  channel: string;
  username: string;
}

export interface HandlePartDTO {
  channel: string;
  username: string;
}

export interface HandleMessageDTO {
  channel: string;
  username: string;
  messsage: string;
}
