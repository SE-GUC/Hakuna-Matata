const funcs =require('../functions/consultancy_functions');
jest.setTimeout(1800000)
//   test('check for length of the output of show all consultancy agencies', async () => {
//     expect.assertions(1)
//     const response =  await funcs.getagencies();
//     const agencies=await funcs.getallagencies();
//     expect(response.data.length).toBe(agencies.length)
//   });

// // test('first book should be with name equal agency1', async () => {
// //     expect.assertions(1)
// //     const response =  await funcs.getagencies()
// //     expect(response.data.name).toEqual('agency1')
// //   });
test('getagencies  exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.getagencies)).toBe('function')
})
test('getagency  exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.getagency)).toBe('function')
})
test('add_agency exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.add_agency)).toBe('function')
})
test('delete_agency exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.delete_agency)).toBe('function')
})
test('update_agency exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.update_agency)).toBe('function')
})
test('add_report exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.add_report)).toBe('function')
})
test('feedback exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.feedback)).toBe('function')
})
test('show_unconsultedtasks exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.show_unconsultedtasks)).toBe('function')
})
test('show_consulted_tasks exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.show_consulted_tasks)).toBe('function')
})
test('show_consulted_task exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.show_consulted_task)).toBe('function')
})
test('accept_consulted_task exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.accept_consulted_task)).toBe('function')
})
test('update_consultance exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.update_consultance)).toBe('function')
})
test('delete_consultance exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.delete_consultance)).toBe('function')
})


test('get all consultancy agencies',async()=>{
  try{
    expect.assertions(2)
    const response=  await funcs.getagencies()
  expect(response).toBeDefined()
  expect(response.status).toEqual(200)
  }
  catch(error){
    expect.assertions(1)
    expect(error.response.status).toBeGreaterThanOrEqual(400)
    console.log('No consultancy agency found')
  }
});
test('length will increase by 1 if we inserted a new agency and checking inserted agency parameters', async () => {
  expect.assertions(6)
  const agency={
    name:"agency3",
    information:"info3",
    parteners:["partner2","partner3"],
    members:["mem4","mem5"],
    reports:["rep5","rep2"]
  }
  const partnerid="5c9cfc970a93cf1638d22ddd"
  const res1=  await funcs.getagencies()
  const len=res1.data.length
  const response =  await funcs.add_agency(partnerid,agency)
  const agencies=await funcs.getagencies()
  const id=response.data._id
  const agencyy=await funcs.getagency(id);
  expect(agencies.data.length).toEqual(len+1);
  expect(response.data.name).toEqual(agencyy.data.name);
  expect(response.data.information).toEqual(agencyy.data.information);
  expect(response.data.parteners).toEqual(agencyy.data.parteners);
  expect(response.data.members).toEqual(agencyy.data.members);
  expect(response.data.reports).toEqual(agencyy.data.reports);
  await funcs.delete_agency(id);
});

test('create agency with wrong validation', async () => {
  const agency={
    name:"agency3",
    information:"info3",
    parteners:123,
    members:["mem4","mem5"],
    reports:["rep5","rep2"]
  }
  const partnerid="5c9cfc970a93cf1638d22ddd"
  try{
    const response =  await funcs.add_agency(partnerid,agency)
    expect.assertions(1)
   }
   catch(error){
        expect.assertions(1)
        expect(error.response.status).toBeGreaterThanOrEqual(400)
      }
});
    test('get a specific agency', async () => {
      expect.assertions(5)
      const agency={
        name:"agency3",
        information:"info3",
        parteners:["partner2","partner3"],
        members:["mem4","mem5"],
        reports:["rep5","rep2"]
      }
      const partnerid="5c9cfc970a93cf1638d22ddd"
      const consultancy =  await funcs.add_agency(partnerid,agency)
      const id=consultancy.data._id
      const response=await funcs.getagency(id);
      expect(response.data.name).toEqual(consultancy.data.name)
      expect(response.data.information).toEqual(consultancy.data.information)
      expect(response.data.parteners).toEqual(consultancy.data.parteners)
      expect(response.data.members).toEqual(consultancy.data.members)
      expect(response.data.reports).toEqual(consultancy.data.reports)
      await funcs.delete_agency(id);
    });
    test('trying to get a not exist agency', async () => {
      try{
      const partnerid="5c9cfc970a93cf1638d22ddd"
      const id="balabizo123"
      const response=await funcs.getagency(id);
      expect.assertions(1)
      }
      catch(error){
           expect.assertions(1)
           expect(error.response.status).toBeGreaterThanOrEqual(400)
         }
    });
 
