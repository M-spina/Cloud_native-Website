window.onload=function(){
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("eventDate")[0].setAttribute('min',today);
}



const form = document.getElementById('form');
const eventname = document.getElementById('eventName');
const eventlocation = document.getElementById('eventLocation');
const eventdate = document.getElementById('eventDate');
const eventdescription = document.getElementById('eventDescription')

const inputfile = document.querySelector('input[type="file"]');


form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

const setError= (element,message) =>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error')
}



const validateInputs = () =>{
    const eventName = eventname.value.trim();
    const eventLocation= eventlocation.value.trim();
    const eventDescription = eventdescription.value.trim();
    const eventDate = eventdate.value;
    const filenumber = inputfile.files[0]
    const filePath = inputfile.value;
    
    
    

    if(eventName === ''){
        setError(eventname, 'name is required')
    }else{
        setSuccess(eventname);
    }

    if(eventLocation === ''){
        setError(eventlocation, 'location is required')
    }else{
        setSuccess(eventlocation);
    }

    if(eventDescription === ''){
        setError(eventdescription, 'event description is required')
    }else{
        setSuccess(eventdescription);
    }

    if(eventDate === ''){
        setError(eventdate,'date is required')
    }else{
        setSuccess(eventdate);
    }



    if(!filenumber){
        setError(inputfile,'file is required')
    }
    const Limit = 20000;
    const size = filenumber.size/1024
    var allowedExtentions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if(!allowedExtentions.exec(filePath)){
        setError(inputfile, 'use correct extions')
    }else if (size > Limit){
        setError(inputfile, 'file too big:')
    }else{
        setSuccess(inputfile)
    }

    

    

    
}