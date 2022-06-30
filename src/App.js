import React, { useState } from 'react';
import './App.css';
import { Card,ListGroup,ListGroupItem } from 'react-bootstrap';

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')
  const date = new Date();
  const resetField = () => {
    setTodo("")
  }
  const addItem = (e, i) => {
    e.preventDefault();
    if (todo === "") {
      console.log("err")
      alert("Field empty!")
    } else {
      setTodos([...todos, { id: Date.now(), text: todo, status: false }]);
      resetField();
    }
  }
  const removeItem = (index) => {
    console.log(index);
    const ask = window.confirm('Do you really want to delete ?')
    if (ask) {
      setTodos(todos.filter(item => item.id !== index))
    }

  }
  return (
  
       <div className="app">
      <div className="mainHeading">
        <h1>Thushara's TODO List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>It's {date.toLocaleString('en-us', { weekday: 'long' })} 🌝 ☕ </h2>
      </div>
      <form onSubmit={addItem}>
        <div className="input">
          <input value={todo} onChange={(e) => { setTodo(e.target.value) }} type="text" placeholder=" 🖊️ Add item..." />
          <button type="submit" > <i className="fas fa-plus"></i></button>
        </div>
      </form>

      <div className="todos">
        <Card className='all_tasks'>
          <Card.Body>
            <Card.Title>All Tasks</Card.Title>
            <ListGroup>
              <ListGroupItem>
              {todos.map((item) => {
          return (<div className="todo">
            <div className="left">
              <input onChange={(e) => {
                console.log('status', e.target.checked)
                console.log('item', item)
                // filtering the datas which is ticked.Assuming they are active tasks.
                setTodos(todos.filter(item2 => {
                  if (item2.id === item.id) {
                    item2.status = e.target.checked
                  }
                  return item2
                }))
              }} value={item.status} type="checkbox" name="" id="" />
              <h5>{item.text}</h5>
            </div>
            <div className="right">
              <i onClick={() => {
                setTodos(todos.filter(item2 => {
                  if (item2.id === item.id) {
                    item2.text = prompt(item.text)
                  }
                  return item2
                }))
              }} className="fas fa-pencil"></i>
              <i onClick={() => removeItem(item.id)} className="fas fa-times"></i>

            </div>
          </div>
          )
        })}
              </ListGroupItem>
            </ListGroup>
           
          </Card.Body>
       </Card>
        
        {/* returning ticked objects */}
        

        <Card  className="active_card">
          <Card.Body>
            <Card.Title>Completed Tasks</Card.Title>
            {
              todos.map((item, index) => {
                if (item.status) {
                  return (<>
                    <Card.Text>
                    {index+1}.  {item.text}
                    </Card.Text>
                  </>)
                }
                return null
              })
            }

          </Card.Body>
        </Card>


      </div>
    </div>
    
   
  );
}

export default App;