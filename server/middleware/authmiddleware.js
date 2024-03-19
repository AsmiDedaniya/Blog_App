import jwt from 'jsonwebtoken';

const authmiddleware = async  (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).send({ error: "You are not logged in" });
    // console.log(req.cookies.token);

    const data = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
    req.user = data;
    next();
  } catch (error) {
    res.clearCookie("token").status(401).json({
      error: "Please log in to access this resource.",
    });
  }
};

export default authmiddleware;