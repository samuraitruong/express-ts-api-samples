"use strict";

import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import * as routes from "./routes";
import { Routes } from "./routes/index";
import "./services/db";

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
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
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
        console.log(__dirname);
        this.app.use("/", express.static(path.join(__dirname, "../public")));
    }
    public start(port: number) {
        this.app.listen(port, () => {
            console.log("Server running on ", port);
        });
    }
}
export default Server.bootstrap();