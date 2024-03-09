import multer from 'multer';
import {Request, Response} from 'express';
import path from 'path';

const configureStorage = (destination: string) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.originalname,
      );
    },
  });

const createUploader = (destination: string) =>
  multer({storage: configureStorage(destination)});

export const uploadFile = (destination: string) =>
  createUploader(destination).single('file');

export const uploadFiles = (destination: string) =>
  createUploader(destination).array('files');

export const handleUpload = (req: Request, res: Response) => {
  const file = req.file;
  const files = req.files;
  if (files) {
    res.send({message: 'Upload file successfully', data: files});
  } else if (file) {
    res.send({message: 'Upload file successfully', data: file});
  } else {
    res.send({message: 'Error happened'});
  }
};
