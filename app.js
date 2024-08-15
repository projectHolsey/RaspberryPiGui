const express = require('express');
var os = require('os');
const app = express()
const port = 3000;

app.use(express.static('./'));

app.get('/', function(req, res){
    try {
        console.log(__dirname + "/index.html");
        res.sendFile(__dirname + '/index.html');

    } catch (Error) {
        console.log(Error);
    }
});

app.get("/cpu", function(req, res) {

    const cpuUsage = process.cpuUsage();
    console.log(`Process CPU usage: User ${cpuUsage.user / 1000}ms, System ${cpuUsage.system / 1000}ms`);
    getCpuUsage();

    res.json({
        cpu: 1,
        name: 'John',
        gender: 'male'
    });
});

const getCpuUsage = () => {
    const cpus = os.cpus();

    cpus.forEach((cpu, i) => {
        let total = 0;

        for (type in cpu.times) {
            total += cpu.times[type];
        }

        console.log(`CPU ${i}:`);
        console.log(`  User: ${Math.round(100 * cpu.times.user / total)}%`);
        console.log(`  Nice: ${Math.round(100 * cpu.times.nice / total)}%`);
        console.log(`  Sys: ${Math.round(100 * cpu.times.sys / total)}%`);
        console.log(`  Idle: ${Math.round(100 * cpu.times.idle / total)}%`);
        console.log(`  IRQ: ${Math.round(100 * cpu.times.irq / total)}%`);
    });
};
    

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})