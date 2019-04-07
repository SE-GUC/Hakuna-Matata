const funcs = require("../functions/consultancyfn");
jest.setTimeout(1800000);
test("getAgencies  exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.getAgencies)).toBe("function");
});
test("getAgency  exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.getAgency)).toBe("function");
});
test("addAgency exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.addAgency)).toBe("function");
});
test("deleteAgency exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.deleteAgency)).toBe("function");
});
test("updateAgency exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.updateAgency)).toBe("function");
});
test("addReport exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.addReport)).toBe("function");
});
test("feedback exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.feedback)).toBe("function");
});
test("showUnconsultedTasks exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.showUnconsultedTasks)).toBe("function");
});
test("showConsultedTasks exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.showConsultedTasks)).toBe("function");
});
test("showConsultedTask exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.showConsultedTask)).toBe("function");
});
test("acceptConsultedTask exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.acceptConsultedTask)).toBe("function");
});
test("updateConsultance exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.updateConsultance)).toBe("function");
});
test("deleteConsultance exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.deleteConsultance)).toBe("function");
});

test("get all consultancy agencies", async () => {
  try {
    expect.assertions(2);
    const response = await funcs.getAgencies();
    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
    console.log("No consultancy agency found");
  }
});
test("length will increase by 1 if we inserted a new agency and checking inserted agency parameters", async () => {
  expect.assertions(6);
  const agency = {
    name: "agency3",
    information: "info3",
    partners: ["partner2", "partner3"],
    members: ["mem4", "mem5"],
    reports: ["rep5", "rep2"]
  };
  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agencies1 = await funcs.getAgencies();
  const length = agencies1.data.data.length;
  const response = await funcs.addAgency(partnerId, agency);
  const agencies2 = await funcs.getAgencies();
  const id = response.data.data._id;
  const createdAgency = await funcs.getAgency(id);
  expect(agencies2.data.data.length).toEqual(length + 1);
  expect(response.data.data.name).toEqual(createdAgency.data.data.name);
  expect(response.data.data.information).toEqual(createdAgency.data.data.information);
  expect(response.data.data.partners).toEqual(createdAgency.data.data.partners);
  expect(response.data.data.members).toEqual(createdAgency.data.data.members);
  expect(response.data.data.reports).toEqual(createdAgency.data.data.reports);
  await funcs.deleteAgency(id);
});

