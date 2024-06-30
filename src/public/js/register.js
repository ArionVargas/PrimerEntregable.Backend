const form = document.getElementById('registerForm');

form.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(form)

    const obj = {}
    data.forEach((value, key) => obj[key] = value)
    
    fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 201) {
            window.location.replace('/login')
        } else {
            result.json().then(data => {
                console.error(data)
                alert(data.message)
            })
        }
    })
})