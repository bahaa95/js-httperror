import { statusesInfo } from './statusesInfo';
import { Status } from './types';

export const statuses = Object.values(statusesInfo).reduce((accumulator, status) => {
  return { ...accumulator, [status.name]: status.status };
}, {}) as Status;
