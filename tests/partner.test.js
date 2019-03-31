const functions = require('../functions/partnerfn.js');

jest.setTimeout(180000);

describe('test functions is found',()=>{
    test('createpartner', async () => {
        expect.assertions(1)
        expect(typeof (await functions.createpartner)).toBe('function')
      })
      test('getPartners', async () => {
        expect.assertions(1)
        expect(typeof (await functions.getPartners)).toBe('function')
      })
      test('getPartnerbyID', async () => {
        expect.assertions(1)
        expect(typeof (await functions.getPartnerbyID)).toBe('function')
      })
      test('deletepartner', async () => {
        expect.assertions(1)
        expect(typeof (await functions.deletepartner)).toBe('function')
      })
      test('updatepartner', async () => {
        expect.assertions(1)
        expect(typeof (await functions.updatepartner)).toBe('function')
      })
      test('getprojectofpartnerbyID', async () => {
        expect.assertions(1)
        expect(typeof (await functions.getprojectofpartnerbyID)).toBe('function')
      })
    });

// create a partner
test('create partner with name ahmed',async() => {
    expect.assertions(1);
    const partner =  await functions.createpartner("ahmed","intelligent",["1"],"engineer",["1"],"clever")
     expect(partner.status).toEqual(200)
     
    });
//cannot create a partner
test('cannot create a partner due to wrong type',async() => {
    expect.assertions(1);
    try{
    const partner =  await functions.createpartner("ahmed","intelligent",[1],"engineer",["1"],"clever")
    }
    catch(error){
    expect(error.response.status).toEqual(400)
    }  
 });
 // cannot create due to missing data
 test('cannot create a partner due to missing data',async() => {
    expect.assertions(1);
    try{
    const partner =  await functions.createpartner("ahmed","intelligent","engineer",["1"],"clever")
    }
    catch(error){
    expect(error.response.status).toEqual(400)
    }  
 });
 test('cannot create a partner due to missing data',async() => {
    expect.assertions(1);
    try{
    const partner =  await functions.createpartner("intelligent",["billy"],"engineer",["1"],"clever")
    }
    catch(error){
    expect(error.response.status).toEqual(400)
    }  
 });
 test('cannot create a partner due to missing data',async() => {
    expect.assertions(1);
    try{
    const partner =  await functions.createpartner("ahmed",["billy"],"engineer",["1"],"clever")
    }
    catch(error){
    expect(error.response.status).toEqual(400)
    }  
 });
 test('cannot create a partner due to missing data',async() => {
    expect.assertions(1);
    try{
    const partner =  await functions.createpartner("ahmed","intelligent",["1"],["1"],"clever")
    }
    catch(error){
    expect(error.response.status).toEqual(400)
    }  
 });
 test('cannot create a partner due to missing data',async() => {
    expect.assertions(1);
    try{
    const partner =  await functions.createpartner("ahmed","intelligent",["1"],"engineer","clever")
    }
    catch(error){
    expect(error.response.status).toEqual(400)
    }  
 });
 
 test('cannot create a partner due to missing data',async() => {
    expect.assertions(1);
    try{
    const partner =  await functions.createpartner("ahmed","intelligent",["1"],["1"],"engineer")
    }
    catch(error){
    expect(error.response.status).toEqual(400)
    }  
 });

 //get all partners
test('should get all partners ',async() => {
    expect.assertions(2)
    try{
    const partner =  await functions.getPartners()
    expect(partner).toBeDefined()
    expect(partner.status).toEqual(200)
    }
    catch(error){
        expect(error.response.status).toEqual(400)
    }

  
    });
//get partner by id
test('should get partner by id ',async() => {
    expect.assertions(6);
    const partner =  await functions.getPartners()
    const len1 = partner.data.length
    const id = partner.data[len1-1]._id;
    const partner1 =  await functions.getPartnerbyID(id)
    expect(partner1.data.name).toEqual(partner.data[len1-1].name)
    expect(partner1.data.information).toEqual(partner.data[len1-1].information)
    expect(partner1.data.partners).toEqual(partner.data[len1-1].partners)
    expect(partner1.data.field_of_work).toEqual(partner.data[len1-1].field_of_work)
    expect(partner1.data.projects).toEqual(partner.data[len1-1].projects)
    expect(partner1.data.feedback_form).toEqual(partner.data[len1-1].feedback_form)
   
    });
