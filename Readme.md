# Rest API using node js and express

This is a simple Node.js application that connects to a MongoDB database. The application is containerized using Docker and managed with Docker Compose.

## Prerequisites in case you want to use docer

- Docker
- Docker Compose



## Environment Variables

The application uses the following environment variables, which are defined in the `.env` file:

- `PORT`: The port on which the application will run.
- `BASE_URL`: The base URL of the application.
- `MONGO_DB_NAME`: The name of the MongoDB database.

### Example `.env` File

```properties
PORT=3000
BASE_URL=http://localhost
MONGO_DB_NAME=e_cartThis is a simple Node.js application that connects to a MongoDB database. The application is containerized using Docker and managed with Docker Compose.
```

## APIs

### Order API

The Order API allows you to perform operations related to orders. It supports the following endpoints:

- `GET /orders`: Get a list of all orders.
- `GET /orders/{orderId}`: Get details of a specific order.
- `POST /orders`: Create a new order.
- `PUT /orders/{orderId}`: Update an existing order.
- `DELETE /orders/{orderId}`: Delete an order.

### Products API

The Products API allows you to manage products. It provides the following endpoints:

- `GET /products`: Get a list of all products.
- `GET /products/{productId}`: Get details of a specific product.
- `POST /products`: Create a new product.
- `PUT /products/{productId}`: Update an existing product.
- `DELETE /products/{productId}`: Delete a product.

## Deployment

To deploy the application using Docker, follow these steps:

1. Build the Docker image:
    ```bash
    docker build -t demo-node-app .
    ```

2. Run the Docker container:
    ```bash
    docker run -p 3000:3000 demo-node-app
    ```

The application will be accessible at `http://localhost:3000`.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).