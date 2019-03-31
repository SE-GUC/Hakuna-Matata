const funcs = require('../functions/room');
const funcs1 = require('../functions/CoworkingSpace');


jest.setTimeout(200000)


test('GetAll rooms of specific coworking space exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.getAll)).toBe('function')
})


test('Get Specific room of specific coworking space exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.getSpec)).toBe('function')
})

test('Create room of specific coworking space exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.deleteOne)).toBe('function')
})

test('Delete room of specific coworking space exists', async  () => {
  expect.assertions(1)
  expect(typeof (await funcs.deleteOne)).toBe('function')
})

test('Update room of specific coworking space exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.updateOne)).toBe('function')
})


test('GetAll rooms exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.getAll2)).toBe('function')
})


test('Get Specific rooms exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.getSpec2)).toBe('function')
})

test('Create room exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.createOne2)).toBe('function')
})

test('Delete room exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.deleteOne2)).toBe('function')
})

test('Update room exists', async () => {
  expect.assertions(1)
  expect(typeof (await funcs.updateOne2)).toBe('function')
})

///////////////////////////////////////
// create room in CO 
test('Create a room in Spec coworking space', async () => {
  const data = {
  
    name:"mnonaona",
phone_number:"01116816779",
location:"Ain shams",
business_plans:"3atel",
facilites:"fff"
,max_no_rooms:1

}
const partner_Id = "45"
const created = await funcs1.createOne(partner_Id,data)
const createdData = created.data
const id = createdData['_id']


const room = {
reserved_id:"mai",
     capacity:5,
     reserved_date:"2015-05-05T00:00:00.000Z",
     end_of_reservation:"2015-06-05T00:00:00.000Z",
    reserved:false

}

const response =  await funcs.getAll(id)
3
const len1=response.data.length
const createdr = await funcs.createOne(id,room);
const createdDatar = createdr.data



const response2 =  await funcs.getAll(id)
const len2=response2.data.length
const respo =  await funcs.getAll(id)



expect.assertions(4)
    expect(room.reserved_id).toEqual(createdDatar.reserved_id)
    expect(room.capacity).toEqual(createdDatar.capacity)
    expect(room.reserved).toEqual(createdDatar.reserved)
    
    expect(len2-len1).toBe(1)
      
})
test('create  room in specific Coworkong space with wrong validations',async()=>{
 
  const res =  await funcs1.getAll()
  const len1=res.data.length
   
    const id = res.data[len1-1]['_id']
  
    const data1={
        capacity:"DB",
        
    }
    try{
    const co= await funcs.createOne(id,data1)
  
    expect.assertions(2)
    expect(co.status).toBe(200)
    }
    catch(error){
        expect.assertions(1)
        expect(error.response.status).toBeGreaterThanOrEqual(400)
    }
  })

  ///////////////////////get a room in CO


test('get a room in specific coworking space by id', async () => {
  
  const room = {

  
reserved_id:"mai",
capacity:5,
reserved_date:"2015-05-05T00:00:00.000Z",
end_of_reservation:"2015-06-05T00:00:00.000Z",
reserved:false

}

   

const response =  await funcs1.getAll()
const len1=response.data.length
 
  const id = response.data[len1-1]['_id']
  const response2 =  await funcs.getAll(id)
  const len2=response2.data.length
 

    const idr= response2.data[len2-1]['_id']
    


    const read = await funcs.getSpec(id,idr)
    const readData = read.data
    expect.assertions(3)
    expect(readData.reserved_id).toEqual(room.reserved_id)
    expect(readData.capacity).toEqual(room.capacity)
    expect(readData.reserved).toEqual(room.reserved)
    
    
  })

  test('get not exist  room in specific Coworkong space ', async () => {
 
    const res =  await funcs1.getAll()
    const len1=res.data.length
     
      const id = res.data[len1-1]['_id']
    
   
    try{
    const co=await funcs.getSpec(id,"1234")
    
    expect.assertions(1)
    expect(co.status).toBe(200)
}
    catch(error){
        expect(error.response.status).toBeGreaterThanOrEqual(400)
    }
  })

////////////////////////////////////// check if the max num of room exceeds 
test('check if the max of rooms exceeded coworking space', async () => {

const room3 = {

  reserved_id:"loaa",
       capacity:5,
       reserved_date:"2015-05-05T00:00:00.000Z",
       end_of_reservation:"2015-06-05T00:00:00.000Z",
      reserved:false
  
  }

const response =  await funcs1.getAll()
const len1=response.data.length
const id = response.data[len1-1]['_id']
const createdr3 = await funcs.createOne(id,room3);
const createdDatar3 = createdr3.data
expect.assertions(1)
    expect(createdDatar3).toEqual("YOU CANT ADD ROOM")
})

