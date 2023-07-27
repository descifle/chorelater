const router = require("express").Router();
const fs = require("fs");

router.post("/add", (req, res) => {
    const chore = req.body.chore

    fs.readFile('./chores.json', (err, data) => {
        if(err?.message.includes("no such file or directory")) {
            fs.writeFile('./chores.json', JSON.stringify([chore]), (err, data) => {
                if(err) console.log(err.message)
            })

            return;
        }
        
        // check for dupes and add chore
        let chores = JSON.parse(data)
        let choreExists = chores.some(c => c.id === chore.id)

        if(choreExists) {
            return res.status(400).json({ chores })
        }

        const newChores = [...chores, chore]
        
        fs.writeFile('./chores.json', JSON.stringify(newChores), (err, data) => {
            if(err) {
                return res.json({ chores })
            }

            return res.json({ chores: newChores })
        })
    })
})

router.get("/all-chores", (req, res) => {
    fs.readFile('./chores.json', (err, data) => {
        if(err?.message.includes("no such file or directory")) {
            fs.writeFile('./chores.json', JSON.stringify([]), (err, data) => {
                if(err) console.log(err.message)
            })
        }

        let chores = JSON.parse(data)

        return res.json({ chores });
    })
})

router.delete("/delete-chore", (req, res) => {

    const choreId = req.query.id

    fs.readFile('./chores.json', (err, data) => {
        if(err?.message.includes("no such file or directory")) {
            fs.writeFile('./chores.json', JSON.stringify([]), (err, data) => {
                if(err) console.log(err.message)
            })

            return;
        }
        
        // check for dupes and add chore
        let chores = JSON.parse(data)

        const newChores = chores.filter(c => c.id !== choreId)
        
        fs.writeFile('./chores.json', JSON.stringify(newChores), (err, data) => {
            if(err) {
                return res.json({ chores })
            }

            return res.json({ chores: newChores })
        })
    })
})

module.exports = router;