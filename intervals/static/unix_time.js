function unix_time() {
    let unix = Math.floor(Date.now() / 1000)
    document.getElementById('unix_time').innerHTML = unix
    let t = setTimeout(function(){unix_time()}, 1000)
}