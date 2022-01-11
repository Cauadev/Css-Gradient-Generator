let primary_color = document.getElementById('primary-color');
let second_color = document.getElementById('second-color');
let code_result = document.getElementById('code-result');
let preview = document.querySelector('.preview');


let colors = {
    1: primary_color.value,
    2: second_color.value
}
let data_index = 2
let deg = '100deg'



preview.style.background = `linear-gradient(100deg, ${primary_color.value}, ${second_color.value})`;




function addLayer(color, index){
    colors[index] = color;
}


function renderPreview(){
    let result = ''
    Object.values(colors).forEach(color => {
        result += color + ","
    })
    let arr = result.split('')
    arr.splice((arr.length -1),1)
    result = arr.join('')

    let value = `linear-gradient(${deg}, ${result})`
    preview.style.background = value
    updateCodeResult(value)
}

function updateCodeResult(value){
    code_result.textContent = "Background: "+value
}

function removeEvent(element){
        element.addEventListener('click', () => {
            let index = element.getAttribute('data-index')
            delete(colors[index])
            document.querySelector(`div[data-index='${index}']`).remove()
            renderPreview()
        })
}

function addEventInPicker(element){
        element.addEventListener('input', () => {
            colors[element.getAttribute('data-index')] = element.value
            renderPreview()
        })
}

addEventInPicker(primary_color)
addEventInPicker(second_color)





document.querySelector('#clipboard').addEventListener('click', () => {
    var copyText = document.getElementById("code-result");
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    alert('Copiado.')
})



//CLICK ADD BUTTON


document.querySelector('#add-color').addEventListener('click', () => {
    data_index++;
    let input = document.createElement('input')
    input.type = "color"
    input.classList.add('color-picker')
    input.value = "#8d99ae"
    input.setAttribute('data-index', data_index)

    let color_field = document.createElement('div')
    color_field.classList.add('color-field')
    color_field.setAttribute('data-index', data_index)

    let remove_button = document.createElement('div')
    remove_button.classList.add('remove-color')
    remove_button.setAttribute('data-index', data_index)
    remove_button.textContent = "X"

    color_field.appendChild(remove_button)
    color_field.appendChild(input)

    document.querySelector('.colors').appendChild(color_field)
    removeEvent(remove_button)
    addLayer(input.value, data_index);
    renderPreview()
    addEventInPicker(input)
})


document.querySelector('#range-angle').addEventListener('input', (event) => {
    let angle = event.target.value
    let result = preview.style.background.split(',')
    let arr = result[0].split('(')
    result.splice(0,1)
    arr.splice(1, 1)
    arr.push(`${angle}deg`)
    result = arr.join('(')+","+ result.join(',')

    deg = `${angle}deg`
    document.querySelector('#angle-value').textContent = deg
    renderPreview()
})