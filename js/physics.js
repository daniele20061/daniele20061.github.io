export function initPhysics() {
  const container = document.getElementById('physics-container');
  if (!container) return;

  const keywords = [
    'Resilienza', 'Focus', 'Performance', 'Consapevolezza',
    'Benessere', 'Prestazione', 'Risultati', 'Equilibrio',
    'Sport', 'Azienda', 'Mental Training'
  ];
  let initialized = false;

  const init = () => {
    if (initialized) return;
    initialized = true;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;
    const engine = Engine.create();
    engine.world.gravity.y = 0.5;

    const render = Render.create({
      element: container,
      engine,
      options: {
        width: container.offsetWidth,
        height: container.offsetHeight,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio
      }
    });

    const colors = ['#702ae1', '#b28cff', '#595689', '#f5f7f9'];
    const txtColors = ['#ffffff', '#2e006c', '#f5f1ff', '#702ae1'];

    const ground = Bodies.rectangle(
      container.offsetWidth / 2,
      container.offsetHeight + 30,
      container.offsetWidth + 500,
      60,
      { isStatic: true }
    );

    const leftWall = Bodies.rectangle(
      -30,
      container.offsetHeight / 2,
      60,
      container.offsetHeight * 2,
      { isStatic: true }
    );

    const rightWall = Bodies.rectangle(
      container.offsetWidth + 30,
      container.offsetHeight / 2,
      60,
      container.offsetHeight * 2,
      { isStatic: true }
    );

    const topWall = Bodies.rectangle(
      container.offsetWidth / 2,
      -1000,
      container.offsetWidth,
      60,
      { isStatic: true }
    );

    const capsules = keywords.map((text, i) => {
      const ci = i % colors.length;
      const ctx2 = document.createElement('canvas').getContext('2d');
      ctx2.font = 'bold 18px Manrope';
      const w = ctx2.measureText(text).width + 64;
      const h = 58;

      const body = Bodies.rectangle(
        Math.random() * (container.offsetWidth - 200) + 100,
        -Math.random() * 1000 - 100,
        w,
        h,
        {
          chamfer: { radius: h / 2 },
          render: {
            fillStyle: colors[ci],
            strokeStyle: ci === 3 ? '#702ae1' : 'transparent',
            lineWidth: 2
          },
          restitution: 0.7,
          friction: 0.1,
          frictionAir: 0.02,
          density: 0.001
        }
      );

      body.label = text;
      body.textColor = txtColors[ci];
      return body;
    });

    Composite.add(engine.world, [ground, leftWall, rightWall, topWall, ...capsules]);

    const mc = MouseConstraint.create(engine, {
      mouse: Mouse.create(render.canvas),
      constraint: { stiffness: 0.2, render: { visible: false } }
    });
    Composite.add(engine.world, mc);

    Events.on(render, 'afterRender', () => {
      const ctx2 = render.context;
      ctx2.font = '700 18px Manrope';
      ctx2.textAlign = 'center';
      ctx2.textBaseline = 'middle';

      capsules.forEach(b => {
        ctx2.save();
        ctx2.translate(b.position.x, b.position.y);
        ctx2.rotate(b.angle);
        ctx2.fillStyle = b.textColor;
        ctx2.fillText(b.label, 0, 0);
        ctx2.restore();
      });
    });

    Render.run(render);
    Runner.run(Runner.create(), engine);
  };

  new IntersectionObserver(
    e => {
      if (e[0].isIntersecting) init();
    },
    { threshold: 0.1 }
  ).observe(container);
}
