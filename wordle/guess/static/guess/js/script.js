const inputEl = document.getElementById('input');
const copyEl = document.getElementById('copy');
const alertText = document.querySelector('.alert-container');

const kyr = "абвгдежзийклмнопрстуфхцчшщъыьэюяөүң"; //35
const eng = "abcdefghijklmnopqrstuvwxyz&*(^$S@!)";//35


function decode(slovo){
    let link = "";
    
    // first 5 random number
    for(let i = 0; i<5; i++){
        link += `${Math.floor(Math.random()*10)}`;
    }
    
    //sign
    link += "$"; 

    // adding random char and actual idx of letter in kyr that is in slovo
    for(let i = 0; i<slovo.length; i++){

        let add = eng[(Math.floor(Math.random() * 100)) % 35];
        if((Math.floor(Math.random()*10)) % 2 == 0){
            add.toUpperCase();
        }

        //find index in kyr
        let idx;
        for(let j = 0; j<35; j++){
            if(slovo[i] === kyr[j]){
                idx = j;
                break;
            }
        }

        link += idx + add;

    }

    return link;
}

copyEl.onclick =  function() {
    if(inputEl.value){
        let slovo = inputEl.value.toLowerCase();
        if(slovo.length<=10){
            let flag = false;
            for(let i = 0; i<slovo.length; i++){

                flag = false; kyr_flag = false;
                for(let j = 0; j<35; j++){

                    if(slovo[i] == kyr[j]){
                        flag = true;
                        break;
                    }
                    else if(slovo[i]=="Ё" || slovo[i] == "ё"){
                        alert("'ё' менен 'Ё'ни, 'е' менен 'Е'ге алмаштыр");
                        kyr_flag = true;
                        break;
                    }

                }
                
                if(!flag){
                    if(!kyr_flag)
                        alert("Кыргыз кирилица тамгалары гана");
                    break;
                }
                    
            }
            if(flag){
                let generated_link = decode(slovo);
                //https://janbol.pythonanywhere.com/
                let link = "http://127.0.0.1:8000/home/" + generated_link;
                navigator.clipboard.writeText(link);

                alertText.classList.remove('bactive');

                setTimeout(()=>{
                    alertText.classList.add('bactive');
                }, 2000);
            }
               
        }
        else
            alert("Эң узун сөз 10 тамгадан тура алат");
    }
    else{
        alert("Сөздү жаз");
    }
};