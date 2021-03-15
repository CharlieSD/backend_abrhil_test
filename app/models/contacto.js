'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class contacto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON(){
        return{ ...this.get(), id: undefined }
    }
  };
  contacto.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    first_name:{ 
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    email: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'contacto',
    modelName: 'contacto',
  });
  return contacto;
};