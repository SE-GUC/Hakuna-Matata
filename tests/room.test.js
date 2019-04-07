const funcs = require("../functions/roomfn");
const funcs1 = require("../functions/coWorkingSpacefn");

jest.setTimeout(200000);

test("GetAll rooms of specific coworking space exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.getAll)).toBe("function");
});

test("Get Specific room of specific coworking space exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.getSpec)).toBe("function");
});

test("Create room of specific coworking space exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.deleteOne)).toBe("function");
});

test("Delete room of specific coworking space exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.deleteOne)).toBe("function");
});

test("Update room of specific coworking space exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.updateOne)).toBe("function");
});

test("GetAll rooms exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.getAll2)).toBe("function");
});

test("Get Specific rooms exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.getSpec2)).toBe("function");
});

test("Create room exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.createOne2)).toBe("function");
});

test("Delete room exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.deleteOne2)).toBe("function");
});

test("Update room exists", async () => {
  expect.assertions(1);
  expect(typeof (await funcs.updateOne2)).toBe("function");
});

///////////////////////////////////////
// create room in CO
test("Create a room in Spec coworking space", async () => {
  const data = {
    name: "mnonaona",
    phoneNumber: "01116816779",
    location: "Ain shams",
    businessPlans: "3atel",
    facilites: "fff",
    maxNoRooms: 1
  };
  const partner_Id = "45";
  const created = await funcs1.createOne(partner_Id, data);
  const createdData = created.data;
  const id = createdData["_id"];

  const room = {
    reservedId: "mai",
    capacity: 5,
    reservedDate: "2015-05-05T00:00:00.000Z",
    endOfReservation: "2015-06-05T00:00:00.000Z",
    reserved: false
  };

  const response = await funcs.getAll(id);

  const len1 = response.data.length;
  const createdRoom = await funcs.createOne(id, room);
  const createdDataR = createdRoom.data;

  const response2 = await funcs.getAll(id);
  const len2 = response2.data.length;

  expect.assertions(4);
  expect(room.reservedId).toEqual(createdDataR.reservedId);
  expect(room.capacity).toEqual(createdDataR.capacity);
  expect(room.reserved).toEqual(createdDataR.reserved);

  expect(len2 - len1).toBe(1);
});
test("create  room in specific Coworkong space with wrong validations", async () => {
  const res = await funcs1.getAll();
  const len1 = res.data.length;

  const id = res.data[len1 - 1]["_id"];

  const data1 = {
    capacity: "DB"
  };
  try {
    const CoworkingSpace = await funcs.createOne(id, data1);

    expect.assertions(2);
    expect(CoworkingSpace.status).toBe(200);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});

///////////////////////get a room in CO

test("get a room in specific coworking space by id", async () => {
  const room = {
    reservedId: "mai",
    capacity: 5,
    reservedDate: "2015-05-05T00:00:00.000Z",
    endOfReservation: "2015-06-05T00:00:00.000Z",
    reserved: false
  };

  const response = await funcs1.getAll();
  const len1 = response.data.length;

  const id = response.data[len1 - 1]["_id"];
  const response2 = await funcs.getAll(id);
  const len2 = response2.data.length;

  const idRoom = response2.data[len2 - 1]["_id"];

  const read = await funcs.getSpec(id, idRoom);
  const readData = read.data;
  expect.assertions(3);
  expect(readData.reservedId).toEqual(room.reservedId);
  expect(readData.capacity).toEqual(room.capacity);
  expect(readData.reserved).toEqual(room.reserved);
});

test("get not exist  room in specific Coworkong space ", async () => {
  const res = await funcs1.getAll();
  const len1 = res.data.length;

  const id = res.data[len1 - 1]["_id"];

  try {
    const CoworkingSpace = await funcs.getSpec(id, "1234");

    expect.assertions(1);
    expect(CoworkingSpace.status).toBe(200);
  } catch (error) {
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});

////////////////////////////////////// check if the max num of room exceeds
test("check if the max of rooms exceeded coworking space", async () => {
  const room3 = {
    reservedId: "mai",
    capacity: 5,
    reservedDate: "2015-05-05T00:00:00.000Z",
    endOfReservation: "2015-06-05T00:00:00.000Z",
    reserved: false
  };

  const response = await funcs1.getAll();
  const len1 = response.data.length;
  const id = response.data[len1 - 1]["_id"];
  const createdRoom = await funcs.createOne(id, room3);
  const createdDataRoom = createdRoom.data;
  expect.assertions(1);
  expect(createdDataRoom).toEqual("YOU CANT ADD ROOM");
});

//////////// update a room in CO

test("Update a specific room in specific coworking space  by id", async () => {
  const dataToUpdate = {
    capacity: 7
  };

  const dataUpdated = {
    reservedId: "mai",
    capacity: 7,
    reservedDate: "2015-05-05T00:00:00.000Z",
    endOfReservation: "2015-06-05T00:00:00.000Z",
    reserved: false
  };

  const response = await funcs1.getAll();
  const len1 = response.data.length;

  const id = response.data[len1 - 1]["_id"];
  const response2 = await funcs.getAll(id);
  const len2 = response2.data.length;

  const idRoom = response2.data[len2 - 1]["_id"];

  const updated = await funcs.updateOne(id, dataToUpdate, idRoom);
  const updatedData = updated.data;
  expect.assertions(3);
  expect(updatedData.reservedId).toEqual(dataUpdated.reservedId);
  expect(updatedData.capacity).toEqual(dataUpdated.capacity);
  expect(updatedData.reserved).toEqual(dataUpdated.reserved);
});
test("update not exist  room in specific Coworkong space ", async () => {
  const res = await funcs1.getAll();
  const len1 = res.data.length;

  const id = res.data[len1 - 1]["_id"];

  try {
    const coWorkingSpace = await funcs.updateOne(id, "123", { capacity: 5 });

    expect.assertions(1);
    expect(coWorkingSpace.status).toBe(200);
  } catch (error) {
    expect.assertions(1);

    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});
test("update room in specific Coworkong space with wrong validations", async () => {
  const res = await funcs1.getAll();
  const len1 = res.data.length;

  const id = res.data[len1 - 1]["_id"];
  const response2 = await funcs.getAll(id);
  const len2 = response2.data.length;

  const idRoom = response2.data[len2 - 1]["_id"];

  const data1 = {
    capacity: "DB"
  };
  try {
    const CoworkingSpace = await funcs.updateOne(id, data1, idRoom);

    expect.assertions(1);
    expect(CoworkingSpace.status).toBe(200);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});

//////////////////// check reservation of a room cases
test("reserve an available room in specific coworking space  ", async () => {
  const dataToUpdate = {
    reservedId: "mai",
    reservedDate: "2018-05-05T00:00:00.000Z",
    endOfReservation: "2018-06-05T00:00:00.000Z"
  };

  const dataUpdated = {
    reservedId: "mai",
    capacity: 7,
    reservedDate: "2018-05-05T00:00:00.000Z",
    endOfReservation: "2018-06-05T00:00:00.000Z",
    reserved: true
  };

  const response = await funcs1.getAll();
  const len1 = response.data.length;

  const id = response.data[len1 - 1]["_id"];
  const response2 = await funcs.getAll(id);
  const len2 = response2.data.length;

  const idRoom = response2.data[len2 - 1]["_id"];

  const reserve = await funcs.reserve(id, idRoom, dataToUpdate);
  const updatedData = reserve.data;
  expect.assertions(4);
  expect(updatedData.reservedId).toEqual(dataUpdated.reservedId);
  expect(updatedData.reservedDate).toEqual(dataUpdated.reservedDate);
  expect(updatedData.endOfReservation).toEqual(dataUpdated.endOfReservation);
  expect(updatedData.reserved).toEqual(dataUpdated.reserved);
});

test("reserve an unavailable room in specific coworking space  ", async () => {
  const dataToUpdate = {
    reservedId: "mai"
  };

  const response = await funcs1.getAll();
  const len1 = response.data.length;

  const id = response.data[len1 - 1]["_id"];
  const response2 = await funcs.getAll(id);
  const len2 = response2.data.length;

  const idRoom = response2.data[len2 - 1]["_id"];

  try {
    const reserve = await funcs.reserve(id, idRoom, dataToUpdate);
    expect.assertions(1);

    expect(reserve.status).toBe(200);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});

test("reserve an unavailable room in specific coworking space  ", async () => {
  const dataToUpdate = {
    reservedId: "mai",
    reservedDate: "2018-05-05T00:00:00.000Z",
    endOfReservation: "2018-06-05T00:00:00.000Z"
  };

  const response = await funcs1.getAll();
  const len1 = response.data.length;

  const id = response.data[len1 - 1]["_id"];
  const response2 = await funcs.getAll(id);
  const len2 = response2.data.length;

  const idRoom = response2.data[len2 - 1]["_id"];

  try {
    expect.assertions(1);

    const reserve = await funcs.reserve(id, idRoom, dataToUpdate);
    expect(reserve.status).toBe(200);
  } catch (error) {
    expect.assertions(2);
    expect(error.response.status).toBeGreaterThanOrEqual(400);

    expect(error.response.data).toEqual("this room is not available");
  }
});

test("reserve a room in not existing coworking space", async () => {
  const dataToUpdate = {
    reservedId: "mai",
    reservedDate: "2018-05-05T00:00:00.000Z",
    endOfReservation: "2018-06-05T00:00:00.000Z"
  };

  const response = await funcs1.getAll();
  const len1 = response.data.length;

  const id = response.data[len1 - 1]["_id"];
  const response2 = await funcs.getAll(id);
  const len2 = response2.data.length;

  const idRoom = response2.data[len2 - 1]["_id"];

  try {
    expect.assertions(1);

    const reserve = await funcs.reserve("1234", idRoom, dataToUpdate);
    expect(reserve.status).toBe(200);
  } catch (error) {
    expect.assertions(2);
    expect(error.response.status).toBeGreaterThanOrEqual(400);

    expect(error.response.data).toEqual("Not found cowrking space");
  }
});

test("reserve a not exist room in a coworking space", async () => {
  const dataToUpdate = {
    reservedId: "mai",
    reservedDate: "2018-05-05T00:00:00.000Z",
    endOfReservation: "2018-06-05T00:00:00.000Z"
  };

  const response = await funcs1.getAll();
  const len1 = response.data.length;

  const id = response.data[len1 - 1]["_id"];

  try {
    expect.assertions(1);

    const reserve = await funcs.reserve(id, "1234", dataToUpdate);
    expect(reserve.status).toBe(200);
  } catch (error) {
    expect.assertions(2);
    expect(error.response.status).toBeGreaterThanOrEqual(400);

    expect(error.response.data).toEqual("Not found room");
  }
});
//////////////////////////deletion of a room in CO

test("delete not exist room in specific coworking space ", async () => {
  const res = await funcs1.getAll();
  const len1 = res.data.length;

  const id = res.data[len1 - 1]["_id"];

  try {
    const coWorkingSpace = await funcs.deleteOne(id, "4564");

    expect.assertions(1);
    expect(coWorkingSpace.status).toBe(200);
  } catch (error) {
    expect.assertions(1);

    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});
test("Delete a room of specific coworking space by id", async () => {
  const data = {
    reservedId: "mai",
    capacity: 7,
    reservedDate: "2018-05-05T00:00:00.000Z",
    endOfReservation: "2018-06-05T00:00:00.000Z",
    reserved: true
  };

  const response = await funcs1.getAll();
  const len1 = response.data.length;
  const id = response.data[len1 - 1]["_id"];
  const response2 = await funcs.getAll(id);
  const len2 = response2.data.length;
  const idRoom = response2.data[len2 - 1]["_id"];

  const deleted = await funcs.deleteOne(id, idRoom);
  const deletedRoom = await funcs.deleteOne2(idRoom);

  const res = await funcs.getAll(id);
  const len = res.data.length;

  const deletedData = deleted.data;
  const delteedCoWorkingSpace = await funcs1.deleteOne(id);

  expect.assertions(4);
  expect(deletedData.reservedId).toEqual(data.reservedId);
  expect(deletedData.capacity).toEqual(data.capacity);
  expect(deletedData.reserved).toEqual(data.reserved);
  expect(len2 - len).toBe(1);
});
////////////////////////////////////////////////////////////////////
// create a room

test("create a room", async () => {
  const room = {
    reservedId: "mai",
    capacity: 5,
    reservedDate: "2018-05-05T00:00:00.000Z",
    endOfReservation: "2018-06-05T00:00:00.000Z",
    reserved: true
  };
  const res = await funcs.getAll2();

  const len3 = res.data.length;

  const createdr = await funcs.createOne2(room);
  const createdDatar = createdr.data;

  const idRoom = createdDatar["_id"];

  const res2 = await funcs.getAll2();

  const len4 = res2.data.length;

  expect.assertions(4);
  expect(room.reservedId).toEqual(createdDatar.reservedId);
  expect(room.capacity).toEqual(createdDatar.capacity);
  expect(room.reserved).toEqual(createdDatar.reserved);
  expect(len3 - len4).toBe(-1);
});

test("create  room  with wrong validations", async () => {
  const data1 = {
    capacity: "DB"
  };
  try {
    const coWorkingSpace = await funcs.createOne2(data1);

    expect.assertions(1);
    expect(coWorkingSpace.status).toBe(200);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});

//////////////////////////////get a room
test("get a room  by id", async () => {
  const room = {
    reservedId: "mai",
    capacity: 5,
    reservedDate: "2018-05-05T00:00:00.000Z",
    endOfReservation: "2018-06-05T00:00:00.000Z",
    reserved: true
  };
  const response2 = await funcs.getAll2();
  const len2 = response2.data.length;
  const idRoom = response2.data[len2 - 1]["_id"];

  const read = await funcs.getSpec2(idRoom);
  const readData = read.data;
  expect.assertions(3);
  expect(readData.reservedId).toEqual(room.reservedId);
  expect(readData.capacity).toEqual(room.capacity);
  expect(readData.reserved).toEqual(room.reserved);
});

test("get not exist  room ", async () => {
  try {
    const coWorkingSpace = await funcs.getSpec2("1234");

    expect.assertions(1);
    expect(coWorkingSpace.status).toBe(200);
  } catch (error) {
    expect.assertions(1);

    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});
///////////////////////////////////////
//update a room
test("Update a specific room   by id", async () => {
  const dataToUpdate = {
    capacity: 7
  };

  const dataUpdated = {
    reservedId: "mai",
    capacity: 7,
    reservedDate: "2018-05-05T00:00:00.000Z",
    endOfReservation: "2018-06-05T00:00:00.000Z",
    reserved: true
  };
  const response2 = await funcs.getAll2();
  const len2 = response2.data.length;
  const idRoom = response2.data[len2 - 1]["_id"];

  const updated = await funcs.updateOne2(idRoom, dataToUpdate);
  const updatedData = updated.data;
  expect.assertions(1);
  expect(updatedData.capacity).toEqual(dataUpdated.capacity);
});

test("update not exist  room ", async () => {
  try {
    const coWorkingSpace = await funcs.updateOne("123", { capacity: 5 });

    expect.assertions(1);
    expect(coWorkingSpace.status).toBe(200);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});
test("update room  with wrong validations", async () => {
  const response2 = await funcs.getAll2();
  const len2 = response2.data.length;
  const idRoom = response2.data[len2 - 1]["_id"];

  const data1 = {
    capacity: "DB"
  };
  try {
    const coWorkingSpace = await funcs.updateOne2(idRoom, data1);

    expect.assertions(1);
    expect(coWorkingSpace.status).toBe(200);
  } catch (error) {
    expect.assertions(1);
    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});
///////////////////////////////////////
//delete a room
test("delete not exist room ", async () => {
  try {
    const coWorkingSpace = await funcs.deleteOne2("4564");

    expect.assertions(1);
    expect(coWorkingSpace.status).toBe(200);
  } catch (error) {
    expect.assertions(1);

    expect(error.response.status).toBeGreaterThanOrEqual(400);
  }
});
test("Delete a room id", async () => {
  const room = {
    reservedId: "mai",
    capacity: 7,
    reservedDate: "2018-05-05T00:00:00.000Z",
    endOfReservation: "2018-06-05T00:00:00.000Z",
    reserved: true
  };

  const response2 = await funcs.getAll2();
  const len2 = response2.data.length;
  const idRoom = response2.data[len2 - 1]["_id"];

  const deleted2 = await funcs.deleteOne2(idRoom);

  const deletedData = deleted2.data;

  const res2 = await funcs.getAll2();

  const len4 = res2.data.length;

  expect.assertions(6);
  expect(deletedData.reservedId).toEqual(room.reservedId);
  expect(deletedData.capacity).toEqual(room.capacity);
  expect(deletedData.reservedDate).toEqual(room.reservedDate);
  expect(deletedData.endOfReservation).toEqual(room.endOfReservation);
  expect(deletedData.reserved).toEqual(room.reserved);
  expect(len2 - len4).toBe(1);
});
