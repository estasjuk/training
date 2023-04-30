const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../utils/handleMongooseError');

const taskSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set task name'], // change the standart error text
    },
    previousDays: {
        type: Boolean,
        default: true,
    },
    startDate: {
        type: Date,
        required: [true, 'Set start date for the task'],
        default: Date.now,
    },
    endDate: { 
        type: Date,
        required: [true, 'Set end date for the task'],
    },
    duration: {
        type: Number,
        required: [true, 'Set task duration']
    },
    sprint: {
        type: Schema.Types.ObjectId,
        ref: 'sprint',
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


taskSchema.post('save', handleMongooseError);

const Task = model('task', taskSchema); // create connected to projects collection model, that will work with projectSchema

module.exports = {
  Task,
};