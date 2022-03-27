import supertest from 'supertest';
import imgProc from '../utils/imageProcess';
import path from 'path';
import app from '../index';

const request = supertest(app);

describe('Endpoint', () => {
    it('Should show welcome message', async () => {
        const response = request.get('/');
        expect((await response).status).toBe(200);
    });
});

describe('Image Processing', () => {
    it('Image Prcessing function', async () => {
        expect(async () => {
            await imgProc({
                imagePath: path.resolve('../../assets/original/img01.jpg'),
                imageTarget: path.resolve(
                    '../../assets/inst/img01_500_500.jpg'
                ),
                width: 500,
                height: 500,
            });
        }).not.toThrow();
    });
});
