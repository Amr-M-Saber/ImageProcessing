import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import imgProc from '../../utils/imageProcess';

const imgProRoutes = Router();

imgProRoutes.get('/', async (req: Request, res: Response): Promise<null> => {
    const name = req.query.name as string;
    const width = Number(req.query.width);
    const height = Number(req.query.height);

    // If the name query wasn't provided return and end function
    if (!name || !width || !height || !Number(width) || !Number(height)) {
        res.status(400).send(
            'Bad request, query parameter (name & width & height) is required.'
        );
        return null;
    }

    const imgPath = path.resolve('./') + `/assets/original/${name}.jpg`;
    const instPath =
        path.resolve('./') + `/assets/inst/${name}_${width}_${height}.jpg`;
    const inst = path.resolve('./') + `/assets/inst/`;

    if (fs.existsSync(inst) === false) fs.mkdirSync(inst);

    // If the Image in the Original path is not Found
    if (fs.existsSync(imgPath) === false) {
        res.status(404).send('Resource not found!');
        return null;
    }

    // If instance exists, don't create another one
    if (fs.existsSync(instPath) === true) {
        res.sendFile(instPath);
        return null;
    }

    try {
        const result = await imgProc({
            imagePath: imgPath,
            imageTarget: instPath,
            width,
            height,
        });

        if (result == 'Done') {
            res.sendFile(instPath);
            return null;
        }
    } catch (err) {
        res.send(
            'Bad request, query parameter (name & width & height) is required.'
        );
        return null;
    }

    res.status(400).send(
        'Bad request, query parameter (name & width & height) is required.'
    );
    return null;
});

export default imgProRoutes;
