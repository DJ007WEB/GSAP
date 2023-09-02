// gsap.to('#box', {
//     x : 900,
//     y: 300,
//     duration : 2,
//     delay : 1,
//     backgroundColor : 'black',
//     rotate : 360,
//     scale : 0.5,
// }) 
// gsap.from('#box', {
//     x : 900,
//     y: 300,
//     duration : 2,
//     delay : 1,
//     backgroundColor : 'black',
//     rotate : 360,
// }) 

/*        TIME LINE               */

    let tl = gsap.timeline();

    tl.to('h1', {
        x : 600,
        color : 'orange',
        duration : 2
    })
    tl.to('h2', {
        x : 600,
        color : 'blue',
        duration : 2,
    })
    tl.to('h3', {
        x : 600,
        color : 'green',
        duration : 2,
    })

// gsap.to('h1', {
//     x : 600,
//     color : 'orange',
//     duration : 2,
//     delay : 1,
// })
// gsap.to('h2', {
//     x : 600,
//     color : 'blue',
//     duration : 2,
//     delay : 3,
// })
// gsap.to('h3', {
//     x : 600,
//     color : 'green',
//     duration : 2,
//     delay : 5,
// })


/*     stagger AND yoyo AND repeat */


// gsap.to ('h1', {
//     x : 900,
//     duration : 2,
//     delay : 0.5,
//     color : 'red',
//     // stagger : 1,
//     repeat : 2,
//     yoyo : true,
// })