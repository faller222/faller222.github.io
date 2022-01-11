var when = 30000 - (new Date()).getTime() % 30000
setTimeout(setWorkingInterval, when)

function setWorkingInterval() {
    setInterval(logWorking, 1000 * 30)
}

function logWorking() {
    console.log(new Date(), 'Working')
}
