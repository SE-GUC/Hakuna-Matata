const task = require('../models/task');
var moment = require('moment');

// temporary data created as if it was pulled out of the database ...
const tasks = [
    new task(1,1,0,null,null,null,'desc1',[
        "Web designer","Android devoloper","Ios dvoloper"
    ],'2000 dollar w nos', moment().format('MMMM Do YYYY, h:mm:ss a'),null,null,null,1,3,null,null,null,null,null,false,[]),
    new task(2,1,0,null,null,null,'desc1',[
        "Web designer","Web devoloper","Grafic designer","Android devoloper","Ios dvoloper"
    ],'2000 dollar w nos', moment().format('MMMM Do YYYY, h:mm:ss a'),null,null,null,4,5,null,null,null,null,null,false,[]),
    new task(3,2,0,null,null,null,'desc1',[
        "Grafic designer","Android devoloper","Ios dvoloper"
    ],'2000 dollar w nos', moment().format('MMMM Do YYYY, h:mm:ss a'),null,null,null,2,1,null,null,null,null,null,true,[new task(3,2,1,null,null,null,'desc500',[
        "Grafic designer","Android devoloper","Ios dvoloper"
    ],'2000 dollar w nos', moment().format('MMMM Do YYYY, h:mm:ss a'),null,null,null,2,1,null,null,null,null,null,true,[]),new task(3,2,2,null,null,null,'desc600',[
        "Grafic designer","Android devoloper","Ios dvoloper"
    ],'2000 dollar w nos', moment().format('MMMM Do YYYY, h:mm:ss a'),null,null,null,2,1,null,null,null,null,null,true,[])]),
    new task(4,3,0,null,null,null,'desc1',[
        "Web designer","Web devoloper","Grafic designer"
    ],'2000 dollar w nos', moment().format('MMMM Do YYYY, h:mm:ss a'),null,null,null,5,2,null,null,null,null,null,false,[]),
    new task(5,2,0,null,null,[1,2,3],'desc1',[
        "Web devoloper","Grafic designer"
    ],'2000 dollar w nos', moment().format('MMMM Do YYYY, h:mm:ss a'),null,null,null,5,2,null,null,null,null,null,false,[])
];
module.exports=tasks



