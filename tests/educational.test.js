const funcs = require('../functions/Edu_organizationsfn');
describe('test functions is found',()=>{
test('create educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.create_Edu)).toBe('function')
  })
  test('delete educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.delete_Edu)).toBe('function')
  })
  test('get educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.get_Edu)).toBe('function')
  })
  test('get all educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.get_allEdu)).toBe('function')
  })
  test('update educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.update_Edu)).toBe('function')
  })
  test('get all courses of an educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.get_all_C_Edu)).toBe('function')
  })
  test('get specific course of an educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.get_specific_C_Edu)).toBe('function')
  })
  
  test('create course of specific educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.create_course_Edu)).toBe('function')
  })
  test('create course of specific educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.update_course_edu)).toBe('function')
  });
});
 describe('educational organization',()=>{
  test('create an educational organization ',async()=>{
    const data={
        name:"BUE",
    }
    const partner_Id = "5"
    const response =await funcs.get_allEdu()
    const length=response.data.data.length
    const created= await funcs.create_Edu(partner_Id,data)
    const createdData = created.data.data
    const id = createdData['_id']
    const response2=await funcs.get_allEdu()
    const len =response2.data.data.length
    expect.assertions(2)
    expect(createdData.name).toEqual(data.name)
    expect(len-length).toBe(1) 
    const deleted=await funcs.delete_Edu(id)
    
})

test('get an educational organization by id', async () => {
  const data = {
      name:"GUC",
}
  const partner_Id = "5"
  const created= await funcs.create_Edu(partner_Id,data)
  const createdData = created.data.data
  const id = createdData['_id']
  const response = await funcs.get_Edu(id)
  const responseData = response.data.data
  expect.assertions(1)
  expect( responseData.name).toEqual(createdData.name)
  const deleted = await funcs.delete_Edu(id)
  
})
test('delete an educational organization by id', async () => {
  const data = {
      name:"GUC",
}
  const partner_Id = "5"
  const created= await funcs.create_Edu(partner_Id,data)
  const createdData = created.data.data
  const id = createdData['_id']
  const res=await funcs.get_allEdu()
  const length =res.data.data.length
  const deleted = await funcs.delete_Edu(id)
  const deletedData = deleted.data.data
  const response=await funcs.get_allEdu()
  const len=response.data.data.length
  expect.assertions(2)
  expect( deletedData .name).toEqual(createdData.name)
  expect(len).toEqual(length-1) 
})

test('update an educational organization by id', async () => {
  const data = {
      name:"GUC",
}
  const partner_Id = "6"
  const created= await funcs.create_Edu(partner_Id,data)
  const createdData = created.data.data
  const id = createdData['_id']
  const update={
      name:"MIU"
  }
  const updated = await funcs.update_Edu(id,update)
  const updateData = updated.data.data
  expect.assertions(2)
  //expect(updateData.name).toEqual(update.name)
  expect(updated).toBeDefined()
  expect(updated.status).toEqual(200)
  const deleted = await funcs.delete_Edu(id)
  
})
//check that get all retrive data not error
test('get all educational organization',async()=>{
  try{
    expect.assertions(2)
  const response =  await funcs.get_allEdu()
  expect(response).toBeDefined()
  expect(response.status).toEqual(200)

  }
  catch(error){
    expect.assertions(1)
    expect(error.response.status).toBeGreaterThanOrEqual(400)
    console.log('Not found')
  }

});
test('delete not found Edu',async()=>{
  try{
  expect.assertions(3)
  const response=await funcs.get_allEdu()
  expect (response).toBeDefined()
  const length= response.data.data.length
  if(length>0){
  const id =123
  const res=await funcs.delete_Edu(id)
  expect(res).toBeDefined()
  const resp=await funcs.get_allEdu()
  const lengthx=resp.data.data.length
  expect(lengthx).toEqual(length-1)
  
  }}
  catch(error){
    expect.assertions(2)
    expect(error.response.status).toBeGreaterThanOrEqual(400)
    console.log('Not found')
  }
});
test('create edu without validations print not found',async()=>{
  try{
    expect.assertions(1)
    const id =120
    const response= await funcs.create_Edu(id)
  }
  catch(error){
    expect(error.response.status).toBeGreaterThanOrEqual(400)
    console.log('Not found')
  }
})
test('get not found edu will result error print not found',async()=>{
  try{
    expect.assertions(1)
    const id =123
  const response =  await funcs.get_Edu(id)
  expect(response.status).toEqual(200) 
  }
  catch(error){
    expect(error.response.status).toBeGreaterThanOrEqual(400)
    console.log('Not found')
  }
})
test('Update name of specific educational organization not exist print not found',async()=>{
  try{
    expect.assertions(2)
    const id =123
    const response =  await funcs.update_Edu(123,"MIU")
    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
  }
  catch(error){
    expect.assertions(1)
    expect(error.response.status).toBeGreaterThanOrEqual(400)
    console.log('Not found')
  }
   });
 });
 describe('course for educational organization',()=>{
  //get all courses of already created edu should be with length 0
  test('get all courses of an recentaly educational organization by id', async () => {
    const data = {
        name:"GUC",
}
    const partner_Id = "6"
    const created= await funcs.create_Edu(partner_Id,data)
    const createdData = created.data.data
    const id = createdData['_id']
    const courses=await funcs.get_all_C_Edu(id)
    expect.assertions(2)
    expect(courses.data.data.length).toBe(0)
    expect(courses.status).toBe(200)
    const del = await funcs.delete_Edu(id)
});
test('get all courses of not found edu educational organization',async()=>{
    try{
      expect.assertions(2)
    const id =123
    const response =  await funcs.get_all_C_Edu(id)
    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
  
    }
    catch(error){
      expect.assertions(1)
      expect(error.response.status).toBeGreaterThanOrEqual(400)
      console.log('Not found')
    }});

    //get course of specific edu
    test('get course of an edu by id', async () => {
        const data = {
            name:"GUC",
    }
    const data1={
        name:"DB",
        educator_name:"Mayar",
        description:"very hard",
        places:124,
        available_places:124,
        payment:800,
        course_duration:40 ,
        start_date:"2019-02-02T22:00:00.000z",
        end_date:"2019-02-02T22:00:00.000z",
        categories:"CS",
        available:true
    }
        const partner_Id = "5"
        const created= await funcs.create_Edu(partner_Id,data)
        const createdData = created.data.data
        const id = createdData['_id']
        const coursecreated=await funcs.create_course_Edu(id,data1)
        const coursedata=coursecreated.data
        const id1=coursedata['_id']
        const getcourse=await funcs.get_specific_C_Edu(id,id1)
        const getdata=getcourse.data
        expect.assertions(9)
        expect(getdata.name).toEqual(coursedata.name)
        expect(getdata.educator_name).toEqual(coursedata.educator_name)
        expect(getdata.description).toEqual(coursedata.description)
        expect(getdata.places).toEqual(coursedata.places)
        expect(getdata.available_places).toEqual(coursedata.available_places)
        expect(getdata.course_duration).toEqual(coursedata.course_duration)
        expect(getdata.payment).toEqual(coursedata.payment)
        expect(getdata.categories).toEqual(coursedata.categories)
        expect(getdata.available).toEqual(coursedata.available)
        const deleted = await funcs.delete_Edu(id)
        const deletedc=await funcs.delete_courses(id1)
      })
//test not found course
test('get not exist course of an edu by id', async () => {
    const data = {
        name:"GUC",
}
 try{
        const partner_Id = "6"
        const created= await funcs.create_Edu(partner_Id,data)
        const createdData = created.data.data
        const id =createdData['_id']   
        
        const getcourse=await funcs.get_specific_C_Edu(id,123)
        const deleted = await funcs.delete_Edu(id)
        expect.assertions(1)
        expect(getcourse.status).toBe(200)
        }
        catch(error){
            expect(error.response.status).toBeGreaterThanOrEqual(400)
            console.log('Not found')
        }
});
//get course for not found edu
test('get  course of not exist edu by id', async () => {
try{
    const getcourse=await funcs.get_specific_C_Edu(1,123)
 expect.assertions(1)
        expect(getcourse.status).toBe(200)
        }
        catch(error){
            expect(error.response.status).toBeGreaterThanOrEqual(400)
            console.log('Not found')
        }
});
test('create course for an edu ', async () => {
  const data = {
      name:"GUC",
}
const data1={
  name:"DB",
  educator_name:"Mayar",
  description:"very hard",
  places:124,
  available_places:124,
  payment:800,
  course_duration:40 ,
  start_date:"2019-02-02T22:00:00.000z",
  end_date:"2019-02-02T22:00:00.000z",
  categories:"CS",
  available:true
}
const partner_Id = "6"
        const created= await funcs.create_Edu(partner_Id,data)
        const createdData = created.data.data
        const id =createdData['_id'] 
        const coursesx = await funcs.get_all_C_Edu(id)
        const lengthx =coursesx.data.data.length 
        const coursecreated=await funcs.create_course_Edu(id,data1)
        const coursedata=coursecreated.data
        const id1=coursedata['_id']
        const courses = await funcs.get_all_C_Edu(id)
        const length =courses.data.data.length 
        expect.assertions(2)
        expect(length-lengthx).toBe(1)
        expect(coursecreated.status).toBe(200)
        const del= await funcs.delete_Edu(id)
        const deletedc=await funcs.delete_courses(id1)
});
//create to not found edu
test('gcreate course for not exist edu ', async () => {
  const data1={
      name:"DB",
      educator_name:"Mayar",
      description:"very hard",
      places:124,
      available_places:124,
      payment:800,
      course_duration:40 ,
      start_date:"2019-02-02T22:00:00.000z",
      end_date:"2019-02-02T22:00:00.000z",
      categories:"CS",
      available:true
  }
      try{
      const id=123
      const coursecreated=await funcs.create_course_Edu(id,data1)
      expect.assertions(1)
      expect(coursecreated.status).toBe(200)
      }
      catch(error){
          expect(error.response.status).toBeGreaterThanOrEqual(400)
          console.log('Not found')
      }
});
//test with wrong validations
//create with wrong validations
test('create course for edu with wrong validations ', async () => {
  const data1={
      name:"DB",
      educator_name:"Mayar",
      description:"very hard",
      places:124,
      
  }
      try{
      const id=123
      const coursecreated=await funcs.create_course_Edu(id,data1)
      expect.assertions(1)
      expect(coursecreated.status).toBe(200)
      }
      catch(error){
          expect(error.response.status).toBeGreaterThanOrEqual(400)
          console.log('Not found')
      }
});

test('update course for an edu ', async () => {
  const data = {
      name:"GUC",
}
const data1={
  name:"DB",
  educator_name:"Mayar",
  description:"very hard",
  places:124,
  available_places:124,
  payment:800,
  course_duration:40 ,
  start_date:"2019-02-02T22:00:00.000z",
  end_date:"2019-02-02T22:00:00.000z",
  categories:"CS",
  available:true
}
const data3={
  name:"SE"
}
const partner_Id = "6"
        const created= await funcs.create_Edu(partner_Id,data)
        const createdData = created.data.data
        const id =createdData['_id'] 
        const coursecreated=await funcs.create_course_Edu(id,data1)
        const id1=coursecreated.data['_id']
        const update=await funcs.update_course_edu(id,id1,data3)
        const updatedcourse=await funcs.get_specific_C_Edu(id,id1)
        const updateData=updatedcourse.data
        expect.assertions(2)
        expect(coursecreated.status).toBe(200)
        expect(updateData.name).toEqual(data3.name)
        const del= await funcs.delete_Edu(id)
        const deletedco=await funcs.delete_courses(id1)
});
test('update not found course for edu',async()=>{
  const data = {
    name:"GUC",
}
const data3={
  name:"SE"
}
try{
const partner_Id = "6"
        const created= await funcs.create_Edu(partner_Id,data)
        const createdData = created.data.data
        const id =createdData['_id'] 
        const update=await funcs.update_course_edu(id,123,data3)
        const deleted = await funcs.delete_Edu(id)
        const updatedcourse=await funcs.get_specific_C_Edu(id,id1)

        const updateData=updatedcourse.data
        const del= await funcs.delete_Edu(id)
        expect.assertions(1)
        expect( updatedcourse.status).toBe(200)
}
catch(error){
  expect(error.response.status).toBeGreaterThanOrEqual(400)
  console.log('Not found')
}
})
test('update course for not found edu',async()=>{

const data3={
  name:"SE"
}
try{
 
        const update=await funcs.update_course_edu(123,123,data3)
        const updatedcourse=await funcs.get_specific_C_Edu(123,123)
        const updateData=updatedcourse.data
        
        expect.assertions(1)
        expect( updatedcourse.status).toBe(200)
}
catch(error){
  expect(error.response.status).toBeGreaterThanOrEqual(400)
  console.log('Not found')
}
})
test('delete course of an edu by id', async () => {
  const data = {
      name:"GUC",
}
const data1={
  name:"DB",
  educator_name:"Mayar",
  description:"very hard",
  places:124,
  available_places:124,
  payment:800,
  course_duration:40 ,
  start_date:"2019-02-02T22:00:00.000z",
  end_date:"2019-02-02T22:00:00.000z",
  categories:"CS",
  available:true
}
  const partner_Id = "5"
  const created= await funcs.create_Edu(partner_Id,data)
  const createdData = created.data.data
  const id = createdData['_id']
  const coursecreated=await funcs.create_course_Edu(id,data1)
  const coursedata=coursecreated.data
  const id1=coursedata['_id']
 const deletecourse=await funcs.delete_course_edu(id,id1)
  
  expect.assertions(1)
  expect(deletecourse.status).toBe(200)
 
  const deleted = await funcs.delete_Edu(id)
  const deletedc=await funcs.delete_courses(id1)
})
test('delete course for not found edu',async()=>{

  try{
   
          const deleted=await funcs.delete_course_edu(123,123)
          
          
          expect.assertions(1)
          expect(deleted.status).toBe(200)
  }
  catch(error){
    expect(error.response.status).toBeGreaterThanOrEqual(400)
    console.log('Not found')
  }
  })
  test('delete course of an edu by id', async () => {
    const data = {
        name:"GUC",
  }
  try{
  const partner_Id = "5"
  const created= await funcs.create_Edu(partner_Id,data)
  const createdData = created.data.data
  const id = createdData['_id']
  const deleted=await funcs.delete_course_edu(id,123)
  const deleted1 = await funcs.delete_Edu(id)
  expect.assertions(1)
  expect(deleted.status).toBe(200)
  }
  catch(error){
    expect(error.response.status).toBeGreaterThanOrEqual(400)
    console.log('Not found')
  }

});
}) ;