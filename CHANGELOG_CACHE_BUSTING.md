# Changelog - Cache Busting Fix

## [1.4.7] - 2026-05-07

### Added
- **Cache Busting Mechanism**: Automatically append version number to `remoteEntry.js` URL to prevent browser caching issues
  - URLs now include version parameter: `remoteEntry.js?v=0.4.64`
  - Ensures each version uses independent cache
  - Prevents stale module loading after configuration updates

### Changed
- `loadComponent`: Now accepts optional `version` parameter
- `loadModule`: Passes version information to `loadComponent`

### Fixed
- **Browser Cache Issue**: Fixed issue where browser would load cached `remoteEntry.js` even after configuration changes
  - Previously: Changing remote configuration wouldn't take effect due to browser cache
  - Now: Each version gets its own cache entry via query parameter

### Technical Details

#### Modified Files
1. `src/loadComponent.js`
   - Added `version` parameter
   - Automatically appends `?v={version}` to URL when version exists
   - Handles existing query parameters correctly

2. `src/loadModule.js`
   - Extracts version from resolved options
   - Passes version to `loadComponent`

#### Example
```javascript
// Before (1.4.6)
// URL: https://example.com/remoteEntry.js
// Problem: Browser caches this URL indefinitely

// After (1.4.7)
// URL: https://example.com/remoteEntry.js?v=0.4.64
// Solution: Each version has unique URL, no cache conflicts
```

### Migration Guide

No breaking changes. The fix is automatic and transparent:

```javascript
// Your existing code works without changes
remoteLoaderPreset({
    remotes: {
        'components-core': {
            url: 'https://npm-1253674045.cos.ap-shanghai.myqcloud.com',
            remote: 'components-core',
            defaultVersion: '0.4.64',
            tpl: '{{url}}/packages/@kne-components/{{remote}}/{{version}}/build'
        }
    }
});

// URLs will automatically include version:
// https://.../components-core/0.4.64/build/remoteEntry.js?v=0.4.64
```

### Benefits

1. **No Manual Cache Clearing**: Users don't need to manually clear browser cache
2. **Version Isolation**: Different versions don't interfere with each other
3. **Backward Compatible**: Existing code works without modification
4. **CDN Friendly**: Works with most CDN configurations

### Notes

- If your CDN ignores query parameters, you may need to adjust CDN settings
- The version parameter is only added when a version is specified in the configuration
- This fix resolves the issue reported where `component-core` vs `components-core` appeared to be a code bug but was actually a caching issue

### Related Issues

- Fixes browser caching causing wrong module URLs to be loaded
- Resolves confusion between 1.2.3 and 1.4.6 versions (both were correct, issue was browser cache)
