const COLORS = {
  RED: 0xf25346,
  BROWN: 0x59332e,
  PINK: 0xF5986E,
  DARK_BROWN: 0x23190f,
  LIGHT_BLUE: 0xe5f2f2,
  BLUE: 0x68c3c0,
  LIGHT_GREEN: 0x99ff99,
  GREEN: 0x33ff33,
  GRAY: 0xF8F8F0,
  WHITE: 0xfffafa,
  LIGHT_YELLOW: 0xFFFCCB,
  YELLOW: 0xFFFA97,
  BLACK: 0x000100,
};

const EVENTS = {
  KEY_UP: 'keyup',
  KEY_DOWN: 'keydown',
  RESIZE: 'resize',
};

const KEYS_CODES = {
  KEY_W: 'KeyW',
  KEY_A: 'KeyA',
  KEY_S: 'KeyS',
  KEY_D: 'KeyD',
  ARROW_UP: 'ArrowUp',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_DOWN: 'ArrowDown',
  ARROW_RIGHT: 'ArrowRight',
  SPACE: 'Space',
};

// models
const HERO = {
  RADIUS: 1,
  SIDES: 10,
  TIERS: 10,
  FLAT_SHADING: true,
  COLOR: COLORS.YELLOW,
  X: 0,
  Y: 0,
  Z: -5,
};

const GLOBE = {
  RADIUS: 30,
  SIDES: 30,
  TIERS: 30,
  ROTATION_Z: -90,
  MAX_HEIGHT: 1,
  FLAT_SHADING: true,
  COLOR: COLORS.LIGHT_GREEN,
  X: 0,
  Y: -30,
  Z: -15,
};


// config
const CAMERA = {
  NEAR: 1,
  FAR: 1000,
  X: 0,
  Y: 2,
  Z: 5,
  FIELD_OF_VIEW: 100,
};

const RENDERER = {
  ALPHA: true,
  ANTIALIAS: true,
  SHADOW_MAP: true,
};

const FOG = {
  DENSITY: 0.03,
  COLOR: COLORS.GRAY,
};

const LIGHT = {
  FAR: CAMERA.FAR / 10,
  NEAR: CAMERA.NEAR,
  INTENSITY: 0.7,
  SKY_COLOR: COLORS.LIGHT_BLUE,
  GROUND_COLOR: COLORS.BLACK,
  SUN_LIGHT_COLOR: COLORS.LIGHT_YELLOW,
  SUN_DIRECTION_X: 0,
  SUN_DIRECTION_Y: 4,
  SUN_DIRECTION_Z: 1,
  SHADOW_RESOLUTION: 1024,
};

const ANIMATION = {
  GLOBE_SPEED: 0.005,
  HERO_SPEED: 0.005 * GLOBE.RADIUS / HERO.RADIUS / 5,
};

module.exports = {
  // values
  COLORS,
  EVENTS,
  KEYS_CODES,

  // models
  HERO,
  GLOBE,

  // config
  FOG,
  LIGHT,
  CAMERA,
  RENDERER,
  ANIMATION,
};
