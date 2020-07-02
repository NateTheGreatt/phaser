import { Flush, PopShader, PopVertexBuffer, SetShader, SetVertexBuffer } from '../renderer/webgl1/renderpass';

import { AmbientLightShader } from '../renderer/webgl1/shaders/AmbientLightShader';
import { BaseWorld3D } from './BaseWorld3D';
import { CreateWorld3DRenderData } from './CreateWorld3DRenderData';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { IShader } from '../renderer/webgl1/shaders/IShader';
import { IWorld3D } from './IWorld3D';
import { Light } from '../gameobjects3d/light/Light';
import { NewCamera3D } from '../camera3d/NewCamera3D';
import { VertexBuffer } from '../renderer/webgl1/buffers/VertexBuffer';

// export class World3D extends BaseWorld3D implements IWorld3D
export class World3D extends BaseWorld3D
{
    camera: NewCamera3D;

    light: Light;

    shader: IShader;

    enableCameraCull: boolean = true;

    constructor (scene: IScene, x: number = 0, y: number = 0, z: number = 0)
    {
        super(scene);

        this.type = 'World3D';

        this.camera = new NewCamera3D();

        this.camera.position.set(x, y, z);

        this.light = new Light(0.5, 3, 4);

        this.shader = new AmbientLightShader();

        this.renderData = CreateWorld3DRenderData(this, this.camera);
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        Flush(renderPass);

        const shader = this.shader;
        const camera = this.camera;
        const gl = renderPass.renderer.gl;

        const uniforms = shader.uniforms;

        uniforms.set('uViewProjectionMatrix', camera.viewProjectionMatrix.data);
        uniforms.set('uCameraPosition', camera.position.toArray());

        this.light.setUniforms(shader);




        //  TODO - Use fbo anyway to avoid z-fighting with World2D?
        // SetFramebuffer(renderPass, this.framebuffer, true);

        // SetVertexBuffer(renderPass, this.buffer);
        SetShader(renderPass, shader, 0);

        // BindTexture(this.cubeTexture);
        // const textureIndex = SetTexture(renderPass, this.cubeTexture);

        gl.enable(gl.DEPTH_TEST);

        //  TODO - This is a per Mesh property:
        // gl.enable(gl.CULL_FACE);

        this.renderList.forEach(entry =>
        {
            if (entry.children.length > 0)
            {
                this.renderNode(entry, renderPass);
            }
            else
            {
                entry.node.renderGL(renderPass);
            }
        });
    }

    postRenderGL <T extends IRenderPass> (renderPass: T): void
    {
        const gl = renderPass.renderer.gl;

        // Flush(renderPass);

        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);

        // UnbindTexture(renderPass);

        // PopFramebuffer(renderPass);
        // PopVertexBuffer(renderPass);
        PopShader(renderPass);

        // DrawTexturedQuad(renderPass, this.texture);
    }
}
