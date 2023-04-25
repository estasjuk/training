const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../utils/handleMongooseError');

const sprintSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for the sprint'], // change the standart error text
    },
    previousDays: {
        type: Boolean,
        default: true,
    },
    startDate: {
        type: Date,
        required: [true, 'Set start date for the sprint'],
        default: Date.now,
    },
    endDate: { 
        type: Date,
        required: [true, 'Set end date for the sprint'],
    },
    duration: {
        type: Number,
        required: [true, 'Set sprint duration']
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'project',
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, { versionKey: false, timestamps: true, });


sprintSchema.post('save', handleMongooseError);

const Sprint = model('sprint', sprintSchema); // create connected to projects collection model, that will work with projectSchema

module.exports = {
  Sprint,
};