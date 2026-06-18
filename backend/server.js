require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();  

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static("uploads")
);

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/products",
  require("./routes/productRoutes")
);

app.use(
  "/api/orders",
  require("./routes/orderRoutes")
);

app.use(
  "/api/admin",
  require("./routes/adminRoutes")
);

app.listen(process.env.PORT, () => {
  console.log(
    `Server berjalan di port ${process.env.PORT}`
  );
});