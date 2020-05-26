import { EMailingStatus } from './mailings/interfaces';

export const DATA = {
  mailings: [
    {
      id: 'asd123',
      name: 'The Coca-Cola Company',
      status: EMailingStatus.active,
      sendCount: 244,
      viewCount: 9823,
      clickCount: 4252,
      createdAt: Date.now().toString(),
      agent: 'Mike Rose',
      type: 'SENDING',
      data: {},
    },
  ],
  subscribers: [
    {
      username: 'Mike Rose',
      imgSrc: '',
      rule: 'rule 1',
    },
    {
      username: 'Lora Kim',
      imgSrc: '',
      rule: 'rule 1',
    },
    {
      username: 'Bob Dilan',
      imgSrc: '',
      rule: 'rule 2',
    },
    {
      username: 'Nick Rom',
      imgSrc: '',
      rule: 'rule 3',
    },
  ],
};
