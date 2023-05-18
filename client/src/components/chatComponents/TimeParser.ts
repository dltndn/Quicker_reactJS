const TimeParser = (date : string) =>{
    let hour = new Date(date).getHours()
    let min = new Date(date).getMinutes()
    const MIN = min.toString().padStart(2, '0');

    if (hour > 12) {
        hour = hour - 12
        return "오후" + hour + ":" + MIN
    } else {
        return "오전" + hour + ":" + MIN
    }
}

export default TimeParser;