"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const controller_1 = require("./users/controller");
const controller_2 = require("./logins/controller");
const db_1 = require("./db");
const jwt_1 = require("./jwt");
const controller_3 = require("./students/controller");
const controller_4 = require("./teachers/controller");
const controller_5 = require("./evaluations/controller");
const controller_6 = require("./batches/controller");
const app = routing_controllers_1.createKoaServer({
    controllers: [
        controller_3.default,
        controller_4.default,
        controller_5.default,
        controller_1.default,
        controller_6.default,
        controller_2.default
    ],
    authorizationChecker: (action) => {
        const header = action.request.headers.authorization;
        if (header && header.startsWith('Bearer ')) {
            const [, token] = header.split(' ');
            return !!(token && jwt_1.verify(token));
        }
        return false;
    }
});
db_1.default()
    .then(_ => app.listen(4000, () => console.log('Listening on port 4000')))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map