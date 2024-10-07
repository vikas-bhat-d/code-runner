const express = require('express');
const cors = require('cors')
const { exec } = require('child_process');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}))

app.get("/",(req,res)=>{
    res.send("testing..")
})

app.post('/run', (req, res) => {
    // console.log("request recieved")
    const { language, code, testCases } = req.body;
    console.log(language,code);
    const fileName = `temp.${language}`;
    fs.writeFileSync(fileName, code);

    let command;
    switch (language) {
        case 'c':
            command = `gcc ${fileName} -o temp && temp`;
            break;
        case 'py':
            command = `python ${fileName}`;
            break;
    }

    const process = exec(command, (error, stdout, stderr) => {
        console.log(stderr);
        console.log(stdout);
        // console.log(process.stdin);
        if (stderr) {
            res.status(500).send(stderr);
        } else {
            res.send(stdout);
        }
    });

    // Write stdin values to the process
    process.stdin.write(testCases);
    process.stdin.end();
});


app.listen(3000,'0.0.0.0', () => console.log('Server running on port 3000'));
