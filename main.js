var previewButton = document.getElementById('preview-button');
var generateButton = document.getElementById('generate-button');
const N = 9;

previewButton.addEventListener('click',preview)

generateButton.addEventListener('click', generate);

function getData(){return document.getElementById('text-input').value.split("\n");}

function preview(){
    let data = getData();
    let previewDiv = document.querySelector('.card-text');
    previewDiv.textContent = data[0];
}
function generate(){
    let data = getData();
    let pageBox = document.createElement('div');
    pageBox.classList.add('page-box');
    let background = document.createElement('div');
    background.classList.add('background');
    background.classList.add('page-box');
    let printContainer = document.createElement('div');
    printContainer.classList.add('print-container');
    let i = 0;
    data.forEach((str)=>{
        i += 1;
        i %= 9;
        str = str.trim();
        card = document.getElementById('preview').cloneNode(true);
        card.classList.add('card');
        card.querySelector('.card-text').textContent = str;
        pageBox.appendChild(card);
        if(i==0){
            printContainer.appendChild(pageBox.cloneNode(true));
            printContainer.appendChild(background.cloneNode(true));
            pageBox.innerHTML = '';
        }
    });
    if(i>0){
        printContainer.appendChild(pageBox.cloneNode(true));
        printContainer.appendChild(background.cloneNode(true));
    }
    printWindow = window.open()
    printWindow.document.head.innerHTML = window.document.head.innerHTML;
    printWindow.document.body.appendChild(printContainer);
    printWindow.print();
}