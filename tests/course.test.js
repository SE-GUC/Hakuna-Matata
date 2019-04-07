const funcs = require('../functions/coursefn');
describe('test functions is found',()=>{
    test('create course', async () => {
        expect.assertions(1)
        expect(typeof (await funcs.createCourse)).toBe('function')
      })
      test('update course', async () => {
        expect.assertions(1)
        expect(typeof (await funcs.updateCourse)).toBe('function')
      })
      test('delete course', async () => {
        expect.assertions(1)
        expect(typeof (await funcs.deleteCourse)).toBe('function')
      })
      test('get all course', async () => {
        expect.assertions(1)
        expect(typeof (await funcs.getAllCourses)).toBe('function')
      })
      test('show course', async () => {
        expect.assertions(1)
        expect(typeof (await funcs.getCourse)).toBe('function')
      })
    });
describe('test crud of courses',()=>{   
  test('create course',async()=>{
    const data1={
        name:"DB",
        educatorName:"Mayar",
        description:"very hard",
        places:124,
        availablePlaces:124,
        payment:800,
        courseDuration:40 ,
        startDate:"2019-02-02T22:00:00.000z",
        endDate:"2019-02-02T22:00:00.000z",
        categories:"CS",
        available:true
    }
    const courses=await funcs.getAllCourses()
    const length =courses.data.data.length
   
    const course= await funcs.createCourse(data1)
    const coursesx=await funcs.getAllCourses()
    const lengthx =coursesx.data.data.length
 
    const id =course.data.data['_id']
    
    const deletedc=await funcs.deleteCourse(id)
    
    expect.assertions(2)
    expect(course.status).toBe(200)
    expect(lengthx-length).toBe(1)
  })
  test('create course with wrong validations',async()=>{
    const data1={
        name:"DB",
        
    }
    try{
    const course= await funcs.createCourse(data1)

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
    educatorName:"Mayar5",
    description:"very hard",
    places:124,
    availablePlaces:124,
    payment:800,
    courseDuration:40 ,
    startDate:"2019-02-02T22:00:00.000z",
    endDate:"2019-02-02T22:00:00.000z",
    categories:"CS",
    available:true
}
    const coursecreated=await funcs.createCourse(data1)
    const id=coursecreated.data.data['_id']
    const getcourse=await funcs.getCourse(id)
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
    const deletedc=await funcs.deleteCourse(id)
  })
  test('get not exist course ', async () => {
 
        try{
        const getcourse=await funcs.getCourse(123)
        
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
        educatorName:"Mayar",
        description:"very hard",
        places:124,
        availablePlaces:124,
        payment:800,
        courseDuration:40 ,
        startDate:"2019-02-02T22:00:00.000z",
        endDate:"2019-02-02T22:00:00.000z",
        categories:"CS",
        available:true
    }
    
    const course= await funcs.createCourse(data1)
    const coursesx=await funcs.getAllCourses()
    const lengthx =coursesx.data.data.length
    const id =course.data.data['_id']
    const deletedc=await funcs.deleteCourse(id)
    const coursess=await funcs.getAllCourses()
    const length =coursess.data.data.length
    expect.assertions(4)
    expect(course.status).toBe(200)
    expect(coursesx.status).toBe(200)
    expect(deletedc.status).toBe(200)
    expect(length).toBe(lengthx-1)
  })
  test('delete not exist course ', async () => {
 
    try{
    const getcourse=await funcs.deleteCourse(123)
    
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
        educatorName:"Mayar",
        description:"very hard",
        places:124,
        availablePlaces:124,
        payment:800,
        courseDuration:40 ,
        startDate:"2019-02-02T22:00:00.000z",
        endDate:"2019-02-02T22:00:00.000z",
        categories:"CS",
        available:true
    }
    const data={
        name:"SE",
    }
    
    const course= await funcs.createCourse(data1)
    
    const id =course.data.data['_id']
    console.log(id)
    const updated=await funcs.updateCourse(id,data)
    console.log(updated.status)
    expect.assertions(2)
    expect(course.status).toBe(200)
    expect(updated.status).toBe(200)
    const deletedc=await funcs.deleteCourse(id)
  })
  test('update not exist course ', async () => {
 
    try{
    const getcourse=await funcs.updateCourse(123)
    
    expect.assertions(1)
    expect(getcourse.status).toBe(200)
}
    catch(error){
        expect(error.response.status).toBeGreaterThanOrEqual(400)
    }
  })
});