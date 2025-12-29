import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import categoryRoutes from "./routes/category.routes.js";
// import customerRoutes from "./routes/customer.routes.js";
// import purchaseRoutes from "./routes/purchase.routes.js";
// import saleRoutes from "./routes/sale.routes.js";
// import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { toNodeHandler, fromNodeHeaders  } from "better-auth/node";
import { auth } from "./auth.js";
import cookieParser from "cookie-parser";


const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
    methods: ["GET", "POST", "PATCH", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth)); //For ExpressJS v5 
app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
     headers: fromNodeHeaders(req.headers),
   });
 return res.json(session);
});
/* CLIENT (Next.js)                 SERVER (Express)
----------------------------------------------------------
User logs in  --->  POST /api/auth/sign-in
                        ↓
                   Auth verifies user
                        ↓
       <--- Server sends session cookies back


Page loads → middleware runs
middleware → GET /api/auth/get-session
                        ↓
                Auth reads cookies
                        ↓
         Returns session OR null


If null → redirect /login
If exists → load protected route
*/

// app.use("/api/auth", auth.router);

// // Example protected route
// app.get("/api/profile", auth.middleware, (req, res) => {
//   res.json({ user: req.auth });
// });
// const response = await auth.api.signInEmail({
//   body: {
//       email,
//       password
//   },
//   asResponse: true // returns a response object instead of data
// });

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(errorHandler);

// Register Routes
// app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/categories", categoryRoutes);
// app.use("/customers", customerRoutes);
// app.use("/purchases", purchaseRoutes);
// app.use("/sales", saleRoutes);

const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
  });
  // Add this debug:
/* Then login.

If the cookie is undefined → your schema is wrong.

If the cookie shows but browser doesn't send it → CORS or SameSite issue. */
  app.post("/api/auth/login", (req, res, next) => {
    console.log("Set-Cookie:", res.getHeader("Set-Cookie"));
    next();
  });
 
/*From your server:
app.all("/api/auth/*splat", toNodeHandler(auth));

🔍 What this means:

This line registers all Better-Auth endpoints on Express automatically:

GET /api/auth/get-session
POST /api/auth/sign-in
POST /api/auth/sign-up
POST /api/auth/sign-out 
Better-Auth internally handles:

verifying cookies

returning the session

hashing passwords

validating credentials

storing sessions in Prisma

creating user

updating user

refreshing session
*/