test("when deleting consultancy agency the length will decrase by one and check for the deleted task parameters",async () => {
  expect.assertions(6)
  const agencytodelete={
         name:"agencty to be deleted",
         information:"infoooo",
         parteners:["partner500","partner3000"],
         members:["deleted012c","deleted015c"],
         reports:["rep5","rep2"]
       }
       const partnerid="a2222"
       const consultancy =  await funcs.add_agency(partnerid,agencytodelete)
       agencytodelete.parteners.push(partnerid)
       const id=consultancy.data._id
       const res1=  await funcs.getagencies()
       const len=res1.data.length
       const response=await funcs.delete_agency(id)
       const res2=await funcs.getagencies()
       const len2=res2.data.length
       expect(len2).toEqual(len-1);
       expect(response.data.name).toEqual(agencytodelete.name);
       expect(response.data.information).toEqual(agencytodelete.information);
       expect(response.data.parteners).toEqual(agencytodelete.parteners);
       expect(response.data.members).toEqual(agencytodelete.members);
       expect(response.data.reports).toEqual(agencytodelete.reports);
});
test("trying to delete a not exist consultancy agency",async () => {

       const partnerid="a2222"
       const id="balabizo"
       try{
       const response=await funcs.delete_agency(id)
       expect.assertions(1)
      }
      catch(error){
           expect.assertions(1)
           expect(error.response.status).toBeGreaterThanOrEqual(400)
         }
});


test("check for updated consultancy agency parameters",async () => {
  expect.assertions(5)
  const partnerid="a2223"
  const agencytoupdate={
    name:"agency to be updated",
    information:"info3",
    parteners:["partner100000","partner3"],
    members:["mem0","mem5"],
    reports:["rep100000000000","rep2"]
  }
  const infotoupdate={
    name:"agency updated successfully",
    reports:["reportupdated"]
  }
  const afterupdate={
    name:"agency updated successfully",
    information:"info3",
    parteners:["partner100000","partner3",partnerid],
    members:["mem0","mem5"],
    reports:["reportupdated"]
  }
  const consultancy =  await funcs.add_agency(partnerid,agencytoupdate)
  const agencyid=consultancy.data._id
  const response=await funcs.update_agency(agencyid,infotoupdate)
  expect(response.data.name).toEqual(afterupdate.name)
  expect(response.data.information).toEqual(afterupdate.information)
  expect(response.data.parteners).toEqual(afterupdate.parteners)
  expect(response.data.members).toEqual(afterupdate.members)
  expect(response.data.reports).toEqual(afterupdate.reports)
  await funcs.delete_agency(agencyid);
})

test("trying to update not exist consultancy agency",async () => {
  const infotoupdate={
    name:"agency updated successfully",
    reports:["reportupdated"]
  }
  const agencyid="balabizo"
       try{
        const response=await funcs.update_agency(agencyid,infotoupdate)
       expect.assertions(1)
      }
      catch(error){
           expect.assertions(1)
           expect(error.response.status).toBeGreaterThanOrEqual(400)
         }
})

