const parseToken = req => {
  const {
    event: {
      headers: { authorization }
    }
  } = req;

  if (!authorization) {
    return null;
  }

  const tokenParts = authorization.split(" ");

  if (tokenParts[0] !== "Bearer") {
    console.error(
      "Authorization header is not in the correct format - Bearer <token>. Please check your header and try again."
    );
  }

  return tokenParts[1] || null;
};

module.exports = {
  parseToken
};
