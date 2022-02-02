import express, { Router } from 'express';

const router: Router = express.Router();

router.route('/test')
    .get((request, response) => {
        console.log(request, response);
    })
    .post((request, response) => {
        console.log(request, response);
    });

export default router;
