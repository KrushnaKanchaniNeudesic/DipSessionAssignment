import * as bodyParser from 'body-parser';
import * as cors from 'cors';


export class PipeLineSetUp {



    public static configFn(theApp) {
        theApp.use(cors());
        theApp.use(bodyParser.urlencoded({
            extended: true
        }));
        theApp.use(bodyParser.json());
    }

    public static HandleError(theApp) {
        theApp.use((err, req, res, next) => {
            switch (err.name) {
                case "Custom Exception":
                    res.status(err.statusCode).send(err.message);
                    break;

                default:
                    res.status(500).send('Something broke!');

                    break;
            }

        });
    }
}