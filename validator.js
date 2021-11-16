export const validateClient = (client) => {
  if (!client.name) throw "Client must have a name";
  if (!client.email) throw "Client must have an email";
  if (!client.phone) throw "Client must have a phone";
}