test("check for updated consultancy agency parameters",async () => {
  expect.assertions(5)
  const partnerid="a2223"
  const agencytoupdate={
    name:"agency to be updated",
    information:"info3",
    parteners:["partner100000","partner3"],
    members:["mem0","mem5"],
    reports:["rep100000000000","rep2"]
  }
  const infotoupdate={
    name:12,
    reports:["reportupdated"]
  }
  const consultancy =  await funcs.add_agency(partnerid,agencytoupdate)
  const agencyid=consultancy.data._id
  try{
    const response=await funcs.update_agency(agencyid,infotoupdate)
   expect.assertions(1)
  }
  catch(error){
       expect.assertions(1)
       expect(error.response.status).toBeGreaterThanOrEqual(400)
     }
  await funcs.delete_agency(agencyid);
})
test("when inserting a report the length of array reports in consultancy agency will increase and check for it's value",async () => {
  expect.assertions(7)
  const agencytoupdate={
    name:"agencty to be updated",
    information:"infoooo",
    parteners:["partner500","partner3000"],
    members:["updated012c","updated"],
    reports:["rep5","rep2"]
  }
  const partnerid="a222"
  const consultancy =  await funcs.add_agency(partnerid,agencytoupdate)
  const agencyid=consultancy.data._id
  const report="report added"
  const res1=  await funcs.getagency(agencyid)
  const len=res1.data.reports.length
  const response=await funcs.add_report(agencyid,report)
  consultancy.data.reports.push(report);
  expect(response.data.reports.length).toEqual(len+1)
  expect(response.data.reports[response.data.reports.length-1]).toEqual(report)
  expect(response.data.name).toEqual(consultancy.data.name)
  expect(response.data.information).toEqual(consultancy.data.information)
  expect(response.data.parteners).toEqual(consultancy.data.parteners)
  expect(response.data.members).toEqual(consultancy.data.members)
  expect(response.data.reports).toEqual(consultancy.data.reports)
  await funcs.delete_agency(agencyid);
})

test("trying to insert a report  in a not exist consultancy agency",async () => {
  const report="report added"
  const agencyid="balabizo"
       try{
        const response=await funcs.add_report(agencyid,report)
       expect.assertions(1)
      }
      catch(error){
           expect.assertions(1)
           expect(error.response.status).toBeGreaterThanOrEqual(400)
         }
})


test("creating a consualtance for a certain task ",async () => {
  expect.assertions(7)
  const consultancy={
    name:"agency to consult",
    information:"infoooo",
    parteners:["partner500","partner3000"],
    members:["updated012c","updated"],
    reports:["rep5","rep2"]
  }
  const task={
    description:"desc2",
    consult_needed:true,
    time:"2016-04-12",
    level_of_commitment:3,
    experiance_level:2,
    monetory_compensation:20222,
    required_skills:["cs","marketing"]
  }
  const consultance={
  description:"desccons33",
	deadline:"2016-04-12T00:00:00.000Z",
	commit_level:3,
	experience_level:2,
	monetary_compensation:9000,
	required_skills:["cs","design"]
  }
  const partnerid="abasdag11"
  const agency =  await funcs.add_agency(partnerid,consultancy)
  const agencyid=agency.data._id;
  const tassk=await funcs.add_task(partnerid,task)
  const taskid=await tassk.data.data._id
  const consult=await funcs.feedback(agencyid,taskid,consultance);
  expect(consult.data._id).toEqual(taskid)
  expect(consult.data.cunsulties_done[consult.data.cunsulties_done.length-1].description).toEqual(consultance.description)
  expect(consult.data.cunsulties_done[consult.data.cunsulties_done.length-1].commit_level).toEqual(consultance.commit_level)
  expect(consult.data.cunsulties_done[consult.data.cunsulties_done.length-1].experience_level).toEqual(consultance.experience_level)
  expect(consult.data.cunsulties_done[consult.data.cunsulties_done.length-1].monetary_compensation).toEqual(consultance.monetary_compensation)
  expect(consult.data.cunsulties_done[consult.data.cunsulties_done.length-1].required_skills).toEqual(consultance.required_skills)
  expect(consult.data.cunsulties_done[consult.data.cunsulties_done.length-1].deadline).toEqual(consultance.deadline)
  await funcs.delete_task(taskid)
   await funcs.delete_agency(agencyid)
})

