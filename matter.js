var Example = Example || {};

    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies,
        Events = Matter.Events;


    // create engine
    var engine = Engine.create({
        enableSleeping: true

    }),
        world = engine.world;
        engine.gravity.scale = .0005;
        

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            // showAngleIndicator: true,
            wireframes : false,
            background:'transparent',
            showSleeping:false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var size = 60;
    var w = 20;
    var rdmAmp = window.innerWidth/5;

    var stack = Composites.stack(0, -1000, 15,80,  window.innerWidth/25, 5, function(x, y) {
        var rdm = -rdmAmp/2+Math.random()*rdmAmp;
        var rdmA = Math.random()*Math.PI*2;
        var ampLr = 2;
        var partA = Bodies.rectangle(x + rdm, y, size * Math.random()*ampLr, size / w, {render : {fillStyle: 'black'}}),
            partD = Bodies.rectangle(x + rdm, y, size * Math.random()*ampLr, size / w, {render : {fillStyle: 'black'}}),
            partB = Bodies.rectangle(x + rdm, y, size / w, size * Math.random()*ampLr, { render: partA.render}),
            partC = Bodies.rectangle(x + rdm, y, size / w, size * Math.random()*ampLr, { render: partA.render});

            Body.rotate(partA,rdmA);
            Body.rotate(partB,rdmA);
            Body.rotate(partC,rdmA+Math.PI/4);
            Body.rotate(partD,rdmA+Math.PI/4);
        return Body.create({
            parts: [partA, partB, partC, partD],
            friction:1,
            mass:0,
            restitution:0,
            frictionAir:.05
                         
        });
    });


    Composite.add(world, [
        stack,
        // walls
        // Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        // Bodies.rectangle(800, 300, 50, 600, { isStatic: true, render:{visible:true} }),
        // Bodies.rectangle(Math.random()*800, 800, 50, 600, { isStatic: true, render:{visible:true} }),
        // Bodies.rectangle(0, 300, 50, 600, { isStatic: true, render:{visible:true} }),
        Bodies.rectangle(0, window.innerHeight , window.innerWidth*2, 5, { isStatic: true, render:{visible:false, fillStyle:'red'} }),
        Bodies.rectangle(0, 0 , 5, window.innerHeight*2, { isStatic: true, render:{visible:false, fillStyle:'red'} }),
        Bodies.rectangle(window.innerWidth, 0 , 5, window.innerHeight*2, { isStatic: true, render:{visible:false, fillStyle:'red'} })
    ]);

    for (var i = 0; i < stack.bodies.length; i++) {
        Events.on(stack.bodies[i], 'sleepStart', function(event) {
            var body = this;
            // console.log('body id', body.id, 'sleeping:', body.isSleeping);
        });
    }


    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 1,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;
    
    function displayWindowSize(){
        // World.clear(engine.world);
        // Engine.clear(engine);
        // World.clear(engine.world);
                console.log(window.innerWidth);    
                // render.canvas.remove();

    }

window.addEventListener("resize", displayWindowSize);
// displayWindowSize();
    // fit the render viewport to the scene
    // Render.lookAt(render, {
    //     min: { x: 0, y: 0 },
    //     max: { x: 800, y: 600 }
    // });

   


