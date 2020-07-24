const options = [
  {
    key: 'user',
    label: 'Usuário',
    leftIcon: 'ion-android-people',

    children: [
      {
        key: 'add-user',
        label: 'Adicionar',
      },
      {
        key: 'list-user',
        label: 'Listar',
      },
    ],
  },
  {
    key: 'client',
    label: 'Cliente',
    leftIcon: 'ion-ios-people',

    children: [
      {
        key: 'add-client',
        label: 'Adicionar',
      },
      {
        key: 'list-client',
        label: 'Listar',
      },
    ],
  },
  {
    key: 'plans',
    label: 'Planos',
    leftIcon: 'ion-android-document',

    children: [
      {
        key: 'add-plans',
        label: 'Adicionar',
      },
      {
        key: 'list-plans',
        label: 'Listar',
      },
    ],
  },
  {
    key: 'bike',
    label: 'Bicicleta',
    leftIcon: 'ion-android-bicycle',

    children: [
      {
        key: 'add-bike',
        label: 'Adicionar',
      },
      {
        key: 'list-bike',
        label: 'Listar',
      },
    ],
  },
  {
    key: 'hangtags',
    label: 'Etiqueta',
    leftIcon: 'ion-ios-pricetag',

    children: [
      {
        key: 'add-hangtags',
        label: 'Adicionar',
      },
      {
        key: 'list-hangtags',
        label: 'Listar',
      },
    ],
  },
  
];
export default options;
