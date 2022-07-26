import BreakPoints from "./breakpoints";
import { breakpoints } from './config.js';


/**
 * Usage - ( the event names here is dependent on the default breakpoints you will set up in config.js )
 * 
 * breakPoints.whenIs( eventName : string , callBack: Function )
 * 
 * Example
 * breakPoints.wheIs( 'large',)_=>{
 *  //Do stuf when the screen is large
 * });
 * 
 */
if( !window.breakPoints ) window.breakPoints = new BreakPoints( breakpoints );