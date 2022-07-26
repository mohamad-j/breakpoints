function generateLess( p_prefix , p_breakpoints)
{
    let lessString = `
/**
 * Usage - ( the css-class names here is dependent on the default breakpoints you will set up in config.js )
 * .{prefix}-{size}
 * OR  .{prefix}-{size}or{size}   
 * OR  .{prefix}-{fromSize}to{toSize}
 * OR  .{prefix}-{fromSize}with{withSize}
 * 
 * Example
 * .bps-large  --- On large screens
 * .bps-largeorwide  --- On large or wide screens
 * .bps-largetowide  --- On large and xlarge
 * .bps-largewidthwide  --- On large , xlarge and wide screen
 * 
*/
`;
    p_breakpoints.forEach(( _bp )=>{
        lessString += `
.${p_prefix}-${_bp.type} {
    display: none;
    @media screen and ( min-width: ${_bp.min}px ) and ( max-width: ${_bp.max}px ) {
        display: block;
    }
}`;
    });

    p_breakpoints.forEach(( _bp )=>{
        let bps = p_breakpoints.filter((_el)=>{ return _el.min > _bp.min });
        bps.forEach(( __bp )=>{
            lessString += `
.${p_prefix}-${_bp.type}to${__bp.type} {
    display: none;
    @media screen and ( min-width: ${_bp.min}px ) and ( max-width: ${__bp.min}px ) {
        display: block;
    }
}`;
lessString +=`
.${p_prefix}-${_bp.type}with${__bp.type} {
    display: none;
    @media screen and ( min-width: ${_bp.min}px ) and ( max-width: ${__bp.max}px ) {
        display: block;
    }
}`;
lessString +=`
.${p_prefix}-${_bp.type}or${__bp.type} {
    display: none;
    @media screen and ( min-width: ${_bp.min}px ) and ( max-width: ${_bp.max}px ), ( min-width: ${__bp.min}px ) and ( max-width: ${__bp.max}px ) {
        display: block;
    }
}`;
        });
    });

    return lessString;
}

module.exports = {
    generateLess
}