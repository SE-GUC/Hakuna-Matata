var User=0

function setUser(user){
    
    User=user.id
    console.log("idfun "+User)
}

function getUser(){
    console.log("get id  "+User)
    return User
   
}

export  {getUser,setUser}