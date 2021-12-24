// const dotenv = require('dotenv');
// const path = require('path');
// const Joi = require('joi');

// // https://stackoverflow.com/questions/48378337/create-react-app-not-picking-up-env-files
// dotenv.config({ path: path.join(__dirname, '../../.env') });

// console.log(process.env);

// const envVarsSchema = Joi.object()
//   .keys({
//     API_BASE_URL: Joi.string().required().description('API Base URL'),
//     API_SERVER_HOST: Joi.string().required().description('Server hostname only'),
//   })
//   .unknown();

// const { value: envVars, error } = envVarsSchema
//   .prefs({ errors: { label: 'key' } })
//   .validate(process.env);

// if (error) {
//   throw new Error(`Config validation error: ${error.message}`);
// }

// module.exports = {
//   serverHost: envVars.API_SERVER_HOST,
//   baseUrl: envVars.API_BASE_URL,
// };

const config = {
  serverHost: 'https://evening-bastion-99993.herokuapp.com',
  baseUrl: 'https://evening-bastion-99993.herokuapp.com/v1/',
};

export default config;
