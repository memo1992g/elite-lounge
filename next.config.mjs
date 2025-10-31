/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://elite-lounge.us-east-2.elasticbeanstalk.com/:path*',
        },
      ];
    },
  };
  
  export default nextConfig;
  