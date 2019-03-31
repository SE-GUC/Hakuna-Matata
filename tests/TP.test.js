
///////////////////////////////////////////////////////
//training programs
///////////////////////////////////////////////////////

const funcs = require('../functions/functionsfn');
jest.setTimeout(180000);



test('Create a training programs', async () => {
    const data = {
          name:"badr",
      type:"eshta",
      
  }
  const data1={
    name:"BRG",
  } 
   const partner_Id = "4"  
   const created1= await funcs.create_Edu(partner_Id,data1)
   const createdData1 = created1.data.data
  
  const eduorgid = createdData1._id
  
  const response =  await funcs.getAllprograms(eduorgid)
  const response3 =  await funcs.getAllprograms(eduorgid)
  const len1=response.data.length
  // console.log(len1)
  const created = await funcs.create_programs(eduorgid,data)
  const response4 =  await funcs.getAllprograms(eduorgid)
  const createdData = created.data
  const response2 =  await funcs.getAllprograms(eduorgid)
  const len2=response2.data.length
  // console.log(len2)
  const id = createdData._id
  expect.assertions(3)
    expect(data.name).toEqual(createdData.name)
    expect(data.type).toEqual(createdData.type)
    expect(len2-len1).toBe(1)
    const deleted = await funcs.delete_programs(eduorgid,id)
    const deleted1=await funcs.delete_Edu(eduorgid)
  })
  
  
  //////////////////////////////////////////
  test('get a training programs by id', async () => {
    const data = {
  
      name:"badr",
      type:"eshta",
      
      
  }
  const data1={
    name:"DOM",
  } 
   const partner_Id = "3"  
   const created1= await funcs.create_Edu(partner_Id,data1)
   const createdData1 = created1.data.data
  const eduorgid =createdData1._id
  
    const created = await funcs.create_programs(eduorgid,data)
    const response3 =  await funcs.getAllprograms(eduorgid)
    const createdData = created.data
    const id = createdData._id
  
    const read = await funcs.getspecificprograms(eduorgid,id)
    const response4 =  await funcs.getAllprograms(eduorgid)
    jest.setTimeout(180000);
    const readData = read.data
    expect.assertions(2)
    expect(readData.name).toEqual(createdData.name)
    expect(readData.type).toEqual(createdData.type)
    const deleted = await funcs.delete_certificanst(eduorgid,id)
   const deleted1=await funcs.delete_Edu(eduorgid)
  })
  
  
  //////////////////////////////////////////
  test('Delete a training program by id', async () => {
    const data = {
  
      name:"badr",
      type:"eshta",
      
      
  }
  const data1={
    name:"RPJ",
  } 
   const partner_Id = "5"  
   const created1= await funcs.create_Edu(partner_Id,data1)
   const createdData1 = created1.data.data
  const eduorgid =createdData1._id
  
  const res =  await funcs.getAllprograms(eduorgid)
  const len=res.data.length
  // console.log(len)
  
  const created = await funcs.create_programs(eduorgid,data)
  const response3 =  await funcs.getAllprograms(eduorgid)
  
  const response =  await funcs.getAllprograms(eduorgid)
  const response4 =  await funcs.getAllprograms(eduorgid)
  const len1=response.data.length
  // console.log(len1)
  const createdData = created.data
  const id = createdData._id
  const deleted = await funcs.delete_programs(eduorgid,id)
  const response5 =  await funcs.getAllprograms(eduorgid)
  jest.setTimeout(180000);
  const deletedData = deleted.data
  
  const response2 =  await funcs.getAllprograms(eduorgid)
  const response6 =  await funcs.getAllprograms(eduorgid)
  const len2=response2.data.length
  // console.log(len2)
  expect.assertions(3)
    expect(deletedData.name).toEqual(createdData.name)
    expect(deletedData.type).toEqual(createdData.type)
    expect(len1-len2).toBe(1)
    
   const deleted2=await funcs.delete_Edu(eduorgid)
  })
 
  //////////////////////////////////
  test('get a all training programs ', async () => {
    const data = {
  
      name:"badr",
      type:"eshta",
      
      
  }
  const data1={
    name:"FUE",
  } 
   const partner_Id = "5"  
   const created1= await funcs.create_Edu(partner_Id,data1)
   const createdData1 = created1.data.data
  const eduorgid =createdData1._id
  const created = await funcs.create_programs(eduorgid,data)
    expect.assertions(2)
    const response =  await funcs.getAllprograms(eduorgid)
    jest.setTimeout(180000);
    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
    const deleted2=await funcs.delete_Edu(eduorgid)
  })
  
  /////////////////////////////////////
  test('Update a training programs by id', async () => {
    const data = {
  
      name:"badr",
      type:"eshta",
  }
  const data1={
    name:"kas",
  } 
   const partner_Id = "4"  
   const created1= await funcs.create_Edu(partner_Id,data1)
   const createdData1 = created1.data.data
  
   const eduorgid = createdData1._id
  //  console.log(eduorgid)
  
    // console.log("aywa")
    const created = await funcs.create_programs(eduorgid,data)
    const response3 =  await funcs.getAllprograms(eduorgid)
    const createdData = created.data
    const id = createdData._id
  
    // console.log(id)
    const dataUpdated = {
  
      name:"raaft",
      type:"peace",
    }
  
    // console.log("hena")
  
    const updated = await funcs.updateprograms(eduorgid,id,dataUpdated)
    const response4 =  await funcs.getAllprograms(eduorgid)
    jest.setTimeout(180000);
    // console.log("aywa2")
    const updatedData = updated.data
    // console.log(updatedData)
    expect.assertions(2)
    expect(updatedData.name).toEqual(dataUpdated.name)
    expect(updatedData.type).toEqual(dataUpdated.type)
    const deleted = await funcs.delete_certificanst(eduorgid,id)
    const deleted2=await funcs.delete_Edu(eduorgid)
  
  })
  
  
  
  
  
  
  
   