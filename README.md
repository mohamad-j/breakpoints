# BreakPoints
## The Javascript library that make building responsive app easier.

> This is a JS class that will emit events on every breakpoint.
> All breakpoints are can be modified.

# Install

Clone this repository on your PC. Then run :

npm i

Then run:

npm run build

Then add the script and the css to the HTML file :

```html
<script src="path/to/breakpoints.js"></script>
```

```html
<link rel="stylesheet" href="path/to/breakpoints.min.css" />
```

## Usage

> Inside the config.js file you can add or change the default breakpoints as well as the css_class_prefix.

**JavaScript**:
```javascript
breakpoints.wheIs('large', ()=>{
    // Do stuf when the screen is large
});

breakpoints.wheIs('largeorsmall', ()=>{
    // Do stuf when the screen is large or small
});

breakpoints.wheIs('largetowide', ()=>{
    // Do stuf when the screen is large or xlarge
});

breakpoints.wheIs('largewidthwide', ()=>{
    // Do stuf when the screen is large or xlarge or wide screen
});
```


**CSS**:
```css
.bps-large{
    /** On large screens */
}
.bps-largeorwide{
    /** On large or wide screens */
}
.bps-largetowide{
    /** On large and xlarge */
}
.bps-largewidthwide{
    /** On large , xlarge and wide screen */
}
```



