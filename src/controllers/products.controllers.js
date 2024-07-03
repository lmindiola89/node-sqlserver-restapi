import { getConnection } from "../database/connection.js";
import sql from "mssql";

export const getProducts = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM products");
  //   console.log(result);
  res.json(result.recordset);
  //   res.send("geting products");
};

export const createProducts = async (req, res) => {
  //   console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("name", sql.VarChar, req.body.name)
    .input("price", sql.Decimal, req.body.price)
    .input("quantity", sql.Int, req.body.quantity)
    .input("description", sql.Text, req.body.description)
    .query(
      "INSERT INTO products (name, price, quantity, description) VALUES (@name, @price, @quantity, @description); SELECT SCOPE_IDENTITY() AS id;"
    );

  console.log(result);

  res.json({
    id: result.recordset[0].id,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description,
  });
  // res.send("creating a product");
};

export const getProduct = async (req, res) => {
  // console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("SELECT * FROM products WHERE id = @id");
  console.log(result);
  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ message: "product not found" });
  }
  return res.json(result.recordset[0]);
  // res.send("geting a product");
};

export const deleteProduct = async (req, res) => {
  // console.log(req.params.id);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("DELETE FROM products WHERE id = @id");
  console.log(result);
  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ message: "product not found" });
  }
  return res.json({ message: "product deleted" });
  // res.send("removed a product");
};

export const updateProduct = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .input("name", sql.VarChar, req.body.name)
    .input("price", sql.Decimal, req.body.price)
    .input("quantity", sql.Int, req.body.quantity)
    .input("description", sql.Text, req.body.description)
    .query(
      "UPDATE products SET name = @name, description = @description, price = @price, quantity = @quantity WHERE id = @id "
    );

  console.log(result);

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ message: "product not found" });
  }
  return res.json({
    id: req.params.id,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description,
  });
  // res.send("updating a product");
};
