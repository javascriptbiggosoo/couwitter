export interface ICouweet {
  createdAt: CreatedAt;
  text: string;
  id: string;
  creatorId: string;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}
