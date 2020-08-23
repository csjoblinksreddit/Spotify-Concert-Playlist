const checkIfRefreshTokenWorking = (refresh_token) => new Promise((resolve, reject) => {
  fetch('http://localhost:8888/refresh_token?refresh_token='+refresh_token)
  .then(response => {
    resolve(true)
  })
  .catch(err => {
    reject(false)
  })
})

export default checkIfRefreshTokenWorking;