import { extname } from "path";

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Загрузите фотографию формата jpg, jpeg, png'), false);
    }
    callback(null, true);
};

export const audioFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(mp3)$/)) {
      return callback(new Error('Загрузите аудифайл формата mp3'), false);
    }
    callback(null, true);
};


export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${encodeURI(name)}-${randomName}${fileExtName}`);

};