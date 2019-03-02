// Get all partner
router.get('/', (req, res) => {
    res.send(partners)
})

/*marina show profile */
// Get a certain partner (id =>partnerId)
router.get('/:id', (req, res) => {
    const partnerId = req.params.id
    const partner = partners.find(partner=> partner.id === partnerId)
    if(partner!==undefined)
        res.send(partner)
})


router.post('/:id/editrequest',(request,response)=>{
    var id=request.params.id;
    var e= notObject.SendToAdminRequestNotification("Partner "+id+" wants to edit his profile");
    response.sendStatus(200);
});