test("trying to create a consualtance for a not exist task ",async () => {
  const consultancy={
    name:"agency to consult",
    information:"infoooo",
    parteners:["partner500","partner3000"],
    members:["updated012c","updated"],
    reports:["rep5","rep2"]
  }
  const consultance={
  description:"desccons33",
	deadline:"2016-04-12T00:00:00.000Z",
	commit_level:3,
	experience_level:2,
	monetary_compensation:9000,
	required_skills:["cs","design"]
  }
  const partnerid="abasdag11"
  const agency =  await funcs.add_agency(partnerid,consultancy)
  const agencyid=agency.data._id;
  const taskid="balabizo1234"
  try{
  const consult=await funcs.feedback(agencyid,taskid,consultance);
  expect.assertions(1)
}
catch(error){
     expect.assertions(1)
     expect(error.response.status).toBeGreaterThanOrEqual(400)
   }
   await funcs.delete_agency(agencyid)
})

test("create a consualtance for a task with wrong validations",async () => {
  const consultancy={
    name:"agency to consult",
    information:"infoooo",
    parteners:["partner500","partner3000"],
    members:["updated012c","updated"],
    reports:["rep5","rep2"]
  }
  const task={
    description:"desc2",
    consult_needed:true,
    time:"2016-04-12",
    level_of_commitment:3,
    experiance_level:2,
    monetory_compensation:20222,
    required_skills:["cs","marketing"]
  }
  const consultance={
  description:"desccons33",
	deadline:"2016-04-12T00:00:00.000Z",
	commit_level:3,
	experience_level:2,
  }
  const partnerid="abasdag11"
  const agency =  await funcs.add_agency(partnerid,consultancy)
  const agencyid=agency.data._id;
  const tassk=await funcs.add_task(partnerid,task)
  const taskid=await tassk.data.data._id
  try{
  const consult=await funcs.feedback(agencyid,taskid,consultance);
  expect.assertions(1)
}
catch(error){
     expect.assertions(1)
     expect(error.response.status).toBeGreaterThanOrEqual(400)
   }
  await funcs.delete_task(taskid)
   await funcs.delete_agency(agencyid)
})

test("trying to create a consualtance for a task that doesn't need consultance ",async () => {
  const consultancy={
    name:"agency to consult",
    information:"infoooo",
    parteners:["partner500","partner3000"],
    members:["updated012c","updated"],
    reports:["rep5","rep2"]
  }
  const task={
    description:"desc2",
    consult_needed:false,
    time:"2016-04-12",
    level_of_commitment:3,
    experiance_level:2,
    monetory_compensation:20222,
    required_skills:["cs","marketing"]
  }
  const consultance={
  description:"desccons33",
	deadline:"2016-04-12T00:00:00.000Z",
	commit_level:3,
	experience_level:2,
	monetary_compensation:9000,
	required_skills:["cs","design"]
  }
  const partnerid="abasdag11"
  const agency =  await funcs.add_agency(partnerid,consultancy)
  const agencyid=agency.data._id;
  const tassk=await funcs.add_task(partnerid,task)
  const taskid=await tassk.data.data._id
  try{
  const consult=await funcs.feedback(agencyid,taskid,consultance);
  expect.assertions(1)
}
catch(error){
     expect.assertions(1)
     expect(error.response.status).toBeGreaterThanOrEqual(400)
   }
  await funcs.delete_task(taskid)
   await funcs.delete_agency(agencyid)
})

test('get all unconsulted tasks',async()=>{
  try{
    expect.assertions(2)
    const response=  await funcs.show_unconsultedtasks()
  expect(response).toBeDefined()
  expect(response.status).toEqual(200)
  }
  catch(error){
    expect.assertions(1)
    expect(error.response.status).toBeGreaterThanOrEqual(400)
    console.log('No consultancy agency found')
  }
});

