//const { Member } = require('../models/Member.js');
const funcs = require("../functions/taskfn");
jest.setTimeout(180000);

test("Create task exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.createTask)).toBe("function");
});

test("GetAll task exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.getAllTasks)).toBe("function");
});

test("Get Specific task exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.getSpecTask)).toBe("function");
});

test("Delete task exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.deleteTask)).toBe("function");
});

test("Update coworking space exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.updateTask)).toBe("function");
});

test("Create a task", async () => {
  const data = {
    description: "MS4",
    consultyNeeded: true,
    deadline: "2016-04-12T00:00:00.000Z",
    commitLevel: 1,
    experienceLevel: 2,
    monetaryCompensation: 1000,
    requiredSkills: ["cs"]
  };
  const partnerId = "5";

  const response = await funcs.getAllTasks();
  const len1 = response.data.data.length;
  const created = await funcs.createTask(partnerId, data);
  const createdData = created.data;
  const response2 = await funcs.getAllTasks();
  const len2 = response2.data.data.length;
  const id = createdData.data._id;

  expect.assertions(8);
  expect(data.description).toEqual(createdData.data.description);
  expect(data.consultyNeeded).toEqual(createdData.data.consultyNeeded);
  expect(data.deadline).toEqual(createdData.data.deadline);
  expect(data.commitLevel).toEqual(createdData.data.commitLevel);
  expect(data.experienceLevel).toEqual(createdData.data.experienceLevel);
  expect(data.monetaryCompensation).toEqual(
    createdData.data.monetaryCompensation
  );
  expect(data.requiredSkills).toEqual(createdData.data.requiredSkills);
  expect(len2 - len1).toBe(1);
  const deleted = await funcs.deleteTask(id);
});

test("get a task by id", async () => {
  const data = {
    description: "MS4",
    consultyNeeded: true,
    deadline: "2016-04-12T00:00:00.000Z",
    commitLevel: 1,
    experienceLevel: 2,
    monetaryCompensation: 1000,
    requiredSkills: ["cs"]
  };

  const partnerId = "45";
  const created = await funcs.createTask(partnerId, data);
  const createdData = created.data;
  const id = createdData.data._id;
  const read = await funcs.getSpecTask(id);
  const readData = read.data;
  expect.assertions(7);
  expect(readData.description).toEqual(createdData.description);
  expect(readData.consult_needed).toEqual(createdData.consult_needed);
  expect(readData.time).toEqual(createdData.time);
  expect(readData.level_of_commitment).toEqual(createdData.level_of_commitment);
  expect(readData.experiance_level).toEqual(createdData.experiance_level);
  expect(readData.monetory_compensation).toEqual(
    createdData.monetory_compensation
  );
  expect(readData.required_skills).toEqual(createdData.required_skills);
  const deleted = await funcs.deleteTask(id);
});

test("Delete a task by id", async () => {
  const data = {
    description: "MS4",
    consultyNeeded: true,
    deadline: "2016-04-12T00:00:00.000Z",
    commitLevel: 1,
    experienceLevel: 2,
    monetaryCompensation: 1000,
    requiredSkills: ["cs"]
  };

  const res = await funcs.getAllTasks();
  const len = res.data.data.length;
  //console.log(len);
  const partnerId = "45";

  const created = await funcs.createTask(partnerId, data);

  const response = await funcs.getAllTasks();
  const len1 = response.data.data.length;
  //console.log(len1);
  const createdData = created.data;

  const id = createdData.data._id;

  const deleted = await funcs.deleteTask(id);
  const deletedData = deleted.data;

  const response2 = await funcs.getAllTasks();
  const len2 = response2.data.data.length;
  //console.log(len2);

  expect.assertions(8);
  expect(deletedData.description).toEqual(createdData.description);
  expect(deletedData.consult_needed).toEqual(createdData.consult_needed);
  expect(deletedData.time).toEqual(createdData.time);
  expect(deletedData.level_of_commitment).toEqual(
    createdData.level_of_commitment
  );
  expect(deletedData.experiance_level).toEqual(createdData.experiance_level);
  expect(deletedData.monetory_compensation).toEqual(
    createdData.monetory_compensation
  );
  expect(deletedData.required_skills).toEqual(createdData.required_skills);
  expect(len1 - len2).toBe(1);
});

test("Update a task by id", async () => {
  const data = {
    description: "MS4",
    consultyNeeded: true,
    deadline: "2016-04-12T00:00:00.000Z",
    commitLevel: 1,
    experienceLevel: 2,
    monetaryCompensation: 1000,
    requiredSkills: ["cs"]
  };
  const partnerId = "45";

  const dataToUpdate = {
    description: "new_update"
  };

  const dataUpdated = {
    description: "new_update",
    consultyNeeded: true,
    deadline: "2016-04-12T00:00:00.000Z",
    commitLevel: 1,
    experienceLevel: 2,
    monetaryCompensation: 1000,
    requiredSkills: ["cs"]
  };

  const created = await funcs.createTask(partnerId, data);
  const createdData = created.data;
  const id = createdData.data._id;
  const updated = await funcs.updateTask(id, dataToUpdate);
  const updatedData = updated.data;
  expect.assertions(7);
  expect(updatedData.description).toEqual(createdData.description);
  expect(updatedData.consult_needed).toEqual(createdData.consult_needed);
  expect(updatedData.time).toEqual(createdData.time);
  expect(updatedData.level_of_commitment).toEqual(
    createdData.level_of_commitment
  );
  expect(updatedData.experiance_level).toEqual(createdData.experiance_level);
  expect(updatedData.monetory_compensation).toEqual(
    createdData.monetory_compensation
  );
  expect(updatedData.required_skills).toEqual(createdData.required_skills);
  const deleted = await funcs.deleteTask(id);
});

