import * as GL_CONST from '../GL_CONST';

import { IVertexAttribPointer } from './IVertexAttribPointer';
import { gl } from '../GL';

export type ShaderAttributeEntry = {
    size: number;
    type?: number;
    normalized?: boolean;
    stride?: number;
};

export function CreateAttributes (program: WebGLProgram, attribs: Record<string, ShaderAttributeEntry>): Map<string, IVertexAttribPointer>
{
    const attributes = new Map();

    const defaultSettings =
    {
        size: 1,
        type: GL_CONST.FLOAT,
        normalized: false,
        stride: 0
    };

    let offset = 0;

    for (const [ name, entry ] of Object.entries(attribs))
    {
        const index = gl.getAttribLocation(program, name);

        if (index !== -1)
        {
            gl.enableVertexAttribArray(index);

            const {

                size = defaultSettings.size,
                type = defaultSettings.type,
                normalized = defaultSettings.normalized,
                stride = defaultSettings.stride

            } = entry;

            attributes.set(name, { index, size, type, normalized, stride, offset });

            //  Default value as used by FLOAT, UNSIGNED_INT and INT
            let typeSize = 4;

            if (type === GL_CONST.UNSIGNED_SHORT || type === GL_CONST.SHORT)
            {
                typeSize = 2;
            }
            else if (type === GL_CONST.UNSIGNED_BYTE || type === GL_CONST.BYTE)
            {
                typeSize = 1;
            }

            offset += size * typeSize;
        }
    }

    return attributes;
}
