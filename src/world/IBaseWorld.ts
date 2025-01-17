import { ComponentType, ISchema } from 'bitecs';

import { IBaseCamera } from '../camera/IBaseCamera';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';

export interface IBaseWorld extends IGameObject
{
    tag: ComponentType<ISchema>;
    scene: IScene;
    camera: IBaseCamera;

    forceRefresh: boolean;
    is3D: boolean;
    runRender: boolean;

    addToRenderList (id: number, renderType: number): void;
    getRenderList (): IGameObject[];

    beforeUpdate (delta: number, time: number): void;
    update (delta: number, time: number): void;
    afterUpdate (delta: number, time: number): void;

    preRender (gameFrame: number, transformList: number[]): boolean;
    renderGL <T extends IRenderPass> (renderPass: T): void;
    postRenderGL <T extends IRenderPass> (renderPass: T): void;

    shutdown (): void;
    destroy (reparentChildren?: IGameObject): void;
}
