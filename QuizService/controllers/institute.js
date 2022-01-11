const Institute = require("../models/institute");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

exports.get_all_institute =  async (req, res) => {
    try {
      const institute = await Institute.find();
      console.log(institute);
      res.json(institute); //available,_id,name,address,city,phoneNo,
    } catch (err) {
      res.send("Error " + err);
    }
  };

exports.get_institute_by_id =  async (req, res) => {
    try {
      const institute = await Institute.findById(req.params.id);
      res.json(institute);
    } catch (err) {
      res.send("Error " + err);
    }
  };

exports.create_institute =  async (req, res) => {
    const institute = new Institute({
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      phoneNo: req.body.phoneNo,
    });
    console.log(institute);
      //upload cloudinary
      if (req.file !== undefined) {
      let imgInfo =await cloudinary.uploader
      .upload(req.file.path, {
          use_filename: true,
          folder: "school-bag/institute/image",
          public_id: req.file.filename,
      });
      console.log(imgInfo);
      institute.logo = imgInfo;
    try {
      const a1 = await institute.save();
      res.json(a1);
    } catch (err) {
      res.send(err);
    }
    }else{
      const a1 = await institute.save();
      res.json(a1);
    }
  };

  exports.update_institute =  async (req, res) => {
    let existInstitute = await Institute.findById(req.params.id);
    const institute = new Institute(req.body);
    institute._id = req.params.id;
    try {
    if (req.file !== undefined) {
      await cloudinary.uploader.destroy(existInstitute.logo.public_id);
      //upload cloudinary
      let imgInfo =await cloudinary.uploader
      .upload(req.file.path, {
          use_filename: true,
          folder: "school-bag/institute/image",
          public_id: req.file.filename,
      });
      console.log();
      institute.logo = imgInfo;
      await Institute.findByIdAndUpdate(req.params.id,institute,{new:true});
      res.json("updated");
    }else{
      await Institute.findByIdAndUpdate(req.params.id,institute,{new:true});
      res.json("updated");
    } 
    } catch (err) {
      res.send(err);
    }
  };
