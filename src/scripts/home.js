let primary_color = document.getElementById('primary-color');
let second_color = document.getElementById('second-color');
let code_result = document.getElementById('code-result');
let preview = document.querySelector('.preview');


let colors = {
    1: primary_color.value,
    2: second_color.value
}
let data_index = 2



preview.style.background = `linear-gradient(to right, ${primary_color.value}, ${second_color.value})`;




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

    let value = `linear-gradient(to right, ${result})`
    preview.style.background = value
    updateCodeResult(value)
}

function updateCodeResult(value){
    code_result.textContent = "Background: "+value
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

    document.querySelector('.colors').appendChild(input)
    addLayer(input.value, data_index);
    renderPreview()
    addEventInPicker(input)
})