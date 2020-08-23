export const checkIfRefreshTokenWorking = (refresh_token) => new Promise((resolve, reject) => {
  fetch('http://localhost:8888/refresh_token?refresh_token='+refresh_token)
  .then(response => {
    resolve(true)
  })
  .catch(err => {
    reject(false)
  })
})

export const checkIfTokenActive = (decryptedToken, spotifyInstance) => new Promise((resolve, reject) => {
  let trueOrFalse;
  spotifyInstance.setAccessToken(decryptedToken);
  spotifyInstance.getUserPlaylists().then(
    (data) => {
        resolve(true);
    },
    (err) => {
      reject(false);
    }
  )
})
