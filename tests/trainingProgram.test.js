
const funcs = require('../functions/trainingProgramfn');
const functions=require('../functions/EducationalOrganizationfn')
jest.setTimeout(180000);

test('Create a training programs', async () => {
    const programData = {
      name:"badr",
      type:"eshta",
      description:"Elbekoo",
      duration:"3 weeks",
      applyDueDate:"2016-04-12T00:00:00.000Z",
      startDate:"2016-07-12T00:00:00.000Z"
      
  }
  const educationalOrganizationData={
    name:"BRG",
  } 
   const partnerId = "4"  
   const createdEducationalOrganization= await functions.createEducationalOrganization(partnerId,educationalOrganizationData)
   const creatededucationalOrganizationData = createdEducationalOrganization.data.data
  
  const id = creatededucationalOrganizationData._id
  
  const response =  await funcs.getAllPrograms(id)
  const response3 =  await funcs.getAllPrograms(id)
  const length=response.data.length
  // console.log(len1)
  const created = await funcs.createPrograms(id,programData)
  const response4 =  await funcs.getAllPrograms(id)
  const createdData = created.data
  const response2 =  await funcs.getAllPrograms(id)
  const len=response2.data.length
  // console.log(len2)
  const programId = createdData._id
  expect.assertions(7)
    expect(programData.name).toEqual(createdData.name)
    expect(programData.type).toEqual(createdData.type)
    expect(programData.description).toEqual(createdData.description)
    expect(programData.duration).toEqual(createdData.duration)
    expect(programData.applyDueDate).toEqual(createdData.applyDueDate)
    expect(programData.startDate).toEqual(createdData.startDate)
    expect(len-length).toBe(1)
    const deleted = await funcs.deletePrograms(id,programId)
    const deletedEdu=await functions.deleteEducationalOrganization(id)
  })
  
  
  //////////////////////////////////////////
  test('get a training programs by id', async () => {
    const programData = {

        name:"badr",
        type:"eshta",
        description:"Elbekoo",
        duration:"3 weeks",
        applyDueDate:"2016-04-12T00:00:00.000Z",
        startDate:"2016-07-12T00:00:00.000Z"
      
  }
  const educationalOrganizationData={
    name:"DOM",
  } 
   const partnerId = "3"  
   const createdEducationalOrganization= await functions.createEducationalOrganization(partnerId,educationalOrganizationData)
   const creatededucationalOrganizationData = createdEducationalOrganization.data.data
  const id =creatededucationalOrganizationData._id
  
    const created = await funcs.createPrograms(id,programData)
    
    const response3 =  await funcs.getAllPrograms(id)

    const createdData = created.data
    const programId = createdData._id
  
    const read = await funcs.getSpecificPrograms(id,programId)

    
    const response4 =  await funcs.getAllPrograms(id)
    jest.setTimeout(180000);
    const readData = read.data
    expect.assertions(2)
    expect(readData.name).toEqual(createdData.name)
    expect(readData.type).toEqual(createdData.type)
    const deleted = await funcs.deletePrograms(id,programId)
   const deleted1=await functions.deleteEducationalOrganization(id)
  })
  
  
  //////////////////////////////////////////
  test('Delete a training program by id', async () => {
    const programData = {
  
      name:"badr",
      type:"eshta",
      description:"Elbekoo",
      duration:"3 weeks",
      applyDueDate:"2016-04-12T00:00:00.000Z",
      startDate:"2016-07-12T00:00:00.000Z"
      
      
  }
  const educationalOrganizationData={
    name:"RPJ",
  } 
   const partnerId = "5"  
   const createdEducationalOrganization= await functions.createEducationalOrganization(partnerId,educationalOrganizationData)
   const creatededucationalOrganizationData = createdEducationalOrganization.data.data
  const id =creatededucationalOrganizationData._id
  

  const res =  await funcs.getAllPrograms(id)
  
  
  const created = await funcs.createPrograms(id,programData)
  const response3 =  await funcs.getAllPrograms(id)
  
  const response =  await funcs.getAllPrograms(id)
  const response4 =  await funcs.getAllPrograms(id)
  const length=response.data.length
  
  const createdData = created.data
  const programId = createdData._id

  const deleted = await funcs.deletePrograms(id,programId)
  
  const response5 =  await funcs.getAllPrograms(id)
  jest.setTimeout(180000);
  const deletedData = deleted.data
  
  const response2 =  await funcs.getAllPrograms(id)
  const response6 =  await funcs.getAllPrograms(id)
  const len=response2.data.length
  
  expect.assertions(3)
    expect(deletedData.name).toEqual(createdData.name)
    expect(deletedData.type).toEqual(createdData.type)
    expect(length-len).toBe(1)
    
   const deleted2=await functions.deleteEducationalOrganization(id)
  })
 
  //////////////////////////////////
  test('get a all training programs ', async () => {
    const programData = {
  
        name:"badr",
        type:"eshta",
        description:"Elbekoo",
        duration:"3 weeks",
        applyDueDate:"2016-04-12T00:00:00.000Z",
        startDate:"2016-07-12T00:00:00.000Z"
      
      
  }
  const educationalOrganizationData={
    name:"FUE",
  } 
   const partnerId = "5"  
   const createdEducationalOrganization= await functions.createEducationalOrganization(partnerId,educationalOrganizationData)
   const creatededucationalOrganizationData = createdEducationalOrganization.data.data
  const id =creatededucationalOrganizationData._id
  const created = await funcs.createPrograms(id,programData)
    expect.assertions(2)
    const response =  await funcs.getAllPrograms(id)
    jest.setTimeout(180000);
    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
    const deleted2=await functions.deleteEducationalOrganization(id)
  })
  
  ///////////////////////////////////
  test('Update a training programs by id', async () => {
    const programData = {
  
        name:"badr",
        type:"eshta",
        description:"Elbekoo",
        duration:"3 weeks",
        applyDueDate:"2016-04-12T00:00:00.000Z",
        startDate:"2016-07-12T00:00:00.000Z"
  }
  const educationalOrganizationData={
    name:"kas",
  } 
   const partnerId = "4"  
   const createdEducationalOrganization= await functions.createEducationalOrganization(partnerId,educationalOrganizationData)
   const creatededucationalOrganizationData = createdEducationalOrganization.data.data
  
   const id = creatededucationalOrganizationData._id
  
    const created = await funcs.createPrograms(id,programData)
    const response3 =  await funcs.getAllPrograms(id)
    const createdData = created.data
    const programId = createdData._id
  
     console.log(id)
    const dataUpdated = {
  
        name:"Orabii",
        type:"gameel",
        description:"Elbeko",
        duration:"4 weeks",
        applyDueDate:"2016-05-12T00:00:00.000Z",
        startDate:"2016-08-12T00:00:00.000Z"
    }
  
     
  
    const updated = await funcs.updatePrograms(id,programId,dataUpdated)

    const response4 =  await funcs.getAllPrograms(id)
    jest.setTimeout(180000);
   
    const updatedData = updated.data
    
    expect.assertions(2)
    expect(updatedData.name).toEqual(dataUpdated.name)
    expect(updatedData.type).toEqual(dataUpdated.type)
    const deleted = await funcs.deletePrograms(id,programId)
    const deleted2=await functions.deleteEducationalOrganization(id)
  
  })
  
  
  
  
  
  
  
   