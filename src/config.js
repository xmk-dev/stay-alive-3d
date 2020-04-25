export const COLORS = {
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

export const EVENTS = {
  KEY_DOWN: 'keydown',
  RESIZE: 'resize',
};

export const KEYS_CODES = {
  ARROW_UP: 'ArrowUp',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_DOWN: 'ArrowDown',
  ARROW_RIGHT: 'ArrowRight',
  SPACE: 'Space',
};

export const LANES = {
  CENTER: 0,
  LEFT: -0.7,
  RIGHT: 0.7,
};

// models
export const GROUND = {
  X: 0,
  Y: -1.1,
  Z: 0,
  WIDTH: 100,
  HEIGHT: 1,
  DEPTH: 150,
  WIDTH_SEGMENTS: 50,
  HEIGHT_SEGMENTS: 1,
  DEPTH_SEGMENTS: 50,
  FLAT_SHADING: true,
  DISTORTION_VALUE: 0.13,
  COLOR: COLORS.LIGHT_GREEN,
  CAST_SHADOW: false,
  RECEIVE_SHADOW: true,
};

export const HERO = {
  SCALE: 0.07,
  X: 0,
  Y: -0.5,
  Z: 3.4,
  ROTATION_Y: 180 * Math.PI / 180,
};


// config
export const SCENE = {
  BACKGROUND: COLORS.BLUE,
};

export const CAMERA = {
  X: 0,
  Y: 0,
  Z: 0,
  NEAR: 1,
  FIELD_OF_VIEW: 60,
  FAR: 5000,
};

export const RENDERER = {
  ANTIALIAS: true,
  SHADOW_MAP: true,
};

export const CONTROLLER = {
  JUMP: false,
  SHOOT: false,
  GO_DOWN: false,
  COULD_JUMP: true,
  LANE: LANES.CENTER,
};

export const FOG = {
  DENSITY: 0.25,
  COLOR: COLORS.GRAY,
};

export const LIGHT = {
  SCENE_INTENSITY: 0.4,
  SUN_INTENSITY: 0.6,
  SKY_COLOR: COLORS.WHITE,
  GROUND_COLOR: COLORS.WHITE,
  SUN_LIGHT_COLOR: COLORS.WHITE,
  SUN_X: 20,
  SUN_Y: 20,
  SUN_Z: -20,
  SHADOW_RESOLUTION: 1024,
};

export const ANIMATION = {
  GRAVITY: 0.008,
  GLOBE_SPEED: 0.008,
  OBSTACLES_UPDATE_INTERVAL: 1,
  JUMP_VALUE: 0.3,
  BOUNCE_VALUE: 0.06,
  HERO_SPEED: 0.008,
};

export const SCORE = {
  LIFES: 3,
  VALUE: 3 * 2,
  INCREASE_VALUE: 0.01,
  DECREASE_VALUE: -1,
};

export const OBSTACLES = {
  COUNT: 30,
};
