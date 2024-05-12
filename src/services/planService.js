import { api } from "@/services/api.js";

export default {
  loadPlans() {
    return api('/doceasy/plan/all');
  },
  insert(params) {
    return api('/doceasy/plan/new', params);
  }
};