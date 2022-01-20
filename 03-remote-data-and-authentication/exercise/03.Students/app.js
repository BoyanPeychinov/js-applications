showStudents();

const tbody = document.querySelector('#results tbody');
const form = document.getElementById('form');
form.addEventListener('submit', onSubmit)



async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const firstName = formData.get('firstName').trim();
    const lastName = formData.get('lastName').trim();
    const facultyNumber = formData.get('facultyNumber').trim();
    const grade = formData.get('grade').trim();

    const student = {
        firstName,
        lastName,
        facultyNumber,
        grade
    };

    const data = await createStudent(student);
    tbody.append(createTRow(data));    
    
    form.reset();

}

async function showStudents() {
    const students = await getStudents();
    students.forEach(s => tbody.appendChild(createTRow(s)));
}

function createTRow(student) {
    const trow = document.createElement('tr');
    trow.innerHTML = `<td>${student.firstName}</td>
<td>${student.lastName}</td>
<td>${student.facultyNumber}</td>
<td>${student.grade}</td>`;

    return trow;
}

async function getStudents() {
    const url = 'http://localhost:3030/jsonstore/collections/students';

    const res = await fetch(url);
    const students = await res.json();

    return Object.values(students);
}

async function createStudent(student) {
    const url = 'http://localhost:3030/jsonstore/collections/students';

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }

    const res = await fetch(url, options);
    const data = await res.json();

    return data;
}