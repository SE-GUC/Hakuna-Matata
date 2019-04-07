const functions = require('../functions/partnerfn.js');

jest.setTimeout(180000);

describe('test functions is found', () => {
  test('createpartner', async () => {
    expect.assertions(1)
    expect(typeof (await functions.createPartner)).toBe('function')
  })
  test('getPartners', async () => {
    expect.assertions(1)
    expect(typeof (await functions.getPartners)).toBe('function')
  })
  test('getPartnerbyID', async () => {
    expect.assertions(1)
    expect(typeof (await functions.getPartnerByID)).toBe('function')
  })
  test('deletepartner', async () => {
    expect.assertions(1)
    expect(typeof (await functions.deletePartner)).toBe('function')
  })
  test('updatepartner', async () => {
    expect.assertions(1)
    expect(typeof (await functions.updatePartner)).toBe('function')
  })
  test('getprojectofpartnerbyID', async () => {
    expect.assertions(1)
    expect(typeof (await functions.getProjectOfPartnerByID)).toBe('function')
  })
})

// create a partner
test('create partner with name ahmed', async () => {
  expect.assertions(1);
  const partner = await functions.createPartner("ahmed", "intelligent", ["1"], "engineer", ["1"], "clever")
  expect(partner.status).toEqual(200)

})
//cannot create a partner
test('cannot create a partner due to wrong type', async () => {
  expect.assertions(1);
  try {
    const partner = await functions.createPartner("ahmed", "intelligent", [1], "engineer", ["1"], "clever")
  }
  catch (error) {
    expect(error.response.status).toEqual(400)
  }
})
// cannot create due to missing data
test('cannot create a partner due to missing data', async () => {
  expect.assertions(1);
  try {
    const partner = await functions.createPartner("ahmed", "intelligent", "engineer", ["1"], "clever")
  }
  catch (error) {
    expect(error.response.status).toEqual(400)
  }
})
test('cannot create a partner due to missing data', async () => {
  expect.assertions(1);
  try {
    const partner = await functions.createPartner("intelligent", ["billy"], "engineer", ["1"], "clever")
  }
  catch (error) {
    expect(error.response.status).toEqual(400)
  }
})
test('cannot create a partner due to missing data', async () => {
  expect.assertions(1);
  try {
    const partner = await functions.createPartner("ahmed", ["billy"], "engineer", ["1"], "clever")
  }
  catch (error) {
    expect(error.response.status).toEqual(400)
  }
})
test('cannot create a partner due to missing data', async () => {
  expect.assertions(1);
  try {
    const partner = await functions.createPartner("ahmed", "intelligent", ["1"], ["1"], "clever")
  }
  catch (error) {
    expect(error.response.status).toEqual(400)
  }
})
test('cannot create a partner due to missing data', async () => {
  expect.assertions(1);
  try {
    const partner = await functions.createPartner("ahmed", "intelligent", ["1"], "engineer", "clever")
  }
  catch (error) {
    expect(error.response.status).toEqual(400)
  }
})

test('cannot create a partner due to missing data', async () => {
  expect.assertions(1);
  try {
    const partner = await functions.createPartner("ahmed", "intelligent", ["1"], ["1"], "engineer")
  }
  catch (error) {
    expect(error.response.status).toEqual(400)
  }
})

