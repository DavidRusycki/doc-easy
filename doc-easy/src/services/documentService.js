import { api } from "@/services/api.js";

export default {
  loadDocuments(routeName) {
    return api('/doceasy/document/' + routeName);
  },
  deleteDocument(uuid) {
    return api('/doceasy/document/delete/' + uuid, params);
  },
  deleteDocument(params) {
    return api('/doceasy/document/new', params);
  }
};