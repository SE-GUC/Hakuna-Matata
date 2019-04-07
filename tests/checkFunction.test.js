const funcs = require('../functions/certificatefn');
const func = require('../functions/trainingProgramfn');
const functions=require('../functions/EducationalOrganizationfn')
jest.setTimeout(180000);

//////////////////////////
///check exists functions
test('test create certificate exists',async()=>{
  expect.assertions(1)
  expect(typeof (await funcs.createCertificate)).toBe('function')

  })


test('check to get certificants exists', async () =>{
expect.assertions(1)
expect(typeof (await funcs.getAllCertificate)).toBe('function')

});

test('check to get specific certificant exists',async () =>{
expect.assertions(1)
expect(typeof (await funcs.getSpecificCertificate)).toBe('function')

});

test('check deleted certificant exists',async () =>{
expect.assertions(1)
expect(typeof (await funcs.deleteCertificate)).toBe('function')


});

test('check updated certificant exists',async () =>{
  expect.assertions(1)
  expect(typeof (await funcs.updateCertificate)).toBe('function')
  
  
  });
 
//////////////////
  test('check create educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await functions.createEducationalOrganization)).toBe('function')

  });

  test('check delete educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await functions.deleteEducationalOrganization)).toBe('function')
  })
  /////////////////////////
  //////////////////////////
///check exists functions
test('test create program exists',async()=>{
    expect.assertions(1)
    expect(typeof (await func.createPrograms)).toBe('function')
  
    })
  
  
  test('check to get program exists', async () =>{
  expect.assertions(1)
  expect(typeof (await func.getAllPrograms)).toBe('function')
  
  });
  
  test('check to get specific program exists',async () =>{
  expect.assertions(1)
  expect(typeof (await func.getSpecificPrograms)).toBe('function')
  
  });
  
  test('check deleted program exists',async () =>{
  expect.assertions(1)
  expect(typeof (await func.deletePrograms)).toBe('function')
  
  
  });
  
  test('check updated program exists',async () =>{
    expect.assertions(1)
    expect(typeof (await func.updatePrograms)).toBe('function')
    
    
    });