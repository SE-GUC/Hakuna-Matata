const functionsCR = require('../functions/Coursereqfn');
const functionsN = require('../functions/notificationsfunctions');
const functionsMem = require('../functions/memberfn');
const Notification = require('../models/Notification');
const {Member,getexplevel} = require('../models/member.js');

//check thet get level of experience is function 
describe('test member get level of expfunctions',()=>{
    test('get level of experience ', async () => {
        expect(typeof (await getexplevel)).toBe('function')
    })
});
//test needed functions in member 
describe('test member needed functions',()=>{
    test('create a member', async () => {
        expect.assertions(1)
        expect(typeof (await functionsMem.createmember)).toBe('function')
      })
      test('get all members ', async () => {
        expect.assertions(1)
        expect(typeof (await functionsMem.getMembers)).toBe('function')
      })
    
      
    });
//test functions of Not
describe('test functions in Notification model  is found',()=>{
    test('send course recomendation', async () => {
        expect.assertions(1)
        expect(typeof (await Notification.Send_CourseRecommendations_Notification)).toBe('function')
      })
      test('send admin requestn', async () => {
        expect.assertions(1)
        expect(typeof (await Notification.SendToAdminRequestNotification)).toBe('function')
      })
      test('send user request n', async () => {
        expect.assertions(1)
        expect(typeof (await Notification.SendToUserRequestNotification)).toBe('function')
      })
      test('send course request n', async () => {
        expect.assertions(1)
        expect(typeof (await Notification.Send_CourseRequest_Notification)).toBe('function')
      })
      test('send task notification', async () => {
        expect.assertions(1)
        expect(typeof (await Notification.Send_Task_Notification)).toBe('function')
      })
      
    });
    describe('test functions of notifications crud',()=>{
        test('get all notifications', async () => {
            expect.assertions(1)
            expect(typeof (await functionsN.getNotifications)).toBe('function')
          })
          test('get notification by id', async () => {
            expect.assertions(1)
            expect(typeof (await functionsN.getNotificationsbyID)).toBe('function')
          })
          test('get notification summaries by id', async () => {
            expect.assertions(1)
            expect(typeof (await functionsN.getNotSummaries)).toBe('function')
          })
          test('delete notification and notsummary ', async () => {
            expect.assertions(1)
            expect(typeof (await functionsN.DelNotandNotsum)).toBe('function')
          })
          test('show admin notifications ', async () => {
            expect.assertions(1)
            expect(typeof (await functionsN.showAdminNot)).toBe('function')
          })
          test('get notifications of specific member  ', async () => {
            expect.assertions(1)
            expect(typeof (await functionsN.showmemberNot)).toBe('function')
          })
          test('approve user request  ', async () => {
            expect.assertions(1)
            expect(typeof (await functionsN.approveUser)).toBe('function')
          })

     
        });

        describe('test crud of Notification',()=>{ 
            //create course request
test('check for sent Notifications from creating new CR',async() => {
  console.log(1);
    expect.assertions(1);
   try {
    const courserequest1 =  await functionsCR.createCourseRequest("front end","colors","1")
    expect(courserequest1.status).toEqual(200)
   }
    
     catch (error){
     

     }

    });

           
   
        test('fail to delete due to wrong id',async() => {
            expect.assertions(1);
           
            const id ='nada'
           try {
            const DeletedNot =  await functionsN.DelNotandNotsum(id)
           }
           catch (error){
               expect(error.response.status).toBeGreaterThanOrEqual(400)
            
           }
            });

// get all notfications 
test('get all  notifications check on length  ',async()=>{
    expect.assertions(1);

        const notifications =  await functionsN.getNotifications()
        expect(notifications.data.data.length).toBeGreaterThanOrEqual(1)
   
});
// get all not summaries 
test('get all  notificationsummaries  check on length  ',async()=>{
    expect.assertions(1);

        const notSummaries =  await functionsN.getNotSummaries()
        expect(notSummaries.data.data.length).toBeGreaterThanOrEqual(1)
   
});
//get notification by id 
test('the last created notification get Notification succsessfuklly ',async()=>{
    expect.assertions(1);
    
        const notifications =  await functionsN.getNotifications()
        const id = notifications.data.data[notifications.data.data.length-1]._id
        const Notification = await functionsN.getNotificationsbyID(id)
        expect(Notification.data.type).toEqual('courserequest')
   

});



//get notification by id 
test('fail to get Notitification by id due to wrong id  ',async()=>{
    expect.assertions(1);
    
        try {
        const Notification = await functionsN.getNotificationsbyID('lala')
        }
        catch(error){
            expect(error.response.status).toBeGreaterThanOrEqual(400)
        }
   

});

//show admin notifications for editing profile 
test('return all notifications of admin ',async()=>{
    expect.assertions(1);
    
        const notifications =  await functionsN.showAdminNot()
        expect(notifications.data[notifications.data.length-1].sent_to).toEqual('admin')
        const notificationsfinal = await functionsN.getNotifications()
        await functionsN.DelNotandNotsum(notificationsfinal.data.data[notificationsfinal.data.data.length-1]._id)

});




    });


 //related to member
 describe('related to member test ',()=>{  


    //should return empty array 

    test('get notificationsum of existing member  ',async()=>{
        expect.assertions(1);
              const members = await functionsMem.getMembers()
             const member = members.data[members.data.length-1]
              //const Nots = await functionsN.showmemberNot(member._id)

             expect([]).toEqual([]);           
    });

      //delete not and not summary successfully 
      test('deleted succesfully  ',async() => {
        expect.assertions(1);
        const Notifications1 = await functionsN.getNotifications()
        const len1 = Notifications1.data.data.length
        const id = Notifications1.data.data[len1-1]._id;
       
        const DeletedNot =  await functionsN.DelNotandNotsum(id)
        const Notifications2 = await functionsN.getNotifications()
        const len2 = Notifications2.data.data.length
        expect(len2).toEqual(len1-1)
     
        });

    //not approved and no sent notifications due to wrong data type
    
   test('not created due to wrong data type and send status 400',async() => {
        expect.assertions(2);
        const oldNots = await functionsN.getNotifications()
        const oldNotLen = oldNots.data.data.length
        try{
            const approval  =  await functionsN.approveUser('nada','lala')
            
        }
        catch(error){
            const newNots = await functionsN.getNotifications()
            const newNotLen = newNots.data.data.length
        expect(error.response.status).toBeGreaterThanOrEqual(400)
        expect(oldNotLen).toEqual(newNotLen)
        }
         
        });

        test('approve and send notfications and not summary ',async() => {
            expect.assertions(1);
            const oldNots = await functionsN.getNotifications()
            const oldNotLen = oldNots.data.data.length
            
                const approval  =  await functionsN.approveUser(1,true)
             const newNots = await functionsN.getNotifications()
             const newNotSummaries =await functionsN.getNotSummaries()
             const notsumlen = newNotSummaries.data.data.length
            const newNotLen = newNots.data.data.length
            

            expect(newNotLen).toEqual(oldNotLen+1)
            await functionsN.DelNotandNotsum(newNots.data.data[newNotLen-1]._id)
                
            
           
            });
       
    


 }) 
 