const funcs = require('../functions/functions1');
jest.setTimeout(180000)

//const funcs = require('../functions/Edu_organizationsfn');


test('Create task exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.createTask)).toBe('function')
})

test('GetAll task exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.getAll)).toBe('function')
})


test('Get Specific task exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.getSpec)).toBe('function')
})

test('Delete task exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.deleteOne)).toBe('function')
})

test('Update coworking space exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.updateOne)).toBe('function')
})


test('Create a task', async () => {
  const data = {
    description : "nooo3" ,
    consult_needed : true,
    time : "16-06-1998",
    level_of_commitment : 1,
    experiance_level : 2,
    monetory_compensation : 1000,
    required_skills : ["cs"]
	}
const partner_Id = "5"

const response =  await funcs.getAllTasks()
   const len1=response.data.data.length
const created = await funcs.createTask(partner_Id,data)
  const createdData = created.data
  const response2 =  await funcs.getAllTasks()
   const len2=response2.data.data.length
   //console.log(createdData)
  // console.log(createdData.data.consulty_needed)
  // console.log(len2 , len1 )
   const id = createdData.data._id
   //console.log(id)
  
   expect.assertions(8)
  expect(data.description).toEqual(createdData.data.description)
  expect(data.consult_needed).toEqual(createdData.data.consulty_needed)
  expect(data.time).toEqual(createdData.data.deadline)
  expect(data.level_of_commitment).toEqual(createdData.data.commit_level)
  expect(data.experiance_level).toEqual(createdData.data.experience_level)
  expect(data.monetory_compensation).toEqual(createdData.data.monetary_compensation)
  expect(data.required_skills).toEqual(createdData.data.required_skills)
  expect(len2-len1).toBe(1)
  //console.log("lsaaa")
  const deleted = await funcs.deleteTask(id)
  //console.log(id)
  //console.log("ana 5lst")
  
})


test('get a task by id', async () => {
  const data = {
    description : "get_test" ,
    consult_needed : true,
    time : "16-06-1998",
    level_of_commitment : 1,
    experiance_level : 2,
    monetory_compensation : 2000,
    required_skills : ["design"]
	
}
const partner_Id = "45"
  const created = await funcs.createTask(partner_Id,data)
  const createdData = created.data
  const id = createdData.data._id
  //console.log(id)
  const read = await funcs.getSpecTask(id)
  const readData = read.data
  //console.log(readData)
  expect.assertions(7)
  expect(readData.description).toEqual(createdData.description)
  expect(readData.consult_needed).toEqual(createdData.consult_needed)
  expect(readData.time).toEqual(createdData.time)
  expect(readData.level_of_commitment).toEqual(createdData.level_of_commitment)
  expect(readData.experiance_level).toEqual(createdData.experiance_level)
  expect(readData.monetory_compensation).toEqual(createdData.monetory_compensation)
  expect(readData.required_skills).toEqual(createdData.required_skills)
  const deleted = await funcs.deleteTask(id)
  
})

test('Delete a task by id', async () => {
  const data = {
    description : "test_delete" ,
    consult_needed : true,
    time : "16-06-1998",
    level_of_commitment : 1,
    experiance_level : 2,
    monetory_compensation : 3000,
    required_skills : ["BI"]
	
}

const res =  await funcs.getAllTasks()
const len=res.data.data.length
//console.log(len);
const partner_Id = "45"

const created = await funcs.createTask(partner_Id,data)

const response =  await funcs.getAllTasks()
const len1=response.data.data.length
//console.log(len1);
const createdData = created.data

const id = createdData.data._id
  
const deleted = await funcs.deleteTask(id)
const deletedData = deleted.data

const response2 =  await funcs.getAllTasks()
const len2=response2.data.data.length
//console.log(len2);

expect.assertions(8)
expect(deletedData.description).toEqual(createdData.description)
expect(deletedData.consult_needed).toEqual(createdData.consult_needed)
expect(deletedData.time).toEqual(createdData.time)
expect(deletedData.level_of_commitment).toEqual(createdData.level_of_commitment)
expect(deletedData.experiance_level).toEqual(createdData.experiance_level)
expect(deletedData.monetory_compensation).toEqual(createdData.monetory_compensation)
expect(deletedData.required_skills).toEqual(createdData.required_skills)
  expect(len1-len2).toBe(1)
  
})

