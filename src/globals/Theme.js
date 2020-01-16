let setp = ( attr, val ) => { document.documentElement.style.setProperty(attr, val) }

const Theme = ( dark ) => {
    switch(dark){
        case 0:
            setp('--accent', '#00ccff');
            setp('--text-color-primary', '#000000');
            setp('--text-color-secondary', '#333333');
            setp('--text-color-disabled', '#888888');
            setp('--bg-primary', '#000000');
            setp('--bg-secondary', '#000000');
            setp('--bg-secondary-border', '0px 0px 0px 0px #000000');
            break;
        case 1:
        default:
            setp('--accent', '#00ccff');
            setp('--text-color-primary', '#ffffff');
            setp('--text-color-secondary', '#cdcdcd'); 
            setp('--text-color-disabled', '#888888');
            setp('--bg-primary', '#151719');
            setp('--bg-secondary', '#353739');
            setp('--bg-secondary-border', '0px 0px 0px 0px #000000');
            break;
    }
}

export default Theme;