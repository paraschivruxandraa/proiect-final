import axios from 'axios'


const SERVER = 'http://proiect-final-paraschivruxandra.c9users.io:8081'

//clasa care ma ajuta sa maschez operatiile cu serverul
class FeedbackStore{
    
    constructor(ee){
        this.emitter = ee
        this.content = []
    }
    getAll(){
        axios(SERVER + '/feedback')
        .then((response) => {
                 this.content = response.data
                 this.emitter.emit('FEEDBACK_INCARCARE')
            })
            .catch((error) => console.warn(error))
    }
            

    getOne(id){}
    addOne(feedback){
        axios({
            method : 'post',
            url : SERVER + '/feedback',
            headers : {'Content-Type' : 'application/json'},
            data : feedback
            })
            .then(() => this.getAll())
            .catch((error) => console.warn(error))
    }
    feedbackOne(id, feedback){}
    deleteOne(id){}
    
    
    
}

export default FeedbackStore