test("show consultancies for a certain task",async()=>{
  expect.assertions(7)
     const consultancy={
     name:"agency to consult",
     information:"infoooo",
     parteners:["partner500","partner3000"],
     members:["updated012c","updated"],
     reports:["rep5","rep2"]
   }
  const task={
         description:"desc2",
         consult_needed:true,
         time:"2016-04-12",
         level_of_commitment:3,
         experiance_level:2,
         monetory_compensation:20222,
         required_skills:["cs","marketing"]
       }
  const consultance1={
      description:"desccons33",
     	deadline:"2016-05-12T00:00:00.000Z",
      commit_level:2,
      experience_level:5,
      monetary_compensation:2000000,
      required_skills:["cs","design"]
  }
  const consultance2={
    description:"desccons22",
     deadline:"2016-05-25T00:00:00.000Z",
    commit_level:1,
    experience_level:2,
    monetary_compensation:2000100,
    required_skills:["cs","design"]
}

const partnerid="a222"
const agency =  await funcs.add_agency(partnerid,consultancy)
const agencyid=agency.data._id;
const tassk=await funcs.add_task(partnerid,task)
const taskid=await tassk.data.data._id
const consulted1=await funcs.feedback(agencyid,taskid,consultance1);
const consulted2=await funcs.feedback(agencyid,taskid,consultance2);
const consulted= await funcs.show_consulted_tasks(partnerid,taskid);
expect(consulted.data.length).toEqual(2)
expect(consulted.data[0].description).toEqual(consultance1.description)
expect(consulted.data[0].deadline).toEqual(consultance1.deadline)
expect(consulted.data[0].commit_level).toEqual(consultance1.commit_level)
expect(consulted.data[1].experience_level).toEqual(consultance2.experience_level)
expect(consulted.data[1].monetary_compensation).toEqual(consultance2.monetary_compensation)
expect(consulted.data[1].required_skills).toEqual(consultance2.required_skills)
await funcs.delete_task(taskid)
await funcs.delete_agency(agencyid)
})


test("trying to show consultancies for a not exist certain task",async()=>{
  try{
    const agencyid="5c9d109c503e9211ffcae4de"
    const taskid="balabizo1234"
    const consulted1=await funcs.show_consulted_tasks(agencyid,taskid);
    expect.assertions(1)
    //expect(getcourse.status).toBe(200)
  }
  catch(error){
    expect.assertions(1)
    expect(error.response.status).toBeGreaterThanOrEqual(400)
  }
})

test("show certain consultance for a certain task",async()=>{
  expect.assertions(6)
     const consultancy={
     name:"agency to consult",
     information:"infoooo",
     parteners:["partner500","partner3000"],
     members:["updated012c","updated"],
     reports:["rep5","rep2"]
   }
  const task={
         description:"desc2",
         consult_needed:true,
         time:"2016-04-12",
         level_of_commitment:3,
         experiance_level:2,
         monetory_compensation:20222,
         required_skills:["cs","marketing"]
       }
  
       const consultance={
        description:"desccons22",
         deadline:"2016-05-25T00:00:00.000Z",
        commit_level:1,
        experience_level:2,
        monetary_compensation:2000100,
        required_skills:["cs","design"]
    }

const partnerid="a222"
const agency =  await funcs.add_agency(partnerid,consultancy)
const agencyid=agency.data._id;
const tassk=await funcs.add_task(partnerid,task)
const taskid=await tassk.data.data._id
const consulted1=await funcs.feedback(agencyid,taskid,consultance);
const consulted= await funcs.show_consulted_task(partnerid,taskid,agencyid);
expect(consulted.data.description).toEqual(consultance.description)
expect(consulted.data.deadline).toEqual(consultance.deadline)
expect(consulted.data.commit_level).toEqual(consultance.commit_level)
expect(consulted.data.experience_level).toEqual(consultance.experience_level)
expect(consulted.data.monetary_compensation).toEqual(consultance.monetary_compensation)
expect(consulted.data.required_skills).toEqual(consultance.required_skills)
await funcs.delete_task(taskid)
await funcs.delete_agency(agencyid)
})

