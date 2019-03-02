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