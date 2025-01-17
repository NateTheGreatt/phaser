import { Changed, IWorld, defineQuery, defineSystem } from 'bitecs';

import { BoundsComponent } from '../bounds/BoundsComponent';
import { Extent2DComponent } from '../transform/Extent2DComponent';
import { QuadVertexComponent } from './QuadVertexComponent';
import { VertexComponent } from './VertexComponent';
import { WorldMatrix2DComponent } from '../transform/WorldMatrix2DComponent';

const changedWorldExtentQuery = defineQuery([
    Changed(WorldMatrix2DComponent),
    Changed(Extent2DComponent)
]);

let entities: number[];

const updateVertexPositionSystem = defineSystem(world =>
{
    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        const a = WorldMatrix2DComponent.a[id];
        const b = WorldMatrix2DComponent.b[id];
        const c = WorldMatrix2DComponent.c[id];
        const d = WorldMatrix2DComponent.d[id];
        const tx = WorldMatrix2DComponent.tx[id];
        const ty = WorldMatrix2DComponent.ty[id];

        const x = Extent2DComponent.x[id];
        const y = Extent2DComponent.y[id];
        const right = Extent2DComponent.right[id];
        const bottom = Extent2DComponent.bottom[id];

        const v1 = QuadVertexComponent.tl[id];
        const v2 = QuadVertexComponent.bl[id];
        const v3 = QuadVertexComponent.br[id];
        const v4 = QuadVertexComponent.tr[id];

        const x0 = (x * a) + (y * c) + tx;
        const y0 = (x * b) + (y * d) + ty;

        const x1 = (x * a) + (bottom * c) + tx;
        const y1 = (x * b) + (bottom * d) + ty;

        const x2 = (right * a) + (bottom * c) + tx;
        const y2 = (right * b) + (bottom * d) + ty;

        const x3 = (right * a) + (y * c) + tx;
        const y3 = (right * b) + (y * d) + ty;

        VertexComponent.x[v1] = x0;
        VertexComponent.y[v1] = y0;

        VertexComponent.x[v2] = x1;
        VertexComponent.y[v2] = y1;

        VertexComponent.x[v3] = x2;
        VertexComponent.y[v3] = y2;

        VertexComponent.x[v4] = x3;
        VertexComponent.y[v4] = y3;

        BoundsComponent.x[id] = Math.min(x0, x1, x2, x3);
        BoundsComponent.y[id] = Math.min(y0, y1, y2, y3);
        BoundsComponent.right[id] = Math.max(x0, x1, x2, x3);
        BoundsComponent.bottom[id] = Math.max(y0, y1, y2, y3);
        BoundsComponent.width[id] = BoundsComponent.right[id] - BoundsComponent.x[id];
        BoundsComponent.height[id] = BoundsComponent.bottom[id] - BoundsComponent.y[id];
    }

    return world;
});

export const UpdateVertexPositionSystem = (world: IWorld): number[] =>
{
    entities = changedWorldExtentQuery(world);

    updateVertexPositionSystem(world);

    return entities;
};

