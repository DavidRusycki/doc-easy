import { api } from "@/services/api.js";
import { apiNoBody } from "@/services/apiNoBody";

export default {
  loadDocumentsFromPlan(routeName) {
    return api('/doceasy/document/' + routeName);
  }
};