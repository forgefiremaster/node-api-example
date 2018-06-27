'use-strict'

const mongoose = require('mongoose');

const IWrite = require ('./interfaces/IWrite');
const IRead = require '(./interfaces/IRead');

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {

  protected let _model;

  constructor(db: Db, collectionName: string) {
    this._model = mongoose.model(string));
  }

  create(item: T): Promise<boolean> {
      let result = new T(data);
      await result.save();
  }

  update(id: string, item: T): Promise<boolean> {
      throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<boolean> {
      throw new Error("Method not implemented.");
  }

  find(item: T): Promise<T[]> {
      throw new Error("Method not implemented.");
  }

  findOne(id: string): Promise<T> {
      throw new Error("Method not implemented.");
  }
}
