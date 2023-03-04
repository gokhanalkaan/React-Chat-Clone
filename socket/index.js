
const { Server } = require("socket.io");


const io = new Server(8900, { 
    cors:{
        origin:"http://localhost:3000"
    }
 });


let users=[];

const getCurrentTime=()=>{

    let today = new Date();
 let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
 return time;


}




const addUser=(userId,socketId)=>{
    !users.some(user => user.userId === userId) && users.push({userId,socketId})

}

const removeUser=(socketId)=>{
 users= users.filter(user => user.socketId !== socketId);

}

io.on("connection", (socket) => {

  
   

    socket.on("addUser",userId =>{
        addUser(userId,socket.id);
        console.log("user connected :"+ getCurrentTime() )

        console.log(users)
        
    io.emit("getUsers",users)



    });

    socket.on("sendMessage",({senderId,receiverId,message,chatId,photoUrl,profilePhoto,username})=>{
      const  user=users.find(u =>u.userId === receiverId)

      if(!user) return;

      console.log(message);
        io.to(user.socketId).emit("getMessage",
        {senderId,
            message,
            chatId,
            photoUrl,
            profilePhoto,
            username

        });



    });



    socket.on("sendMsgReadInfo",({msgSenderId,msgReaderId})=>{
        const  user=users.find(u =>u.userId === msgSenderId)

        console.log(msgReaderId);
        if(!user) return;
  
        console.log("message read");
          io.to(user.socketId).emit("getMsgReadInfo",
         { msgReaderId:msgReaderId,
           readInfo:true
             
  
          });
  
  
  
      });

    socket.on("typing",({senderId,receiverId,writerUsername,text})=>{

       
        const  user=users.find(u =>u.userId === receiverId)
        if(!user) return;

        console.log(senderId,receiverId,writerUsername,text.length);
  
     
            
            
            io.to(user.socketId).emit("gettyping",
            {senderId,
                message:`${writerUsername} is typing...`,
                text

                
    
            });
           
  
  
  
      });


    socket.on('forceDisconnect', ()=>{
        socket.disconnect();
    });


    socket.on("disconnect",()=>{
      
        removeUser(socket.id)
        
        io.emit("getUsers",users)
        console.log("user disconnected :"+ getCurrentTime())
        console.log(users)
        


    });



  });