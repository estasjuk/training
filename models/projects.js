const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../utils/handleMongooseError');

const projectSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'], // change the standart error text
    },
    description: {
      type: String,
      required: [true],
  },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
}, { versionKey: false, timestamps: true, });


projectSchema.post('save', handleMongooseError);

const Project = model('project', projectSchema); // create connected to projects collection model, that will work with projectSchema

module.exports = {
  Project,
};