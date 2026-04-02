import React from 'react';
import {render, screen} from '@testing-library/react';
import withRemoteLoader, {createWithRemoteLoader} from './withRemoteLoader';
import useLoader from './useLoader';

jest.mock('./useLoader', () => jest.fn());

describe('withRemoteLoader', () => {
    beforeEach(() => {
        useLoader.mockReset();
    });

    test('remoteError 为函数时会执行并渲染返回值', () => {
        useLoader.mockReturnValue({
            loading: false,
            error: new Error('load-failed'),
            remoteModules: []
        });

        const Wrapped = () => <div>wrapped</div>;
        const RemoteWrapped = withRemoteLoader(Wrapped);

        render(<RemoteWrapped modules={['a']} remoteError={(error) => <div>{error.message}</div>}/>);

        expect(screen.getByText('load-failed')).toBeTruthy();
    });

    test('loading 时 fallback 使用 nullish 语义', () => {
        useLoader.mockReturnValue({
            loading: true,
            error: false,
            remoteModules: []
        });

        const Wrapped = () => <div>wrapped</div>;
        const RemoteWrapped = withRemoteLoader(Wrapped);

        const {container} = render(<RemoteWrapped modules={['a']} fallback={0}/>);

        expect(container.textContent).toBe('0');
    });

    test('加载成功时向被包装组件透传 props 与 remoteModules', () => {
        useLoader.mockReturnValue({
            loading: false,
            error: false,
            remoteModules: ['mod-a']
        });

        const Wrapped = ({label, remoteModules}) => <div>{`${label}-${remoteModules[0]}`}</div>;
        const RemoteWrapped = withRemoteLoader(Wrapped);

        render(<RemoteWrapped modules={['a']} label="ok"/>);

        expect(screen.getByText('ok-mod-a')).toBeTruthy();
    });

    test('createWithRemoteLoader 使用浅合并，props 覆盖 params 同名字段', () => {
        useLoader.mockReturnValue({
            loading: false,
            error: false,
            remoteModules: ['module-from-loader']
        });

        const Wrapped = ({name}) => <div>{name}</div>;
        const RemoteWrapped = createWithRemoteLoader({modules: ['from-params'], name: 'params-name'})(Wrapped);

        render(<RemoteWrapped name="props-name"/>);

        expect(screen.getByText('props-name')).toBeTruthy();
        expect(useLoader).toHaveBeenLastCalledWith({
            modules: ['from-params'],
            onLoadComplete: undefined,
            options: undefined
        });
    });
});
