export enum EMailingStatus {
  active = 'ACTIVE',
  inactive = 'INACTIVE',
}

export enum EMailingType {
  draft = 'DRAFT',
  sending = 'SENDING',
  scheduled = 'SCHEDULED',
}

export interface IMailing {
  id: string;
  name: string;
  status: EMailingStatus;
  sendCount: number;
  viewCount: number;
  clickCount: number;
  createdAt: string;
  agent: string;
  type: EMailingType;
  data: any;
}

export interface ISubscriber {
  username: string;
  imgSrc: string;
  rule: string;
}
