
const funcs = require('../functions/CoworkingSpace');


jest.setTimeout(200000)

test('GetAll coworking space exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.getAll)).toBe('function')
})


test('Get Specific coworking space exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.getSpec)).toBe('function')
})

test('Create coworking space exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.createOne)).toBe('function')
})

test('Delete coworking space exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.deleteOne)).toBe('function')
})

test('Update coworking space exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.updateOne)).toBe('function')
})



test('Create a coworking space', async () => {
  const data = {
		name:"mayar",
	phone_number:"4564654",
	location:"Ain shams",
	business_plans:"3atel",
	facilites:"fff"	,max_no_rooms:5
	
}
const partner_Id = "45"
const response =  await funcs.getAll()
const len1=response.data.length

const created = await funcs.createOne(partner_Id,data)

  const createdData = created.data
  const response2 =  await funcs.getAll()
   const len2=response2.data.length
   const resp =  await funcs.getAll()
   const respp =  await funcs.getAll()
   
   expect.assertions(3)
  expect(data.name).toEqual(createdData.name)
  expect(data.phone_number).toEqual(createdData.phone_number)
  expect(len2-len1).toBe(1)
  
})

test('create  coworking space  with wrong validations',async()=>{
 
  const data1={
      name:"DB",
      
  }
  try{
  const co= await funcs.createOne(data1)

  expect.assertions(1)
  expect(co.status).toBe(200)
  }
  catch(error){
      expect.assertions(1)
      expect(error.response.status).toBeGreaterThanOrEqual(400)
  }
})

test('get an coworking space by id', async () => {
 const data = {
  name:"mayar",
phone_number:"4564654",
location:"Ain shams",
business_plans:"3atel",
facilites:"fff"	,max_no_rooms:5

}
const response =  await funcs.getAll()
const len1=response.data.length
 
  const id = response.data[len1-1]['_id']
  const read = await funcs.getSpec(id)
  const readData = read.data
  expect.assertions(2)
  expect(readData.name).toEqual(data.name)
  expect(readData.phone_number).toEqual(data.phone_number)
})

test('get not exist  CoworkingSpace ', async () => {
 
   
  try{
  const co=await funcs.getSpec("1234")
  
  expect.assertions(1)
  expect(co.status).toBe(200)
}
  catch(error){
    expect.assertions(1)

      expect(error.response.status).toBeGreaterThanOrEqual(400)
  }
})

test('Update a coworking space by id', async () => {
  const data = {
		name:"mayar",
	phone_number:"4564654",
	location:"Ain shams",
	business_plans:"3atel",
	facilites:"fff"	,max_no_rooms:5
	
}

  const dataToUpdate = {
    phone_number: '86486'
  }

  const dataUpdated = {

		name:"mayar",
	phone_number:"86486",
	location:"Ain shams",
	business_plans:"3atel",
	facilites:"fff"	,max_no_rooms:5
  }
  const response =  await funcs.getAll()
  const len1=response.data.length
   
    const id = response.data[len1-1]['_id']
   const updated = await funcs.updateOne(id, dataToUpdate)
  const updatedData = updated.data
  expect.assertions(1)
  expect(updatedData.phone_number).toEqual(dataUpdated.phone_number)
  
})


test('update not exist  coworkingSpace ', async () => {

  try{
  const co=await funcs.updateOne("123",{phone_number:"54654646"})
  
  expect.assertions(1)
  expect(co.status).toBe(200)
}
  catch(error){
    expect.assertions(1)
    expect(error.response.status).toBeGreaterThanOrEqual(400)
  }
})

test('update coworkingSpace  with wrong validations',async()=>{
  const response =  await funcs.getAll()
  const len=response.data.length
  const id= response.data[len-1]['_id']
     
    const data1={
        phone_number:46546,
        
    }
    try{
    const co= await funcs.updateOne(id,data1)
  
    expect.assertions(1)
    expect(co.status).toBe(200)
    }
    catch(error){
        expect.assertions(1)
        expect(error.response.status).toBeGreaterThanOrEqual(400)
    }
  })


  
  test('delete not exist coworkingSpace ', async () => {
    
    try{
    const co=await funcs.deleteOne("4564")
    
    expect.assertions(1)
    expect(co.status).toBe(200)
}
    catch(error){
      expect.assertions(1)

      expect(error.response.status).toBeGreaterThanOrEqual(400)
    }
  })

test('Delete a coworking space by id', async () => {

  const data = {

		name:"mayar",
	phone_number:"86486",
	location:"Ain shams",
	business_plans:"3atel",
	facilites:"fff"	,max_no_rooms:5
  }
const response =  await funcs.getAll()
const len1=response.data.length
 
  const id = response.data[len1-1]['_id']
  
const deleted = await funcs.deleteOne(id)
const deletedData = deleted.data

const response2 =  await funcs.getAll()
const len2=response2.data.length


expect.assertions(3)
  expect(deletedData.name).toEqual(data.name)
  expect(deletedData.phone_number).toEqual(data.phone_number)
  expect(len1-len2).toBe(1)
  
})



















