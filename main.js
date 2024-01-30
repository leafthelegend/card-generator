var previewButton = document.getElementById('preview-button');
var generateButton = document.getElementById('generate-button');

previewButton.addEventListener('click',preview)

generateButton.addEventListener('click', generate);

function getData(){return document.getElementById('text-input').value.split("\n");}

function preview(){
    let data = getData();
    let previewDiv = document.getElementById('card-text');
    previewDiv.textContent = data[0];
}
function generate(){
    let data = getData();
    let pageBox = document.createElement('div');
    pageBox.classList.add('page-box');
    data.forEach((str)=>{
        str = str.trim();
        card = document.getElementById('preview').cloneNode(true);
        card.querySelector('.card-text').textContent = str;
        pageBox.appendChild(card);
    })
    printWindow = window.open()
    printWindow.document.head.innerHTML = window.document.head.innerHTML;
    let printContainer = document.createElement('div');
    printContainer.classList.add('print-container');
    printContainer.appendChild(pageBox);
    printWindow.document.body.appendChild(printContainer);
}