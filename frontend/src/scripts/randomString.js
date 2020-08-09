const createRandomString = (length) => {
    const max = 126;
    const min = 33;
    let randomString = [];
    for(let i = 0; i < length; i++) {
        let randomNumber = Math.random() * (max - min) + min;
        randomString.push(String.fromCharCode(randomNumber));
    }
    return randomString.toString();
}

export default createRandomString;