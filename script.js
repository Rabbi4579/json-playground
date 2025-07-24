const restoreBtn = document.getElementById('restoreBtn')

const restoredItem = [];

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
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const deleteItems = savedUsers.find(user => user.id === id)
    const filterData = savedUsers.filter(user => user.id !== id);
    restoredItem.push(deleteItems)    
    savedToLocalStorage(filterData)
    renderUi(filterData)
    // console.log(restoredItem)

}

restoreBtn.addEventListener('click', () =>{

    if(restoredItem.length > 0){
        const deleteItem = restoredItem.pop();
        const savedUsers2 = JSON.parse(localStorage.getItem('users')) || [];
        savedUsers2.unshift(deleteItem)
        savedToLocalStorage(savedUsers2)
        renderUi(savedUsers2)

    }
    

})




// Addeed new Users

const formData = document.getElementById('newUsers');

formData.addEventListener('submit', e => {
    e.preventDefault();
    
    const nameValue = e.target.name.value;
    const usernameValue= e.target.username.value;
    const emailValue= e.target.email.value;
    const idValue = e.target.id.value;
    
    e.target.name.value = '';
    e.target.username.value = '';
    e.target.email.value = '';
    e.target.id.value =  '';

    //create new user object
    const newUser = {
        name: nameValue,
        username: usernameValue,
        email: emailValue,
        id: idValue
    }
    
    //Save to localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users'))
    existingUsers.unshift(newUser)
    savedToLocalStorage(existingUsers)
    renderUi(existingUsers)


});
