var os = require('os');
console.log("Platform: " + os.platform());
console.log("Architecture: " + os.arch());
console.log("\n");

var cpus = os.cpus();

for(var i = 0, len = cpus.length; i < len; i++) {
    var cpu = cpus[i], total = 0;
    console.log("CPU %s:", i);
    console.log(cpu.model);
    
    for(var type in cpu.times) {
        total += cpu.times[type];
    }

    for(type in cpu.times) {
        console.log(type, Math.round(100 * cpu.times[type] / total));
    }
    
    console.log("\n");
}

console.log(os.homedir());


