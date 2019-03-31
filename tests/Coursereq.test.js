const functionsCR = require('../functions/Coursereqfn');
const functionsN = require('../functions/notificationsfunctions');


describe('test functions is found',()=>{
    test('create course request', async () => {
        expect.assertions(1)
        expect(typeof (await functionsCR.createCourseRequest)).toBe('function')
      })
      test('get all course request', async () => {
        expect.assertions(1)
        expect(typeof (await functionsCR.getCourseRequests)).toBe('function')
      })
      test('update course request', async () => {
        expect.assertions(1)
        expect(typeof (await functionsCR.updateCourseRequest)).toBe('function')
      })
      test('get course request by id', async () => {
        expect.assertions(1)
        expect(typeof (await functionsCR.getCourseRequestsbyID)).toBe('function')
      })
      test('delete course request', async () => {
        expect.assertions(1)
        expect(typeof (await functionsCR.deleteCourseRequest)).toBe('function')
      })

    });
describe('test crud of courseRequests',()=>{   
//create course request
test('create successfully CR and check sent Notifications',async() => {
    expect.assertions(2);
    const allCourses1 =  await functionsCR.getCourseRequests()
    const len1 = allCourses1.data.length

    const courserequest1 =  await functionsCR.createCourseRequest("front end","colors","1")
     expect(courserequest1.status).toEqual(200)
     const allCourses2 =  await functionsCR.getCourseRequests()
     const allCourses3 =  await functionsCR.getCourseRequests()
  
     const len2 = allCourses3.data.length
    const expectedLength =len1+1
 

     expect(len2).toEqual(expectedLength)
     const notificationsfinal = await functionsN.getNotifications()
     await functionsN.DelNotandNotsum(notificationsfinal.data.data[notificationsfinal.data.data.length-1]._id)

    });

  
//get all course request 
test('get all course requests ans status 200',async()=>{
    expect.assertions(1);

        const courserequests =  await functionsCR.getCourseRequests()
        expect(courserequests.status).toEqual(200)
   
});

//get courserequest by id
test('get not exist courseRequest ', async () => {
    expect.assertions(1)
    try{
    const getcourse=await functionsCR.getCourseRequestsbyID('nada')
    
    
    
}
    catch(error){
        expect(error.response.status).toBeGreaterThanOrEqual(400)
    }
  })
  test('get existing  courseRequest ', async () => {
    expect.assertions(1)
    const courserequests =  await functionsCR.getCourseRequests()
    const len1 = courserequests.data.length
    const oldCR =courserequests.data[len1-1];
    const id = courserequests.data[len1-1]._id;
    const newcourseRequest = await functionsCR.getCourseRequestsbyID(id)
    expect(newcourseRequest.data.description).toEqual("front end")

  })




 //update course request   
 //fail to update   
 //wrong data type
   test('fail update due to wrong data type of categories',async()=>{
    const courserequests =  await functionsCR.getCourseRequests()
    const len1 = courserequests.data.length
    const oldCR =courserequests.data[len1-1];
    const id = courserequests.data[len1-1]._id;
    expect.assertions(2);
    try{
        
       
         const dataToUpdate = {
            description:"hi",
            categories:1
          }

         const courserequest =  await functionsCR.updateCourseRequest(id,dataToUpdate.description,
            dataToUpdate.categories, dataToUpdate.active)
    }
    catch(error){
        const courserequestsnew =  await functionsCR.getCourseRequests()
        expect(error.response.status).toBeGreaterThanOrEqual(400)
        expect(courserequestsnew.data).toEqual(courserequests.data)
   }});

   //not existing id
   test('fail to update due to wrong id',async()=>{
    const courserequests =  await functionsCR.getCourseRequests()
    const len1 = courserequests.data.length
    const id = "not found";
    expect.assertions(2);
    try{
        
       
         const dataToUpdate = {
            description:"hi"
          }

         const courserequest =  await functionsCR.updateCourseRequest(id,dataToUpdate.description,
            dataToUpdate.categories, dataToUpdate.active)
    }
    catch(error){
        const courserequestsnew =  await functionsCR.getCourseRequests()
        expect(error.response.status).toBeGreaterThanOrEqual(400)
        expect(courserequestsnew.data).toEqual(courserequests.data)
   }});
   //update not all data
   test('only entered data is updated and the remaining stay same value',async()=>{
    const courserequests =  await functionsCR.getCourseRequests()
    const len1 = courserequests.data.length;
    const oldCR =courserequests.data[len1-1];
    expect.assertions(3);
    try{
         
         const id = oldCR._id;
         const dataToUpdate = {
            description:"hi"
          }

         const courserequest =  await functionsCR.updateCourseRequest(id,dataToUpdate.description,
            dataToUpdate.categories, dataToUpdate.active)
            const newcourserequests = await functionsCR.getCourseRequests();
            expect(newcourserequests.data).not.toEqual(courserequests.data)
            expect(courserequest.data.description).toEqual("hi")
            expect(courserequest.data.categories).toEqual(oldCR.categories)
    }
    catch(error){
     
     expect(error.response.status).toBeGreaterThanOrEqual(400)
  
   }});

/*//update all data 
test('update many values in course request SUCCESSFULY !!',async()=>{
    const courserequests =  await functionsCR.getCourseRequests()
    const len1 = courserequests.data.length;
    const oldCR =courserequests.data[len1-1];
    expect.assertions(3);
    try{
         
         const id = oldCR._id;
         const dataToUpdate = {
            description:"hi",
            categories:"hello",
            active:false
          }

         const courserequest =  await functionsCR.updateCourseRequest(id,dataToUpdate.description,
            dataToUpdate.categories, dataToUpdate.active)
            const newcourserequests = await functionsCR.getCourseRequests();
            expect(newcourserequests.data[len1-1].description).toEqual("hi")
            expect(newcourserequests.data[len1-1].categories).toEqual("hello")
            expect(newcourserequests.data[len1-1].active).toEqual(false)
    }
    catch(error){
     
     expect(error.response.status).toBeGreaterThanOrEqual(400)
  
   }});*/

//doesnt create due to wrong data type
//categories
test('not created due to wrong categories data type and send status 400',async() => {
    expect.assertions(1);
    try{
        const courserequest1 =  await functionsCR.createCourseRequest("front end","colors",1)
    }
    catch(error){
        expect(error.response.status).toEqual(400)
    }
    
    });

  // applying id 

  test('not created due to wrong applyingmember_id data type and send status 400',async() => {
    expect.assertions(1);
    try{
        const courserequest1 =  await functionsCR.createCourseRequest("front end",2,"1")
      
    }
    catch(error){
    expect(error.response.status).toEqual(400)
    }
     
    });
//description 
    
    test('not created due to wrong description data type and send status 400',async() => {
        expect.assertions(1);
        try{
            const courserequest1 =  await functionsCR.createCourseRequest(2,"nada","1")
        }
        catch(error){
        expect(error.response.status).toEqual(400)
        }
         
        });

//delete  course request successfully
 test('deleted succesfully  ',async() => {
    expect.assertions(3);
    const courserequests = await functionsCR.getCourseRequests();
    const len1 = courserequests.data.length
    const tobeDeleted = courserequests.data[len1-1];
    const id = tobeDeleted._id ;
    const Deletedcourserequest =  await functionsCR.deleteCourseRequest(id)
    const courserequests2 = await functionsCR.getCourseRequests();
    const len2 = courserequests2.data.length
    expect(Deletedcourserequest.data.msg).toEqual('courserequest was deleted successfully')
    expect(len2).toEqual(len1-1)
    expect(Deletedcourserequest.data.data).toEqual(tobeDeleted)

    }); 


}); 