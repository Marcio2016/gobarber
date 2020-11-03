import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointments from '../app/models/Appointments';

import databaseConfig from '../config/database';

const models = [User, File, Appointments];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://172.17.0.3:27017/gobarber',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      }
      // useFindAndModify
      // useUnifiedTopology
    );
  }
}

export default new Database();
