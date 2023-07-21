export interface ICouweet {
  createdAt: CreatedAt;
  text: string;
  id: string;
  creatorId: string;
  attachmentUrl: string;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}
