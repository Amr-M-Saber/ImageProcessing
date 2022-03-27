import sharp from 'sharp';

type paramsSharp = {
    imagePath: string;
    imageTarget: string;
    width: number;
    height: number;
};

const imgProc = async (params: paramsSharp): Promise<string> => {
    try {
        await sharp(params.imagePath)
            .resize(params.width, params.height)
            .toFile(params.imageTarget);
        return 'Done';
    } catch {
        return 'Image could not be processed.';
    }
};

export default imgProc;
