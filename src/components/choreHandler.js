import axios from "axios"



export default class ChoreHandler {

    createChore(chore) {
        const chores = axios.post("/add", { chore }).then(result => {
            console.log(result)
            if(result.status === 200) {
                return result.data.chores
            }
        })
        .catch(err => {
            console.log(err)
            return []
        })

        return chores
    }

    async getChores() {
        const chores = await axios.get("/all-chores").then(result => {
            if(result.status === 200) {
                return result.data.chores
            }
        })
        .catch(err => {
            console.log(err)
            return []
        })

        return chores
    }

    updateChore(id, user, chore, day) {
        let currentChores = this.getChores();

        console.log(currentChores)
    }

    async deleteChore(id) {
        // Update this to delete chores by id rather than array index
        const chores = await axios.delete("/delete-chore", { params: { id } }).then(result => {
            if(result.status === 200) {
                return result.data.chores
            }
        })
        .catch(err => {
            console.log(err)
            return []
        })

        return chores;
    }
}