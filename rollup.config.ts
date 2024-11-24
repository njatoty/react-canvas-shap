import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';

export default {
    input: './src/index.ts', // Entry point
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true, // Enable sourcemaps for debugging
        },
        {
            file: 'dist/index.es.js',
            format: 'es',
            exports: 'named',
            sourcemap: true,
        },
    ],
    plugins: [
        external(),
        resolve(),
        typescript({ tsconfig: './tsconfig.json' }), // Use TypeScript plugin
        babel({
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add TypeScript extensions
            babelHelpers: 'bundled',
            presets: ['@babel/preset-react'],
        }),
    ],
    external: ['react', 'react-dom'], // Mark peer dependencies as external
};
