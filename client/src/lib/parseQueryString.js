export function queryStringParser (url) {
  url = url.substring(1, url.length);

  const splitList = url.split('&')
  
  let object = {}
  
  for (let index = 0; index < splitList.length; index++) {
    if (splitList[index] !== '') {
      const keyAndValue = splitList[index].split('=')
      if (typeof keyAndValue[0] === "string") {
        object[keyAndValue[0]] = keyAndValue[1]
      }
    }  
  }
  
  return object
  
  
}

