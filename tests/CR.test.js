///////////////////////////////////////////////////////
//certificates
///////////////////////////////////////////////////////
const funcs = require('../functions/functionsfn');

jest.setTimeout(180000);


  
/////////////////////////////////////////////////////////////////////1

test('Create a certificate', async () => {
  const data = {
		name:"Elbekoo",
    type:"7elw",
    accreditation:"gameel"
}
const data1={
  name:"kas",
} 
 const partner_Id = "4"  
 const created1= await funcs.create_Edu(partner_Id,data1)
 const createdData1 = created1.data.data

const eduorgid = createdData1._id

const response =  await funcs.getAllcertificant(eduorgid)
const len1=response.data.length
// console.log(len1)
const created = await funcs.create_certificant(eduorgid,data)
const response3 =  await funcs.getAllcertificant(eduorgid)
jest.setTimeout(180000);
const createdData = created.data
const response2 =  await funcs.getAllcertificant(eduorgid)
const len2=response2.data.length
// console.log(len2)
const id = createdData._id
expect.assertions(4)
  expect(data.name).toEqual(createdData.name)
  expect(data.type).toEqual(createdData.type)
  expect(data.accreditation).toEqual(createdData.accreditation)
  expect(len2-len1).toBe(1)
  const deleted = await funcs.delete_certificanst(eduorgid,id)
  const deleted1=await funcs.delete_Edu(eduorgid)
})

jest.setTimeout(180000);

//////////////////2

test('get a certificate by id', async () => {
  const data = {

    name:"Elbekoo",
    type:"7elw",
    accreditation:"gameel"
	
}
const data1={
  name:"DOM",
} 
 const partner_Id = "3"  
 const created1= await funcs.create_Edu(partner_Id,data1)
 const createdData1 = created1.data.data
const eduorgid =createdData1._id

  const created = await funcs.create_certificant(eduorgid,data)
  const response3 =  await funcs.getAllcertificant(eduorgid)
  const createdData = created.data
  const id = createdData._id

  const read = await funcs.getspecificcertificant(eduorgid,id)
  const response4 =  await funcs.getAllcertificant(eduorgid)
  jest.setTimeout(180000);
  const readData = read.data
  expect.assertions(3)
  expect(readData.name).toEqual(createdData.name)
  expect(readData.type).toEqual(createdData.type)
  expect(readData.accreditation).toEqual(createdData.accreditation)
  const deleted = await funcs.delete_certificanst(eduorgid,id)
 const deleted1=await funcs.delete_Edu(eduorgid)
})



//////////////////////3
test('Delete a certificate by id', async () => {
  const data = {

    name:"Elbekoo",
    type:"7elw",
    accreditation:"gameel"
	
}
const data1={
  name:"FUE",
} 
 const partner_Id = "5"  
 const created1= await funcs.create_Edu(partner_Id,data1)
 const createdData1 = created1.data.data
const eduorgid =createdData1._id

const created = await funcs.create_certificant(eduorgid,data)
const response3 =  await funcs.getAllcertificant(eduorgid)

const response =  await funcs.getAllcertificant(eduorgid)
const response4 =  await funcs.getAllcertificant(eduorgid)

const len1=response.data.length
//console.log(len1)
const createdData = created.data
const id = createdData._id
const deleted = await funcs.delete_certificanst(eduorgid,id)
const response5 =  await funcs.getAllcertificant(eduorgid)

const deletedData = deleted.data
//console.log(deletedData)

const response2 =  await funcs.getAllcertificant(eduorgid)
const response6 =  await funcs.getAllcertificant(eduorgid)

const len2=response2.data.length
//console.log(len2)
expect.assertions(4)
  expect(deletedData.name).toEqual(createdData.name)
  expect(deletedData.type).toEqual(createdData.type)
  expect(deletedData.accreditation).toEqual(createdData.accreditation)
  expect(len1-len2).toBe(1)
  
 const deleted2=await funcs.delete_Edu(eduorgid)
})


// // //////////////////////////////////
test('get a all certificate ', async () => {
  const data = {

    name:"Elbekoo",
    type:"7elw",
    accreditation:"gameel"
	
}
const data1={
  name:"FUE",
} 
 const partner_Id = "5"  
 const created1= await funcs.create_Edu(partner_Id,data1)
 const createdData1 = created1.data.data
const eduorgid =createdData1._id
const created = await funcs.create_certificant(eduorgid,data)
  expect.assertions(2)
  const response =  await funcs.getAllcertificant(eduorgid)
  jest.setTimeout(180000);
  expect(response).toBeDefined()
  expect(response.status).toEqual(200)
  const deleted2=await funcs.delete_Edu(eduorgid)
})


///////////////////////////////
test('Update a certificate by id', async () => {
  const data = {
		name:"Elbekoo",
    type:"7elw",
    accreditation:"gameel"
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
  const created = await funcs.create_certificant(eduorgid,data)
  const response4 =  await funcs.getAllcertificant(eduorgid)
  jest.setTimeout(180000);

  const createdData = created.data
  const id = createdData._id

  // console.log(id)
  const dataUpdated = {

    name:"Orabii",
    type:"7elw awii",
    accreditation:"gameel gednn"
  }
  // console.log("hena")
  const updated = await funcs.updatecertificate(eduorgid,id,dataUpdated)
  const response3 =  await funcs.getAllcertificant(eduorgid)
  jest.setTimeout(180000);
  // console.log("aywa2")
  const updatedData = updated.data
  console.log(updatedData)
  expect.assertions(3)
  expect(updatedData.name).toEqual(dataUpdated.name)
  expect(updatedData.type).toEqual(dataUpdated.type)
  expect(updatedData.accreditation).toEqual(dataUpdated.accreditation)
  const deleted = await funcs.delete_certificanst(eduorgid,id)
  const deleted2=await funcs.delete_Edu(eduorgid)

})








 