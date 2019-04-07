const funcs = require('../functions/educatorfn');
const functions = require('../functions/educationalOrganizationfn')

jest.setTimeout(200000)

describe('educator for educational organization', () => {
  //get all courses of already created edu should be with length 0
  test('get all educators of an recentaly educational organization by id', async () => {
    const educationalOrgnization = {
      name: 'GUC',
    }
    const partnerId = '6'
    const created = await functions.createEducationalOrganization(partnerId, educationalOrgnization)
    const createdData = created.data.data
    const id = createdData['_id']
    const educators = await funcs. getAllEducators(id)
    expect.assertions(2)
    expect(educators.data.length).toBe(0)
    expect(educators.status).toBe(200)
    const deleted = await functions.deleteEducationalOrganization(id)
  });

  test('get educator of an edu by id', async () => {
    const educationalOrgnization = {
      name: 'GUC',
    }
    const educator = {
      name: 'A Tale of Two Cities',
      experienceLevel: 222,
      contact: '01111111111'
    }

    const partnerId = '5'
    const created= await functions.createEducationalOrganization(partnerId,educationalOrgnization)
    const createdData = created.data.data
    const id = createdData['_id']
    const coursecreated=await funcs.createEducator(id,educator)
    const coursedata=coursecreated.data
    const id1=coursedata['_id']
    const getcourse=await funcs.getSpecificEducator(id,id1)
    const getData=getcourse.data
    
    expect(getData.name).toEqual(educator.name)
    expect(getData.experienceLevel).toEqual(educator.experienceLevel)
    expect(getData.contact).toEqual(educator.contact)

    const Deleted = await functions.deleteEducationalOrganization(id)
  
  })



  test('Create a educator in Spec educational organization', async () => {
    const  educationalOrgnization= {

      name: 'tagmo3',


    }
    const partnerId = '45'
    const created = await functions.createEducationalOrganization(partnerId, educationalOrgnization)
    const createdData = created.data.data
    const id = createdData['_id']


    const educator = {
      name: 'A Tale of Two Cities',
      experienceLevel: 222,
      contact: '01111111111'
    }

    const response = await funcs. getAllEducators(id)

    const Length = response.data.length
    const createEducator = await funcs.createEducator(id, educator);///////

    const createdEducatorData = createEducator.data


    const response2 = await funcs. getAllEducators(id)
    const response3 = await funcs. getAllEducators(id)
    const Length2 = response3.data.length
    expect.assertions(4)
    expect(educator.name).toEqual(createdEducatorData.name)
    expect(educator.experienceLevel).toEqual(createdEducatorData.experienceLevel)
    expect(educator.contact).toEqual(createdEducatorData.contact)

    expect(Length2 - Length).toBe(1)
    const deleted = await functions.deleteEducationalOrganization(id)

  })



  test('delete educator of an edu by id', async () => {
    const educationalOrgnization = {
      name: "GUC",
    }
    const educator = {
      name: 'A Tale of Two Cities',
      experienceLevel: 222,
      contact: '01111111111'
    }

    const partnerId = '5'
    const created = await functions.createEducationalOrganization(partnerId, educationalOrgnization)
    const createdData = created.data.data
    const id = createdData['_id']
    const educatorCreated = await funcs.createEducator(id, educator)
    const educatorData = educatorCreated.data
    const id1 = educatorData['_id']
    const deletEducator = await funcs.deleteEducator(id, id1)

    expect.assertions(1)
    expect(deletEducator.status).toBe(200)

    const deleted = await functions.deleteEducationalOrganization(id)

  })

  test('update educators of an edu by id', async () => {
    const educationalOrgnization = {
      name: 'GUC',
    }
    const educator = {
      name: 'A Tale of Two Cities',
      experienceLevel: 222,
      contact: '01111111111'
    }
    const educatorUpdated = {
      name: 'A Tale'
    }

    const partnerId = '5'
    const created = await functions.createEducationalOrganization(partnerId, educationalOrgnization)
    const createdData = created.data.data
    const id = createdData['_id']
    const educatorCreated = await funcs.createEducator(id, educator)
    const educatorData = educatorCreated.data
    const id1 = educatorData['_id']
    const updated = await funcs.updateEducator(id, educatorUpdated, id1)
    

    expect.assertions(2)
    expect(updated).toBeDefined()
    expect(updated.status).toBe(200)
    const del = await functions.deleteEducationalOrganization(id)
  })
});