test("trying to show a not exist consultance for a certain task",async()=>{
  const consultancy={
    name:"agency to consult",
    information:"infoooo",
    parteners:["partner500","partner3000"],
    members:["updated012c","updated"],
    reports:["rep5","rep2"]
  }
 const task={
        description:"desc2",
        consult_needed:true,
        time:"2016-04-12",
        level_of_commitment:3,
        experiance_level:2,
        monetory_compensation:20222,
        required_skills:["cs","marketing"]
      }

const partnerid="a222"
const agency =  await funcs.add_agency(partnerid,consultancy)
const agencyid=agency.data._id;
const tassk=await funcs.add_task(partnerid,task)
const taskid=await tassk.data.data._id
  try{
const consulted= await funcs.show_consulted_task(partnerid,taskid,agencyid);
expect.assertions(1)
      }
      catch(error){
        expect.assertions(1)
        expect(error.response.status).toBeGreaterThanOrEqual(400)
      }
await funcs.delete_task(taskid)
await funcs.delete_agency(agencyid)
})

test("accepting a consultance of a certain task",async()=>{
  expect.assertions(6)
  const consultancy={
    name:"agency to consult",
    information:"infoooo",
    parteners:["partner500","partner3000"],
    members:["updated012c","updated"],
    reports:["rep5","rep2"]
  }
 const task={
        description:"desc2",
        consult_needed:true,
        time:"2016-04-12",
        level_of_commitment:3,
        experiance_level:2,
        monetory_compensation:20222,
        required_skills:["cs","marketing"]
      }
 
      const consultance={
       description:"desccons22",
        deadline:"2016-05-25T00:00:00.000Z",
       commit_level:1,
       experience_level:2,
       monetary_compensation:2000100,
       required_skills:["cs","design"]
   }

const partnerid="a222"
const agency =  await funcs.add_agency(partnerid,consultancy)
const agencyid=agency.data._id;
const tassk=await funcs.add_task(partnerid,task)
const taskid=await tassk.data.data._id
const consulted1=await funcs.feedback(agencyid,taskid,consultance);
const accepted=await funcs.accept_consulted_task(partnerid,taskid,agencyid)
const acceptedid=accepted.data._id;
expect(accepted.data.description).toEqual(consultance.description)
expect(accepted.data.deadline).toEqual(consultance.deadline)
expect(accepted.data.commit_level).toEqual(consultance.commit_level)
expect(accepted.data.experience_level).toEqual(consultance.experience_level)
expect(accepted.data.monetary_compensation).toEqual(consultance.monetary_compensation)
expect(accepted.data.required_skills).toEqual(consultance.required_skills)
await funcs.delete_task(acceptedid)
await funcs.delete_agency(agencyid)
})

test("trying to accept a not exist consultance of a certain task",async()=>{
  expect.assertions(6)
  const consultancy={
    name:"agency to consult",
    information:"infoooo",
    parteners:["partner500","partner3000"],
    members:["updated012c","updated"],
    reports:["rep5","rep2"]
  }
 const task={
        description:"desc2",
        consult_needed:true,
        time:"2016-04-12",
        level_of_commitment:3,
        experiance_level:2,
        monetory_compensation:20222,
        required_skills:["cs","marketing"]
      }

const partnerid="a222"
const agency =  await funcs.add_agency(partnerid,consultancy)
const agencyid=agency.data._id;
const tassk=await funcs.add_task(partnerid,task)
const taskid=await tassk.data.data._id
try{
  const accepted=await funcs.accept_consulted_task(partnerid,taskid,agencyid)
  expect.assertions(1)
}
catch(error){
  expect.assertions(1)
  expect(error.response.status).toBeGreaterThanOrEqual(400)
}
await funcs.delete_task(taskid)
await funcs.delete_agency(agencyid)
})

