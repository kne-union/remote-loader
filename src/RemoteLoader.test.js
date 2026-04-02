import React from 'react';
import {render, screen} from '@testing-library/react';

const mockCapture = {
    props: null
};

const mockRemoteView = React.forwardRef(({text}, ref) => {
    return <div ref={ref} data-testid="remote-view">{text}</div>;
});

jest.mock('./withRemoteLoader', () => {
    const React = require('react');
    return (WrappedComponent) => {
        return React.forwardRef((props, ref) => {
            mockCapture.props = props;
            return <WrappedComponent {...props} ref={ref} remoteModules={[mockRemoteView]}/>;
        });
    };
});

import RemoteLoader from './RemoteLoader';

describe('RemoteLoader', () => {
    beforeEach(() => {
        mockCapture.props = null;
    });

    test('将 module 转换为 modules 数组并透传业务 props', () => {
        render(<RemoteLoader module="components-core:Content" text="hello" extra="x"/>);

        expect(mockCapture.props.modules).toEqual(['components-core:Content']);
        expect(mockCapture.props.text).toBe('hello');
        expect(mockCapture.props.extra).toBe('x');
        expect(screen.getByTestId('remote-view').textContent).toBe('hello');
    });

    test('ref 能透传到远程组件', () => {
        const ref = React.createRef();
        render(<RemoteLoader module="components-core:Content" text="ref-test" ref={ref}/>);

        expect(ref.current).toBeTruthy();
        expect(ref.current.getAttribute('data-testid')).toBe('remote-view');
    });
});
