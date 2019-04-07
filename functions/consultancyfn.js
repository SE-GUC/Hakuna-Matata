const axios = require("axios");

const functions = {
  getAgencies: async () => {
    const agency = await axios.get(
      "http://localhost:3000/consultancyAgencies/"
    );
    return agency;
  },
  getAgency: async id => {
    const agency = await axios.get(
      "http://localhost:3000/consultancyAgencies/" + id
    );
    return agency;
  },
  addAgency: async (partnerId, data) => {
    const agency = await axios.post(
      "http://localhost:3000/consultancyAgencies/" + partnerId,
      data
    );
    return agency;
  },
  deleteAgency: async agencyId => {
    const agency = await axios.delete(
      "http://localhost:3000/consultancyAgencies/" + agencyId
    );
    return agency;
  },

  updateAgency: async (agencyId, data) => {
    const agency = await axios.put(
      "http://localhost:3000/consultancyAgencies/" + agencyId,
      data
    );
    return agency;
  },
  addReport: async (agencyId, report1) => {
    const agency = await axios.put(
      "http://localhost:3000/consultancyAgencies/addReport/" + agencyId,
      {
        report: report1
      }
    );
    return agency;
  },
  addTask: async (partnerId, data) => {
    const agency = await axios.post(
      "http://localhost:3000/tasks/" + partnerId,
      data
    );
    return agency;
  },
  getTask: async taskId => {
    const task = await axios.get("http://localhost:3000/tasks/" + taskId);
    return task;
  },
  deleteTask: async taskId => {
    const task = await axios.delete("http://localhost:3000/tasks/" + taskId);
    return task;
  },
  //momken te3mel moshkelaaaa
  feedback: async (agencyId, taskId, data) => {
    const agency = await axios.post(
      "http://localhost:3000/consultancyAgencies/feedback/" + agencyId + "/" + taskId,
      data
    );
    return agency;
  },
  showUnconsultedTasks: async () => {
    const agency = await axios.get(
      "http://localhost:3000/consultancyAgencies/UnconsultedTasks"
    );
    return agency;
  },
  showConsultedTasks: async (partnerId, taskId) => {
    const agency = await axios.get(
      "http://localhost:3000/consultancyAgencies/ConsultedTasks/" +
        partnerId +
        "/" +
        taskId
    );
    return agency;
  },
  showConsultedTask: async (partnerId, taskId, consultancyAgencyId) => {
    const agency = await axios.get(
      "http://localhost:3000/consultancyAgencies/ConsultedTask/" +
        partnerId +
        "/" +
        taskId +
        "/" +
        consultancyAgencyId
    );
    return agency;
  },
  acceptConsultedTask: async (partnerId, taskId, consultancyAgencyId) => {
    const agency = await axios.put(
      "http://localhost:3000/consultancyAgencies/acceptConsultedTask/" +
        consultancyAgencyId +
        "/" +
        partnerId +
        "/" +
        taskId
    );
    return agency;
  },
  updateConsultance: async (consultancyAgencyId, taskId, data) => {
    const agency = await axios.put(
      "http://localhost:3000/consultancyAgencies/updateConsultance/" +
        consultancyAgencyId +
        "/" +
        taskId,
      data
    );
    return agency;
  },
  deleteConsultance: async (consultancyAgencyId, taskId) => {
    const agency = await axios.delete(
      "http://localhost:3000/consultancyAgencies/consultance/" +
        consultancyAgencyId +
        "/" +
        taskId
    );
    return agency;
  }
};

module.exports = functions;
