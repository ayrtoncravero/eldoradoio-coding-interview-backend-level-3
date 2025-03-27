import 'reflect-metadata'
import {main } from './index'
// @ts-ignore
import packageJson from '../package.json'

main().then(() => {
    console.log('application started successfully');

    console.log(`version: ${packageJson.version}`)
}).catch((error: any) => {
    console.log('uncaught error: ', error.message, error.stack);
})
