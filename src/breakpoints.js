/**
 * @class BreakPoint - emit events every time a breakPoint changes;
 * @author Mohamad Jamil 
 * @email mohamad.webdev@gmail.com
 * 
 */

export default class BreakPoints {
    #defaultBps = null;
    #currentBreakPoints = null;
    #deviceBreakpoints = null;
    #breakPoints = null;
    constructor( default_bps )
    {
        this.#defaultBps = default_bps;
        this.#currentBreakPoints = [];
        this.#breakPoints = [];
        this.#deviceBreakpoints = [];
        this.#init();


    }

    #init()
    {
        // Create breakPoints
        this.#defaultBps.forEach(( _bp )=>{
            this.#addBreakPoint( _bp ); 
        });

        /**
         * Set ranges.
         * This will set ranges according to default breakpoints. 
         * The to ranges types are : {type}to{type} and {type}with{type}
         * If the default breakpoints has : mobile, large and wide as breakpoints. This will create following ranges :
         * mobiletolarge, mobiletowide, mobilewithlarge, mobilewithwide, largetowide and largewithwide
         */
        this.#addRangeBreakPoints();


        // Set currentBreakPoint
        this.#setCurrentBPs();

        window.addEventListener('resize',( pEv )=>{
            //BreakPoint changed
            let f = this.#breakPoints.filter(( _bp )=>{
                return window.innerWidth >= _bp.min && window.innerWidth <= _bp.max;
            });
            f.forEach(( _f )=>{
                if( !this.#currentBreakPoints.includes(_f.type) ) {
                    breakpointChangedTo( _f );
                }
            });

            this.#setCurrentBPs();
        });
    }

    #addBreakPoint( p_breakpoint )
    {
        if( p_breakpoint.min > p_breakpoint.max ) {
            error( `Min must be less than max!` );
            return;
        }
        let f = this.#breakPoints.find(( _bp )=>{
            return _bp.type === p_breakpoint.type;
        });

        if( !f ) {
            this.#breakPoints.push( p_breakpoint );
            this.#deviceBreakpoints[ p_breakpoint.type ] = [];
        }else{
            f.max = p_breakpoint.max;
            f.min = p_breakpoint.min;
        }
    }

    #addRangeBreakPoints()
    {
        this.#breakPoints.forEach(( _bp )=>{
            let bps = this.#breakPoints.filter(( _el )=> _el.type !== _bp.type && _el.min > _bp.min );
            bps.forEach(( _bps )=>{
                this.#breakPoints.push({
                    "type":`${_bp.type}to${_bps.type}`,
                    "min":_bp.min,
                    "max":_bps.min
                });
                this.#deviceBreakpoints[ `${_bp.type}to${_bps.type}` ] = [];

                this.#breakPoints.push({
                    "type":`${_bp.type}with${_bps.type}`,
                    "min":_bp.min,
                    "max":_bps.max
                });
                this.#deviceBreakpoints[ `${_bp.type}with${_bps.type}` ] = [];
            });
        });
    }
    #setCurrentBPs()
    {
        this.#currentBreakPoints =  this.#breakPoints.filter(( _bp )=>{
            return window.innerWidth >= _bp.min && window.innerWidth <= _bp.max;
        }).map((_el)=> _el.type );
    }

    is( p_breakPoint )
    {
        return this.#currentBreakPoints.includes(p_breakPoint);
    }


}

