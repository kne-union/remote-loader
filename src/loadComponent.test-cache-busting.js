import {loadComponent} from './loadComponent';

describe('loadComponent cache busting', () => {
    test('should add version to URL when version is provided', () => {
        const url = 'https://example.com/remoteEntry.js';
        const version = '1.0.0';
        
        // Mock getOrLoadRemote to capture the URL
        let capturedUrl;
        jest.mock('./getOrLoadRemote', () => ({
            getOrLoadRemote: jest.fn((remote, shareScope, url) => {
                capturedUrl = url;
                return Promise.resolve();
            })
        }));
        
        // Expected: URL should include version parameter
        expect(capturedUrl).toBe('https://example.com/remoteEntry.js?v=1.0.0');
    });
    
    test('should not modify URL when version is not provided', () => {
        const url = 'https://example.com/remoteEntry.js';
        
        // Expected: URL should remain unchanged
        // Test implementation...
    });
    
    test('should append version to existing query parameters', () => {
        const url = 'https://example.com/remoteEntry.js?foo=bar';
        const version = '1.0.0';
        
        // Expected: https://example.com/remoteEntry.js?foo=bar&v=1.0.0
        // Test implementation...
    });
});
