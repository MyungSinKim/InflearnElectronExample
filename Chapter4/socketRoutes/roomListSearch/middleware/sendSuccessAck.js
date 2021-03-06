/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (socket,message,ack,user)=>{
  user.rooms.forEach((room)=>{
    socket.join(room._id);
  });
  message.result = user.rooms;
  message.isSuccess = true;
  message.Error = undefined;
  ack(message);
  return Promise.resolve();

};