test("updating a consultance of a certain task",async()=>{
  expect.assertions(6)
  const consultancy={
    name:"agency to consult",
    information:"infoooo",
    parteners:["partner500","partner3000"],
    members:["updated012c","updated"],
    reports:["rep5","rep2"]
  }
 const task={
        description:"desc2",
        consult_needed:true,
        time:"2016-04-12",
        level_of_commitment:3,
        experiance_level:2,
        monetory_compensation:20222,
        required_skills:["cs","marketing"]
      }
 
      const consultance={
       description:"desccons22",
        deadline:"2016-05-25T00:00:00.000Z",
       commit_level:1,
       experience_level:2,
       monetary_compensation:2000100,
       required_skills:["cs","design"]
   }
   const datatoupdate={
    description:"updated",
    monetary_compensation:300
   }

const partnerid="a222"
const agency =  await funcs.add_agency(partnerid,consultancy)
const agencyid=agency.data._id;
const tassk=await funcs.add_task(partnerid,task)
const taskid=await tassk.data.data._id
const consulted1=await funcs.feedback(agencyid,taskid,consultance);
const updated=await funcs.update_consultance(agencyid,taskid,datatoupdate)
expect(updated.data.description).toEqual(datatoupdate.description)
expect(updated.data.deadline).toEqual(consultance.deadline)
expect(updated.data.commit_level).toEqual(consultance.commit_level)
expect(updated.data.experience_level).toEqual(consultance.experience_level)
expect(updated.data.monetary_compensation).toEqual(datatoupdate.monetary_compensation)
expect(updated.data.required_skills).toEqual(consultance.required_skills)
await funcs.delete_task(taskid)
await funcs.delete_agency(agencyid)
})

test("trying to update a not exist consultance of a certain task",async()=>{
  const consultancy={
    name:"agency to consult",
    information:"infoooo",
    parteners:["partner500","partner3000"],
    members:["updated012c","updated"],
    reports:["rep5","rep2"]
  }
 const task={
        description:"desc2",
        consult_needed:true,
        time:"2016-04-12",
        level_of_commitment:3,
        experiance_level:2,
        monetory_compensation:20222,
        required_skills:["cs","marketing"]
      }
 
      const consultance={
       description:"desccons22",
        deadline:"2016-05-25T00:00:00.000Z",
       commit_level:1,
       experience_level:2,
       monetary_compensation:2000100,
       required_skills:["cs","design"]
   }
   const datatoupdate={
    description:"updated",
    monetary_compensation:300
   }
   const partnerid="a222"
const agency =  await funcs.add_agency(partnerid,consultancy)
const agencyid=agency.data._id;
const tassk=await funcs.add_task(partnerid,task)
const taskid=await tassk.data.data._id
try{
  const updated=await funcs.update_consultance("balabizo",taskid,datatoupdate)
  expect.assertions(1)
}
catch(error){
  expect.assertions(1)
  expect(error.response.status).toBeGreaterThanOrEqual(400)
}
await funcs.delete_task(taskid)
await funcs.delete_agency(agencyid)
})

test("updating a consultance of a certain task with wrong validations",async()=>{
  expect.assertions(6)
  const consultancy={
    name:"agency to update",
    information:"infoooo",
    parteners:["partner500","partner3000"],
    members:["updated012c","updated"],
    reports:["rep5","rep2"]
  }
 const task={
        description:"desc2",
        consult_needed:true,
        time:"2016-04-12",
        level_of_commitment:3,
        experiance_level:2,
        monetory_compensation:20222,
        required_skills:["cs","marketing"]
      }
 
      const consultance={
       description:"desccons22",
        deadline:"2016-05-25T00:00:00.000Z",
       commit_level:1,
       experience_level:2,
       monetary_compensation:2000100,
       required_skills:["cs","design"]
   }
   const datatoupdate={
    description:"updated",
    monetary_compensation:true
   }

const partnerid="a222"
const agency =  await funcs.add_agency(partnerid,consultancy)
const agencyid=agency.data._id;
const tassk=await funcs.add_task(partnerid,task)
const taskid=await tassk.data.data._id
const consulted1=await funcs.feedback(agencyid,taskid,consultance);
try{
  const updated=await funcs.update_consultance(agencyid,taskid,datatoupdate)
  expect.assertions(1)
}
catch(error){
  expect.assertions(1)
  expect(error.response.status).toBeGreaterThanOrEqual(400)
}
await funcs.delete_task(taskid)
await funcs.delete_agency(agencyid)
})

