const {dependencies} = require("./package.json");

module.exports = {
    name: 'example',
    shared: {
        ...dependencies,
        react: {
            singleton: true,
            requiredVersion: dependencies['react'],
            eager: true
        },
        'react-dom': {
            singleton: true,
            requiredVersion: dependencies['react-dom'],
            eager: true
        },
        'react-router-dom':{
            singleton: true,
            requiredVersion: dependencies['react-router-dom'],
            eager: true
        },
        'antd': {
            singleton: true,
            requiredVersion: dependencies['antd'],
            eager: true
        },
        '@kne/example-driver':{
            singleton: true,
            requiredVersion: dependencies['@kne/example-driver'],
            eager: true
        },
        "@kne/remote-loader":{
            singleton: true,
            requiredVersion: dependencies['@kne/remote-loader'],
            eager: true
        }
    },
};