//////////// update a room in CO

  test('Update a specific room in specific coworking space  by id', async () => {

    
      const dataToUpdate = {
        capacity: 7
      }
    
      const dataUpdated =  {

  
        reserved_id:"mai",
        capacity:7,
        reserved_date:"2015-05-05T00:00:00.000Z",
        end_of_reservation:"2015-06-05T00:00:00.000Z",
        reserved:false
        
        }
    
    
const response =  await funcs1.getAll()
const len1=response.data.length
 
  const id = response.data[len1-1]['_id']
  const response2 =  await funcs.getAll(id)
  const len2=response2.data.length
 

    const idr= response2.data[len2-1]['_id']

      
      const updated = await funcs.updateOne(id,dataToUpdate,idr)
      const updatedData = updated.data
      expect.assertions(3)
      expect(updatedData.reserved_id).toEqual(dataUpdated.reserved_id)
      expect(updatedData.capacity).toEqual(dataUpdated.capacity)
      expect(updatedData.reserved).toEqual(dataUpdated.reserved)
       
    })
    test('update not exist  room in specific Coworkong space ', async () => {
      const res =  await funcs1.getAll()
      const len1=res.data.length
       
        const id = res.data[len1-1]['_id']
      
      try{
      const co=await funcs.updateOne(id,"123",{capacity:5})
      
      expect.assertions(1)
      expect(co.status).toBe(200)
  }
      catch(error){expect.assertions(1)
  
          expect(error.response.status).toBeGreaterThanOrEqual(400)
      }
    })
    test('update room in specific Coworkong space with wrong validations',async()=>{
 
      const res =  await funcs1.getAll()
      const len1=res.data.length
       
        const id = res.data[len1-1]['_id']
        const response2 =  await funcs.getAll(id)
  const len2=response2.data.length
 

    const idr= response2.data[len2-1]['_id']

        const data1={
            capacity:"DB",
            
        }
        try{
        const co= await funcs.updateOne(id,data1,idr)
      
        expect.assertions(1)
        expect(co.status).toBe(200)
        }
        catch(error){
            expect.assertions(1)
            expect(error.response.status).toBeGreaterThanOrEqual(400)
        }
      })

    //////////////////// check reservation of a room cases 
  test('reserve an available room in specific coworking space  ', async () => {

    
    const dataToUpdate = {
      

        reserved_id:"mai",
                 reserved_date:"2018-05-05T00:00:00.000Z",
                 end_of_reservation:"2018-06-05T00:00:00.000Z"
              
     }
  
    const dataUpdated =  {


      reserved_id:"mai",
      capacity:7,
      reserved_date:"2018-05-05T00:00:00.000Z",
      end_of_reservation:"2018-06-05T00:00:00.000Z",
      reserved:true
      
      }
  
  
const response =  await funcs1.getAll()
const len1=response.data.length

const id = response.data[len1-1]['_id']
const response2 =  await funcs.getAll(id)
const len2=response2.data.length


  const idr= response2.data[len2-1]['_id']

    
    const reserve = await funcs.reserve(id,idr,dataToUpdate)
    const updatedData = reserve.data
    expect.assertions(4)
    expect(updatedData.reserved_id).toEqual(dataUpdated.reserved_id)
    expect(updatedData.reserved_date).toEqual(dataUpdated.reserved_date)
    expect(updatedData.end_of_reservation).toEqual(dataUpdated.end_of_reservation)
    expect(updatedData.reserved).toEqual(dataUpdated.reserved)
     
  })
  
  test('reserve an unavailable room in specific coworking space  ', async () => {

    
    const dataToUpdate = {
      

        reserved_id:"mai",
              
     }
  
  
const response =  await funcs1.getAll()
const len1=response.data.length

const id = response.data[len1-1]['_id']
const response2 =  await funcs.getAll(id)
const len2=response2.data.length


  const idr= response2.data[len2-1]['_id']

    try{
      
      
      const reserve = await funcs.reserve(id,idr,dataToUpdate)
      expect.assertions(1)
       
      expect(reserve.status).toBe(200)
  }catch(error){
    expect.assertions(1)
            expect(error.response.status).toBeGreaterThanOrEqual(400)

        
    }
  }

  )

  test('reserve an unavailable room in specific coworking space  ', async () => {

    
    const dataToUpdate = {
      

        reserved_id:"mai",
                 reserved_date:"2018-05-05T00:00:00.000Z",
                 end_of_reservation:"2018-06-05T00:00:00.000Z"
              
     }
  
const response =  await funcs1.getAll()
const len1=response.data.length

const id = response.data[len1-1]['_id']
const response2 =  await funcs.getAll(id)
const len2=response2.data.length


  const idr= response2.data[len2-1]['_id']

    try{
      expect.assertions(1)
       
      const reserve = await funcs.reserve(id,idr,dataToUpdate)
    expect(reserve.status).toBe(200)
  }catch(error){
    expect.assertions(2)
            expect(error.response.status).toBeGreaterThanOrEqual(400)

            expect(error.response.data).toEqual("this room is not available")
        
    }
  }

  )

  test('reserve a room in not existing coworking space', async () => {

    
    const dataToUpdate = {
      

        reserved_id:"mai",
                 reserved_date:"2018-05-05T00:00:00.000Z",
                 end_of_reservation:"2018-06-05T00:00:00.000Z"
              
     }
  
const response =  await funcs1.getAll()
const len1=response.data.length

const id = response.data[len1-1]['_id']
const response2 =  await funcs.getAll(id)
const len2=response2.data.length


  const idr= response2.data[len2-1]['_id']

    try{
      expect.assertions(1)
       
      const reserve = await funcs.reserve("1234",idr,dataToUpdate)
    expect(reserve.status).toBe(200)
  }catch(error){
    expect.assertions(2)
            expect(error.response.status).toBeGreaterThanOrEqual(400)

            expect(error.response.data).toEqual('Not found cowrking space')
        
    }
  }

  )
  
  test('reserve a not exist room in a coworking space', async () => {

    
    const dataToUpdate = {
        reserved_id:"mai",
                 reserved_date:"2018-05-05T00:00:00.000Z",
                 end_of_reservation:"2018-06-05T00:00:00.000Z"
              
     }
  
const response =  await funcs1.getAll()
const len1=response.data.length

const id = response.data[len1-1]['_id']

    try{
      expect.assertions(1)
       
      const reserve = await funcs.reserve(id,"1234",dataToUpdate)
    expect(reserve.status).toBe(200)
  }catch(error){
    expect.assertions(2)
            expect(error.response.status).toBeGreaterThanOrEqual(400)

            expect(error.response.data).toEqual('Not found room')
        
    }
  }

  )
    //////////////////////////deletion of a room in CO

    test('delete not exist room in specific coworking space ', async () => {
      const res =  await funcs1.getAll()
      const len1=res.data.length
       
        const id = res.data[len1-1]['_id']
      
     
      try{
      const co=await funcs.deleteOne(id,"4564")
      
      expect.assertions(1)
      expect(co.status).toBe(200)
  }
      catch(error){expect.assertions(1)
  
          expect(error.response.status).toBeGreaterThanOrEqual(400)
      }
    })
