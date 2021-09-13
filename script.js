const input = document.getElementById('date');
const btn = document.getElementById('btn');
const msg = document.getElementById('msg');
let p=false
let nextNoOfDays= 0
let prevNoOfDays= 0
let next_date=undefined
let prev_date=undefined

function checkPalindrome(date,revdate){
    if(date===revdate){
        // console.log("palindrome")
        return p=true
    } else{
        
        return p=false
    }
}

function reverseDate(date){ 
    const reverseStringBday= date.split('').reverse().join('')
    return reverseStringBday
}

function dateToString(date){
    const strDate={day:'',month:'',year:''}
    if (date.day < 10) {
        strDate.day = "0" + date.day;
      } else {
        strDate.day = date.day.toString();
      }
    
      if (date.month < 10) {
        strDate.month = "0" + date.month;
      } else {
        strDate.month = date.month.toString();
      }
    
      strDate.year = date.year.toString();

      return `${strDate.day}${strDate.month}${strDate.year}`;

}

function isLeapYear(year){
    if(year%4==0){
        return true
    } else {
        return false
    }
}

function nextPalindromeDate(date){
   const nextDate={day:date.day+1,month:date.month,year:date.year}
   var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

   if (nextDate.month === 2) {
     if (isLeapYear(nextDate.year)) {
       if (day > 29) {
        nextDate.day = 1;
        nextDate.month = 3;
       }
     } else {
       if (nextDate.day > 28) {
        nextDate.day = 1;
        nextDate.month = 3;
       }
     }
   } else {
     if (nextDate.day > daysInMonth[nextDate.month - 1]) {
        nextDate.day = 1;
        nextDate.month++;
     }
   }
 
   if (nextDate.month > 12) {
    nextDate.month = 1;
    nextDate.year++;
   }
   nextNoOfDays++
  //  console.log(nextDate)
   const newNextDate=dateToString(nextDate)
   reverseDate(newNextDate)
  //  console.log(reverseDate(newNextDate))
   checkPalindrome(newNextDate,reverseDate(newNextDate))
   if(p){
    // console.log(nextDate)
    next_date=nextDate
    
   } else {
     nextPalindromeDate(nextDate) 
   }
   
}


function prevPalindromeDate(date){
  const prevDate={day:date.day-1,month:date.month,year:date.year}
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (prevDate.day === 0) {
    prevDate.month--;

    if (prevDate.month === 0) {
      prevDate.month = 12;
      prevDate.day = 31;
      prevDate.year--;
    } else if (prevDate.month === 2) {
      if (isLeapYear(prevDate.year)) {
        prevDate.day = 29;
      } else {
        prevDate.day = 28;
      }
    } else {
      prevDate.day = daysInMonth[prevDate.month - 1];
    }
  }
  prevNoOfDays++
  // console.log(prevDate)
  const newPrevDate=dateToString(prevDate)
  reverseDate(newPrevDate)
  // console.log(reverseDate(newPrevDate))
  checkPalindrome(newPrevDate,reverseDate(newPrevDate))
  if(!p){
    prevPalindromeDate(prevDate)
  } else {
    // console.log('palindrome -----')
    // console.log(prevDate)
    // console.log(`prev=${prevNoOfDays}`)
    prev_date=prevDate
  }
 
}



btn.addEventListener('click',()=>{
   if(input.value){
    let bdayDate=input.value.split('-');
    //console.log(bdayDate)


    let year = Number(bdayDate[0])
    let month = Number(bdayDate[1])  
    let day = Number(bdayDate[2]) 

    var date = {
        day: Number(day),
        month: Number(month),
        year: Number(year),
      };

    //console.log(date)
    const stringBday=bdayDate.reverse().join('')
    // console.log(stringBday)
    reverseDate(stringBday)
    // console.log(reverseDate(stringBday))
    checkPalindrome(stringBday,reverseDate(stringBday));
    if(!p){
    nextPalindromeDate(date)
    prevPalindromeDate(date)
    
    if(prevNoOfDays < nextNoOfDays){
      msg.innerText=`the closest palindrome date is ${next_date.day}-${next_date.month}-${next_date.year}, you are ${nextNoOfDays} days behind `
      msg.style.color='#bb2124'
    } else{
      msg.innerText=`the closest palindrome date was ${prev_date.day}-${prev_date.month}-${prev_date.year}, you missed it by ${nextNoOfDays} days`
      msg.style.color='#bb2124'
    }

    } else{
      msg.innerText=`Yay, your birthdate is palindrome`
      msg.style.color='green'
    }
   } else{
    msg.innerText=`Enter valid date`
    msg.style.color='#f0ad4e'
   }
})


