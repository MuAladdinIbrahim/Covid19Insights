console.log("client js")
const countryForm = document.querySelector("#form");
countryForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let country = document.querySelector("#country").value
    console.log(country)
    fetch(`/?country=${country}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data)
                //first parameter is key of object
                //second parameter is value of key
                //iterate for each key:value in object
                clearData()
                for(let [dataTitle,dataValue] of Object.entries(data)){
                    showData(dataTitle,dataValue)
                }

            }
        })
    })
})
const showData = (dataTitle,dataValue)=>{
    //use DOM to create html elements
    let dataRow =  document.createElement('th');
    let dataHead = document.createElement('th');
    dataHead.setAttribute('class','th text-center text-uppercase font-weight-normal')
    document.querySelector('#htr').appendChild(dataHead)
    dataHead.innerHTML = dataTitle
    document.querySelector('#btr').appendChild(dataRow)
    dataRow.setAttribute('class','th text-center text-primary font-weight-normal')
    if(dataTitle=="deaths" || dataTitle=="new_cases"){
        dataRow.classList.add('table-danger')
    }
    dataRow.innerHTML = dataValue
}
const clearData = ()=>{
     if(document.querySelectorAll('.th')){ 
        let nodeList = document.querySelectorAll('.th'); 
        for(let i of nodeList){
            i.parentNode.removeChild(i)
        }
     }
}