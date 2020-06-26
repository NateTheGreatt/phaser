import { IVec2Like } from './IVec2Like';
import { Vec2 } from './Vec2';

// Returns the minimum of two vec2's

export function Min (a: IVec2Like, b: IVec2Like, out: Vec2 = new Vec2()): Vec2
{
    const { x: ax, y: ay } = a;
    const { x: bx, y: by } = b;

    return out.set(
        Math.min(ax, bx),
        Math.min(ay, by)
    );
}
