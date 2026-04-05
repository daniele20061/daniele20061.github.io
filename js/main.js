import { initAccordion } from './accordion.js';
import { initPhysics } from './physics.js';
import { initButterfly } from './butterfly.js';
import { initTypewriter } from './typewriter.js';

document.addEventListener('DOMContentLoaded', () => {
  initAccordion();
  initPhysics();
  initButterfly();
  initTypewriter('typewriter');
});
