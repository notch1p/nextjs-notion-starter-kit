export default {
  staticPageGenerationTimeout: 300,
  images: {
    domains: [
      'www.notion.so',
      'notion.so',
      'images.unsplash.com',
      'pbs.twimg.com',
      'abs.twimg.com',
      's3.us-west-2.amazonaws.com',
      'transitivebullsh.it',
      'file.notion.so',
      'notch1p.xyz',
      'flexio.blob.core.windows.net',
      'r2.notch1p.xyz',
      'www.gravatar.com'
    ],
    formats: ['image/avif', 'image/webp'], //do not use avif.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    // unoptimized: true
  },
  //webpack: (config) => {
  //  // Workaround for ensuring that `react` and `react-dom` resolve correctly
  //  // when using a locally-linked version of `react-notion-x`.
  //  // @see https://github.com/vercel/next.js/issues/50391
  //  const dirname = path.dirname(fileURLToPath(import.meta.url))
  //  config.resolve.alias.react = path.resolve(dirname, 'node_modules/react')
  //  config.resolve.alias['react-dom'] = path.resolve(
  //    dirname,
  //    'node_modules/react-dom'
  //  )
  //  return config
  //},
  // See https://react-tweet.vercel.app/next#troubleshooting
  transpilePackages: ['react-tweet']
}
