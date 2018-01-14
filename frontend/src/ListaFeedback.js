import React, { Component } from 'react'
import {EventEmitter} from 'fbemitter'
import FeedbackStore from './stores/FeedbackStore'

const emitter = new EventEmitter()
const store = new FeedbackStore(emitter)

const addFeedback = (feedback) => {
    store.addOne(feedback)
    console.log(feedback);
}

class ListaFeedback extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            feedbacks : [],
            feedbacksDescriere: '                '
          
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    
    componentDidMount(){
        store.getAll()
        emitter.addListener('FEEDBACK_INCARCARE' , () => {
            this.setState({
                feedbacks: store.content
            })
        })
    }
    
     handleInputChange(e){
        e.preventDefault()
        let value = e.target.value
        let name = e.target.name
        this.setState({
            [name] : value
        })
    }
    
     render() {
        return (
            <div>
        
             <ul>
              <li type="text">Feedback : </li>
               {this.state.feedbacks.map((e) =>
                <li>{e.descriere}</li>
               )}
                </ul>
           
           
            <form>
               <label htmlFor="nume">Feedback </label>
                <input type="text" onChange={this.handleInputChange} name= "feedbacksDescriere" />
               
               <input type="button" value="Add" onClick={ 
                        () => addFeedback({
                        descriere : this.state.feedbacksDescriere
                        })}/>
               
            </form>
              
            </div>
     )}

    
}

export default ListaFeedback