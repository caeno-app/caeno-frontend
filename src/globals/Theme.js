let setp = ( attr, val ) => { document.documentElement.style.setProperty(attr, val) }

const Theme = ( dark ) => {
    switch(dark){
        case 0:
            setp('--accent', '#00ccff');
            setp('--text-color-primary', '#000000');
            setp('--text-color-secondary', '#333333');
            setp('--text-color-disabled', '#888888');
            setp('--bg-primary', '#ffffff');
            setp('--bg-secondary', '#ffffff');
            setp('--bg-secondary-border', '0px 0px 5px 2px #cccccc');
            break;
        case 1:
        default:
            setp('--accent', '#00ccff');
            setp('--text-color-primary', '#ffffff');
            setp('--text-color-secondary', '#cdcdcd'); 
            setp('--text-color-disabled', '#888888');
            setp('--bg-primary', '#151719');
            setp('--bg-secondary', '#252729');
            setp('--bg-secondary-border', '0px 0px 5px 5px #050709');
            break;
    }
}

export default Theme;