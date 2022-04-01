'use strict';

/* global hexo */

hexo.extend.deployer.register('ftps', (args, callback) => {
  if (!args.host || !args.user || args.pass == null) {
    const help = [
      'You should make sure deployment settings in _config.yml first!',
      '',
      'Example:',
      '  deploy:',
      '    type: ftps',
      '    host: <host>',
      '    user: <user>',
      '    pass: <pass>',
      '',
      'For more help, you can check the docs: ' + 'http://hexo.io/docs/deployment.html'.underline
    ];

    console.log(help.join('\n'));
    return callback();
  }

  var FTPS = require('ftps');
  var ftps = new FTPS({
    host: args.host, // required
    username: args.user, // Optional. Use empty username for anonymous access.
    password: args.pass, // Required if username is not empty, except when requiresPassword: false
    protocol: '', // Optional, values : 'ftp', 'sftp', 'ftps', ... default: 'ftp'
    port: null, // Optional
    retries: 1, // Optional, defaults to 1 (1 = no retries, 0 = unlimited retries)
    timeout: 60, // Optional, Time before failing a connection attempt. Defaults to 10
    retryInterval: 5, // Optional, Time in seconds between attempts. Defaults to 5
    autoConfirm: true,
    additionalLftpCommands: 'set ssl:verify-certificate no'
  });

  // Do some amazing things
  ftps.mirror({
    parallel: 3,
    upload: true,
    localDir: 'public'
  }).exec(console.log);
});