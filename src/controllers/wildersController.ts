import { Request, Response } from 'express';
import reqIsCorrect from './controllerError';

const createError = require('http-errors');

const WilderModel = require('../models/Wilder');

module.exports = {
  create: async (req: Request, res: Response) => {
    try {
      reqIsCorrect(req);
      await WilderModel.init();
      const wilder = new WilderModel(req.body);
      const result = await wilder.save();
      res.json({ success: true, result });
    } catch (err) {
      res.json({ success: false, result: err });
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const result = await WilderModel.findOne({ _id: req.params.id });
      if (!result) throw createError(404, 'Utilisateur introuvable');

      res.json({ success: true, result });
    } catch (err) {
      res.json({ success: false, result: err });
    }
  },

  // find wilders with lower or equal votes than the number send by the req
  filterLte: async (req: Request, res: Response) => {
    try {
      const result = await WilderModel.find({
        'skills.votes': { $lte: req.body.votes },
      });

      res.json({ success: true, result });
    } catch (err) {
      res.json({ success: false, result: err });
    }
  },

  readAll: async (req: Request, res: Response) => {
    try {
      const result = await WilderModel.find();
      res.json({ success: true, result });
    } catch (err) {
      res.json({ success: false, result: err });
    }
  },

  update: async (req: Request, res: Response) => {
    // reqIsCorrect(req:Request);
    try {
      const result = await WilderModel.findOne({ _id: req.params.id });
      if (!result) throw createError(404, 'Utilisateur introuvable');
      const resultUpdate = await WilderModel.updateOne(
        { _id: req.params.id },
        { ...req.body }
      );

      res.json({ success: true, resultUpdate });
    } catch (err) {
      res.json({ success: false, result: err });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const result = await WilderModel.findOne({ _id: req.params.id });
      if (!result) throw createError(404, 'Utilisateur introuvable');
      await WilderModel.deleteOne({ _id: req.params.id });
      res.json({ success: true, result });
    } catch (err) {
      res.json({ success: false, result: err });
    }
  },
};

// async function reqIsCorrect(req:Request) {
//   if (!req.body.name || !req.body.city || !req.body.skills) {
//     throw createError(400, 'Requéte non conforme');
//   }
// }

// function userExist(result) {
//   if (!result) {
//     throw createError(404, 'Utilisateur introuvable');
//   }
// }
