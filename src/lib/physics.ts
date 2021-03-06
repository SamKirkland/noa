import Engine from ".."

var createPhysics = require('voxel-physics-engine')
// var createPhysics = require('../../../../npm-modules/voxel-physics-engine')

export interface IPhysicsOptions {
    gravity: [number, number, number];
    airDrag: number;
}

const physicsOptions: IPhysicsOptions = {
    gravity: [0, -10, 0],
    airDrag: 0.1,
}


/**
 * @class Physics
 * @typicalname noa.physics
 * @description Wrapper module for the physics engine. For docs see [andyhall/voxel-physics-engine](https://github.com/andyhall/voxel-physics-engine)
 */
export function makePhysics(noa: Engine, options: Partial<IPhysicsOptions>) {
    const optionsWithDefaults = {
        ...physicsOptions,
        ...options
    }

    var world = noa.world
    // physics engine runs in offset coords, so voxel getters need to match
    var offset = noa.worldOriginOffset
    var blockGetter = (x: number, y: number, z: number) => {
        return world.getBlockSolidity(x + offset[0], y + offset[1], z + offset[2])
    }
    var isFluidGetter = (x: number, y: number, z: number) => {
        return world.getBlockFluidity(x + offset[0], y + offset[1], z + offset[2])
    }

    var physics = createPhysics(optionsWithDefaults, blockGetter, isFluidGetter)

    return physics
}
