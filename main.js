var previewButton = document.getElementById('preview-button');
var generateButton = document.getElementById('generate-button');
const N = 9;

previewButton.addEventListener('click',()=>getData(preview))

generateButton.addEventListener('click', ()=>getData(generate));

function getData(callback){
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        console.log('The File APIs are not fully supported in this browser.');
        return;
      }
      let formFile = document.getElementById('file-input');
      if (!formFile.files) {
        console.log("This browser doesn't seem to support the `files` property of file inputs.");
      } else if (!formFile.files[0]) {
        let lines = document.getElementById('text-input').value.split("\n");
        callback(lines);
      } else {
        let file = formFile.files[0];
        let fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
        function receivedText() {
            let data = fr.result;
            let lines = data.split('\n');
            callback(lines);
        }
      }
}

function preview(data){
    let previewDiv = document.querySelector('.inner-text');
    previewDiv.textContent = data[0];
    resize2fit(document.querySelector('.card-text'));
}
function generate(data){
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
        card.querySelector('.inner-text').textContent = str;
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
    printWindow.setTimeout(()=>{
        for(el of printWindow.document.querySelectorAll('.card-text')){
            console.log(el);
            resize2fit(el);
        }
    },100);
    printWindow.setTimeout(printWindow.print,300);
}
// function fitText()
function resize2fit(el) {
    if (!el.parentElement) return;
    el.style.setProperty("font-size", "1em");
    const {width: max_width, height: max_height} = el.getBoundingClientRect();
    const {width, height} = el.children[0].getBoundingClientRect();
    el.style.setProperty("font-size", Math.min(max_width/width, max_height/height)+"em");
  }