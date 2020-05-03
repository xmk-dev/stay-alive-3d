import { MeshStandardMaterial, SphereGeometry, Mesh } from 'three';
import { distortGeometry } from '../utils/geometry-util';
import { ROCK } from '../app/game/game-config';

export default () => {
  const material = new MeshStandardMaterial({
    color: ROCK.COLOR,
    flatShading: ROCK.FLAT_SHADING,
  });

  const rockGeometry = new SphereGeometry(
    ROCK.RADIUS,
    ROCK.WIDTH_SEGMENTS,
    ROCK.HEIGHT_SEGMENTS,
  );

  distortGeometry(rockGeometry, ROCK.DISTORTION_VALUE);

  const rock = new Mesh(rockGeometry, material);
  rock.castShadow = ROCK.CAST_SHADOW;
  rock.receiveShadow = ROCK.RECEIVE_SHADOW;

  return rock;
};
