import { Distance } from '../math/vec2/Distance';
import { IGameObject } from '../gameobjects/IGameObject';
import { Vec2 } from '../math/vec2/Vec2';

export function GetFurthestChild (parent: IGameObject, point: Vec2): IGameObject
{
    const children = parent.children;

    let furthest: IGameObject = null;
    let distance: number = 0;

    children.forEach(child =>
    {
        const childDistance = Distance(point, child.transform.position);

        if (!furthest || childDistance > distance)
        {
            furthest = child;
            distance = childDistance;
        }

    });

    return furthest;
}