// id cannot be found using get
test('should not get partner by id ',async() => {
expect.assertions(1);
try{
const partner =  await functions.getPartnerbyID("Not found")
}
catch(error){
expect(error.response.status).toEqual(404)
}
});
//get project by partner id
test('should get project by id ',async() => {
    expect.assertions(1);
    const partner =  await functions.getPartners()
    const len1 = partner.data.length
    const id = partner.data[len1-1]._id;
    const partner1 =  await functions.getprojectofpartnerbyID(id)
    expect(partner1.data).toEqual(partner.data[len1-1].projects)
    });
//get projectofpartner by id
test('should get projectofpartner by Id',async() => {
      try{
      const project =  await functions.getprojectofpartnerbyID("Not found")
         }
         catch(error){
         expect.assertions(1);
         expect(error.response.status).toEqual(404)
         }
     });
 //update normally
test('update partner',async()=>{
    expect.assertions(6);
  
        try{
         const partners =  await functions.getPartners()
         const len1 = partners.data.length
         const id = partners.data[len1-1]._id;
         const dataToUpdate = {
             name:"mohamed",
             information: 'programmer',
             partners:["1,2"],
             field_of_work:"programmer and enginneer",
             projects:["1,3"],
             feedback_form:"veryclever"
          }
         const partner =  await functions.updatepartner(id,dataToUpdate)
         const information2 = partner.data.information;
         expect(partner.data.name).toEqual(dataToUpdate.name)
         expect(information2).toEqual(dataToUpdate.information)
         expect(partner.data.partners).toEqual(dataToUpdate.partners)
         expect(partner.data.field_of_work).toEqual(dataToUpdate.field_of_work)
         expect(partner.data.projects).toEqual(dataToUpdate.projects)
         expect(partner.data.feedback_form).toEqual(dataToUpdate.feedback_form)
        }
        catch(error){
            
            expect(error.response.status).toBeGreaterThanOrEqual(400)
            console.log('Not found')
          }
     
     
   });    


//update even if not all the values are passed in updated data and is not left as null
test('update partner even if the values are not passed correctly',async()=>{
    expect.assertions(6);
   try{
        const partners =  await functions.getPartners()
        const len1 = partners.data.length
        const partner1 = partners.data[len1-1];
        const id = partners.data[len1-1]._id;
        const dataToUpdate = {
            information: 'programmerr'
         }
        const partner =  await functions.updatepartner(id,dataToUpdate)
        const information2 = partner.data.information;
        expect(partner1.name).toEqual(partner.data.name)
        expect(information2).toEqual(dataToUpdate.information)
        expect(partner1.partners).toEqual(partner.data.partners)
        expect(partner1.field_of_work).toEqual(partner.data.field_of_work)
        expect(partner1.projects).toEqual(partner.data.projects)
        expect(partner1.feedback_form).toEqual(partner.data.feedback_form)
   }
   catch(error){
    expect(error.response.status).toBeGreaterThanOrEqual(400)
    console.log('Not found')
  }
      
   
    
  });
  test('editingrequest',async() => {
    expect.assertions(1);
    const partner =  await functions.getPartners()
    const len=partner.data.length
    const id = partner.data[len-1]._id;
   const editingrequest=await functions.editingrequest(id)
   expect(editingrequest.status).toEqual(200)
   

  
});

  //delete partner

test('delete found partner',async()=>{
     expect.assertions(2);
    try{
       
       
        const partners =  await functions.getPartners()
        const len1 = partners.data.length
        const id = partners.data[len1-1]._id;
        const name = partners.data[len1-1].name;
        const partner =  await functions.deletepartner(id)
       const partners2 =  await functions.getPartners()
        const len2 = partners2.data.length;
        expect(len2).toEqual(len1-1)
        expect(partner.data.data.name).toEqual(name)
    
    }
    catch(error){
      expect(error.response.status).toBeGreaterThanOrEqual(400)
      console.log('Not found')
    }
  });
 

