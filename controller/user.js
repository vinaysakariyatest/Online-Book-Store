const user = require("../models/user");
const book = require('../models/book');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const randomstring = require("randomstring");

const validation = require("../helpers/validation");

// Register
exports.register = async (req, res) => {
  try {
    const { error, value } = validation.userValidation.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.details[0].message });
    }

    const { name, email, password, address, phone } = req.body;

    const userExists = await user.findOne({ email });

    if (userExists) {
      return res.status(409).json({
        message: "Email is already exists",
      });
    }

    const normalPassword = req.body.password
    const hashedPassword = await bcrypt.hash(password, 12);

    const createUser = await user.create({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
    });

    if(createUser){
      const msg = "Your account has been registered in Online Book Store <br><b>Email:</b> " + createUser.email + "<br><b>Password:</b> " + normalPassword;
  
      mailer.sendMail(email,"Order Status", msg);
    }

    return res.status(200).json({
      message: "Registration successfully!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { error, value } = validation.adminLogin.validate(req.body);

    if(error) {
      return res.status(500).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const userLogin = await user.findOne({ email });

    if (!userLogin) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password,userLogin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    } else {
      const token = jwt.sign(
        {
          id: userLogin._id,
          email: userLogin.email,
        },
        process.env.SECRET_KEY
      );

      return res.status(200).json({
        message: "Login successfully",
        token: token
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
    try {
        const userId = req.decoded.id;
       
        const userData = await user.findOne({ _id: userId });

        const existPassword = userData.password;
        
        const { oldPassword, newPassword } = req.body;

        if(!newPassword){
            return res.status(400).json({
                message: 'Please enter a new password'
            })
        }

        const isMatch = await bcrypt.compare(oldPassword, existPassword);
        // console.log(isMatch);

        if(isMatch) {
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            console.log(hashedPassword);

            await user.updateOne({
                password: hashedPassword
            })

            return res.status(200).json({
                message: "Password updated successfully"
            })
        }else{
            return res.status(400).json({
                message: "Old Password does not match"
            })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Send Gorget Password Link
exports.forget_password = async (req, res) => {
  try {
    const email = req.body.email;
    
    const userData = await user.findOne({ email});
    
    if(userData){
      const randomString = randomstring.generate();
      
      await user.findOneAndUpdate(
        { email: email },
        { token: randomString },
        { new: true }
      );

      const msg = `
            <p>Hi ${userData.name},</p>
            <p>Please copy the link and <a href="http://localhost:8000/user/reset-password?token=${randomString}">reset your password</a>.</p>
        `;

      mailer.sendMail(email, "For Reset Password", msg);

      return res.status(200).json({
        message: "Please check your mail box and reset your Password",
      });
    }else{
      return res.status(400).json({message: "Invalid Email"})
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Reset Password
exports.rest_password = async (req, res) => {
  try {
    const token = req.query.token;
    const tokenData = await user.findOne({ token});
  
    if (tokenData) {
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 12);

        await user.findOneAndUpdate(
            { _id: tokenData._id },
            { password: hashedPassword, token: "" },
            { new: true }
        );

        return res.status(200).json({ message: "Your password has been reset." });
    } else {
        return res.status(400).json({ message: "This link has expired." });
    }
} catch (error) {
    return res.status(500).json({ message: error.message})
  }
}

// View Profile
exports.viewProfile = async (req, res) => {
    try {
        const userId = req.decoded.id;

        const userData = await user.findOne({ _id: userId });
        // console.log(userData);

        return res.status(200).json({
            profile: userData
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// Update profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.decoded.id;

        const profile = await user.findByIdAndUpdate(
            {_id: userId},
            { ...req.body}
        );

        return res.status(200).json({
            message: "Profile updated"
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// View All Books
exports.viewAllBooks = async (req, res) => {
    try {
        const viewBook = await book.find().populate('cat_id','name -_id')

        if(!viewBook) {
            return res.status(404).json({ 
                message:"Book not found"
            })
        }

        return res.status(200).json({
            Books:viewBook
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// View Book Category wise
exports.categoryBook = async (req, res) => {
    try {
      const categoryId = req.params.id;
  
      const getCategoryBook = await book
        .find({ cat_id: categoryId })
        .populate("cat_id", "name")
  
      if (getCategoryBook.length === 0) {
        return res.status(404).json({
          message: "No books found in this category",
        });
      }
  
      return res.status(200).json({
        Books: getCategoryBook,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};
