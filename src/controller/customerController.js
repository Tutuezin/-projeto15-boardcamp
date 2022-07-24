import connection from "../database/db.js";

export async function getCustomers(req, res) {
  const { cpf } = req.query;

  try {
    const { rows: customers } = cpf
      ? await connection.query(
          `SELECT * FROM customers 
      WHERE customers.cpf LIKE ($1);
      `,
          [`${cpf}%`]
        )
      : await connection.query("SELECT * FROM customers;");

    res.status(200).send(customers);
  } catch (error) {
    console.error(error);
  }
}

export async function createCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
  }
}
