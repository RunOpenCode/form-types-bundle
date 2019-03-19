import { Config } from '@stencil/core';
import { sass }   from '@stencil/sass';

export const config: Config = {
    namespace    : 'runopencode',
    outputTargets: [
        {
            type: 'dist',
            dir : './../public',
        },
        {
            type: 'docs'
        }
    ],
    plugins      : [
        sass({
            includePaths: [
                'node_modules'
            ]
        }),
    ],
    globalStyle: 'src/global/variables.scss'
};
