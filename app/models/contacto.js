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
			allowNull: false,
			validate: {
				notNull: { msg: "El usuario debe tener un nombre "},
				notEmpty: { msg: "El nombre no puede estar vacio"},
			}
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: { msg: "El usuario debe tener un apellido "},
				notEmpty: { msg: "El apellido no puede estar vacio"},
			}
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: { msg: "El usuario debe tener un numero de telefono "},
				notEmpty: { msg: "El telefono no puede estar vacio"},
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				args: true,
				msg: 'Un contacto ya cuenta con este correo'
			},
			validate: {
				notNull: { msg: "El usuario debe tener un email "},
				notEmpty: { msg: "El email no puede estar vacio "},
				isEmail: { msg: "Debe ser una direccion de correo valida "}
			}
		},
		photo: DataTypes.STRING
	}, {
		sequelize,
		tableName: 'contacto',
		modelName: 'contacto',
	});
	return contacto;
};