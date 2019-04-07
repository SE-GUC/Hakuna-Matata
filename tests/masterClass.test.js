const funcs = require('../functions/masterClassfn');
const funcs1 = require('../functions/educationalOrganizationfn')
describe('master class for educational organization', () => {
    //get all courses of already created edu should be with length 0
    test('get all master classes of an recentaly educational organization by id', async () => {
      const educationalOrgnization = {
        name: "GUC",
      }
      const partnerId = "6"
      const created = await funcs1.createEducationalOrganization(partnerId, educationalOrgnization)
      const createdData = created.data.data
      const id = createdData['_id']
      const masterclass = await funcs.getAllMasterClass(id)
      expect.assertions(2)
      expect(masterclass.data.length).toBe(0)
      expect(masterclass.status).toBe(200)
      const Del = await funcs1.deleteEducationalOrganization(id)
    });
  
    test('get master_class of an edu by id', async () => {
      const educationalOrgnization = {
        name: "GUC",
      }
      const masterClass = {
        name: "MMMMH",
        description: "gvarbg",
        payment: "kteeer",
        places: 333,
        availablePlaces: 333,
        courseDuration: "espo3",
        startDate: "youmel2rb3",
        endDate: "blell",
        levelOfStudents: "3aaali",
        effort: "t3bt",
        available: true
      }
  
      const partnerId = "5"
      const Created = await funcs1.createEducationalOrganization(partnerId, educationalOrgnization)
  
      const createdData = Created.data.data
      const id = createdData['_id']
      const masterClassCreated = await funcs.createMasterClass(id, masterClass)
      
      const masterData = masterClassCreated.data
      const id1 = masterData['_id']
  
      const getMaster = await funcs.getMasterClass(id, id1)
     
      const getData = getMaster.data//.masterClass
      
      expect.assertions(11)
  
      expect(masterClass.name).toEqual(getData.name)
      expect(masterClass.description).toEqual(getData.description)
      expect(masterClass.payment).toEqual(getData.payment)
      expect(masterClass.places).toEqual(getData.places)
      expect(masterClass.available).toEqual(getData.available)
      expect(masterClass.availablePlaces).toEqual(getData.availablePlaces)
      expect(masterClass.courseDuration).toEqual(getData.courseDuration)
      expect(masterClass.startDate).toEqual(getData.startDate)
      expect(masterClass.endDate).toEqual(getData.endDate)
      expect(masterClass.levelOfStudents).toEqual(getData.levelOfStudents)
      expect(masterClass.effort).toEqual(getData.effort)
  
      const deleted = await funcs1.deleteEducationalOrganization(id)
  
    })
    test('Create a master class in Spec educational organization', async () => {
      const educationalOrgnization = {
  
        name: "tagmo3",
  
  
      }
      const partnerId = "45"
      const created = await funcs1.createEducationalOrganization(partnerId, educationalOrgnization)
      const createdData = created.data.data
      const id = createdData['_id']
  
  
      const masterClass = {
        name: "MMMMH",
        description: "gvarbg",
        payment: "kteeer",
        places: 333,
        availablePlaces: 333,
        courseDuration: "espo3",
        startDate: "youmel2rb3",
        endDate: "blell",
        levelOfStudents: "3aaali",  
        effort: "t3bt",   
        available: true
      }
  
      const response = await funcs.getAllMasterClass(id)
  
      const length= response.data.length
      const createdMaster = await funcs.createMasterClass(id, masterClass);///////
  
      const createdMasterData = createdMaster.data
      const response2 = await funcs.getAllMasterClass(id)
      const response3 = await funcs.getAllMasterClass(id)
      const len = response3.data.length
      expect.assertions(12)
      expect(len - length).toBe(1)
      expect(createdMasterData.name).toEqual(masterClass.name)
      expect(createdMasterData.description).toEqual(masterClass.description)
      expect(createdMasterData.payment).toEqual(masterClass.payment)
      expect(createdMasterData.places).toEqual(masterClass.places)
      expect(createdMasterData.available).toEqual(masterClass.available)
      expect(createdMasterData.availablePlaces).toEqual(masterClass.availablePlaces)
      expect(createdMasterData.courseDuration).toEqual(masterClass.courseDuration)
      expect(createdMasterData.startDate).toEqual(masterClass.startDate)
      expect(createdMasterData.endDate).toEqual(masterClass.endDate)
      expect(createdMasterData.levelOfStudents).toEqual(masterClass.levelOfStudents)
      expect(createdMasterData.effort).toEqual(masterClass.effort)
      const deleted = await funcs1.deleteEducationalOrganization(id)
  
    })
    test('update a master class in Spec educational organization', async () => {
      const educationalOrgnization = {
  
        name: "tagmo3",
  
  
      }
      const partnerId = "45"
      const Created = await funcs1.createEducationalOrganization(partnerId, educationalOrgnization)
      const CreatedData = Created.data.data
      const id = CreatedData['_id']
  
  
      const masterClass = {
        name: "MMMMH",
        description: "gvarbg",
        payment: "kteeer",
        places: 333,
        availablePlaces: 333,
        courseDuration: "espo3",
        startDate: "youmel2rb3",
        endDate: "blell",
        levelOfStudents: "3aaali",
        effort: "t3bt",
        available: true
      }
      const masterClassUpdated = {
        name: "MMM"
      }
  
      const response = await funcs.getAllMasterClass(id)
  
      const len1 = response.data.length
      const Createdr = await funcs.createMasterClass(id, masterClass);///////
      const CreatedDatar = Createdr.data
      const id1 = CreatedDatar['_id']
      const update = await funcs.updateMasterClass(id, id1, masterClassUpdated)
      expect.assertions(2)
      expect(update.status).toBe(200)
      expect(update).toBeDefined()
      const Del = await funcs1.deleteEducationalOrganization(id)
  
    });
    test('delete a master class in Spec educational organization', async () => {
      const educationalOrgnization = {
  
        name: "tagmo3",
  
  
      }
      const partnerId = "45"
      const created = await funcs1.createEducationalOrganization(partnerId, educationalOrgnization)
      const createdData = created.data.data
      const id = createdData['_id']
  
  
      const masterClass = {
        name: "MMMMH",
        description: "gvarbg",
        payment: "kteeer",
        places: 333,
        availablePlaces: 333,
        courseDuration: "espo3",
        startDate: "youmel2rb3",
        endDate: "blell",
        levelOfStudents: "3aaali",
        effort: "t3bt",
        available: true
      }
  
  
      const response = await funcs.getAllMasterClass(id)
  
     
      const createdMaster = await funcs.createMasterClass(id, masterClass);///////
      const CreatedMasterData = createdMaster.data
      const id1 = CreatedMasterData['_id']
  
      const Deleted = await funcs.deleteMasterClass(id, id1)
      expect.assertions(2)
      expect(Deleted.status).toBe(200)
      expect(Deleted).toBeDefined()
      const del = await funcs1.deleteEducationalOrganization(id)
  
  
    });
  });