const Image = require("../models/image");
const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
module.exports.saveImage = async (req, res) => {
  if (!req.file) res.status(400).send({ message: "Image Not Received" });
  imageKit.upload(
    {
      file: req.file.buffer.toString("base64"),
      fileName: req.file.originalname,
      folder: "Hair_Salon",
    },
    async function (error, result) {
      if (error) {
        res.status(500).send({ message: "Server Error" });
      }
      const { url, fileId } = result;
      const image = new Image({ image: url, fileId: fileId });
      await image.save();
      res.status(200).send({ message: "Successfully Received", image: image });
    }
  );
};

module.exports.deleteImage = async (req, res) => {
  const { id } = req.params;
  const img = await Image.findById(id);
  imageKit.deleteFile(img.fileId, async function (error, result) {
    if (error) res.status(500).send({ error: "Problem Deleting image!" });

    await Image.findByIdAndDelete(id);
    res.status(200).send({ message: "Successfully Deleted Image" });
  });
};
