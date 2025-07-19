# 🐾 Pet Adoption Center

A responsive, full-stack React application that allows users to manage pet adoption listings. Built with a manual Webpack/Babel setup, styled using Tailwind CSS, and powered by AWS DynamoDB for persistent data storage.

---

## 📸 Demo

![Screenshot](./screenshot.png) <!-- You can replace this with your actual screenshot file name -->

---

## 🚀 Features

- ✅ Add new pets with name, species, status, and image
- ✅ Edit existing pet records
- ✅ Delete pets from the list
- ✅ Filter pets by status: `All`, `Available`, or `Adopted`
- ✅ Responsive, clean UI with Tailwind CSS
- ✅ Data stored in AWS DynamoDB
- ✅ Manually configured Webpack and Babel setup

---

## 🛠️ Tech Stack

| Technology | Description |
|----------------|------------------------------------|
| React | UI library for building components |
| Tailwind CSS | Utility-first CSS framework |
| AWS DynamoDB | NoSQL database for persistent data |
| AWS SDK v3 | AWS client for JavaScript (DynamoDB) |
| Webpack | Manual bundler setup |
| Babel | JavaScript compiler |

---

## 🧱 Project Structure
my-app/

│

├── src/

│   ├── components/

│   │   └── dynamo.js         # DynamoDB logic (CRUD)

│   ├── App.jsx               # Main component logic

│   ├── Main.jsx              # React entry point

│   ├── index.html            # HTML template

│

├── styles/

│   └── app.css               # Tailwind imports & custom CSS

│

├── webpack.config.js         # Webpack configuration

├── postcss.config.js         # Tailwind + PostCSS config

├── tailwind.config.js        # Tailwind theme customization

├── .env                      # AWS credentials (not committed)

├── package.json              # Dependencies