test('Update a task by id', async () => {
  const data = {
    description : "update_test" ,
    consult_needed : true,
    time : "16-06-1998",
    level_of_commitment : 1,
    experiance_level : 2,
    monetory_compensation : 4000,
    required_skills : ["C++"]
	
}
const partner_Id = "45"

  const dataToUpdate = {
    description: "new_update"
  }

  const dataUpdated = {

    description : "new_update" ,
    consult_needed : true,
    time : "16-06-1998",
    level_of_commitment : 1,
    experiance_level : 2,
    monetory_compensation : 4000,
    required_skills : ["C++"]
  }

  const created = await funcs.createTask(partner_Id,data)
  const createdData = created.data
  const id = createdData.data._id
  const updated = await funcs.updateTask(id, dataToUpdate)
  const updatedData = updated.data
  expect.assertions(7)
  expect(updatedData.description).toEqual(createdData.description)
expect(updatedData.consult_needed).toEqual(createdData.consult_needed)
expect(updatedData.time).toEqual(createdData.time)
expect(updatedData.level_of_commitment).toEqual(createdData.level_of_commitment)
expect(updatedData.experiance_level).toEqual(createdData.experiance_level)
expect(updatedData.monetory_compensation).toEqual(createdData.monetory_compensation)
expect(updatedData.required_skills).toEqual(createdData.required_skills)
  const deleted = await funcs.deleteTask(id)
 
})

test('update task states ' , async () => {
  const data = {
    description : "update_test" ,
    consult_needed : true,
    time : "16-06-1998",
    level_of_commitment : 1,
    experiance_level : 2,
    monetory_compensation : 4000,
    required_skills : ["C++"]
  }
  const state1= {
"state" : true
  }
  const admin_id = "12"
  const partner_Id = "30"
  const created = await funcs.createTask(partner_Id,data)
  const createdData = created.data
  const id = createdData.data._id
  const updated = await funcs.update_state(admin_id,id,state1)
  const getUpdatedtask = await funcs.getSpecTask(id)
  console.log(getUpdatedtask.data.data)
  //console.log(updated.data)
  expect.assertions(1)

  expect(getUpdatedtask.data.data.accepted).toEqual(state1.state)
  const deleted = await funcs.deleteTask(id)



})

/test('update task work_cycle ' , async () => {
  const data = {
    description : "update_test" ,
    consult_needed : true,
    time : "16-06-1998",
    level_of_commitment : 1,
    experiance_level : 2,
    monetory_compensation : 4000,
    required_skills : ["C++"]
  }
  const cycle = {
"work_cycle" : 25
  }
  //const task_id = "12"
  const partner_Id = "30"
  const member1=  await funcs.createmember("judy ayman",["piano"])
  const created = await funcs.createTask(partner_Id,data)
  const createdData = created.data
  const id = createdData.data._id
  const updated = await funcs.update_work_cycle(id,cycle)
  const getUpdatedtask = await funcs.getSpecTask(id)
  //console.log(getUpdatedtask.data.data)
  //console.log(updated.data)
  expect.assertions(1)

  expect(getUpdatedtask.data.data.work_cycle).toEqual(cycle.work_cycle)
  const deleted = await funcs.deleteTask(id)



})