test('Delete a room of specific coworking space by id', async () => {
 
  const data =  {

  
    reserved_id:"mai",
    capacity:7,
    reserved_date:"2018-05-05T00:00:00.000Z",
    end_of_reservation:"2018-06-05T00:00:00.000Z",
    reserved:true
    
  }

    
  const response =  await funcs1.getAll()
  const len1=response.data.length   
  const id = response.data[len1-1]['_id']
  const response2 =  await funcs.getAll(id)
  const len2=response2.data.length
  const idr= response2.data[len2-1]['_id']
     
const deleted = await funcs.deleteOne(id,idr)
const deleted2 = await funcs.deleteOne2(idr)



const res =  await funcs.getAll(id)
const len=res.data.length


const deletedData = deleted.data
const d = await funcs1.deleteOne(id)

expect.assertions(4)
    expect(deletedData.reserved_id).toEqual(data.reserved_id)
    expect(deletedData.capacity).toEqual(data.capacity)
    expect(deletedData.reserved).toEqual(data.reserved)
      expect(len2-len).toBe(1)

    })
////////////////////////////////////////////////////////////////////
// create a room
  
test('create a room', async () => {

  const room = {

  
    reserved_id:"mai",
    capacity:5,
    reserved_date:"2015-05-05T00:00:00.000Z",
    end_of_reservation:"2015-06-05T00:00:00.000Z",
    reserved:false
    
    }
  const res =  await funcs.getAll2()
  
  const len3=res.data.length
  
  

  const createdr = await funcs.createOne2(room);
  const createdDatar = createdr.data
  
  const idr = createdDatar['_id']
  
  
  const res2 =  await funcs.getAll2()
  
  const len4=res2.data.length
  
  
  expect.assertions(4)
      expect(room.reserved_id).toEqual(createdDatar.reserved_id)
      expect(room.capacity).toEqual(createdDatar.capacity)
      expect(room.reserved).toEqual(createdDatar.reserved)
        expect(len3-len4).toBe(-1)
  })
  

  test('create  room  with wrong validations',async()=>{
 
      const data1={
          capacity:"DB",
          
      }
      try{
      const co= await funcs.createOne2(data1)
    
      expect.assertions(1)
      expect(co.status).toBe(200)
      }
      catch(error){
          expect.assertions(1)
          expect(error.response.status).toBeGreaterThanOrEqual(400)
      }
    })

  //////////////////////////////get a room
  test('get a room  by id', async () => {
    const room = {

  
      reserved_id:"mai",
      capacity:5,
      reserved_date:"2015-05-05T00:00:00.000Z",
      end_of_reservation:"2015-06-05T00:00:00.000Z",
      reserved:false
      
      }
      const response2 =  await funcs.getAll2()
  const len2=response2.data.length
  const idr= response2.data[len2-1]['_id']
     
      
      
      const read = await funcs.getSpec2(idr)
    const readData = read.data
    expect.assertions(3)
    expect(readData.reserved_id).toEqual(room.reserved_id)
    expect(readData.capacity).toEqual(room.capacity)
    expect(readData.reserved).toEqual(room.reserved)
    
    
  })
  
  
  test('get not exist  room ', async () => {
 
   
    try{
    const co=await funcs.getSpec2("1234")
    
    expect.assertions(1)
    expect(co.status).toBe(200)
}
    catch(error){
      expect.assertions(1)
  
        expect(error.response.status).toBeGreaterThanOrEqual(400)
    }
  })
