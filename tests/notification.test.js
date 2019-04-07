const functionsCR = require('../functions/Coursereqfn')
const functionsN = require('../functions/notificationsfn')
const functionsMem = require('../functions/memberfn')
const Notification = require('../models/Notification')
const { Member, getExpLevel } = require('../models/Member.js')

//  check thet get level of experience is function 
describe('test member get level of expfunctions', () => {
  test('get level of experience ', async () => {
    expect(typeof (await getExpLevel)).toBe('function')
  })
})
// test needed functions in member 
describe('test member needed functions', () => {
  test('create a member', async () => {
    expect.assertions(1)
    expect(typeof (await functionsMem.createMember)).toBe('function')
  })
  test('get all members ', async () => {
    expect.assertions(1)
    expect(typeof (await functionsMem.getMembers)).toBe('function')
  })
  test('request edirt profile ', async () => {
    expect.assertions(1)
    expect(typeof (await functionsN.editProfileRequest)).toBe('function')
  })

})
// test functions of Not

describe('test functions in Notification model  is found', () => {
  test('send course recomendation', async () => {
    expect.assertions(1)
    expect(typeof (await Notification.sendCourseRecommendationsNotification)).toBe('function')
  })
  test('send admin requestn', async () => {
    expect.assertions(1)
    expect(typeof (await Notification.sendToAdminRequestNotification)).toBe('function')
  })
  test('send user request n', async () => {
    expect.assertions(1)
    expect(typeof (await Notification.sendTaskNotification)).toBe('function')
  })
  test('send course request n', async () => {
    expect.assertions(1)
    expect(typeof (await Notification.sendCourseRequestNotification)).toBe('function')
  })
  test('send task notification', async () => {
    expect.assertions(1)
    expect(typeof (await Notification.sendToUserRequestNotification)).toBe('function')
  })

})
describe('test functions of notifications crud', () => {
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
    expect(typeof (await functionsN.delNotandNotsum)).toBe('function')
  })
  test('show admin notifications ', async () => {
    expect.assertions(1)
    expect(typeof (await functionsN.showAdminNot)).toBe('function')
  })
  test('get notifications of specific member  ', async () => {
    expect.assertions(1)
    expect(typeof (await functionsN.showMemberNot)).toBe('function')
  })
  test('approve user request  ', async () => {
    expect.assertions(1)
    expect(typeof (await functionsN.approveUser)).toBe('function')
  })


})


  // create course request
  test('check for sent Notifications from creating new CR', async () => {
    expect.assertions(2)
    try {
      const courseRequest1 = await functionsCR.createCourseRequest("nada", "new", "1")
      const courserequests = await functionsCR.getCourseRequests();
      const len1 = courserequests.data.length
      const tobeDeleted = courserequests.data[len1 - 1];
      const id = tobeDeleted._id
      const Deletedcourserequest = await functionsCR.deleteCourseRequest(id)
      const oldNots = await functionsN.getNotifications()
      expect(courseRequest1.status).toEqual(200)
      const newNots = await functionsN.getNotifications()
      expect(newNots.data.data.length).toEqual(oldNots.data.data.length+1)
      

    }
    catch (error) {
    }
  })



  test('fail to delete due to wrong id', async () => {
    expect.assertions(1)

    const id = 'nada'
    try {
      const deletedNot = await functionsN.delNotandNotsum(id)
    }
    catch (error) {
      expect(error.response.status).toBeGreaterThanOrEqual(400)

    }
  })

  //  get all notfications 
  test('get all  notifications check on length  ', async () => {
    expect.assertions(4)

    const notifications = await functionsN.getNotifications()
    expect(notifications.data.data.length).toBeGreaterThanOrEqual(1)
    expect(notifications.data.data[notifications.data.data.length-1].type).toEqual("courserequest")
    expect(notifications.data.data[notifications.data.data.length-1].taskId).toEqual(null)
    expect(notifications.data.data[notifications.data.data.length-1].courseRecommendationId).toEqual(null)
  })
  //  get all not summaries 
  test('get all  notificationsummaries  check on length  ', async () => {
    expect.assertions(4)

    const notSummaries = await functionsN.getNotSummaries()
    expect(notSummaries.data.data.length).toBeGreaterThanOrEqual(1)
    expect(notSummaries.data.data[notSummaries.data.data.length-1].title).toEqual("HELPPPP MEEEE GUYSSS")
    expect(notSummaries.data.data[notSummaries.data.data.length-1].sentTo).toEqual(null)
    expect(notSummaries.data.data[notSummaries.data.data.length-1].expertRequires).toEqual(true)

  })
 
  // get notification by id 
  test('the last created notification get Notification succsessfuklly ', async () => {
    expect.assertions(1)

    const notifications = await functionsN.getNotifications()
    const id = notifications.data.data[notifications.data.data.length - 1]._id
    const Notification = await functionsN.getNotificationsbyID(id)
    expect(Notification.data.type).toEqual('courserequest')

  })

  // get notification by id 
  test('fail to get Notitification by id due to wrong id  ', async () => {
    expect.assertions(1)

    try {
      const Notification = await functionsN.getNotificationsbyID('lala')
    }
    catch (error) {
      expect(error.response.status).toBeGreaterThanOrEqual(400)
    }
  })

  // show admin notifications for editing profile 
  test('return all notifications of admin ', async () => {
    expect.assertions(1)
    const request = await functionsN.editProfileRequest('2')
    const notifications = await functionsN.showAdminNot()
    expect(notifications.data[notifications.data.length - 1].sentTo).toEqual('admin')
    const notificationsfinal = await functionsN.getNotifications()
    await functionsN.delNotandNotsum(notificationsfinal.data.data[notificationsfinal.data.data.length - 1]._id)
  })



  // should return empty array 

  test('get notificationsum of existing member []    ', async () => {
   expect.assertions(1)
    const newMember = await functionsMem.createMember('nn',['n'])
    const members = await functionsMem.getMembers()
    const memberID = members.data[members.data.length-1]._id
    const memNot = await functionsN.showMemberNot(memberID)
    console.log(memNot.data)
    expect(memNot.data).toEqual([])
    await functionsMem.deleteMember(memberID)


  })

  // delete not and not summary successfully 
  test('deleted succesfully  ', async () => {
    expect.assertions(1)
    const Notifications1 = await functionsN.getNotifications()
    const len1 = Notifications1.data.data.length
    const id = Notifications1.data.data[len1 - 1]._id

    const deletedNot = await functionsN.delNotandNotsum(id)
    const Notifications2 = await functionsN.getNotifications()
    const len2 = Notifications2.data.data.length
    expect(len2).toEqual(len1 - 1)

  }) 

  // not approved and no sent notifications due to wrong data type

  test('not created due to wrong data type and send status 400', async () => {
    expect.assertions(2)
    const oldNots = await functionsN.getNotifications()
    const oldNotLen = oldNots.data.data.length
    try {
      const approval = await functionsN.approveUser('nada', 'lala')

    }
    catch (error) {
      const newNots = await functionsN.getNotifications()
      const newNotLen = newNots.data.data.length
      expect(error.response.status).toBeGreaterThanOrEqual(400)
      expect(oldNotLen).toEqual(newNotLen)
    }

  })

  test('approve and send notfications and not summary ', async () => {
    expect.assertions(2)
    const oldNots = await functionsN.getNotifications()
    const oldNotLen = oldNots.data.data.length
    const approval = await functionsN.approveUser(1,true)
    await functionsN.getNotifications()
    const newNots = await functionsN.getNotifications()
    const newNotLen = newNots.data.data.length
    await functionsN.getNotSummaries()
    const newNotSum = await functionsN.getNotSummaries()
    expect(newNotLen).toEqual(oldNotLen + 1)
    expect(newNotSum.data.data[newNotSum.data.data.length-1].title).toEqual("You have been approved to edit")
    await functionsN.delNotandNotsum(newNots.data.data[newNotLen - 1]._id)
  })

  
  test('dis approve and send notfications and not summary ', async () => {
    expect.assertions(2)
    const oldNots = await functionsN.getNotifications()
    const oldNotLen = oldNots.data.data.length
    const approval = await functionsN.approveUser(1,false)
    await functionsN.getNotifications()
    const newNots = await functionsN.getNotifications()
    const newNotLen = newNots.data.data.length
    await functionsN.getNotSummaries()
    const newNotSum = await functionsN.getNotSummaries()
    expect(newNotLen).toEqual(oldNotLen + 1)
    expect(newNotSum.data.data[newNotSum.data.data.length-1].title).toEqual("You have been disapproved to edit")
    await functionsN.delNotandNotsum(newNots.data.data[newNotLen - 1]._id)
  })


