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
const port = process.env.PORT ? Number(process.env.PORT) : 3002;
const host = process.env.IP ? process.env.IP : "locahost";
app.use(import_body_parser.default.json());
app.post("/posts", async (req, res) => {
  const newPost = req.body;
  try {
    const post = await prisma.post.create({
      data: newPost
    });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating post." });
  }
});
app.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) }
      // Convert string ID to number
    });
    if (!post) {
      res.status(404).json({ error: "Post not found." });
      return;
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting post." });
  }
});
app.listen(port, () => {
  console.log(`Post service listening at http://localhost:${port}`);
});
