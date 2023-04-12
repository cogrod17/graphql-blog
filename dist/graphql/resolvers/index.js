"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootResolver = void 0;
const auth_resolver_1 = require("./auth.resolver");
const user_resolver_1 = require("./user.resolver");
const post_resolvers_1 = require("./post.resolvers");
exports.rootResolver = Object.assign(Object.assign(Object.assign({}, auth_resolver_1.authResolvers), user_resolver_1.userResolver), post_resolvers_1.postResolver);
