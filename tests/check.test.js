const funcs = require('../functions/functionsfn');

jest.setTimeout(180000);

//////////////////////////
///check exists functions
test('test create certificate exists',async()=>{
  expect.assertions(1)
  expect(typeof (await funcs.create_certificant)).toBe('function')

  })


test('check to get certificants exists', async () =>{
expect.assertions(1)
expect(typeof (await funcs.getAllcertificant)).toBe('function')

});

test('check to get specific certificant exists',async () =>{
expect.assertions(1)
expect(typeof (await funcs.getspecificcertificant)).toBe('function')

});

test('check deleted certificant exists',async () =>{
expect.assertions(1)
expect(typeof (await funcs.delete_certificanst)).toBe('function')


});

test('check updated certificant exists',async () =>{
  expect.assertions(1)
  expect(typeof (await funcs.updatecertificate)).toBe('function')
  
  
  });
 
//////////////////
  test('check create educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.create_Edu)).toBe('function')

  });

  test('check delete educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.delete_Edu)).toBe('function')
  })
  /////////////////////////
  //////////////////////////
///check exists functions
test('test create program exists',async()=>{
    expect.assertions(1)
    expect(typeof (await funcs.create_programs)).toBe('function')
  
    })
  
  
  test('check to get program exists', async () =>{
  expect.assertions(1)
  expect(typeof (await funcs.getAllprograms)).toBe('function')
  
  });
  
  test('check to get specific program exists',async () =>{
  expect.assertions(1)
  expect(typeof (await funcs.getspecificprograms)).toBe('function')
  
  });
  
  test('check deleted program exists',async () =>{
  expect.assertions(1)
  expect(typeof (await funcs.delete_programs)).toBe('function')
  
  
  });
  
  test('check updated program exists',async () =>{
    expect.assertions(1)
    expect(typeof (await funcs.updateprograms)).toBe('function')
    
    
    });