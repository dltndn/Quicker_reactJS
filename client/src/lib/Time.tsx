export default {
  parseTimeStamp: (date: string, AMPM: string, hour: number, minute: number) => {
    let yearmonthdate = date.split("-")
    let getYear = parseInt(yearmonthdate[0])
    let getMonth = parseInt(yearmonthdate[1])
    let getDate = parseInt(yearmonthdate[2])

    if (AMPM == "오전") {
      return new Date(getYear, getMonth - 1, getDate, hour, minute, 0).getTime() / 1000;
    } else {
      return new Date(getYear, getMonth - 1, getDate, hour + 12, minute, 0).getTime() / 1000;
    }
  },

  getDiff : (date : string) => {
    const now = new Date()
    const recentMessageDate = new Date(date)
    
    if (now.getFullYear() !== recentMessageDate.getFullYear()) {
      return (recentMessageDate.getFullYear() + "." + recentMessageDate.getMonth() + "." +recentMessageDate.getDate())
    } else if (now.getMonth() !== recentMessageDate.getMonth()) {
      return (recentMessageDate.getMonth() + "월" + recentMessageDate.getDate() + "일");
    } else if (now.getDate() === recentMessageDate.getDate()) {
      if (now.getHours() !== recentMessageDate.getHours()) {
        return (now.getHours() - recentMessageDate.getHours() + "시간 전")
      } else if (now.getMinutes() !== recentMessageDate.getMinutes()) {
        return (now.getMinutes() - recentMessageDate.getMinutes() + "분 전")
      } else {
        return ("방금")
      }
    } else {
      return (recentMessageDate.getMonth() + "월" + recentMessageDate.getDate() + "일");
    }
  }
}