test("create agency with wrong validation", async () => {
  const agency = {
    name: "agency3",
    information: "info3",
    partners: 123,
    members: ["mem4", "mem5"],
    reports: ["rep5", "rep2"]
  };
  const partnerId = "5c9cfc970a93cf1638d22ddd";
  try {
    await funcs.addAgency(partnerId, agency);
    expect.assertions(1);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});
test("get a specific agency", async () => {
  expect.assertions(5);
  const agency = {
    name: "agency3",
    information: "info3",
    partners: ["partner2", "partner3"],
    members: ["mem4", "mem5"],
    reports: ["rep5", "rep2"]
  };
  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const consultancy = await funcs.addAgency(partnerId, agency);
  const id = consultancy.data.data._id;
  const response = await funcs.getAgency(id);
  expect(response.data.data.name).toEqual(consultancy.data.data.name);
  expect(response.data.data.information).toEqual(
    consultancy.data.data.information
  );
  expect(response.data.data.partners).toEqual(consultancy.data.data.partners);
  expect(response.data.data.members).toEqual(consultancy.data.data.members);
  expect(response.data.data.reports).toEqual(consultancy.data.data.reports);
  await funcs.deleteAgency(id);
});
test("trying to get a not exist agency", async () => {
  try {
    const id = "balabizo123";
    await funcs.getAgency(id);
    expect.assertions(1);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});

test("when deleting consultancy agency the length will decrase by one and check for the deleted task parameters", async () => {
  expect.assertions(6);
  const agencyToDelete = {
    name: "agency to be deleted",
    information: "infoooo",
    partners: ["partner500", "partner3000"],
    members: ["deleted012c", "deleted015c"],
    reports: ["rep5", "rep2"]
  };
  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const consultancy = await funcs.addAgency(partnerId, agencyToDelete);
  agencyToDelete.partners.push(partnerId);
  const id = consultancy.data.data._id;
  const agenciesBeforeDelete = await funcs.getAgencies();
  const length1 = agenciesBeforeDelete.data.data.length;
  const response = await funcs.deleteAgency(id);
  const agenciesAfterDelete = await funcs.getAgencies();
  const length2 = agenciesAfterDelete.data.data.length;
  expect(length2).toEqual(length1 - 1);
  expect(response.data.data.name).toEqual(agencyToDelete.name);
  expect(response.data.data.information).toEqual(agencyToDelete.information);
  expect(response.data.data.partners).toEqual(agencyToDelete.partners);
  expect(response.data.data.members).toEqual(agencyToDelete.members);
  expect(response.data.data.reports).toEqual(agencyToDelete.reports);
});
test("trying to delete a not exist consultancy agency", async () => {
  const id = "5c9cfc970a93cf1638d22ddl";
  try {
    await funcs.deleteAgency(id);
    expect.assertions(1);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});

test("check for updated consultancy agency parameters", async () => {
  expect.assertions(5);
  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agencyToUpdate = {
    name: "agency to be updated",
    information: "info3",
    partners: ["partner100000", "partner3"],
    members: ["mem0", "mem5"],
    reports: ["rep100000000000", "rep2"]
  };
  const infoToUpdate = {
    name: "agency updated successfully",
    reports: ["reportupdated"]
  };
  const afterUpdate = {
    name: "agency updated successfully",
    information: "info3",
    partners: ["partner100000", "partner3", partnerId],
    members: ["mem0", "mem5"],
    reports: ["reportupdated"]
  };
  const consultancy = await funcs.addAgency(partnerId, agencyToUpdate);
  const agencyId = consultancy.data.data._id;
  const response = await funcs.updateAgency(agencyId, infoToUpdate);
  expect(response.data.data.name).toEqual(afterUpdate.name);
  expect(response.data.data.information).toEqual(afterUpdate.information);
  expect(response.data.data.partners).toEqual(afterUpdate.partners);
  expect(response.data.data.members).toEqual(afterUpdate.members);
  expect(response.data.data.reports).toEqual(afterUpdate.reports);
  await funcs.deleteAgency(agencyId);
});

test("trying to update not exist consultancy agency", async () => {
  const infoToUpdate = {
    name: "agency updated successfully",
    reports: ["reportupdated"]
  };
  const agencyId = "balabizo";
  try {
    await funcs.updateAgency(agencyId, infoToUpdate);
    expect.assertions(1);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});

test("check for updated consultancy agency parameters", async () => {
  expect.assertions(5);
  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agencyToUpdate = {
    name: "agency to be updated",
    information: "info3",
    partners: ["partner100000", "partner3"],
    members: ["mem0", "mem5"],
    reports: ["rep100000000000", "rep2"]
  };
  const infoToUpdate = {
    name: 12,
    reports: ["reportupdated"]
  };
  const consultancy = await funcs.addAgency(partnerId, agencyToUpdate);
  const agencyId = consultancy.data.data._id;
  try {
    await funcs.updateAgency(agencyId, infoToUpdate);
    expect.assertions(1);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
  await funcs.deleteAgency(agencyId);
});
test("when inserting a report the length of array reports in consultancy agency will increase and check for it's value", async () => {
  expect.assertions(7);
  const agencyToUpdate = {
    name: "agencty to be updated",
    information: "infoooo",
    partners: ["partner500", "partner3000"],
    members: ["updated012c", "updated"],
    reports: ["rep5", "rep2"]
  };
  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const consultancy = await funcs.addAgency(partnerId, agencyToUpdate);
  const agencyId = consultancy.data.data._id;
  const report = "report added";
  const res1 = await funcs.getAgency(agencyId);
  const len = res1.data.data.reports.length;
  const response = await funcs.addReport(agencyId, report);
  consultancy.data.data.reports.push(report);
  expect(response.data.data.reports.length).toEqual(len + 1);
  expect(
    response.data.data.reports[response.data.data.reports.length - 1]
  ).toEqual(report);
  expect(response.data.data.name).toEqual(consultancy.data.data.name);
  expect(response.data.data.information).toEqual(
    consultancy.data.data.information
  );
  expect(response.data.data.partners).toEqual(consultancy.data.data.partners);
  expect(response.data.data.members).toEqual(consultancy.data.data.members);
  expect(response.data.data.reports).toEqual(consultancy.data.data.reports);
  await funcs.deleteAgency(agencyId);
});

test("trying to insert a report  in a not exist consultancy agency", async () => {
  const report = "report added";
  const agencyId = "balabizo";
  try {
    await funcs.addReport(agencyId, report);
    expect.assertions(1);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});

test("creating a consualtance for a certain task ", async () => {
  expect.assertions(7);
  const consultancy = {
    name: "agency to consult",
    information: "infoooo",
    partners: ["partner500", "partner3000"],
    members: ["updated012c", "updated"],
    reports: ["rep5", "rep2"]
  };
  const task = {
    description: "desc2",
    consultyNeeded: true,
    deadline: "2016-02-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2,
    monetaryCompensation: 20222,
    requiredSkills: ["cs", "marketing"]
  };
  const consultance = {
    description: "desccons33",
    deadline: "2016-04-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2,
    monetaryCompensation: 9000,
    requiredSkills: ["cs", "design"]
  };
  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agency = await funcs.addAgency(partnerId, consultancy);
  const agencyId = agency.data.data._id;
  const taskCreated = await funcs.addTask(partnerId, task);
  const taskId = await taskCreated.data.data._id;
  const consult = await funcs.feedback(agencyId, taskId, consultance);
  expect(consult.data.data._id).toEqual(taskId);
  expect(
    consult.data.data.consultanciesDone[
      consult.data.data.consultanciesDone.length - 1
    ].description
  ).toEqual(consultance.description);
  expect(
    consult.data.data.consultanciesDone[
      consult.data.data.consultanciesDone.length - 1
    ].commitLevel
  ).toEqual(consultance.commitLevel);
  expect(
    consult.data.data.consultanciesDone[
      consult.data.data.consultanciesDone.length - 1
    ].experienceLevel
  ).toEqual(consultance.experienceLevel);
  expect(
    consult.data.data.consultanciesDone[
      consult.data.data.consultanciesDone.length - 1
    ].monetaryCompensation
  ).toEqual(consultance.monetaryCompensation);
  expect(
    consult.data.data.consultanciesDone[
      consult.data.data.consultanciesDone.length - 1
    ].requiredSkills
  ).toEqual(consultance.requiredSkills);
  expect(
    consult.data.data.consultanciesDone[
      consult.data.data.consultanciesDone.length - 1
    ].deadline
  ).toEqual(consultance.deadline);
  await funcs.deleteTask(taskId);
  await funcs.deleteAgency(agencyId);
});

test("trying to create a consualtance for a not exist task ", async () => {
  const consultancy = {
    name: "agency to consult",
    information: "infoooo",
    partners: ["partner500", "partner3000"],
    members: ["updated012c", "updated"],
    reports: ["rep5", "rep2"]
  };
  const consultance = {
    description: "desccons33",
    deadline: "2016-04-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2,
    monetaryCompensation: 9000,
    requiredSkills: ["cs", "design"]
  };
  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agency = await funcs.addAgency(partnerId, consultancy);
  const agencyId = agency.data.data._id;
  const taskId = "balabizo1234";
  try {
    await funcs.feedback(agencyId, taskId, consultance);
    expect.assertions(1);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
  await funcs.deleteAgency(agencyId);
});

test("create a consualtance for a task with wrong validations", async () => {
  const consultancy = {
    name: "agency to consult",
    information: "infoooo",
    partners: ["partner500", "partner3000"],
    members: ["updated012c", "updated"],
    reports: ["rep5", "rep2"]
  };
  const task = {
    description: "desc2",
    consultyNeeded: true,
    deadline: "2016-02-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2,
    monetaryCompensation: 20222,
    requiredSkills: ["cs", "marketing"]
  };
  const consultance = {
    description: "desccons33",
    deadline: "2016-04-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2
  };
  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agency = await funcs.addAgency(partnerId, consultancy);
  const agencyId = agency.data.data._id;
  const taskCreated = await funcs.addTask(partnerId, task);
  const taskId = await taskCreated.data.data._id;
  try {
    await funcs.feedback(agencyId, taskId, consultance);
    expect.assertions(1);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
  await funcs.deleteTask(taskId);
  await funcs.deleteAgency(agencyId);
});

test("trying to create a consualtance for a task that doesn't need consultance ", async () => {
  const consultancy = {
    name: "agency to consult",
    information: "infoooo",
    partners: ["partner500", "partner3000"],
    members: ["updated012c", "updated"],
    reports: ["rep5", "rep2"]
  };
  const task = {
    description: "desc2",
    consultyNeeded: false,
    deadline: "2016-02-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2,
    monetaryCompensation: 20222,
    requiredSkills: ["cs", "marketing"]
  };
  const consultance = {
    description: "desccons33",
    deadline: "2016-04-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2,
    monetaryCompensation: 9000,
    requiredSkills: ["cs", "design"]
  };
  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agency = await funcs.addAgency(partnerId, consultancy);
  const agencyId = agency.data.data._id;
  const taskCreated = await funcs.addTask(partnerId, task);
  const taskId = await taskCreated.data.data._id;
  try {
    await funcs.feedback(agencyId, taskId, consultance);
    expect.assertions(1);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
  await funcs.deleteTask(taskId);
  await funcs.deleteAgency(agencyId);
});

test("get all unconsulted tasks", async () => {
  try {
    expect.assertions(2);
    const response = await funcs.showUnconsultedTasks();
    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
    console.log("No consultancy agency found");
  }
});

test("show consultancies for a certain task", async () => {
  expect.assertions(7);
  const consultancy = {
    name: "agency to consult",
    information: "infoooo",
    partners: ["partner500", "partner3000"],
    members: ["updated012c", "updated"],
    reports: ["rep5", "rep2"]
  };
  const task = {
    description: "desc1000",
    consultyNeeded: true,
    deadline: "2016-02-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2,
    monetaryCompensation: 20222,
    requiredSkills: ["cs", "marketing"]
  };
  const consultance1 = {
    description: "desccons33",
    deadline: "2016-05-12T00:00:00.000Z",
    commitLevel: 2,
    experienceLevel: 5,
    monetaryCompensation: 2000000,
    requiredSkills: ["cs", "design"]
  };
  const consultance2 = {
    description: "desccons22",
    deadline: "2016-05-25T00:00:00.000Z",
    commitLevel: 1,
    experienceLevel: 2,
    monetaryCompensation: 2000100,
    requiredSkills: ["cs", "design"]
  };

  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agency = await funcs.addAgency(partnerId, consultancy);
  const agencyId = agency.data.data._id;
  const taskCreated = await funcs.addTask(partnerId, task);
  const taskId = await taskCreated.data.data._id;
  await funcs.feedback(agencyId, taskId, consultance1);
  await funcs.feedback(agencyId, taskId, consultance2);
  const consulted = await funcs.showConsultedTasks(partnerId, taskId);
  expect(consulted.data.data.length).toEqual(2);
  expect(consulted.data.data[0].description).toEqual(consultance1.description);
  expect(consulted.data.data[0].deadline).toEqual(consultance1.deadline);
  expect(consulted.data.data[0].commitLevel).toEqual(
    consultance1.commitLevel
  );
  expect(consulted.data.data[1].experienceLevel).toEqual(
    consultance2.experienceLevel
  );
  expect(consulted.data.data[1].monetaryCompensation).toEqual(
    consultance2.monetaryCompensation
  );
  expect(consulted.data.data[1].requiredSkills).toEqual(
    consultance2.requiredSkills
  );
  await funcs.deleteTask(taskId);
  await funcs.deleteAgency(agencyId);
});

test("trying to show consultancies for a not exist certain task", async () => {
  try {
    const agencyId = "5c9d109c503e9211ffcae4de";
    const taskId = "balabizo1234";
    await funcs.showConsultedTasks(agencyId, taskId);
    expect.assertions(1);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});

test("show certain consultance for a certain task", async () => {
  expect.assertions(6);
  const consultancy = {
    name: "agency to consult",
    information: "infoooo",
    partners: ["partner500", "partner3000"],
    members: ["updated012c", "updated"],
    reports: ["rep5", "rep2"]
  };
  const task = {
    description: "desc2",
    consultyNeeded: true,
    deadline: "2016-02-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2,
    monetaryCompensation: 20222,
    requiredSkills: ["cs", "marketing"]
  };

  const consultance = {
    description: "desccons22",
    deadline: "2016-05-25T00:00:00.000Z",
    commitLevel: 1,
    experienceLevel: 2,
    monetaryCompensation: 2000100,
    requiredSkills: ["cs", "design"]
  };

  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agency = await funcs.addAgency(partnerId, consultancy);
  const agencyId = agency.data.data._id;
  const taskCreated = await funcs.addTask(partnerId, task);
  const taskId = await taskCreated.data.data._id;
  await funcs.feedback(agencyId, taskId, consultance);
  const consulted = await funcs.showConsultedTask(partnerId, taskId, agencyId);
  expect(consulted.data.data.description).toEqual(consultance.description);
  expect(consulted.data.data.deadline).toEqual(consultance.deadline);
  expect(consulted.data.data.commitLevel).toEqual(consultance.commitLevel);
  expect(consulted.data.data.experienceLevel).toEqual(
    consultance.experienceLevel
  );
  expect(consulted.data.data.monetaryCompensation).toEqual(
    consultance.monetaryCompensation
  );
  expect(consulted.data.data.requiredSkills).toEqual(
    consultance.requiredSkills
  );
  await funcs.deleteTask(taskId);
  await funcs.deleteAgency(agencyId);
});

test("trying to show a not exist consultance for a certain task", async () => {
  const consultancy = {
    name: "agency to consult",
    information: "infoooo",
    partners: ["partner500", "partner3000"],
    members: ["updated012c", "updated"],
    reports: ["rep5", "rep2"]
  };
  const task = {
    description: "desc2",
    consultyNeeded: true,
    deadline: "2016-02-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2,
    monetaryCompensation: 20222,
    requiredSkills: ["cs", "marketing"]
  };

  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agency = await funcs.addAgency(partnerId, consultancy);
  const agencyId = agency.data.data._id;
  const taskCreated = await funcs.addTask(partnerId, task);
  const taskId = await taskCreated.data.data._id;
  try {
    await funcs.showConsultedTask(
      partnerId,
      taskId,
      agencyId
    );
    expect.assertions(1);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
  await funcs.deleteTask(taskId);
  await funcs.deleteAgency(agencyId);
});

test("accepting a consultance of a certain task", async () => {
  expect.assertions(6);
  const consultancy = {
    name: "agency to consult",
    information: "infoooo",
    partners: ["partner500", "partner3000"],
    members: ["updated012c", "updated"],
    reports: ["rep5", "rep2"]
  };
  const task = {
    description: "desc2",
    consultyNeeded: true,
    deadline: "2016-02-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2,
    monetaryCompensation: 20222,
    requiredSkills: ["cs", "marketing"]
  };

  const consultance = {
    description: "desccons22",
    deadline: "2016-05-25T00:00:00.000Z",
    commitLevel: 1,
    experienceLevel: 2,
    monetaryCompensation: 2000100,
    requiredSkills: ["cs", "design"]
  };

  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agency = await funcs.addAgency(partnerId, consultancy);
  const agencyId = agency.data.data._id;
  const taskCreated = await funcs.addTask(partnerId, task);
  const taskId = await taskCreated.data.data._id;
  await funcs.feedback(agencyId, taskId, consultance);
  const accepted = await funcs.acceptConsultedTask(partnerId, taskId, agencyId);
  const acceptedId = accepted.data.data._id;
  expect(accepted.data.data.description).toEqual(consultance.description);
  expect(accepted.data.data.deadline).toEqual(consultance.deadline);
  expect(accepted.data.data.commitLevel).toEqual(consultance.commitLevel);
  expect(accepted.data.data.experienceLevel).toEqual(
    consultance.experienceLevel
  );
  expect(accepted.data.data.monetaryCompensation).toEqual(
    consultance.monetaryCompensation
  );
  expect(accepted.data.data.requiredSkills).toEqual(
    consultance.requiredSkills
  );
  await funcs.deleteTask(acceptedId);
  await funcs.deleteAgency(agencyId);
});

test("trying to accept a not exist consultance of a certain task", async () => {
  const consultancy = {
    name: "agency to consult",
    information: "infoooo",
    partners: ["partner500", "partner3000"],
    members: ["updated012c", "updated"],
    reports: ["rep5", "rep2"]
  };
  const task = {
    description: "desc2",
    consultyNeeded: true,
    deadline: "2016-02-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2,
    monetaryCompensation: 20222,
    requiredSkills: ["cs", "marketing"]
  };

  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agency = await funcs.addAgency(partnerId, consultancy);
  const agencyId = agency.data.data._id;
  const taskCreated = await funcs.addTask(partnerId, task);
  const taskId = await taskCreated.data.data._id;
  try {
    await funcs.acceptConsultedTask(
      partnerId,
      taskId,
      agencyId
    );
    expect.assertions(1);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
  await funcs.deleteTask(taskId);
  await funcs.deleteAgency(agencyId);
});

test("updating a consultance of a certain task", async () => {
  expect.assertions(6);
  const consultancy = {
    name: "agency to consult",
    information: "infoooo",
    partners: ["partner500", "partner3000"],
    members: ["updated012c", "updated"],
    reports: ["rep5", "rep2"]
  };
  const task = {
    description: "desc2",
    consultyNeeded: true,
    deadline: "2016-02-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2,
    monetaryCompensation: 20222,
    requiredSkills: ["cs", "marketing"]
  };

  const consultance = {
    description: "desccons22",
    deadline: "2016-05-25T00:00:00.000Z",
    commitLevel: 1,
    experienceLevel: 2,
    monetaryCompensation: 2000100,
    requiredSkills: ["cs", "design"]
  };
  const datatoupdate = {
    description: "updated",
    monetaryCompensation: 300
  };

  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agency = await funcs.addAgency(partnerId, consultancy);
  const agencyId = agency.data.data._id;
  const taskCreated = await funcs.addTask(partnerId, task);
  const taskId = await taskCreated.data.data._id;
  await funcs.feedback(agencyId, taskId, consultance);
  const updated = await funcs.updateConsultance(agencyId, taskId, datatoupdate);
  expect(updated.data.data.description).toEqual(datatoupdate.description);
  expect(updated.data.data.deadline).toEqual(consultance.deadline);
  expect(updated.data.data.commitLevel).toEqual(consultance.commitLevel);
  expect(updated.data.data.experienceLevel).toEqual(
    consultance.experienceLevel
  );
  expect(updated.data.data.monetaryCompensation).toEqual(
    datatoupdate.monetaryCompensation
  );
  expect(updated.data.data.requiredSkills).toEqual(
    consultance.requiredSkills
  );
  await funcs.deleteTask(taskId);
  await funcs.deleteAgency(agencyId);
});

test("trying to update a not exist consultance of a certain task", async () => {
  const consultancy = {
    name: "agency to consult",
    information: "infoooo",
    partners: ["partner500", "partner3000"],
    members: ["updated012c", "updated"],
    reports: ["rep5", "rep2"]
  };
  const task = {
    description: "desc2",
    consultyNeeded: true,
    deadline: "2016-02-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2,
    monetaryCompensation: 20222,
    requiredSkills: ["cs", "marketing"]
  };
  const datatoupdate = {
    description: "updated",
    monetaryCompensation: 300
  };
  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agency = await funcs.addAgency(partnerId, consultancy);
  const agencyId = agency.data.data._id;
  const taskCreated = await funcs.addTask(partnerId, task);
  const taskId = await taskCreated.data.data._id;
  try {
    await funcs.updateConsultance(
      "balabizo",
      taskId,
      datatoupdate
    );
    expect.assertions(1);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
  await funcs.deleteTask(taskId);
  await funcs.deleteAgency(agencyId);
});

test("updating a consultance of a certain task with wrong validations", async () => {
  expect.assertions(6);
  const consultancy = {
    name: "agency to update",
    information: "infoooo",
    partners: ["partner500", "partner3000"],
    members: ["updated012c", "updated"],
    reports: ["rep5", "rep2"]
  };
  const task = {
    description: "desc2",
    consultyNeeded: true,
    deadline: "2016-02-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2,
    monetaryCompensation: 20222,
    requiredSkills: ["cs", "marketing"]
  };

  const consultance = {
    description: "desccons22",
    deadline: "2016-05-25T00:00:00.000Z",
    commitLevel: 1,
    experienceLevel: 2,
    monetaryCompensation: 2000100,
    requiredSkills: ["cs", "design"]
  };
  const datatoupdate = {
    description: "updated",
    monetaryCompensation: true
  };

  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agency = await funcs.addAgency(partnerId, consultancy);
  const agencyId = agency.data.data._id;
  const taskCreated = await funcs.addTask(partnerId, task);
  const taskId = await taskCreated.data.data._id;
  await funcs.feedback(agencyId, taskId, consultance);
  try {
    await funcs.updateConsultance(
      agencyId,
      taskId,
      datatoupdate
    );
    expect.assertions(1);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
  await funcs.deleteTask(taskId);
  await funcs.deleteAgency(agencyId);
});

test("deleting a consultance of a certain task", async () => {
  expect.assertions(8);
  const consultancy = {
    name: "agency to delete",
    information: "infoooo",
    partners: ["partner500", "partner3000"],
    members: ["updated012c", "updated"],
    reports: ["rep5", "rep2"]
  };
  const task = {
    description: "desc2",
    consultyNeeded: true,
    deadline: "2016-02-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2,
    monetaryCompensation: 20222,
    requiredSkills: ["cs", "marketing"]
  };

  const consultance = {
    description: "desccons22",
    deadline: "2016-05-25T00:00:00.000Z",
    commitLevel: 1,
    experienceLevel: 2,
    monetaryCompensation: 2000100,
    requiredSkills: ["cs", "design"]
  };
  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agency = await funcs.addAgency(partnerId, consultancy);
  const agencyId = agency.data.data._id;
  const taskCreated = await funcs.addTask(partnerId, task);
  const taskId = await taskCreated.data.data._id;
  const consulted1 = await funcs.feedback(agencyId, taskId, consultance);
  const len = consulted1.data.data.consultanciesDone.length;
  const deleted = await funcs.deleteConsultance(agencyId, taskId);
  const taskedited = await funcs.getTask(taskId);
  const len1 = taskedited.data.data.consultanciesDone.length;
  expect(len1).toEqual(len - 1);
  expect(deleted.data.data[0]._id).toEqual(
    consulted1.data.data.consultanciesDone[0]._id
  );
  expect(deleted.data.data[0].description).toEqual(
    consulted1.data.data.consultanciesDone[0].description
  );
  expect(deleted.data.data[0].deadline).toEqual(
    consulted1.data.data.consultanciesDone[0].deadline
  );
  expect(deleted.data.data[0].commitLevel).toEqual(
    consulted1.data.data.consultanciesDone[0].commitLevel
  );
  expect(deleted.data.data[0].experienceLevel).toEqual(
    consulted1.data.data.consultanciesDone[0].experienceLevel
  );
  expect(deleted.data.data[0].monetaryCompensation).toEqual(
    consulted1.data.data.consultanciesDone[0].monetaryCompensation
  );
  expect(deleted.data.data[0].requiredSkills).toEqual(
    consulted1.data.data.consultanciesDone[0].requiredSkills
  );
  await funcs.deleteTask(taskId);
  await funcs.deleteAgency(agencyId);
});

test("trying to delete a not exist consultance of a certain task", async () => {
  expect.assertions(8);
  const consultancy = {
    name: "agency to delete",
    information: "infoooo",
    partners: ["partner500", "partner3000"],
    members: ["updated012c", "updated"],
    reports: ["rep5", "rep2"]
  };
  const task = {
    description: "desc2",
    consultyNeeded: true,
    deadline: "2016-02-12T00:00:00.000Z",
    commitLevel: 3,
    experienceLevel: 2,
    monetaryCompensation: 20222,
    requiredSkills: ["cs", "marketing"]
  };
  const partnerId = "5c9cfc970a93cf1638d22ddd";
  const agency = await funcs.addAgency(partnerId, consultancy);
  const agencyId = agency.data.data._id;
  const taskCreated = await funcs.addTask(partnerId, task);
  const taskId = await taskCreated.data.data._id;
  try {
    await funcs.deleteConsultance(agencyId, taskId);
    expect.assertions(1);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
  await funcs.deleteTask(taskId);
  await funcs.deleteAgency(agencyId);
});
