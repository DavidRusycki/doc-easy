import { api } from "@/services/api.js";
import { apiNoBody } from "@/services/apiNoBody";

export default {
  loadDocuments(routeName) {
    return api('/doceasy/document/' + routeName);
  },
  deleteDocument(uuid, params) {
    return apiNoBody('/doceasy/document/delete/' + uuid, params);
  },
  createDocument(params) {
    return api('/doceasy/document/new', params);
  }
};