let setp = ( attr, val ) => { document.documentElement.style.setProperty(attr, val) }

const getFromStorage = () => {
    let value = localStorage.getItem('theme');
    if(value === null || value.length === 0){
        return 0;
    }
    return parseInt(value);
}
const saveToStorage = (value) => {
    localStorage.setItem('theme', value);
}

export let current = getFromStorage;
const Theme = ( dark ) => {
    saveToStorage(dark);    
    switch(dark){
        case 0:
            setp('--accent', '#ccffaa');
            setp('--text-color-primary', '#000000');
            setp('--text-color-secondary', '#333333');
            setp('--text-color-disabled', '#888888');
            setp('--bg-primary', '#ffffff');
            setp('--bg-secondary', '#ffffff');
            setp('--bg-secondary-border', '0px 0px 5px 2px #cccccc');
            break;
        case 1:
        default:
            setp('--accent', '#77ff33aa');
            setp('--text-color-primary', '#ffffff');
            setp('--text-color-secondary', '#cdcdcd'); 
            setp('--text-color-disabled', '#888888');
            setp('--bg-primary', '#151719');
            setp('--bg-secondary', '#252729');
            setp('--bg-secondary-border', '1px 2px 5px #050709');
            break;
    }
}
export default Theme;
