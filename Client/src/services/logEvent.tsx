
export const LogEvent = async (eventMessage:string, eventMessageType:string) => {
    var r;
    let user= JSON.parse(sessionStorage.getItem("user"));
  let info = {
          message: "User "+user.username+" "+eventMessage,
          time: new Date(),
          messageType: eventMessageType,
        }
   let logFiles = JSON.parse(sessionStorage.getItem("log"));
   logFiles.push(info);
        console.log(logFiles);
        sessionStorage.setItem("log", JSON.stringify(logFiles));
 
};