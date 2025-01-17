import { AddColorComponent, ColorComponent, SetAlpha } from '../../components/color';
import { AddTransform2DComponent, Origin, Position, Scale, Size, Skew, Transform2DComponent } from '../../components/transform/';
import { GetDefaultOriginX, GetDefaultOriginY } from '../../config/defaultorigin';

import { AddBoundsComponent } from '../../components/bounds/AddBoundsComponent';
import { Flush } from '../../renderer/webgl1/renderpass/Flush';
import { GameObject } from '../GameObject';
import { IContainer } from './IContainer';
import { IGameObject } from '../IGameObject';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { IShader } from '../../renderer/webgl1/shaders/IShader';
import { Rectangle } from '../../geom/rectangle/Rectangle';

export class Container extends GameObject implements IContainer
{
    readonly type: string = 'Container';

    position: Position;
    scale: Scale;
    skew: Skew;
    origin: Origin;
    size: Size;

    shader: IShader;

    constructor (x: number = 0, y: number = 0)
    {
        super();

        const id = this.id;

        AddTransform2DComponent(id, x, y, GetDefaultOriginX(), GetDefaultOriginY());
        AddColorComponent(id);
        AddBoundsComponent(id);

        this.position = new Position(id, x, y);
        this.scale = new Scale(id);
        this.skew = new Skew(id);
        this.size = new Size(id);
        this.origin = new Origin(id, GetDefaultOriginX(), GetDefaultOriginY());
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        if (this.shader)
        {
            Flush(renderPass);

            renderPass.shader.set(this.shader, 0);
        }
    }

    postRenderGL <T extends IRenderPass> (renderPass: T): void
    {
        if (this.shader)
        {
            Flush(renderPass);

            renderPass.shader.pop();
        }
    }

    getBounds (): Rectangle
    {
        // return this.bounds.get();
        return new Rectangle();
    }

    set x (value: number)
    {
        this.position.x = value;
    }

    get x (): number
    {
        return this.position.x;
    }

    set y (value: number)
    {
        this.position.y = value;
    }

    get y (): number
    {
        return this.position.y;
    }

    set rotation (value: number)
    {
        Transform2DComponent.rotation[this.id] = value;
    }

    get rotation (): number
    {
        return Transform2DComponent.rotation[this.id];
    }

    get alpha (): number
    {
        return ColorComponent.alpha[this.id];
    }

    set alpha (value: number)
    {
        SetAlpha(this.id, value);
    }

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);
    }
}
