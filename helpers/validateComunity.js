const comunityName = [
  {themeComunity:'memexicolindo', favicon: 'https://adbuzz.s3-us-west-2.amazonaws.com/multimedia/memexico.ico'},
  {themeComunity:'selfthinkers', favicon: 'https://adbuzz.s3-us-west-2.amazonaws.com/multimedia/selfthinker.ico'},
  {themeComunity:'mancavemx', favicon: 'https://adbuzz.s3-us-west-2.amazonaws.com/multimedia/ManCave.ico'},
  {themeComunity:'mujerdemexico', favicon: 'https://adbuzz.s3-us-west-2.amazonaws.com/multimedia/MdeM%C3%A9xico.ico'},
  {themeComunity:'elimaginero', favicon: 'http://www.elimaginero.com/wp-content/uploads/2016/03/cropped-copia-32x32.png'}
]

const validateComunity = (urlComunity) => {
  console.log()
  return new Promise((resolve, reject) => {
      comunityName.forEach((name, index) => {
        if(urlComunity.indexOf(name.themeComunity) !== -1) {
          resolve(name)
        } 
      })

      resolve(comunityName[0])
  }) 
}


export default validateComunity
