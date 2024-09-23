
// import User from "../models/userModel.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// const maxAge = 3 * 24 * 60 * 60;

// const createToken = (email, userId) => {
//   return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
// };

// export const signup = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User with this email already exists" });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const user = await User.create({ email, password: hashedPassword });

//     const token = createToken(email, user.id);

//     res.cookie('jwt', token, {
//       httpOnly: true,
//       maxAge: maxAge * 1000,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict'
//     });

//     return res.status(201).json({
//       user: {
//         id: user.id,
//         email: user.email,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         image: user.image,
//         profileSetup: user.profileSetup,
//       },
//     });
//   } catch (err) {
//     console.error("Signup Error: ", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const token = createToken(email, user.id);

//     res.cookie('jwt', token, {
//       httpOnly: true,
//       maxAge: maxAge * 1000,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict'
//     });

//     return res.status(200).json({
//       user: {
//         id: user.id,
//         email: user.email,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         image: user.image,
//         profileSetup: user.profileSetup,
//       },
//     });
//   } catch (err) {
//     console.error("Login Error: ", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const getUserInfo = async (req, res, next) => {
//   try {
//     const userId = req.user.userId;

//     const userData = await User.findById(userId);
//     if (!userData) {
//       return res.status(404).send("User Not found");
//     }

//     return res.status(200).json({
//       user: {
//         id: userData.id,
//         email: userData.email,
//         firstName: userData.firstName,
//         lastName: userData.lastName,
//         image: userData.image,
//         profileSetup: userData.profileSetup,
//       },
//     });
//   } catch (err) {
//     console.error("Get User Info Error: ", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const updateProfile = async (req, res, next) => {
//   try {
//     const { firstName, lastName } = req.body;

//     // Validate input data
//     if (!firstName || !lastName) {
//       return res.status(400).json({ message: "First name and last name are required" });
//     }

   
//     const {userId} = req.userId; 
//     const updatedUser = await User.findByIdAndUpdate(userId, { firstName, lastName,profileSetup:true }, { new: true });

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json(
//       {
//         id:updatedUser.id,
//         email:updatedUser.email,
//         profileSetup:updatedUser.profileSetup,
//         firstName:updatedUser.firstName,
//         lastName:updatedUser.lastName,
//         image:updatedUser.image,

//       }
//     );
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };



import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const maxAge = 3 * 24 * 60 * 60;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ email, password: hashedPassword });

    const token = createToken(email, user.id);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        profileSetup: user.profileSetup,
      },
    });
  } catch (err) {
    console.error("Signup Error: ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = createToken(email, user.id);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        profileSetup: user.profileSetup,
      },
    });
  } catch (err) {
    console.error("Login Error: ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const userId = req.userId;

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).send("User Not found");
    }

    return res.status(200).json({
      user: {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        profileSetup: userData.profileSetup,
      },
    });
  } catch (err) {
    console.error("Get User Info Error: ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).json({ message: "First name and last name are required" });
    }

    const userId = req.userId;
    const updatedUser = await User.findByIdAndUpdate(userId, { firstName, lastName, profileSetup: true }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      id: updatedUser.id,
      email: updatedUser.email,
      profileSetup: updatedUser.profileSetup,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      image: updatedUser.image,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};








