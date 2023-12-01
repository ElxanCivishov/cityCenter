import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const createContact = async (contact) => {
  const response = await axios.post(`${base_url}contact`, contact);
  return response.data;
};

const getContacts = async () => {
  const response = await axios.get(`${base_url}contact`);
  return response.data;
};

const getContact = async (id) => {
  const response = await axios.get(`${base_url}contact/${id}`);
  return response.data;
};

const deleteContact = async ({ id }) => {
  const response = await axios.delete(`${base_url}contact/${id}`);
  return response.data;
};

const contactService = {
  getContacts,
  createContact,
  getContact,
  deleteContact,
};

export default contactService;
