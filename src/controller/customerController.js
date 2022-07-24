import connection from "../database/db.js";

export async function getCustomers(req, res) {
  const { cpf } = req.query;

  try {
    const { rows: customers } = cpf
      ? await connection.query(
          `SELECT * FROM customers 
          WHERE customers.cpf LIKE $1;
          `,
          [`${cpf}%`]
        )
      : await connection.query("SELECT * FROM customers;");

    res.status(200).send(customers);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function getCustomer(req, res) {
  const { id } = req.params;

  try {
    const { rows: customer } = await connection.query(
      `
      SELECT * FROM customers
      WHERE customers.id = $1;
      `,
      [id]
    );

    if (customer.length === 0) {
      res.status(404).send("Usuário não existe!");
    }

    res.status(200).send(customer[0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
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
    res.sendStatus(500);
  }
}

export async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;

  try {
    await connection.query(
      `
      UPDATE customers
      SET name=$1 , phone=$2, cpf=$3, birthday=$4
      WHERE id = $5;
      `,
      [name, phone, cpf, birthday, id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
