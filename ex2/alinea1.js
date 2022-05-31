var json = require('./nivel3.json')
var j = 0;

json.forEach(f => {
    if (f.codigo.match(/^750/)) {
        j++;
    }
})

console.log(j)