const confme = require('confme');

const config = confme(
    `${__dirname}/../etc/config.json`,
    `${__dirname}/../etc/config-schema.json`
);

module.exports = config;
