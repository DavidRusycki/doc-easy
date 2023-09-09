import { api } from "@/services/api.js";
import { apiMerge } from "@/services/apiMerge.js";
import { apiNoBody } from "@/services/apiNoBody";

export default {
  loadDocumentsFromPlan(routeName) {
    return api('/doceasy/document/' + routeName);
  },
  sendDocuments(documents) {
    return apiMerge('/doceasy/document/', documents);
  }
};