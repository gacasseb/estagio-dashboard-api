const express = require("express");
const fs = require("fs");
const csvParser = require("csv-parser");
const {Trap, MetaData} = require("../models/Trap");
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post("/", async (req, res) => {
  try {
    const { name, longitude, latitude } = req.body;
    const trap = await Trap.create({ name, longitude, latitude });
    res.json(trap);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const trap = await Trap.findOne({ where: { id } });

  if (!trap) {
    return res.status(404).json({ error: "Trap not found" });
  }

  const { name, longitude, latitude } = req.body;

  try {
    await trap.update({ name, longitude, latitude });
    res.json(trap);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/import/:id", upload.single('file'), async (req, res) => {
  const { id } = req.params;
  const {path: filename, originalname} = req.file;
  if (!filename) {
    return res.status(400).json({ error: "File not found" });
  }
  if (!originalname.endsWith(".csv")) {
    return res.status(400).json({ error: "Invalid file type" });
  }

  const metadata = [];
  fs.createReadStream(filename)
    .pipe(csvParser())
    .on("data", (row) => {
      metadata.push(row);
    })
    .on("end", async () => {
      const trap = await Trap.findOne({ where: { id } });
      if (!trap) {
        return res.status(404).json({ error: "Trap not found" });
      }

      await MetaData.create({
        metadata,
        trapId: trap.id,
      })

      res.json(metadata);
    });
});

router.get("/", async (req, res) => {
  const traps = await Trap.findAll();
  res.json(traps);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const trap = await Trap.findOne({ where: { id } });

  if (!trap) {
    return res.status(404).json({ error: "Trap not found" });
  }

  res.json(trap);
});

router.get("/:id/metadata", async (req, res) => {
  const { id } = req.params;
  const trap = await Trap.findOne({ where: { id } });

  if (!trap) {
    return res.status(404).json({ error: "Trap not found" });
  }

  const metadata = await trap.getMetaData();
  res.json(metadata);
});

module.exports = router;
