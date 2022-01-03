const Stream = require('../models/stream');

exports.get_all_stream = async(req,res)=>{
    try {
        let stream = await Stream.find();
        console.log(stream);
        if(stream.length != 0){
            res.status(200).send(stream);
        }else{
            res.status(404).send("No record found...")
        }
        
    } catch (error) {
        res.send("error : ",error)
    }
};

exports.create_stream = async(req,res)=>{
    let stream =await new Stream(req.body);
    console.log(stream.Grade);
    try {
        let postDetails = await stream.save();
        res.status(200).send(postDetails);
    
    } catch (error) {
        res.send(error);
    }
 
};

exports.get_stream_by_id = async(req,res)=>{
    try {
        let stream =await Stream.findOne({_id:req.params.id});
        res.status(200).send(stream);
    } catch (error) {
        res.send(error);
    }
};

exports.update_stream = async(req,res)=>{
    let stream =await new Stream(req.body);
    stream._id = req.params.id;
    try {
        let updateDetails = await Stream.findByIdAndUpdate(req.params.id,stream,{ new: true });
        res.status(200).send(updateDetails);
    
    } catch (error) {
        res.send(error);
    }
};

exports.delete_stream = async(req,res)=>{
    const data =await Stream.deleteOne({ _id: req.params.id }, (err) => {
        if (err) res.json(err);
        res.send("Deleted");
      });
};