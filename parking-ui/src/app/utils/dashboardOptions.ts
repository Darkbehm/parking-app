export const dashboardKeys = [
  'vehicles',
  'parking',
  'vehicleTypes',
  'users',
] as const;

export type dashboardKeysType = typeof dashboardKeys[number];

export type dashboardOptionsType = {
  key: dashboardKeysType;
  name: string;
  role: 'admin' | 'any';
};

export const dashboardOptions: dashboardOptionsType[] = [
  {
    key: 'vehicles',
    name: 'Vehiculos',
    role: 'any',
  },
  {
    key: 'parking',
    name: 'Estacionamiento',
    role: 'any',
  },
  {
    key: 'vehicleTypes',
    name: 'Tipos de vehiculos',
    role: 'admin',
  },
  {
    key: 'users',
    name: 'Usuarios',
    role: 'admin',
  },
];
