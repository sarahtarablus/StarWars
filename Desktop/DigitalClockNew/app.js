window.onload = () => { 
newDate();
setInterval(newTime, 1000);
};

let isMilitary;

function newDate(){
  const date = new Date();
  const currentDate = document.getElementById('date')
  
  const month = date.toLocaleString('default', { month: 'long'});
  const weekDay = date.toLocaleString('default', { weekDay: 'long'});
  const day = date.getDate();
  
  currentDate.innerHTML = `${month} - ${weekDay} ${day} ${dateSuffix(day).sup()}`;
  dateSuffix(date);
}

function dateSuffix(date){
  if( date % 10 === 1 && date !== 11 ){
    return 'st'
  }else if(date % 10 === 2 && date !== 12){
    return 'nd'
  }else if(date % 10 === 3 && date !== 13){
    return 'rd'
  }else{
    return 'th'
  }
}
  
function newTime(){
    let date = new Date();
    const time = document.getElementById('time');
    let hours = date.getHours();
    let hourAmPm = hours >= 12 ? 'pm' : 'am';
    let hour = date.getHours() % 12;
     if(hour == '0'){
      hour = '12';
     }
    let min = date.getMinutes();
    let sec = date.getSeconds();
 
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    
   if(isMilitary) {
    const button = document.getElementById('btn-1');
    button.style.outlineColor = ' rgb(230, 100, 200)';
    button.innerHTML = '24h';
    document.querySelector('.box-3').style.marginLeft = '690px';
    document.getElementById('btn-1').style.marginLeft = '20px';
    document.getElementById('time').innerHTML = `${hour} : ${min} : ${sec} ${hourAmPm}`;
   } else {
    const button = document.getElementById('btn-1');
    button.style.outlineColor = ' rgb(230, 100, 200)';
    button.innerHTML = 'AM/PM';
    document.querySelector('.box-3').style.marginLeft = '600px';
    time.innerHTML = `${hours} : ${min} : ${sec}`;
   }  
}

const button = document.getElementById('btn-1');
button.addEventListener('click', () => (isMilitary = !isMilitary));


  

   



   

   
   

   

     
  

  

    





  
   
   
  

 
  

 
 




 



 



  
