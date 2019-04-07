const axios = require("axios");

const functions = {
  getAll: async id => {
    const co = await axios.get(
      "http://localhost:3000/coWorkingSpaces/readRooms/"+id
    );
    return co;
  },
  getSpec: async (id, roomId) => {
    const co = await axios.get(
      "http://localhost:3000/coWorkingSpaces/showRoom/"+id+"/" + roomId
    );
    return co;
  },

  createOne: async (id, data) => {
    const co = await axios.put(
      "http://localhost:3000/coWorkingSpaces/addRoom/" + id,
      data
    );
    return co;
  },

  deleteOne: async (id, roomId) => {
    const co = await axios.delete(
      "http://localhost:3000/coWorkingSpaces/deleteRoom/" +id+"/"+ roomId
    );
    return co;
  },
  updateOne: async (id, data, roomId) => {
    const co = await axios.put(
      "http://localhost:3000/coWorkingSpaces/updateRoom/" +id+"/"+ roomId,
      data
    );
    return co;
  },
  getAll2: async () => {
    const co = await axios.get(
      "http://localhost:3000/rooms"
    );
    return co;
  },
  getSpec2: async id => {
    const co = await axios.get(
      "http://localhost:3000/rooms/" + id
    );
    return co;
  },

  createOne2: async data => {
    const co = await axios.post(
      "http://localhost:3000/rooms",
      data
    );
    return co;
  },

  deleteOne2: async id => {
    const co = await axios.delete(
      "http://localhost:3000/rooms/" + id
    );
    return co;
  },
  updateOne2: async (id, data) => {
    const co = await axios.put(
      "http://localhost:3000/rooms/" + id,
      data
    );
    return co;       
  },

  reserve: async (id, roomId, data) => {
    const co = await axios.put(
      "http://localhost:3000/coWorkingSpaces/acceptReservation/" +
        id +
        "/" +
        roomId,
      data
    );
    return co;
  }
};
module.exports = functions;
