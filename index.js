const app = require("./server")

app.listen(process.env.port, () => {
    console.log(chalk.red.bgYellowBright('Listening on Port 3000!' + Date().slice(15, 25)));
})