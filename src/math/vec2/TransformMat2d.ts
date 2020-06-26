import { IMatrix2D } from '../matrix2d/IMatrix2D';
import { IVec2Like } from './IVec2Like';
import { Vec2 } from './Vec2';

export function TransformMat2d (v: IVec2Like, m: IMatrix2D, out: Vec2 = new Vec2()): Vec2
{
    const { a, b, c, d, tx, ty } = m;

    return out.set(
        a * v.x + c * v.y + tx,
        b * v.x + d * v.y + ty
    );
}
