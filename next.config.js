/** @type {import('next').NextConfig} */
const rewrites = () => { 
    return [
        {
            source: "/api/:path*",
            destination: "http://localhost:5000/api/:path*", 
        },     
        {
            source: "/hubs/:path*",
            destination: "http://localhost:5000/hubs/:path*",
        },     
    ];
}; 

const nextConfig = {
    reactStrictMode: true,
    webpackDevMiddleware: config => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        }
        return config
    },
    images: {
        loader: 'akamai',
        path: '/',
    },
    rewrites,
}

module.exports = nextConfig