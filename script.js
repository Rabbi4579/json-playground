
const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

if (savedUsers?.length) {
    renderUi(savedUsers)
} else {
    loadData()
}



async function loadData() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if(!res.ok) throw new Error('Failed to fetch users')
        const users = await res.json();

        const minimalUsers = users.map(user => {
            const { name, username, email, id } = user;
            return { name, username, email, id };
        })
        savedToLocalStorage(minimalUsers)
        renderUi(minimalUsers)

    }catch(error){

    }

}


function renderUi(users) {
    const container = document.getElementById('container');
    if(users.length === 0){
        container.innerHTML = `<p class="text-gray-500"> No users Found</p>`;
        return;
    }
    container.innerHTML = '';

    users.forEach(user => {

        const { name, email, username, id } = user;
        const innerDiv = document.createElement('div')
        innerDiv.classList.add(
            'p-4',
            'border',
            'm-3',
            'hover:bg-gray-50',
            'transition'
        )
        innerDiv.innerHTML = `
        <h2>Name: ${name}</h2>
        <h3>Username: ${username}</h3>
        <p>Email: ${email}</p>
        <p><small>Id: ${id}</small></p>
        `
        const deleteCard = document.createElement('button');
        deleteCard.innerText = 'Delete Card';
        deleteCard.classList.add(
            'border',
            'p-1',
            'bg-amber-500',
            'rounded-sm',
            'text-white'
        )
        innerDiv.appendChild(deleteCard)
        container.appendChild(innerDiv)

        deleteCard.addEventListener('click', () => {
            deleteItem(id)
        })

    });
}


function savedToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users))
}

function deleteItem(id) {
    const savedUsers = JSON.parse(localStorage.getItem('users'));
    const filterData = savedUsers.filter(user => user.id !== id);
    renderUi(filterData)
    savedToLocalStorage(filterData)

}



