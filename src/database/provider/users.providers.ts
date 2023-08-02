import { Users, Role } from '../entities/users.entity';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: Users,
  },
  {
    provide: 'ROLE_REPOSITORY',
    useValue: Role,
  },
];