test("deleting a consultance of a certain task",async()=>{
  expect.assertions(8)
  const consultancy={
    name:"agency to delete",
    information:"infoooo",
    parteners:["partner500","partner3000"],
    members:["updated012c","updated"],
    reports:["rep5","rep2"]
  }
 const task={
        description:"desc2",
        consult_needed:true,
        time:"2016-04-12",
        level_of_commitment:3,
        experiance_level:2,
        monetory_compensation:20222,
        required_skills:["cs","marketing"]
      }
 
      const consultance={
       description:"desccons22",
        deadline:"2016-05-25T00:00:00.000Z",
       commit_level:1,
       experience_level:2,
       monetary_compensation:2000100,
       required_skills:["cs","design"]
   }

const partnerid="a222"
const agency =  await funcs.add_agency(partnerid,consultancy)
const agencyid=agency.data._id;
const tassk=await funcs.add_task(partnerid,task)
const taskid=await tassk.data.data._id
const consulted1=await funcs.feedback(agencyid,taskid,consultance);
const len=consulted1.data.cunsulties_done.length
const deleted=await funcs.delete_consultance(agencyid,taskid)
const taskedited=await funcs.get_task(taskid)
const len1=taskedited.data.data.cunsulties_done.length
expect(len1).toEqual(len-1)
expect(deleted.data._id).toEqual(consulted1.data.cunsulties_done[0]._id)
expect(deleted.data.description).toEqual(consulted1.data.cunsulties_done[0].description)
expect(deleted.data.deadline).toEqual(consulted1.data.cunsulties_done[0].deadline)
expect(deleted.data.commit_level).toEqual(consulted1.data.cunsulties_done[0].commit_level)
expect(deleted.data.experience_level).toEqual(consulted1.data.cunsulties_done[0].experience_level)
expect(deleted.data.monetary_compensation).toEqual(consulted1.data.cunsulties_done[0].monetary_compensation)
expect(deleted.data.required_skills).toEqual(consulted1.data.cunsulties_done[0].required_skills)
await funcs.delete_task(taskid)
await funcs.delete_agency(agencyid)
})

test("trying to delete a not exist consultance of a certain task",async()=>{
  expect.assertions(8)
  const consultancy={
    name:"agency to delete",
    information:"infoooo",
    parteners:["partner500","partner3000"],
    members:["updated012c","updated"],
    reports:["rep5","rep2"]
  }
 const task={
        description:"desc2",
        consult_needed:true,
        time:"2016-04-12",
        level_of_commitment:3,
        experiance_level:2,
        monetory_compensation:20222,
        required_skills:["cs","marketing"]
      }
 
      const consultance={
       description:"desccons22",
        deadline:"2016-05-25T00:00:00.000Z",
       commit_level:1,
       experience_level:2,
       monetary_compensation:2000100,
       required_skills:["cs","design"]
   }
const partnerid="a222"
const agency =  await funcs.add_agency(partnerid,consultancy)
const agencyid=agency.data._id;
const tassk=await funcs.add_task(partnerid,task)
const taskid=await tassk.data.data._id
try{
const deleted=await funcs.delete_consultance(agencyid,taskid)
expect.assertions(1)
}
catch(error){
  expect.assertions(1)
  expect(error.response.status).toBeGreaterThanOrEqual(400)
}
await funcs.delete_task(taskid)
await funcs.delete_agency(agencyid)
})
