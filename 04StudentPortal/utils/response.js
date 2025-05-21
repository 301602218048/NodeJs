const sendErrorResponse = (res, err) => {
  let statusCode = err.statusCode;
  let message = err.message;

  return res.status(statusCode).json({
    message: message,
    status: false,
  });
};

const sendResponse = (res, msg, statusCode) => {
  return res.status(statusCode).send(msg);
};

module.exports = { sendErrorResponse, sendResponse };
