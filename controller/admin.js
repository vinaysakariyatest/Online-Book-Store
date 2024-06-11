const admin = require("../models/admin");
const category = require("../models/category");
const book = require("../models/book")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validation = require('../helpers/validation');


// Admin Login
exports.login = async (req, res) => {
  try {
    const { error, value } = validation.adminLogin.validate(req.body);

    if(error) {
      return res.status(500).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const adminData = await admin.findOne({ email });
    // const adminPassword = adminData.password

    if (!adminData) {
      return res.status(404).json({ message: "Invalid Email" });
    }
    // console.log(adminPassword)
    // console.log('----')

    if (adminData) {
      if (adminData.password == password) {
        const token = jwt.sign(
          {
            id: adminData._id,
            email: adminData.email,
          },
          process.env.SECRET_KEY
        );
        return res.status(200).json({
          message: "Login Success",
          token: token,
        });
      } else {
        return res.status(400).json({ message: "Invalid Password" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// View All Categories
exports.viewAuthor = async (req, res) => {
  try {
    const showAuthor = await author.find();

    if (showAuthor == null) {
      return res.status(404).json({ message: "Author not found" });
    }

    return res.status(200).json({
      showAuthor,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Add Category
exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Please provide all fields." });
    }

    const categoryAdd = await category.create({
      name,
    });

    return res.status(200).json({ message: "Category added successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update Category
exports.editCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const updateCategory = await category.findByIdAndUpdate(id, {
      ...req.body,
    });

    if (updateCategory == null) {
      return res.status(404).json({ messge: "Category not found" });
    }

    return res.status(200).json({
      message: "Category updated",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const categoryDelete = await category.findByIdAndDelete(id);

    if (categoryDelete == null) {
      return res.status(404).json({ messge: "Category not found" });
    }

    return res.status(200).json({
      message: "Category deleted",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// View All Categories
exports.viewCategory = async (req, res) => {
  try {
    const showCategory = await category.find();

    return res.status(200).json({
      showCategory,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Add Book
exports.addBook = async (req, res) => {
    try {
      const { error, value } = validation.bookValidation.validate(req.body);

      if(error) {
        return res.status(500).json({ message: error.details[0].message });
      }

      const { title, desc, image, price, cat_id, author } = req.body;
  
      if (!title || !desc || !image || !price || !cat_id) {
        return res.status(400).json({ message: "Please provide all fields." });
      }
  
      const findCat = await category.findById(cat_id);
      // console.log(findCat)
  
      if (!findCat) {
        return res.status(404).json({ message: "Category Id not Found" });
      }
  
      // const authorId = req.decoded._id
      // console.log(authorId)
      const createBook = await book.create({
          title,
          desc,
          image,
          price,
          cat_id,
          author
      })
  
      return res.status(200).json({
          message: "Book Added successfully",
          createBook
      })
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

// View All Books
exports.viewAllBooks = async (req, res) => {
    try {
        const viewBook = await book.find().populate('cat_id','name')

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

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;

    const bookDelete = await book.findByIdAndDelete(id);

    if (bookDelete == null) {
      return res.status(404).json({ messge: "Book not found" });
    }

    return res.status(200).json({
      message: "Book deleted",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update Book
exports.editBook = async (req, res) => {
  try {
    const id = req.params.id;

    const updateBook = await book.findByIdAndUpdate(id, {
      ...req.body,
    });

    if (updateBook == null) {
      return res.status(404).json({ messge: "Book not found" });
    }

    return res.status(200).json({
      message: "Book updated",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



  
