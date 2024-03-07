import multer from 'multer';
import {Request, Response} from 'express';
import path from 'path';

const configureStorage = (destination: string, fileName: string) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      cb(null, `${fileName}${path.extname(file.originalname)}`)
    },
  })

const createUploader = (destination: string, fileName: string) =>
  multer({storage: configureStorage(destination, fileName)})

export const uploadFile = (destination: string, fileName: string) =>
  createUploader(destination, fileName).single('file')

export const handleUpload = (req: Request, res: Response) => {
  const file = req.file
  res.send(file)
}