// get all partners
test('should get all partners ', async () => {
  expect.assertions(2)
  try {
    const partner = await functions.getPartners()
    expect(partner).toBeDefined()
    expect(partner.status).toEqual(200)
  }
  catch (error) {
    expect(error.response.status).toEqual(400)
  }


})
//get partner by id
test('should get partner by id ', async () => {
  expect.assertions(6);
  const partner = await functions.getPartners()
  const len1 = partner.data.length
  const id = partner.data[len1 - 1]._id;
  const partner1 = await functions.getPartnerByID(id)
  expect(partner1.data.name).toEqual(partner.data[len1 - 1].name)
  expect(partner1.data.information).toEqual(partner.data[len1 - 1].information)
  expect(partner1.data.partners).toEqual(partner.data[len1 - 1].partners)
  expect(partner1.data.fieldOfWork).toEqual(partner.data[len1 - 1].fieldOfWork)
  expect(partner1.data.projects).toEqual(partner.data[len1 - 1].projects)
  expect(partner1.data.feedbackForm).toEqual(partner.data[len1 - 1].feedbackForm)

});
// id cannot be found using get
test('should not get partner by id ', async () => {
  expect.assertions(1);
  try {
    const partner = await functions.getPartnerByID("Not found")
  }
  catch (error) {
    expect(error.response.status).toEqual(404)
  }
});
//get project by partner id
test('should get project by id ', async () => {
  expect.assertions(1);
  const partner = await functions.getPartners()
  const len1 = partner.data.length
  const id = partner.data[len1 - 1]._id;
  const partner1 = await functions.getProjectOfPartnerByID(id)
  expect(partner1.data).toEqual(partner.data[len1 - 1].projects)
});
//get projectofpartner by id
test('should get projectofpartner by Id', async () => {
  try {
    const project = await functions.getProjectOfPartnerByID("Not found")
  }
  catch (error) {
    expect.assertions(1);
    expect(error.response.status).toEqual(404)
  }
});
//update normally
test('update partner', async () => {
  expect.assertions(6);

  try {
    const partners = await functions.getPartners()
    const len1 = partners.data.length
    const id = partners.data[len1 - 1]._id;
    const dataToUpdate = {
      name: "mohamed",
      information: 'programmer',
      partners: ["1,2"],
      fieldOfWork: "programmer and enginneer",
      projects: ["1,3"],
      feedbackForm: "veryclever"
    }
    const partner = await functions.updatePartner(id, dataToUpdate)
    const information2 = partner.data.information;
    expect(partner.data.name).toEqual(dataToUpdate.name)
    expect(information2).toEqual(dataToUpdate.information)
    expect(partner.data.partners).toEqual(dataToUpdate.partners)
    expect(partner.data.fieldOfWork).toEqual(dataToUpdate.fieldOfWork)
    expect(partner.data.projects).toEqual(dataToUpdate.projects)
    expect(partner.data.feedbackForm).toEqual(dataToUpdate.feedbackForm)
  }
  catch (error) {

    expect(error.response.status).toBeGreaterThanOrEqual(400)
    console.log('Not found')
  }


});


//update even if not all the values are passed in updated data and is not left as null
test('update partner even if the values are not passed correctly', async () => {
  expect.assertions(6);
  try {
    const partners = await functions.getPartners()
    const len1 = partners.data.length
    const partner1 = partners.data[len1 - 1];
    const id = partners.data[len1 - 1]._id;
    const dataToUpdate = {
      information: 'programmerr'
    }
    const partner = await functions.updatePartner(id, dataToUpdate)
    const information2 = partner.data.information;
    expect(partner1.name).toEqual(partner.data.name)
    expect(information2).toEqual(dataToUpdate.information)
    expect(partner1.partners).toEqual(partner.data.partners)
    expect(partner1.fieldOfWork).toEqual(partner.data.fieldOfWork)
    expect(partner1.projects).toEqual(partner.data.projects)
    expect(partner1.feedbackForm).toEqual(partner.data.feedbackForm)
  }
  catch (error) {
    expect(error.response.status).toBeGreaterThanOrEqual(400)
    console.log('Not found')
  }



});
test('editingrequest', async () => {
  expect.assertions(1);
  const partner = await functions.getPartners()
  const len = partner.data.length
  const id = partner.data[len - 1]._id;
  const editingRequest = await functions.editingRequest(id)
  expect(editingRequest.status).toEqual(200)



});

//delete partner

test('delete found partner', async () => {
  expect.assertions(2);
  try {


    const partners = await functions.getPartners()
    const len1 = partners.data.length
    const id = partners.data[len1 - 1]._id;
    const name = partners.data[len1 - 1].name;
    const partner = await functions.deletePartner(id)
    const partners2 = await functions.getPartners()
    const len2 = partners2.data.length;
    expect(len2).toEqual(len1 - 1)
    expect(partner.data.data.name).toEqual(name)

  }
  catch (error) {
    expect(error.response.status).toBeGreaterThanOrEqual(400)
    console.log('Not found')
  }
});


