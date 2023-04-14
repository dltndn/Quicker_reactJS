export default {
    parseTimeStamp : (date : string, AMPM : string, hour : number, minute: number) =>{
        let yearmonthdate = date.split("-")
        let getYear = parseInt(yearmonthdate[0])
        let getMonth = parseInt(yearmonthdate[1])
        let getDate = parseInt(yearmonthdate[2])
    
        if (AMPM == "오전") {
          return new Date(getYear, getMonth - 1, getDate,hour,minute,0).getTime() / 1000;
        } else {
          return new Date(getYear, getMonth - 1, getDate,hour + 12,minute,0).getTime() / 1000;
        }
      }
}