import { IVec2Like } from './IVec2Like';
import { Vec2 } from './Vec2';

export function RoundToZero (a: IVec2Like, out: Vec2 = new Vec2()): Vec2
{
    return out.set(
        (a.x < 0) ? Math.ceil(a.x) : Math.floor(a.x),
        (a.y < 0) ? Math.ceil(a.y) : Math.floor(a.y)
    );
}