test("update task states ", async () => {
  const data = {
    description: "update states",
    consultyNeeded: true,
    deadline: "2016-04-12T00:00:00.000Z",
    commitLevel: 1,
    experienceLevel: 2,
    monetaryCompensation: 1000,
    requiredSkills: ["cs"]
  };
  const state1 = {
    accepted: true
  };
  const admin_id = 12;
  const partnerId = "30";
  const created = await funcs.createTask(partnerId, data);
  const createdData = created.data;
  const id = createdData.data._id;
  const updated = await funcs.update_state(id, admin_id, state1);
  const getUpdatedtask = updated.data.data;
  expect.assertions(1);

  expect(getUpdatedtask.accepted).toEqual(state1.accepted);
  const deleted = await funcs.deleteTask(id);
});

test("update task work_cycle ", async () => {
  const data0 = {
    fullName: "fullName1",
    skills: ["skills1"]
  };
  const member1 = await funcs.createMember(data0);
  const mems = await funcs.getMembers();

  const num = mems.data.length;

  const req = mems.data[num - 1].skills;

  const state1 = {
    accepted: true
  };
  const data = {
    description: "update states",
    consultyNeeded: true,
    deadline: "2016-04-12T00:00:00.000Z",
    commitLevel: 1,
    experienceLevel: 0,
    monetaryCompensation: 1000,
    requiredSkills: ["skills1"]
  };

  const cycle = {
    workCycle: 25
  };

  const partnerId = "30";
  const admin_id = "12";

  const created = await funcs.createTask(partnerId, data);

  const taskId = created.data.data._id;
  const memberId = mems.data[num - 1]._id;

  await funcs.update_state(taskId, admin_id, state1);

  const taskIdd = {
    taskId: taskId
  };
  const t1 = await funcs.applyForTask(memberId, taskIdd);

  const t2 = await funcs.assignfortask(taskId, memberId);

  const createdData = created.data.data;

  const id = createdData._id;

  const updated = await funcs.update_work_cycle(id, cycle);
  const getUpdatedtask = await funcs.getSpecTask(id);
  //console.log(getUpdatedtask.data.data)
  //console.log(updated.data)
  expect.assertions(1);

  expect(getUpdatedtask.data.data.work_cycle).toEqual(cycle.work_cycle);
  const deleted = await funcs.deleteTask(id);
});

test("Assgin member For task ", async () => {
  const data0 = {
    fullName: "fullName1",
    skills: ["skills1"]
  };
  const member1 = await funcs.createMember(data0);

  const num = member1.length;
  await funcs.getMembers()

  const req = member1.skills;

  const state1 = {
    accepted: true
  };
  const data = {
    description: "update states",
    consultyNeeded: true,
    deadline: "2016-04-12T00:00:00.000Z",
    commitLevel: 1,
    experienceLevel: 0,
    monetaryCompensation: 1000,
    requiredSkills: ["skills1"]
  };

  const partnerId = "30";
  const admin_id = "12";

  const created = await funcs.createTask(partnerId, data);

  const taskId = created.data.data._id;
  const memberId = member1.data._id;

  await funcs.update_state(taskId, admin_id, state1);

  const taskIdd = {
    taskId: taskId
  };
  const t1 = await funcs.applyForTask(memberId, taskIdd);
  const t2 = await funcs.assignfortask(taskId, memberId);

  await funcs.getSpecTask(taskId);

  expect.assertions(1);

  expect(t2.data.data.memberId).toEqual(member1.data._id);
});

test("view task cycle", async () => {
  const data = {
    description: "view cycle",
    consultyNeeded: true,
    deadline: "2016-04-12T00:00:00.000Z",
    commitLevel: 1,
    experienceLevel: 2,
    monetaryCompensation: 1000,
    requiredSkills: ["photo"]
  };
  const partnerId = "5";
  const created = await funcs.createTask(partnerId, data);
  const createdData = created.data;
  const id2 = createdData.data._id;
  const viewed = await funcs.view_cycle(id2);

  expect.assertions(1);
  expect(viewed.data).toBe("");
  const deleted = await funcs.deleteTask(id2);
});
test("give_rating", async () => {
  const data = {
    description: "update states",
    consultyNeeded: true,
    deadline: "2016-04-12T00:00:00.000Z",
    commitLevel: 1,
    experienceLevel: 0,
    monetaryCompensation: 1000,
    requiredSkills: ["skills1"]
  };
  const rating = {
    rate: 3
  };
  const partnerId = "30";

  const created = await funcs.createTask(partnerId, data);

  const createdData = created.data;

  const id = createdData.data._id;

  const reted = await funcs.rate(id, partnerId, rating);

  expect.assertions(1);
  expect(rating.rate).toEqual(reted.data.rate);

  const deleted = await funcs.deleteTask(id);
});
