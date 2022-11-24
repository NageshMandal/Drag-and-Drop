class Model {
    constructor () {
    this.newName = "";
    this.name = this.newName;
    }
    }
    
    class Controller {
     constructor(model) {
     this.model = model;
     }
     get modelName() {
     this.model.name = this.model.newName;
     return this.model.name;
     }
     handleEvent(e) {
     e.stopPropagation();
     this.changeNameHandler();
     }
     
     changeNameHandler() {
        this.model.newName = this.view.newName.value;
        this.view.name.innerHTML=this.modelName;
      }
    }
    
    class View {
      constructor(controller) {
      this.controller = controller;
      this.name = document.getElementById('name');
      this.name.innerText = controller.modelName;
      this.newName = document.getElementById('newName');
      this.changeBtn = document.getElementById('changeNameButton');
      this.changeBtn.addEventListener('click', controller);
      controller.view = this;
      }
    }
    
    function main () {
    const model = new Model();
    const controller = new Controller(model);
    const view = new View(controller);
    }
    
    main();


    
    let form = document.querySelector("form");
    let ls = localStorage.getItem('todo');
    let todo = ls ? JSON.parse(ls) : [];
    
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let inpData = form[0].value;

        todo.push(inpData)
        localStorage.setItem('todo', JSON.stringify(todo));
    
        location.reload();
    })
    
    
    todo.map((data, index) => {
        document.querySelector("tbody").innerHTML += `
        <div class="container">
            <p class="draggable" draggable="true" >${data}</p>
            <p class="del" onclick="del(${index})">Delete</p>
        </div>
        `;
        
    })
    function del(e) {
        let deleted = todo.filter((data, index) => {
            return index !==e;
        })
        localStorage.setItem('todo',JSON.stringify(deleted))
        location.reload();
    }

    const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}