///////////////////////////////////////
//update a room
test('Update a specific room   by id', async () => {
 


  const dataToUpdate = {
    capacity: 7
  }

  const dataUpdated = {
  
    reserved_id:"mai",
    capacity:7,
    reserved_date:"2015-05-05T00:00:00.000Z",
    end_of_reservation:"2015-06-05T00:00:00.000Z",
    reserved:false
    
    }
    const response2 =  await funcs.getAll2()
    const len2=response2.data.length
    const idr= response2.data[len2-1]['_id']
       
        
  
  const updated = await funcs.updateOne2(idr,dataToUpdate)
  const updatedData = updated.data
  expect.assertions(1)
  expect(updatedData.capacity).toEqual(dataUpdated.capacity)
     
})

test('update not exist  room ', async () => {

  try{
  const co=await funcs.updateOne("123",{capacity:5})
  
  expect.assertions(1)
  expect(co.status).toBe(200)
}
  catch(error){
    expect.assertions(1)
    expect(error.response.status).toBeGreaterThanOrEqual(400)
  }
})
test('update room  with wrong validations',async()=>{
  const response2 =  await funcs.getAll2()
  const len2=response2.data.length
  const idr= response2.data[len2-1]['_id']
     
    const data1={
        capacity:"DB",
        
    }
    try{
    const co= await funcs.updateOne2(idr,data1)
  
    expect.assertions(1)
    expect(co.status).toBe(200)
    }
    catch(error){
        expect.assertions(1)
        expect(error.response.status).toBeGreaterThanOrEqual(400)
    }
  })
///////////////////////////////////////
//delete a room
  test('delete not exist room ', async () => {
    
    try{
    const co=await funcs.deleteOne2("4564")
    
    expect.assertions(1)
    expect(co.status).toBe(200)
}
    catch(error){
      expect.assertions(1)

      expect(error.response.status).toBeGreaterThanOrEqual(400)
    }
  })
test('Delete a room id', async () => {

  const room = {
  
    reserved_id:"mai",
    capacity:7,
    reserved_date:"2015-05-05T00:00:00.000Z",
    end_of_reservation:"2015-06-05T00:00:00.000Z",
    reserved:false
    
    }

const response2 =  await funcs.getAll2()
const len2=response2.data.length
const idr= response2.data[len2-1]['_id']
   
    
const deleted2 = await funcs.deleteOne2(idr)

const deletedData = deleted2.data

const res2 =  await funcs.getAll2()

const len4=res2.data.length


expect.assertions(6)
    expect(deletedData.reserved_id).toEqual(room.reserved_id)
    expect(deletedData.capacity).toEqual(room.capacity)
    expect(deletedData.reserved_date).toEqual(room.reserved_date)
    expect(deletedData.end_of_reservation).toEqual(room.end_of_reservation)
    expect(deletedData.reserved).toEqual(room.reserved)
      expect(len2-len4).toBe(1)
    
})


