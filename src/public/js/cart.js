document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon')
    const cartModal = document.getElementById('cart-modal')
    const closeModal = document.querySelector('.close')
    const cartItems = document.getElementById('cart-items')
    const checkoutButton = document.getElementById('checkout-button')

    cartIcon.addEventListener('click', async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/carts/cart', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const cart = await response.json()
            cartItems.innerHTML = ''
            cart.products.forEach(product => {
                const item = document.createElement('div')
                item.classList.add('cart-item')
                item.innerHTML = `
                    <p>${product.title} - ${product.price} x ${product.quantity}</p>
                `
                cartItems.appendChild(item)
            })
            cartModal.style.display = 'block'
        } catch (error) {
            console.error('Error fetching cart:', error)
        }
    })

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none'
    })

    window.addEventListener('click', (e) => {
        if (e.target == cartModal) {
            cartModal.style.display = 'none'
        }
    })

    checkoutButton.addEventListener('click', async () => {
        const response = await fetch(`/api/carts/${user.cart[0]}/complete-purchase`, {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        alert(result.message)
        if (result.ticket) {
            cartModal.style.display = 'none'
        }
    })
})
