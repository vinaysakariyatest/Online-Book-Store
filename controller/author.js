const author = require("../models/author");
const category = require("../models/category");
const book = require("../models/book");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const validation = require("../helpers/validation");

// Author Registrion
exports.register = async (req, res) => {
  try {
    const { error, value } = validation.authorValidation.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.details[0].message });
    }

    const { name, email, password, MobileNumber } = req.body;

    const authorExists = await author.findOne({ email });
    // console.log(authorExists);

    if (authorExists) {
      return res.status(409).json({
        message: "Author is already exists",
      });
    }

    const hasPassword = await bcrypt.hash(password, 12);
    const authorData = await author.create({
      name,
      email,
      password: hasPassword,
      MobileNumber,
    });

    return res.status(201).json({
      message: "Registration successful",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Author Login
exports.login = async (req, res) => {
  try {
    const { error, value } = validation.adminLogin.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const authorData = await author.findOne({ email });
    console.log(authorData);

    if (!authorData) {
      return res.status(400).json({ message: "Invalid Email" });
    } else {
      const isMatch = await bcrypt.compare(password, authorData.password);

      if (isMatch) {
        const token = jwt.sign(
          {
            id: authorData._id,
            email: authorData.email,
          },
          process.env.SECRET_KEY
        );
        return res.status(200).json({
          message: "Login successfully",
          token: token,
        });
      } else {
        return res.status(400).json({ message: "invalid Password" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Add Book
exports.addBook = async (req, res) => {
  try {
    const { error, value } = validation.bookValidation.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.details[0].message });
    }

    const { title, desc, image, price, cat_id } = req.body;

    const findCat = await category.findById(cat_id);

    if (!findCat) {
      return res.status(404).json({ message: "Category Id not Found" });
    }

    const createBook = await book.create({
      title,
      desc,
      image,
      price,
      cat_id,
      auth_id: req.decoded.id,
    });

    return res.status(200).json({
      message: "Book Added successfully",
      createBook,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const authorId = req.decoded.id;
    // console.log(authorId)

    const bookDelete = await book.findOneAndDelete({
      _id: id,
      auth_id: authorId,
    });
    // console.log(bookDelete)

    if (bookDelete) {
      return res.status(200).json({
        message: "Book deleted successfully",
      });
    } else {
      return res.status(400).json({
        message: "You can't delete this book",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update Book
exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const authorId = req.decoded.id;

    const editBook = await book.findOneAndUpdate(
      { _id: id, auth_id: authorId },
      { ...req.body }
    );

    if (editBook == null) {
      return res.status(400).json({
        message: "You can't update this book",
      });
    } else {
      return res.status(200).json({
        message: "Book updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View All Books
exports.viewAllBooks = async (req, res) => {
  try {
    const getBook = await book
      .find()
      .populate("cat_id", "name")
      .populate("auth_id", "name");

    return res.status(200).json({
      Books: getBook,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Book Author wise
exports.myBook = async (req, res) => {
  try {
    const authorId = req.decoded.id;

    const getBook = await book.findOne({ auth_id: authorId });

    if (!getBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const allBook = await book
      .find({ auth_id: authorId })
      .populate("cat_id", "name")
      .populate("auth_id", "name");

    return res.status(200).json({
      MyBooks: allBook,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View All Categories
exports.viewCategory = async (req, res) => {
  try {
    const getCategory = await category.find();

    return res.status(200).json({
      Categories: getCategory,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View Book Category wise
exports.categoryBook = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const getCategoryBook = await book
      .find({ cat_id: categoryId })
      .populate("cat_id", "name")
      .populate("auth_id", "name");

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
