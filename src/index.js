import cloneDeep from 'lodash/cloneDeep';
import {global} from './preset';

export {default as loadModule, safeLoadModule} from './loadModule';
export {default as useLoader, cache} from './useLoader';
export {createWithRemoteLoader, default as withRemoteLoader} from './withRemoteLoader';
export {default} from './RemoteLoader';
export {preset} from './preset';
export {getOrLoadRemote} from './getOrLoadRemote';
export {loadComponent} from './loadComponent';
export {default as getPublicPath} from './getPublicPath';
export {default as getStaticPath} from './getStaticPath';
export {default as parseToken} from './parseToken';
export const getGlobal = () => cloneDeep(global);
