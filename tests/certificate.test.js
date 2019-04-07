
const funcs = require('../functions/certificatefn');
const functions=require('../functions/EducationalOrganizationfn')
jest.setTimeout(180000);



test('Create a certificate', async () => {
  const certificateData = {
		name:'Elbekoo',
    type:'7elw',
    accreditation:'gameel'
}
const educationalOrganizationData={
  name:'kas',
} 
 const partnerId = '4'  
 const educationalOrganization= await functions.createEducationalOrganization(partnerId,educationalOrganizationData)
 const educational = educationalOrganization.data.data

const id = educational._id


const response =  await funcs.getAllCertificate(id)
const length=response.data.length

const created = await funcs.createCertificate(id,certificateData)
const response3 =  await funcs.getAllCertificate(id)


const createdData = created.data
const response2 =  await funcs.getAllCertificate(id)
const len=response2.data.length
const createdId = createdData._id

expect.assertions(4)
  expect(certificateData.name).toEqual(createdData.name)
  expect(certificateData.type).toEqual(createdData.type)
  expect(certificateData.accreditation).toEqual(createdData.accreditation)
  expect(len-length).toBe(1)
  const deleted = await funcs.deleteCertificate(id,createdId)
  const deletedEdu=await functions.deleteEducationalOrganization(id)
})


test('get a certificate by id', async () => {
  const certificateData = {
		name:'Elbekoo',
    type:'7elw',
    accreditation:'gameel'
}
const educationalOrganizationData={
  name:'DOM',
}
 const partnerId = '3'  
 const created= await functions.createEducationalOrganization(partnerId,educationalOrganizationData)
 const createdData = created.data.data
const id =createdData._id

  const createdCertificate = await funcs.createCertificate(id,certificateData)
  const response3 =  await funcs.getAllCertificate(id)
  const createdCertificateData = createdCertificate.data
  const certficateId = createdCertificateData._id

  const read = await funcs.getSpecificCertificate(id,certficateId)
  const response4 =  await funcs.getAllCertificate(id)
  jest.setTimeout(180000);
  const readData = read.data
  expect.assertions(3)
  expect(readData.name).toEqual(createdCertificateData.name)
  expect(readData.type).toEqual(createdCertificateData.type)
  expect(readData.accreditation).toEqual(createdCertificateData.accreditation)
  const deleted = await funcs.deleteCertificate(id,certficateId)
 const deleted1=await functions.deleteEducationalOrganization(id)
})




test('Delete a certificate by id', async () => {
  const certificateData = {
		name:'Elbekoo',
    type:'7elw',
    accreditation:'gameel'
}
const educationalOrganizationData={
  name:'DOM',
}
 const partnerId = '5'  
 const created= await functions.createEducationalOrganization(partnerId,educationalOrganizationData)
 const createdData = created.data.data
const id =createdData._id

const createdCertificate = await funcs.createCertificate(id,certificateData)
const response3 =  await funcs.getAllCertificate(id)

const response =  await funcs.getAllCertificate(id)
const response4 =  await funcs.getAllCertificate(id)

const length=response.data.length
//console.log(len1)
const createdCerificateData = createdCertificate.data
const certificateId = createdCerificateData._id
const deleted = await funcs.deleteCertificate(id,certificateId)
const response5 =  await funcs.getAllCertificate(id)

const deletedData = deleted.data


const response2 =  await funcs.getAllCertificate(id)
const response6 =  await funcs.getAllCertificate(id)

const len=response2.data.length

expect.assertions(4)
  expect(deletedData.name).toEqual(createdCerificateData.name)
  expect(deletedData.type).toEqual(createdCerificateData.type)
  expect(deletedData.accreditation).toEqual(createdCerificateData.accreditation)
  expect(length-len).toBe(1)
  
 const deleted2=await functions.deleteEducationalOrganization(id)
})


// // //////////////////////////////////
test('get a all certificate ', async () => {
  const certificateData = {
		name:'Elbekoo',
    type:'7elw',
    accreditation:'gameel'
}
const educationalOrganizationData={
  name:'DOM',
} 
 const partnerId = '5'  
 const created= await functions.createEducationalOrganization(partnerId,educationalOrganizationData)
 const createdData = created.data.data
const id =createdData._id
const certificateCreated = await funcs.createCertificate(id,certificateData)
  expect.assertions(2)
  const response =  await funcs.getAllCertificate(id)
  jest.setTimeout(180000);
  expect(response).toBeDefined()
  expect(response.status).toEqual(200)
  const deleted=await functions.deleteEducationalOrganization(id)
})


///////////////////////////////
test('Update a certificate by id', async () => {
  const certificateData = {
		name:'Elbekoo',
    type:'7elw',
    accreditation:'gameel'
}
const educationalOrganizationData={
  name:'DOM',
} 
 const partnerId = '4'  
 const created= await functions.createEducationalOrganization(partnerId,educationalOrganizationData)
 const createdData = created.data.data

 const id = createdData._id

  const createdCerficate= await funcs.createCertificate(id,certificateData)
  const response4 =  await funcs.getAllCertificate(id)
  jest.setTimeout(180000);

  const createdCerficateData = createdCerficate.data
  const certificateId = createdCerficateData._id

  
  const dataUpdated = {

    name:'Orabii',
    type:'7elw awii',
    accreditation:'gameel gednn'
  }
 
  const updated = await funcs.updateCertificate(id,certificateId,dataUpdated)
  const response3 =  await funcs.getAllCertificate(id)
  jest.setTimeout(180000);
  const updatedData = updated.data
  expect(updatedData.name).toEqual(dataUpdated.name)
  expect(updatedData.type).toEqual(dataUpdated.type)
  expect(updatedData.accreditation).toEqual(dataUpdated.accreditation)
  const deleted = await funcs.deleteCertificate(id,certificateId)
  const deleted2=await functions.deleteEducationalOrganization(id)

})








 