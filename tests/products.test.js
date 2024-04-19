const { default: axios } = require("axios");
const chalk = require("chalk");
const path = require("path");

require("dotenv").config({
  path: path.join(path.basename("/"), ".env.test"),
});

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.log(
    chalk.red(
      "API_KEY is required, generate one by login here: http://localhost:9001/api/auth/login"
    )
  );
  process.exit();
}

axios.defaults.baseURL = "http://localhost:9001/api";
axios.defaults.headers = {
  Authorization: "Bearer " + API_KEY,
};

describe("Get Products", () => {
  test("endpoint has to exist", () => {
    return expect(axios.get("/products")).resolves.toHaveProperty(
      "status",
      200
    );
  });

  test("should not return 404 error", () => {
    return expect(axios.get("/products/99999999999")).rejects.toHaveProperty(
      "response.status",
      404
    );
  });

  test("should return a single product", async () => {
    expect.assertions(1);
    const productIds = Array(100)
      .fill(0)
      .map((id, index) => ++index);

    for (let id of productIds) {
      try {
        const res = await axios.get(`/products/${id}`);
        return await expect(res.data.product).toBeDefined();
      } catch (err) {
        continue;
      }
    }
  });

  test("should return a list of products", () => {
    return expect(axios.get("/products")).resolves.toHaveProperty(
      "data.products.length"
    );
  });
});

describe("Create product", () => {
  test("endpoint has to exist", () => {
    return expect(axios.post("/products")).rejects.not.toHaveProperty(
      "response.status",
      404
    );
  });

  test("should fail creating a product without any request body", () => {
    return expect(axios.post("/products", {})).rejects.toHaveProperty(
      "response.status",
      422
    );
  });

  test("should fail creating a product without a title", () => {
    return expect(
      axios.post("/products", {
        price: 10,
        storeId: 1,
        labels: ["test"],
        description: "test",
        images: ["test"],
      })
    ).rejects.toHaveProperty("response.status", 422);
  });

  test("should fail creating a product without a store id", () => {
    return expect(
      axios.post("/products", {
        title: "test",
        price: 10,
        labels: ["test"],
        description: "test",
        images: ["test"],
      })
    ).rejects.toHaveProperty("response.status", 422);
  });

  test("should fail creating a product with a store that does not exist", async () => {
    const storeIds = Array(100)
      .fill(0)
      .map((id, index) => index);

    for (let id of storeIds) {
      try {
        return await expect(
          axios.post("/products", {
            storeId: id,
            title: "test",
            price: 10,
            labels: ["test"],
            description: "test",
            images: ["test"],
          })
        ).rejects.toHaveProperty("response.status", 422);
      } catch (err) {
        continue;
      }
    }

    throw new Error(
      chalk.yellow(
        "This test failed because all auto-generated ids have records in the database"
      )
    );
  });

  test("should create product", () => {
    return expect(
      axios.post("/products", {
        storeId: 1,
        title: "test",
        price: 10,
        labels: ["test"],
        description: "test",
        images: ["test"],
      })
    ).resolves.toHaveProperty("status", 201);
  });
});

describe("Update Product", () => {
  test("endpoint has to exist", () => {
    return expect(axios.patch("/products/1")).resolves.toHaveProperty(
      "status",
      200
    );
  });

  test("should return 404 ", () => {
    return expect(axios.patch("/products/9999999999")).rejects.toHaveProperty(
      "response.status",
      404
    );
  });

  test("should failed to update product if title is empty", () => {
    return expect(
      axios.patch("/products/1", {
        title: "",
      })
    ).rejects.toHaveProperty("response.status", 422);
  });

  test("should failed to update product if price less than 0", () => {
    return expect(
      axios.patch("/products/1", {
        price: -1,
      })
    ).rejects.toHaveProperty("response.status", 422);
  });

  test("should failed to update product if images[] is empty", () => {
    return expect(
      axios.patch("/products/1", {
        images: [],
      })
    ).rejects.toHaveProperty("response.status", 422);
  });

  test("should failed to update product if description is empty", () => {
    return expect(
      axios.patch("/products/1", {
        description: "",
      })
    ).rejects.toHaveProperty("response.status", 422);
  });

  test("should successfully update product", async () => {
    const { data: product } = await axios.get("/products/1");
    const upddateProduct = {
      ...product,
      title: "updated title",
      price: 20,
      images: ["updated1.png", "updated3.png"],
      description: "updated description",
      labels: ["updated label"],
    };

    await expect(axios.patch("/products/1", product)).not.toMatchObject({
      data: { product: upddateProduct },
    });
  });
});

describe("Delete product", () => {
  test("should return 404 if product does not exist", async () => {
    return expect(
      axios.delete("/products/9999999999999")
    ).rejects.toHaveProperty("response.status", 404);
  });

  test("should delete product", () => {
    return expect(axios.delete("/products/1")).resolves.toHaveProperty(
      "status",
      200
    );
  });
});
