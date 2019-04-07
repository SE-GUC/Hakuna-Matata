const funcs = require('../functions/EducationalOrganizationfn');
const functions = require('../functions/coursefn');
describe('test functions is found',()=>{
test('create educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.createEducationalOrganization)).toBe('function')
  })
  test('delete educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.deleteEducationalOrganization)).toBe('function')
  })
  test('get educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.getEducationalOrganization)).toBe('function')
  })
  test('get all educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.getAllEducationalOrganization)).toBe('function')
  })
  test('update educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.updateEducationalOrganization)).toBe('function')
  })
  test('get all courses of an educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.getAllCourses)).toBe('function')
  })
  test('get specific course of an educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.getSpecificCourse)).toBe('function')
  })
  
  test('create course of specific educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.createCourse)).toBe('function')
  })
  test('create course of specific educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.updateCourse)).toBe('function')
  });
});

test('create an educational organization ',async()=>{
  const data={
      name:"BUE",
  }
  const partnerId = "5"
  const response =await funcs.getAllEducationalOrganization()
  const length=response.data.data.length
  const created= await funcs.createEducationalOrganization(partnerId,data)
  const createdData = created.data.data
  const id = createdData['_id']
  const response2=await funcs.getAllEducationalOrganization()
  const len =response2.data.data.length
  expect.assertions(2)
  expect(createdData.name).toEqual(data.name)
  expect(len-length).toBe(1) 
  const deleted=await funcs.deleteEducationalOrganization(id) 
})
test('get an educational organization by id', async () => {
  const data = {
      name:"GUC",
}
  const partnerId = "5"
  const created= await funcs.createEducationalOrganization(partnerId,data)
  const createdData = created.data.data
  const id = createdData['_id']
  const response = await funcs.getEducationalOrganization(id)
  const responseData = response.data.data
  expect.assertions(1)
  expect( responseData.name).toEqual(createdData.name)
  const deleted = await funcs.deleteEducationalOrganization(id)
})
test('delete an educational organization by id', async () => {
  const data = {
      name:"GUC",
}
  const partnerId = "5"
  const created= await funcs.createEducationalOrganization(partnerId,data)
  const createdData = created.data.data
  const id = createdData['_id']
  const res=await funcs.getAllEducationalOrganization()
  const length =res.data.data.length
  const deleted = await funcs.deleteEducationalOrganization(id)
  const deletedData = deleted.data.data
  const response=await funcs.getAllEducationalOrganization()
  const len=response.data.data.length
  expect.assertions(2)
  expect( deletedData .name).toEqual(createdData.name)
  expect(len).toEqual(length-1) 
})
test('update an EducationalOrganizationcational organization by id', async () => {
  const data = {
      name:"GUC",
}
  const partnerId = "6"
  const created= await funcs.createEducationalOrganization(partnerId,data)
  const createdData = created.data.data
  const id = createdData['_id']
  const update={
      name:"MIU"
  }
  const updated = await funcs.updateEducationalOrganization(id,update)
  const updateData = updated.data.data
  expect.assertions(2)
  //expect(updateData.name).toEqual(update.name)
  expect(updated).toBeDefined()
  expect(updated.status).toEqual(200)
  const deleted = await funcs.deleteEducationalOrganization(id)  
})
test('get all educational organization',async()=>{
  try{
    expect.assertions(2)
  const response =  await funcs.getAllEducationalOrganization()
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
  const response=await funcs.getAllEducationalOrganization()
  expect (response).toBeDefined()
  const length= response.data.data.length
  if(length>0){
  const id =123
  const res=await funcs.deleteEducationalOrganization(id)
  expect(res).toBeDefined()
  const resp=await funcs.getAllEducationalOrganization()
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
    const response= await funcs.createEducationalOrganization(id)
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
  const response =  await funcs.getEducationalOrganization(id)
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
    const response =  await funcs.updateEducationalOrganization(123,"MIU")
    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
  }
  catch(error){
    expect.assertions(1)
    expect(error.response.status).toBeGreaterThanOrEqual(400)
    console.log('Not found')
  }
   });
   test('get all courses of an recentaly educational organization by id', async () => {
    const data = {
        name:"GUC",
}
    const partnerId = "6"
    const created= await funcs.createEducationalOrganization(partnerId,data)
    const createdData = created.data.data
    const id = createdData['_id']
    const courses=await funcs.getAllCourses(id)
    expect.assertions(2)
    expect(courses.data.length).toBe(0)
    expect(courses.status).toBe(200)
    const del = await funcs.deleteEducationalOrganization(id)
});
test('get all courses of not found edu educational organization',async()=>{
  try{
    expect.assertions(2)
  const id =123
  const response =  await funcs.getAllCourses(id)
  expect(response).toBeDefined()
  expect(response.status).toEqual(200)

  }
  catch(error){
    expect.assertions(1)
    expect(error.response.status).toBeGreaterThanOrEqual(400)
    console.log('Not found')
  }})
  //get course of specific edu
  test('get course of an edu by id', async () => {
    const data = {
        name:"GUC",
}
const data1={
  name:"DB",
  educatorName:"Mayar",
  description:"very hard",
  places:124,
  availablePlaces:124,
  payment:800,
  courseDuration:40 ,
  startDate:"2019-02-02T22:00:00.000z",
  endDate:"2019-02-02T22:00:00.000z",
  categories:"CS",
  available:true
}
    const partnerId = "5"
    const created= await funcs.createEducationalOrganization(partnerId,data)
    const createdData = created.data.data
    const id = createdData['_id']
   
    const coursecreated=await funcs.createCourse(id,data1)
    const coursedata=coursecreated.data
    const id1=coursedata['_id']
   
    const getcourse=await funcs.getSpecificCourse(id,id1)
    const getdata=getcourse.data
    
    expect.assertions(9)
    expect(getdata.name).toEqual(coursedata.name)
    expect(getdata.educatorName).toEqual(coursedata.educatorName)
    expect(getdata.description).toEqual(coursedata.description)
    expect(getdata.places).toEqual(coursedata.places)
    expect(getdata.availablePlaces).toEqual(coursedata.availablePlaces)
    expect(getdata.courseDuration).toEqual(coursedata.courseDuration)
    expect(getdata.payment).toEqual(coursedata.payment)
    expect(getdata.categories).toEqual(coursedata.categories)
    expect(getdata.available).toEqual(coursedata.available)
    const deleted = await funcs.deleteEducationalOrganization(id)
    const coursedeleted=await functions.deleteCourse(id1)
    
  })
  test('get not exist course of an edu by id', async () => {
    const data = {
        name:"GUC",
}
 try{
        const partnerId = "6"
        const created= await funcs.createEducationalOrganization(partnerId,data)
        const createdData = created.data.data
        const id =createdData['_id']   
        
        const getcourse=await funcs.getSpecificCourse(id,123)
        const deleted = await funcs.deleteEducationalOrganization(id)
        expect.assertions(1)
        expect(getcourse.status).toBe(200)
        }
        catch(error){
            expect(error.response.status).toBeGreaterThanOrEqual(400)
            console.log('Not found')
        }
});
test('get  course of not exist EducationalOrganization by id', async () => {
  try{
      const getcourse=await funcs.getSpecificCourse(1,123)
   expect.assertions(1)
          expect(getcourse.status).toBe(200)
          }
          catch(error){
              expect(error.response.status).toBeGreaterThanOrEqual(400)
              console.log('Not found')
          }
  });
  
test('create course for an EducationalOrganization ', async () => {
  const data = {
      name:"GUC",
}
const data1={
  name:"DB",
  educatorName:"Mayar",
  description:"very hard",
  places:124,
  availablePlaces:124,
  payment:800,
  courseDuration:40 ,
  startDate:"2019-02-02T22:00:00.000z",
  endDate:"2019-02-02T22:00:00.000z",
  categories:"CS",
  available:true
}
const partnerId = "6"
        const created= await funcs.createEducationalOrganization(partnerId,data)
        const createdData = created.data.data
        const id =createdData['_id'] 
        const coursesx = await funcs.getAllCourses(id)
        const lengthx =coursesx.data.length 
        const coursecreated=await funcs.createCourse(id,data1)
        const coursedata=coursecreated.data
        const id1=coursedata['_id']
        const courses = await funcs.getAllCourses(id)
        const length =courses.data.length 
        expect.assertions(2)
        expect(length-lengthx).toBe(1)
        expect(coursecreated.status).toBe(200)
        const del= await funcs.deleteEducationalOrganization(id)
        const coursedeleted=await functions.deleteCourse(id1)
        
});
test('create course for not exist EducationalOrganization ', async () => {
  const data1={
    name:"DB",
    educatorName:"Mayar",
    description:"very hard",
    places:124,
    availablePlaces:124,
    payment:800,
    courseDuration:40 ,
    startDate:"2019-02-02T22:00:00.000z",
    endDate:"2019-02-02T22:00:00.000z",
    categories:"CS",
    available:true
  }
      try{
      const id=123
      const coursecreated=await funcs.createCourse(id,data1)
      expect.assertions(1)
      expect(coursecreated.status).toBe(200)
      }
      catch(error){
          expect(error.response.status).toBeGreaterThanOrEqual(400)
          console.log('Not found')
      }
});
test('create course for edu with wrong validations ', async () => {
  const data1={
      name:"DB",
      educatorName:"Mayar",
      description:"very hard",
      places:124,
      
  }
      try{
      const id=123
      const coursecreated=await funcs.createCourse(id,data1)
      expect.assertions(1)
      expect(coursecreated.status).toBe(200)
      }
      catch(error){
          expect(error.response.status).toBeGreaterThanOrEqual(400)
          console.log('Not found')
      }
});
test('update course for an EducationalOrganization ', async () => {
  const data = {
      name:"GUC",
}
const data1={
  name:"DB",
    educatorName:"Mayar",
    description:"very hard",
    places:124,
    availablePlaces:124,
    payment:800,
    courseDuration:40 ,
    startDate:"2019-02-02T22:00:00.000z",
    endDate:"2019-02-02T22:00:00.000z",
    categories:"CS",
    available:true
}
const data3={
  name:"SE"
}
const partnerId = "6"
        const created= await funcs.createEducationalOrganization(partnerId,data)
        const createdData = created.data.data
        const id =createdData['_id'] 
        const coursecreated=await funcs.createCourse(id,data1)
        const id1=coursecreated.data['_id']
        const update=await funcs.updateCourse(id,id1,data3)
        const updatedcourse=await funcs.getSpecificCourse(id,id1)
        const updateData=updatedcourse.data
        expect.assertions(2)
        expect(coursecreated.status).toBe(200)
        expect(updateData.name).toEqual(data3.name)
        const del= await funcs.deleteEducationalOrganization(id)   
        const coursedeleted=await functions.deleteCourse(id1)    
});
test('update not found course for EducationalOrganization',async()=>{
  const data = {
    name:"GUC",
}
const data3={
  name:"SE"
}
try{
const partnerId = "6"
        const created= await funcs.createEducationalOrganization(partnerId,data)
        const createdData = created.data.data
        const id =createdData['_id'] 
        const update=await funcs.updateCourse(id,123,data3)
        const deleted = await funcs.deleteEducationalOrganization(id)
        const updatedcourse=await funcs.getSpecificCourse(id,id1)

        const updateData=updatedcourse.data
        const del= await funcs.deleteEducationalOrganization(id)
        expect.assertions(1)
        expect( updatedcourse.status).toBe(200)
}
catch(error){
  expect(error.response.status).toBeGreaterThanOrEqual(400)
  console.log('Not found')
}
})
test('update course for not found EducationalOrganization',async()=>{

  const data3={
    name:"SE"
  }
  try{
   
          const update=await funcs.updateCourse(123,123,data3)
          const updatedcourse=await funcs.getSpecificCourse(123,123)
          const updateData=updatedcourse.data
          
          expect.assertions(1)
          expect( updatedcourse.status).toBe(200)
  }
  catch(error){
    expect(error.response.status).toBeGreaterThanOrEqual(400)
    console.log('Not found')
  }
  })
  test('delete course of an EducationalOrganization by id', async () => {
    const data = {
        name:"GUC",
  }
  const data1={
    name:"DB",
    educatorName:"Mayar",
    description:"very hard",
    places:124,
    availablePlaces:124,
    payment:800,
    courseDuration:40 ,
    startDate:"2019-02-02T22:00:00.000z",
    endDate:"2019-02-02T22:00:00.000z",
    categories:"CS",
    available:true
  }
    const partnerId = "5"
    const created= await funcs.createEducationalOrganization(partnerId,data)
    const createdData = created.data.data
    const id = createdData['_id']
    const coursecreated=await funcs.createCourse(id,data1)
    const coursedata=coursecreated.data
    const id1=coursedata['_id']
   const deletecourse=await funcs.deleteCourse(id,id1)
    
    expect.assertions(1)
    expect(deletecourse.status).toBe(200)
   
    const deleted = await funcs.deleteEducationalOrganization(id)
    const coursedeleted=await functions.deleteCourse(id1)
  })
  test('delete course for not found EducationalOrganization',async()=>{

    try{
     
            const deleted=await funcs.deleteCourse(123,123)
            
            
            expect.assertions(1)
            expect(deleted.status).toBe(200)
    }
    catch(error){
      expect(error.response.status).toBeGreaterThanOrEqual(400)
      console.log('Not found')
    }
    })
    test('delete course of an EducationalOrganization by id', async () => {
      const data = {
          name:"GUC",
    }
    try{
    const partnerId = "5"
    const created= await funcs.createEducationalOrganization(partnerId,data)
    const createdData = created.data.data
    const id = createdData['_id']
    const deleted=await funcs.deleteCourse(id,123)
    const deleted1 = await funcs.deleteEducationalOrganization(id)
    expect.assertions(1)
    expect(deleted.status).toBe(200)
    }
    catch(error){
      expect(error.response.status).toBeGreaterThanOrEqual(400)
      console.log('Not found')
    }
  
  });