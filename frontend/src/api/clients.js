import { cloneDeep } from 'lodash';
import instance from './index';

export const getClients = async () => {
  const { data } = await instance.get('api/clients');
  return cloneDeep(data);
};
export const postClient = async (payload) => {
  await instance.post('api/clients', payload);
};
export const updateClient = async (id, payload) => {
  await instance.put(`api/clients/${id}`, payload);
};
export const deleteClient = async (id) => {
  await instance.delete(`api/clients/${id}`);
};
