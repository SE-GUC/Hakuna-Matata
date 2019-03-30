const funcs = require('../functions/Edu_organizationsfn');
describe('test functions is found',()=>{
    test('create educational organization', async () => {
        expect.assertions(1)
        expect(typeof (await funcs.create_course)).toBe('function')
      })
      test('create educational organization', async () => {
        expect.assertions(1)
        expect(typeof (await funcs.update_courses)).toBe('function')
      })
      test('create educational organization', async () => {
        expect.assertions(1)
        expect(typeof (await funcs.delete_courses)).toBe('function')
      })
      test('create educational organization', async () => {
        expect.assertions(1)
        expect(typeof (await funcs.get_courses)).toBe('function')
      })
      test('create educational organization', async () => {
        expect.assertions(1)
        expect(typeof (await funcs.show_courses)).toBe('function')
      })
    });
describe('test crud of courses',()=>{   
test('create educational organization', async () => {
    expect.assertions(1)
    expect(typeof (await funcs.create_course)).toBe('function')
  })
  test('create course',async()=>{
    const data1={
        name:"DB",
        educator_name:"Mayar",
        description:"very hard",
        places:124,
        available_places:124,
        payment:800,
        course_duration:40 ,
        start_date:"2019-02-02T22:00:00.000z",
        end_date:"2019-02-02T22:00:00.000z",
        categories:"CS",
        available:true
    }
    const courses=await funcs.show_courses()
    const length =courses.data.data.length
    const course= await funcs.create_course(data1)
    const coursesx=await funcs.show_courses()
    const lengthx =coursesx.data.data.length
    const id =course.data.data['_id']
    const deletedc=await funcs.delete_courses(id)
    expect.assertions(2)
    expect(course.status).toBe(200)
    expect(lengthx-length).toBe(1)
  })
  test('create course with wrong validations',async()=>{
    const data1={
        name:"DB",
        
    }
    try{
    const course= await funcs.create_course(data1)

    expect.assertions(2)
    expect(course.status).toBe(200)
    expect(lengthx-length).toBe(1)
    }
    catch(error){
        expect.assertions(1)
        expect(error.response.status).toBeGreaterThanOrEqual(400)
    }
  })
  test('get course correct ', async () => {
 
const data1={
    name:"DB",
    educator_name:"Mayar5",
    description:"very hard",
    places:124,
    available_places:124,
    payment:800,
    course_duration:40 ,
    start_date:"2019-02-02T22:00:00.000z",
    end_date:"2019-02-02T22:00:00.000z",
    categories:"CS",
    available:true
}
    const coursecreated=await funcs.create_course(data1)
    const id=coursecreated.data.data['_id']
    const getcourse=await funcs.get_courses(id)
    const getdata=getcourse.data.data
    expect.assertions(9)
    expect(getdata.name).toEqual(data1.name)
    expect(getdata.educator_name).toEqual(data1.educator_name)
    expect(getdata.description).toEqual(data1.description)
    expect(getdata.places).toEqual(data1.places)
    expect(getdata.available_places).toEqual(data1.available_places)
    expect(getdata.course_duration).toEqual(data1.course_duration)
    expect(getdata.payment).toEqual(data1.payment)
    expect(getdata.categories).toEqual(data1.categories)
    expect(getdata.available).toEqual(data1.available)
    const deletedc=await funcs.delete_courses(id)
  })
  test('get not exist course ', async () => {
 
        try{
        const getcourse=await funcs.get_courses(123)
        
        expect.assertions(1)
        expect(getcourse.status).toBe(200)
  }
        catch(error){
            expect(error.response.status).toBeGreaterThanOrEqual(400)
        }
      })
  test('delete course',async()=>{
    const data1={
        name:"DB",
        educator_name:"Mayar",
        description:"very hard",
        places:124,
        available_places:124,
        payment:800,
        course_duration:40 ,
        start_date:"2019-02-02T22:00:00.000z",
        end_date:"2019-02-02T22:00:00.000z",
        categories:"CS",
        available:true
    }
    
    const course= await funcs.create_course(data1)
    const coursesx=await funcs.show_courses()
    const lengthx =coursesx.data.data.length
    const id =course.data.data['_id']
    const deletedc=await funcs.delete_courses(id)
    const length = deletedc.data.data.length
    expect.assertions(4)
    expect(course.status).toBe(200)
    expect(coursesx.status).toBe(200)
    expect(deletedc.status).toBe(200)
    expect(length).toBe(lengthx-1)
  })
  test('delete not exist course ', async () => {
 
    try{
    const getcourse=await funcs.delete_courses(123)
    
    expect.assertions(1)
    expect(getcourse.status).toBe(200)
}
    catch(error){
        expect(error.response.status).toBeGreaterThanOrEqual(400)
    }
  })
  test('update course',async()=>{
    const data1={
        name:"DB",
        educator_name:"Mayar",
        description:"very hard",
        places:124,
        available_places:124,
        payment:800,
        course_duration:40 ,
        start_date:"2019-02-02T22:00:00.000z",
        end_date:"2019-02-02T22:00:00.000z",
        categories:"CS",
        available:true
    }
    const data={
        name:"SE",
    }
    
    const course= await funcs.create_course(data1)
    
    const id =course.data.data['_id']
    const updated=await funcs.update_courses(id,data)
    expect.assertions(2)
    expect(course.status).toBe(200)
    expect(updated.status).toBe(200)
    const deletedc=await funcs.delete_courses(id)
  })
  test('update not exist course ', async () => {
 
    try{
    const getcourse=await funcs.update_courses(123)
    
    expect.assertions(1)
    expect(getcourse.status).toBe(200)
}
    catch(error){
        expect(error.response.status).toBeGreaterThanOrEqual(400)
    }
  })
});