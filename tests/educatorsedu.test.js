const funcs = require('../functions/educators');
const funcs1 = require('../functions/Edu_organizationsfn');

jest.setTimeout(200000)

 describe('educator for educational organization',()=>{
    //get all courses of already created edu should be with length 0
    test('get all educators of an recentaly educational organization by id', async () => {
      const data = {
          name:"GUC",
  }
      const partner_Id = "6"
      const created= await funcs1.create_Edu(partner_Id,data)
      const createdData = created.data.data
      const id = createdData['_id']
      const educators=await funcs.getAll(id)
      expect.assertions(2)
      expect(educators.data.length).toBe(0)
      expect(educators.status).toBe(200)
      const del = await funcs1.delete_Edu(id)
  });

  test('get educator of an edu by id', async () => {
    const data = {
        name:"GUC",
}
const data1 = {
    name: 'A Tale of Two Cities',
    experience_level: 222,
    contact: '01111111111'
}

    const partner_Id = "5"
    const created= await funcs1.create_Edu(partner_Id,data)
    const createdData = created.data.data
    const id = createdData['_id']
    const te=await funcs1.get_allEdu()
    const educatorcreated=await funcs.createOne(id,data1)
    const educatordata=educatorcreated.data
    const id1=educatordata['_id']
    const geteducator=await funcs.getSpec(id,id1)
    const geteducator2=await funcs.getSpec(id,id1)
    const getdata=geteducator2.data
    expect.assertions(3)
    expect(getdata.name).toEqual(educatordata.name)
    expect(getdata. experience_level).toEqual(educatordata. experience_level)
    expect(getdata.contact).toEqual(educatordata.contact)
   
    const deleted = await funcs1.delete_Edu(id)
    
  })
  test('Create a educator in Spec educational organization', async () => {
    const data = {
    
      name:"tagmo3",
  
  
  }
  const partner_Id = "45"
  const created = await funcs1.create_Edu(partner_Id,data)
  const createdData = created.data.data
  const id = createdData['_id']
  
  
  const educators = {
        name: 'A Tale of Two Cities',
        experience_level: 222,
        contact: '01111111111'
  }
  
  const response =  await funcs.getAll(id)
  
  const len1=response.data.length
  const createdr = await funcs.createOne(id,educators);///////
 
  const createdDatar = createdr.data
  
  
  const response2 =  await funcs.getAll(id)
  const response3=  await funcs.getAll(id)
  const len2=response3.data.length
  expect.assertions(4)
      expect(educators.name).toEqual(createdDatar.name)
      expect(educators.experience_level).toEqual(createdDatar.experience_level)
      expect(educators.contact).toEqual(createdDatar.contact)
      
      expect(len2-len1).toBe(1)
      const del = await funcs1.delete_Edu(id)
        
  })
  test('delete educator of an edu by id', async () => {
    const data = {
        name:"GUC",
}
const data1 = {
    name: 'A Tale of Two Cities',
    experience_level: 222,
    contact: '01111111111'
}

    const partner_Id = "5"
    const created= await funcs1.create_Edu(partner_Id,data)
    const createdData = created.data.data
    const id = createdData['_id']
    const educatorcreated=await funcs.createOne(id,data1)
    const educatordata=educatorcreated.data
    const id1=educatordata['_id']
   const deletecourse=await funcs.deleteOne(id,id1)
    
    expect.assertions(1)
    expect(deletecourse.status).toBe(200)
   
    const deleted = await funcs1.delete_Edu(id)
   
  })
  test('update educators of an edu by id', async () => {
    const data = {
        name:"GUC",
}
const data1 = {
    name: 'A Tale of Two Cities',
    experience_level: 222,
    contact: '01111111111'
}
const data2={
    name:'A Tale'
}

    const partner_Id = "5"
    const created= await funcs1.create_Edu(partner_Id,data)
    const createdData = created.data.data
    const id = createdData['_id']
    const educatorcreated=await funcs.createOne(id,data1)
    const educatordata=educatorcreated.data
    const id1=educatordata['_id']
    const updated= await funcs.updateOne(id,data2,id1)
    expect.assertions(2)
    expect(updated).toBeDefined()
    expect(updated.status).toBe(200)
    const del = await funcs1.delete_Edu(id)
})
  }) ;

  describe('master class for educational organization',()=>{
    //get all courses of already created edu should be with length 0
    test('get all master classes of an recentaly educational organization by id', async () => {
      const data = {
          name:"GUC",
  }
      const partner_Id = "6"
      const created= await funcs1.create_Edu(partner_Id,data)
      const createdData = created.data.data
      const id = createdData['_id']
      const masterclass=await funcs.getAll2(id)
      expect.assertions(2)
      expect(masterclass.data.length).toBe(0)
      expect(masterclass.status).toBe(200)
      const del = await funcs1.delete_Edu(id)
  });

  test('get master_class of an edu by id', async () => {
    const data = {
        name:"GUC",
}
const data1 = {
    name: "MMMMH",
    description: "gvarbg",
    payment: "kteeer",
    places: 333,
    available_places: 333,
    course_duration: "espo3",
    start_date: "youmel2rb3",
    end_date: "blell",
    level_of_students: "3aaali",
    effort: "t3bt",
    available: true  
  }

    const partner_Id = "5"
    const created= await funcs1.create_Edu(partner_Id,data)

    const createdData = created.data.data
    const id = createdData['_id']
    const master_class_created=await funcs.createOne2(id,data1)
    const te=await funcs1.get_allEdu()
    const masterdata=master_class_created.data
    const id1=masterdata['_id']
   
    const getmaster=await funcs.getSpec2(id,id1)
    const te1=await funcs1.get_allEdu()
    const getdata=getmaster.data.masterClass
    console.log(getdata)
    expect.assertions(11)
      
    expect(data1.name).toEqual(getdata.name)
           expect(data1.description).toEqual(getdata.description)
           expect(data1.payment).toEqual(getdata.payment)
           expect(data1.places).toEqual(getdata.places)
          expect(data1.available).toEqual(getdata.available)
           expect(data1.available_places).toEqual(getdata.available_places)
           expect(data1.course_duration).toEqual(getdata.course_duration)
           expect(data1.start_date).toEqual(getdata.start_date)
           expect(data1.end_date).toEqual(getdata.end_date)
            expect(data1.level_of_students).toEqual(getdata.level_of_students)
          expect(data1.effort).toEqual(getdata.effort)
   
    const deleted = await funcs1.delete_Edu(id)
    
  })
  test('Create a master class in Spec educational organization', async () => {
    const data = {
    
      name:"tagmo3",
  
  
  }
  const partner_Id = "45"
  const created = await funcs1.create_Edu(partner_Id,data)
  const createdData = created.data.data
  const id = createdData['_id']
  
  
  const data1 = {
    name: "MMMMH",
    description: "gvarbg",
    payment: "kteeer",
    places: 333,
    available_places: 333,
    course_duration: "espo3",
    start_date: "youmel2rb3",
    end_date: "blell",
    level_of_students: "3aaali",
    effort: "t3bt",
    available: true  
  }
  
  const response =  await funcs.getAll2(id)
  
  const len1=response.data.length
  const createdr = await funcs.createOne2(id,data1);///////
 
  const createdDatar = createdr.data
  
  
  const response2 =  await funcs.getAll2(id)
  const response3 =  await funcs.getAll2(id)
  const len2=response3.data.length
  expect.assertions(12)
     
      
      expect(len2-len1).toBe(1)
      expect(createdDatar.name).toEqual(data1.name)
      expect(createdDatar.description).toEqual(data1.description)
      expect(createdDatar.payment).toEqual(data1.payment)
      expect(createdDatar.places).toEqual(data1.places)
     expect(createdDatar.available).toEqual(data1.available)
      expect(createdDatar.available_places).toEqual(data1.available_places)
      expect(createdDatar.course_duration).toEqual(data1.course_duration)
      expect(createdDatar.start_date).toEqual(data1.start_date)
      expect(createdDatar.end_date).toEqual(data1.end_date)
       expect(createdDatar.level_of_students).toEqual(data1.level_of_students)
     expect(createdDatar.effort).toEqual(data1.effort)
      const del = await funcs1.delete_Edu(id)
        
  })
  test('update a master class in Spec educational organization', async () => {
    const data = {
    
      name:"tagmo3",
  
  
  }
  const partner_Id = "45"
  const created = await funcs1.create_Edu(partner_Id,data)
  const createdData = created.data.data
  const id = createdData['_id']
  
  
  const data1 = {
    name: "MMMMH",
    description: "gvarbg",
    payment: "kteeer",
    places: 333,
    available_places: 333,
    course_duration: "espo3",
    start_date: "youmel2rb3",
    end_date: "blell",
    level_of_students: "3aaali",
    effort: "t3bt",
    available: true  
  }
  const data2={
      name:"MM"
  }
  
  const response =  await funcs.getAll2(id)
  
  const len1=response.data.length
  const createdr = await funcs.createOne2(id,data1);///////
  const createdDatar = createdr.data
  const id1=createdDatar['_id']
  const updated=await funcs.updateOne2(id,id1,data2)
  expect.assertions(2)
  expect(updated.status).toBe(200)
  expect(updated).toBeDefined()
  const del = await funcs1.delete_Edu(id)

});
test('delete a master class in Spec educational organization', async () => {
    const data = {
    
      name:"tagmo3",
  
  
  }
  const partner_Id = "45"
  const created = await funcs1.create_Edu(partner_Id,data)
  const createdData = created.data.data
  const id = createdData['_id']
  
  
  const data1 = {
    name: "MMMMH",
    description: "gvarbg",
    payment: "kteeer",
    places: 333,
    available_places: 333,
    course_duration: "espo3",
    start_date: "youmel2rb3",
    end_date: "blell",
    level_of_students: "3aaali",
    effort: "t3bt",
    available: true  
  }
 
  
  const response =  await funcs.getAll2(id)
  
  const len1=response.data.length
  const createdr = await funcs.createOne2(id,data1);///////
  const createdDatar = createdr.data
  const id1=createdDatar['_id']
  
  const deleted= await funcs.deleteOne2(id,id1)
  expect.assertions(2)
  expect(deleted.status).toBe(200)
  expect(deleted).toBeDefined()
  const del = await funcs1.delete_Edu(id)


});
  }) ;