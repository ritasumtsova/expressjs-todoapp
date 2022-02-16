async function getTasks() {
  const response = await fetch("http://localhost:3000/api/tasks")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const tasks = data;
      let rows = document.querySelector("tbody"); 
      tasks.forEach(task => {
          rows.append(row(task));
      });
  })
  .catch(err => console.error(err));

  return response;
}
getTasks();

async function addTask(task) {
  console.log(task);

  let data = {
    description: task
  };
  console.log(data);

  const response = await fetch('http://localhost:3000/api/tasks', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    // mode: 'same-origin',
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    reset();
    document.querySelector("tbody").append(row(data));
  })
  .catch(err => console.error(err));

  return response;
}

async function clearTasks() {
  const response = await fetch('http://localhost:3000/api/tasks', {
      method: "DELETE",
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    alert(data.message);
    document.getElementById('table-body').innerHTML = '';

  })
  .catch(err => console.error(err));

  return response;
}

function reset() {
  const form = document.forms["tasksForm"];
  form.reset();
}

function row(task) {

  const tr = document.createElement("tr");
  tr.setAttribute('data-id', task.id);

  const idTd = document.createElement("td");
  idTd.append(task.id);
  tr.append(idTd);

  const descriptionTd = document.createElement("td");
  descriptionTd.append(task.description);
  tr.append(descriptionTd);
  descriptionTd.setAttribute('data-task', task.description);
    
  const linksTd = document.createElement("td");
  tr.appendChild(linksTd);

  return tr;
}

document.getElementById("reset").addEventListener('click', e => {
  e.preventDefault();
  reset();
  clearTasks();
})

document.forms["tasksForm"].addEventListener("submit", e => {
  e.preventDefault();
  const form = document.forms["tasksForm"];
  const task = form.elements["task"].value;

  addTask(task);
});