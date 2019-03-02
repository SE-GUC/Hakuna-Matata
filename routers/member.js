// Get a certain member (id =>memberId)
router.get('/:id', (req, res) => {
    for (const object of Memberarray){
        if(object.id==req.params.id){
            res.send(object);
      }
      }
     
      });

      router.get('/', (req, res) => {
        res.send(Memberarray)
    })
/*ask to edit profile marina*/
//(id =>memberId)
router.post('/:id/editrequest',(request,response)=>{
    var id=request.params.id;
    var e= notObject.SendToAdminRequestNotification("Member "+id+" wants to edit his profile");
    response.sendStatus(200);
});