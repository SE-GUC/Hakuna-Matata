const functions = require('../functions/memberfn.js');

jest.setTimeout(180000);

test('create member with name judy',async() => {
    expect.assertions(1);
    const member=  await functions.createmember("judy ayman",["piano"])
     expect(member.status).toEqual(200)
     
    });
//get all members

test('should get all members ',async() => {
    expect.assertions(2)
    try{
    const member=  await functions.getMembers()
    expect(member).toBeDefined()
    expect(member.status).toEqual(200)
    }
    catch(error){
        expect(error.response.status).toEqual(400)
    }
})

//create a project
test('create project',async() => {
    expect.assertions(1);
    const person=await functions.getMembers();
    const len=person.data.length
    const id=person.data[len-1]._id;
    const project =  await functions.createproject("5c8234616fc41471fa42f1c","5c935226fc41471fa42f1ced","www.project.com",id)
    expect(project.status).toEqual(200)

     
    });
// cannot create a project as there is a wrong data type
    test(' cannot create project',async() => {
        expect.assertions(1);
        const person=await functions.getMembers();
        const id=person.data._id; 
        try{
        const project =  await functions.createproject("5c8234616fc41471fa42f1c","5c935226fc41471fa42f1ced",1,id)
        }
        catch(error){
        expect(error.response.status).toEqual(400)
        }
        });
      
     test(' get project by member id',async() => {
      expect.assertions(1);
      try{
      const member =  await functions.getMembers()
      const len1 = member.data.length
      const id = member.data[len1-1]._id;
     const project =  await functions. getProjectbymemberid(id)
     const len=project.data.length
     expect(project.data[len-1].member_id).toEqual(id)}
     catch(error){
        expect(error.response.status).toBeGreaterThanOrEqual(400)
     }
      
   
    });
    test(' update project by member id',async() => {
        expect.assertions(1);
        try{
        const member =  await functions.getMembers()
        const len1 = member.data.length
        const id = member.data[len1-1]._id;
       const project =  await functions.getProjectbymemberid(id)
       const len=project.data.length
       const dataToUpdate = {
        link: 'www.project1.com'
     }
       const updatedproject=await functions.updateProjectbymemberid(id,project.data[len-1]._id,dataToUpdate)
       expect(updatedproject.data.link).toEqual(dataToUpdate.link)}
       catch(error){
        expect(error.response.status).toBeGreaterThanOrEqual(400)
       }
    });
    test(' delete project by member id',async() => {
        expect.assertions(1);
        try{
        const member =  await functions.getMembers()
        const len1 = member.data.length
        const id = member.data[len1-1]._id;
       const project =  await functions.getProjectbymemberid(id)
       const len=project.data.length
       const deletedproject=await functions.deleteProjectbymemberid(id,project.data[len-1]._id)
       expect(deletedproject.status).toEqual(200)}
       catch(error){
        expect(error.response.status).toBeGreaterThanOrEqual(400)
       }
});
test('updaterating',async() => {
    expect.assertions(1);
   
    const member =  await functions.getMembers()
    const len=member.data.length
    const id = member.data[len-1]._id;
    const dataToUpdate = {
        newrate:2
    }
   const updateRating=await functions.updateRating(id,dataToUpdate.newrate)
   expect(updateRating.status).toEqual(200)
  
});
test('applyforatask',async() => {
    expect.assertions(1);
   try{
    const member =  await functions.getMembers()
    const len=member.data.length
    const id = member.data[len-1]._id;
    const dataToUpdate = {
        taskId:"5c67892333abc"
    }
   const applyfortask=await functions.applyfortask(id,dataToUpdate.taskId)
   expect(applyfortask.status).toEqual(200)
}
catch(error){
    expect(error.response.status).toBeGreaterThanOrEqual(400)
}
  
});

test('editingrequest',async() => {
    expect.assertions(1);
   
    const member =  await functions.getMembers()
    const len=member.data.length
    const id = member.data[len-1]._id;
   const editingrequest=await functions.editingrequest(id)
   expect(editingrequest.status).toEqual(200)
  
});



/*
//deleting found member
test('delete found member',async()=>{
    expect.assertions(2);
  
      
      
       const members =  await functions.getMembers()
       const len1 = members.data.length
       const id = members.data[len1-1]._id;
       const fullname = members.data[len1-1].fullname;
       const member=  await functions.deletemember(id)
       const len2 = member.data.length;
       expect(len2).toEqual(len1-1)
       expect(member.data.data.fullname).toEqual(fullname)
   
   
 });
           /*
     test(' cannot get project by member id',async() => {
                
                try{
                const project =  await functions.getProjects1()}
                catch(error){
                 expect.assertions(1);
                expect(error.response.status).toEqual(404)
                }
                }
            
                );
  */ 
