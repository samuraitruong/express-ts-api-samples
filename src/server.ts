"use strict";

import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as morgan from "morgan";
import * as passport from "passport";
import * as path from "path";
import { facebookMiddleware } from "./middlewares/facebook";
import { jwtMiddleware } from "./middlewares/passport";
import "./repositories/db";
import * as routes from "./routes";
import { Routes } from "./routes/index";

/**
 * The server.
 *
 * @class Server
 */
export class Server {

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     */
    public static bootstrap(): Server {
        return new Server();
    }

    public app: express.Application;

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        // create expressjs application
        this.app = express();

        // configure application
        this.config();
        // register routes
        this.registerRoutes();
    }
    public registerRoutes() {
        Routes.map((r) => this.app.use(r));
        // router.use(router)
    }
    public config() {
        this.app.use(morgan("tiny"));
        this.app.use(cors());
        this.app.use("/", express.static(path.join(__dirname, "../public")));
        this.app.use(bodyParser.urlencoded({
            extended: true,
        }));
        this.app.use(bodyParser.json());
        this.app.use(passport.initialize());

        passport.serializeUser((user, done) => {
            done(null, user);
          });
        passport.deserializeUser((user, done) =>{
            done(null, user);
        });

        facebookMiddleware(passport);
        jwtMiddleware(passport);
    }
    public start(port: number) {
        this.app.listen(port, () => {
            console.log("Server running on ", port);
        });
    }
}
export default Server.bootstrap();