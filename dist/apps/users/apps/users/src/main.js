var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_client = require("@prisma/client");
var import_body_parser = __toESM(require("body-parser"));
var import_express = __toESM(require("express"));
const prisma = new import_client.PrismaClient();
const app = (0, import_express.default)();
const port = 3001;
app.use(import_body_parser.default.json());
app.post("/users", async (req, res) => {
  const newUser = req.body;
  try {
    const user = await prisma.user.create({
      data: newUser
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user." });
  }
});
app.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
      // Convert string ID to number
    });
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting user." });
  }
});
app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`);
});
