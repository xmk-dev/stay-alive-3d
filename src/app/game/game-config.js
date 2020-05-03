export const GAME_DOM_ELEMENT_ID = 'game-container';

export const COLORS = {
  RED: 0xf25346,
  PINK: 0xF5986E,
  BLUE: 0x68c3c0,
  GRAY: 0xF8F8F0,
  BROWN: 0x59332e,
  WHITE: 0xfffafa,
  BLACK: 0x000100,
  GREEN: 0x33ff33,
  YELLOW: 0xFFFA97,
  DARK_BROWN: 0x23190f,
  LIGHT_BLUE: 0xe5f2f2,
  LIGHT_GREEN: 0x99ff99,
  LIGHT_YELLOW: 0xFFFCCB,
};

export const EVENTS = {
  RESIZE: 'resize',
  KEY_DOWN: 'keydown',
};

export const KEYS_CODES = {
  ARROW_UP: 'ArrowUp',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_DOWN: 'ArrowDown',
  ARROW_RIGHT: 'ArrowRight',
};

export const LANES = {
  LEFT: -1,
  RIGHT: 1,
  CENTER: 0,
};

// models
export const GROUND = {
  X: 0,
  Y: -1.1,
  Z: 0,
  HEIGHT: 1,
  WIDTH: 100,
  DEPTH: 150,
  WIDTH_SEGMENTS: 50,
  HEIGHT_SEGMENTS: 1,
  DEPTH_SEGMENTS: 50,
  FLAT_SHADING: true,
  CAST_SHADOW: false,
  RECEIVE_SHADOW: true,
  DISTORTION_VALUE: 0.14,
  COLOR: COLORS.LIGHT_GREEN,
};

export const HERO = {
  X: 0,
  Y: -0.5,
  Z: 3.4,
  SCALE: 0.08,
  CAST_SHADOW: true,
  RECEIVE_SHADOW: true,
  RUN_ANIMATION_NUMBER: 1,
  PLAY_RUN_ANIMATION: true,
  // eslint-disable-next-line no-mixed-operators
  ROTATION_Y: 180 * Math.PI / 180,
  URL: '../assets/hero/hero.gltf',
};

export const ROCK = {
  RADIUS: 0.37,
  COLOR: 0xf0f0f0,
  CAST_SHADOW: true,
  FLAT_SHADING: true,
  WIDTH_SEGMENTS: 10,
  HEIGHT_SEGMENTS: 10,
  RECEIVE_SHADOW: true,
  DISTORTION_VALUE: 0.03,
};

export const TREE = {
  WOOD_HEIGHT: 1,
  TREE_RADIUS: 0.25,
  WOOD_RADIUS: 0.05,
  CAST_SHADOW: true,
  FLAT_SHADING: true,
  RECEIVE_SHADOW: true,
  DISTORTION_VALUE: 0.05,
  TREE_WIDTH_SEGMENTS: 8,
  treeColor: COLORS.GREEN,
  woodColor: COLORS.BROWN,
  TREE_HEIGHT_SEGMENTS: 8,
};

// config
export const SCENE = {
  FOG_NEAR: 7,
  FOG_FAR: 2 * 7,
  FOG_COLOR: COLORS.GRAY,
  BACKGROUND: COLORS.BLUE,
};

export const CAMERA = {
  X: 0,
  Y: 0,
  Z: 5,
  FAR: 15,
  NEAR: 1,
  FIELD_OF_VIEW: 50,
};

export const RENDERER = {
  ANTIALIAS: false,
  SHADOW_MAP_ENABLED: true,
};

export const CONTROLLER = {
  JUMP: false,
  GO_DOWN: false,
  COULD_JUMP: true,
  LANE: LANES.CENTER,
};

export const LIGHTS = {
  SUN_X: 50,
  SUN_Y: 50,
  SUN_Z: 20,
  SHADOW_NEAR: 1,
  SHADOW_FAR: 20,
  SHADOW_RADIUS: 5,
  CAST_SHADOW: true,
  SUN_INTENSITY: 0.6,
  SCENE_INTENSITY: 0.4,
  SHADOW_RESOLUTION: 1024,
  SKY_COLOR: COLORS.WHITE,
  GROUND_COLOR: COLORS.WHITE,
  SUN_LIGHT_COLOR: COLORS.WHITE,
};

export const ANIMATION = {
  GRAVITY: 0.008,
  RUN_SPEED: 0.08,
  END_JUMP_THRESHOLD: 0.1,
  HERO_SHIFT_SPEED: 0.035,
  ADD_GROUND_THRESHOLD: 50,
  NO_GRAVITY_MULTIPLIER: 1,
  COLLISION_TIMEOUT_MS: 100,
  JUMP_GRAVITY_MULTIPLIER: 0.2,
  OBSTACLES_UPDATE_INTERVAL: 1,
  GO_DOWN_GRAVITY_MULTIPLIER: 2,
};

export const SCORE = {
  LIFES: 3,
  VALUE: 3 * 2,
  DECREASE_VALUE: -1,
  INCREASE_VALUE: 0.01,
  LIFES_DECREASE_VALUE: 1,
  VALUE_DOM_ELEMENT_ID: 'current-score-value',
  LIFES_DOM_ELEMENT_ID: 'current-score-lifes',
};

export const OBSTACLES = {
  COUNT: 50,
  ROW_DISTANCE: 3,
  OBSTACLE_Y: -0.75,
  START_Z_POSITION: -20,
  MIN_INVISIBLE_ROWS: 8,
  CHANGE_ROW_PROBABILITY: 0.2,
  ADD_OBSTACLE_PROBABILITY: 0.5,
};
