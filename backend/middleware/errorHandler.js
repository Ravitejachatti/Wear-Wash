const { constants } = require("../constants"); // Adjust the path as necessary

// const errorHandler = (err, req, res, next) => {
//   console.log(res.statusCode);
//   let statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Default to 500 if status is 200
//   console.log(res.statusCode);

//   res.status(statusCode);

//   // Handling based on the status code set earlier in the request lifecycle
//   switch (statusCode) {
//     case VALIDATION_ERROR:
//       response.title = 'Validation Failed';
//       break;
//     case UNAUTHORIZED:
//       response.title = 'Unauthorized';
//       break;
//     case FORBIDDEN:
//       response.title = 'Forbidden';
//       break;
//     case NOT_FOUND:
//       response.title = 'Not Found';
//       break;
//     case SERVER_ERROR:
//       response.title = 'Server Error';
//       break;
//     default:
//       response.title = 'Unexpected Error';
//       break;
//   }

//   res.json(response); // Ensure a response is always sent
// };

// module.exports = errorHandler;
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  console.log(statusCode);
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      res.json({
        title: "unexpected Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }
};
module.exports = errorHandler;
