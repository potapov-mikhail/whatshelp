export const APP_MENU_ITEMS = [
  {
    icon: 'message',
    name: 'message',
    path: '/message',
    children: [],
  },
  {
    icon: 'people',
    name: 'people',
    children: [],
    path: '/people',
  },
  {
    icon: 'send',
    name: 'mailings',
    path: '/mailings',
    children: [
      {
        name: '',
        displayName: 'Отправлены',
        path: '/mailings',
        queryParams: 'sending',
        children: [],
      },
      {
        name: '',
        displayName: 'Чернавики',
        path: '/mailings',
        queryParams: 'draft',
        children: [],
      },
      {
        name: '',
        displayName: 'Запланированы',
        path: '/mailings',
        queryParams: 'scheduled',
        children: [],
      },
    ],
  },
];
