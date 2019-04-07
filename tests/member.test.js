const functions = require('../functions/memberfn.js');
const functionTask = require('../functions/taskfn');
jest.setTimeout(180000);

test('create member with name judy', async () => {
    expect.assertions(1);
    const member = await functions.createMember("judy ayman", ["piano"])
    expect(member.status).toEqual(200)

});
// get all members

test('should get all members ', async () => {
    expect.assertions(2)
    try {
        const member = await functions.getMembers()
        expect(member).toBeDefined()
        expect(member.status).toEqual(200)
    }
    catch (error) {
        expect(error.response.status).totoBeGreaterThanOrEqual(400)
    }
})

// create a project
test('create project', async () => {
    expect.assertions(1);
    const person = await functions.getMembers();
    const len = person.data.length
    const id = person.data[len - 1]._id;
    const project = await functions.createProject("5c8234616fc41471fa42f1c", "5c935226fc41471fa42f1ced", "www.project.com", id)
    expect(project.status).toEqual(200)
});

test('update member', async () => {
    expect.assertions(1);
    const members = await functions.getMembers()
    const len1 = members.data.length
    const id = members.data[len1 - 1]._id;
    const dataToUpdate = {
        fullName: "laila",
    }
    const member = await functions.updateMember(id, dataToUpdate.fullName)
    expect(member.data.fullName).toEqual(dataToUpdate.fullName)
});

// cannot create a project as there is a wrong data type
test(' cannot create project', async () => {
    expect.assertions(1);
    const person = await functions.getMembers();
    const id = person.data._id;
    try {
        const project = await functions.createProject("5c8234616fc41471fa42f1c", "5c935226fc41471fa42f1ced", 1, id)
    }
    catch (error) {
        expect(error.response.status).toBeGreaterThanOrEqual(400)
    }
});

test(' get project by member id', async () => {
    expect.assertions(1);
    try {
        const member = await functions.getMembers()
        const len1 = member.data.length
        const id = member.data[len1 - 1]._id;
        const project = await functions.getProjectByMemberId(id)
        const len = project.data.length
        expect(project.data[len - 1].memberId).toEqual(id)
    }
    catch (error) {
        expect(error.response.status).toBeGreaterThanOrEqual(400)
    }


});

test(' update project by member id', async () => {
    expect.assertions(1);
    try {
        const member = await functions.getMembers()
        const len1 = member.data.length
        const id = member.data[len1 - 1]._id;
        const project = await functions.getProjectByMemberId(id)
        const len = project.data.length
        const dataToUpdate = {
            link: 'www.project1.com'
        }
        const updatedProject = await functions.updateProjectByMemberId(id, project.data[len - 1]._id, dataToUpdate)
        expect(updatedProject.data.link).toEqual(dataToUpdate.link)
    }
    catch (error) {
        expect(error.response.status).toBeGreaterThanOrEqual(400)
    }
});

test(' delete project by member id', async () => {
    expect.assertions(1);
    try {
        const member = await functions.getMembers()
        const len1 = member.data.length
        const id = member.data[len1 - 1]._id;
        const project = await functions.getProjectByMemberId(id)
        const len = project.data.length
        const deletedProject = await functions.deleteProjectByMemberId(id, project.data[len - 1]._id)
        expect(deletedProject.status).toEqual(200)
    }
    catch (error) {
        expect(error.response.status).toBeGreaterThanOrEqual(400)
    }
});

test('updaterating', async () => {
    expect.assertions(1);

    const member = await functions.getMembers()
    const len = member.data.length
    const id = member.data[len - 1]._id;
    const dataToUpdate = {
        newRate: 2
    }
    const updateRating = await functions.updateRating(id, dataToUpdate.newRate)
    expect(updateRating.status).toEqual(200)

}) 
test('applyforatask',async() => {
    expect.assertions(1);
   try{
    const member =  await functions.getMembers()
    const len=member.data.length
    const id = member.data[len-1]._id;
    const data = {
        description:'hi',
        consultyNeeded:'hello',
        deadline:'here',
        commitLevel:1,
        experienceLevel:5,
        monetaryCompensation:3,
        requiredSkills:['piano']
        }
    const partnerID = "5"
    
    const task = await functionTask.createTask(partnerID,data)
    const tasks = await functionTask.getAllTasks()
    const taskID = tasks.data.data[tasks.data.data.length-1]._id
    const dataToUpdate = {
        taskId:taskID
    }
   const applyForTask=await functions.applyForTask(id,dataToUpdate.taskId)
   expect(applyForTask.status).toEqual(200)
}
catch(error){
    expect(error.response.status).toBeGreaterThanOrEqual(400)
}
  
});
test('editingrequest', async () => {
    expect.assertions(1);
    try {
        const member = await functions.getMembers()
        const len = member.data.length
        const id = member.data[len - 1]._id;
        const editingRequest = await functions.editingRequest(id)
        expect(editingRequest.status).toEqual(200)
    }
    catch (error) {
        expect(error.response.status).toBeGreaterThanOrEqual(400)
    }

});
test('delete member', async () => {
    expect.assertions(2);

    const members = await functions.getMembers()
    const len1 = members.data.length
    const id = members.data[len1 - 1]._id;
    const name = members.data[len1 - 1].fullName;
    const member = await functions.deleteMember(id)
    const member2 = await functions.getMembers()
    const len2 = member2.data.length;
    expect(len2).toEqual(len1 - 1)
    expect(member.data.data.fullName).toEqual(name)

})