test('Assgin member For task ',async() => {

  const data = {
    description : "nooo3" ,
    consult_needed : true,
    time : "16-06-1998",
    level_of_commitment : 1,
    experiance_level : 2,
    monetory_compensation : 1000,
    required_skills : ["piano"]
	}
const partner_Id = "5"
const state1= {
  "state" : true
    }
const created = await funcs.createTask(partner_Id,data)
const member1=  await funcs.createmember("judy ayman",["piano"])
   // console.log(member1.data)
  const admin_id = "12"
  //const partner_Id = "30"
  const createdData = created.data
  const id = createdData.data._id
  const updated = await funcs.update_state(admin_id,id,state1)
  const getUpdatedtask = await funcs.getSpecTask(id)
  const applyfortask=await funcs.applyfortask(member1.data._id,{"taskId":getUpdatedtask.data.data._id})
  const temp = await funcs.getSpecTask(id)
  console.log(temp.data.data._id)
  const assignfortask=await funcs.assignfortask(getUpdatedtask.data.data._id,member1.data._id)
  console.log("heref")

  const assignedtask1 = await funcs.getSpecTask(id)
  const assignedtask2 = await funcs.getSpecTask(id)
  expect.assertions(1);

  expect(assignedtask2.data.data.member_id).toEqual(member1.data._id)

});

test('view task cycle', async () => {
  const data = {
    description : "nooo3" ,
    consult_needed : true,
    time : "16-06-1998",
    level_of_commitment : 1,
    experiance_level : 2,
    monetory_compensation : 1000,
    required_skills : ["cs"]
	}
const partner_Id = "5"

const response =  await funcs.getAllTasks()
   const len1=response.data.data.length
const created = await funcs.createTask(partner_Id,data)
  const createdData = created.data
  const id2 = createdData.data._id
  const viewed = await funcs.view_cycle(id2)
  const response2 =  await funcs.getAllTasks()
   const len2=response2.data.data.length
  
  
   expect.assertions(1)
  expect(data.work_cycle).toEqual(createdData.data.work_cycle)
 
  const deleted = await funcs.deleteTask(id2)
  
  
})
test('Assgin member For task ',async() => {

  const data = {
    description : "nooo3" ,
    consult_needed : true,
    time : "16-06-1998",
    level_of_commitment : 1,
    experiance_level : 2,
    monetory_compensation : 1000,
    required_skills : ["piano"]
	}
const partner_Id = "5"
const state1= {
  "state" : true
    }
const created = await funcs.createTask(partner_Id,data)
const member1=  await funcs.createmember("judy ayman",["piano"])
   // console.log(member1.data)
  const admin_id = "12"
  //const partner_Id = "30"
  const createdData = created.data
  const id = createdData.data._id
  const updated = await funcs.update_state(admin_id,id,state1)
  const getUpdatedtask = await funcs.getSpecTask(id)
  const applyfortask=await funcs.applyfortask(member1.data._id,{"taskId":getUpdatedtask.data.data._id})
  const temp = await funcs.getSpecTask(id)
  console.log(temp.data.data._id)
  const assignfortask =await funcs.assignfortask(getUpdatedtask.data.data._id,member1.data._id)
  console.log("heref")

  const assignedtask1 = await funcs.getSpecTask(id)
  expect.assertions(1);

  expect(applyfortask.data.data.member_id).toEqual(member1.data._id)

});

test('give_rating', async () => {
  const data = {
    description : "nooo3" ,
    consult_needed : true,
    time : "16-06-1998",
    level_of_commitment : 1,
    experiance_level : 2,
    monetory_compensation : 1000,
    required_skills : ["cs"]
  }
  const rating = {
    rate : 3
  }
const partner_Id = "5"

const response =  await funcs.getAllTasks()
   const len1=response.data.data.length
const created = await funcs.createTask(partner_Id,data)
  const createdData = created.data
  const response2 =  await funcs.getAllTasks()
   const len2=response2.data.data.length
   const id = createdData.data._id
   const par_id = createdData.data.partner_id
   const reted = await funcs.rate (id ,par_id )
  
   expect.assertions(8)
  expect(rating.rate).toEqual(reted.data.rate)
 
  const deleted = await funcs.deleteTask(id)
})

