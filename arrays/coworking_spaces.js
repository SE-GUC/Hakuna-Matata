const coworking_space = require('../models/coworking_space');
const room = require('../models/room');

var coworking_spaces =[
    new coworking_space(4,2,"gdbhjgb","jlksgdjgds","01221","gkdlsdg","fdslklfds",[new room(null,2,null,null,null,false)],4)
];
module.exports=coworking_spaces;