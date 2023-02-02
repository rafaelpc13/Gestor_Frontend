'use strict';

require('dotenv').config({ path:  `${__dirname}/../app.env` });

class AppConf {
    clientId = null;
    clientSecret = null;
    apiKey = null;
    authUri = null;
    authGrantType = null;
    apiBasePath = null;

    constructor() {
        this.loadEnvVars();
    }

    loadEnvVars() {
        this.clientId = '55cigm9fp96gn5ai6tdevs6de';
        this.clientSecret = 'd4f48f4bv20v1t6147i4objgqi3vtjtq0f68t3c2k53sve9le34';
        this.apiKey = 'QkXZZrt8gYa0sgSfDr64B3jYNTBPRsal5F5mDSzW';
        this.authUri = 'https://oauth.sandbox.nequi.com/oauth2/token';
        this.authGrantType = 'client_credentials';
        this.apiBasePath = 'https://api.sandbox.nequi.com';
    }
}

module.exports = new AppConf();