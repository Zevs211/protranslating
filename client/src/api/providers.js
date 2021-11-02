import instance from "./index";

export const getProviders = async () => {
  const { data } = await instance.get('api/providers')
  return data
}

export const postProvider = async (payload) => {
  await instance.post('api/providers', payload)
}

export const updateProvider = async (payload) => {
  await instance.put('api/providers', payload)
}

export const deleteProvider = async (id) => {
  await instance.delete(`api/providers/${id}`)
}