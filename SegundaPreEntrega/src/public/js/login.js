const form = document.getElementById('loginForm')

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    console.log(data)
    data.forEach((value, key) => obj[key] = value)
    fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            console.log('Respuesta recibida:', data)
            if (data.success) {
                window.location.replace('/api/products')
            } else {
                window.location.replace('/login')
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            window.location.replace('/login');
        })
})
