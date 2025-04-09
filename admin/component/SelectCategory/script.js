
let Select = {}; 


Select.render = async function(selector, data){    
    let selectElement = document.querySelector(selector);

    for(let obj of data){
        let option = document.createElement('option');
        option.value = obj.category_name;
        option.textContent = obj.category_name;
        selectElement.appendChild(option);
    }
}

export {Select}
