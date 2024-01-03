export function addHeaderJWT() {
    try {
      const myHeaders = new Headers()
      myHeaders.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'))
      myHeaders.append('Content-Type','application/json')
      return myHeaders
    } catch (error) {
      return new Headers()
    }
  }