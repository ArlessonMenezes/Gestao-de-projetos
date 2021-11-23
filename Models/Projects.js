const Sequelize = require('sequelize');
const connection = require('../Database/database');

const Project = connection.define('projects', {
    name:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    
    start:{
        type: Sequelize.DATE,
        allowNull: false
    },

    end:{
        type: Sequelize.DATE,
        allowNull: false
    },

    theme:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Project.sync({ alter: true });

module.exports = Project;