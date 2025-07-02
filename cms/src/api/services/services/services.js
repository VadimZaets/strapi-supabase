"use strict";

/**
 * services service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::services.services");
