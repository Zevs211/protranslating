import instance from "./index";

export const getClients = async () => {
  const { data } = await instance.get('api/clients')
  return data
}
export const postClient = async (payload) => {
  await instance.post('api/clients', payload)
}
export const updateClient = async (payload) => {
  await instance.put('api/clients', payload)
}
export const deleteClient = async (id) => {
  await instance.delete(`api/clients/${id}`)
}