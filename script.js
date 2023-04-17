const expirationSelect = document.querySelector('[data-expiration-year]')

const currentYear = new Date().getFullYear()
for(let i = currentYear; i < currentYear + 10; i++) {
    const option = document.createElement('option')
    option.value = i
    option.innerText = i
    expirationSelect.append(option)
}

document.addEventListener('keydown', e => {
    const input = e.target
    const key = e.key
    if(!isConnetedInput(input)) return

    switch (key) {
        case "ArrowLeft": {
            if (input.selectionStart === 0 && input.selectionEnd === 0) {
                const prev = input.previousElementSibling
                prev.focus()
                prev.selectionStart = prev.value.length - 1
                prev.selectionEnd = prev.value.length - 1
                e.preventDefault()
            }
            break
        }
        case "ArrowRight": {
            if (input.selectionStart === input.value.length && input.selectionEnd === input.value.length) {
                const next = input.nextElementSibling
                next.focus()
                next.selectionStart = 1
                next.selectionEnd = 1
                e.preventDefault()
            }
            break
        }
        default: {
            if (e.ctrlKey || e.altKey) return
            if (key.match(/^[^0-9]$/)) return e.preventDefault()

            e.preventDefault()
            onInputChange(input, key)
        }
    }
})

function onInputChange (input, newValue) {
    const start = input.selectionStart
    const end = input.selectionEnd
    updateInputValue(input, newValue, start, end)
    focusInput()
}


function updateInputValue (input, extraValue, start = 0, end = 0) {
    const newValue = `${input.value.substring(0, start)}${extraValue}${input.value.substring(end, 4)}`
    input.value = newValue.substring(0, 4)
    if(newValue > 4) {
        const next = input.nextElementSibling
        if (next == null) return
        updateInputValue(next, newValue.substring(4))
    }
}

function isConnetedInput(input) {
    const parent = input.closest('[data-connected-inputs]')
    return input.matches('input') && parent != null
}